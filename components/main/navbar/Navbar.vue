<template>
  <v-app-bar app fixed>
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
};
</script>
