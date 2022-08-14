<template>
  <Loader v-if="$fetchState.pending"/>
  <v-container v-else fluid>
    <h3 class="text-h5 text-center font-weight-bold">Profile</h3>
    <v-row class="mt-10" justify-md="center" no-gutters>
      <v-col class="d-flex justify-center" cols="12" md="2">
        <v-avatar :size="$vuetify.breakpoint.xs ? '100px' : '150px'" class="user-avatar">
          <v-img :max-height="$vuetify.breakpoint.xs ? '75px' : '112.5px'"
                 :max-width="$vuetify.breakpoint.xs ? '75px' : '112.5px'"
                 :src="`https://avatars.dicebear.com/api/bottts/${$auth ? $auth.user.username : 'default'}.svg`"></v-img>
        </v-avatar>
      </v-col>
      <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical></v-divider>
      <v-col :class="$vuetify.breakpoint.mdAndUp ? 'ml-8' : 'mt-10'" cols="12" md="4">
        <v-container>
          <v-form v-model="valid_1">
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="firstName" :rules="[rules.required]" dense label="First name" outlined/>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="lastName" :rules="[rules.required]" dense label="Last name" outlined/>
              </v-col>
            </v-row>
            <v-text-field v-model="username" dense disabled label="Username" outlined readonly/>
            <v-text-field v-model="email" :rules="[rules.required, rules.email]" dense label="Email" outlined/>
            <v-select v-model="country" :items="countries" :rules="[rules.required]" dense label="Country" outlined/>
            <v-select v-model="degree" :items="degrees" :rules="[rules.required]" dense item-text="name"
                      item-value="value" label="Program" outlined/>
            <v-btn :disabled="!valid_1" :loading="loading_1" color="primary" tile @click.prevent="handleSave">Save
            </v-btn>
          </v-form>
          <v-divider class="my-7"></v-divider>
          <div class="">
            <h3 class="text-h5 text-center font-weight-bold mb-5">Password</h3>
          </div>
          <v-form v-model="valid_2">
            <v-text-field v-model="oldPassword" :append-icon="show_1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required]"
                          :type="show_1 ? 'text' : 'password'" dense label="Enter your old password"
                          outlined @click:append="show_1 = !show_1"/>
            <v-text-field v-model="newPassword" :append-icon="show_2 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required]"
                          :type="show_2 ? 'text' : 'password'" dense label="Enter the new password"
                          outlined @click:append="show_2 = !show_2"/>
            <v-text-field v-model="confirmPassword" :append-icon="show_3 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required]"
                          :type="show_3 ? 'text' : 'password'" dense label="Confirm the new password"
                          outlined @click:append="show_3 = !show_3"/>
            <v-btn :disabled="!valid_2" :loading="loading_2" color="primary" tile @click.prevent="handleChangePassword">
              Change password
            </v-btn>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loader from "@/components/main/Loader.vue";
import countries from "countries-list";

export default {
  middleware: "auth",
  head: () => ({
    title: "Profile - Fellowship"
  }),
  components: {
    Loader
  },
  data: () => ({
    valid_1: true,
    valid_2: true,
    show_1: false,
    show_2: false,
    show_3: false,
    loading_1: false,
    loading_2: false,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    country: "",
    degree: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) =>
        !value ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Invalid email."
    },
    countries: Object.keys(countries.countries).map(code => countries.countries[code].name.toLowerCase()).sort(),
    degrees: [
      {
        name: "Bachelor",
        value: "BACHELOR"
      },
      {
        name: "Master",
        value: "MASTER"
      },
      {
        name: "Phd",
        value: "PHD"
      }]
  }),
  async fetch() {
    if (this.$auth.loggedIn) {
      const {firstName, lastName, username, email, country, degree} = this.$auth.user;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.email = email;
      this.country = country;
      this.degree = degree;
    }
  },
  methods: {
    handleSave() {
      this.loading_1 = true;
      setTimeout(() => (this.loading_1 = false), 2000);
      const payload = {
        firstname: this.firstName,
        lastName: this.lastName,
        email: this.email,
        country: this.country,
        degree: this.degree
      };
      console.log(payload);
    },
    handleChangePassword() {
      console.log("Change password");
      if (this.newPassword !== this.confirmPassword) {
        this.setAlert(
          "error",
          "mdi-alert-circle",
          "New password and confirm password must be same"
        );
        return;
      }
      this.loading_2 = true;
      setTimeout(() => (this.loading_2 = false), 2000);
    }
  }
}
</script>

<style scoped>
.user-avatar {
  border: 1px grey solid !important;
}
</style>
