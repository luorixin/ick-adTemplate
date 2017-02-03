(function(win, doc) {
  var adData = {
    owidth: 300, // Ad width - original
    oheight: 250, // Ad height - original
    ewidth: 600, // Ad width - expanded
    eheight: 400, // Ad height - expanded
    swfObj: 'http://buzzads.b0.upaiyun.com/ads/20150611/201506111500445618.swf', // Flash link
    landingPage: '@@', // Click Url
    dropImg: '', // Thumbnail image link
    status: 'PLAYING', // Auto play or not
    tagId: "bzp-"+(new Date()).getTime(), // Inventory id
    container: "container-"+(new Date()).getTime() //版位 id
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
      var swfw = options.status == "PLAYING" ? options.ewidth : options.owidth,swp,
            swfh = options.status == "PLAYING" ? options.eheight : options.oheight;
      var htm = "";
        if(options.dropImg !=""){
          htm +='<div id="dropImg"' + (options.status == "PLAYING" ? ' style="display:none;"' : '') + '>' +
          '<img  src="' + options.dropImg + '" style="position:absolute;top:0;left:0;width:' + options.owidth +
          'px;height:' + options.oheight + 'px;"></div>' ; 
        }
        htm+='<object  id="bzpObj' + '" type="application/x-shockwave-flash" width="' + swfw + 
        'px" height="' + swfh + 'px" data="' + options.swfObj + '">' +
        '<param name="movie" value="' + options.swfObj + '"/>' +
        '<param name="wmode" value="transparent"/>' +
        '<param name="allowScriptAccess" value="always"/>' +
        '<param name="allowNetworking" value="all"/>' +
        '</object><a id="bzpMask" onmouseover="buzzPlayer.mover()" href="' + options.landingPage + 
        '" style="width:' + swfw + 'px;height:' + swfh +
        'px;position:absolute;left:0px;top:0px;opacity:0.1;filter: alpha(opacity=0.1); background:#fff;" target="_blank" >' +
        '</a>';
      var ua = navigator.userAgent.toLowerCase(),
           container;
      var isIE6 = ua.indexOf("msie 6") > -1;
      doc.write("<div id = '"+options.container+"'></div>");
      container = doc.getElementById(options.container)
      container.style.position = "relative";
      swp = "position:absolute;top:0;left:0;z-index:1000;";
      
      var newFO = bzp.createElem("div", options.tagId, "admax_domwrap", swp, htm);
      //var newFO = bzp.createElem("div", options.tagId, "admax_domwrap", "position:fixed;bottom:0;left:0;", htm);
      container.appendChild(newFO);

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
  bzp.iFrameId="";
  if(window!=window.top){
      var iFrame = window.parent.document.getElementsByTagName('iframe');
      var i= iFrame.length;
      var _url = location.href;
      while(i--){
        if(iFrame[i].src===_url){
          bzp.iFrameId = iFrame[i].id;
          bzp.$iFrame = window.parent.document.getElementById(bzp.iFrameId);
          bzp.iFramewidth = bzp.$iFrame.style.width;
          bzp.iFrameheight = bzp.$iFrame.style.height;
          bzp.iFrameml = bzp.$iFrame.style.marginLeft;
          break;
        }
      }
    }
  bzp.over = function() {
    var _bzp = window.buzzPlayer;
    if (_bzp.status == "PLAYING") {
      _bzp.dom.height = _bzp.oheight;
      _bzp.dom.width = _bzp.owidth;
      _bzp.mask.style.height = _bzp.oheight + "px";
      _bzp.mask.style.width = _bzp.owidth + "px";
      if(bzp.iFrameId){
      _bzp.$iFrame.style.width = _bzp.iFramewidth;
      _bzp.$iFrame.style.height = _bzp.iFrameheight;
      _bzp.$iFrame.style.marginLeft = _bzp.iFrameml;
     }
      if(_bzp.drop) _bzp.drop.style.display = "block";
      _bzp.status = "STOPPED";
    }
  };
  bzp.play = function() {
    var _bzp = window.buzzPlayer;
    _bzp.dom.style.opacity = "1";
    _bzp.dom.height = _bzp.eheight;
    _bzp.dom.width = _bzp.ewidth;
    _bzp.mask.style.height = _bzp.eheight + "px";
    _bzp.mask.style.width = _bzp.ewidth + "px";
   if(bzp.iFrameId){
    _bzp.$iFrame.style.width = _bzp.ewidth + "px";
    _bzp.$iFrame.style.height = _bzp.eheight + "px";
    _bzp.$iFrame.style.marginLeft = _bzp.owidth-_bzp.ewidth + "px";
   }
    if(_bzp.drop) _bzp.drop.style.display = "none";
   try{_bzp.dom.expand();}catch(e){};
    _bzp.status = "PLAYING";
  };
  bzp.mover = function() {
    var _bzp = window.buzzPlayer;
    if (_bzp.status == "STOPPED") {
      setTimeout(_bzp.play, 500);
    }
  };
  setTimeout(bzp.over, 3000);
})(window, document);