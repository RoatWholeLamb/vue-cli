<template>
  <div>
    <!-- -->
    我是父元素
    <Son @getSon='gett'  />
  </div>
</template>

<script>
import Son from '../Son'
export default {
  name: 'Farher',
  components:{
    Son
  },

  data() {
    return {
    };
  },

  mounted() {
    
  },

  methods: {
    gett(val){
      console.log(val);
    }
  },
};
</script>