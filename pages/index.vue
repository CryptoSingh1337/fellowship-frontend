<template>
  <Loader v-if="$fetchState.pending"/>
  <v-container v-else class="fill-height" fluid>
    <v-row align="center" class="pt-10" justify="center">
      <v-col cols="12" md="8">
        <v-text-field v-model="searchQuery" append-icon="mdi-magnify" class="mb-10" hide-details label="Search"
                      :loading="searchLoading" outlined @keyup="search" @click:append="search"/>
        <v-row class="ma-3" no-gutters>
          <v-col cols="12" md="3">
            <div class="d-flex">
              <SideMenu :countries="countries"/>
              <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical/>
            </div>
            <v-divider v-if="$vuetify.breakpoint.smAndDown" class="my-6"/>
          </v-col>
          <v-col :class="$vuetify.breakpoint.mdAndUp ? 'ml-5' : ''">
            <h2 :class="$vuetify.breakpoint.smAndDown ? 'text-center' : ''">Scholarships</h2>
            <v-container v-if="this.scholarships.length === 0" class="flex-column fill-height justify-center" fluid>
              <v-icon color="" large>mdi-alert-circle-outline</v-icon>
              <h3 class="title">No Scholarship found</h3>
            </v-container>
            <div v-else>
              <ScholarshipCard v-for="(s, idx) in scholarships" :key="idx" :idx="idx" :scholarship="s"/>
              <div v-if="totalPages > 0" class="justify-center">
                <v-pagination v-model="page" :length="totalPages" :total-visible="7"/>
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
    loadMoreLoading: false,
    scholarships: [],
    country: [],
    programme: "",
    branch: "",
    category: [],
    degree: null,
    countries: [],
    income: [20000, 1500000],
    percentage: "",
    page: 1,
    totalPages: 0
  }),
  created() {
    this.$nuxt.$on('changeCountry', (payload) => this.country = payload);
    this.$nuxt.$on('changeDegree', (payload) => this.degree = payload);
    this.$nuxt.$on('changeProgramme', (payload) => this.programme = payload);
    this.$nuxt.$on('changeBranch', (payload) => this.branch = payload);
    this.$nuxt.$on('changeCategory', (payload) => this.category = payload);
    this.$nuxt.$on('changeIncome', (payload) => this.income = payload);
    this.$nuxt.$on('resetPage', (payload) => {
      this.page = payload;
      this.$fetch()
    });
    this.$nuxt.$on('applyFilter', () => this.search());
  },
  methods: {
    search() {
      this.searchLoading = true;
      this.page = 1;
      const filters = {
        degree: this.degree,
        countries: this.country,
        programme: this.programme,
        branch: this.branch,
        category: this.category,
        income: this.income,
        search: this.searchQuery,
        page: this.page - 1
      };
      this.$axios.post("/scholarship/get", filters)
        .then(response => {
          this.scholarships = response.data.data.scholarships.content;
          this.totalPages = response.data.data.scholarships.totalPages;
        })
        .then(() => this.searchLoading = false)
        .catch(err => console.log(err))
    }
  },
  async fetch() {
    let response = await this.$axios.get("/scholarship/get/countries");
    if (response.status === 200)
      this.countries = await response.data.data.countries.sort();

    if (this.$auth && this.$auth.loggedIn) {
      const {country, degree, programme, branch, category, income, percentage} = this.$auth.user;
      const filters = {
        degree: this.degree,
        countries: this.country,
        programme: this.programme,
        branch: this.branch,
        category: this.category,
        income: this.income,
        percentage: this.percentage,
        search: this.searchQuery,
        page: this.page - 1
      };
      if (country)
        filters.countries = [country];
      if (degree)
        filters.degree = degree;
      if (programme)
        filters.programme = programme;
      if (branch)
        filters.branch = branch;
      if (category)
        filters.category = [category]
      if (income)
        filters.income = [20000, income];
      if (percentage)
        filters.percentage = percentage;
      response = await this.$axios.post("/scholarship/get", filters);
    } else {
      response = await this.$axios.get(`/scholarship/all?page=${this.page - 1}`)
    }
    this.scholarships = await response.data.data.scholarships.content;
    this.totalPages = await response.data.data.scholarships.totalPages;
  },
  watch: {
    page() {
      const filters = {
        degree: this.degree,
        countries: this.country,
        programme: this.programme,
        branch: this.branch,
        category: this.category,
        income: this.income,
        search: this.searchQuery,
        page: this.page - 1
      };
      console.log(filters)
      this.$axios.post(`/scholarship/get`, filters)
        .then(response => {
          console.log(response.data);
          return response;
        })
        .then(response => {
          this.scholarships = response.data.data.scholarships.content;
          this.totalPages = response.data.data.scholarships.totalPages;
        })
        .catch(err => console.log(err))
    }
  }
};
</script>
