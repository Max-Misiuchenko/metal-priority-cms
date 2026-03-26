<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <main class="main">
    <Header />
    <slot></slot>
    <Footer />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin-inline: auto;
  height: 100%;
}
</style>
