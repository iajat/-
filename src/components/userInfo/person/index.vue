<template>
  <div>
    <div v-if="userType==0">
        <el-radio-group v-model="labelPosition" size="small">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.studentName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="formLabelAlign.studentSex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.studentBirthday" style="width: 90%"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action=action 
              :data={type:0}
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
    </div>
    <div  v-if="userType==1">
      <el-radio-group v-model="labelPosition" size="small">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelTeach">
          <el-form-item label="姓名">
            <el-input v-model="formLabelTeach.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="formLabelTeach.teacherSex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelTeach.teacherBirthday" style="width: 90%"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action=action 
              :data={type:1}
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userType:localStorage.getItem('userType'),
      imageUrl:'',
      labelPosition: 'right',
      formLabelAlign: {
        studentName: this.$store.state.login.personInfo.studentName,
        studentSex:this.$store.state.login.personInfo.studentSex,
        studentBirthday:this.$store.state.login.personInfo.studentBirthday,
        studentImg:this.$store.state.login.personInfo.studentImg,
      },
      formLabelTeach:{
        teacherBirthday:this.$store.state.login.personInfo.teacherBirthday,
        teacherName:this.$store.state.login.personInfo.teacherName,
        teacherSex:this.$store.state.login.personInfo.teacherSex,
        teacherImg:this.$store.state.login.personInfo.teacherImg,
      }
    };
  },


  computed: {
    action() {
      // 动态获取API地址
      return process.env.VUE_APP_BASE_API + '/uploadimg'
    }
  },
  methods:{
    async submitForm(){
      let result
      if(this.userType==1){
        result = await this.$API.updataTeachInfo(this.formLabelTeach)
        console.log(result);
        if(result.code == 200){
          this.$message.success(result.message)
          location.reload()
        }else{
          this.$message.error(result.message)
        }
      }else{
        result = await this.$API.updataStudentInfo(this.formLabelAlign)
        if(result.code == 200){
          this.$message.success(result.message)
          location.reload()
        }else{
          this.$message.error(result.message)
        }
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      if(res.code == 200){
        this.imageUrl = URL.createObjectURL(file.raw);
        if(this.userType==1){
          this.formLabelTeach.teacherImg = res.data.serverPath
        }else{
          this.formLabelAlign.studentImg = res.data.serverPath
        }

      }else{
        this.$message({
          message: '上传失败，请检查上传是否正确',
          type: 'warning'
        });
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

  }
}
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
</style>