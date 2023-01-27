<template>
<v-circle :config="config" @transformend="sendEvent">
</v-circle>
</template>

<script lang="js">
export default {
  name: 'Start',
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
      this.$emit("transformend", e);
    }
  }
};
</script>