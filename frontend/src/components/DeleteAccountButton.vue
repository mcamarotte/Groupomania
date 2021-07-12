<template>
  <div>
    <div class="d-flex justify-content-center">
      <button
        class="delete-account d-flex justify-content-center align-items-center">
        <p @click="onDeleteAccount" class="my-3 mr-1 mr-lg-2">
          Delete account
        </p>
        <b-icon icon="trash"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DeleteAccountButton',
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    
    async onDeleteAccount () {
      this.$emit('onDeleteAccount')
    }
  }
}
</script>

<style>

.delete-account {
  font-size: 14px;
  color: rgb(255, 81, 0);
  border-radius: 4px;
  gap: 10px;
  background-color: transparent;
  border: none;
}

.delete-account:hover {
  text-decoration: underline;
}
.delete-account:focus {
  outline: none;
}

</style>