<template>
  <div class="manager-container">
    <div class="manager-wrapper">
      <ManagerFormComponent
        :manager="selectedManager"
        :makeDecision="makeDecision"
        @form-submitted="handleFormSubmitted"
        @update-decision="handleUpdateDecision"
      />
      <ManagerTableComponent @view-manager="handleViewManager" />
    </div>
  </div>
</template>

<script>
import ManagerFormComponent from "./ManagerFormComponent.vue";
import ManagerTableComponent from "./ManagerTableComponent.vue";

export default {
  name: "ManagerComponent",
  components: {
    ManagerTableComponent,
    ManagerFormComponent,
  },

  data() {
    return {
      selectedManager: null,
      makeDecision: false,
    };
  },
  methods: {
    handleViewManager(manager, makeDecision) {
      this.selectedManager = manager;
      this.makeDecision = makeDecision;
    },
    handleFormSubmitted(updatedManager) {
      // Handle form submission
      console.log("Manager updated:", updatedManager);
      this.selectedManager = null;
    },
    handleUpdateDecision(makeDecision) {
      this.makeDecision = makeDecision;
    },
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
