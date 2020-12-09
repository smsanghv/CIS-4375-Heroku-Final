<template>
    <section class="page-section bg-dark" id="faq">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Frequently Asked Questions</h2>
                    <h3 class="section-subheading text-muted"> Ultimately, the purpose of servicing your vehicle is to protect not just your 
                        vehicle but you and your passengers. For more answers to your service questions, contact Broadway Exxon Auto Care. </h3>
                </div>
                <div class="row">

                    <div class="col-md-4 col-sm-6 portfolio-item" v-for="(obj, key) in faqJSON" :key="key">
                            <div class="portfolio-caption">
                                <h4 class ="title">{{ obj.caption }}</h4>
                                <p class="answer">{{ obj.title }}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
</template>

<script>
export default {
    data: () => ({
        faqJSON: [
            {
                img:'/something/random/img.jpg',
                caption: 'When should I get a tire rotation?',
                title: 'Tires are subject to the most wear and tear since they are the main point of contact. Also, depending on how you utilize your vehicle, for example, for off-roading or have a two-wheel drive system, in these situations, tires will be subject to the most labor. That being the case, having your tires rotated every six months or around 6,000 to 8,000 miles is a good rule to uphold ensuring your tires wear evenly.'
            },
            {
                img:'/something/random/img.jpg',
                caption: 'How often should I get an oil change?',
                title: 'The consensus agrees that a driver should get an oil change every 3,000 to 7,000 miles or every three months. However, you can always refer to your owners manual which covers the recommended oil change interval for your specific make and model. Many of todays newer vehicles will actually tell you when they are due for service. Remember: an oil change is essential because it acts as a lubricant for the internal cogs and gears under the hood. Without it, oil can turn into sludge and prohibit your vehicle from operating correctly'
            },
            {
                img:'/something/random/img.jpg',
                caption: 'How much air pressure should I put into my tires?',
                title: 'The amount of pressure a tire requires ultimately depends on the tire and vehicle types. You can find out the optimum air pressure either printed on the door jamb, the side wall of the tires or your owners manual.'
            }
        ]
    }) 
}
</script>

<style>
.section-heading {
    color: blue;
    padding: 0;
}
.title {
    color: white;
}
.answer {
    color: white;
}
</style>