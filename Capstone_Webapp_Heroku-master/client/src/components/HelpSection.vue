<template>
  <div class="home">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">MEVN Stack</h1>
        <p class="lead">Simple authentication application built with MEVN Stack using Express, Node.js, Vue.js and MongoDB by Codebook Inc.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="card bg-dark text-white">
          <div class="card-body">
            <h5 class="card-title"> When should I get a tire rotation? </h5>
            <p class="card-text">
              Tires are subject to the most wear and tear since they are the main point of contact. Also, depending on how you utilize your 
              vehicle, for example, for off-roading or have a two-wheel drive system, in these situations, tires will be subject to the most 
              labor. That being the case, having your tires rotated every six months or around 6,000 to 8,000 miles is a good rule to uphold
              ensuring your tires wear evenly.</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title"> How often should I get an oil change? </h5>
            <p class="card-text">
              The consensus agrees that a driver should get an oil change every 3,000 to 7,000 miles or every three months. However, you
              can always refer to your owner's manual which covers the recommended oil change interval for your specific make and model. 
              Many of today's newer vehicles will actually tell you when they are due for service. Remember: an oil change is essential
              because it acts as a lubricant for the internal cogs and gears under the hood. Without it, oil can turn into sludge and 
              prohibit your vehicle from operating correctly.</p>
            <a href="https://expressjs.com/" target="_blank" class="btn bg-white">More Info.</a>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="card bg-danger text-white">
          <div class="card-body">
            <h5 class="card-title">Vue.js</h5>
            <p class="card-text">
              Vue.js features an incrementally adoptable architecture that focuses on declarative rendering and component composition. 
              Advanced features required for complex applications such as routing...</p>
            <a href="https://vuejs.org/" target="_blank" class="btn bg-white">More Info.</a>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Node.js</h5>
            <p class="card-text">
              As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications. In the following 
              "hello world" example, many connections can be handled concurrently.</p>
            <a href="https://nodejs.org/" target="_blank" class="btn bg-white">More Info.</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>