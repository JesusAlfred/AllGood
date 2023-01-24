<template>
<v-stage 
  ref="stage" 
  :config="stageSize"
  class="stage"
  >
      <v-layer 
      ref="layer"
      class="layer"
      >

      <!-- Diagram -->
      <!-- <Start /> -->
      <!-- <End /> -->
      <!-- <Decision /> -->
        <Process />
      </v-layer>
    </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
import Start from '../components/Start.vue';
import End from '../components/End.vue';
import Decision from '../components/Decision.vue';
import Process from '../components/Process.vue';

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      isDragging: false
    };
  },
  components: {Start, End, Decision, Process},
  methods: {
    handleDragStart() {
      this.isDragging = true;
    },
    handleDragEnd() {
      this.isDragging = false;
    },
    exampleFunction() {
      console.log("Hola");
    }

  }
};
</script>