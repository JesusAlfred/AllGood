<template>
    <v-stage 
    ref="panel" 
    :config="panelSize"
    @mousedown="handlePanelMouseDown"
    >
    <v-layer 
    ref="layer"
    class="layer"
    >
      <v-rect
        :config="{
            x: -1,
            y: -1,
            width: panelSize.width,
            height: panelSize.height + 2,
            fill: '#F9FFFF',
            stroke: 'black',
            strokeWidth: 1,
            listening: false
        }">
      </v-rect>


      <Start
        :config="{
            name: 'Pstart',
            x: 30,
            y: 30,
            radius: 20,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 4,
          }"
      />
      <v-label
        :config="{
          name: 'PstartLabel',
          x: 30,
          y: 50,
          text: 'Hello World!',
          fontSize: 50,
          lineHeight: 1.2,
          padding: 10,
          fill: 'green'
        }"
      ></v-label>
    </v-layer>
  </v-stage>
</template>

<script lang="js">
import Start from '../components/Start.vue';
import End from '../components/End.vue';
import Decision from '../components/Decision.vue';
import Process from '../components/Process.vue';

  export default {
    name: 'Panel',
    emits: ["handlePanelMouseDown"],
    props: {
      panelSize: Object
    },
    data() {
        return {
        };
    },
    components: {Start, End, Decision, Process},
    methods: {
      handlePanelMouseDown(e) {
        this.$emit("handlePanelMouseDown", e);
      }
    }
  };
</script>