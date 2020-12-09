<template>
    <div class="faq">
        <TheNavBar/>
        <FrontFaq/>
        <HomeFooter/>
    </div>
</template>

<script>
import TheNavBar from '../components/TheNavBar';
import FrontFaq from '../components/FrontFaq';
import HomeFooter from '../components/HomeFooter';

export default {
    name: 'Faq',
    components: {
        TheNavBar,
        FrontFaq,
        HomeFooter
    }
}
</script>