<template>
	<transition :enter-active-class="access" leave-active-class="animate__fadeOut">
		<div v-show="visible" class="login-box animate__animated">
			<h2>登录</h2>
			<form @submit.prevent="submitForm">
				<div class="user-input">
					<label for="username">用户名</label>
					<input type="text" name="username" id="username" v-model="username" />
					<label for="password">密码</label>
					<input type="password" name="password" id="password" v-model="password" />
				</div>

				<div class="user-type">
					<div style="flex: 1; text-align: center">
						<input type="radio" name="user-type" value="0" id="student" v-model="userType" />
						<label for="student">学生</label>
					</div>
					<div style="flex: 1; text-align: center">
						<input type="radio" name="user-type" value="1" id="teacher" v-model="userType" />
						<label for="teacher">教师</label>
					</div>
				</div>
				<div style="text-align: center;">
					<button style="width: 200px; font-size: 20px;" type="submit"
						v-loading.fullscreen.lock="fullscreenLoading">登录</button>
				</div>

			</form>
		</div>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				fullscreenLoading: false,
				access: [
					"animate__fadeInTopLeft",
					"animate__fadeInTopRight",
					"animate__fadeInBottomLeft",
					"animate__fadeInBottomRight",
				][Math.round(Math.random() * 3)],
				visible: false,
				userType: "",
				username: "",
				password: "",
			};
		},
		mounted() {
			this.visible = true;
		},
		methods: {

			async submitForm() {
				// 这里可以编写提交表单数据的逻辑

				let {
					userType,
					username,
					password
				} = this._data
				if (userType && username && password) {
					this.fullscreenLoading = true;
					let resoult = await this.$API.login(this.username, this.password, this.userType)

					if (resoult.code == 200) {
						this.$util.saveToken(resoult.data)
						localStorage.setItem('userType', userType)
						await this.$store.dispatch('GetInfo')
						if (this.$store.state.login.personInfo.teacherPermission == '1') {
							this.$router.replace('/admin')
						} else if (this.$store.state.login.personInfo.teacherPermission == '0') {
							this.$router.replace('/teach')
						} else if (localStorage.getItem('userType') == 0) {
							this.$router.replace('/student')
						}
						this.fullscreenLoading = false;
					} else {
						this.$message.error("账号或密码错误");
						this.fullscreenLoading = false;
					}
				} else if (!username || !password) {
					this.$message.error("输入不能为空")
				} else if (!userType) {
					this.$message.error("请选择类型")
				}
			},
		},
	};
</script>

<style>
	body {
		background-color: #f1f1f1;
		font-family: Arial, sans-serif;
	}

	.login-box {
		background-color: #fff;
		width: 300px;
		margin: 50px auto;
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0px 0px 10px #ccc;
	}

	.login-box h2 {
		text-align: center;
		margin-bottom: 20px;
	}

	.user-type {
		display: flex;
		width: 100%;
		/* justify-content: space-between; */
		margin-bottom: 20px;
	}

	.user-type label {
		font-weight: normal;
		text-align: center;
	}

	.user-input label {
		display: block;
		margin-bottom: 5px;
	}

	.user-input input[type="text"],
	.user-input input[type="password"] {
		width: 90%;
		padding: 10px;
		margin-bottom: 20px;
		border: none;
		border-radius: 5px;
		box-shadow: 0px 0px 5px #ccc;
	}

	button[type="submit"] {
		background-color: #4caf50;
		color: #fff;
		padding: 10px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	button[type="submit"]:hover {
		background-color: #3e8e41;
	}
</style>