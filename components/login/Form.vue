<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col cols="12" md="7">
      <v-card-text>
        <h3 class="headline font-weight-bold text-center mb-4">Login in to your Account</h3>
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
                type="password"/>
              <NuxtLink class="text-decoration-none" to="/forgot">
                <div class="caption blue--text my-3">Forgot password</div>
              </NuxtLink>
              <v-btn :disabled="!valid" block class="white--text" color="blue" tile>Log in</v-btn>
              <h5 class="text-center grey--text mt-4 mb-3">Or Log in using</h5>
              <div class="d-flex align-center justify-space-around">
                <v-btn color="red" outlined>
                  <v-icon>mdi-google</v-icon>
                </v-btn>
                <v-btn color="black" outlined>
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
    username: "",
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
    }
  }),
  methods: {
    switchForm() {
      this.$nuxt.$emit("switchToRegister")
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
