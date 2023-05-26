<template>
	<div class="container">
		<el-upload :before-upload="beforeAvatarUpload" class="upload-demo" style="color: aliceblue;" drag
			action="https://jsonplaceholder.typicode.com/posts/" multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip" style="color: aliceblue;">只能上传execl文件，且不超过2MB</div>
		</el-upload>
	</div>
</template>

<script>
	export default {

		data() {
			return {

			}
		},
		methods: {
			beforeAvatarUpload(file) {
				console.log(file.type);
				const isJPG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传只能是 EXECL 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style scoped>
	a {
		color: #ffffff;
		font-size: 20px;
	}

	.container {
		width: 360px;
		position: absolute;
		left: 50%;
		top: 20%;
		transform: translate(-50%, 0);
	}
</style>