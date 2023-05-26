<template>
  <!-- <el-container class="container" style="height: 100%"> -->
  <!-- <el-container>
    <el-aside width="200px" style="background-color: aqua">
      <mymenu style="height: 100%"></mymenu>
    </el-aside>
    <el-main style="background-color: bisque">
      <loghead></loghead>
      <router-view> </router-view>
    </el-main>
  </el-container> -->
  <el-container>
    <el-header class="head">抢课系统</el-header>
    <el-container>
      <el-aside width="200px"><mymenu style="height: 100%"></mymenu></el-aside>
      <el-main class="main" :style="defaultHeight">
        <loghead></loghead>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import loghead from "@/components/loghead";
import mymenu from "./menu/index.vue";
export default {
  data() {
    return {
      defaultHeight: {
        height: "",
      },
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  methods: {
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 200 + "px";
    },
  },
  components: {
    loghead,
    mymenu,
  },
};
</script>

<style lang="less" scoped>
.head {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(86,92,99);
  text-align: center;
  color: #ffffff;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
}
.main {
  margin-top: 50px;
}
</style>