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
      <v-rect :config="rectConfig" />

      <StartButton :position="{x: xPadding, y: 30}"/> 
      <EndButton :position="{x: xPadding + 60 + (panelSize.width - 120 - xPadding*2), y: 30}"/> 
      <ProcessButton :position="{x:xPadding, y: 140}"/>

    </v-layer>
  </v-stage>
</template>

<script lang="js">
import StartButton from './PanelButtons/StartButton.vue';
import EndButton from './PanelButtons/EndButton.vue';
import ProcessButton from './PanelButtons/ProcessButton.vue'

  export default {
    name: 'Panel',
    emits: ["handlePanelMouseDown"],
    props: {
      panelSize: Object
    },
    data() {
        return {
          rectConfig: {
            x: -1,
            y: -1,
            width: this.panelSize.width,
            height: this.panelSize.height + 2,
            fill: '#F9FFFF',
            stroke: 'black',
            strokeWidth: 1,
            listening: false
          },
          xPadding: (this.panelSize.width - 120) / 3
        };
    },
    components: {StartButton, EndButton, ProcessButton},
    methods: {
      handlePanelMouseDown(e) {
        this.$emit("handlePanelMouseDown", e);
      }
    },
    watch: {
      'panelSize': {
        handler(newValue, oldValue) {
          this.rectConfig.width= newValue.width;
          this.rectConfig.height= newValue.height;
          this.xPadding= (newValue.width - 120) / 3
        },
        deep: true
      }
    },
  };
</script>