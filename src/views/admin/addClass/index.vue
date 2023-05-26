
<template>
  <div class="container-form">
    <el-form style="" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程名称" prop="courseName">
        <el-input style="width: 50%" v-model="ruleForm.courseName"></el-input>
      </el-form-item>

      <el-form-item label="课程学分" prop="courseCredit">
        <el-input style="width: 50%" v-model.number="ruleForm.courseCredit"></el-input>
      </el-form-item>

      <el-form-item label="课程人数" prop="courseNum">
        <el-input type="number" style="width: 50%" v-model.number="ruleForm.courseNum"></el-input>
      </el-form-item>
      <el-form-item label="课程教室" prop="courseClass">
        <el-input  style="width: 50%" v-model.number="ruleForm.courseClass"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="ruleForm.courseDesc" style="width: 50%;" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="课程图片" prop="">
        <!-- action是计算属性，由动态地址计算而成 -->
        <!-- 这里一格式化就有问题，别格式化了，如果报错了重新写一下data -->
        <!-- action是动态拼接的 -->
        <el-upload class="avatar-uploader" :action="action" :data={type:2} :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import rules from "@/util/rules";
export default {
  data() {
    return {
      imageUrl: "",
      ruleForm: {
        courseCredit: '',
        courseDesc: "",
        courseImg: "",
        courseName: "",
        courseNum: '',
        courseClass:''
      },

      rules: rules,
    };
  },
  computed: {
    action() {
      // 动态获取API地址
      return process.env.VUE_APP_BASE_API + '/uploadimg'
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if(res.code ==200){
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res);
        this.ruleForm.courseImg =  res.data.serverPath
      }
      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let result =  await this.$API.addCourse(this.ruleForm)
          if(result.code ==200){
            this.$message.success('上传成功')
          }else{
            this.$message.error('上传失败')
          }
        } else {
          this.$message.error('规则有误')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.courseDesc = '',
      this.imageUrl = ''
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.container-form {
  position: absolute;

  .demo-ruleForm {
    padding-top: 50px;
    width: 800px;
    background-color: #e8f3ff;
    position: absolute;
    left: 200px;
    top: 80px;
  }
}
</style>