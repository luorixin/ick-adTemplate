(function(win, doc) {
	var adData = {
		owidth: 350, // Ad width - original
		oheight: 320, // Ad height - original
		ewidth: 350, // Ad width - expanded
		eheight: 320, // Ad height - expanded
		swfObj: "./直投_350x320路虎_爱德威.swf", //http://buzzads.b0.upaiyun.com/ads/20150203/201502031245313714.swf", // Flash link
		landingPage: "http://c03.optimix.asia/imageviews?opxCREATIVEID=10195&opxPLACEMENTID=775&opxCREATIVEASSETID=45633&opxMODE=1&opxURL=http://c.admaster.com.cn/c/a57822,b672997,c1575,i0,m101,h", // Click Url
		dwidth: 100, //drop img width
		dheight: 100, //drop img height
		dropImg: 'http://static.buzzads.com/repository/ads/20150623/201506231837416505.jpg', // Thumbnail image link
		closeImg: 'http://static.buzzads.com/repository/ads/20141217/201412172241563360.jpg', // Close button link
		status: 'PLAYING', // Auto play or not
		tagId: "bzp-"+(new Date()).getTime(), // Inventory id
		bzpObj:"bzpObj-"+(new Date()).getTime(),
		type:"ADTV"
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
		creatFlash:function(options) {
          var swfw = options.status == "PLAYING" ? options.ewidth : options.owidth,
            swp,
            swfh = options.status == "PLAYING" ? options.eheight : options.oheight;
          var htm = "";
          if ((options.type==="CRAZY"||options.type==="PIP") && options.dropImg != "") {
            htm += '<div id="dropImg"' + (options.status == "PLAYING" ? ' style="display:none;"' : '') + '>' +
              '<img  src="' + options.dropImg + '" style="position:absolute;top:0;left:0;width:' + options.owidth +
              'px;height:' + options.oheight + 'px;"></div>';
          }
          htm += '<object  id="' +options.bzpObj+ '" type="application/x-shockwave-flash" width="' + swfw +
            'px" height="' + swfh + 'px" data="' + options.swfObj + '">' +
            '<param name="movie" value="' + options.swfObj + '"/>' +
            '<param name="wmode" value="transparent"/>' +
            '<param name="allowScriptAccess" value="always"/>' +
            '<param name="allowNetworking" value="all"/>' +
            '</object>'+
            '<a id="bzpMask"  href="' + options.landingPage +
            '" style="width:' + swfw + 'px;height:' + swfh +
            'px;position:absolute;left:0px;top:0px;opacity:0.1;filter: alpha(opacity=0.1); background:#fff;" target="_blank" ' ;
          if (options.type==="PIP"||options.type==="CRAZY") {
            htm+=' onmouseover="buzzPlayer.mover()" ';
          };
          htm+= '></a>';
          if(options.type==="CRAZY"){
            htm+='<span id="bzpClose" onclick="buzzPlayer.close(event)" style="width:25px;height:25px;cursor:pointer;text-align:center;' +
                'background:url(' + options.closeImg + ') no-repeat center center;' +
                'display:none;right:0px;top:-25px;position:absolute;"></span>';
          }else if (options.type==="EXADTV") {
            htm+='<span id="bzpClose" onclick="buzzPlayer.closeCurrent()" style="width:22px;height:22px;cursor:pointer;text-align:center;' +
                'background:url(' + options.closeImg + ') no-repeat center center;' +
                'display:inline-block;right:0px;top:0px;position:absolute;font-size:20px;color:red"></span>' +
                '<div id="bzpMsg" style="width:200px;height:100px;text-align:center;font-family:microsoft yahei;background:#dadada;position:absolute;top:75px;left:50px;display:none;">' +
                '<p style="line-height:80px;"></p>' +
                '<span style="position:absolute;top:0;right:5px;cursor:pointer;" onclick="buzzPlayer.closeM()">X</span></div>';
          }else if( options.type==="ADTV"){
          	 htm+='<span id="bzpClose" onclick="buzzPlayer.close(event)" style="width:22px;height:22px;cursor:pointer;text-align:center;' +
                'background:url(' + options.closeImg + ') no-repeat center center;' +
                'display:inline-block;right:0px;top:0px;position:absolute;font-size:20px;color:red"></span>' +
                '<div id="bzpMsg" style="width:200px;height:100px;text-align:center;font-family:microsoft yahei;background:#dadada;position:absolute;top:75px;left:50px;display:none;">' +
                '<p style="line-height:80px;"></p>' +
                '<span style="position:absolute;top:0;right:5px;cursor:pointer;" onclick="buzzPlayer.closeM()">X</span></div>';
          }
          if (options.type==="EXADTV") {
            if (options.dropImg.indexOf(".swf") == -1) {
              htm += '<div id="dropImg" onclick="buzzPlayer.play()" style="position:absolute;right:0px;bottom:0px;cursor:pointer;display:none;"><img src="' + options.dropImg + '" style="width:' + options.dwidth + 'px;height:' + options.dheight + 'px;">';
            } else {
              htm += '<object  id="dropSwf' + '" type="application/x-shockwave-flash" width="' + options.ewidth +
                'px" height="' + options.eheight + 'px" data="' + options.dropImg + '" style="display:none;position:absolute;right:0px;bottom:0px;">' +
                '<param name="movie" value="' + options.dropImg + '"/>' +
                '<param name="wmode" value="transparent"/>' +
                '<param name="allowScriptAccess" value="always"/>' +
                '<param name="allowNetworking" value="all"/>' +
                '</object><div id="dropImg" onclick="buzzPlayer.play()" style="width:' + options.dwidth + 'px;height:' + options.dheight + 'px;position:absolute;right:0px;bottom:0px;cursor:pointer;display:none;">';
            }
            htm += '<span id="bzpCloseAll" onclick="buzzPlayer.close(event)" style="width: 12px; height: 12px; cursor: pointer; text-align: center; display: block; right: 0px; top: 0px; position: absolute; font-size: 20px; color: red; background: url(' + options.closeImg + ') 50% 50% no-repeat;"></span></div>';
          }
          var ua = navigator.userAgent.toLowerCase(),
            container;
          var isIE6 = ua.indexOf("msie 6") > -1;
         
          if (isIE6) {
            var sh = doc.documentElement.clientHeight - swfh;
            if (options.type==="CRAZY") {
              sh=sh/2;
            };
            if(options.type==="EXADTV" || options.type==="ADTV"){
              swp = '_position: absolute;_right:0; _top: expression(documentElement.scrollTop + ' + sh + ' + "px"); z-index:999999;';
            }else if (options.type==="CRAZY" || options.type==="PIP") {
               swp = '_position: absolute; _top: expression(documentElement.scrollTop + ' + sh + ' + "px"); z-index:1000;';
            }
          } else {
            if (options.type==="CRAZY") {
              var top = (doc.documentElement.clientHeight - swfh) / 2;
              var right = (doc.documentElement.clientWidth - swfw) / 2;
              swp = "position:fixed;top:" + top + "px;right:" + right + "px;z-index:1000;";
            }else if(options.type==="PIP"){
              swp = "position:fixed;bottom:0;left:0;z-index:9999999";
            }else if (options.type==="EXADTV" || options.type==="ADTV") {
              swp = "position:fixed;bottom:0;right:0;z-index:999999;";
            }
           }
         if (options.container) {
            container = doc.getElementById(options.container)
            container.style.position = "relative";
            if (options.type==="PIP") {
                swp = "position:absolute;top:0;right:0;z-index:1000;";
            }
          } else {
            container = doc.body;
          }
          var newFO = bzp.createElem("div", options.tagId, "admax_domwrap", swp, htm);
          if (options.type==="EXADTV" || options.type==="ADTV") {
            doc.body.appendChild(newFO);
          }else if (options.type==="PIP" || options.type==="CRAZY") {
            container.appendChild(newFO);
          }
          

          bzp.status = options.status;
          bzp.owidth = options.owidth;
          bzp.oheight = options.oheight;
          bzp.ewidth = options.ewidth;
          bzp.eheight = options.eheight;
        }
	};
	bzp.creatFlash(adData);
	bzp.dom = doc.getElementById(adData.bzpObj);
	bzp.mask = doc.getElementById("bzpMask");
	bzp.drop = doc.getElementById("dropImg");
	bzp.clbtn = doc.getElementById("bzpClose");
	bzp.msg = doc.getElementById("bzpMsg");
	bzp.type= adData.type;
	if (adData.dropImg.indexOf(".swf") != -1) {
		bzp.drops = doc.getElementById("dropSwf");
	}
	bzp.admax_domwrap = doc.getElementById(adData.tagId);
	bzp.over = function() {
		var _bzp = window.buzzPlayer;
	    if (_bzp.status == "PLAYING") {
	      if (_bzp.type==="EXADTV" || options.type==="ADTV") {
	          if (adData.ewidth == adData.owidth && adData.eheight == adData.oheight) {
	            bzp.closeCurrent();
	          } else {
	            bzp.dom.height = bzp.oheight;
	            bzp.dom.width = bzp.owidth;
	            bzp.mask.style.height = bzp.oheight;
	            bzp.mask.style.width = bzp.owidth;
	          }
	      }else{
	           _bzp.dom.height = _bzp.oheight;
	          _bzp.dom.width = _bzp.owidth;
	          _bzp.mask.style.height = _bzp.oheight + "px";
	          _bzp.mask.style.width = _bzp.owidth + "px";
	          if (_bzp.drop) _bzp.drop.style.display = "block";
	          if(_bzp.type==='CRAZY'){
	             if (_bzp.clbtn) _bzp.clbtn.style.display = "block";
	            _bzp.admax_domwrap.style.right = "0";
	          }
	      }
	       _bzp.status = "STOPPED";
	    }
	};
	bzp.closeCurrent = function() {
		//bzp.dom.style.display='none';
		bzp.clbtn.style.display = "none";
		bzp.drop.style.display = "block";
		if (bzp.drops) bzp.drops.style.display = "block";
		bzp.dom.style.opacity = "0";
		bzp.dom.height = bzp.owidth;
		bzp.dom.width = bzp.oheight;
		bzp.mask.style.height = bzp.owidth;
		bzp.mask.style.width = bzp.oheight;
		bzp.dom.style.display = 'none';
		try {
			bzp.dom.expand("close");
		} catch (e) {};
		bzp.status = "CLOSED";
	};
	 bzp.play = function() {
	    var _bzp = window.buzzPlayer;
	    _bzp.dom.style.opacity = "1";
	    _bzp.dom.height = _bzp.eheight;
	    _bzp.dom.width = _bzp.ewidth;
	    if(_bzp.type==="EXADTV" || options.type==="ADTV"){
	      _bzp.dom.style.display = 'block';
	      _bzp.clbtn.style.display = "block";
	      if (_bzp.drops) _bzp.drops.style.display = "none";
	    }
	    _bzp.mask.style.height = _bzp.eheight + "px";
	    _bzp.mask.style.width = _bzp.ewidth + "px";

	    if(_bzp.type==="CRAZY"){
	      _bzp.admax_domwrap.style.right = (doc.documentElement.clientWidth - _bzp.ewidth) / 2 + "px";
	      if(_bzp.clbtn) _bzp.clbtn.style.display = "none";
	    }
	     if (_bzp.drop) _bzp.drop.style.display = "none";
	      _bzp.status = "PLAYING";
	    try {
	        if(_bzp.type==="EXADTV" || options.type==="ADTV"){
	            _bzp.dom.expand("play");
	        }else if(_bzp.type==="PIP"||_bzp.type==="CRAZY"){
	            _bzp.dom.expand();
	        }
	      } catch (e) {};  
	  };
	 bzp.mover = function() {
	    var _bzp = window.buzzPlayer;
	    if (_bzp.status == "STOPPED") {
	      setTimeout(_bzp.play, 500);
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
	bzp.close = function(e) {
		var ev = e || window.event;
		if (ev.stopPropagation) {
			ev.stopPropagation();
		} else if (window.event) { //IE
			window.event.cancelBubble = true; //IE
		}
		bzp.admax_domwrap.style.display = 'none';

	};
})(window, document);

document.write('<img src=\'http://v.admaster.com.cn/i/a57822,b672997,c1575,i0,m202,h\' width=\'1px\' height=\'1px\' style=\'display:none\' />\n');
document.write('<img src=\'http://s03.optimix.asia/imageviews?imgtag=1&opxCREATIVEID=10195&opxCREATIVEASSETID=45633&opxPLACEMENTID=775&opxMODE=1\' width=\'1px\' height=\'1px\' style=\'display:none\' />\n');

