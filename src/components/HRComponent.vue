<template>
  <div class="hr-container">
    <div class="hr-wrapper">
      <HRFormComponent
        :vacation="selectedVacation"
        @update-decision="handleUpdateDecision"
      />
      <HRTableComponent :tasks="tasks" @view-hr="handleViewHr" />
    </div>
  </div>
</template>

<script>
import { VacationService } from "@/service/VacationService";
import HRFormComponent from "@/components/HRFormComponent.vue";
import HRTableComponent from "@/components/HRTableComponent.vue";
import { TaskService } from "@/service/TaskService";

export default {
  name: "ManagerComponent",
  components: {
    HRTableComponent,
    HRFormComponent,
  },

  data() {
    return {
      selectedVacation: null,
      hrApproval: null,
      tasks: [],
    };
  },
  methods: {
    handleViewHr(vacation) {
      this.selectedVacation = vacation;

      console.log(
        "Task >>>> Vacation ID ::  " + this.selectedVacation.Identity.Id
      );
      console.log("Task >>>> Selected Vacation Object :: ");
      console.log(this.selectedVacation.Properties);
    },
    async handleUpdateDecision(decision) {
      this.hrApproval = decision;
      //update vacation from ManagerApproval to Approve
      let response = await VacationService.updateHRApprovalVacation(
        this.selectedVacation.Identity.Id,
        this.hrApproval
      );
      console.log("Updated Vacation Successfully Response :::::: ");
      console.log(response);
      //3- Complete action after delay
      setTimeout(async () => {
        response = await TaskService.completeTaskByTaskInstanceAndTarget();
        console.log("Complete Task :::::: ");
        console.log(response);
      }, 6000);

      // setTimeout(() => window.location.reload(), 4000);
    },
  },
};
</script>

<style>
.hr-container {
  width: 100%;
  text-align: center;
}

.hr-wrapper {
  background-color: #f8f9fa; /* Light background */
  display: flex;
  gap: 20px;
}
</style>
