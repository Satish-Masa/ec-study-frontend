<template>
  <div>
    <b-container class="bv-example-row">
      <b-row cols="4">
        <b-col v-for="item in items" v-bind:key="item.id">
          <b-card :title="item.Name"
                  img-src="https://placekitten.com/g/400/450"
                  img-alt="Img"
                  img-top
                  class="card">
              <p class="card-text">
                  Stock: {{item.Stock}}         Price：${{item.Price}}
              </p>
              <div slot="footer">
                  <b-btn :to="`/item/${ item.ID }`" variant="primary" block>Check!!</b-btn>
              </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      items: []
    }
  },
  mounted() {
    var axios = Axios.create({
      baseURL: 'http://localhost:8080',
      responseType: 'json'
    })
    axios.get('/items/list')
    .then(responce => {
      this.items = responce.data;
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>

<style>
.card {
  margin-bottom: 40px;
}
</style>
