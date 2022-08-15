<template>
  <Loader v-if="$fetchState.pending"/>
  <v-container v-else fluid>
    <h3 class="text-h5 text-center font-weight-bold">Profile</h3>
    <v-row class="mt-10" justify-md="center" no-gutters>
      <v-col class="d-flex justify-center" cols="12" md="2">
        <v-avatar :size="$vuetify.breakpoint.xs ? '100px' : '150px'" class="user-avatar">
          <v-img :max-height="$vuetify.breakpoint.xs ? '75px' : '112.5px'"
                 :max-width="$vuetify.breakpoint.xs ? '75px' : '112.5px'"
                 :src="`https://avatars.dicebear.com/api/bottts/${$auth ? $auth.user.username : 'default'}.svg`"/>
        </v-avatar>
      </v-col>
      <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical/>
      <v-col :class="$vuetify.breakpoint.mdAndUp ? 'ml-8' : 'mt-10'" cols="12" md="4">
        <v-container>
          <v-form v-model="valid">
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
            <v-btn :disabled="!valid" :loading="loading" color="primary" tile @click.prevent="handleSave">Save
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
    valid: true,
    loading: false,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    country: "",
    degree: "",
    rules: {
      required: value => !!value || "Required.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || "Invalid e-mail."
      },
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
      this.country = country ? country : "";
      this.degree = degree ? degree : "";
    }
  },
  methods: {
    setAlert(type, icon, text) {
      this.$store.commit("showAlert", {
        alertType: type,
        alertIcon: icon,
        alertText: text,
      });
    },
    handleSave() {
      this.loading = true;
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        country: this.country,
        degree: this.degree
      };
      this.$axios.put("/user/update", payload)
        .then(() =>
          this.setAlert(
            "success",
            "mdi-rocket-launch-outline",
            "Your details has been updated."
          ))
        .then(() => {
          this.loading = false;
          setTimeout(() => this.$store.commit("toggleAlert"), 3000)
        })
        .catch((err) => {
          this.setAlert(
            "error",
            "mdi-alert-octagon-outline",
            err.response.data.error.message[0]
          );
          this.loading = false;
          setTimeout(() => this.$store.commit("toggleAlert"), 4000)
        });
    }
  }
}
</script>

<style scoped>
.user-avatar {
  border: 1px grey solid !important;
}
</style>
