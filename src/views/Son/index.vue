<template>
  <div>
    <!-- -->
    我是子元素
    <button @click='send'>发送数据</button>
  </div>
</template>

<script>
export default {
  name: 'Son',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    send(){
      this.$emit('getSon','子元素传的数据')
    }
  },
};
</script>