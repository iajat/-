<template>
  <router-view></router-view>
  <!-- <el-container class="container">
    <el-header class="head" style="">选课系统</el-header>
    
  </el-container> -->
</template>

<script>

export default {

  data() {
    return {

    }
  },



  async mounted() {

    let result = await this.$store.dispatch('GetInfo')
    console.log(result);
    if (result!='ok') {
      this.$message.error(result);
      this.$util.delToken();
    }
    if (!localStorage.getItem('token')) {
      this.$router.replace('/log')
    } else {
      if (this.$store.state.login.personInfo.teacherPermission == '1') {
        this.$router.replace('/admin')
      } else if (this.$store.state.login.personInfo.teacherPermission == '0') {
        this.$router.replace('/teach')
      } else if (localStorage.getItem('userType') == 0) {
        this.$router.replace('/student')
      }
    }

  },
  components: {},
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
  background: url("./assets/bac2.png") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  overflow: auto;
}

.head {
  text-align: center;
  color: #ffffffba;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
}

.page {
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #f1f1f1;
  color: #000;
  border-radius: 10px;
}
</style>
