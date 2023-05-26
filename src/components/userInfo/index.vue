<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>个人中心</h1>
      </div>
      <div @click="updateUser" :class = "{select:select==0}" class="text item ">修改个人信息</div>
      <div @click="updatePassword" :class = "{select:select==1}" class="text item">修改密码</div>
    </el-card>
    <el-card class="box-card2">
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select:-1
    };
  },
  mounted() {
    this.updateUser();
  },
  methods: {
    updateUser() {
      this.select=0
      this.$router.replace({
        name: "updataUser",
      });
    },
    updatePassword() {
      this.select=1
      this.$router.replace({
        name: "updataPassword",
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.text {
  font-size: 20px;
  text-align: center;
  width: auto;
  cursor: pointer;
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
  height: 250px;
}
.box-card2 {
  width: 480px;
  margin-left: 20px;
}
.select{
  background-color: rgb(64,158,255);
  border-radius: 100px;
}
</style>