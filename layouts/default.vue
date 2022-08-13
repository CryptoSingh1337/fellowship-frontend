<template>
  <v-app class="background">
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
<style>
.background {
  background-image: repeating-linear-gradient(90deg, transparent 0%, #fff 30%, #fff 75%, transparent 100%), url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAIklEQVQoU2N89+7dfwYsQEhIiBEkzDgkFGDzAbIY2Cv4AACvrBgJjYNGfwAAAABJRU5ErkJggg==) !important;
}
</style>
