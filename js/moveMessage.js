function moveMessage(){
    if(!document.getElementById) return false;
    var elem=document.getElementById("message");
    //elem.style.left="200px";
    var xpos=parseInt(elem.style.top);
    var ypos=parseInt(elem.style.left);
    if(xpos==100&&ypos==500){
        return true;
    }
    if(xpos>100){
        xpos--;
    }
    if(xpos<100){
        xpos++;
    }
    if(ypos<500){
        ypos++;
    }
    if(ypos>500){
        ypos--;
    }
    elem.style.left=ypos+"px";
    elem.style.top=xpos+"px";
    movement=setTimeout("moveMessage()",10);
}
addLoadEvent(moveMessage);