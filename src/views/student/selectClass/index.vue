<template>
	<div style="text-align: center">
		<h1>可选课程</h1>
		<div class="container">
			<el-card class="box-card" v-for="(i, index) in courseList" :key="index">
				<div slot="header" class="clearfix">
					<span style="font-size: 30px">{{ i.courseName }}</span>
				</div>
				<div class="text item">
					<img :src="img + '/' + i.courseImg" alt="" />
				</div>
				<div class="divider"></div>
				<div>
					<span>已选人数：{{ i.courseNum }}</span>
					<span style="margin-left: 20px">剩于人数：{{ i.courseRenum }}</span>
				</div>

				<el-button style="font-size: 20px; float: right; " @click="selectClass(i)" type="text">
					就选它！
				</el-button>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			img: process.env.VUE_APP_BASE_API,
			courseList: []
		};
	},
	async mounted() {
		let result
		try {
			result = await this.$API.getAllScore()
			console.log(result);
		} catch (error) {
			this.$message.error('获取失败')
		}
		let obj = {}
		let flag
		// 筛选出已经选过的课
		result.data.forEach((element) => {
			flag = true;
			this.$store.state.login.personInfo.scStuscore.forEach(element2 => {
				if (element.courseId == element2.courseId) {
					flag = false;
				}
			})
			if (flag) {
				obj = element;
				this.courseList.push(obj);
				obj = {}
			}
		})



		if (result.code == 200) {

		} else {
			this.$message.error('获取失败')
		}
	},
	methods: {
		async selectClass(raw) {
			console.log(raw);
			let result = await this.$API.addStuscore(raw)
			console.log(result);
		}

	},
	components: {

	}
};
</script>


<style scoped>
.pagin {
	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translate(-50%);
}

img {
	height: 50px;
	width: 50px;
	border-radius: 50%;
}

.container {
	display: flex;
	flex-flow: wrap;
	justify-content: center;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}

.clearfix:after {
	clear: both;
}

.box-card {
	width: 280px;
	margin: 50px;
	text-align: center;
}

.divider {
	width: 100%;
	border-top: 2px dashed rgba(113, 113, 113, 0.5);
}
</style>