<template>
<!-- Header not styling correctly. Have yet to figure out why. -->
  <header class="bgimg-1 w3-display-container w3-grayscale-min" id="home">
    <div class="w3-display-left w3-text-white" style="padding:48px">
    </div>
  </header>
</template>

<script>
export default {
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap');
body,h1,h2,h3,h4,h5,h6 {
font-family: 'Raleway', sans-serif;
    }
  
  body, html {
    height: 100%;
    line-height: 1.8;
  }
  
  .bgimg-1 {
    background-position: center;
    background-size: cover;
    min-height: 100%;
  }
    .w3-bar .w3-button {
    padding: 16px;
  }
</style>