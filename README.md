### Progressive 图片性能分析
切换到Progressive格式后，图片加载时间延长，主要逻辑：
+ png 转 jpg
+ jpg baseline 转 progressive

可能原因：
+ 单色图片，png 转 jpg 后，图片变大了
+ baseline 转 progressive 后图片变大了


分析策略：
+ 爬列表页后1000张图片（更新时间排序，可以确认这部分图片不是progressive格式）
+ 过滤 png 图片
+ png 转 jpg
+ jpg baseline 转 progressive
