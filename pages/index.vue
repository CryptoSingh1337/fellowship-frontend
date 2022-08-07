<template>
  <v-container fluid>
    <v-row class="ma-3" no-gutters>
      <v-col
        v-for="i in new Array(15)"
        :key="i"
        class="mx-xs-auto my-3"
        cols="12"
        lg="3"
        md="4"
        sm="4">
        <ScholarshipCard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScholarshipCard from "@/components/card/Scholarship.vue";

export default {
  head: () => ({
    title: "Home - Fellowship"
  }),
  components: {
    ScholarshipCard,
  }
};
</script>

<style scoped>
.border {
  border: 1px grey solid;
}
</style>
