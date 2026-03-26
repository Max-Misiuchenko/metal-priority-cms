<template>
  <div class="admin">
    <aside class="admin__sidebar">
      <nav>
        <ul>
          <li><NuxtLink to="/admin">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/admin/settings">Settings</NuxtLink></li>
        </ul>
      </nav>
    </aside>
    <main class="admin__content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin {
  display: flex;
  min-height: 100vh;
}
.admin__sidebar {
  width: 240px;
  flex-shrink: 0;
}
.admin__content {
  flex: 1;
}
</style>
