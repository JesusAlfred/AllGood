<template>
<Header/>
<div id="container">
<div id="Panel">
  <v-stage 
    ref="panel" 
    :config="panelSize"
    @mousedown="handlePanelMouseDown"
    >
    <v-layer 
    ref="layer"
    class="layer"
    >
      <v-rect
        :config="{
            x: -1,
            y: -1,
            width: panelSize.width + 1,
            height: panelSize.height + 2,
            fill: '#F9FFFF',
            stroke: 'black',
            strokeWidth: 1
        }">
      </v-rect>
      <Start
        :config="{
            name: 'Pstart',
            x: 30,
            y: 30,
            radius: 20,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 4,
          }"
      />
    </v-layer>
  </v-stage>
</div>
<div id="Canva">
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
        :config="item"
        @transformend="handleTransformEnd"
      />
      <End 
        v-for="item in shapes.ends"
        :key="item.id"
        :config="item"
        @transformend="handleTransformEnd"
      />
      <!-- <Decision /> -->
      <Process 
        v-for="item in shapes.processes"
        :key="item.id"
        :config="item"
        @transformend="handleTransformEnd"
      />
      <v-transformer
        ref="transformer"
        :rotateEnabled="false"
        :flipEnabled="false"
        :enabledAnchors= "enabledAnchors"/>
    </v-layer>
  </v-stage>
</div>
</div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight - 40;
import Konva from 'konva';
import Start from '../components/Start.vue';
import End from '../components/End.vue';
import Decision from '../components/Decision.vue';
import Process from '../components/Process.vue';

import Header from '../components/Header.vue'

export default {
  data() {
    return {
      stageSize: {
        width: width * 4/5,
        height: height
      },
      panelSize: {
        width: width * 1/5,
        height: height,
        fill: 'red'
      },
      isDragging: false,
      enabledAnchors: [],
      shapes: {
        starts: [
          {
            name: "inicio",
            x: 100,
            y: 100,
            radius: 20,
            fill: "white",
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
          }
        ],
        ends: [
          {
            name: "end",
            x: 100,
            y: 100,
            radius: 20,
            fill: "black",
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
          }
        ],
        processes: [
          {
            name: "process1",
            x: 100,
            y: 50,
            width: 200,
            height: 100,
            fill: 'white',
            stroke: "black",
            draggable: true,
            // shadowBlur: 10
          }
        ]
      },
      startCounter: 0
    };
  },
  components: {Start, End, Decision, Process, Header},
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
      console.log(shape.name);
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
        let caso = this.getSelectedShapeType(this.selectedShapeName);
        switch(caso){
          case 'starts':
            this.enabledAnchors = [];
          break
          case 'ends':
            this.enabledAnchors = [];
          break
          case 'processes':
            this.enabledAnchors = ['top-center', 'middle-right', 'middle-left', 'bottom-center'];
          break
        }
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
    getSelectedShapeType(name){
      let shape = undefined;
      let type_of_shape;
      for (const s in this.shapes) {
        shape = this.shapes[s].find( (r) => {
          if(r.name === name){
            return r;
          }
        });
        if(shape != undefined) {
          type_of_shape = s;
          break;
        }
      }
      return type_of_shape;
    },
    handlePanelMouseDown(e){
      if (e.target === e.target.getStage()) {
        return;
      }
      const name = e.target.name();
      switch (name){
        case 'Pstart':
          this.startCounter += 1;
          const PstartBase = {
            name: "Pinicio" + this.startCounter.toString(),
            x: 100,
            y: 100,
            radius: 20,
            fill: "white",
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
          }
          this.shapes.starts.push(PstartBase);
          break
      }
    }
  }
};
</script>
<style scoped>
  #container{
    display: flex;
    flex-direction: row;
  }
</style>