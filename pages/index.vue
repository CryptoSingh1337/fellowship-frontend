<template>
  <v-container fluid>
    <v-row class="ma-3" no-gutters>
      <v-col
        :key="i"
        v-for="i in new Array(15)"
        cols="12"
        sm="4"
        md="4"
        lg="3"
        class="mx-xs-auto my-3"
      >
        <ScholarshipCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScholarshipCard from "@/components/card/Scholarship.vue";

export default {
  components: {
    ScholarshipCard,
  },
};
</script>
