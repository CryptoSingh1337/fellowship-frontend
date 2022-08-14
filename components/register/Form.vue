<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col class="blue rounded-br-xl" cols="12" md="5" style="padding: 200px 0">
      <v-card-text class="white--text">
        <h3 class="text-center ">Already Signed up?</h3>
      </v-card-text>
      <div class="text-center">
        <v-btn dark outlined tile @click="switchForm">Log in</v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="7">
      <v-card-text>
        <h3 class="headline font-weight-bold text-center">Sign Up for an Account</h3>
        <v-form v-model="valid">
          <v-row align="center" justify="center" no-gutters>

            <v-col cols="12" sm="10">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="firstName"
                    :rules="[rules.required]"
                    autocomplete="false"
                    class="mt-4"
                    color="blue"
                    dense
                    label="First Name"
                    outlined/>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="lastName"
                    :rules="[rules.required]"
                    autocomplete="false"
                    class="mt-4"
                    color="blue"
                    dense
                    label="Last Name"
                    outlined/>
                </v-col>
              </v-row>
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
                autocomplete="false"
                color="blue"
                dense
                label="Email"
                outlined/>
              <v-text-field
                v-model="username"
                :rules="[rules.required]"
                autocomplete="false"
                color="blue"
                dense
                label="Username"
                outlined/>
              <v-text-field
                v-model="password"
                :rules="[rules.required]"
                autocomplete="false"
                color="blue"
                dense
                label="Password"
                outlined
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'" @click:append="show = !show"/>
              <v-btn :disabled="!valid" :loading="loading" block class="elevation-0 white--text" color="blue"
                     tile @click.prevent="handleSignUp">Sign up
              </v-btn>
              <h5 class="text-center grey--text mt-4 mb-3">Or Sign up using</h5>
              <div class="d-flex align-center justify-space-around">
                <v-btn color="red" outlined tile>
                  <v-icon>mdi-google</v-icon>
                </v-btn>
                <v-btn color="black" outlined tile>
                  <v-icon>mdi-github</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    loading: false,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    show: false,
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) =>
        !value ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Invalid email."
    },
    alert: false,
    alertText: ""
  }),
  methods: {
    setAlert(type, icon, text) {
      this.$store.commit("showAlert", {
        alertType: type,
        alertIcon: icon,
        alertText: text,
      });
    },
    switchForm() {
      this.$nuxt.$emit("switchToLogin")
    },
    handleSignUp() {
      const data = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        channelName: this.channelName,
        password: this.password,
      };
      this.loading = true;
      this.$axios
        .post("/user/create", data)
        .then(() =>
          this.setAlert(
            "success",
            "mdi-rocket-launch-outline",
            "Your account has been created."
          ))
        .then(() => {
          this.loading = false;
          this.switchForm();
          setTimeout(() => this.$store.commit("toggleAlert"), 2000)
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
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
