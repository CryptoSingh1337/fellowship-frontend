<template>
  <v-card :class="idx === 0 ? 'mb-4' : 'my-4'" outlined>
    <v-card-text class="pb-0">
      <div class="text-capitalize">{{ scholarship.country }}</div>
      <h3 class="headline text--primary">{{ scholarship.title }}</h3>
      <v-row class="my-3" no-gutters>
        <v-chip v-for="(degree, idx) in scholarship.degrees" :key="idx"
                :class="idx === 0 ? 'mr-1' : (idx === scholarship.degrees.length - 1 ? 'ml-1' : 'mx-1')" label small>
          {{ degree }}
        </v-chip>
        <v-chip class="ml-auto" color="primary accent-4" label small>
          <v-icon left small>mdi-cash</v-icon>
          {{ scholarship.grant }}
        </v-chip>
      </v-row>
      <div class="text--primary">
        {{ scholarship.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn :href="scholarship.url" color="primary accent-4" target="_blank" text tile>
        Read More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    idx: Number,
    scholarship: Object
  },
  filters: {
    trim: (text) => {
      if (text.length > 200)
        return `${text.substring(0, 200)}...`;
      return text;
    }
  }
};
</script>
