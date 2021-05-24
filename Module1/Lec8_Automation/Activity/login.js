const puppeteer = require("puppeteer");
const id = "wegah36087@brayy.com";
const pw = "123456789";
let tab;

// puppeteer has promisfied functions

// by default headless = true

let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});

browserOpenPromise.then(function (browser) {
    console.log("browser is opened !");
    return browser.pages();
})
    .then(function (pages) {
        tab = pages[0];
        return tab.goto("https://www.hackerrank.com/auth/login");
    })
    .then(function () {
        return tab.type("#input-1", id, { delay: 100 });
    })
    .then(function () {
        return tab.type("#input-2", pw, { delay: 100 });
    })
    .then(function () {
        return tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    })
    .then(function(){
        return waitAndclick("#base-card-1-link");
    })
    .then(function(){
        return waitAndclick("#base-card-7-link");
    })
    .then(function(){
        return tab.waitForSelector(".js-track-click.challenge-list-item");
    })
    .then(function(){
        return tab.$$(".js-track-click.challenge-list-item");
    })
    .then(function(allAtags){
        let allLinks=[];
        for(let i=0;i<allAtags.length;i++){
            let oneTag=allAtags[i];
            let pendingPromise= oneTag.evaluate(function(element){return element.getAttribute("href"); },oneTag);
            allLinks.push(pendingPromise);
        }
        console.log(allLinks);
        let combinedallLinks= Promise.all(allLinks);
        return combinedallLinks;
    })
    .then(function(allLinks){
        console.log(allLinks);
    })
    .catch(function(err){
        console.log(err);
    })
    // .then(function () {
    //     return tab.waitForSelector("#base-card-1-link", { visible: true });
    // })
    // .then(function () {
    //     return tab.click("#base-card-1-link");
    // })
    // .then(function () {
    //     return tab.waitForSelector("#base-card-7-link", { visible: true });
    // })
    // .then(function () {
    //     return tab.click("#base-card-7-link");
    // })
    function waitAndclick(selector){
        return new Promise(function(scb,fcb){
            let waitPromise= tab.waitForSelector(selector, { visible: true });
            waitPromise.then(function(){
                return tab.click(selector);
            })
            .then(function(){
                scb();
            })
            .catch(function(){
                fcb();
            })
        });
    }