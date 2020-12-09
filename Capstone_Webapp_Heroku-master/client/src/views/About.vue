<template>
    <div class="about">
        <TheNavBar/>
        <AboutSection/>
        <HomeFooter/>
    </div>
</template>

<script>
import TheNavBar from '../components/TheNavBar';
import AboutSection from '../components/AboutSection';
import HomeFooter from '../components/HomeFooter';

export default {
    name: 'About',
    components: {
        TheNavBar,
        AboutSection,
        HomeFooter
    }
}
</script>