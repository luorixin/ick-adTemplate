(function(win, doc) {
	var loadCount = 0,
		overCount = 0;
	var rb = win.roadBlock = {
		rbInit: function(option) {
			var self = this;
			self.adDate = {
				tadConId: "1264", //顶部版位ID
				radConId: "1266", //右边版位ID
				tadId: 5000, //顶部 Creative ID
				radId: 5111, //右边 Creative ID
				tadWidth: 960, //顶部 Creative width
				tadHeight: 90, //顶部 Creative height
				radWidth: 300, //右边 Creative width
				radHeight: 250, //右边 Creative height
				tadUrl: 'http://buzzads.b0.upaiyun.com/ads/20150624/201506241749128128.swf', //顶部 Creative Url
				radUrl: 'http://buzzads.b0.upaiyun.com/ads/20150624/201506241747173661.swf', //右边 Creative Url
				cps: "right", //change position
				ewidth: 1000, //change width
				eheight: 600, //change height
				landingPage: "http://wwww.baidu.com", //landing page url
				impresUrl: "http://www.baidu.com" //impressions url 
			};
			self.init();
		},
		option: {
			radDom: "",
			tadDom: "",
			radConDom: "",
			tadConDom: "",
			radMaskDom: "",
			tadMaskDom: "",
			tadLoadDom: "",
			radLoadDom: "",
			radReplayDom: "",
			tadReplayDom: ""
		},
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
		isIE: function() {
			if ((navigator.userAgent.indexOf('MSIE') >= 0)) {
				return true;
			}
		},
		creatFlash: function(d) {
			var self = this,
				swp;
			var htm = '<div id="bzpWarp_' + d.id + '" style="width:100%; height:100%">' +
				'<div id="bzpLoad_' + d.id + '" style="position: absolute; top: 50%; margin-top: -12px; left: 50%; margin-left: -12px;">' +
				'<img src="http://static.buzzads.com/repository/ads/20150416/201504161257208039.gif"></div>' +
				'<object  id="bzpObj_' + d.id + '" type="application/x-shockwave-flash" width="100%" height="100%" data="' + d.url + '" style="filter:alpha(opacity=0);opacity:0;">' +
				'<param name="movie" value="' + d.url + '"/>' +
				'<param name="wmode" value="transparent"/>' +
				'<param name="allowScriptAccess" value="always"/>' +
				'<param name="allowNetworking" value="all"/>' +
				'</object>' +
				'<a id="bzpMask_' + d.id + '" href="' + d.landingPage +
				'" style="display:block;width:100%;height:100%' +
				';position:absolute;left:0px;top:0px;opacity:0.1;filter: alpha(opacity=0.1);background:#fff;" target="_blank" >' +
				'</a>' +
				'<span  id="bzpReplay_' + d.id + '" style="cursor:pointer;text-align:right;display:none;width:50px;height:20px;position:absolute;top:10px;right:10px;">重播</span>' +
				'</div>'
			swp = "position:relative;width:" + d.width + "px;height:" + d.height + "px;bottom:0px;right:0px;";
			var newFO = self.createElem("div", "bzpCon_" + d.id, "admax_domwrap", swp, htm);
			doc.getElementById(d.container).appendChild(newFO);
			return doc.getElementById("bzpObj_" + d.id);
		},
		init: function() {
			var self = this;
			//初始化top
			this.option.tadDom = this.creatFlash({
				width: this.adDate.tadWidth,
				height: this.adDate.tadHeight,
				landingPage: this.adDate.landingPage,
				id: this.adDate.tadId,
				container: this.adDate.tadConId,
				url: this.adDate.tadUrl
			});
			//初始化right
			this.option.radDom = this.creatFlash({
				width: this.adDate.radWidth,
				height: this.adDate.radHeight,
				landingPage: this.adDate.landingPage,
				id: this.adDate.radId,
				container: this.adDate.radConId,
				url: this.adDate.radUrl
			});
			this.option.radConDom = doc.getElementById("bzpCon_" + this.adDate.radId);
			this.option.tadConDom = doc.getElementById("bzpCon_" + this.adDate.tadId);
			this.option.tadMaskDom = doc.getElementById("bzpMask_" + this.adDate.tadId);
			this.option.radMaskDom = doc.getElementById("bzpMask_" + this.adDate.radId);
			this.option.radWarpDom = doc.getElementById("bzpWarp_" + this.adDate.radId);
			this.option.tadWarpDom = doc.getElementById("bzpWarp_" + this.adDate.tadId);
			this.option.radLoadDom = doc.getElementById("bzpLoad_" + this.adDate.radId);
			this.option.tadLoadDom = doc.getElementById("bzpLoad_" + this.adDate.tadId);
			this.option.tadReplayDom = doc.getElementById("bzpReplay_" + this.adDate.tadId);
			this.option.radReplayDom = doc.getElementById("bzpReplay_" + this.adDate.radId);
			//show event
			this.cimg(this.adDate.impresUrl);
			//add event
			this.option.tadReplayDom.onclick = function() {
				self.swf_replay();
			}
			this.option.radReplayDom.onclick = function() {
				self.swf_replay();
			}

		},
		cimg: function(url) {
			var self = this;
			var img = self.createElem("img", "", "", "width:0px;height0px;");
			img.src = url;
			return img;
		},
		change: function(da) {
			if (this.adDate.cps == "right") {
				this.option.radDom.style.width = da.width + "px";
				this.option.radDom.style.height = da.height + "px";
				var css = "height:" + da.height + "px;width:" + da.width + "px;position:absolute;left:0px;top:0px;text-align: right;margin-left:" + (this.adDate.radWidth - da.width) + "px;margin-top:" + (da.over ? 0 : (this.adDate.radHeight - da.height + 250)) + "px";
				this.option.radWarpDom.style.cssText = css;
			} else {
				this.option.tadDom.style.width = da.width + "px";
				this.option.tadDom.style.height = da.height + "px";
				this.option.tadWarpDom.style.cssText = "height:" + da.height + "px;width:" + da.width + "px;position:absolute;left:0px;top:0px;text-align: right;margin-left:" + (this.adDate.tadWidth - da.width) + "px;margin-top:" + (this.adDate.tadHeight - da.height) + "px";
			}
		},
		swf_init: function() {
			loadCount++;
			var self = this;
			if (loadCount >= 2) {
				var interval = setInterval(function() {
					if (self.option.tadDom.start && self.option.radDom.start) {
						self.option.tadWarpDom.removeChild(self.option.tadLoadDom);
						self.option.radWarpDom.removeChild(self.option.radLoadDom);
						if (self.isIE()) {
							self.option.radDom.style.cssText = "";
							self.option.tadDom.style.cssText = "";
						} else {
							self.option.tadDom.style.cssText = "opacity:1";
							self.option.radDom.style.cssText = "opacity:1";
						}
						self.option.tadDom.start();
						self.option.radDom.start();
						clearInterval(interval);
					}
				}, 1000);
			}
		},
		swf_change: function() {
			var self = this,
				da = {
					width: self.adDate.ewidth,
					height: self.adDate.eheight
				};
			self.change(da);
		},
		swf_showReplay: function(s) {
			overCount++;
			if (overCount >= 2) {
				this.option.tadReplayDom.style.display = s;
				this.option.radReplayDom.style.display = s;
			}
		},
		swf_over: function() {
			var self = this,
				da = {
					width: self.adDate.cps == "right" ? self.adDate.radWidth : self.adDate.tadWidth,
					height: self.adDate.cps == "right" ? self.adDate.radHeight : self.adDate.tadHeight,
					over: true
				};
			self.change(da);
		},
		swf_replay: function() {
			this.option.tadDom.start();
			this.option.radDom.start();
			this.swf_showReplay("none");
		}
	}
})(window, document);
(function() {
	window.roadBlock.rbInit();
})();