<template>
    <v-rect :config="configRect" ></v-rect>
    <!-- <h1>Hola</h1>     -->
</template>

<script>
export default {
    name: 'Decision',
    data() {
        return {
            configRect: {
                x: 100,
                y: 50,
                width: 100,
                height: 100,
                fill: 'white',
                stroke: "black",
                rotation: 45
                // shadowBlur: 10
            }
        }
    }
}
</script>