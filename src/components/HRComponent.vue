<template>
  <div class="manager-container">
    <div class="manager-wrapper">
      <HRFormComponent />
      <HRTableComponent />
    </div>
  </div>
</template>

<script>
import HRFormComponent from "./HRFormComponent.vue";
import HRTableComponent from "./HRTableComponent.vue";

export default {
  name: "HRComponent",
  components: {
    HRTableComponent,
    HRFormComponent,
  },
};
</script>

<style>
.manager-container {
  width: 100%;
  text-align: center;
}

.manager-wrapper {
  background-color: #f8f9fa; /* Light background */
  display: flex;
  gap: 20px;
}
</style>
