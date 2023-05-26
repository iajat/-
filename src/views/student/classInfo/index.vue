<template>
  <div style="text-align: center">
    <h1>已选课程</h1>
    <div class="container">
      <el-card class="box-card" v-for="(i,index) in courseList" :key="index">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px">{{i.scCourse.courseName}}</span>
        </div>
        <div class="text item">
          <img :src="img +'/'+ i.scCourse.courseImg" alt="" />
        </div>
        <div class="divider"></div>
        <div>
          <span>班级人数：{{ i.scCourse.courseNum - i.scCourse.courseRenum }}</span>
          <span style="margin-left: 20px">个人成绩：{{ i.totalScore==null?'暂无': i.totalScore}}</span>
        </div>

      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      courseList:[],
	  img:process.env.VUE_APP_BASE_API
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch('GetInfo')
    } catch (error) {
      this.$message.error('信息获取失败')
    }
    let obj = {};
	this.courseList=this.$store.state.login.personInfo.scStuscore
    // this.$store.state.login.personInfo.scCourse.forEach((element,index) => {
    //   this.$store.state.login.personInfo.scStuscore.forEach((element2,index)=>{
    //     if(element.courseId == element2.courseId){
    //       obj.totalScore = element2.totalScore
    //     }
    //   })
    //   obj={...element ,...obj}
    //   obj.courseImg = process.env.VUE_APP_BASE_API +'/'+ element.courseImg
    //   this.courseList.push(obj)
    //   obj={}
    // });
  },
  methods: {

  },

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
  border-top: 2px dashed rgba(0, 187, 255, 0.5);
}
</style>