<template>
  <div
    :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]"
    :style="{ width: sideBarWidth }"
  >
    <ul class="nav flex-column">
      <li class="nav-item" @click="selectItem('Home Page')">
        <router-link to="" class="nav-link">Home Page</router-link>
      </li>
      <li class="nav-item" @click="selectItem('HR Page')">
        <router-link to="" class="nav-link">HR Page</router-link>
      </li>

      <li class="nav-item" @click="selectItem('Manager Page')">
        <router-link to="" class="nav-link">Manager Page</router-link>
      </li>
      <li class="nav-item" @click="signOut">
        <a href="#" class="nav-link">Sign Out</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { state, selectSidebarItem, sideBarWidth } from "@/state/state";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "SidebarComponent",
  setup() {
    const router = useRouter();

    const signOut = () => {
      router.replace("/");
    };

    const selectItem = (item) => {
      selectSidebarItem(item);
    };

    return {
      isSidebarOpen: computed(() => state.isSidebarOpen),
      sideBarWidth,
      selectItem,
      signOut,
    };
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #0065ca;
  color: white;
  height: 100vh;
  padding: 20px;
  width: 250px;
  transition: width 0.3s ease; /* Smooth transition */
  overflow: hidden; /* Prevents content from overflowing when hidden */
}

.sidebar-closed {
  width: 0;
  padding: 20px 0; /* Keep top/bottom padding when collapsed */
}

.nav-link {
  color: white;
}

.nav-link:hover {
  color: #ffcc00;
}
</style>
