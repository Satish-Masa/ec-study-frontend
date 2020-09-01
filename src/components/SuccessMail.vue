<template>
    <div>
    <h4>メールの確認が完了しました。</h4>
    <div class="btn_home">
        <b-button size="lg" pill href="/" variant="primary">ホームに戻る</b-button>
    </div>
</div>
</template>

<script>
import Axios from 'axios'

export default {
    name: 'SuccessMail',
    
    mounted() {
        var cookies = document.cookie;
        var cookieArray = cookies.split(';');
        for (var c of cookieArray) {
            var cArray = c.split('=')
            if (cArray[0] == 'token') {
                var axios = Axios.create({
                    baseURL: 'http://localhost:8080',
                    headers: {
                        'Authorization': 'Bearer ' + cArray[1],
                        'Content-Type': 'application/json',
                    },
                    responseType: 'json'
                })
                axios.post('/auth/mailcheck', {
                    "token": this.$route.query.token,
                })
                .catch(function(error) {
                    window.location.href = "/mailcheck/failed"
                })
            }
        }
    }
}
</script>

<style>
h4 {
    text-align: center;
}

.btn_home {
    text-align: center;
    margin-top: 4rem;
}
</style>