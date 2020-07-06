<template>
  <div id="app">
    <myheader></myheader>
    <b-container class="bv-example-row">
      <b-col col="8">
        <div id="vuelogo">
          <img src="./assets/logo.png">
        </div>
        <router-view/>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import myheader from './components/Myheader'
export default {
  name: 'App',
  components: {
    myheader
  }
}
</script>

<style>
#vuelogo {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
