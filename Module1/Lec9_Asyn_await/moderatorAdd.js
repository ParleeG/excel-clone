const id = "pamico3332@nic58.com";
const pw = "12345678";
const puppeteer = require("puppeteer");

async function login(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
      });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.waitForTimeout(5000);
    let element = await tab.$('div[data-analytics="NavBarProfileDropDown"]');
    await element.click();
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[1];
    await manageChallengeLi.click();
    await moderatorAdd(browser,tab);  
};
login();
async function moderatorAdd(browser,tab){
    await tab.waitForSelector(".backbone.block-center",{visible: true});
    let allchalenges= await tab.$$(".backbone.block-center");
    let allchallengesLink=[];
    for(let i=0;i<allchalenges.length;i++){
        let ChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute("href"); },allchalenges[i]);
        ChallengeLink="https://www.hackerrank.com"+ChallengeLink;
        allchallengesLink.push(ChallengeLink);
    }
    for(let i=0;i<allchallengesLink.length;i++){
        let link=allchallengesLink[i];
        let newtab=await browser.newPage();
        await addModeratorToSingleChallenge(newtab,link);
    }
    let allli= await tab.$$(".pagination li");
    let nextli=await allli[allli.length-2];
    let isdisabled=await tab.evaluate(function(elem){ return elem.classList.contains("disabled");},nextli);
    if(isdisabled){
        return;
    }
    else{
        await nextli.click();
        await tab.waitForTimeout(5000);
        await moderatorAdd(browser,tab);
    }
}
async function addModeratorToSingleChallenge(newtab,link){
   await newtab.goto(link);
   await newtab.waitForTimeout(2000);
   await newtab.click('li[data-tab="moderators"]');
   await newtab.waitForSelector('#moderator',{visible:true});
   await newtab.type('#moderator',"hell");
   await newtab.click('.btn.moderator-save');
   await newtab.click('.save-challenge.btn.btn-green'); 
   await newtab.waitForTimeout(2000);
   await newtab.close();
}