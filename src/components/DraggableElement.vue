<template>
    <main>
        <div class="dragstartzone" ref="draggableElement" @mousedown="startDrag" >Elemento ejemplo {{ index }}</div>
    </main>
</template>

<script>
export default {
    name: 'DraggableElement',

    props: {
        index: null
    },

    data() {
        return {
            dragging: false,
            x: 'no',
            y: 'no',
            element: null
        }
    },
    
    methods: {
        startDrag() {
            this.dragging = true;
            this.x = this.y = 0;
        },

        stopDrag() {
            this.dragging = false;
            this.x = this.y = 'no';
        },

        doDrag(e) {
            if (this.dragging) {
                this.x = e.clientX;
                this.y = e.clientY;
                this.element.left = `${this.x}px`
                this.element.top = `${this.y}px`
                console.log(this.x, this.y)
            }
        }
    },

    mounted() {
        this.element = this.$refs.draggableElement.style;
        this.element.top = `${this.index * 100}px`
        window.addEventListener('mouseup', this.stopDrag);
        window.addEventListener('mousemove', this.doDrag)
    }
}
</script>

<style scoped>
.dragstartzone {
  background-color: red;
  width: 100px;
  height: 100px;
  position: absolute;

}
</style>