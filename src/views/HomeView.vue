<template>
  <div class="layout">
    <SideBar />
    <div class="main-content">
      <Header />
      <div class="content-wrapper">
        <!-- To dynamically load the pages -->
        <ContentComponent />
        <!-- <router-view /> -->
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SidebarComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import ContentComponent from "@/components/ContentComponent.vue";

export default {
  name: "HomeView",
  components: {
    SideBar,
    Header,
    ContentComponent,
  },
};
</script>

<style scoped>
.layout {
  display: flex;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  padding: 10px;
  background-color: #f8f9fa; /* Light background */
  display: flex;
  gap: 20px;
}
</style>
