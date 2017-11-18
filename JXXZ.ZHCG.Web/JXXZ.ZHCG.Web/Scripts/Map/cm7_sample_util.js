var __g;
var __fcMap = {};     //key: guid, value: fc
var __fcGeoMap = {};  //key: guid, value: geoNames[]
__flMap = {
    Set: function (key, value) { this[key] = value },
    Get: function (key) { return this[key] },
    Contains: function (key) { return this.Get(key) == null ? false : true },
    Remove: function (key) { delete this[key] }
};     //key:fc.name,value:fl
fds = null;
var visFCMap = new Array(
    //"水系", "植被", "地面", "建筑",
    "泵站", "热力井盖", "无主井盖", "输油井盖", "电力井盖", "雨水井盖", "燃气井盖", "消防设施", "上水井盖", "电视井盖",
    "雨水箅子", "公安交警井盖", "路灯井盖", "通讯井盖", "", "监控摄像头", "污水井盖", "跨河桥",
    "公交井盖", "网络井盖", "特殊井盖", "道路", "综合井盖", "路灯", "消防井盖",
    "交通信号灯", "行道树", "公共厕所", "垃圾中转站", "古树名木", "电力设施", "道路绿化带", "园林", "高架立交桥", "人行道",
    "监控电子眼", "交通信号设施", "公交站台");

function getSamplesPath() {
    var flag = unescape(location.pathname).lastIndexOf("Samples");
    if (flag > 0) {
        return (unescape(location.pathname).substring(1, flag) + "Samples");
    }
}

function getSamplesRelatePath(relPath) {
    return (getSamplesPath() + relPath).replace(/\//g, "\\");
}


/************************************************************************/
/* 初始化三维控件，并设置天空
/************************************************************************/
function initAxControl() {
    __g = WJH$("__g");  // 兼容Firefox

    // 初始化RenderControl控件
    var ps = __g.new_PropertySet;
    ps.setProperty("RenderSystem", "OpenGL");
    var bInit = __g.initialize(true, ps);
    if (!bInit) {
        alert("三维控件初始化失败!");
        return false;
    }

    // 设置天空盒
    var skyboxPath = "http:\/\/" + location.host + "\/Images\/skybox";
    var skyboxObj = __g.objectManager.getSkyBox(0);
    skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageBack, skyboxPath + "\/1_BK.jpg");
    skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageBottom, skyboxPath + "\/1_DN.jpg");
    skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageFront, skyboxPath + "\/1_FR.jpg");
    skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageLeft, skyboxPath + "\/1_LF.jpg");
    skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageRight, skyboxPath + "\/1_RT.jpg");
    skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageTop, skyboxPath + "\/1_UP.jpg");

    return true;
}

/************************************************************************/
/* 加载FDB场景
/************************************************************************/
function loadFdb(fileName, textRender, geoRender) {
    // 加载FDB场景
    var c = __g.new_ConnectionInfo;
    c.connectionType = gviConnectionType.gviConnectionFireBird2x;
    c.database = "C:\\WJH\\community.FDB";
    //c.database = "D:\\WJH\\3D数字鄞州1204偏移.FDB";
    //c.database = "c:\\yzmx.fdb";

    try {
        var ds = __g.dataSourceFactory.openDataSource(c);
        var fdsNames = ds.getFeatureDatasetNames();
        if (fdsNames.length == 0)
            return false;
        for (var j = 0; j < fdsNames.length; j++) {
            //console.log("fdsNames:" + fdsNames[j]);
            fds = ds.openFeatureDataset(fdsNames[j]);

            //var __datasetCRS = fds.spatialReference;
            //var fc = fds.openFeatureClass("鄞州城管数据_处理-Polyline");
            //var rootID = __g.objectManager.getProjectTree().rootID;
            //fl = __g.objectManager.createFeatureLayer(fc, "Geometry", null, null, rootID);
            //__g.camera.flyToObject(fl.guid, gviActionCode.gviActionFlyTo);


            var fcNames = fds.getNamesByType(gviDataSetType.gviDataSetFeatureClassTable);
            if (fcNames.length == 0)
                return false;
            for (var i = 0; i < fcNames.length; i++) {
                //console.log("fcNames:" + fcNames[i]);
                //if (fcNames[i] === "鄞州城管数据-Polyline")

                var fc = fds.openFeatureClass(fcNames[i]);

                // 找到FC里面的所有空间列字段
                //var geoNames = [];
                var fieldinfos = fc.getFields();
                //if (fc.name == "建筑" || fc.name == "道路" || fc.name == "地面" || fc.name == "水系") {
                var fl = __g.objectManager.createFeatureLayer(fc, "Geometry", null, null);
                //var fl = __g.objectManager.createFeatureLayer(fc, "Geometry", null, null, "");

                //__g.camera.flyToObject(fl.guid, gviActionCode.gviActionFlyTo);

                //fl.minVisiblePixels = 60;

                if (fc.name == "建筑" || fc.name == "道路" || fc.name == "地面" || fc.name == "水系") {
                    fl.maxVisibleDistance = 5000;
                } else {
                    fl.maxVisibleDistance = 500;
                }
                //}
                //if (geoName == "Geometry") {
                //    __flMap.Set(fc.name, fl);
                //}

                //for (var i = 0; i < visFCMap.length; i++) {
                //    if (visFCMap[i] === fc.name) {
                //        __flMap.Set(fc.name, fl);
                //        __fcMap[fc.guid] = fc;
                //    }
                //}
                __flMap.Set(fc.name, fl);
                __fcMap[fc.guid] = fc;

                //市政处   道路，部件，井盖
                //园林处   园林，植被
                //内河处   水系
                //
            }
            //console.log(Object.keys(__flMap).length);
        }
    }
    catch (e) {
        exceptionHandler(e);
    }
}

/************************************************************************/
/* 加载server场景
/************************************************************************/
function loadServer(c, textRender, geoRender) {
    //var __fcMap = {};     //key: guid, value: fc
    //var __fcGeoMap = {};  //key: guid, value: geoNames[]
    try {
        var ds = __g.dataSourceFactory.openDataSource(c);
        var fdsNames = ds.getFeatureDatasetNames();
        if (fdsNames.length == 0)
            return false;
        for (var j = 0; j < fdsNames.length; j++) {
            //console.log("fdsNames:" + fdsNames[j]);
            fds = ds.openFeatureDataset(fdsNames[j]);

            //var __datasetCRS = fds.spatialReference;
            //var fc = fds.openFeatureClass("鄞州城管数据_处理-Polyline");
            //var rootID = __g.objectManager.getProjectTree().rootID;
            //fl = __g.objectManager.createFeatureLayer(fc, "Geometry", null, null, rootID);
            //__g.camera.flyToObject(fl.guid, gviActionCode.gviActionFlyTo);


            var fcNames = fds.getNamesByType(gviDataSetType.gviDataSetFeatureClassTable);
            if (fcNames.length == 0)
                return false;
            for (var i = 0; i < fcNames.length; i++) {
                //console.log("fcNames:" + fcNames[i]);
                //if (fcNames[i] === "鄞州城管数据-Polyline")

                var fc = fds.openFeatureClass(fcNames[i]);

                // 找到FC里面的所有空间列字段
                //var geoNames = [];
                var fieldinfos = fc.getFields();
                //if (fc.name == "建筑" || fc.name == "道路" || fc.name == "地面" || fc.name == "水系") {
                var fl = __g.objectManager.createFeatureLayer(fc, "Geometry", null, null);
                //var fl = __g.objectManager.createFeatureLayer(fc, "Geometry", null, null, "");

                //__g.camera.flyToObject(fl.guid, gviActionCode.gviActionFlyTo);

                //fl.minVisiblePixels = 60;

                if (fc.name == "建筑" || fc.name == "道路" || fc.name == "地面" || fc.name == "水系") {
                    fl.maxVisibleDistance = 5000;
                } else {
                    fl.maxVisibleDistance = 500;
                }
                //}
                //if (geoName == "Geometry") {
                //    __flMap.Set(fc.name, fl);
                //}

                //for (var i = 0; i < visFCMap.length; i++) {
                //    if (visFCMap[i] === fc.name) {
                //        __flMap.Set(fc.name, fl);
                //        __fcMap[fc.guid] = fc;
                //    }
                //}
                __flMap.Set(fc.name, fl);
                __fcMap[fc.guid] = fc;

                //市政处   道路，部件，井盖
                //园林处   园林，植被
                //内河处   水系
                //
            }
            //console.log(Object.keys(__flMap).length);
        }
    }
    catch (e) {
        exceptionHandler(e);
    }
}