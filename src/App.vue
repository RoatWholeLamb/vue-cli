<template>
  <div>
    hello app
    <Home />
    <Farher />
  </div>
</template>

<script>
import Home from './views/Home'
import Farher from './views/Farher'

export default {
  name: 'App',
  components:{
    Home,
    Farher
  },

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>