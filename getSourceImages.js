var cheerio = require('cheerio'),
    http = require('http'),
    imageType = require('image-type'),
    isProgressive = require('is-progressive'),
    superagent = require('superagent');


var URL = 'http://ke.qq.com/cgi-bin/courseList?sort=3&page=',
    START_PAGE = 1;

function getURLContent(page) {
    superagent.get(URL + page)
    .end(function(err, res) {
        if(err) {
            console.log(err);
            return;
        }
        var $ = cheerio.load(res.text),
            ret = [];
        $('.item-img-link').each(function (idx, element) {
            var $this = $(element);
            ret.push({
                id: $this.data('id'),
                url: $this.find('.item-img').attr('src')
            });
        });
        console.log(ret);
        return ret;
    });
}

function saveImageByType(url, type) {
    http.get(url, function (res) {
        res.once('data', function (chunk) {
            res.destroy();
            if(type === imageType(chunk).ext) {

            }
            //=> {ext: 'gif', mime: 'image/gif'} 
        });
    });
}

/*
* detect image type: baseline, progressive.
 */
function getImageType(imageUrl) {

    var req = http.get(imageUrl, function (res) {
        res.pipe(isProgressive.stream(function (progressive) {
            req.end();
            console.log(progressive);
            //=> true 
        }));
    });

}

getURLContent(START_PAGE);