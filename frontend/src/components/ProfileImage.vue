<template>
<!-- Place an avatar picture enabling to be replaced by the user picture-->
  <div class="profile-picture" :class="divCustomClass">
    <img
      class="profile-picture__img"
      :class="customClass"
      :src="src || 'avatar.jpg'"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'ProfileImage',
  props: ['customClass', 'divCustomClass', 'src']
}
</script>

<style>

.profile-picture {
  overflow: hidden;
  border-radius: 100%;
  background: black;
}
.profile-picture__img {
    transform: scale(1.35);
}

</style>