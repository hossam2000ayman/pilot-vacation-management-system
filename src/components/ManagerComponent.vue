<template>
  <div class="manager-container">
    <div class="manager-wrapper">
      <ManagerFormComponent
        :vacation="selectedVacation"
        @update-decision="handleUpdateDecision"
      />
      <ManagerTableComponent :tasks="tasks" @view-manager="handleViewManager" />
    </div>
  </div>
</template>

<script>
import { VacationService } from "@/service/VacationService";
import ManagerFormComponent from "./ManagerFormComponent.vue";
import ManagerTableComponent from "./ManagerTableComponent.vue";
import { TaskService } from "@/service/TaskService";

export default {
  name: "ManagerComponent",
  components: {
    ManagerTableComponent,
    ManagerFormComponent,
  },

  data() {
    return {
      selectedVacation: null,
      managerApproval: null,
      tasks: [],
    };
  },
  methods: {
    handleViewManager(vacation) {
      this.selectedVacation = vacation;

      console.log(
        "Task >>>> Vacation ID ::  " + this.selectedVacation.Identity.Id
      );
      console.log("Task >>>> Selected Vacation Object :: ");
      console.log(this.selectedVacation.Properties);
    },
    async handleUpdateDecision(decision) {
      this.managerApproval = decision;
      //update vacation from ManagerApproval to Approve
      let response = await VacationService.updateManagerApprovalVacation(
        this.selectedVacation.Identity.Id,
        this.managerApproval
      );
      console.log("Updated Vacation Successfully Response :::::: ");
      console.log(response);
      //3- Complete action after delay
      setTimeout(async () => {
        response = await TaskService.completeTaskByTaskInstanceAndTarget();
        console.log("Complete Task :::::: ");
        console.log(response);
      }, 5000);

      // setTimeout(() => window.location.reload(), 4000);
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
