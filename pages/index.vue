<template>
  <div class="main">
    <div class="main">
      <div class="container">
        <div class="title">
          Первый экран
        </div>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <div class="title">
          Второй экран
        </div>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <div class="title">
          Третий экран
        </div>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <div class="title">
          Четвертый экран
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">

.main {
  width: 100vw;
  background-image: url('/images/header.jpg');
  background-size: auto auto;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100%;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .title {
    color: $white;
    font-size: 32px;
  }
}
</style>
