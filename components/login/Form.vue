<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col cols="12" md="7">
      <v-card-text>
        <h3 class="headline font-weight-bold text-center mb-4">Login in to your Account</h3>
        <v-alert :value="alert" class="mx-auto" dense outlined type="error" width="70%">{{ alertText }}</v-alert>
        <v-form v-model="valid">
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12" sm="8">
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
              <NuxtLink class="text-decoration-none" to="/forgot">
                <div class="caption blue--text my-3">Forgot password</div>
              </NuxtLink>
              <v-btn :disabled="!valid" :loading="loading" block class="elevation-0 white--text" color="blue"
                     tile @click.prevent="handleLogin">Log in
              </v-btn>
              <h5 class="text-center grey--text mt-4 mb-3">Or Log in using</h5>
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
    <v-col class="rounded-bl-xl blue" cols="12" md="5" style="padding: 200px 0">
      <v-card-text class="white--text">
        <h3 class="text-center ">Don't have an account yet?</h3>
      </v-card-text>
      <div class="text-center">
        <v-btn dark outlined tile @click="switchForm">SIGN UP</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data: () => ({
    valid: true,
    show: false,
    loading: false,
    alert: false,
    alertText: "",
    username: "",
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
    }
  }),
  methods: {
    switchForm() {
      this.$nuxt.$emit("switchToRegister")
    },
    handleLogin() {
      const data = {
        username: this.username,
        password: this.password,
      };
      this.loading = true;
      this.$auth
        .loginWith("local", {data: data})
        .then((res) => res.data.data)
        .then((data) => {
          this.$auth.setUserToken(data.accessToken, data.refreshToken);
        })
        .then(() => (this.loading = false))
        .catch((err) => {
          if (err.response.data.status === 401) {
            this.alertText = "Invalid username/password";
            this.alert = true;
          }
          this.loading = false;
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
