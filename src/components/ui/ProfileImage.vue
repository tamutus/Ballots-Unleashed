<template>
  <img :src="imgSource" />
</template>
<script>
export default {
  name: "ProfileImage",
  props: {
    imgSource: {
      type: String,
      default: "https://freesvg.org/img/abstract-user-flat-1.png",
    },
  },
};
</script>
<style scoped>
img {
  max-height: 76px;
  max-width: 76px;
}
@media screen and (max-width: 767px) {
  img {
    max-height: 56px;
    max-width: 56px;
  }
}
</style>
