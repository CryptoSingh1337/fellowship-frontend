<template>
  <v-footer :app="$vuetify.breakpoint.mdAndUp" padless>
    <v-col class="text-center" cols="12">
      Created by Team Cyborg
      {{ new Date().getFullYear() }} —
      <NuxtLink class="text-decoration-none" to="/"><strong class="black--text">{{ title }}</strong></NuxtLink>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
