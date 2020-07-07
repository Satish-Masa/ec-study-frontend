<template>
    <div>
        <b-form @submit="onSubmit">
            
            <b-form-group
                id="input-group-1"
                class="f-input"
                label="Email Address"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter Email"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Password"
                label-for="input-2"
                class="f-input"
            >
                <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Enter Password"
                    :state="Passvalidation"
                ></b-form-input>
                <b-form-invalid-feedback :state="Passvalidation">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not
                    contain spaces, special characters, or emoji.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="Passvalidation">
                    Looks Good.
                </b-form-valid-feedback>
            </b-form-group>

            <div id="btnsubmit">
                <b-button type="submit" variant="primary">Submit</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'Signup',
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        };
    },
    computed: {
        Passvalidation() {
            return this.form.password.length > 7 && this.form.password.length < 21
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
            axios.post('/auth/signup', {
                "email": this.form.email,
                "password": this.form.password,
            })
            .then(responce => {
                console.log('status:', responce.status)
                window.location.href = '/signin'
            })
            .catch(function (error)  {
                alert('Failed to Signup!!')
                window.location.href = '/signup'
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