<template>
  <div>
    <button
      @click="toggleActions"
      class="notification-btn d-flex position-fixed justify-content-center align-items-center p-0">
      <span
        v-if="notificationsList.length"
        class="notifications-number position-absolute d-flex justify-content-center align-items-center"
        >{{ notificationsList.length }}
      </span>
      <b-icon icon="bell-fill"></b-icon>
    </button>

    <b-collapse
      v-if="notificationsList.length"
      id="notification-collapsed"
      v-bind:class="`collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}`">
      <b-card class="border-0" @click="toggleActions">
        <div v-for="notification in notificationsList" :key="notification.id">
          <router-link
            :to="{ name: 'OnePost', params: { postId: notification.postId } }" @click.native="deleteNotification(notification)">
            <div class="d-flex align-items-center">
              <div>
                <ProfileImage
                  :src="notification.Sender.imageUrl" customClass="like-profile-picture" divCustomClass="div-like-picture"
                />
              </div>
                <p v-html="notification.content" class="card-text text-left py-2 mb-3"></p>
              </div>
          </router-link>
        </div>
      </b-card>
    </b-collapse>

    <b-collapse
      v-else
      id="notification-collapsed"
      v-bind:class="`collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}`">
      <b-card class="border-0">
        <div class="d-flex align-items-center">
          <p class="card-text text-left py-2 mb-3"> You don't have notifications </p>
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import ProfileImage from './ProfileImage'
export default {
  name: 'Notifications',
  components: {
    ProfileImage
  },
  props: {},
  data () {
    return {
      areActionsVisible: false,
      notificationsList: []
    }
  },
  async mounted () {
    setTimeout(() => this.fetchNotifications(), 100)
    this.interval = setInterval(() => this.fetchNotifications(), 10000)
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },
    async fetchNotifications () {
      const res = await apiClient.get(`api/notifications`)
      this.notificationsList = res.notifications
    },
    async deleteNotification (notificationToDelete) {
      const res = await apiClient.delete(
        `api/notifications/${notificationToDelete.id}`
      )
              console.log(res)

      this.notificationsList = this.notificationsList.filter(
        notification => notification.id !== notificationToDelete.id
      )
    }
  }
}
</script>

<style>

.notification-btn {
  top: 22px;
  right: 175px;
  box-shadow: 0px 1px 1px 1px rgba(204, 204, 204, 0.2);
  background-color: rgba(199, 113, 52, 0.1) !important;
  border-radius: 100%;
  width: 42px;
  height: 42px;
  border: none;
  z-index: 2;
}

.notification-btn:hover {
  background-color: rgba(108, 117, 125, 0.2) !important;
}

.notification-btn:focus {
  outline: none;
}

.notifications-number {
  top: -8px;
  right: -4px;
  font-size: 12px;
  border-radius: 100%;
  background: rgb(255, 81, 0);;
  color: white;
  height: 20px;
  width: 20px;
}

#notification-collapsed {
  top: 62px;
  right: 177px;
  z-index: 1;
}

#notification-collapsed .card-body {
  padding-bottom: 5px;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .notification-btn {
    top: 17px;
    right: 65px;
    width: 32px;
    height: 32px;
  }

  .notifications-number {
    top: -6px;
    height: 15px;
    width: 15px;
    font-size: 11px;
  }
  
  #notification-collapsed {
    top: 45px;
    right: 64px;
    margin-left: 15px;
  }
}
</style>
