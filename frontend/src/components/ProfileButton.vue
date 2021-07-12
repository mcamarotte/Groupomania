<template>
<!-- Create menu bar with links to allow users to interact with app pages and their account -->
  <div>
    <button
      @click="toggleActions"
      class="profile-btn d-flex position-fixed justify-content-center justify-content-lg-between align-items-center">
      <span class="name-profile-btn d-none d-lg-block"> {{userData.firstName}} </span>
      <ProfileImage
        :src="userData.imageUrl"
        customClass="profile-btn__img"
        divCustomClass="div-profile-btn-img"/>
    </button>

    <b-collapse
      id="profile-collapsed"
      v-bind:class="`collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}`">
      <b-card class="border-0" @click="toggleActions">
        <p class="card-text">
          <button
            class="collapsed-btn btn-block text-left"
            @click="changeOrReloadPage('Profile')">
            <b-icon icon="person" class="mr-2"></b-icon> My profile
          </button>
        </p>

        <p class="card-text">
          <button
            class="collapsed-btn btn-block text-left"
            @click="changeOrReloadPage('Posts')">
            <b-icon icon="house" class="mr-2"></b-icon> Home page
          </button>
        </p>

        <p class="card-text">
          <button
            class="collapsed-btn btn-block text-left"
            @click="logout">
            <b-icon icon="box-arrow-right" class="mr-2"></b-icon> Sign out
          </button>
        </p>

        <p class="card-text" v-if="userData.admin">
          <button
            class="collapsed-btn btn-block text-left"
            @click="changeOrReloadPage('Admin')">
            <b-icon icon="gear-fill" class="mr-2"></b-icon> Admin
          </button>
        </p>

      </b-card>
    </b-collapse>
  </div>
</template>

<script>

import ProfileImage from './ProfileImage'
export default {
  name: 'ProfileButton',
  components: {ProfileImage},
  props: {},
  data () {
    const userData = JSON.parse(localStorage.getItem('userData'))

    return {
      userData,
      areActionsVisible: false
    }
  },
  methods: {
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    },
    changeOrReloadPage (name) {
      if (name === this.$route.name) return window.location.reload()
      this.$router.push({ name })
    }
  }
}
</script>

<style>

.profile-btn {
  font-weight: 500;
  border: none;
  color: rgba(23, 4, 66, 0.8);
  top: 20px;
  right: 45px;
  height: 45px;
  gap: 10px;
  padding: 5px 5px 5px 16px;
  box-shadow: 0px 0px 1px 1px rgba(23, 4, 66, 0.8);
  background-color: white !important;
  border-radius: 40px;
  z-index: 2;
}

.profile-btn:focus {
  outline: none;
}

.profile-btn:hover,
.profile-btn:visited {
  background-color: rgba(23, 4, 66, 0.8) !important;
  font-weight: 500;
  border: none;
  color: white;
}

.profile-btn__img {
  height: 30px;
}

.collapsed-btn {
  font-weight: 500;
  gap: 10px;
  color: rgba(23, 4, 66, 0.8);
  background-color: rgb(255, 255, 255);
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
}

.collapsed-btn:hover,
.collapsed-btn:focus,
.collapsed-btn:active {
  background-color: rgba(108, 117, 125, 0.1);
  outline: none;
}

.b-icon.bi {
  font-size: 125%;  
  vertical-align: text-bottom;
  color: rgb(255, 81, 0);
}

.div-profile-btn-img {
  width: 30px;
  height: 30px;
  margin-left: 8px;
}

#profile-collapsed {
  top: 62px;
  right: 44px;
  z-index: 1;
}
@media screen and (min-width: 280px) and (max-width: 769px) {
  .profile-btn {
    top: 20px;
    right: 20px;
    height: 25px;
    padding: 0;
  }
  .profile-btn__img {
    height: 35px;
  }
  }
  .div-profile-btn-img {
    width: 35px;
    height: 35px;
    margin-left: 0;
  }
  #profile-collapsed {
    top: 45px;
    right: 15px;
  }

@media screen and (min-width: 769px) and (max-width: 992px) {
  .name-profile-btn {
    display: block !important;
  }
}

</style>