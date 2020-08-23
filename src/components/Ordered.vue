<template>
    <div>
         <b-list-group v-for="item in items" v-bind:key="item.ID">
             <b-list-group-item>{{ item.Name }}： {{ item.Price }} × {{ item.Number }} = {{ item.Price * item.Number }}円</b-list-group-item>
         </b-list-group>
         <p id="totalPrice">合計： {{ totalPrice }}円</p>
        <div id="btn_buy">
            <b-button size="lg" v-on:click="buy" pill variant="primary">Buy!!</b-button>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'Ordered',
    data () {
        return {
            items: []
        }
    },
    computed: {
        totalPrice: function () {
            return this.items.reduce(function (sum, item) {
                return sum + (item.Price * item.Number)
            }, 0)
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
    },
    methods: {
        buy() {
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
                        }
                    })
                    
                    axios.post('/auth/buy')
                    .then(responce => {
                        window.location.href = "/buy"
                    })
                    .catch(error => {
                        console.log(error)
                        window.location.href = '/signin'
                    })
                }
            }
        },
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

#btn_card {
    text-align: center;
    margin-top: 8rem;
}

#btn_buy {
    text-align: center;
    margin-top: 8rem;
}
#totalPrice {
    text-align: center;
    margin-top: 3rem;
    font-size: 4rem;
}

.num {
    font-size: 2.0rem;
    margin-bottom: 3rem;
}
.list-group-item {
    font-size: 2rem;
}
.card-title {
    margin-bottom: 3rem;
}
.card-body {
    width: 600px;
}
</style>