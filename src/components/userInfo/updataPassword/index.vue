<template>
  <div>
    <div>
      <label class="label" for="oldPassword">新密码：</label>
      <el-input
        v-model="oldPassword"
        class="input"
        id="oldPassword"
        placeholder="请输入密码"
        show-password
      ></el-input>
    </div>
    <div>
      <label class="label" for="newPassword">确认密码：</label>
      <el-input
        v-model="newPassword"
        class="input"
        id="newPassword"
        placeholder="请输入密码"
        show-password
      ></el-input>
    </div>

    <el-button @click="open" type="primary">确认修改</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword:'',
      newPassword:'',
    };
  },
  methods: {
    open() {
      this.$alert("您确认修改吗", "修改密码", {
        confirmButtonText: "确定",
        callback: async (action) => {
          if (action == "confirm") {
            if(this.oldPassword==this.newPassword){
              await this.$API.updataPassword(this.newPassword)
			  
              this.$message({
              type: "success",
              message: `修改成功`,
            });
            }else{
              this.$message({
              type: "info",

              message: `两次结果不相同`,
            })
            }
          } else {
            this.$message({
              type: "info",
              message: `已取消`,
            })
          }
          location.reload();
        },
      })
    },
  },
};
</script>

<style lang="less" scoped>
div {
  .label{
    width: 5em;
  }
  div {
    text-align: center;
   
  }
  div:nth-child(2) {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .input {
    width: 90%;
    
  }
}
</style>