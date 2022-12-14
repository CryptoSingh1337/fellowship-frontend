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
            <v-select v-model="country" :items="countries" :rules="[rules.required]" dense label="Country"
                      outlined/>
            <v-select v-model="degree" :items="degrees" :rules="[rules.required]" dense item-text="name"
                      item-value="value" label="Degree" outlined/>
            <v-select v-if="degree" v-model="programme" :items="Array.from(options.get(`${degree}`).keys())"
                      :rules="[rules.required]"
                      class="text-uppercase" dense item-text="name" item-value="value" label="Field of study" outlined/>
            <v-select v-if="degree && programme" v-model="branch"
                      :items="Array.from(options.get(`${degree}`).get(`${programme}`))" :rules="[rules.required]"
                      class="text-uppercase" dense item-text="name" item-value="value" label="Branch" outlined/>
            <v-select v-model="category" :items="categories" :rules="[rules.required]" class="text-uppercase" dense
                      label="Category" outlined/>
            <v-text-field v-model="income" :rules="[rules.required]" dense label="Income" outlined/>
            <v-text-field v-model="percentage" :rules="[rules.required]" dense label="Percentage" outlined/>
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
    degree: null,
    programme: "",
    branch: "",
    category: "",
    income: "",
    percentage: "",
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
      }],
    programmes: [{
      name: ""
    }],
    options: new Map(),
    categories: ["GEN", "SC/ST", "OBC", "PWD"],
  }),
  created() {
    this.degrees.forEach(degree => this.options.set(degree.value, new Map()));
    let map = this.options.get("BACHELOR");
    map.set("b.tech", ["cse", "ece", "it", "me"]);
    map.set("b.sc", ["agriculture", "bio technology", "chemistry", "physics", "computer science"]);
    map = this.options.get("MASTER");
    map.set("mba", ["hr", "marketing", "finance", "business"]);
    map = this.options.get("PHD");
    map.set("PHD", ["phd"]);
  },
  async fetch() {
    if (this.$auth.loggedIn) {
      const {
        firstName,
        lastName,
        username,
        email,
        country,
        degree,
        programme,
        branch,
        category,
        income,
        percentage
      } = this.$auth.user;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.email = email;
      this.country = country ? country : "";
      this.degree = degree ? degree : "";
      this.programme = programme ? programme : "";
      this.branch = branch ? branch : "";
      this.category = category ? category : "";
      this.income = income ? income : "";
      this.percentage = percentage ? percentage : "";
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
        degree: this.degree,
        programme: this.programme,
        branch: this.branch,
        category: this.category,
        income: this.income,
        percentage: this.percentage
      };
      this.$axios.put("/user/update", payload)
        .then((response) => {
          if (response.status === 200) {
            this.setAlert(
              "success",
              "mdi-rocket-launch-outline",
              "Your details has been updated."
            );
            this.$auth.fetchUser();
          } else {
            this.setAlert("error",
              "mdi-alert-octagon-outline",
              "User data not updated");
          }
        })
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
