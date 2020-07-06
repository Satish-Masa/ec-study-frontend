<template>
    <div>
        <b-form @submit="onSubmit">
            <div class="f-input">
                <label for="feedback-user">Email</label>
                <b-input v-model="email" type="email" id="feedback-user"></b-input>
            </div>

            <div class="f-input">
                <label for="text-password">Password</label>
                <b-input type="password" id="text-password" aria-describedby="password-help-block" v-model="password" :state="Passvalidation"></b-input>
                <b-form-invalid-feedback :state="Passvalidation">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not
                    contain spaces, special characters, or emoji.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="Passvalidation">
                    Looks Good.
                </b-form-valid-feedback>
            </div>
            
            <div id="btnsubmit">
                <b-button type="submit" variant="primary">Submit</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'Signin',
    data: function () {
        return {
            email: '',
            password: '',
            token: ''
        }
    },
    computed: {
        Passvalidation() {
            return this.password.length > 7 && this.password.length < 21
        }
    },
    methods: {
        onSubmit(env) {
            env.preventDefault()
            var axios = Axios.create({
                baseURL: 'http://localhost:8080',
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'json'
            })
            axios.post('/user/find', {
                "email": this.email,
                "password": this.password,
            })
            .then(responce => {
                this.token = responce.data.token
                document.cookie = 'token=' + this.token
                window.location.href = '/'
            })
            .catch(function (error) {
                if (error.responce.data.token == "not correct email") {
                    alert('Failed to find your Email!!')
                    window.location.href = '/signup'
                }
                console.log(error.responce.statusText)
                alert('Failed to Login!!')
                window.location.href = '/signin'
            })
        }
    }
}
</script>

<style>
.f-input {
    margin-bottom: 20px;
}

#btnsubmit {
    text-align: center;
    margin-top: 20px;
}
</style>