<template>
  <div @mouseenter="enter()" @mouseleave="leave()" class="contrainer">
    <img :src="imgUrl" />
    <span @click="Info" v-text="name"></span>
    <div>
      <ul v-if="isSelect" style="list-style: none">
        <li v-if="userType == 1" @click="toPage"><img src="./img/首页.svg" />首页</li>

        <li v-if="userType == undefined" @click="toSelectClass">
          <img src="./img/选课.svg" />选课
        </li>
        <li v-if="userType == undefined" @click="classInfo">
          <img src="./img/详情.svg" />选课情况
        </li>
        <li v-if="userType == 0" @click="selectNumber">
          <img src="./img/新增人数.svg" />课程人数
        </li>
        <li v-if="userType == 0" @click="adcGrade">
          <img src="./img/成绩.svg" />学生成绩
        </li>
        <li @click="Info"><img src="./img/个人中心.svg" />个人中心</li>

        <li @click="outLogo"><img src="./img/退出登录.svg" />退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isSelect: false,
      imgUrl: '',
      //teacherImg
      userType: this.$store.state.login.personInfo.teacherPermission
    };
  },

  mounted() {

  },
  watch: {
    // imgUrl: {
    //   handler() {
    //     this.$nextTick(() => {
    //       if (this.userType == 1 || this.userType == 0) {
    //         return process.env.VUE_APP_BASE_API + "/" + this.$store.state.login.personInfo.teacherImg || "./logo.png"
    //       } else {
    //         return process.env.VUE_APP_BASE_API + "/" + this.$store.state.login.personInfo.studentImg || "./logo.png"
    //       }
    //     })
    //   }
    // }
  },
  created() {

    this.$store.watch((state) => {  
      return state.login.personInfo
    }, () => {
      if (localStorage.getItem('userType') == 1) {
        this.userType = this.$store.state.login.personInfo.teacherPermission
        this.imgUrl = process.env.VUE_APP_BASE_API + "/" + this.$store.state.login.personInfo.teacherImg
      } else {
        this.imgUrl = process.env.VUE_APP_BASE_API + "/" + this.$store.state.login.personInfo.studentImg
      }
      
    }
    )
  },
  mounted(){
    if (localStorage.getItem('userType') == 1) {

      this.imgUrl = process.env.VUE_APP_BASE_API + "/" + this.$store.state.login.personInfo.teacherImg
    } else {
      this.imgUrl = process.env.VUE_APP_BASE_API + "/" + this.$store.state.login.personInfo.studentImg
    }
  },
  computed: {

    name() {
      if (localStorage.getItem('userType') == 1) {
        return this.$store.state.login.personInfo.teacherName
      } else {
        return this.$store.state.login.personInfo.studentName
      }
    }
  },
  methods: {
    toPage() {
      this.$router.push("/admin");
    },
    selectNumber() {
      this.$router.push("/teach/selectNumber");
    },
    adcGrade() {
      this.$router.push("/teach/addGrade");
    },
    outLogo() {
      this.$util.delToken();
      this.$router.push("/log");
    },
    toSelectClass() {
      this.$router.push("/student/selectclass");
    },
    classInfo() {
      this.$router.push("/student/classinfi");
    },
    Info() {
      this.$router.push("/userinfi");
    },
    enter(index) {
      this.isSelect = true;
      this.current = index;
    },
    leave() {
      this.isSelect = false;
      this.current = null;
    },
  },
};
</script>
<style lang="less" scoped>
.contrainer {
  z-index: 999;
  display: flex;
  position: fixed;
margin-right: 10px;
  right: 10px;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  span {
    width: 100%;
    color: #ffffff;
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }

  ul {
    color: #ffffff;
    position: absolute;
    top: 10px;
    right: 10px;
    text-align-last: justify;
    text-align: justify;
    cursor: pointer;

    li {
      width: 5em;
      font-size: 12px;
      cursor: pointer;
      margin-top: 5px;
      text-align: right;

      img {
        width: 10px;
        height: 10px;
        vertical-align: middle;
      }
    }
  }
}
</style>