
<template>
  <div class="container-form">
    <el-form style="" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="老师姓名" prop="teacherName">
        <el-input style="width: 50%" v-model="ruleForm.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="teacherSex">
        <el-radio-group v-model="ruleForm.teacherSex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="院系" prop="deptId">
        <el-select v-model="ruleForm.deptId" placeholder="请选择活动区域">
          <el-option v-for="(i,index) in deptList" :key="index" :label="i.deptName" :value="i.deptId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" >
        <el-col :span="11">
          <el-form-item prop="teacherBirthday">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.teacherBirthday" style="width: 50%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- 这里一格式化就有问题，别格式化了，如果报错了重新写一下data -->
      <!-- action是动态拼接的 -->
      <el-form-item label="上传头像" prop="">
        <el-upload class="avatar-uploader" :action=action :data={type:1}
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
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
          teacherBirthday :'',
          teacherName :'',
          teacherSex : '',
          deptId:'',
          teacherImg:''
      },
      deptList:[],
      rules: rules,
    };
  },
  async mounted(){
    let result
    try {
      result = await this.$API.getDept();
    } catch (error) {
      this.$message.error(result.message)
    }
    if(result.code==200){
      this.deptList = result.data
    }
    
  },
  computed: {
    action() {
      // 动态获取API地址
      return process.env.VUE_APP_BASE_API + '/uploadimg'
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if(res.code==200){
        this.imageUrl = URL.createObjectURL(file.raw);
        this.ruleForm.teacherImg = res.data.serverPath
      }else{
        this.$message.error('上传有误')
      }
     
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let result =  await this.$API.addTeacher(this.ruleForm)
          if(result.code == 200 ){
            this.$message.success('添加成功')
			this.resetForm(formName)
			
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
		this.imageUrl='',
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
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