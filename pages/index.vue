<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" class="pt-10" justify="center">
      <v-col cols="12" md="8">
        <v-text-field v-model="searchQuery" append-icon="mdi-magnify" class="mb-10" hide-details label="Search"
                      outlined/>
        <v-row class="ma-3" no-gutters>
          <v-col cols="3">
            <div class="d-flex">
              <SideMenu/>
              <v-divider vertical/>
            </div>
          </v-col>
          <v-col :class="$vuetify.breakpoint.mdAndUp ? 'ml-5' : ''">
            <h2>{{ $auth ? ($auth.loggedIn ? 'Recommended' : 'Latest') : 'Latest' }} Scholarships</h2>
            <ScholarshipCard v-for="i in new Array(10)" :key="i" :idx="i"/>
            <div class="d-flex justify-center">
              <v-btn v-model="page" class="elevation-0" color="primary" large tile @click.prevent="page++">Load more
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideMenu from "@/components/index/SideMenu.vue";
import ScholarshipCard from "@/components/card/Scholarship.vue";

export default {
  head: () => ({
    title: "Home - Fellowship"
  }),
  components: {
    SideMenu,
    ScholarshipCard
  },
  data: () => ({
    searchQuery: "",
    page: 0,
  })
};
</script>
<style>
</style>
