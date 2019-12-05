import {pathConfig} from './pathConfig.js'

const apiContext = 'http://localhost:9090'
let methods = ['get', 'post']

class Api {
	constructor() {
	    methods.forEach(method => {
			this[method] = (path, data = {}, context = '') => new Promise((resolve, reject) => {
				new Promise(resolve => {
					uni.getStorage({
						key: 'xxxToken',
						success: res => {
							resolve(res.data)
						},
						fail: err => {
							var pages = getCurrentPages() //获取加载的页面
							var currentPage = pages[pages.length-1] //获取当前页面的对象
							var url = currentPage.route //当前页面url
							// var options = currentPage.options //如果要获取url中所带的参数可以查看options
							if (url !== 'pages/login/login') {
								uni.removeStorage({
									key: 'txjToken',
									success: function (res) {
										uni.removeStorage({
											key: 'isLogin',
											success: function (res) {
												uni.reLaunch({
													url: '/pages/login/login',
													success: res => {
														uni.showToast({
															title: '验证过期，请重新登录',
															icon: 'none'
														});
													}
												});
											}
										});
									}
								});
							} else {
								resolve('')
							}
						}
					})
				}).then(token => {
					// let url = apiContext + context + pathConfig[path]
					let url = (context || apiContext) + pathConfig[path]
					uni.request({
						url: url,
						method: method,
						data: data,
						header: {
							'Authorization': token
						},
						success: res => {
							if (res.data.result === "loginfailure") {
								uni.removeStorage({
									key: 'isLogin',
									success: function (res) {
										uni.reLaunch({
											url: '/pages/login/login',
											success: res => {
												uni.showToast({
													title: '验证过期，请重新登录',
													icon: 'none'
												});
											}
										});
									}
								});
							}
							resolve(res.data)
						},
						fail: error => {
							reject(error)
						},
						complete: () => {}
					});
				})
			})
		})
	}
}

export default new Api()
