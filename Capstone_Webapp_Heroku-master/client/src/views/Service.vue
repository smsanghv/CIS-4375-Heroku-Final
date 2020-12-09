<template>
    <div class="about">
        <TheNavBar/>
        <ServiceInfo/>
        <HomeFooter/>
    </div>
</template>

<script>
import TheNavBar from '../components/TheNavBar';
import ServiceInfo from '../components/ServiceInfo';
import HomeFooter from '../components/HomeFooter';

export default {
    name: 'Service',
    components: {
        TheNavBar,
        ServiceInfo,
        HomeFooter
    }
}
</script>