<template>
  <v-line
    v-for="index in Math.floor(stageSize.width/space)"
    :key="index"
    :config="
    {
      x: index*space,
      y: 0,
      points: [0, 0, 0, stageSize.height],
      stroke: 'grey',
      strokeWidth: 1,
      draggable: false
    }"
  />
  <v-line
    v-for="index in Math.floor(stageSize.height/space)"
    :key="index"
    :config="
    {
      x: 0,
      y: index*space,
      points: [0, 0, stageSize.width, 0],
      stroke: 'grey',
      strokeWidth: 1,
      draggable: false
    }"
  />
</template>

<script lang="js">
export default {
  name: 'Grid',
  props: {
    space: Number,
    stageSize: Object
  },
  data() {
    return {
    };
  }
};
</script>