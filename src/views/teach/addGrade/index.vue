<template>
	<div style="
              position: relative;
              height: 100%;
              left: 50%;
              transform: translate(-50%);
              width: 70%;
              margin-top: 50px;
            " :style="defaultHeight">
		<div style="color: #fff; height: 50px">
			总成绩=平时成绩*{{ usualGrade * 100 }}%+期末成绩*{{ finalGrade * 100 }}%
			<el-button @click="updataGrade" style="position: absolute; right: 0" type="primary">更改</el-button>
		</div>
		<template>
			<el-table :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase()) //搜索关键词
        )
      " style="width: 100%;">
				<el-table-column label="学号" prop="studentId"> </el-table-column>
				<el-table-column label="姓名" prop="studentName"> </el-table-column>
				<el-table-column label="平时成绩" prop="dailyScore"> </el-table-column>
				<el-table-column label="期末成绩" prop="finalGrade"> </el-table-column>
				<el-table-column label="总成绩" prop="totalScore"> </el-table-column>
				<el-table-column align="center">
					<template slot="header" slot-scope="scope">
						<el-input v-model="search" size="mini" placeholder="输入学生姓名搜索" />
					</template>
					<template slot-scope="scope">
						<el-button size="mini" type="primary"
							@click="handleDelete(scope.$index, scope.row)">修改</el-button>
						<el-button size="mini" type="danger"
							@click="handleDelete2(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="page.currentPage" :page-size="page.pageSizes" layout="total, prev, pager, next, jumper"
			:total="page.total">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				page: {
					currentPage: 1,
					total: 1,
				},
				defaultHeight: {
					height: "",
				},
				usualGrade: 0.4,
				finalGrade: 0.6,
				tableData: [

				],
				search: "",
			};
		},
		async mounted() {
			this.updataCountGrade();
			this.getStudentInfo(1);

		},
		computed: {},
		watch: {
			tableData: {
				//监听成绩变动
				deep: true,
				handler() {
					this.updataCountGrade();
				},
			},
		},

		created() {
			window.addEventListener("resize", this.getHeight);
			this.getHeight();
		},
		methods: {
			async getStudentInfo() {
				this.tableData = [];
				let resoult = await this.$API.getStudentInfoList(this.page.currentPage, 10)
				let obj = {}
				if (resoult.code == 200) {
					resoult.data.records.forEach(element => {
						obj = {
							dailyScore: element.dailyScore,
							finalGrade: element.finalGrade,
							totalScore: element.totalScore,
							studentId: element.scStudent.studentId,
							studentName: element.scStudent.studentName,
						}
						this.tableData.push(obj)
						obj = {}
					});
					this.page.currentPage = resoult.data.current
					this.page.total = resoult.data.total
				}
			},

			getHeight() {
				this.defaultHeight.height = window.innerHeight - 200 + "px";
			},
			updataCountGrade() {
				this.tableData.forEach((element) => {
					element.totalScore =
						(element.dailyScore * this.usualGrade +
							element.finalGrade * this.finalGrade) //计算出总成绩
						.toFixed(2) //保留小数点后2位
				});
			},
			updataGrade() {
				this.$alert(
					// 点击确定后修改成绩的弹窗
					`<label for="usualGrade">平时占比：</label><input type="number" id='usual' value =${this.usualGrade*100} placeholder="平时成绩">
        <br />
        <label for="finalGrade">期末占比：</label><input id='final' type="number" value =${this.finalGrade*100}  placeholder="期末成绩">`,
					"修改比例", {
						confirmButtonText: "确定",
						dangerouslyUseHTMLString: true,
						callback: (action) => {
							if (action == "confirm") {
								let usualGrade = document.querySelector("#usual").value;

								let finalGrade = document.querySelector("#final").value;
								if (finalGrade - 0 + (usualGrade - 0) == 100) {
									this.usualGrade = usualGrade / 100;
									this.finalGrade = finalGrade / 100;
									this.updataCountGrade();
									this.$message({
										type: "success",
										message: `修改成功`,
									});
								} else {
									this.$message({
										type: "info",
										message: `成绩占比不等于100%`,
									});
								}
							} else {
								this.$message({
									type: "info",
									message: `已取消`,
								});
							}
						},
					}
				);
			},



			async handleDelete2(index, row) {
				let result = await this.$API.teachDelStudent(row.studentId)
				if (result.code == 200) {
					this.$message.success('删除成功')
					this.getStudentInfo()
				}
			},
			handleDelete(index, row) {
				console.log(row);
				this.$alert(
					// 点击确定后修改成绩的弹窗
					`<label for="usualGrade">平时成绩：</label><input type="number" id='usualGrade' value = ${row.dailyScore} placeholder="平时成绩">
        <br />
        <label for="finalGrade">期末成绩：</label><input id='finalGrade' type="number" value = ${row.finalGrade} placeholder="期末成绩">`,
					"修改成绩", {
						confirmButtonText: "确定",
						dangerouslyUseHTMLString: true,
						callback: async (action) => {
							if (action == "confirm") {
								let usualGrade = document.querySelector("#usualGrade").value;
								if (usualGrade <= 100 && usualGrade >= 0) {
									//判断输出是在0-100
									row.dailyScore = usualGrade;

								} else {
									document.querySelector("#usualGrade").value = row.usualGrade;
									this.$message({
										type: "info",
										message: `分数格式不正确`,
									});
								}
								let finalGrade = document.querySelector("#finalGrade").value;
								if (finalGrade <= 100 && finalGrade >= 0) {
									//判断输出是在0-100
									row.finalGrade = finalGrade;
									console.log(row);
									let result = await this.$API.updataStudentGrade(row)
									this.$message({
										type: "success",
										message: `修改成功`,
									});
								} else {
									document.querySelector("#finalGrade").value = row.finalGrade;
									this.$message({
										type: "info",
										message: `分数格式不正确`,
									});
								}
							} else {
								this.$message({
									type: "info",
									message: `已取消`,
								});
							}
						},
					}
				);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.page.currentPage = val;
				this.getStudentInfo()
			}
		},
	};
</script>

<style scoped>
	.page {
		z-index: 999;
		position: fixed;
		bottom: 30px;
		left: 50%;
		transform: translate(-50%, 0);
		background-color: #f1f1f1;
		color: #000;
		border-radius: 10px;
	}
</style>