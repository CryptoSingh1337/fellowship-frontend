<template>
  <v-app>
    <v-main>
      <Nuxt/>
    </v-main>
    <Footer :title="title"/>
  </v-app>
</template>

<script>
import Footer from "@/components/main/Footer.vue";

export default {
  name: "basic",
  components: {
    Footer,
  },
  data: () => ({
    title: "Fellowship",
  }),
};
</script>
