<template>
  <v-container fluid>
    <h3 class="text-center title font-weight-bold">Dashboard</h3>
    <v-tabs v-model="tab" background-color="transparent" centered>
      <v-tab v-for="(item, idx) in items" :key="idx">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-container fluid>
      <v-tabs-items v-model="tab" class="rounded">
        <v-tab-item>
          <UserTable/>
        </v-tab-item>
        <v-tab-item>
          <ScholarshipTable/>
        </v-tab-item>
        <v-tab-item>
          <CreateScholarshipForm/>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-container>
</template>

<script>
import UserTable from "@/components/dashboard/UserTable.vue";
import ScholarshipTable from "@/components/dashboard/ScholarshipTable.vue";
import CreateScholarshipForm from "@/components/dashboard/CreateScholarshipForm.vue";

export default {
  middleware: ["auth", "admin"],
  name: "dashboard",
  components: {
    UserTable,
    ScholarshipTable,
    CreateScholarshipForm
  },
  data: () => ({
    tab: "",
    items: ["Users", "Scholarships", "Upload JSON file"]
  })
}
</script>
