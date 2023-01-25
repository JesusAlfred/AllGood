<template>
    <v-circle :config="configCircle" @transformend="sendEvent"></v-circle>
    </template>

<script lang="js">
export default {
  name: 'End',
  emits: ["transformend"],
  props: {
    configCircle: Object,
  },
  mounted() {
    
  },
  data() {
    return {
      configKonva: {
        width: 200,
        height: 200
      },
    };
  },
  methods: {
    sendEvent(e) {
      this.$emit("transformend", e);
    }
  }
};
</script>