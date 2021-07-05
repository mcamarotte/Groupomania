<template>
  <div class="page-container">
    <b-container fluid>
      <b-row class="text-center justify-content-center">
        <b-col cols="12" lg="4">
          <b-card
            class="account-card border-2 p-3 mb-5 mt-3 bg-white rounded">
            <div class="pt-sm-3 pt-lg-0">
              <b-card-text class="login-text h4">Register now</b-card-text>
              <b-form>
                <b-form-group>
<!-- Signup the user if not exist -->
                  <b-form-input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    v-model="input.firstName"
                    class="account-input text-dark mb-2 mt-4 pl-3 w-100"
                  ></b-form-input>

                  <b-form-input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    v-model="input.lastName"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>

                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>

                  <b-form-input
                    id="password"
                    type="password"
                    placeholder="Password"
                    v-model="input.password"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>

                </b-form-group>

                <button
                  v-on:click.stop="signup()"
                  type="submit"
                  id="signup-button"
                  class="account-btn font-weight-bold">
                  Submit
                </button>

                <p class="my-3 text-danger">{{ errorMessage }}</p>
              </b-form>
            </div>
            <div class="line my-3"></div>
            <p class="font-small grey-text d-flex justify-content-center mb-1">
              Account already exist? 
              <router-link to="/login" class="font-weight-bold ml-1"> Login </router-link>
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
  name: 'Signup',
  data () {
    return {
      errorMessage: '',
      input: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signup () {
      if (
        this.input.firstName != '' &&
        this.input.lastName != '' &&
        this.input.email != '' &&
        this.input.password != ''
      ) {
        apiClient
          .post('api/auth/signup', this.input)
          .then(data => {
            if (!data.token) {
              this.errorMessage = data.error.errors[0].message
            } else {
              localStorage.setItem('userToken', data.token)
              localStorage.setItem('userData', JSON.stringify(data.user))
              router.push({ name: 'Posts' })
            }
          })
          .catch(error => {
            if (error.error) {
              return (this.errorMessage = error.error.errors[0].message)
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

p{
  gap:10px;
}

.account-btn {
  background-color: rgb(253, 45, 6);
  color: white;
  border-radius: 1rem;
  border: none;
  margin-bottom: 1rem;
  padding: 0.375rem 0.75rem;
}

.account-btn:hover,
.account-btn:active {
  background-color: #2c3e50;
  color: white;
  outline: none;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .account-card,
  .card-body {
    padding: 0.7rem;
  }

  .shadow {
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }

  .login-text {
    font-size: 1.1rem;
  }
}

</style>