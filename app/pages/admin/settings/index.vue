<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "admin",
});
</script>

<template>
  <div>
    <h1>Settings</h1>
    <nav>
      <NuxtLink to="/admin/settings/profile">Profile</NuxtLink>
      <NuxtLink to="/admin/settings/site">Site</NuxtLink>
    </nav>
    <NuxtPage />
  </div>
</template>
