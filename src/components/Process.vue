<template>
    <v-rect :config="config" @transformend="sendEvent"></v-rect>
</template>

<script lang="js">
  export default {
    name: 'Process',
    emits: ["transformend"],
    props: {
      config: Object,
    },
    data() {
        return {
        };
    },
    methods: {
      sendEvent(e) {
        console.log("hola");
        this.$emit("transformend", e);
      }
    }
  };
</script>