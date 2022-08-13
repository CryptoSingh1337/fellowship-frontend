<template>
  <v-list class="border rounded-lg">
    <v-subheader>Filter by</v-subheader>
    <v-list-item>
      <Countries @selectedCountry="updateCountry"/>
    </v-list-item>
  </v-list>
</template>

<script>
import Countries from "~/components/drop-down/Countries.vue";

export default {
  name: "SideMenu",
  components: {
    Countries
  },
  methods: {
    updateCountry(country) {
      console.log(country);
    }
  }
}
</script>

<style scoped>
.border {
  border: 1px solid grey;
}
</style>
