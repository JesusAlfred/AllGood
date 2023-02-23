  <template>
    <v-label 
      :config="{ 
        listening: true,
        x: position.x,
        y: position.y
      }"
      >
        <Decision
          :config="{
            name: 'Pdecision',
            x: 35 + 80/2,
            y: 5 + 40/2,
            width: 35,
            height: 35,
            fill: 'white',
            stroke: 'black',
            draggable: true,
            text: '',
            scaleX: 1,
            scaleY: 1,
            hideEdit: true,
            rotation: 45
          }"
        />
        <v-text 
          :config="{
            x: 0,
            y: 55,
            text: 'Decision',
            fontFamily: 'Calibri',
            fontSize: 18,
            padding: 0,
            fill: 'black',
            draggable: false,
            align:'center',
            width: 120
          }"
          />
        <v-rect
          :config="{
            name: 'Pdecision',
            x: 0,
            y: 0,
            width: 120,
            height: 73,
            stroke: 'black',
            strokeWidth: 1,
          }"
        />
      </v-label>
  </template>
  
  <script lang="js">
  import Decision from '../Decision.vue';
  export default {
    name: 'DecisionButton',
    props: {
      position: Object
    },
    components:{Decision},
    data() {
      return {
      };
    }
  };
  </script>