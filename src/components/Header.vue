<template>
  <header>
    <div id="Logo">AllGood</div>
    <div id="Controls">
      <span>Grid</span>
      <label class="switch">
        <input type="checkbox" @click="toggleGrid">
        <div class="slider round"></div>
      </label>
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
    emits: ["toggleGrid"],
    props: {
    },
    data() {
      return {
      };
    },
    methods: {
      toggleGrid(e) {
        this.$emit("toggleGrid", e);
      },
    }
  };
</script>
<style lang="sass">

</style>
<style scoped lang="scss">
  header{
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
    height: 40px;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 10px;
    position: fixed;
    z-index: 10000;
    width: 100%;
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
      padding: 0 5px;
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

  //Switch styles
  .switch {
    position: relative;
    display: inline-block;
    width: 54px;
    height: 80%;
  }
  .switch input {
    display: none;
  }
  .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 80%;
    top: 10%;
    aspect-ratio : 1 / 1;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #101010;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #101010;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>