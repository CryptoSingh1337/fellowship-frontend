<template>
  <v-menu :close-on-content-click="false" offset-y>
    <template #activator="{ on }">
      <v-avatar class="btn" v-on="on">
        <v-img :src="`https://avatars.dicebear.com/api/bottts/${$auth.user.username}.svg`"/>
      </v-avatar>
    </template>
    <v-list dense width="160px">
      <v-row no-gutters>
        <v-col class="d-flex justify-center align-center" cols="5">
          <v-list-item-avatar class="ml-4">
            <v-img :src="`https://avatars.dicebear.com/api/bottts/${$auth.user.username}.svg`"/>
          </v-list-item-avatar>
        </v-col>
        <v-col class="d-flex align-center font-weight-bold">
          {{ $auth.user.username | trim }}
        </v-col>
      </v-row>
      <v-divider class="mx-2"></v-divider>
      <v-list-item :to="`/settings`" link nuxt>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sign out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "AvatarButton",
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  },
  filters: {
    trim: (str) => {
      if (str.length > 10)
        return `${str.substring(0, 10)}...`;
      return str;
    }
  }
};
</script>

<style scoped>
.btn:hover {
  cursor: pointer;
}
</style>
