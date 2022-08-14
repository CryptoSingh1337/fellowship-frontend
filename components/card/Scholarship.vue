<template>
  <v-card :class="idx === 0 ? 'mb-4' : 'my-4'">
    <v-card-text>
      <div>Word of the Day</div>
      <p class="text-h4 text--primary">el·ee·mos·y·nar·y</p>
      <p>adjective</p>
      <div class="text--primary">
        {{ description | trim }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary accent-4" text>
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
  data: () => ({
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  }),
  filters: {
    trim: (text) => {
      if (text.length > 200)
        return `${text.substring(0, 200)}...`
      return text;
    }
  }
};
</script>
