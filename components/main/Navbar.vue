<template>
  <v-app-bar fixed app>
    <v-img
      class="ml-1 hidden-xs-only"
      max-height="40"
      max-width="40"
      src="/logo.svg"
    ></v-img>
    <v-toolbar-title class="ml-3 headline" v-text="title" />
    <v-spacer />
    <v-btn color="primary">LogIn/SignIn</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>