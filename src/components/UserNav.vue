<template>
  <div id="user-nav">
    <h1>{{ user }}</h1>
  </div>
</template>
<script>
export default { name: "UserNav", props: { user: String } };
</script>
<style scoped>
#user-nav {
  display: fixed;
  top: 15px;
  right: 15px;
}
</style>
