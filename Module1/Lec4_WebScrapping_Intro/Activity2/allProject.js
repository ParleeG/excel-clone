const cheerio = require("cheerio");
const request=require("request");

function getAllProjects(link){
    request(link,function(err,req,data){
    processData(data);
})
}
function processData(html){
    let mydocument=cheerio.load(html);
    let allProjects=mydocument(".col-md-8 .border");
    for(let i=1;i<=10;i++){
        let nameOfProject= mydocument(allProjects[i]).find("a").text().trim();
        console.log(nameOfProject);
    }
}

module.exports=getAllProjects;