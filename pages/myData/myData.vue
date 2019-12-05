<template>
	<view class="myData">
		<uni-list>
			<uni-list-item title="昵称:" :show-arrow="!nickName" :fromParentValue="nickName" :isInput="isEditor" @emitInput="nickNameInput"></uni-list-item>
			<uni-list-item title="居住地:" :show-arrow="!residence"  :fromParentValue="residence" @tap="cityShow"></uni-list-item>
		</uni-list>
		<button @tap="btnTap" class="btn-submit" type="primary">{{btnVal}}</button>
		<!-- 居住地 -->
		<qu-she-picker ref="qsPicker" type="city" :dataSet="dataSet" @confirm="cityConfirm"></qu-she-picker>
	</view>
</template>

<script>
	import uniList from "@/components/uni-ui/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import QuShePicker from "@/components/QuShe-picker/QuShe-picker.vue"
	export default {
		data() {
			return {
				nickName: '187****7868',
				residence: '上海',
				btnVal: '编辑',
				isEditor: false,
				current: 0,
				// 居住地
				dataSet: {
					defaultValue: [0,0,0]
				}
			};
		},
		methods: {
			// 居住地
			cityConfirm(data) {
				console.log('data---', data)
				this.residence = data.data.label
			},
			cityShow() {
				if (this.isEditor) {
					this.$refs.qsPicker.show()
				}
			},
			btnTap() {
				console.log(this.nickName)
				console.log(this.company)
				if (this.btnVal === '编辑') {
					this.isEditor = true
					this.btnVal = '保存'
				} else if (this.btnVal === '保存') {
					this.btnVal = '编辑'
					// 保存数据之后。。。
					this.isEditor = false
				}
			},
			nickNameInput(data) {
				this.nickName = data
			}
		},
		components: {
			uniList,
			uniListItem,
			QuShePicker
		}
	}
</script>

<style lang="scss" scoped>
/deep/ .uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
	border-radius: 5px;
	padding: 60rpx;
}
.myData {
	width: 100%;
	height: 100%;
	position: absolute;
	background: #F0EFF5;
	.btn-submit {
		background: #1296db;
		margin: 60rpx 30rpx 0 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 16px;
	}
	.radio-wrap {
		width: 300rpx;
	}
}
</style>
