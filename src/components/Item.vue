<template>
<div>
    <b-card id="card" :title="item.Name" img-src="https://placekitten.com/g/400/450" img-alt="Card image" img-left class="mb-3">
      <b-card-text id="desc">
        {{item.Description}}
      </b-card-text>
      <b-card-text id="price">
          値段：{{item.Price}}
      </b-card-text>
      <div id="btn">
        <b-button size="lg" pill :to="`/item/${ $route.params['id'] }/buy`" variant="primary">購入する</b-button>
      </div>
    </b-card>
</div>
</template>

<script>
import Axios from 'axios'

export default {
    name: 'Item',
    data () {
        return {
            item: null,
        }
    },
    mounted() {
        var axios = Axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'json'
        })
        axios.post('/item', {"id": this.$route.params['id']})
        .then(responce => {
            this.item = responce.data;
        })
        .catch(error => {
            console.log(error)
        })
    } 
}
</script>

<style>
h4 {
    font-size: 3.0rem;
}

#desc {
    font-size: 1.5rem;
    margin-bottom: 4rem;
}
#price {
    font-size: 2.0rem;
}
#btn {
    text-align: center;
    margin-top: 8rem;
}

.card-title {
    margin-bottom: 3rem;
}
.card-body {
    width: 600px;
}
</style>