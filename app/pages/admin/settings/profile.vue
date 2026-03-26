<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const { user } = useAuth();
</script>

<template>
  <div>
    <h2>Profile</h2>
    <p>Email: {{ user?.email }}</p>
  </div>
</template>
