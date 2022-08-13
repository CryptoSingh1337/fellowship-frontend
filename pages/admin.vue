<template>
  <h1>Admin page</h1>
</template>

<script>
export default {
  middleware: ["auth", "admin"],
  name: "admin"
}
</script>

<style scoped>

</style>
