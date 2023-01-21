<template>
  <main v-for="n in 5">
      <DraggableElement :index="n - 1"/>
  </main>
</template>

<script>
import DraggableElement from '../components/DraggableElement.vue';
export default {
  name: 'HomeView',
  components: {DraggableElement},
}
</script>
