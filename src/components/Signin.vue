<template>
    <div>
        <b-form @submit="onSubmit">
            <label for="feedback-user">User Name</label>
            <b-input v-model="username" :state="Uservalidation" id="feedback-user"></b-input>
            <b-form-invalid-feedback :state="Uservalidation">
                Your user name must be 0-20 characters long.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="Uservalidation">
                Looks Good.
            </b-form-valid-feedback>


            <label for="text-password">Password</label>
            <b-input type="password" id="text-password" aria-describedby="password-help-block" v-model="password" :state="Passvalidation"></b-input>
            <b-form-invalid-feedback :state="Passvalidation">
                Your password must be 8-20 characters long, contain letters and numbers, and must not
                contain spaces, special characters, or emoji.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="Passvalidation">
                Looks Good.
            </b-form-valid-feedback>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'Signin',
    data: function () {
        return {
            username: '',
            password: '',
            token: ''
        }
    },
    computed: {
        Uservalidation() {
            return this.username.length > 0 && this.username.length < 21
        },
        Passvalidation() {
            return this.password.length > 7 && this.password.length < 21
        }
    },
    methods: {
        onSubmit(env) {
            env.preventDefault()
            var cookies = document.cookie
            var cookiesArray = cookies.split(';')
            var token
            for (var c of cookiesArray) {
                var cArray = c.split('=')
                if (cArray[0] == 'token') {
                    token = cArray[1]
                }
            }
            var axios = Axios.create({
                baseURL: 'http://localhost:8080',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                responseType: 'json'
            })
            axios.post('/user/find', {
                "name": this.username,
                "password": this.password,
            })
            .then(responce => (this.toke = responce.data.token))
            .catch(function (error) {
                console.log(error.responce.statusText)
                alert('Failed to Login!!')
                window.location.href = '/login'
            })
            document.cookie = 'token=' + this.token
            window.location.href  = '/'
        }
    }
}
</script>