function popUp(winUrl){
    window.open(winUrl,"popUp","width:320,height:480");
}
window.onload=prepareLinks;
function prepareLinks(){
    if(!document.getElementsByTagName) return false;
    var links=document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
    if(links[i].getAttribute("href")=="popup"){
        links[i].onclick=function(){
            popUp(this.getAttribute("href"));
            return;
        }
    }
}
}
