function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload !='function'){
        window.onload=func;
    }
    else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }
    else{
        parent.insertBefore(newElement,targetElement.nextSibing);
    }
}

function addClass(element,value){
    if(!element.className){
        element.className=value;
    }
    else{
        newClassName=element.className;
        newClassName+=" ";
        newClassName+= value;

    }
}


function highlightPage(href){
    
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var headers=document.getElementsByTagName('header');
    if(headers.length==0) return false;
    var navs=headers[0].getElementsByTagName('nav');
    if(navs.length==0) return false;
    var links=navs[0].getElementsByTagName("a");
    if(links.length==0) return false;
    var linkurl;
    for(var i=0;i<links.length;i++){
        linkurl=links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl)!=-1){
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);

function moveElement(elementID,final_x,final_y,interval){
    if(!document.getElementById) return false;
    var elem=document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left="0px";
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    var dist=0;
    if(xpos==final_x&&ypos==final_y){
        return true;
    }
    if(xpos<final_x){
        dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+dist;
    }
    if(xpos>final_x){
        dist=Math.ceil((xpos-final_x)/10);
        xpos=xpos-dist;
    }
    if(ypos<final_y){
        dist=Math.ceil((final_y-ypos)/10);
        ypos=ypos+dist;
    }
    if(ypos>final_y){
        dist=Math.ceil((ypos-final_y)/10);
        ypos=ypos-dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}
//alert();

function prepareSlideshow()
{
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("intro")) return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview=document.createElement("img");
    preview.setAttribute("src","images/slideshow.png");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);

    var links=document.getElementsByTagName("a");
    var destination;
    for(var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            destination=this.getAttribute("href");
            if(destination.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if(destination.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,5);
            }
            if(destination.indexOf("photos.html")!=-1){
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,5);
            }
            if(destination.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,5)
            }
        }
    }
}
addLoadEvent(prepareSlideshow);
//alert();
function showSection(id){
    var sections=document.getElementsByTagName("section");
    for(var i=0;i<sections.length;i++){
        if(sections[i].getAttribute("id")!=id){
            sections[i].style.display="none";
        }
        else{
            sections[i].style.display="block";
        }
    }
}

function prepareInternalnav(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    var articles=document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var nav=navs[0];
    var links=nav.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display= "none";
        links[i].destination=sectionId;
        links[i].onclick=function(){
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);

function showPic(whichpic){
    if(!document.getElementById("placeholder")) return false;
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    // if(placeholder.nodeName!="IMG") return false;
    placeholder.setAttribute("src",source);
    if(document.getElementById("description")){
        if(whichpic.getAttribute("title")){
            var text=whichpic.getAttribute("title");
        }
        else{
            var text="";
        }
        var description=document.getElementById("description");
        if(description.firstChild.nodeType==3){
            description.firstChild.nodeValue=text;
        }
    }
    return false;   
}


function preparePlaceholder(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var placeholder=document.createElement("img");
    var description=document.createElement("p");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.jpg");
    placeholder.setAttribute("alt","my image gallery");
    placeholder.setAttribute("height","300px");
    placeholder.setAttribute("width","400px");
    // placeholder.style.width=400;
    description.setAttribute("id","description");
    var descText=document.createTextNode("Choose an image");
    description.appendChild(descText);
    var gallery=document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}
function prepareGallery(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            return showPic(this);
        }
       /* links[i].onkeypress=links[i].onclick;键盘事件*/
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

function stripeTables(){
    if (!document.getElementsByTagName) return false;
    var tables=document.getElementsByTagName("table");
    var odd,rows;
    for(var i=0;i<tables.length;i++){
        odd=false;
        rows=tables[i].getElementsByTagName("tr");
        for(var j=0;j<rows.length;j++){
            if(odd==true){
                addClass(rows[j],"odd");
            //rows[j].style.backgroundColor="#ffc"; 
                odd=false;
            }
            else{
                //addClass(rows[j],"aaa");
                odd=true;
            }
        }
    }
}
addLoadEvent(stripeTables);
function highlightRows(){//奇数行不突出显示？
    if(!document.getElementsByTagName) return false;
    var rows=document.getElementsByTagName("tr");
    for(var i=0;i<rows.length;i++){
        rows[i].oldClasssName=rows[i].className;
        rows[i].onmouseover=function(){
            addClass(this,"highlight")
             //this.style.fontWeight="bold";
        }
        rows[i].onmouseout=function(){
            this.className=this.oldClasssName;
             //this.style.fontWeight="normal";
        }
    }
}
addLoadEvent(highlightRows);


function displayAbbrviations(){
    //对象兼容性检查
    if(!document.getElementsByTagName) return false;
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    //取得文档里所有abbr对象标签（缩略词）
    var abbrviations=document.getElementsByTagName("abbr");
    if(abbrviations.length<1) return false;
    var defs=new Array();
    //遍历这些缩略词
    for(var i=0;i<abbrviations.length;i++){
        if(abbrviations[i].childNodes.length<1) continue;
        var definition=abbrviations[i].getAttribute("title");
        var key=abbrviations[i].lastChild.nodeValue;
        defs[key]=definition;
    }
    //创建定义列表
    var dlist=document.createElement("dl");
    //遍历定义列表
    for(key in defs){
        var definition=defs[key];
        //创建定义标题
        var dtitle=document.createElement("dt");
        var dtitle_text=document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //创建定义描述
        var ddesc=document.createElement("dd");
        var ddesc_text=document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        //将定义标题和描述插入定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if(dlist.childNodes.length<1) return false;
    //创建标题
    var header=document.createElement("h3");
    var header_text=document.createTextNode("Abbrviations");
    header.appendChild(header_text);
    //将标题和定义列表插入文档（页面主体）
    var articles=document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var container=articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}
addLoadEvent(displayAbbrviations);

function getHTTPObject(){
    if(typeof XMLHttpRequest=="undefined")
    XMLHttpRequest=function(){
        try{
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    }catch(e){}
    try{
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    }catch(e){}
    try{
        return new ActiveXObject("Msxml2.XMLHTTP");
    }catch(e){}
    return false;
  }
  return new XMLHttpRequest();
}

function dispalyAjaxLoading(element){

    while(element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","images/loading.gif");
    content.setAttribute("alt","loading");
    element.appendChild(content);
}

function submitFormWithAjax(whichform,thetarget){
    var request=getHTTPObject();
    if(!request){
        return false;
    }
    dispalyAjaxLoading(thetarget);
    var dataParts=[];
    var element;
    for(var i=0;i<whichform.element.length;i++){
        element=whichform.element[i];
        dataParts[i]=element.name+'='+encodeURIComponent(element.value);
    }
    var data=dataParts.join('&');
    request.open('POST',whichform.getAttribute("action"),true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.onreadystatechange=function(){
        if(request.readyState==4){
            if(request.status==200||request.status==0){
                var matches=request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if(matches.length>0){
                    thetarget.innerHTML=matches[1];
                }
                else{
                    thetarget.innerHTML='<p> Oops,there was an error, Sorry.</p>';
                }
            }
            else{
                thetarget.innerHTML='<p>'+request.statusText+'</p>';
            }
        }
    };
    request.send(data);
    return true;
}

function prepareForms(){
    for(var i=0;i<document.forms.length;i++){
        var thisform=document.forms[i];
        resetFields(thisform);
        thisform.onsubmit=function(){
            if(!validateForm(this)) return false;
            var article=document.getElementsByTagName('article')[0];
            if(submitFormWithAjax(this,article)) return false;
            return true;
        }
    }
}

addLoadEvent(getHTTPObject);
addLoadEvent(dispalyAjaxLoading);
addLoadEvent(submitFormWithAjax);
addLoadEvent(prepareForms);