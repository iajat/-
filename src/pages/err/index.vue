<template>
  <div>
    <h1>err not Found 404 {{s}}秒后跳转</h1>

  </div>
</template>

<script>
export default {
  data() {
    return {
      s: 3,
      time: null,
    };
  },
  mounted() {

      this.time = setInterval(() => {
        if(this.s<2){
          clearInterval(this.time)
          this.$router.replace('/log')
        }
        this.$nextTick(function (){
          this.s--
        });
      }, 1000);
    
  },


};
</script>

<style>
</style>