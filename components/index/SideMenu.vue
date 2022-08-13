<template>
  <v-container>
    <h3 class="mb-4">Filter by -</h3>
    <v-row class="mt-2" no-gutters>
      <h4 class="my-3">Countries:</h4>
      <v-select v-model="country" :items="countries" dense hide-details label="Country" multiple solo/>
    </v-row>
    <v-divider class="my-6"/>
    <v-row class="flex-column" no-gutters>
      <h4 class="">Degrees:</h4>
      <v-row justify="center" no-gutters>
        <v-col cols="10">
          <v-checkbox v-for="(d, idx) in degrees" :key="idx" v-model="degree" :label="d" :value="d" hide-details/>
        </v-col>
      </v-row>
    </v-row>
    <v-divider class="my-6"/>
    <v-row justify="center" no-gutters>
      <v-col class="d-flex justify-space-between" cols="10">
        <v-btn class="elevation-0" color="gray" outlined tile @click.prevent="country = []; degree = [];">Reset</v-btn>
        <v-btn class="elevation-0" color="primary" tile>Apply</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import countries from "countries-list";

export default {
  name: "SideMenu",
  data: () => ({
    country: "",
    degree: [],
    degrees: ["Bachelor", "Master", "Phd"],
    countries: Object.keys(countries.countries).map(code => countries.countries[code].name).sort()
  })
}
</script>

<style scoped>
.border {
  border: 1px solid grey;
}
</style>
