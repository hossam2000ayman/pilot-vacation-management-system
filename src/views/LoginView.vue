<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow-sm">
      <div class="text-center mb-4">
        <img class="logo" src="@/assets/asset_header_image.png" />
      </div>
      <h5 class="card-title text-center mb-4">Login</h5>
      <form @submit.prevent="defaultLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            id="username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="password"
            required
          />
        </div>
        <div class="form-check mb-3">
          <input type="checkbox" class="form-check-input" id="rememberMe" />
          <label class="form-check-label" for="rememberMe">Remember me</label>
        </div>
        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? "Signing in..." : "Sign in" }}
        </button>
      </form>
    </div>
    <div class="position-fixed bottom-0 end-0 p-3">
      <button class="btn btn-light border">
        <i class="bi bi-brightness-high-fill"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { generateSamlToken, login } from "@/service/authService";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    defaultLogin() {
      if (this.username == "Admin" && this.password == "Asset99a") {
        this.$router.push({ name: "home" }); // Navigate to home page
      } else {
        alert("Invalid login credentials");
        this.username = "";
        this.password = "";
      }
    },

    async handleLogin() {
      this.loading = true;
      //first api to get the token from userName and password
      try {
        let response = await login(this.username, this.password);
        if (response.success) {
          response = await generateSamlToken(response.data);
          if (response.success) {
            // Assuming the API returns a success flag
            this.$router.push({ name: "home" }); // Navigate to home page
            return;
          } else {
            alert("Failed to generate SAML token");
          }
        } else {
          alert("Invalid login credentials");
        }
      } catch (error) {
        alert(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
:root {
  background: linear-gradient(
    90deg,
    #0066cc,
    #00264d
  ); /* Gradient background */
}
.card {
  width: 300px;
  border-radius: 10px;
}
.logo {
  width: 100%;
}
</style>
