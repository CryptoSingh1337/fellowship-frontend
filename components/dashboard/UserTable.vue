<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="my-4" cols="12" md="4">
        <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="Search" single-line/>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" :max-width="$vuetify.breakpoint.mdAndUp ? '500px' : '90%'">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Role
        </v-card-title>
        <v-card-text class="my-10">
          <h3 class="my-3">Select roles:</h3>
          <v-select v-model="selectedRoles" :items="roles" dense hide-details label="Roles" multiple outlined solo/>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-btn class="elevation-0" color="primary" text tile @click.prevent="handleUpdate">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table :headers="headers" :items="users" :items-per-page="10" :loading="loading" :search="search"
                  @click:row="openDialog">
      <template v-slot:item.degree="{ item }">
        <span v-if="item.degree">{{ item.degree }}</span>
        <v-chip v-else color="red accent-3" label small text-color="white">Missing</v-chip>
      </template>
      <template v-slot:item.country="{ item }">
        <span v-if="item.country" class="text-capitalize">{{ item.country }}</span>
        <v-chip v-else color="red accent-3" label small text-color="white">Missing</v-chip>
      </template>
      <template v-slot:item.roles="{ item }">
        <v-chip v-for="(r, idx) in item.roles" :key="idx"
                :class="idx === 0 ? 'mr-1' : (idx === item.roles.length - 1 ? 'ml-1' : 'mx-1')"
                color="primary accent-4" label small>
          {{ r }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "UserTable",
  data: () => ({
    headers: [
      {text: "Username", value: "username"},
      {text: "Name", value: "firstName"},
      {text: "Email", value: "email"},
      {text: "Country", value: "country"},
      {text: "Degree", value: "degree"},
      {text: "Roles", value: "roles"}
    ],
    search: "",
    loading: false,
    dialog: false,
    user: null,
    selectedRoles: ["USER"],
    roles: ["ADMIN", "USER"],
    users: []
  }),
  created() {
    this.$nuxt.$on("close", () => this.dialog = false);
  },
  methods: {
    setAlert(type, icon, text) {
      this.$store.commit("showAlert", {
        alertType: type,
        alertIcon: icon,
        alertText: text,
      });
    },
    openDialog(user) {
      this.user = user;
      this.selectedRoles = this.user.roles;
      this.dialog = true;
    },
    handleUpdate() {
      if (this.selectedRoles.length > 0) {
        this.user.roles = this.selectedRoles;
      } else {
        this.setAlert(
          "error",
          "mdi-alert-octagon-outline",
          "At least 'USER' role must be selected"
        );
        setTimeout(() => this.$store.commit("toggleAlert"), 2000);
      }
    }
  },
  async fetch() {
    this.loading = true;
    const response = await this.$axios.get("/user/all");
    if (response.status === 200 && response.data.data.users.length > 0) {
      this.users = response.data.data.users;
      this.user = this.users[0];
    }
    this.loading = false;
  }
}
</script>
