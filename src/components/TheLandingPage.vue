<template>
    <div id="hero">
        <div id="landing-page-main">
            <img 
                id="landing-page-hero"
                src="../assets/landingpage/hero/checklist-group.jpg" 
                alt=""
            >

            <div id="hero-text">
                <div>
                    <h1>Welcome To Corporate Tasks</h1>
                    <div>
                        <p>Need a task management tool ? or fed up with other costly task management tools ?</p>
                        <p>Take your organization
                        <span style="color: #002243; color: rgba(0, 86, 255); font-weight: bold;">From Overwhelmed To Organized</span>
                        with our carefully crafted task management tool</p>
                    </div>
                </div>

                <div id="hero-text-user-actions">
                    <button 
                        id="login"
                        @click.prevent="$router.push({ name: 'login' })"
                    >Log In</button>

                    <button
                        id="register"
                        @click="contactThroughMail('Registration')"
                    >Register</button> 
                </div>


            </div>
        </div>

        <div id="extra-user-things">
            <div id="extra-user-things-why-us">
                <h1>Why us?</h1>

                <div style="display: flex; gap: 12px;">
                    <div>
                        <span>Cost Effective</span>
                    </div>

                    <span> - </span>

                    <div>
                        <span>Easy To Use</span>
                    </div>

                    <span> - </span>

                    <div>
                        <span>No Usage Limits</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="extra">

            <div id="extra-features">
                <h1 style="text-align: left;">Features</h1>
                
                <div style="display: flex; gap: 24px; flex-wrap: wrap; flex-basis: 250px;">
                    <section>
                        <h3>Role based employee management</h3>
                        <p>You can create - edit - remove employee on just one click</p>
                        <p>Create custom roles to provide bucket of rights and assign them to employees</p>
                    </section>

                    <section>
                        <h3>Clients management</h3>
                        <p>Manage established clients you're working for and even keep track of potential clients with leads</p>
                    </section>

                    <section>
                        <h3>task templates</h3>
                        <p>Saves you from creating same tasks over and over again.</p>
                        <p>Create templates for frequently created tasks</p>
                        <p>e.g. if you find yourself creating task for filing tax, make task template with appropriate sub tasks, then next time while creating task you can just auto-populate all sub tasks and other general details by just selecting appropriate task template from options</p>
                    </section>

                    <section>
                        <h3>Work diary</h3>
                        <p>Instead of manually getting follow ups from employees now you can use our work diary to keep track over progress made on any tasks over specified period of time</p>
                    </section>
                </div>

                <div style="display: flex; flex-direction: column; flex-wrap: wrap; flex-basis: 250px; margin-top: 64px">
                    
                    <div style="display: flex; gap: 8px; flex-direction: row; align-items: center;">
                        <h2>Contact Us</h2> 
                        <p>We're pretty fast at replying...</p>
                    </div>

                    <p style="cursor: pointer;" @click.prevent="contactThroughMail('')">admin@corporatetasks.com</p>
                    <p style="cursor: pointer;" @click.prevent="contactThoughWa">+91 884 9210 989</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
function contactThroughMail(regarding) {
    const email = 'admin@corporatetasks.com';
    const subject = `Regarding: ${regarding}`;
    const body = `How you intend to use corporatetasks.com?\n\n\nHow many employees do your organization have?\n\n\nAre switching from any other existing product (if yes please provide reasons) or we're your first choice?\n\n\n`;

    const mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailtoLink;
}

function contactThoughWa() {
    var phoneNumber = '918849210989';
    var whatsappUrl = 'https://wa.me/' + phoneNumber;
    window.open(whatsappUrl, '_blank');
  }
</script>

<style scoped>
html {
    margin-top: -18px;
}
h1, h3 {
    color: #002243;
    font-size: 36px;
    text-transform: capitalize;
}


/* hero section start*/
#landing-page-main {
    display: flex; 
    justify-content: space-around; 
    align-items: center; 
    gap: 24px; 
    margin: 0 48px;
}
#hero {
    background-color: #fff !important;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    margin-top: 36px;
}
#hero-text {
    padding-right: 36px;
}
#hero-text p {
    font-size: 18px;
    margin: 9px 0;
}
#hero-text-user-actions {
    color: rgb(69, 69, 69);
    margin: 18px 0;
    display: flex;
    gap: 9px;
}
#hero-text-user-actions button {
    padding: 4px 9px;
    width: 150px;
    border: solid 4px #eee;
    font-size: 15px;
    border-radius: 12px;
    color: #002243;
    background-color: #e0e0e0;
}
#hero-text-user-actions button:hover {
    background-color: rgba(0, 94, 255, 0.8);
    border: none;
    color: #fff;    
}
#extra-user-things {
    display: flex;
    align-items: center;
    margin-top: 36px;
    flex-direction: column;
}
#extra-user-things-why-us {
    width: 100%;
}
#extra-user-things span {
    font-size: 18px;
}
/* hero section end */


/* extra starts */
#extra {
    margin: 48px 0; 
    padding: 48px 0;
    width: 100% !important;
    align-items: center;
    background: linear-gradient(235deg, rgba(0, 94, 255, 0.2), transparent);;
    color: #002243;
    display: flex;
    flex-direction: column;
}
#extra-features,
#extra-user-things-why-us {
    min-width: 300px;
    max-width: 700px;
    margin-left: 48px;
}
#extra p,
#extra h3 {
    font-size: 18px;
}
#extra p {
    margin: 9px 0;
}

/* extra ends */

#landing-page-hero {
    width: 40%;
    height: 40%;
    min-width: 300px;
}

@media screen and (max-width: 768px) {
    #landing-page-main {
        flex-direction: column;
    }
}
</style>

<style>
#app, html {
    background-color: #fff;
}
</style>