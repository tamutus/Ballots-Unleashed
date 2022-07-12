<template>
  <img :src="imgSource" />
</template>
<script>
export default {
  name: "ProfileImage",
  props: {
    imgSource: {
      type: String,
      default:
        "https://i.kym-cdn.com/photos/images/newsfeed/001/126/045/381.jpg",
    },
  },
};
</script>
<style scoped>
img {
  max-height: 76px;
  max-width: 76px;
}
</style>
