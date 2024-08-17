<template>
  <header class="header">
    <button @click="toggleSidebar" class="btn btn-link">
      <i class="fas fa-bars" style="color: white"></i>
    </button>
    <span class="sidebar-item-name">{{ selectedSidebarItem }}</span>
    <!-- Display selected sidebar item -->
    <img
      src="@/assets/asset_header_image.png"
      alt="Logo"
      class="logo mx-auto"
    />
    <div class="actions">
      <button class="btn btn-light">
        <i class="fas fa-plus"></i>
      </button>
      <button class="btn btn-light">
        <i class="fas fa-user"></i>
      </button>
    </div>
  </header>
</template>

<script>
import { state, toggleSidebar } from "@/state/state";
import { computed } from "vue";

export default {
  name: "HeaderComponent",
  setup() {
    const selectedSidebarItem = computed(() => state.selectedSidebarItem);

    return {
      toggleSidebar,
      selectedSidebarItem,
    };
  },
};
</script>

<style scoped>
.header {
  background: linear-gradient(
    90deg,
    #0066cc,
    #00264d
  ); /* Gradient background */
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-item-name {
  margin-left: 10px;
  font-weight: bold;
  color: white;
}

.logo {
  width: 100px;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
