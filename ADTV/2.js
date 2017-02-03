(function(win, doc) {
  var adData = {
    owidth: 300, // Ad width - original
    oheight: 250, // Ad height - original
    ewidth: 300, // Ad width - expanded
    eheight: 250, // Ad height - expanded
    swfObj: 'http://a03.optimix.asia/2015/8/19/e6debab5c37fd3bf12fa68b193cf7218841336.swf', // Flash link
    landingPage: 'http://c02.optimix.asia/imageviews?opxCREATIVEID=10153&opxPLACEMENTID=3207&opxInterest=&opxGender=&opxAge=&opxTdsid=&opxCREATIVEASSETID=45557&opxMODE=1&opxURL=http://c.admaster.com.cn/c/a51120,b736488,c1351,i0,m101,h', // Click Url
    dropImg: 'http://a03.optimix.asia/2015/8/19/e6debab5c37fd3bf12fa68b193cf7218367138.swf', // Thumbnail image link
    closeImg: 'http://static.buzzads.com/repository/ads/20141217/201412172241563360.jpg', // Close button link
    status: 'PLAYING', // Auto play or not
    tagId: "bzp-"+(new Date()).getTime() // Inventory id
  };
  var bzp = win.buzzPlayer = {
    createElem: function(eTag, eId, eClass, eStyle, eText, eUrl) {
      var newEle = doc.createElement(eTag);
      if (eTag == "a") {
        newEle.href = eUrl || "javascript:;";
        newEle.target = "_blank";
      }
      if (eId) newEle.id = eId;
      if (eClass) newEle.className = eClass;
      if (eStyle) newEle.style.cssText = eStyle;
      if (eText) newEle.innerHTML = eText;
      return newEle;
    },
    creatFlash: function(options) {
      var swfw = options.status == "PLAYING" ?  options.owidth:options.ewidth,
        swfh = options.status == "PLAYING" ? options.oheight : options.eheight;
      var htm = '<object  id="bzpObj' + '" type="application/x-shockwave-flash" width="' + swfw + 
        'px" height="' + swfh + 'px" data="' + options.swfObj + '">' +
        '<param name="movie" value="' + options.swfObj + '"/>' +
        '<param name="wmode" value="transparent"/>' +
        '<param name="allowScriptAccess" value="always"/>' +
        '<param name="allowNetworking" value="all"/>' +
                '</object>' + 
                '<a id="bzpMask" href="' + options.landingPage + 
        '" style="width:' + swfw + 'px;height:' + swfh +
        'px;position:absolute;left:0px;top:0px;opacity:0.1;filter: alpha(opacity=0.1); background:#fff;" target="_blank" >' +
        '</a>' +
        '<span id="bzpClose" onclick="buzzPlayer.closeAll(event)" style="width:22px;height:22px;cursor:pointer;text-align:center;' +
        'background:url(' + options.closeImg + ') no-repeat center center;' +
        'display:inline-block;right:0px;top:0px;position:absolute;font-size:20px;color:red"></span>' +
                '<div id="bzpMsg" style="width:200px;height:100px;text-align:center;font-family:microsoft yahei;background:#dadada;position:absolute;top:75px;left:50px;display:none;">' + 
                '<p style="line-height:80px;"></p>' +
                '<span style="position:absolute;top:0;right:5px;cursor:pointer;" onclick="buzzPlayer.closeM()">X</span></div>' ;
        if (options.dropImg.indexOf(".swf")==-1) {
          htm +='<div id="dropImg" onclick="buzzPlayer.play()" style="position:absolute;right:0px;bottom:0px;cursor:pointer;display:none;width:'+options.ewidth+'px;height:'+options.eheight+'px;"><img src="' + options.dropImg + '" style="width:100%;height:100%">';
        }else{
          htm +='<object  id="dropSwf' + '" type="application/x-shockwave-flash" width="' + options.ewidth + 
          'px" height="' + options.eheight + 'px" data="' + options.dropImg + '" style="display:none;position:absolute;right:0px;bottom:0px;">' +
          '<param name="movie" value="' + options.dropImg + '"/>' +
          '<param name="wmode" value="transparent"/>' +
          '<param name="allowScriptAccess" value="always"/>' +
          '<param name="allowNetworking" value="all"/>' +
                  '</object><div id="dropImg" onclick="buzzPlayer.play()" style="width:'+options.ewidth+'px;height:'+options.eheight+'px;position:absolute;right:0px;bottom:0px;cursor:pointer;display:none;opacity:0.1;filter: alpha(opacity=0.1); background:#fff;">';  
        }
        htm +='<span id="bzpCloseAll" onclick="buzzPlayer.closeAll(event)" style="width: 12px; height: 12px; cursor: pointer; text-align: center; display: block; right: 0px; top: 0px; position: absolute; font-size: 20px; color: red; background: url('+options.closeImg+') 50% 50% no-repeat;"></span></div>';  
      var ua = navigator.userAgent.toLowerCase(),swp;
          var isIE6 = ua.indexOf("msie 6") > -1;
          if(isIE6){
            var sh = doc.documentElement.clientHeight - swfh;
            swp = '_position: absolute;_right:0; _top: expression(documentElement.scrollTop + '+sh+' + "px"); z-index:99999999;';
          }else{
            swp = "position:fixed;bottom:0;right:0;z-index:99999999;";
          } 
      var newFO = bzp.createElem("div", options.tagId, "admax_domwrap", swp, htm);
      doc.body.appendChild(newFO);

      bzp.status = options.status;
      bzp.owidth = options.owidth;
      bzp.oheight = options.oheight;
      bzp.ewidth = options.ewidth;
      bzp.eheight = options.eheight;
    }
  };
  bzp.creatFlash(adData);
  bzp.dom = doc.getElementById("bzpObj");
  bzp.mask = doc.getElementById("bzpMask");
  bzp.drop = doc.getElementById("dropImg");
  bzp.cbtn = doc.getElementById("bzpClose");
    bzp.msg = doc.getElementById("bzpMsg");
    if(adData.dropImg.indexOf(".swf")!=-1 ){
      bzp.drops = doc.getElementById("dropSwf");
    }
    bzp.admax_domwrap=doc.getElementById(adData.tagId); 
  bzp.over = function() {
    if (bzp.status == "PLAYING") {
      bzp.close();
      bzp.status = "STOPPED";
    }
  };
  bzp.close = function() {
    //bzp.dom.style.display='none';
    bzp.cbtn.style.display = "none";
    bzp.drop.style.display = "block";
    if(bzp.drops)bzp.drops.style.display = "block";
    bzp.dom.style.opacity = "0";
    bzp.dom.height = bzp.owidth;
    bzp.dom.width = bzp.oheight;
    bzp.mask.style.height = bzp.owidth;
    bzp.mask.style.width = bzp.oheight;
    bzp.dom.style.display='none';
    try{bzp.dom.expand("close");}catch(e){};
    bzp.status = "CLOSED";
  };
  bzp.play = function() {
    bzp.dom.style.opacity = "1";
    bzp.dom.height = bzp.oheight;
    bzp.dom.width = bzp.owidth;
    bzp.dom.style.display='block';
    bzp.mask.style.height = bzp.oheight + "px";
    bzp.mask.style.width = bzp.owidth + "px";
    bzp.cbtn.style.display = "block";
    bzp.drop.style.display = "none";
    if(bzp.drops)bzp.drops.style.display = "none";
    bzp.status = "PLAYING";
    try{bzp.dom.expand("play");}catch(e){};
  };
  bzp.mover = function() {
    if (bzp.status == "STOPPED") {
      setTimeout(bzp.play, 500);
    }
  };
  bzp.message = function(msg) {
        bzp.msg.childNodes[0].innerHTML = msg;
        bzp.msg.style.display = "block";
  };
  bzp.closeM = function() {
    bzp.msg.childNodes[0].innerHTML = "";
        bzp.msg.style.display = "none";
  };
  bzp.closeAll = function(e) {
    var ev = e || window.event;
        if (ev.stopPropagation) {
            ev.stopPropagation();
        }
        else if (window.event) {//IE
            window.event.cancelBubble = true;//IE
        }
    bzp.admax_domwrap.style.display='none';
    
  };
})(window, document);