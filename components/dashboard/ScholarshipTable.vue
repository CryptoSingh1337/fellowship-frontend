<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="my-4" cols="12" md="4">
        <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="Search" single-line/>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" :max-width="$vuetify.breakpoint.mdAndUp ? '500px' : '90%'">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Role
        </v-card-title>
        <v-card-text class="my-10">
          {{ scholarship }}
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-btn class="elevation-0" color="primary" text tile @click.prevent="handleUpdate">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table :headers="headers" :items="scholarships" :items-per-page="10" :loading="loading" :search="search"
                  @click:row="openDialog">
      <template v-slot:item.degrees="{ item }">
        <v-chip v-for="(d, idx) in item.degrees" :key="idx"
                :class="idx === 0 ? 'mr-1' : (idx === item.degrees.length - 1 ? 'ml-1' : 'mx-1')" label small>
          {{ d }}
        </v-chip>
      </template>
      <template v-slot:item.grant="{ item }">
        <v-chip class="ml-auto" color="primary accent-4" label small>
          <v-icon left small>mdi-cash</v-icon>
          {{ item.grant ? item.grant : 'Not available' }}
        </v-chip>
      </template>
      <template v-slot:item.country="{ item }">
        <span class="text-capitalize">{{ item.country | format }}</span>
      </template>
      <template v-slot:item.deadline="{ item }">
        <span>{{ getDeadline(item.createdAt) }} days</span>
      </template>
      <template v-slot:item.createdAt="{ item }">
        <span class="text-capitalize">{{ $moment(item.createdAt).format("D, MMM YYYY") }}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "ScholarshipTable",
  data: () => ({
    headers: [
      {text: "Title", value: "title"},
      {text: "Degrees", value: "degrees"},
      {text: "Grant", value: "grant"},
      {text: "Country", value: "country"},
      {text: "Deadline", value: "deadline"},
      {text: "Created at", value: "createdAt"}
    ],
    search: "",
    dialog: false,
    loading: false,
    page: 0,
    scholarship: null,
    scholarships: []
  }),
  created() {
    this.$nuxt.$on("close", () => this.dialog = false);
  },
  methods: {
    getDeadline(createdAt) {
      return this.$moment(createdAt).add(30, "days").diff(createdAt, "days")
    },
    openDialog(scholarship) {
      this.scholarship = scholarship;
      this.dialog = true;
      console.log(scholarship);
    },
    handleUpdate() {
      console.log("Update");
    }
  },
  async fetch() {
    this.loading = true;
    const response = await this.$axios.get(`/scholarship/all?page=${this.page}`);
    if (response.status === 200 && response.data.data.scholarships.length > 0) {
      this.scholarships = response.data.data.scholarships;
      this.scholarship = this.scholarships[0];
    }
    this.loading = false;
  },
  filters: {
    format: (arr) => {
      if (arr.length > 0) {
        let s = "";
        arr.forEach(str => s += str)
        return s;
      }
    }
  }
}
</script>
