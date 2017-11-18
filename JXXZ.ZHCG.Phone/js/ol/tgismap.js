function TGisMap(containerId) {
    var thas = this;
    //绘制对象
    thas.draw = null;
    //绘点标注图层
    thas.markerLayer = null;
    //绘制点位相关图层
    thas.relateFeaturesLayer = null;
    //不同地图层级对应的底图数据源
    var tileLayerSource1, tileLayerSource2, tileLayerSource3, tileLayerSource4, tileLayerSource5, tileLayerSource6;

    var projection = ol.proj.get('EPSG:4326');
    var projectionExtent = projection.getExtent();
    var size = ol.extent.getWidth(projectionExtent) / 256;
    var resolutions = new Array(22);
    var matrixIds = new Array(22);
    for (var z = 0; z < 22; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }
    tileLayerSource1 = new ol.source.WMTS({
        url: 'http://t{0-7}.tianditu.com/vec_c/wmts',
        layer: 'vec',
        format: 'tiles',
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        matrixSet: "c", style: 'default'
    });
    tileLayerSource2 = new ol.source.WMTS({
        url: 'http://t{0-7}.tianditu.com/cva_c/wmts',
        layer: 'cva',
        format: 'tiles',
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        matrixSet: "c", style: 'default'
    });
    tileLayerSource3 = new ol.source.WMTS({
        url: 'http://srv.zjditu.cn/ZJEMAP_2D/wmts',
        layer: 'vec',
        format: 'tiles',
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        matrixSet: "c", style: 'default'
    });
    tileLayerSource4 = new ol.source.WMTS({
        url: 'http://srv.zjditu.cn/ZJEMAPANNO_2D/wmts',
        layer: 'cva',
        format: 'tiles',
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        matrixSet: "c", style: 'default'
    });
    tileLayerSource5 = new ol.source.WMTS({
        url: 'http://srv.tianditusx.cn/KQEMAP/wmts.asmx/wmts',
        layer: 'KQEMAP',
        format: 'image/png',
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        matrixSet: "TileMatrixSet0", style: 'default'
    });
    tileLayerSource6 = new ol.source.WMTS({
        url: 'http://srv.tianditusx.cn/KQEMAPANNO/wmts.asmx/wmts',
        layer: 'KQEMAPANNO',
        format: 'image/png',
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        matrixSet: "TileMatrixSet0", style: 'default'
    });

    thas.map = new ol.Map({
        logo: false,
        layers: [
            new ol.layer.Tile({
                name: "baseVec",
                source: tileLayerSource1
            }),
            new ol.layer.Tile({
                name: "baseCva",
                source: tileLayerSource2
            })
        ],
        target: containerId,
        controls: ol.control.defaults({
            attributionOptions: ({
                collapsible: true
            })
        }),
        view: new ol.View({
            //center: [120.49038, 30.08370],
            projection: ol.proj.get("EPSG:4326"),
            //zoom: 15,
            minZoom: 1,
            maxZoom: 20
        })
    });
    thas.map.getView().fit([120.404376545383, 30.0087014643942, 120.552778678422, 30.1571035974332], thas.map.getSize(), { nearest: true });
    //添加全屏控件
    thas.map.addControl(new ol.control.FullScreen());
    //添加地图放大缩小控件
    thas.map.addControl(new ol.control.Zoom());
    //控制不同地图层级时,切换底图数据源
    thas.map.getView().on("change:resolution", function () {
        var zoom = thas.map.getView().getZoom();
        if (!(typeof zoom === 'number' && zoom % 1 === 0)) {
            return;
        }
        if (zoom <= 14) {
            var l1 = thas.map.getLayers().getArray()[0];
            l1.setSource(tileLayerSource1);
            var l2 = thas.map.getLayers().getArray()[1];
            l2.setSource(tileLayerSource2);
        }
        else if (zoom >= 15 && zoom <= 17) {
            var l1 = thas.map.getLayers().getArray()[0];
            l1.setSource(tileLayerSource3);
            var l2 = thas.map.getLayers().getArray()[1];
            l2.setSource(tileLayerSource4);
        } else {
            var l1 = thas.map.getLayers().getArray()[0];
            l1.setSource(tileLayerSource5);
            var l2 = thas.map.getLayers().getArray()[1];
            l2.setSource(tileLayerSource6);
        }
    });
}

//添加标注
TGisMap.prototype.addMarker = function (opts) {
    var defaults = {
        x: 0,
        y: 0,
        isCenter: false
    };
    $.extend(defaults, opts);

    var thas = this;
    thas.map.removeLayer(thas.markerLayer);
    var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point([defaults.x, defaults.y])
    });
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: 'images/marker.png'
        }))
    });
    iconFeature.setStyle(iconStyle);

    var vectorSource = new ol.source.Vector({
        features: [iconFeature]
    });

    thas.markerLayer = new ol.layer.Vector({
        source: vectorSource
    });
    thas.map.addLayer(thas.markerLayer);
    if (defaults.isCenter == true) {
        thas.map.getView().setCenter([defaults.x, defaults.y]);
    }
}



//展示案件位置
TGisMap.prototype.viewPoint = function (opts) {
    var thas = this;
    var defaults = {
        x: 0,
        y: 0,
        isCenter: false
    };
    $.extend(defaults, opts);
    thas.addRelateFeatures({
        x: defaults.x,
        y: defaults.y
    });
    thas.addMarker({
        x: defaults.x,
        y: defaults.y,
        isCenter: true
    });
}

//标注案件位置
TGisMap.prototype.drawPoint = function (opts) {
    var thas = this;
    var defaults = {
        x: 0,
        y: 0,
        isCenter: false
    };
    $.extend(defaults, opts);
    thas.addRelateFeatures({
        x: defaults.x,
        y: defaults.y
    });
    thas.addMarker({
        x: defaults.x,
        y: defaults.y,
        isCenter: defaults.isCenter
    });

    if (typeof opts.callback != "function") {
        alert("drawPoint 方法参数中的callback类型必须为 function")
    }
    thas.map.removeInteraction(thas.draw);
    var source = new ol.source.Vector();
    var vector = new ol.layer.Vector({
        source: source
    });
    thas.map.addLayer(vector);
    thas.draw = new ol.interaction.Draw({
        source: source,
        type: 'Point'
    });

    thas.draw.on("drawstart", function (obj) {
        //清除之前绘制的点
        source.clear();
    });

    thas.draw.on("drawend", function (obj) {
        var pointArry = obj.feature.getGeometry().getCoordinates();
        //重新添加责任网格等信息
        thas.addRelateFeatures({
            x: pointArry[0],
            y: pointArry[1],
            callback: function (data) {
                data.x = pointArry[0];
                data.y = pointArry[1];
                defaults.callback(data);
            }
        });
        //重新添加标记
        thas.addMarker({
            x: pointArry[0],
            y: pointArry[1],
            isCenter: false,
        });
    });
    thas.map.addInteraction(thas.draw);
}

//根据点位加载相关的features
TGisMap.prototype.addRelateFeatures = function (opts) {
    var defaults = {
        x: 0,
        y: 0,
        callback: function (data) { }
    };
    $.extend(defaults, opts);

    var thas = this;
    thas.map.removeLayer(thas.relateFeaturesLayer);
    var vectorSource = new ol.source.Vector();
    thas.relateFeaturesLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 0, 0, 1)',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                snapToPixel: false,
                fill: new ol.style.Fill({ color: 'black' }),
                stroke: new ol.style.Stroke({
                    color: 'white', width: 2
                })
            })
        })
    });
    thas.map.addLayer(thas.relateFeaturesLayer);
    var esrijsonFormat = new ol.format.EsriJSON();

    //要通过回调函数返回的值
    var returnData = {
        gridCode: "",
        streetCode: "",
        communityCode: ""
    };
    //请求所在的责任网格
    var zrwgLayerUrl = "http://10.80.2.155/ArcGIS/rest/services/kq20170323/MapServer/6/query?text=&geometry=" + defaults.x + "," + defaults.y + "&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=&time=&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=&f=pjson";
    var zrwgDeferred = $.ajax({
        url: zrwgLayerUrl, dataType: 'jsonp', success: function (response) {
            if (response.error) {
                alert(response.error.message + '\n' +
                    response.error.details.join('\n'));
            } else {
                var features = esrijsonFormat.readFeatures(response);
                if (features.length > 0) {
                    vectorSource.addFeatures(features);
                    returnData.gridCode = response.features[0].attributes.网格编码;
                }
            }
        }
    });
    //查询所在的街道
    var jdLayerUrl = "http://10.80.2.155/ArcGIS/rest/services/kq20170323/MapServer/5/query?text=&geometry=" + defaults.x + "," + defaults.y + "&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=&time=&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=&f=pjson";
    var jdDeferred = $.ajax({
        url: jdLayerUrl, dataType: 'jsonp', success: function (response) {
            if (response.error) {
                alert(response.error.message + '\n' +
                    response.error.details.join('\n'));
            } else {
                var features = esrijsonFormat.readFeatures(response);
                if (features.length > 0) {
                    //vectorSource.addFeatures(features);
                    returnData.streetCode = response.features[0].attributes.街道编码;
                }
            }
        }
    });
    //查询所在的社区
    var sqLayerUrl = "http://10.80.2.155/ArcGIS/rest/services/kq20170323/MapServer/4/query?text=&geometry=" + defaults.x + "," + defaults.y + "&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=&time=&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=&f=pjson";
    var sqDeferred = $.ajax({
        url: sqLayerUrl, dataType: 'jsonp', success: function (response) {
            if (response.error) {
                alert(response.error.message + '\n' +
                    response.error.details.join('\n'));
            } else {
                var features = esrijsonFormat.readFeatures(response);
                if (features.length > 0) {
                    //vectorSource.addFeatures(features);
                    returnData.communityCode = response.features[0].attributes.社区编码;
                }
            }
        }
    });
    $.when(zrwgDeferred, jdDeferred, sqDeferred).always(function (msg) {
        if (defaults.callback && (typeof defaults.callback == "function")) {
            defaults.callback(returnData);
        }
    });
}


