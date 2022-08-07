<template>
  <v-app>
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
import Alert from "@/components/main/Alert.vue";
import Footer from "@/components/main/Footer.vue";

export default {
  name: "basic",
  components: {
    Alert,
    Footer,
  },
  data: () => ({
    title: "Fellowship",
  }),
  computed: {
    ...mapState(["alert", "alertType", "alertIcon", "alertText"]),
  },
};
</script>
