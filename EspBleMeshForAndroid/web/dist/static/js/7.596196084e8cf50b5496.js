webpackJsonp([7],{XZwk:function(e,t){},fsXb:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("mvHQ"),i=s.n(a),n=s("Y54T"),o=s("yojn"),c=s.n(o),r=s("Au9i"),l={data:function(){return{deviceInfo:this.$store.state.deviceInfo,upgradeBinList:[],isSelectedVersion:"",isSelectedBin:{},upgrade:!1,upgradeValue:0,upgradeSuccess:!1,upgradeFailure:!1,timeCost:"00:00:00",timeCostId:"",scheduleId:""}},created:function(){var e=this;window.getOtaBinsCallback=function(t){e.getOtaBinsCallback(t)},window.onBackPressed=function(){e.onBackPressed()},window.otaCallback=function(t){e.otaCallback(t)},window.onActivityPause=function(){e.onActivityPause()},window.onActivityResume=function(){e.onActivityResume()},window.getWiFiInfoCallback=function(t){e.getWiFiInfoCallback(t)}},methods:{hide:function(){this.$router.goBack()},onActivityPause:function(){console.log("程序进入后台")},onActivityResume:function(){console.log("程序返回前台"),EspBleMesh.getWiFiInfo()},getWiFiInfoCallback:function(e){var t={};e=n.a.base64().decode(e),console.log("FBY OTA getWiFiInfoCallback"+e),e=JSON.parse(e),n.a._isEmpty(e)||(this.$store.state.otawifiName===e.ssid?(t[c.a.KEY_NAME]=this.isSelectedBin.name,t[c.a.KEY_COMPANY_ID]=c.a.VALUE_COMPANY_ID,t[c.a.KEY_BIN_ID]=this.isSelectedBin.binId,t[c.a.KEY_VERSION_CODE]=this.isSelectedBin.versionCode,console.log("FBY OTA 开始升级 sendOTAStartData"+i()(t)),EspBleMesh.startOta(i()(t))):n.a.messageRemind(this.$t("wificonnecterror")))},onBackPressed:function(){this.$router.goBack()},nodeUpgrade:function(){var e={};n.a._isEmpty(this.isSelectedBin)?n.a.messageRemind(this.$t("updatefile")):(e[c.a.KEY_DST_ADDRESS]=this.deviceInfo.address,e[c.a.KEY_COMPANY_ID]=c.a.VALUE_COMPANY_ID,e[c.a.KEY_BIN_ID]=this.isSelectedBin.binId,e[c.a.KEY_VERSION_CODE]=this.isSelectedBin.versionCode,e[c.a.KEY_CLEAR_FLASK]=!1,console.log("FBY OTA 开始升级 sendOTAMeshData"+i()(e)),EspBleMesh.sendOtaMeshMessage(i()(e)))},setSchedule:function(){var e=this;e.scheduleId=setInterval(function(){console.log(e.upgradeValue),e.upgradeValue>=5||e.upgradeFailure?(clearInterval(e.scheduleId),e.stopTime(),e.upgradeFailure=!0):(e.upgradeValue+=2,document.getElementById("update-progress-vule").innerText=e.upgradeValue+"%",document.getElementById("update-progress-view").style.width=e.upgradeValue+"%")},2e3)},hideUpgrade:function(){this.upgradeFailure&&(this.upgrade=!1,this.upgradeFailure=!1,clearInterval(this.scheduleId))},stopUpgrade:function(){this.upgrade=!1,this.upgradeFailure=!1,clearInterval(this.scheduleId),this.stopTime()},getBinName:function(){return n.a._isEmpty(this.isSelectedBin)?"":this.isSelectedBin.name},retrySave:function(){this.upgrade=!1,this.upgradeFailure=!1,clearInterval(this.scheduleId)},otaReboot:function(){this.upgrade=!1,this.upgradeFailure=!1,clearInterval(this.scheduleId)},getTime:function(){var e=this;e.timeCost="00:00:00";var t=0;e.timeCostId=setInterval(function(){if(++t<60)e.timeCost="00:00:"+e.getSecond(t);else if(t<3600){var s=(t/60).toFixed(0),a=t%60;e.timeCost="00:"+e.getMinute(s)+":"+e.getSecond(a)}else{var i=(t/3600).toFixed(0);s=(t%3600/60).toFixed(0),a=t%60;e.timeCost=e.getHour(i)+":"+e.getMinute(s)+":"+e.getSecond(a)}},1e3)},getSecond:function(e){var t=0;return e<10?t="0"+e:e<60&&(t=e),t},getMinute:function(e){var t=0;return e<10?t="0"+e:e<60&&(t=e),t},getHour:function(e){return e<10?"0"+e:e},stopTime:function(){clearInterval(this.timeCostId)},switchUpgradeBin:function(e){console.log("选择升级文件版本： "+e.name),this.isSelectedVersion!==e.name&&(this.isSelectedVersion=e.name,this.isSelectedBin=e)},isUpgradeSelected:function(e){var t=!1;return this.isSelectedVersion===e&&(t=!0),t},getOtaBinsCallback:function(e){e=n.a.base64().decode(e),console.log("FBY OTA getOtaBinsCallback"+e),e=JSON.parse(e),n.a._isEmpty(e)||(this.upgradeBinList=e)},otaCallback:function(e){e=n.a.base64().decode(e),console.log("FBY OTA otaCallback"+e),e=JSON.parse(e),n.a._isEmpty(e)||(e.status===c.a.OTA_STATUS_MESSAGE_NOT_NEED?n.a.messageRemind(this.$t("notneedupdate")):e.status===c.a.OTA_STATUS_MESSAGE_TIMEOUT||(e.status===c.a.OTA_STATUS_MESSAGE_READY?(console.log("链接Wi-Fi"),this.$store.commit("setotawifiName",e.ssid),Object(r.MessageBox)({$type:"alert",title:this.$t("switchnetwork"),message:"SSID: "+e.ssid+"\n PASSWORD: "+e.password,showConfirmButton:!1,closeOnClickModal:!1,showCancelButton:!0,cancelButtonText:this.$t("settings")}).then(function(e){console.log("点击设置按钮"),EspBleMesh.gotoSystemSettings("wifi")})):e.status===c.a.OTA_STATUS_COMPLETE?console.log("升级完成"):e.status===c.a.OTA_STATUS_CONNECTED?console.log("建立升级链接"):e.status===c.a.OTA_STATUS_PROGRESS&&console.log("升级中"+e.progress)))}},mounted:function(){console.log("mounted 走了 deviceInfo"+i()(this.deviceInfo)),EspBleMesh.getOtaBins()},activated:function(){console.log("activated 走了")}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content-box"},[s("div",{staticClass:"title-info"},[s("h4",{staticClass:"app-title"},[s("span",{on:{click:e.hide}},[s("i",{staticClass:"icon-left back"})]),e._v(e._s(e.deviceInfo.name))]),e._v(" "),s("span",{staticClass:"right-top-text",on:{click:function(t){return e.nodeUpgrade()}}},[e._v(e._s(e.$t("upgrade")))])]),e._v(" "),s("div",{staticClass:"content-info flex-wrapper upgrade-base"},[s("div",{staticClass:"overflow-touch"},e._l(e.upgradeBinList,function(t){return s("div",{key:t.name,staticClass:"item",on:{click:function(s){return e.switchUpgradeBin(t)}}},[s("div",{staticClass:"item-name"},[s("span",[e._v(e._s(t.name))]),e._v(" "),s("span",{staticClass:"desc"},[e._v(e._s(t.versionName))])]),e._v(" "),s("div",{staticClass:"item-power-small"},[s("span",{staticClass:"span-radio",class:{active:e.isUpgradeSelected(t.name)},attrs:{"data-value":t.name}},[s("span")])])])}),0)]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.upgrade,expression:"upgrade"}],staticClass:"ota-upgrade"},[s("div",{staticClass:"mask",on:{click:e.hideUpgrade}}),e._v(" "),s("div",{staticClass:"upgrade-info"},[s("h3",[e._v(e._s(e.$t("otaUpdate")))]),e._v(" "),s("div",{staticClass:"progress-info"},[s("span",{staticClass:"progress-value upgrade-progress-value",class:{active:e.upgradeFailure},style:{left:e.upgradeValue+"%"},attrs:{id:"update-progress-vule"}},[e._v("0%")]),e._v(" "),s("div",{staticClass:"ota-progress"},[s("div",{staticClass:"ota-progress-progress upgradeProgress",class:{active:e.upgradeFailure},attrs:{id:"update-progress-view"}})]),e._v(" "),s("p",{staticClass:"progress-details"},[s("span",[e._v(e._s(e.$t("deviceUpgradingDesc")))]),e._v(" "),s("span",[e._v(e._s(e.getBinName()))]),e._v(" "),s("span",{staticClass:"text-right"},[e._v(e._s(e.timeCost))])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.upgradeSuccess&&!e.upgradeFailure,expression:"!upgradeSuccess && !upgradeFailure"}],staticClass:"result-success"},[s("button",{staticClass:"btn register-btn",on:{click:e.stopUpgrade}},[e._v(e._s(e.$t("cancelBtn")))])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.upgradeSuccess,expression:"upgradeSuccess"}],staticClass:"result-success"},[s("p",[e._v(e._s(e.$t("upgradeSucDesc")))]),e._v(" "),s("div",{staticClass:"result-flex"},[s("button",{staticClass:"btn register-btn retry",on:{click:e.stopUpgrade}},[e._v(e._s(e.$t("cancelBtn")))]),e._v(" "),s("button",{staticClass:"btn register-btn",on:{click:e.otaReboot}},[e._v(e._s(e.$t("confirmBtn")))])])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.upgradeFailure,expression:"upgradeFailure"}],staticClass:"result-failure"},[s("p",[e._v(e._s(e.$t("upgradeFailDesc")))]),e._v(" "),s("div",{staticClass:"result-flex"},[s("button",{staticClass:"btn register-btn retry",on:{click:e.retrySave}},[e._v(e._s(e.$t("retryBtn")))]),e._v(" "),s("button",{staticClass:"btn register-btn",on:{click:e.otaReboot}},[e._v(e._s(e.$t("confirmBtn")))])])])])])])])},staticRenderFns:[]};var u=s("VU/8")(l,d,!1,function(e){s("XZwk")},"data-v-51052966",null);t.default=u.exports}});
//# sourceMappingURL=7.596196084e8cf50b5496.js.map