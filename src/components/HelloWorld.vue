<template>
  <div>
    <b-container class="bv-example-row">
      <b-row cols="4">
        <b-col v-for="club in clubs" v-bind:key="club.id">
          <b-card :title="club.description"
                  :img-src="club.img"
                  img-alt="Img"
                  img-top
                  class="card">
              <p class="card-text">
                  {{club.price}}
              </p>
              <div slot="footer">
                  <b-btn variant="primary" block>GO TO</b-btn>
              </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- <b-card-group columns>
      <b-card v-for="club in clubs" 
              v-bind:key="club.id"
              :title="club.description"
              :img-src="club.img"
              img-alt="Img"
              img-top
              class="card">
          <p class="card-text">
              {{club.price}}
          </p>
          <div slot="footer">
              <b-btn variant="primary" block>GO TO</b-btn>
          </div>
      </b-card>
    </b-card-group> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      clubs: [
        {id:1, description:'chelsea', price:1000, img:'https://placekitten.com/g/400/450'},
        {id:2, description:'liverpool', price:900, img:'https://placekitten.com/g/400/450'},
        {id:3, description:'mu', price:800, img:'https://placekitten.com/g/400/450'},
        {id:4, description:'cit', price:700, img:'https://placekitten.com/g/400/450'},
        {id:5, description:'arsenal', price:600, img:'https://placekitten.com/g/400/450'},
        {id:6, description:'tottenham', price:500, img:'https://placekitten.com/g/400/450'},
        {id:7, description:'juventus', price:400, img:'https://placekitten.com/g/400/450'},
        {id:8, description:'madrid', price:300, img:'https://placekitten.com/g/400/450'},
        {id:9, description:'barcelona', price:200, img:'https://placekitten.com/g/400/450'},
        {id:10, description:'psg', price:100, img:'https://placekitten.com/g/400/450'}
      ]
    }
  },
}
</script>

<style>
.card {
  margin-bottom: 40px;
}
</style>
