<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login">
      <div>
        <input type="email" />
      </div>

      <div>
        <input type="password" />
      </div>

      <button>Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
  methods: {
    login() {
      axios.get("/sanctum/csrf-cookie").then((res) => {
        axios
          .post("/login", {
            email: "asdf@live.com",
            password: "password",
          })
          .then((res) => {
            console.log(res);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>