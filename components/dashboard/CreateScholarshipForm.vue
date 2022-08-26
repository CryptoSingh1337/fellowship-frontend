<template>
  <v-container class="fill-height flex-column justify-center" fluid>
    <v-alert :class="[$vuetify.breakpoint.mdAndDown ? 'width-md' : 'width-lg']"
             :value="alert" dense outlined type="error">{{ alertText }}
    </v-alert>
    <h3>Upload JSON file</h3>
    <v-icon class="mt-10 mb-5" size="100">mdi-file-upload-outline</v-icon>
    <span v-if="payload && payload.length > 0" class="my-5">{{ payload.length }} scholarships</span>
    <v-form v-model="valid" :class="[$vuetify.breakpoint.mdAndDown ? 'width-md' : 'width-lg']">
      <v-file-input v-model="jsonFile" :rules="[rules.required]" accept=".json" counter label="Upload json file"
                    outlined prepend-icon="" show-size solo @change="readFile"/>
      <v-btn :disabled="!valid" :loading="loading" class="mx-auto elevation-0" color="primary" tile
             @click.prevent="uploadJson">
        Upload
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import error from "~/layouts/error";

export default {
  name: "CreateScholarshipForm",
  data: () => ({
    valid: true,
    alert: false,
    alertText: "",
    loading: false,
    jsonFile: null,
    payload: [],
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
    uploadJson() {
      if (this.payload.length === 0)
        throw "JSON must have some data";
      this.loading = true;
      this.$axios.post("/scholarship/create/bulk", this.payload)
        .then((response) => {
          if (response.status === 200) {
            this.setAlert(
              "success",
              "mdi-rocket-launch-outline",
              `${response.data.data.documentCreated} Scholarships created!`
            );
            this.loading = false;
            setTimeout(() => this.$store.commit("toggleAlert"), 3000);
          }
        })
        .catch(err => {
          this.setAlert(
            "error",
            "mdi-alert-octagon-outline",
            err.toString()
          );
          setTimeout(() => this.$store.commit("toggleAlert"), 4000);
          this.loading = false;
        })
    },
    readFile() {
      if (!this.jsonFile) {
        this.payload = [];
        return;
      }
      const fileType = this.jsonFile.type;
      if (fileType !== "application/json") {
        this.showAlert("Unsupported file format");
        throw "Unsupported file format";
      }
      if (this.jsonFile.size === 0) {
        this.showAlert("File must have some data");
        throw "File must have some data";
      }
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const str = event.target.result;
        if (str && str.length > 0) {
          this.payload = JSON.parse(str);
        } else {
          this.showAlert("Error in reading file");
        }
      };
      fileReader.readAsText(this.jsonFile);
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
