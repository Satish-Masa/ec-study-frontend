<template>
    <div>
        <div class="mt-4">
            <div v-for="item in items" v-bind:key="item.id">
                <b-card id="card" :title="item.Name" img-src="https://placekitten.com/g/400/450" img-alt="Card image" img-left class="mb-3">
                <b-card-text id="desc">
                    {{item.Description}}
                </b-card-text>
                <b-card-text id="price">
                    Stock: {{item.Stock}}
                    Price：${{item.Price}}
                </b-card-text>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'Cart',
    data () {
        return {
            items: []
        }
    },
    mounted () {
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
                
                axios.post('auth/cart')
                .then(responce => {
                    this.items = responce.data
                })
                .catch(error => {
                    console.log(error)
                    window.location.href = '/signin'
                })
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
#price {
    font-size: 2.0rem;
}

.card-title {
    margin-bottom: 3rem;
}
.card-body {
    width: 600px;
}
</style>