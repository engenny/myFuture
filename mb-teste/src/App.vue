<template>
  <div class="app-container">
    <Form />
  </div>
</template>

<script>
import Form from './components/form.vue'

export default {
  name: 'App',
  components: {
    Form
  }
}
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #f76724, #f2be94);
}
</style>
