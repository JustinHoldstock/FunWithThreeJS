/*! OculusBridge 2014-02-18 */
var OculusBridge=function(a){var b,c=null,d=!0,e=a.hasOwnProperty("address")?a.address:"localhost",f=a.hasOwnProperty("port")?a.port:9005,g=a.hasOwnProperty("retryInterval")?a.retryInterval:1,h=a.hasOwnProperty("debug")?a.debug:!1,i={x:0,y:0,z:0,w:0},j={x:0,y:0,z:0},k={FOV:125.871,hScreenSize:.14976,vScreenSize:.0935,vScreenCenter:.04675,eyeToScreenDistance:.041,lensSeparationDistance:.067,interpupillaryDistance:.0675,hResolution:1280,vResolution:720,distortionK:[1,.22,.24,0],chromaAbParameter:[.996,-.004,1.014,0]},l={onOrientationUpdate:null,onAccelerationUpdate:null,onConfigUpdate:null,onConnect:null,onDisconnect:null};for(var m in l)"function"==typeof a[m]&&(l[m]=a[m]);var n=function(a){a.o&&4==a.o.length&&(i.x=Number(a.o[1]),i.y=Number(a.o[2]),i.z=Number(a.o[3]),i.w=Number(a.o[0]),l.onOrientationUpdate&&l.onOrientationUpdate(i))},o=function(a){a.a&&3==a.a.length&&(j.x=Number(a.a[0]),j.y=Number(a.a[1]),j.z=Number(a.a[2]),l.onAccelerationUpdate&&l.onAccelerationUpdate(j))},p=function(a){k.hScreenSize=a.screenSize[0],k.vScreenSize=a.screenSize[1],k.vScreenCenter=a.screenSize[1]/2,k.eyeToScreenDistance=a.eyeToScreen,k.lensSeparationDistance=a.lensDistance,k.interpupillaryDistance=a.interpupillaryDistance,k.hResolution=a.screenResolution[0],k.vResolution=a.screenResolution[1],k.distortionK=[a.distortion[0],a.distortion[1],a.distortion[2],a.distortion[3]],k.FOV=a.fov,l.onConfigUpdate&&l.onConfigUpdate(k)},q=function(){d=!0;var a="ws://"+e+":"+f+"/";b=new WebSocket(a),r("Attempting to connect: "+a),b.onopen=function(){r("Connected!"),l.onConnect&&l.onConnect()},b.onerror=function(){r("Socket error.")},b.onmessage=function(a){var b=JSON.parse(a.data),c=b.m;switch(c){case"config":p(b);break;case"orientation":n(b);break;case"update":n(b),o(b);break;default:r("Unknown message received from server: "+a.data),t()}},b.onclose=function(){l.onDisconnect&&l.onDisconnect(),d&&(r("Connection failed, retrying in 1 second..."),c=window.setTimeout(s,1e3*g))}},r=function(a){h&&console.log("OculusBridge: "+a)},s=function(){q()},t=function(){d=!1,window.clearTimeout(c),b.close()},u=function(){return k},v=function(){return i},w=function(){return 1==b.readyState};return{isConnected:w,disconnect:t,connect:q,getOrientation:v,getConfiguration:u}};