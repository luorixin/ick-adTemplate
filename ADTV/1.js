(function(win, doc) {
  var adData = {
    owidth: 300, // Ad width - original
    oheight: 250, // Ad height - original
    ewidth: 300, // Ad width - expanded
    eheight: 250, // Ad height - expanded
    swfObj: 'http://v02.optimix.asia/video/201508/IC_demo_300_250.swf', // Flash link
    landingPage: 'http://c02.optimix.asia/imageviews?opxCREATIVEID=10152&opxPLACEMENTID=3206&opxCREATIVEASSETID=45556&opxMODE=1&opxURL=http://c.admaster.com.cn/c/a51120,b736487,c1351,i0,m101,h', // Click Url
    type:'swf', // creative type
    dropImg: '', // Thumbnail image link
    status: 'STOPPED', // Auto play or not
    tagId: "bzp-"+(new Date()).getTime(), // Inventory id
container:"iclick_3206"
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
        if(options.type=="swf"){
          htm = '<object  id="bzpObj" type="application/x-shockwave-flash" width="' + swfw + 
          'px" height="' + swfh + 'px" data="' + options.swfObj + '">' +
          '<param name="movie" value="' + options.swfObj + '"/>' +
          '<param name="wmode" value="transparent"/>' +
          '<param name="allowScriptAccess" value="always"/>' +
          '<param name="allowNetworking" value="all"/>' +
          '</object>';
        }else if(options.type == "gif"){
          htm = '<img id="bzpObj" src="'+options.swfObj +'" style="width:'+swfw+'px;height:'+swfh+'px;" />'
        }

        htm+='<a id="bzpMask" onmouseover="buzzPlayer.mover()" href="' + options.landingPage + 
        '" style="width:' + swfw + 'px;height:' + swfh +
        'px;position:absolute;left:0px;top:0px;opacity:0.1;filter: alpha(opacity=0.1); background:#fff;" target="_blank" >' +
        '</a>';
      var ua = navigator.userAgent.toLowerCase();
          var isIE6 = ua.indexOf("msie 6") > -1;
          if(isIE6){
            var sh = doc.documentElement.clientHeight - swfh;
            swp = '_position: absolute; _top: expression(documentElement.scrollTop + '+sh+' + "px"); z-index:1000;';
          }else{
            swp = "position:absolute;top:0;right:0;z-index:1000;";
          }
        var newFO = bzp.createElem("div", options.tagId, "admax_domwrap", swp, htm);
      //var newFO = bzp.createElem("div", options.tagId, "admax_domwrap", "position:fixed;bottom:0;left:0;", htm);
 doc.getElementById(options.container).style.position = "relative";
      doc.getElementById(options.container).appendChild(newFO);

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
  bzp.over = function() {
    var _bzp = window.buzzPlayer;
    if (_bzp.status == "PLAYING") {
      _bzp.dom.height = _bzp.oheight;
      _bzp.dom.width = _bzp.owidth;
      _bzp.mask.style.height = _bzp.oheight + "px";
      _bzp.mask.style.width = _bzp.owidth + "px";
      if(_bzp.drop)_bzp.drop.style.display = "block";
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
    if(_bzp.drop)_bzp.drop.style.display = "none";
   try{_bzp.dom.expand();}catch(e){};
    _bzp.status = "PLAYING";
  };
  bzp.mover = function() {
    var _bzp = window.buzzPlayer;
    if (_bzp.status == "STOPPED") {
      setTimeout(_bzp.play, 500);
    }
  };
})(window, document);