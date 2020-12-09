<template>

  <div class="hello">
    <FrontNav/>
    
    <div class="name">
      
      <div class="letter">
        
        <!--<img src="../assets/img/header-bg.jpeg" class="letter-image">-->
        <div class="heading1">WELCOME TO BROADWAY EXXON AUTO CARE!</div>
          <div class="heading2">We are here to serve all your car needs.</div>
          <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger btn-cust-align" href="#services">Tell Me More</a>
      </div>
    </div>
    
    <AboutSection/>
    <ServiceInfo/>
    <FrontFaq/>
    <Schedule/>
    <HomeFooter/>
  </div>
  
  
</template>

<script>
import FrontNav from '../components/FrontNav.vue';
//import Masthead from '../components/Masthead.vue';
import FrontFaq from '../components/FrontFaq.vue';
import AboutSection from '../components/AboutSection.vue';
import Schedule from '../components/Schedule.vue';
import ServiceInfo from '../components/ServiceInfo.vue';
import HomeFooter from '../components/HomeFooter';

export default {
  name: 'Home',
  components: {
    FrontNav,
    FrontFaq,
    AboutSection,
    Schedule,
    ServiceInfo,
    HomeFooter
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: 100vw;
  height: calc(100vh - 60px);
}
.letter {
  margin: .8%;
  filter: drop-shadow(0px 0px 7px rgba(150, 150, 150, .7));
  background-image: url("../assets/img/header-bg.jpeg");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  background-color: black;
}
.letter-image {
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
body {
  background: black;
}
.heading1{
  margin: 0;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 2px 2px 5px black;
  font-size: 250%;
  text-align: center;
}
.heading2{
  margin: 0;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 2px 2px 5px black;
  font-size: 150%;
  text-align: center;
}
.btn-cust-align{
  margin: 0;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>