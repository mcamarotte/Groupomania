<template>
  <div class="page-container">
    <b-container fluid>
      <b-row class="text-center justify-content-center">
        <b-col cols="12" lg="4">
          <b-card
            class="account-card border-2 p-3 mb-5 mt-6 bg-blue rounded">
            <div class="pt-sm-3 pt-lg-0">
              <b-card-text class="login-text h4">Sign in</b-card-text>

              <b-form>
                <b-form-group>
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="account-input text-dark mb-2 mt-4 pl-3 w-100">
                  </b-form-input>

                  <b-form-input
                    id="password"
                    type="password"
                    placeholder="Password"
                    v-model="input.password"
                    class="account-input text-dark mb-2 pl-3 w-100">
                  </b-form-input>
                </b-form-group>

                <button
                  v-on:click.stop="login()"
                  type="submit"
                  id="login-button"
                  class="account-btn font-weight-bold">
                  Login
                </button>

                <p class="my-3 text-danger">{{ errorMessage }}</p>
              </b-form>
            </div>
            <div class="line my-3"></div>
            <p class="font-small grey-text d-flex justify-content-center mb-1">
              You are not registered
              <router-link to="/signup" class="font-weight-bold ml-1"> Create an account </router-link>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'

export default {
  name: 'Login',
  props: ['notification'],
  data () {
    return {
      errorMessage: '',
      input: {
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    if (this.$route.query.deletedAccount) {
      this.$bvToast.toast('Your account has been deleted', {
        autoHideDelay: 4000
      })
    }
  },

  methods: {
    login () {
      if (this.input.email != '' && this.input.password != '') {
        apiClient
          .post('api/auth/login', this.input)
          .then(data => {
            if (!data.token) {
              this.errorMessage = 'User not found'
            } else {
              localStorage.setItem('userToken', data.token)
              localStorage.setItem('userData', JSON.stringify(data.user))
              if(localStorage.getItem("userToken") != null){
              router.push({ name: 'Posts' })
              } 
            }
          })
          .catch(error => {
            if (error.error) {
              return (this.errorMessage = error.error)
            }
            this.errorMessage = 'Connection problem'
          })
      } else {
        this.errorMessage = 'Please enter an email and password'
      }
    }
  }
}
</script>

<style>

a {
  text-decoration: none;
  color: #2c3e50 !important;
}

p {
  gap: 10px;
}

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: rgba(192, 192, 192, 0.5);
}

.account-input,
.account-input:-webkit-autofill {
  border: none;
  -webkit-text-fill-color: #212529;
  box-shadow: 0 0 0px 1000px rgba(32, 120, 244, 0.2) inset;
  transition: background-color 5000s ease-in-out 0s;
}

.account-input:focus {
  border: none;
  border-radius: 6px;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(32, 120, 244, 0.5);
}

</style>