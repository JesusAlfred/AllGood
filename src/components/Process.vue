<template>
  <v-label :config="
    {
      x: config.x,
      y: config.y,
      draggable: config.draggable,
    }
  ">
    <v-rect :config="
    {
      name: config.name,
      //x: config.x,
      //y: config.y,
      width: config.width,
      height: config.height,
      fill: config.fill,
      stroke: config.stroke,
      draggable: false,
      scaleX: config.scaleX,
      scaleY: config.scaleY,
      strokeScaleEnabled: false,
    }
    "
    @transformend="sendEvent"
    @transformstart="sendEvent2"
    ></v-rect>
    <v-text :config="
      {
        x: 0,
        y: 0,
        text: config.text,
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'black',
        draggable: false,
      }
    " />
    <v-label :config="
      {
        x: config.width - 24,
        y: 0       
      }
    ">
      <v-image :config="
        {
          image: image,
          visible: !config.hideEdit
        }
      "/>
    </v-label>
  </v-label>
</template>

<script lang="js">
  export default {
    name: 'Process',
    emits: ["transformend", "transformstart"],
    props: {
      config: Object,
    },
    data() {
        return {
          image: null
        };
    },
    created() {
      const image = new window.Image();
      image.src = "/img/edit.svg";
      image.onload = () => {
        // set image only when it is loaded
        this.image = image;
      };
    },
    watch: {
    },
    methods: {
      sendEvent(e) {
        this.$emit("transformend", e);
      },
      sendEvent2(e) {
        this.$emit("transformstart", e);
      }
    }
  };
</script>