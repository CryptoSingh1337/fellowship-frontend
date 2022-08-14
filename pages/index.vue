<template>
  <Loader v-if="$fetchState.pending"/>
  <v-container v-else class="fill-height" fluid>
    <v-row align="center" class="pt-10" justify="center">
      <v-col cols="12" md="8">
        <v-text-field v-model="searchQuery" append-icon="mdi-magnify" class="mb-10" hide-details label="Search"
                      :loading="searchLoading" outlined @click:append="search" @keydown.enter="search"/>
        <v-row class="ma-3" no-gutters>
          <v-col cols="12" md="3">
            <div class="d-flex">
              <SideMenu :countries="countries"/>
              <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical/>
            </div>
            <v-divider v-if="$vuetify.breakpoint.smAndDown" class="my-6"/>
          </v-col>
          <v-col :class="$vuetify.breakpoint.mdAndUp ? 'ml-5' : ''">
            <h2 :class="$vuetify.breakpoint.smAndDown ? 'text-center' : ''">
              {{ $auth ? ($auth.loggedIn ? 'Recommended' : 'Latest') : 'Latest' }} Scholarships</h2>
            <v-container v-if="this.scholarships.length === 0" class="flex-column fill-height justify-center" fluid>
              <v-icon color="" large>mdi-alert-circle-outline</v-icon>
              <h3 class="title">No Scholarship found</h3>
            </v-container>
            <div v-else>
              <ScholarshipCard v-for="(s, idx) in scholarships" :key="idx" :idx="idx" :scholarship="s"/>
              <div class="d-flex justify-center">
                <v-btn v-model="page" class="elevation-0" color="primary" large tile @click.prevent="page++">Load more
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loader from "@/components/main/Loader.vue";
import SideMenu from "@/components/index/SideMenu.vue";
import ScholarshipCard from "@/components/card/Scholarship.vue";

export default {
  head: () => ({
    title: "Home - Fellowship"
  }),
  components: {
    Loader,
    SideMenu,
    ScholarshipCard
  },
  data: () => ({
    searchQuery: "",
    searchLoading: false,
    scholarships: [],
    country: [],
    degree: [],
    countries: [],
    page: 0,
  }),
  created() {
    this.$nuxt.$on('changeCountry', (payload) => this.country = payload);
    this.$nuxt.$on('changeDegree', (payload) => this.degree = payload);
    this.$nuxt.$on('applyFilter', () => this.search());
  },
  methods: {
    search() {
      this.searchLoading = true;
      const filters = {
        degrees: this.degree,
        countries: this.country,
        search: this.searchQuery,
        page: this.page
      };
      this.$axios.post("/scholarship/get", filters)
        .then(response => response.data.data)
        .then(data => this.scholarships = data.scholarships)
        .then(() => this.searchLoading = false)
        .catch(err => console.log(err))
    }
  },
  async fetch() {
    let response = await this.$axios.get("/scholarship/get/countries");
    if (response.status === 200)
      this.countries = await response.data.data.countries.sort();

    if (this.$auth && this.$auth.loggedIn) {
      const {country, program} = this.$auth.user;
      if (country && program) {
        const filters = {
          degrees: [program],
          countries: [country],
          search: null,
          page: this.page
        };
        response = await this.$axios.post("/scholarship/search", filters);
      } else {
        response = await this.$axios.get(`/scholarship/all?page=${this.page}`);
      }
    } else {
      response = await this.$axios.get(`/scholarship/all?page=${this.page}`)
    }
    if (response.status === 200)
      this.scholarships = await response.data.data.scholarships;
  }
};
</script>
