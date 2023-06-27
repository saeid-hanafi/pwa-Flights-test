// const { response } = require("express");

// Run Service Worder If Activative On User Browser
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./dist/sw.js")
            .then((registration) => {
                console.log("Service Worker registered: ", registration);
            })
            .catch((registrationError) => {
                console.error("Service Worker registration failed: ", registrationError);
            });
    });
}

// Fetch Information From Api
fetch("https://www.example.com/api/example.json")
.then(response => response.json())
.then(data => {
    var html = "";
    var rewardsHtml = "";
    data.forEach(item => {
        html += "<div class='card'>" + item.title + "</div>";
        rewardsHtml += "<a href='" + item.link + "' class='reward-card'><img src='" + item.img + "'/></a>" 
    });
    document.querySelector("#screen-flights").innerHTML = html;
    document.querySelector("#screen-rewards").innerHTML = rewardsHtml
});

// Install Prompt Button Config
btn = document.querySelector("#install-prompt")
let promptEvent;

// Display Install Btn On Mobile Devices By PWA ( 'beforeinstallprompt' event for pwa )
window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    promptEvent = event;
    btn.style.display = "block";
});

btn.addEventListener("click", () => {
    btn.style.display = "none";
    promptEvent.prompt();
    promptEvent.userChoice.then(res => {
        console.log(res);
        promptEvent = null;
    })
})