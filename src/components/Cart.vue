<template>
    <div>
        <div class="mt-4">
            <b-alert :show="mail" variant="danger"><a href="/mailcheck/failed" class="alert-link">メールの確認が完了していません</a></b-alert>
            <b-alert :show="i_num">現在、カートに商品が入っていません。</b-alert>
            <div v-for="item in items" v-bind:key="item.ID">
                <b-alert :show="item.Stock < item.Number" variant="danger">以下の商品の在庫に変更があり、購入ができません。</b-alert>
                <b-card v-bind:style="{border: (item.Stock >= item.Number ? '' : '1px solid red')}" id="card" :title="item.Name" img-src="https://placekitten.com/g/400/450" img-alt="Card image" img-left class="mb-3">
                    <b-card-text id="desc">
                        {{item.Description}}
                    </b-card-text>
                    <b-card-text class="num">
                        Number: {{item.Number}}
                    </b-card-text>
                    <b-card-text class="num">
                        Stock: {{item.Stock}}         Price：${{item.Price}}
                    </b-card-text>
                    <div id="btn_card">
                        <b-button size="lg" @click="deleteCart(item.ID)" pill variant="primary">Delete</b-button>
                    </div>
                </b-card>
            </div>
        </div>
        <div id="btn_buy">
            <b-button size="lg" v-if="!check" v-on:click="orderedItem" pill variant="primary">Ordered</b-button>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'Cart',
    data () {
        return {
            items: [],
            mail: false,
            i_num: false,
            check: false
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
                    if (responce.status == 204) {
                        this.check = true
                        this.i_num = true
                    }
                })
                .catch(error => {
                    console.log(error)
                    window.location.href = '/signin'
                })

                axios.post('auth/varidation')
                .then(responce => {
                    var resp = responce.data
                    if (resp != 1) {
                        this.mail = true
                        this.check = true
                    }
                })
                .catch(error => {
                    console.log(error)
                    window.location.href = '/signin'
                })
            }
        }
    },
    methods: {
        deleteCart: function (item_id) {
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

                    console.log(item_id)
                    
                    axios.post('/auth/cart/delete', {"id": item_id})
                    .then(responce => {
                        window.alert("削除に成功しました")
                        location.reload()
                    })
                    .catch(error => {
                        console.log(error)
                        window.alert("削除に失敗しました")
                    })
                }
            }
        },
        orderedItem: function () {
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
                    
                    axios.post('/auth/cart/ordered')
                    .then(responce => {
                        window.location.href = "/ordered"
                    })
                    .catch(error => {
                        console.log(error)
                        window.alert("削除に失敗しました")
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

#btn_card {
    text-align: center;
    margin-top: 8rem;
}

#btn_buy {
    text-align: center;
    margin-top: 8rem;
}

.num {
    font-size: 2.0rem;
    margin-bottom: 3rem;
}

.card-title {
    margin-bottom: 3rem;
}
.card-body {
    width: 600px;
}
</style>