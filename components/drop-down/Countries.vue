<template>
  <v-select v-model="country" :items="countries" :rules="rules" dense hide-details label="Country"
            outlined @change="$emit('selectedCountry', country)"/>
</template>

<script>
import countries from "countries-list";

export default {
  name: "Countries",
  props: {
    rules: {
      type: Array,
      require: false
    }
  },
  data: () => ({
    country: "",
    countries: Object.keys(countries.countries).map(code => countries.countries[code].name).sort()
  })
}
</script>
