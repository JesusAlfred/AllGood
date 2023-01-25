<template>
  <header>
    <div id="Logo">AllGood</div>
    <div id="Controls">
      <div id="Play">
        <img src="@/assets/play.svg" alt="">
      </div>
      <div id="Stop">
        <img src="@/assets/stop.svg" alt="">
      </div>
    </div>
  </header>
</template>

<script lang="js">
  export default {
    name: 'Header',
    props: {
    },
    data() {
      return {
      };
    },
    methods: {
    }
  };
</script>
<style lang="sass">

</style>
<style scoped lang="scss">
  header{
    height: 40px;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 10px;
  }
  #Controls{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80%;
    #Play{
      height: 100%;
      img{
        height: 100%;
      }
      padding-right: 5px;
    }
    #Stop{
      height: 80%;
      img{
        height: 100%;
      }
    }
  }
  #Logo{
    font-size: 1.6em;
    display: block;
  }
</style>