<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="q-pa-md bg-white">
    <div class="flex justify-between">
        <div class="flex items-center" @click="router.push('/settings')">

          <div>
            <q-chip color="primary" size="sm" dense text-color="white"
                    style="position: fixed; transform: rotate(310deg); margin-top: 0; margin-left: -10px">
              PRO
            </q-chip>
            <img :src="user.avatar" alt="" width="32" height="32" style="border-radius: 20px" />
          </div>

          <div class="q-ml-sm text-black">
            <p class="no-margin text-bold">{{ user.name }}</p>
            <p class="no-margin text-grey-7 text-caption">{{ user.email }}</p>
          </div>
        </div>

        <div class="">
<!--          <div class="icon-bubble active q-mr-sm">-->
<!--            <q-icon size="1.3rem" style="color: #7F56D9" name="o_emoji_events"/>-->
<!--          </div>-->


            <q-btn :class="hasNotifications ? 'icon-bubble active' : 'icon-bubble'" :icon="hasNotifications ? 'o_notifications_active' : 'o_notifications'" @click="openNotificationDialog()" round style="color: #757575"/>

        </div>

      <q-dialog v-model="dialogNotification"
                position="top"
                :maximized="true">
        <q-card >

          <div class="flex q-pa-sm">
            <q-btn class="bg-primary q-mr-sm" dense round flat icon="arrow_back" color="white" @click="dialogNotification = false" />
            <h6 class="no-margin text-grey-6">Notifications</h6>
          </div>

          <q-list>

            <q-item :key="index" v-for="(notification, index) in notifications" class="q-mb-sm">
              <q-item-section class="flex items-center" avatar>
                <q-icon :color="notification.read ? 'secondary' : 'primary'" :name="notification.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label :class="notification.read ? '' : 'text-bold'">{{ notification.title }}</q-item-label>
                <q-item-label caption>{{ notification.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-dialog>
    </div>
    </q-header>

    <q-page-container class="q-pa-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {LocalStorage, useQuasar} from "quasar";
import {onMounted, ref} from "vue";
import {api} from "boot/axios";
import {useRouter} from 'vue-router'

defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout'
})

const dialogNotification = ref(false);
const hasNotifications = ref(false);
let notifications = ref([]);
const router = useRouter()
let user = LocalStorage.getItem('user');


onMounted(() => {
  notifications.value = LocalStorage.getItem('notifications')
  hasNotifications.value = LocalStorage.getItem('hasUnreadNotifications')
})

function openNotificationDialog() {
  dialogNotification.value = !dialogNotification.value

  api.get('notifications/mark-all-as-read')
    .then((response) => {
      api.get('/notifications')
        .then((response) => {
          LocalStorage.setItem('notifications', response.data.data.notifications)
          LocalStorage.setItem('hasUnreadNotifications', response.data.data.hasUnreadNotifications)

          notifications.value = response.data.data.notifications
          hasNotifications.value = response.data.data.hasUnreadNotifications
        })
    })
}
</script>
