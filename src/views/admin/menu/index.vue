<template>
  <div class="container">
    <el-menu
      default-active=""
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>学生管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">单个添加</template>
          <el-menu-item @click="toAddSt" index="1-1">添加学生</el-menu-item>
          <el-menu-item @click="toUpdataST" index="1-2">管理学生</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="批量添加">
          <el-menu-item @click="toImport" index="1-3">批量导入</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>教师管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">管理</template>
          <el-menu-item @click="toAddTea" index="2-1">添加教师</el-menu-item>
          <el-menu-item @click="toUpdataTea" index="2-2">管理教师</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item @click="toClass" index="3">
        <i class="el-icon-document"></i>
        <span slot="title">发布课程</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <i class="el-icon-setting"></i>
        <span slot="title">添加管理员</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    toAddSt() {
      this.$router.replace("/admin/addStudent");
    },
    toUpdataST() {
      this.$router.replace("/admin/updataStudent");
    },
    toImport() {
      this.$router.replace("/admin/allImport");
    },
    toAddTea() {
      this.$router.replace("/admin/addTeach");
    },
    toUpdataTea() {
      this.$router.replace("/admin/updataTeach");
    },
    toClass() {
      this.$router.replace("/admin/addClass");
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  top: 50px;
  position: fixed;
  width: 200px;
  min-height: calc(100% - 50px);
  overflow: hidden;
}
</style>
  
