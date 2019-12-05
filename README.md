# uniapp-components
Some processing components

1、api——包含接口地址及get,post请求，可自定义接口前缀
```
# main.js
import Api from './api/api.js'
Vue.prototype.$api = Api
# 使用
this.$api.get('LOGIN', {username: 'XXX', password: 'XXX'})
this.$api.post('LOGIN', {username: 'XXX', password: 'XXX'})
// 自定义后缀
this.$api.post('LOGIN', {username: 'XXX', password: 'XXX'}, 'http://localhost:10080')
```
2、common/uni.css
```
#App.vue
<style>
	/*每个页面公共css */
	@import './common/uni.css';
</style>
```
3、components
```
# QuShe-picker(地区)
https://ext.dcloud.net.cn/plugin?id=440
参考pages/myData/myData
# uni-ui
更改uni-list-item
// 自定义fromParentValue、isInput
fromParentValue-右侧显示传入的值，去除箭头图标
isInput-为true时，和fromParentValue同时使用，双向绑定修改回显
```
4、js_sdk/u-charts
```
http://doc.ucharts.cn/1073940
参考pages/learnRecord/learnRecord
```
