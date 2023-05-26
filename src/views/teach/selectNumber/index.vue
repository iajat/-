<template>
  <div>
    <div class="container">
      <el-card class="box-card">
        <div class="text item">
          <div slot="header" class="clearfix">
            <span style="font-size: 30px">{{ courseInfo.courseName }}</span>
          </div>
          <div class="text item"> 
            <img :src="scCourseImg" alt="" />
          </div>
          <div>{{courseInfo.courseDesc}}</div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div class="charts"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import myChart from "@/util/myChart";
export default {
  data() {
    return {
      courseInfo:{},
      option: {
        title: {
          text: "学生选课情况",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "选课情况",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "已选人数" },
              { value: 735, name: "剩余名额" },
            ],
          },
        ],
      },
     
      search: "",
    };
  },
  components: {

  },  
  async mounted() {	
    await this.$store.dispatch('GetInfo')
	let scCourse =  this.$store.state.login.personInfo.scCourse
	console.log(scCourse);
    this.courseInfo =  this.$store.state.login.personInfo.scCourse
    this.option.series[0].data[0].value = scCourse.courseRenum
    this.option.series[0].data[1].value=scCourse.courseNum,
    
    myChart(document.querySelector(".charts"), this.option);
  //  this.getStudentInfo(1);

  },
  computed:{
    scCourseImg(){
      if(this.courseInfo.courseImg){
        return process.env.VUE_APP_BASE_API + '/' + this.courseInfo.courseImg
      }else{
        return require('@/assets/logo.png')
      }
      
    }
  },
  methods: {
    // async getStudentInfo(number) {
    //   let resoult = await this.$API.getStudentInfoList(number, 10)


    //   if (resoult.code == 200) {
    //     resoult.data.records.forEach(element => {
    //       this.tableData.push(element.scStudent)
    //     });
    //     this.page.currentPage = resoult.data.current
    //     this.page.total = resoult.data.total
    //   }
    // },

   
    // async handleDelete(index, row) {

    //   let result = await this.$API.delStudent(row.studentId)
    //   if (result.code == 200) {
    //     this.$message.success('删除成功')
    //     this.tableData.forEach(element => {
    //       this.tableData.forEach((element, index) => {
    //         if (element.studentId == row.studentId) {
    //           this.tableData.splice(index, 1)
    //         }
    //       });
    //     });
    //   } else {
    //     this.$message.error(result.message)
    //   }
    // },
  },
};
</script>

<style scoped>
.container {
  flex-flow: wrap;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.text {
  font-size: 14px;
}

img {
  margin-top: 20px;
  border-radius: 50%;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  text-align: center;
}

.box-card2 {
  margin-left: 200px;
}

.charts {
  width: 400px;
  height: 400px;
}
</style>