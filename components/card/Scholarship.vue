<template>
  <v-card :class="idx === 0 ? 'mb-4' : 'my-4'" outlined>
    <v-card-text class="pb-0">
      <div class="d-flex">
        <span class="text-capitalize">{{ scholarship.country | format }}</span>
        <span class="ml-auto">{{ $moment(scholarship.createdAt).fromNow() }}</span>
      </div>
      <h3 class="headline text--primary">{{ scholarship.title }}</h3>
      <v-row class="my-3" no-gutters>
        <v-chip class="ma-1" color="primary accent-4" label small>
          Income: &#8377; {{ scholarship.income ? scholarship.income.toLocaleString("en-IN") : '20,000' }}
        </v-chip>
        <v-chip class="ma-1 ml-auto" color="primary accent-4" label small>
          <v-icon left small>mdi-cash</v-icon>
          {{ scholarship.grant ? scholarship.grant : 'Not available' }}
        </v-chip>
      </v-row>
      <div class="text--primary">
        {{ scholarship.description }}
      </div>
    </v-card-text>
    <v-container class="py-0 pt-3">
      <span class="mr-1 grey--text">Tags:</span>
      <v-chip v-for="degree in scholarship.degrees" :key="Math.random()"
              class="ma-1" label small>
        {{ degree }}
      </v-chip>
      <v-chip v-for="programme in scholarship.programme" :key="Math.random()" class="text-uppercase ma-1" label small>
        {{ programme }}
      </v-chip>
      <v-chip v-for="branch in scholarship.branch" :key="Math.random()" class="text-uppercase ma-1" label small>
        {{ branch }}
      </v-chip>
      <v-chip v-for="category in scholarship.category" :key="Math.random()" class="text-uppercase ma-1" label small>
        {{ category }}
      </v-chip>
    </v-container>
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
    },
    format: (arr) => {
      if (arr.length > 0) {
        let s = "";
        for (let i = 0; i < arr.length; i++) {
          if (i === arr.length - 1)
            s += arr[i];
          else
            s += arr[i] + ", ";
        }
        return s;
      }
    }
  }
};
</script>
