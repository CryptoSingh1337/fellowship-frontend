<template>
  <v-snackbar :color="type" :value="model" app top>
    <v-icon class="mr-3">{{ icon }}</v-icon>
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  props: {
    model: Boolean,
    type: String,
    icon: String,
    text: String,
  },
};
</script>
