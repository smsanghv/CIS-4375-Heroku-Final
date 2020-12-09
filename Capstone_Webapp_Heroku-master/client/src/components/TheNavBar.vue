<template>
	<div id="nav">
            <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav"> </nav>
			<router-link class="navbar-brand" to="/"> Broadway Exxon Auto Care </router-link>
            <button 
                class="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent"
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span class="navbar=toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav text-uppercase ml-auto">
                    <li class="nav-item active">
                        <router-link to="/" class="nav-link">Home<span class=
                        "sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link">About</router-link>
                    </li>
                    <!---->
                    <li class="nav-item">
                        <router-link to="/services" class="nav-link">Services</router-link>
                    </li>
                    <!---->
                    <li class="nav-item">
                        <router-link to="/faq" class="nav-link">FAQ</router-link>
                    </li>
                    <!---->
                    <li class="nav-item">
                        <router-link to="/schedule" class="nav-link">Schedule</router-link>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {

}
</script>
