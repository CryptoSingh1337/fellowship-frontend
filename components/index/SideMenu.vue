<template>
  <v-container>
    <h3 class="mb-4">Filter by -</h3>
    <v-row class="mt-2 flex-column" no-gutters>
      <h4 class="my-3">Countries:</h4>
      <v-row justify="center" no-gutters>
        <v-select v-model="country" :items="countries" dense hide-details label="Country" multiple solo/>
      </v-row>
    </v-row>
    <v-divider class="my-6"/>
    <v-row class="flex-column" no-gutters>
      <h4 class="">Degrees:</h4>
      <v-row justify="center" no-gutters>
        <v-col cols="10">
          <v-checkbox v-for="(d, idx) in degrees" :key="idx" v-model="degree" :label="d.name" :value="d.value"
                      hide-details/>
        </v-col>
      </v-row>
    </v-row>
    <v-divider class="my-6"/>
    <v-row justify="center" no-gutters>
      <v-col class="d-flex justify-space-between" cols="10">
        <v-btn class="elevation-0" color="gray" outlined tile
               @click.prevent="country = []; degree = []; $nuxt.$emit('resetPage', 0)">Reset
        </v-btn>
        <v-btn class="elevation-0" color="primary" tile @click.prevent="$nuxt.$emit('applyFilter');">Apply</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loader from "@/components/main/Loader.vue";

export default {
  name: "SideMenu",
  components: {
    Loader
  },
  props: {
    countries: Array
  },
  data: () => ({
    country: [],
    degree: [],
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
  watch: {
    country() {
      this.$nuxt.$emit("changeCountry", this.country);
    },
    degree() {
      this.$nuxt.$emit("changeDegree", this.degree);
    }
  }
}
</script>
