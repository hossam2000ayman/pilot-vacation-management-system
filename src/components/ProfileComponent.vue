<template>
  <div class="profile-container">
    <h2>Profile Component is created</h2>
    <div class="profile-wrapper">
      <h5>profile forms</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileComponent",
};
</script>

<style scoped>
.profile-container {
  height: 80vh;
  color: white;
  width: 100%;
  text-align: center;
  background-color: orange;
}

.profile-wrapper {
  display: flex;
  gap: 20px;
}
</style>
