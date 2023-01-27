<template>
<Header/>
<div id="container">
<div id="Panel">
  <Panel 
    :panelSize="panelSize"
    @handlePanelMouseDown="handlePanelMouseDown"
  />
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
        @transformstart="handleTransformStart"
      />
      <v-transformer
        ref="transformer"
        :rotateEnabled="false"
        :flipEnabled="false"
        :ignoreStroke="true"
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
import Panel from '../components/Panel.vue'

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
            fill: 'red',
            stroke: "black",
            draggable: true,
            text: "Nada",
            scaleX: 1,
            scaleY: 1,
            hideEdit: false
          }
        ]
      },
      startCounter: 0,
      tScaleX: 1,
      tempW: 1,
      tempH: 1,
    };
  },
  components: {Start, End, Decision, Process, Header, Panel},
  methods: {
    handleDragStart() {
      this.isDragging = true;
    },
    handleDragEnd() {
      this.isDragging = false;
    },
    handleTransformStart(e) {
      const shape = this.getShape(this.selectedShapeName);
      if (shape.hasOwnProperty('hideEdit')){
        shape.hideEdit = true;
      }
    },
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const shape = this.getShape(this.selectedShapeName);
      // update the state
      const parent = e.target.getParent();
      shape.x = parent.x();
      shape.y = parent.y();
      shape.rotation = parent.rotation();

      shape.scaleX = e.target.scaleX();
      shape.scaleY = e.target.scaleY();
      setTimeout(() => {
        shape.scaleX = 1;
        shape.scaleY = 1;
        shape.width = Math.max(shape.width * e.target.scaleX(), 5);
        shape.height = Math.max(shape.height * e.target.scaleY(), 5);
        if (shape.hasOwnProperty('hideEdit')){
        shape.hideEdit = false;
        }
      }, 10);
      
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
            this.enabledAnchors = ['middle-right', 'bottom-center', 'bottom-right'];
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