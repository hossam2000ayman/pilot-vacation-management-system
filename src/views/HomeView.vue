<template>
  <div class="layout">
    <SidebarComponent />
    <div class="main-content">
      <HeaderComponent />
      <div class="content-wrapper">
        <!-- To dynamically load the pages -->
        <ContentComponent />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "@/components/SidebarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ContentComponent from "@/components/ContentComponent.vue";

export default {
  name: "HomeView",
  components: {
    SidebarComponent,
    HeaderComponent,
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
