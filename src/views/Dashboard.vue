<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
  mounted() {
    axios.get("/api/user").then((res) => {
      console.log(res);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>