webpackJsonp([8],{QXnv:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("mvHQ"),s=o.n(n),i=o("Dd8w"),a=o.n(i),c=o("NYxO"),l=o("Au9i"),r=o("Y54T"),d=o("yojn"),h=o.n(d),u={data:function(){return{blueEnable:!1,isBleScan:!0,locationGranted:!0,locationEnabled:!0,deviceName:"",networkKey:"Primary Network Key",flag:!1,oobMethods:[],deviceId:"",proxyAddress:"",connectContent:0,connectData:"",capabilitiesTimeOut:""}},created:function(){var t=this;window.scanCallback=function(e){t.scanCallback(e)},window.provisioningCallback=function(e){t.provisioningCallback(e)},window.connectCallback=function(e){t.connectCallback(e)},window.onBackPressed=function(){t.onBackPressed()}},methods:a()({},Object(c.c)({setNum:"SET_NUM"}),{getOobMethods:function(t){return t===h.a.NO_OOB_AUTHENTICATION?"No OOB":t===h.a.STATIC_OOB_AUTHENTICATION?"Static OOB":t===h.a.OUTPUT_OOB_AUTHENTICATION?"Output OOB":t===h.a.INPUT_OOB_AUTHENTICATION?"Input OOB":void 0},provision:function(t){var e=this;e.flag=!1;var o={name:e.deviceName,oobMethod:e.oobMethods[t]};console.log("选择配网类型： "+t+"配网参数： "+s()(o)),l.Indicator.open(),e.capabilitiesTimeOut=setTimeout(function(){l.Indicator.close(),e.messageRemind(e.$t("provisionTimeout"))},6e3),EspBleMesh.startProvisioning(s()(o))},deviceProvision:function(){console.log("blueEnable:"+this.blueEnable+"  locationEnabled:"+this.locationEnabled+"  locationGranted:"+this.locationGranted),this.blueEnable?this.locationEnabled?this.locationGranted?r.a._isEmpty(this.oobMethods)||(1===this.oobMethods.length?(console.log("选择配网类型"+this.oobMethods[0]),this.provision(0)):this.flag=!0):this.messageRemind(this.$t("notgps")):this.messageRemind(this.$t("notlocation")):this.messageRemind(this.$t("notbluetooth"))},showBlueFail:function(){console.log("点击蓝牙按钮")},hide:function(){EspBleMesh.disconnect(),this.flag=!1,this.$router.goBack()},deviceNameClick:function(){var t=this;console.log("点击编辑设备名称"),l.MessageBox.prompt(t.$t("devicename"),{inputValue:t.deviceName,inputPlaceholder:t.$t("devicename"),inputValidator:function(t){if(r.a.stringToBytes(t).length>32)return!1},inputErrorMessage:t.$t("longDesc"),confirmButtonText:t.$t("confirmBtn"),cancelButtonText:t.$t("cancelBtn")}).then(function(e){t.deviceName=e.value}).catch(function(t){})},networkKeyClick:function(){console.log("点击选择密钥")},onBackPressed:function(){EspBleMesh.disconnect(),this.flag=!1,this.$router.goBack()},homeDeviceScan:function(){if(console.log("homeDeviceScan 123"),this.blueEnable||this.messageRemind(this.$t("notbluetooth")),this.locationEnabled||this.messageRemind(this.$t("notlocation")),this.locationGranted||this.messageRemind(this.$t("notgps")),this.blueEnable&&this.locationEnabled&&this.locationGranted){console.log("home 开始 proxy 蓝牙扫描");EspBleMesh.startScan(s()({type:"proxy"}))}},messageRemind:function(t){Object(l.Toast)({message:t,position:"bottom"})},scanCallback:function(t){if(t=r.a.base64().decode(t),console.log("Home scan proxy device: "+t),t=JSON.parse(t),!r.a._isEmpty(t)){EspBleMesh.stopScan();for(var e=0;e<t.length;++e)if(t[e].address===this.proxyAddress)return this.connectData={id:t[e].id,type:"proxy",address:this.proxyAddress},console.log("FBY home connectData: "+s()(this.connectData)),this.$store.commit("setBleConnectAddress",this.proxyAddress),void EspBleMesh.connect(s()(this.connectData));t.sort(r.a.sortBy("rssi")),this.connectData={id:t[0].id,type:"proxy",address:this.proxyAddress},console.log("FBY home connectData: "+s()(this.connectData)),this.$store.commit("setBleConnectAddress",this.proxyAddress),EspBleMesh.connect(s()(this.connectData))}},connectCallback:function(t){if(t=r.a.base64().decode(t),console.log("FBY connectCallback"+t),t=JSON.parse(t),!r.a._isEmpty(t))switch(t.status){case h.a.STATUS_GATT_CONNECTED:console.log("设备蓝牙连接成功 12345678900987654321"),this.$store.commit("setIsBleConnect",!0),this.connectContent=0;break;case h.a.STATUS_GATT_DISCONNECTED:this.connectContent<2&&(r.a._isEmpty(this.connectData)||EspBleMesh.connect(s()(this.connectData))),this.connectContent++;break;case h.a.STATUS_PROXY_READY:console.log("设备详情获取成功："+t),this.connectContent=0}},provisioningCallback:function(t){var e=this;t=r.a.base64().decode(t),console.log("FBY provisioningCallback"+t),t=JSON.parse(t),r.a._isEmpty(t)||(t.status===h.a.STATUS_PROVISIONING_COMPLETE?(clearTimeout(e.capabilitiesTimeOut),e.$store.commit("setSigProvisionList",t.node),e.proxyAddress=t.node.address,e.homeDeviceScan(),setTimeout(function(){l.Indicator.close(),Object(l.MessageBox)({$type:"alert",title:e.$t("success"),message:e.$t("provisioningcomplete"),showConfirmButton:!1,closeOnClickModal:!1,showCancelButton:!0,cancelButtonText:e.$t("confirmBtn")}).then(function(o){console.log("点击确定按钮"),e.removeDevices(),e.backHome(t.node)})},2e3)):t.status===h.a.STATUS_FAILED&&console.log("capabilities STATUS_FAILED"))},removeDevices:function(){var t=this,e=t.$store.state.scanProvisioning;e.forEach(function(o,n){if(o.id===t.deviceId)return e.splice(n,1),!1}),t.$store.commit("setScanProvisioning",e)},backHome:function(t){this.$router.goRight({name:"home",query:{node:t,type:h.a.CAPABILITIES}})}}),mounted:function(){this.connectContent=0,console.log("sigprovision 传参打印"+s()(this.$route.query)),this.deviceName=this.$route.query.name,this.oobMethods=this.$route.query.oobMethods,this.deviceId=this.$route.query.deviceId},computed:a()({},Object(c.b)(["number"]),Object(c.d)({number:function(t){return t.home.number}}),{getBlueEnable:function(){return this.blueEnable=this.$store.state.blueInfo,this.locationGranted=this.$store.state.locationGranted,this.locationEnabled=this.$store.state.locationEnabled,this.blueEnable}})},m={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"content-box"},[o("div",{staticClass:"title-info"},[o("h4",{staticClass:"app-title"},[o("span",{on:{click:t.hide}},[o("i",{staticClass:"icon-left back"})]),t._v(t._s(t.$t("capabilities")))]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:!t.getBlueEnable,expression:"!getBlueEnable"}],staticClass:"bluetooth-second-base",on:{click:t.showBlueFail}},[o("i",{staticClass:"icon-bluetooth bluetooth-second-style"})]),t._v(" "),o("span",{staticClass:"right-top-text",on:{click:function(e){return t.deviceProvision()}}},[t._v(t._s(t.$t("provision")))]),t._v(" "),o("ul",{directives:[{name:"show",rawName:"v-show",value:t.flag,expression:"flag"}],staticClass:"add-ul add-provision-ul"},t._l(t.oobMethods,function(e,n){return o("li",{on:{click:function(e){return e.stopPropagation(),t.provision(n)}}},[o("span",[t._v(t._s(t.getOobMethods(e)))])])}),0)]),t._v(" "),o("div",{staticClass:"device-detail"},[o("div",{staticClass:"item",on:{click:t.deviceNameClick}},[o("span",{staticClass:"name"},[t._v(t._s(t.$t("devicename")))]),t._v(" "),o("span",{staticClass:"content"},[t._v(t._s(t.deviceName))]),t._v(" "),o("i",{staticClass:"icon-right text-color"})]),t._v(" "),o("div",{staticClass:"item",on:{click:t.networkKeyClick}},[o("span",{staticClass:"name"},[t._v(t._s(t.$t("networkkey")))]),t._v(" "),o("span",{staticClass:"content"},[t._v(t._s(t.networkKey))])])])])},staticRenderFns:[]};var v=o("VU/8")(u,m,!1,function(t){o("krKj")},"data-v-48c9fc86",null);e.default=v.exports},krKj:function(t,e){}});
//# sourceMappingURL=8.7d4da211328009c4bfdf.js.map