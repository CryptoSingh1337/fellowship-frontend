<template>
  <v-container>
    <h1>Contact Us</h1>
    <div class="block">
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :rules="[rules.required]" dense label="Name" outlined/>
          <v-text-field v-model="email" :rules="[rules.required, rules.email]" dense label="E-mail" outlined/>
          <v-textarea v-model="message" :counter="200" :rules="[rules.required]" dense label="Message" outlined/>
          <v-btn class="elevation-0 mx-3" color="gray" outlined tile @click.prevent="$refs.form.reset">Reset</v-btn>
          <v-btn :disabled="!valid" :loading="loading" class="elevation-0 mx-3" color="primary" tile
                 @click.prevent="handleSubmit">
            Submit
          </v-btn>
        </v-form>
      </v-container>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "contact",
  data: () => ({
    valid: true,
    name: "",
    email: "",
    message: "",
    loading: false,
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) =>
        !value ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Invalid email."
    }
  }),
  methods: {
    setAlert(type, icon, text) {
      this.$store.commit("showAlert", {
        alertType: type,
        alertIcon: icon,
        alertText: text,
      });
    },
    handleSubmit() {
      const payload = {
        name: this.name,
        email: this.email,
        message: this.message
      };
      this.loading = true;
      this.$axios.post("/contact/send", payload)
        .then(response => {
          if (response.status === 200) {
            this.loading = false;
            this.setAlert("success",
              "mdi-rocket-launch-outline",
              `${response.data.data.message}`);
          }
        })
        .then(() => setTimeout(() => this.$store.commit("toggleAlert"), 2000))
        .catch(err => {
          this.setAlert(
            "error",
            "mdi-alert-octagon-outline",
            err.response.data.error.message[0]
          );
          this.loading = false;
          setTimeout(() => this.$store.commit("toggleAlert"), 4000)
        })
      console.log("Submit");
    }
  }
}
</script>
