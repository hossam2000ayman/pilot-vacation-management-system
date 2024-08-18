<template>
  <header class="header">
    <button @click="toggleSidebar" class="btn btn-link">
      <i class="fas fa-bars white-menu"></i>
    </button>
    <span class="sidebar-item-name">{{ selectedSidebarItem }}</span>
    <img
      src="@/assets/asset_header_image.png"
      alt="Logo"
      class="logo mx-auto"
    />
    <div class="actions">
      <button @click="createVacation()" class="btn btn-light">
        <i class="fas fa-plus"></i>
      </button>
      <button class="btn btn-light" @click="selectItem('Profile Page')">
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

    // Handle option selection
    const createVacation = () => {
      alert("Vacation is created");
    };

    // Select sidebar item
    const selectItem = (item) => {
      selectSidebarItem(item);
    };

    return {
      toggleSidebar,
      selectedSidebarItem,
      selectItem,
      createVacation,
    };
  },
};
</script>

<style scoped>
.white-menu {
  color: white;
}

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
  position: relative; /* Positioning for the dropdown */
}

.dropdown-menu {
  position: absolute;
  top: 40px; /* Adjust dropdown position */
  right: 0;
  background-color: black;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  z-index: 10; /* Increased z-index */
  width: 200px;
  height: 100px;
}

.dropdown-menu li {
  padding: 8px;
  cursor: pointer;
  color: #333;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

/* Scale transition for dropdown */
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.9);
}
</style>
