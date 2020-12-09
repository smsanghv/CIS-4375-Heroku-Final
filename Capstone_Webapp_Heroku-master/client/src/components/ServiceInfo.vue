<template>
    <section class="page-section bg-dark" id="services">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Services</h2>
                    <h3 class="section-subheading text-muted">To keep your vehicle running properly at all times, we offer a number of services in that are carried out by our 
                        certified, expert auto service and repair technicians who have years of experience performing everything from oil changes to a complete engine 
                        overhaul.</h3>
                </div>

                <div class="row text-center">
                    <div class="col-md-4" v-for="(obj, key) in serviceJSON" :key="key">
                        <h4 class="title"> {{ obj.caption }}</h4>
                        <p class="description"> {{ obj. title }} </p>
                    </div>
                </div>
            </div>
        </section>
</template>

<script>
export default {
    data: () => ({
	serviceJSON: [
        {
            caption:'State Inspection',
			title:'Broadway Exxon Auto Care is a state certified automotive inspection service that can help you with all your car inspection needs. Whether its the purchase of a preowned vehicle or safety inspection for the year, Broadway Exxon Auto Care is ready to give your vehicle a fast, thorough and complete inspection.'
        },
        {
            caption:'Auto Repair and Service',
            title:'Auto repair service from Broadway Exxon Auto Care may be able to help you if your car has begun to show signs of disrepair. We know how important having a working vehicle is to you and your loved ones, and we will do everything we can to provide quick, superior service to you and your car.'
        },
        {
            caption:'Check Engine Light Service',
            title:'Our skilled technicians can diagnose the problem quickly and repair whatever is necessary be as swiftly as possible. When that Check Engine Light turns on, give us a call! Our staff is happy to walk through the entire process with you and answer questions that you may have.'
        }
        ]
    })
}
</script>

<style>
.title {
    color: blue;
}
.description {
    color: white;
}
</style>