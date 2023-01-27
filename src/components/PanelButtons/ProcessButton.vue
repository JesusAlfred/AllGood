<template>
  <v-label 
    :config="{ 
      listening: true,
      x: position.x,
      y: position.y
    }"
    >
      <Process
        :config="{
          name: 'Pprocess',
          x: 20,
          y: 10,
          width: 80,
          height: 40,
          fill: 'white',
          stroke: 'black',
          draggable: true,
          text: '',
          scaleX: 1,
          scaleY: 1,
          hideEdit: true
        }"
      />
      <v-text 
        :config="{
          x: 0,
          y: 55,
          text: 'Proceso',
          fontFamily: 'Calibri',
          fontSize: 18,
          padding: 0,
          fill: 'black',
          draggable: false,
          align:'center',
          width: 120
        }"
        />
      <v-rect
        :config="{
          name: 'Pprocess',
          x: 0,
          y: 0,
          width: 120,
          height: 73,
          stroke: 'black',
          strokeWidth: 1,
        }"
      />
    </v-label>
</template>

<script lang="js">
import Process from '@/components/Process.vue'
export default {
  name: 'ProcessButton',
  props: {
    position: Object
  },
  components:{Process},
  data() {
    return {
    };
  }
};
</script>