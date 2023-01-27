<template>
  <v-label 
    :config="{ 
      listening: true,
      x:position.x,
      y:position.y
    }"
    >
      <End
        :config="{
          //name: 'Pstart',
          x: 30,
          y: 30,
          radius: 20,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 4,
        }"
      />
      <v-text 
        :config="{
          x: 0,
          y: 55,
          text: 'Fin',
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
          name: 'Pend',
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
import End from '@/components/End.vue'
export default {
  name: 'StartButton',
  props: {
    position: Object
  },
  components:{End},
  data() {
    return {
    };
  }
};
</script>