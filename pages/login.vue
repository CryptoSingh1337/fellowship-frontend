<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card class="elevation-0" outlined>
          <v-window v-model="step">
            <v-window-item :value="1">
              <LoginForm/>
            </v-window-item>
            <v-window-item :value="2">
              <RegisterForm/>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "@/components/login/Form.vue";
import RegisterForm from "@/components/register/Form.vue";

export default {
  layout: "basic",
  components: {
    LoginForm,
    RegisterForm
  },
  data: () => ({
    step: 1
  }),
  created() {
    this.$nuxt.$on("switchToRegister", () => this.step++);

    this.$nuxt.$on("switchToLogin", () => this.step--);
  }
}
</script>
