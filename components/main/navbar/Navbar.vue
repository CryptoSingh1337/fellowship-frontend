<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped disable-route-watcher width="350">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <NuxtLink class="text-decoration-none" to="/">
        <v-img
          class="ml-1 hidden-xs-only"
          max-height="40"
          max-width="40"
          src="/logo.svg">
        </v-img>
      </NuxtLink>
      <NuxtLink class="text-decoration-none" to="/">
        <v-toolbar-title class="ml-3 headline font-weight-bold black--text" v-text="title"/>
      </NuxtLink>
      <v-spacer/>
      <div v-if="$auth ? !$auth.loggedIn : true">
        <v-btn color="primary" outlined to="/login">LogIn/SignUp</v-btn>
      </div>
      <div v-else>
        <AvatarButton/>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import AvatarButton from "~/components/main/navbar/AvatarButton";

export default {
  components: {
    AvatarButton
  },
  props: {
    title: String,
  },
  data: () => ({
    drawer: true,
    items: [
      {title: 'Home', icon: 'mdi-home-city'},
      {title: 'My Account', icon: 'mdi-account'},
      {title: 'Users', icon: 'mdi-account-group-outline'},
    ]
  })
};
</script>
