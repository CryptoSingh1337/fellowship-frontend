<template>
  <v-app>
    <Navbar :title="title" />
    <v-main>
      <Nuxt />
    </v-main>
    <Footer :title="title" />
  </v-app>
</template>

<script>
import Navbar from "@/components/main/Navbar.vue";
import Footer from "@/components/main/Footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      title: "Fellowship",
    };
  },
};
</script>
