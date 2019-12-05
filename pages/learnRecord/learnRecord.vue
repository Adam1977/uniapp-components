<template>
	<view class="learn-record">
		<!-- 折线图 -->
		<view class="qiun-columns">
			<view class="qiun-title" >
				<view class="qiun-duration">
					<view>累计时长</view>
					<view>{{duration}}小时</view>
				</view>
				<view class="qiun-sign-in">
					<view>连续签到天数</view>
					<view>{{signInDay}}天</view>
				</view>
			</view>
			<view class="qiun-charts" >
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaLineA=null;
	export default {
		data() {
			return {
				duration: 10,
				signInDay: 5,
				cWidth:'',
				cHeight:'',
				pixelRatio:1
			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let LineA={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories=res.data.data.LineA.categories;
						// LineA.series=res.data.data.LineA.series;
						LineA.series[0]=res.data.data.LineA.series[0];
						console.log('LineA----', LineA.series)
						_self.showLineA("canvasLineA",LineA);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:{show:true},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						// gridColor:'#CCCCCC',
						gridColor:'#fff',
						gridType:'dash',
						dashLength:8
					},
					yAxis: {
						gridType:'dash',
						// gridColor:'#CCCCCC',
						// dashLength:8,
						// splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)+'元'}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		},
		components: {
			uniSearchBar
		}
	}
</script>

<style lang="scss" scoped>
	.learn-record {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #F0EFF5;
		.qiun-columns {
			background: #fff;
			.qiun-title {
				display: flex;
				align-items: center;
				height: 120rpx;
				.qiun-duration {
					margin-left: 80rpx;
				}
				.qiun-sign-in {
					flex: 1;
					text-align: right;
					margin-right: 50rpx;
				}
				view {
					line-height: 1.3;
				}
			}
			/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
			.qiun-charts {
				width: 750rpx;
				height: 500rpx;
				background-color: #FFFFFF;
			}
			.charts {
				width: 750upx;
				height: 500upx;
				background-color: #FFFFFF;
			}
		}
	}
</style>
