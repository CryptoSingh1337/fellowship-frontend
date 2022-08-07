<template>
  <v-app>
    <Navbar :title="title"/>
    <Alert
      :icon="alertIcon"
      :model="alert"
      :text="alertText"
      :type="alertType"
    />
    <v-main>
      <Nuxt/>
    </v-main>
    <Footer :title="title"/>
  </v-app>
</template>

<script>
import {mapState} from "vuex";
import Navbar from "~/components/main/navbar/Navbar.vue";
import Alert from "@/components/main/Alert.vue";
import Footer from "@/components/main/Footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    Navbar,
    Alert,
    Footer,
  },
  computed: {
    ...mapState(["alert", "alertType", "alertIcon", "alertText"]),
  },
  data: () => ({
    title: "Fellowship",
  }),
};
</script>
