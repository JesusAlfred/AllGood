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
      x: -config.width/2,
      y: -config.height/2,
      width: config.width,
      height: config.height,
      fill: config.fill,
      stroke: config.stroke,
      draggable: false,
      scaleX: config.scaleX,
      scaleY: config.scaleY,
      strokeScaleEnabled: false,
      rotation: config.rotation
    }
    "
    @transformend="sendEvent"
    @transformstart="sendEvent2"
    ></v-rect>
    <!--<v-text :config="
      {
        x: -config.width/2,
        y: -config.height/2,
        text: config.text,
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'black',
        draggable: false,
      }
    " />
    <v-circle
      :config="{
        x: 0,
        y: 0,
        radius: 1,
        fill: 'back'
      }"
    />
    <v-label :config="
      {
        x: config.width/2 - 24,
        y: -config.height/2
      }
    ">
      <v-image :config="
        {
          image: image,
          visible: !config.hideEdit
        }
      "
      @mouseup="editProcess"
      />
    </v-label>-->
  </v-label>
</template>

<script>
export default {
  name: 'Decision',
  emits: ["transformend", "transformstart", "editProcess"],
  props: {
    config: Object,
  },
  data() {
    return {
      configRect: {
        x: 100,
        y: 50,
        width: 100,
        height: 100,
        fill: 'white',
        stroke: "black",
        rotation: 45
        // shadowBlur: 10
      },
      image: null
    }
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
    },
    editProcess(e){
      this.$emit("editProcess", this.config.name);
    }
  }
}
</script>