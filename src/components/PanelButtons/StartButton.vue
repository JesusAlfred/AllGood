<template>
  <v-label 
    :config="{ 
      listening: true,
      x:position.x,
      y:position.y
    }"
    >
      <Start
        :config="{
          //name: 'Pstart',
          x: 30,
          y: 30,
          radius: 20,
          fill: 'white',
          stroke: 'black',
          strokeWidth: 4,
        }"
      />
      <v-text 
        :config="{
          x: 0,
          y: 55,
          text: 'Inicio',
          fontFamily: 'Calibri',
          fontSize: 18,
          padding: 0,
          fill: 'black',
          draggable: false,
          align:'center',
          width: 60
        }"
        />
      <v-rect
        :config="{
          name: 'Pstart',
          x: 0,
          y: 0,
          width: 60,
          height: 73,
          stroke: 'black',
          strokeWidth: 1,
        }"
      />
    </v-label>
</template>

<script lang="js">
import Start from '@/components/Start.vue'
export default {
  name: 'StartButton',
  props: {
    position: Object
  },
  components:{Start},
  data() {
    return {
    };
  }
};
</script>