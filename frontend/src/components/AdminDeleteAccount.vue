<template>
  <div>
    <DeleteAccountButton @onDeleteAccount="confirmDeletion" />
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import DeleteAccountButton from '../components/DeleteAccountButton'
export default {
  name: 'UserDeleteAccount',
  components: {
    DeleteAccountButton
  },
  props: ['userProfile'],
  methods: {
    async confirmDeletion () {
      if (confirm('Are you sure you want to delete this account 2?')) {
        await apiClient.delete(`api/users/${this.userProfile.id}`)
        window.location.reload()
      }
    }
  }
}
</script>

<style></style>