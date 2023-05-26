<template>
    <el-container>
      <el-header class="head">抢课系统</el-header>
      <el-main style="  overflow: hidden;">
        <loghead></loghead>
        <router-view></router-view>
      </el-main>
    </el-container>
  </template>
  
  
  <script>
  import loghead from "@/components/loghead";
  export default {
    data() {
      return {

      };
    },
    mounted() {
     
    },
    components: {
      loghead,
    },
  };
  </script>
  
  <style lang="less" scoped>
  </style>