<template>
<Header @toggleGrid="toggleGrid"/>
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
      <Grid
        v-if="grid"
        :space="30"
        :stageSize="stageSize"
      />
      <Start
        v-for="item in shapes.starts"
        :key="item.id"
        :config="item"
        @transformend="handleTransformEnd"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
      />
      <End 
        v-for="item in shapes.ends"
        :key="item.id"
        :config="item"
        @transformend="handleTransformEnd"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
      />
      <!-- <Decision /> -->
      <Process 
        v-for="item in shapes.processes"
        :key="item.id"
        :config="item"
        @transformend="handleTransformEnd"
        @transformstart="handleTransformStart"
        @editProcess="editProcess"
      />
      <v-line
        :config="
        {
          x: 0,
          y: 0,
          points: line.points,
          stroke: 'red',
          strokeWidth: 1,
          draggable: true
        }"
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
const width = document.body.clientWidth;
const height = window.innerHeight - 40 + 720;

import Start from '../components/Start.vue';
import End from '../components/End.vue';
import Decision from '../components/Decision.vue';
import Process from '../components/Process.vue';
import Panel from '../components/Panel.vue';
import Grid from '../components/Grid.vue';

import Header from '../components/Header.vue';

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
      },
      isDragging: false,
      enabledAnchors: [],
      shapes: {
        starts: [
        ],
        ends: [
        ],
        processes: [
        ]
      },
      grid: false,
      rows: [{}],
      line: {points: []},
      startCounter: 0,
      endCounter: 0,
      processCounter: 0
    };
  },
  components: {Start, End, Decision, Process, Header, Panel, Grid},
  created() {
    window.addEventListener("resize", this.resizeScreen);
    setTimeout(() => {
      this.resizeScreen();
    }, 500);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeScreen);
  },
  methods: {
    handleDragStart(e) {
      this.isDragging = true;
    },
    handleDragEnd(e) {
      this.isDragging = false;
      const name = this.selectedShapeName;
      const shape = this.getShape(name);
      const shapetype = this.getSelectedShapeType(name);
      let newx = e.target.attrs.x;
      let newy = e.target.attrs.y;
      shape.x = newx;
      shape.y = newy;
      setTimeout(() => {
        shape.x = Math.round(newx/30)*30;
        shape.y = Math.round(newy/30)*30;
      }, 100); 
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
      if(false) {
        let temp = [...this.line.points]
        const nx = e.evt.layerX;
        const ny = e.evt.layerY;
        const lx = temp[temp.length-2];
        const ly = temp[temp.length-1];
        let x = nx;
        let y = ny;
        if(lx != undefined && ly != undefined){
          if(Math.abs(nx - lx) > Math.abs(ny-ly)){
            y = ly;
          }else{
            x = lx;
          } 
        }

        temp.push(x);
        temp.push(y);
        this.line.points = temp;
        console.log(...this.line.points);
        return;
      }
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
    editProcess(name){
      const shape = this.getShape(name);
      shape.text = this.getNewText();;
    },
    getNewText(){
      return prompt("Ingrese instrucciones", "");
    },
    handlePanelMouseDown(e){
      if (e.target === e.target.getStage()) {
        return;
      }
      const name = e.target.name();
      const initx = 30;
      const inity = 30;
      switch (name){
        case 'Pstart':
          this.startCounter += 1;
          const PstartBase = {
            name: "Pinicio" + this.startCounter.toString(),
            x: initx,
            y: inity,
            radius: 20,
            fill: "white",
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
          }
          this.shapes.starts.push(PstartBase);
          break
        case 'Pend':
          this.endCounter += 1;
          const PendBase = {
            name: "Pend" + this.startCounter.toString(),
            x: initx,
            y: inity,
            radius: 20,
            fill: "black",
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
          }
          this.shapes.ends.push(PendBase);
          break
        case 'Pprocess':
          this.processCounter += 1;
          const PprocessBase = {
            name: "Pprocess" + this.processCounter.toString(),
            x: initx,
            y: inity,
            width: 200,
            height: 100,
            fill: 'white',
            stroke: "black",
            draggable: true,
            text: "...",
            scaleX: 1,
            scaleY: 1,
            hideEdit: false
          }
          this.shapes.processes.push(PprocessBase);
          break
      }
    },
    toggleGrid(e){
      this.grid = !this.grid;
    },
    resizeScreen(e){
      const nstageSize= {
        width: document.body.clientWidth * 4/5,
        height: height
      };
      this.stageSize= nstageSize;
      const npanelSize= {
        width: document.body.clientWidth * 1/5,
        height: window.innerHeight-40,
      };
      this.panelSize= npanelSize;
    }
  }
};
</script>
<style scoped>
  #container{
    display: flex;
    flex-direction: row;
    padding-top: 40px;
  }
  #Panel{
    position: fixed;
    z-index: 1000;
  }
  #Canva{
    padding-left: 20%;
    margin: 0;
  }
</style>