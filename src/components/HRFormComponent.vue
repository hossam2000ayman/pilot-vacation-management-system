<template>
  <div class="hr-form-container">
    <form @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="form.name" required />

      <label for="position">Position:</label>
      <input type="text" id="position" v-model="form.position" required />

      <label for="department">Department:</label>
      <input type="text" id="department" v-model="form.department" required />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "HRFormComponent",
  props: {
    hr: Object,
  },
  data() {
    return {
      form: {
        name: "",
        position: "",
        department: "",
      },
    };
  },
  watch: {
    hr: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal }; // Populate form with manager data
        }
      },
    },
  },
  methods: {
    submitForm() {
      // Replace this with your form submission logic
      console.log("Form submitted:", this.form);
      // Reset form or navigate as needed
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: "",
        position: "",
        department: "",
      };
      this.$emit("form-submitted", this.form);
    },
  },
};
</script>

<style scoped>
.hr-form-container {
  background-color: #003366;
  height: 85vh;
  padding: 20px;
  color: white;
  width: 450px;
}
</style>
