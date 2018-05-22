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
    var header=document.createElement("h2");
    var header_text=document.createTextNode("Abbrviations");
    header.appendChild(header_text);
    //将标题和定义列表插入文档（页面主体）
    document.body.appendChild(header);
    document.body.appendChild(dlist);
}
addLoadEvent(displayAbbrviations);