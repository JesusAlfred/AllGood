<template>
<v-stage 
  ref="stage" 
  :config="stageSize"
  @mousedown="handleStageMouseDown"
  @touchstart="handleStageMouseDown"
  >
      <v-layer 
      ref="layer"
      class="layer"
      >

      <!-- Diagram -->
      <Start
        v-for="item in shapes.starts"
        :key="item.id"
        :configCircle="item"
        @transformend="handleTransformEnd"
      />
      <!-- <End /> -->
      <!-- <Decision /> -->
      <!--  <Process /> -->
      <v-transformer ref="transformer" />
      </v-layer>
    </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
import Konva from 'konva';
import Start from '../components/Start.vue';
import End from '../components/End.vue';
import Decision from '../components/Decision.vue';
import Process from '../components/Process.vue';

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      isDragging: false,
      shapes: {
        starts: [
          {
            x: 100,
            y: 100,
            radius: 100,
            fill: "white",
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
            name: "inicio",
          },
          {
            x: 100,
            y: 100,
            radius: 100,
            fill: "white",
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
            name: "inicio2",
          },
        ]
      },
    };
  },
  components: {Start, End, Decision, Process},
  methods: {
    handleDragStart() {
      this.isDragging = true;
    },
    handleDragEnd() {
      this.isDragging = false;
    },
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const shape = this.getShape(this.selectedShapeName);
      // update the state
      shape.x = e.target.x();
      shape.y = e.target.y();
      shape.rotation = e.target.rotation();
      shape.scaleX = e.target.scaleX();
      shape.scaleY = e.target.scaleY();

      // change fill
      shape.fill = Konva.Util.getRandomColor();
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // find clicked shape by its name
      const name = e.target.name();
      const shape = this.getShape(name);
      if (shape) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = '';
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeName } = this;

      const selectedNode = stage.findOne('.' + selectedShapeName);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }
    },
    getShape(name) {
      let shape = undefined;
      for (const s in this.shapes) {
        shape = this.shapes[s].find( (r) => {
          if(r.name === name){
            return r;
          }
        });
        if(shape != undefined) {
          break;
        }
      }
      return shape;
    },
  }
};
</script>