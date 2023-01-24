<template>
    <v-circle :config="configCircle"></v-circle>
    </template>
    
<script lang="js">
    export default {
      name: 'End',
      data() {
        return {
          configKonva: {
            width: 200,
            height: 200
          },
          configCircle: {
            x: 100,
            y: 100,
            radius: 100,
            fill: "black",
            stroke: "black",
            strokeWidth: 4,
            draggable: true
          }
        };
      }
    };
    
</script>