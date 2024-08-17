<template>
  <div
    :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]"
    :style="{ width: sideBarWidth }"
    @transitionend="onTransitionEnd"
  >
    <ul class="nav flex-column">
      <li class="nav-item" @click="selectItem('Home Page')">
        <router-link to="/home" class="nav-link">Home Page</router-link>
      </li>
      <li class="nav-item" @click="selectItem('Profile')">
        <router-link to="home" class="nav-link">Profile</router-link>
      </li>
      <li class="nav-item" @click="signOut">
        <a href="#" class="nav-link">Signout</a>
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
      // Perform signout logic here, then navigate to login page
      router.push("/login");
    };

    const selectItem = (item) => {
      selectSidebarItem(item);
      if (item === "Signout") {
        signOut();
      }
    };

    return {
      isSidebarOpen: computed(() => state.isSidebarOpen),
      sideBarWidth,
      selectItem,
      signOut,
    };
  },
  methods: {
    onTransitionEnd() {
      // Any logic after the transition ends (if needed)
    },
  },
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
