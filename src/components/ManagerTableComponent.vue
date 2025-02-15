<template>
  <div class="table-container">
    <div v-if="loading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
    <!-- Table -->
    <table v-if="!loading" class="manager-table">
      <thead>
        <tr>
          <th>Source Name</th>
          <th>Priority</th>
          <th>Start Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in managerApprovalTasks" :key="index">
        <tr>
          <td>{{ item.Task.SourceName + "" || "" }}</td>
          <td>
            {{ item.Task.Priority + "" || "" }}
          </td>
          <td>{{ formatDate(item.Task.StartDate) + "" || "" }}</td>
          <td>
            {{
              item.Task.State == 1
                ? "Created"
                : item.Task.State == 3
                ? "Pending"
                : item.Task.State == 5
                ? "Completed"
                : item.Task.State == 2
                ? "Assigned"
                : item.Task.State + ""
            }}
          </td>
          <td>
            <button
              type="button"
              @click="viewTask(item._links.item.href)"
              class="btn btn-outline-info"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { TaskService } from "@/service/TaskService";
import { VacationService } from "@/service/VacationService";

export default {
  name: "ManagerTableComponent",
  data() {
    return {
      loading: false, // Add loading state
      tasks: [], // Placeholder for the All tasks data
      managerApprovalTasks: [], // Placeholder for the ManagerApprovalTasks data
      snackbar: {
        show: false,
        message: "",
      },
      taskInstance: "",
      target: "",
    };
  },
  async mounted() {
    await this.fetchManagersTasks();
  },

  watch: {
    tasks: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.managerApprovalTasks = this.tasks
            .filter((task) => task.Task.Subject == "ManagerApprovalLayout")
            .sort((a, b) => a.Task.State - b.Task.State);
        }
      },
    },
  },
  methods: {
    async fetchManagersTasks() {
      this.loading = true;
      const response = await TaskService.getAllTasks();
      this.tasks = response._embedded.AllTasks;

      this.managerApprovalTasks = this.tasks.filter(
        (task) => task.Task.Subject === "ManagerApprovalLayout"
      );
      console.log(this.managerApprovalTasks);

      this.loading = false;
    },
    async viewTask(item) {
      // /OpenTextInboxTaskManagement/entities/InboxTask/items/taskInstanceId.target
      // Remove the prefix to isolate the part containing the IDs
      const compositeId = item.substring(item.lastIndexOf("/") + 1);
      // Split the string by the dot to get the two parts
      const [taskInstanceId, target] = compositeId.split(".");
      // Output the results
      console.log("taskInstanceId:", taskInstanceId);
      console.log("target:", target);
      localStorage.setItem("taskInstanceId", taskInstanceId);
      localStorage.setItem("target", target);
      //get task by taskInstance and target
      let task = await TaskService.getTaskByTaskInstanceAndTarget(
        taskInstanceId,
        target
      );
      let vacationInstanceId = task.Task.EntityInstanceId;
      let vacationId = vacationInstanceId.substring(
        vacationInstanceId.lastIndexOf(".") + 1
      );
      //get vacation by entityInstanceId
      let selectedVacation = await VacationService.getVacationById(vacationId);
      this.$emit("view-manager", selectedVacation);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-left-color: #4682b4;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.table-container {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f0f8ff; /* Lightened background color */
  padding: 20px;
  overflow-y: auto;
  position: relative;
}

.manager-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.manager-table th,
.manager-table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 12px;
}

.manager-table th {
  background-color: #4682b4; /* Steel blue */
  color: white;
  text-transform: uppercase;
  font-size: 14px;
}

.manager-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.manager-table td {
  font-size: 13px;
}
</style>
