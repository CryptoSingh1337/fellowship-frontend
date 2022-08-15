<template>
  <v-container class="fill-height flex-column justify-center" fluid>
    <v-alert :class="[$vuetify.breakpoint.mdAndDown ? 'width-md' : 'width-lg']"
             :value="alert" dense outlined type="error">{{ alertText }}
    </v-alert>
    <h3>Upload JSON file</h3>
    <v-icon class="ma-10" size="100">mdi-file-upload-outline</v-icon>
    <v-form v-model="valid" :class="[$vuetify.breakpoint.mdAndDown ? 'width-md' : 'width-lg']">
      <v-file-input
        v-model="jsonFile"
        :rules="[rules.required]"
        accept=".json"
        counter
        label="Upload the json file"
        outlined
        prepend-icon=""
        show-size
        solo/>
      <v-btn :disabled="!valid" :loading="loading" class="mx-auto elevation-0" color="primary" tile
             @click.prevent="handleFileUpload">
        Upload
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "CreateScholarshipForm",
  data: () => ({
    valid: true,
    alert: false,
    alertText: "",
    loading: false,
    jsonFile: null,
    rules: {
      required: (value) => !!value || "Required."
    },
  }),
  methods: {
    setAlert(type, icon, text) {
      this.$store.commit("showAlert", {
        alertType: type,
        alertIcon: icon,
        alertText: text,
      });
    },
    showAlert(text) {
      this.alertText = text;
      this.alert = true;
      setTimeout(() => (this.alert = false), 5000);
    },
    uploadJson(json) {
      this.loading = true;
      this.$axios.post("/scholarship/create/bulk", json)
        .then(() => this.loading = false)
        .then(() => {
          this.setAlert(
            "success",
            "mdi-rocket-launch-outline",
            "Scholarship created successfully!"
          );
          this.loading = false;
          setTimeout(() => this.$store.commit("toggleAlert"), 3000)
        })
        .catch(err => {
          this.setAlert(
            "error",
            "mdi-alert-octagon-outline",
            err.response.data.error.message[0]
          );
          setTimeout(() => this.$store.commit("toggleAlert"), 4000)
          this.loading = false;
        })
    },
    handleFileUpload() {
      const fileType = this.jsonFile.type;
      if (fileType === "application/json" && this.jsonFile.size > 0) {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const str = event.target.result;
          if (str && str.length > 0) {
            const payload = JSON.parse(str);
            this.uploadJson(payload);
          } else {
            this.showAlert("Error in reading file");
          }
        };
        fileReader.readAsText(this.jsonFile);
      } else {
        this.showAlert("Unsupported file format");
      }
    }
  }
}
</script>
<style scoped>
.width-lg {
  width: 25% !important;
  max-width: 25% !important;
}

.width-md {
  width: 75% !important;
  max-width: 75% !important;
}
</style>
