<template>
<div>
    <b-card id="card" :title="item.Name" img-src="https://placekitten.com/g/400/450" img-alt="Card image" img-left class="mb-3">
      <b-card-text id="desc">
        {{item.Description}}
      </b-card-text>
      <b-card-text class="price">
          Stock: {{item.Stock}}         Price：${{item.Price}}
      </b-card-text>
      <div>
        <label for="sb-inline" class="price">Number of Products</label>
        <b-form-spinbutton id="sb-inline" v-model="value" min="1" :max="item.Stock" inline></b-form-spinbutton>
        <div id="btn">
            <b-button size="lg" pill v-on:click="AddCart" variant="primary">Add to Your Cart</b-button>
        </div>
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
            value: 1
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
        axios.post('/item', {
            "id": this.$route.params['id']
        })
        .then(responce => {
            this.item = responce.data;
        })
        .catch(error => {
            console.log(error)
        })
    },
    methods: {
        AddCart() {
            var cookies = document.cookie;
            var cookieArray = cookies.split(';');
            for (var c of cookieArray) {
                var cArray = c.split('=');
                if (cArray[0] == 'token') {
                    var axios = Axios.create({
                        baseURL: 'http://localhost:8080',
                        headers: {
                            'Authorization': 'Bearer ' + cArray[1],
                            'Content-Type': 'application/json',
                        },
                        responseType: 'json'
                    })
                    
                    axios.post('auth/item/add', {
                        "id": this.$route.params['id'],
                        "number": this.value
                    })
                    .then(responce => {
                        window.location.href = '/add'
                    })
                    .catch(error => {
                        console.log(error)
                        window.alert("商品の追加に失敗しました")
                    })
                }
            }
        }
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
.price {
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