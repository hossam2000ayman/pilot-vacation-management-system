<template>
  <div
    :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]"
    :style="{ width: sideBarWidth }"
  >
    <ul class="nav flex-column">
      <li class="nav-item" @click="selectItem('Home Page')">
        <router-link to="" class="nav-link">Home Page</router-link>
      </li>
      <li class="nav-item" @click="selectItem('Profile Page')">
        <router-link to="" class="nav-link">Profile</router-link>
      </li>

      <li class="nav-item" @click="selectItem('Tasks Page')">
        <router-link to="" class="nav-link">Tasks</router-link>
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
      // Perform signOut logic here, then navigate to login page
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
  methods: {},
};
</script>

<style scoped>
.sidebar {
  background-color: #003366;
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
