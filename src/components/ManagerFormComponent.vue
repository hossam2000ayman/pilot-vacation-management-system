<template>
  <!-- Snackbar -->
  <div v-if="snackbar.show" class="snackbar">{{ snackbar.message }}</div>

  <div class="manager-form-container">
    <form>
      <label class="form-label left-align-label" for="EmployeeID"
        >Employee ID:</label
      >
      <input
        type="text"
        class="form-control"
        id="employeeId"
        v-model="form.EmployeeID"
        readonly
      />

      <label class="form-label left-align-label" for="EmployeeName"
        >Employee Name:</label
      >
      <input
        type="text"
        class="form-control"
        id="employeeName"
        v-model="form.EmployeeName"
        readonly
      />

      <label class="form-label left-align-label" for="StartAt">Start At:</label>
      <input
        type="text"
        class="form-control"
        id="startAt"
        v-model="form.StartAt"
        readonly
      />

      <label class="form-label left-align-label" for="EndAt">End At:</label>
      <input
        type="text"
        class="form-control"
        id="endAt"
        v-model="form.EndAt"
        readonly
      />

      <label class="form-label left-align-label" for="NumberOfDays"
        >Number Of Days:</label
      >
      <input
        type="text"
        class="form-control"
        id="numberOfDays"
        v-model="form.NumberOfDays"
        readonly
      />

      <label class="form-label left-align-label" for="Reason">Reason:</label>
      <textarea
        type="text"
        class="form-control"
        id="reason"
        v-model="form.Reason"
        readonly
      />
      <label for="vacationType" class="form-label left-align-label"
        >Vacation Type:
      </label>
      <input
        type="text"
        class="form-control"
        id="vacationType"
        v-model="form.VacationType"
        readonly
      />
      <div
        v-if="
          form.ManagerApproval == 'Approve' || form.ManagerApproval == 'Reject'
        "
      >
        <h2 class="font-impact m-4">
          {{ form.ManagerApproval }}
        </h2>
      </div>

      <div v-if="loading" class="loading-spinner"></div>

      <div v-if="!loading">
        <div v-if="form.ManagerApproval == 'Pending'">
          <button
            type="button"
            @click="submitDecision('Approve')"
            class="btn btn-outline-success m-3"
          >
            Approve
          </button>
          <button
            type="button"
            @click="submitDecision('Reject')"
            class="btn btn-outline-danger m-3"
          >
            Reject
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { TaskService } from "@/service/TaskService";

export default {
  name: "ManagerFormComponent",
  props: {
    vacation: Object,
  },
  data() {
    return {
      form: {
        EmployeeID: "",
        EmployeeName: "",
        EndAt: "",
        NumberOfDays: "",
        Reason: "",
        StartAt: "",
        VacationType: "",
        ManagerApproval: "",
      },
      snackbar: {
        show: false,
        message: "",
      },
      loading: false,
    };
  },
  watch: {
    vacation: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal.Properties }; // Populate form with vacation data
          this.form.StartAt = this.formatDate(this.form.StartAt);
          this.form.EndAt = this.formatDate(this.form.EndAt);
        }
      },
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    submitDecision(decision) {
      if (decision == "Approve") {
        this.form.ManagerApproval = "Approve";
        console.log("Approve taken to this Form :: ");
      } else if (decision == "Reject") {
        this.form.ManagerApproval = "Reject";
        console.log("Reject taken to this Form :: ");
      }
      console.log("Form submitted:", this.form);
      console.log("Decision taken is ::", decision);
      this.loading = true;
      //1- Claim Action
      setTimeout(async () => {
        await TaskService.claimTaskByTaskInstanceAndTarget();
      }, 2000);
      //2- Update the vacation status to approved
      this.$emit("update-decision", this.form.ManagerApproval); // Emit an event to update the decision state
      this.showSnackBar(
        `Your decision is ${this.form.ManagerApproval}ed Successfully Please wait ... `
      );
      this.loading = false;
    },

    showSnackBar(message) {
      this.snackbar.message = message;
      this.snackbar.show = true;
      setTimeout(() => {
        this.snackbar.show = false;
      }, 7000); // Snackbar will disappear after 5 seconds
    },
  },
};
</script>

<style scoped>
.loading-spinner {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

.snackbar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50; /* Green background */
  color: white;
  padding: 16px;
  border-radius: 4px;
  font-size: 16px;
  z-index: 10000; /* Make sure it appears on top */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.font-impact {
  font-family: Impact;
}
.manager-form-container {
  background-color: #f0f8ff;
  height: 85vh;
  padding: 20px;
  color: black;
  width: 450px;
}

.left-align-label {
  width: 100%;
  text-align: left;
}
</style>
