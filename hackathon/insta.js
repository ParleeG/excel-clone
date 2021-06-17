const puppeteer = require("puppeteer");
const email="reten50620@jmpant.com";
const psw="29022010";
async function login(){
    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"],
    });
    let pages=await browser.pages();
    let tab=pages[0];
    await tab.goto("https://www.instagram.com/");
    await tab.waitForSelector('input[aria-label="Phone number, username, or email"]');
    await tab.type('input[aria-label="Phone number, username, or email"]',email);
    await tab.type('input[aria-label="Password"]',psw);
    let login=await tab.$(".sqdOP.L3NKy.y3zKF");
    await login.click();
    await tab.waitForSelector('.XTCLo.x3qfX');
    await tab.type('.XTCLo.x3qfX',"guptahimanshu0520");
    await tab.waitForTimeout(2000);
    await tab.waitForSelector("._01UL2");
    let check=await tab.$("._01UL2 div div a");
    let link=await tab.evaluate(function(elem){
        let link =elem.getAttribute("href");
        return link;
    },check);
    link="https://www.instagram.com"+link;
    await tab.goto(link);
    let allposts=await tab.$$(".Nnq7C.weEfm div a");
    let links=[];
    for(let i=0;i<allposts.length;i++){
        let link=await tab.evaluate(function(elem){
            let link=elem.getAttribute("href");
            return link;
        },allposts[i]);
        link="https://www.instagram.com"+link;
        links.push(link);
    }
    for(let i=0;i<links.length;i++){
       await golike(browser,links[i]);
    }
}login();
async function golike(browser,tolink){
    let newtab= await browser.newPage();
    await newtab.goto(tolink);
    await newtab.waitForSelector(".ltpMr.Slqrh .fr66n .wpO6b");
    let button=await newtab.$(".ltpMr.Slqrh .fr66n .wpO6b");
    await button.click();
    await newtab.close();
}