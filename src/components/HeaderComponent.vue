<template>
  <header class="header">
    <button @click="toggleSidebar" class="btn btn-link">
      <i class="fas fa-bars" style="color: white"></i>
    </button>
    <span class="sidebar-item-name">{{ selectedSidebarItem }}</span>
    <img
      src="@/assets/asset_header_image.png"
      alt="Logo"
      class="logo mx-auto"
    />
    <div class="actions">
      <button class="btn btn-light">
        <!-- Add Vacation -->
        <i class="fas fa-plus"></i>
      </button>
      <button class="btn btn-light" @click="selectItem('Profile Page')">
        <!-- Show Profile Tab -->
        <i class="fas fa-user"></i>
      </button>
    </div>
  </header>
</template>

<script>
import { state, selectSidebarItem, toggleSidebar } from "@/state/state";
import { computed } from "vue";

export default {
  name: "HeaderComponent",
  setup() {
    const selectedSidebarItem = computed(() => state.selectedSidebarItem);

    const selectItem = (item) => {
      selectSidebarItem(item);
    };

    return {
      toggleSidebar,
      selectedSidebarItem,
      selectItem,
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
  display: flex;
  align-content: center;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
