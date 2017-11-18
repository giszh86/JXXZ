//不同地图层级对应的底图数据源
var tileLayerSource1, tileLayerSource2, tileLayerSource3, tileLayerSource4, tileLayerSource5, tileLayerSource6;
var projection = ol.proj.get('EPSG:4326');
var projectionExtent = projection.getExtent();
var size = ol.extent.getWidth(projectionExtent) / 256;
var resolutions = new Array(20);
var matrixIds = new Array(20);
for (var z = 0; z <= 20; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
}

tileLayerSource1 = new ol.source.WMTS({
    url: 'http://t0.tianditu.com/vec_c/wmts',
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
    url: 'http://t0.tianditu.com/cva_c/wmts',
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

tileLayerSource5 = new ol.source.WMTS(
                {
                    url: 'http://220.191.220.90/JXEMAP/service/wmts',
                    layer: 'JXEMAP',
                    format: 'image/png',
                    tileGrid: new ol.tilegrid.WMTS({
                        origin: ol.extent.getTopLeft(projectionExtent),
                        resolutions: resolutions, matrixIds: matrixIds,
                        tileSize: [256, 256]
                    }),
                    matrixSet: "TileMatrixSet0", style: 'default', SERVICE: 'WMTS', VERSION: '1.0.0', REQUEST: 'GetTile'
                }
                );

tileLayerSource6 = new ol.source.WMTS(
                {
                    url: 'http://220.191.220.90/JXEMAPANNO/service/wmts',
                    layer: 'JXEMAPANNO',
                    format: 'image/png',
                    tileGrid: new ol.tilegrid.WMTS({
                        origin: ol.extent.getTopLeft(projectionExtent),
                        resolutions: resolutions, matrixIds: matrixIds,
                        tileSize: [256, 256]
                    }),
                    matrixSet: "TileMatrixSet0", style: 'default', style: 'default', SERVICE: 'WMTS', VERSION: '1.0.0', REQUEST: 'GetTile'
                });
var markerLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: []
    })
})

var map = new ol.Map({
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
    target: 'map',
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
map.addLayer(markerLayer);
map.getView().fit([120.671860664617, 30.7580903582995, 120.750367862576, 30.7865829791874], map.getSize(), { nearest: true });

map.addControl(new ol.control.Zoom());
map.getView().on("change:resolution", function () {
    var zoom = self.map.getView().getZoom();
    if (!(typeof zoom === 'number' && zoom % 1 === 0)) {
        return;
    }
    if (zoom <= 14) {
        var l1 = self.map.getLayers().getArray()[0];
        l1.setSource(tileLayerSource1);
        var l2 = self.map.getLayers().getArray()[1];
        l2.setSource(tileLayerSource2);
    }
    else if (zoom >= 15 && zoom <= 17) {
        var l1 = self.map.getLayers().getArray()[0];
        l1.setSource(tileLayerSource3);
        var l2 = self.map.getLayers().getArray()[1];
        l2.setSource(tileLayerSource4);
    } else {
        var l1 = self.map.getLayers().getArray()[0];
        l1.setSource(tileLayerSource5);
        var l2 = self.map.getLayers().getArray()[1];
        l2.setSource(tileLayerSource6);
    }

});
var source = new ol.source.Vector();


//绘制线、面、圆的样式
var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(249, 24, 24, 0.7)'
        }),
        stroke: new ol.style.Stroke({
            color: '#18D8F9',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#18D8F9'
            })
        })
    })
});

//div点位动画效果
var point_div = document.getElementById("pointanimation");
var point_overlay = new ol.Overlay({
    element: point_div,
    positioning: 'bottom-center',
    stopEvent: false
});
map.addOverlay(point_overlay);

var mytemplate_div = document.getElementById("mytemplate");
var template_overlay = new ol.Overlay({
    element: mytemplate_div,
    positioning: 'center-left',
    stopEvent: false
})
map.addOverlay(template_overlay);

var grid_tempalte = document.getElementById("gridtempalte");
grid_tempalte.style.visibility = 'visible';
var gridtemplate_overlay = new ol.Overlay({
    element: grid_tempalte,
    positioning: 'bottom-center',
    stopEvent: false
})
map.addOverlay(gridtemplate_overlay);

//飞到定位点(地图跟随移动)
function flytocoordinate(coordinate) {
    var x = parseFloat(coordinate[0]);
    var y = parseFloat(coordinate[1]);
    var newcoordinate = [x, y];
    map.getView().setCenter(newcoordinate);
}

//单击事件
map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
    function (feature, layer) {
        return feature;
    });
    if (feature) {
        //获取点位Id
        var name = feature.get('name');
        var typeName = feature.get('type');
        
        if (typeName != 'undefind' && name != 'undefind' && typeName != null && name != null) {
            switch (typeName) {
                case 'point':
                    map.addOverlay(point_overlay);
                    point_div.style.visibility = "visible";
                    var geometry = feature.get('geometry').v;
                    var x = geometry[0];
                    var y = geometry[1];
                    point_overlay.setPosition([x, y]);
                    var typename = feature.get('typename');
                    var cameratitle = feature.get('cameratitle');
                    var logintype = feature.get('cameratypeId');
                    if (typename == 'ry') {
                        peopleoutline(name);
                    }
                    if (typename == 'allry') {
                        peopleoutline(name);
                    }
                    if (typename == 'sj') {
                        showevent(name);
                    }
                    if (typename == 'jyaj') {
                        showcasedetail(name, '2017022316200001');
                    }
                    if (typename == 'ybaj') {
                        showcasedetail(name, '2017030613400001');
                    }
                    if (typename == 'wtaj') {
                        showwtcasedetail(name);
                    }
                    if (typename == 'bj') {
                        partsoutlineDetail(name);
                    }
                    if (typename == 'jk') {
                        location.href = "Webshell://" + name + "&" + logintype + "";

                        //var iframesrc = "/Camera/Camera.html?Channel=" + name + "&title=" + cameratitle + "&logintype=" + logintype;
                        //myWindow = window.open(iframesrc, '', 'width=1000,height=500, top=80, left=50');
                        //myWindow.focus();
                    }
                    if (typename == 'bd') {
                        showremarkPanel(name, x, y);
                    }
                    if (typename == 'sp') {
                        toExamineDetails(name);
                    }
                    if (typename == 'buttonPartStore') {
                        partStoreDetail(name);
                    }
                    if (typename == 'buttonPartStalls') {
                        partStallsDetail(name);
                    }
                    if (typename == 'cl') {
                        showCarDetails(name);
                    }
                    break;
                case 'circle':
                    var id = feature.get('name')
                    break;
                case 'line':
                    var id = feature.get('name')
                    break;
                case 'polygon':
                    var id = feature.get('name')
                    break;
            }
        }
    }
    else {
        return;
    }
});

//监听鼠标移动
map.on('pointermove', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
    function (feature, layer) {
        return feature;
    });
    if (feature) {
        //获取点位Id
        var name = feature.get('name');
        var typeName = feature.get('type');
        var difference = feature.get('typeName');
        if (typeName != 'undefind' && name != 'undefind' && typeName != null && name != null) {
            switch (typeName) {
                case 'polygon':
                    var id = feature.get('name');
                    if (difference == 'grid') {
                        grid_Details(id);
                        map.addOverlay(gridtemplate_overlay);
                        gridtemplate_overlay.setPosition(evt.coordinate);
                    }
                    break;
            }
        }
    } else {
        map.removeOverlay(gridtemplate_overlay);
        return;
    }
    
});

//测距米
var formatLength = function (line) {
    var self = this;
    var sphere = new ol.Sphere(6378137);
    var lonLatLine = line.getGeometry().transform(self.projection, 'EPSG:4326');
    var lineArray = lonLatLine.getCoordinates();
    var sumLength = 0;
    for (var i = 1; i < lineArray.length; i++) {
        sumLength += sphere.haversineDistance(lineArray[i - 1], lineArray[i]);
    }
    return sumLength;
}

//测面平方米
var formatArea = function (polygon) {
    var self = this;
    var sphere = new ol.Sphere(6378137);
    var lonLatPolygon = polygon.getGeometry().transform(self.projection, "EPSG:4326");
    var area = Math.abs(sphere.geodesicArea(lonLatPolygon.getCoordinates()[0]));
    return area;
}

/// <summary>
/// 添加定位点
/// </summary>
/// <param name="Id">数据唯一标识</param>
/// <param name="X">经度</param>
/// <param name="Y">纬度</param>
/// <param name="iconurl">图标Icon地址(或者http地址)</param>
/// <param name="opacity">图标透明度</param>
var vectorLayer = [];
function addMark(Id, X, Y, iconurl, opacity, typename, cameratitle, cameratypeId) {
    map.addOverlay(point_overlay);
    point_div.style.visibility = "hidden";
    var coordinate = [];
    coordinate.push(X);
    coordinate.push(Y);
    //创建一个Icon定位图标图层
    var iconFeature = new ol.Feature({
        //坐标
        geometry: new ol.geom.Point([X, Y]),
        type: 'point',
        name: Id,
        typename: typename,
        cameratitle: cameratitle,
        cameratypeId: cameratypeId,
        population: 4000,
        rainfall: 500,
    });

    //Icon定位图标设置
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 50],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: opacity,
            src: iconurl
        }))
    });

    //图层Icon设置
    iconFeature.setStyle(iconStyle);
    var vectorSource = markerLayer.getSource();
    vectorSource.addFeature(iconFeature);
    return { feature: iconFeature, sourceVector: vectorSource, point: coordinate };
}

/// <summary>
/// maker鼠标样式
/// </summary>
$(map.getViewport()).on('mousemove', function (e) {
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        return true;
    });
    targetStr = map.getTarget();
    targetEle = typeof targetStr === "string" ? $('#' + targetStr) : $(targetStr);
    if (hit) {
        targetEle.css('cursor', 'pointer');
    } else {
        targetEle.css('cursor', '');
    }
});

var coordinateList = [];

//获取绘画图层的地理信息
var draws;
//绘制点.线.面
function addInteraction(value, action) {
    map.removeInteraction(draws);
    var value = value;
    if (value !== 'None') {
        var geometryFunction, maxPoints;
        if (value === 'Square') {
            value = 'Circle';
            geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
        } else if (value === 'Box') {
            value = 'LineString';
            maxPoints = 2;
            geometryFunction = function (coordinates, geometry) {
                if (!geometry) {
                    geometry = new ol.geom.Polygon(null);
                }
                var start = coordinates[0];
                var end = coordinates[1];
                geometry.setCoordinates([
                  [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ]);
                return geometry;
            };
        }
        draws = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (value),
            geometryFunction: geometryFunction,
            maxPoints: maxPoints
        });
        map.addInteraction(draws);

        //添加draws监听事件
        var listener;
        draws.on('drawstart', function (evt) {
            var sketch = evt.feature;
            listener = sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;
                if (geom instanceof ol.geom.Polygon) {

                } else if (geom instanceof ol.geom.LineString) {

                }
            });
        }, this);

        draws.on('drawend', function (evt) {
            map.removeInteraction(draws);
            if (value == "LineString" && action==null) {
                var lines = evt.feature.getGeometry().getCoordinates();
                var pointStr = "";
                for (var i = 0; i < lines.length; i++) {
                    pointStr += lines[i][0] + "," + lines[i][1] + ";";
                }
                console.log(pointStr);
                addlines(lines);
            }
            if (value == "Polygon" && action == null) {
                var lines = evt.feature.getGeometry().getCoordinates();
                console.log(lines.toString());
                addNoodlescall(lines);
            }
            if (value == "Circle" && action == null) {
                var lines = evt.feature.getGeometry();
                var cricle = evt.target;
                var arr = cricle.a;
                addCircle(arr[0], arr[1]);
            }
            if (value == "LineString" && action == 'cj') {
                map.addOverlay(template_overlay);
                var lines = evt.feature.getGeometry().getCoordinates();
                var line = addlines(lines);
                var distance = formatLength(line);
                document.getElementById("resultAreaOrLine").innerText = distance + "米";
                var linelength = lines.length - 1;
                var xy = lines[linelength];
                template_overlay.setPosition(xy);
            }
            if (value == "Polygon" && action == 'cm') {
                map.addOverlay(template_overlay);
                var lines = evt.feature.getGeometry().getCoordinates();
                var arealine = addNoodlescall(lines);
                var area = formatArea(arealine);
                document.getElementById("resultAreaOrLine").innerText = area + "平方米";
                var arealength = lines.length - 1;
                var xy = lines[0][arealength];
                template_overlay.setPosition(xy);
            }
            ol.Observable.unByKey(listener);
        }, this);
    }
}
function addlines(linePints) {
   return  addDrawLine(1, 'line', linePints, '#18D8F9', 2);
}

function addNoodlescall(pointslist) {
   return addDrawNoodles(2, 'polygon', pointslist, 'rgba(240, 19, 23, 0.7)', '#18D8F9', 2);
}

//加圆
function addCircle(centerpoint, endpoint) {
    //计算半径
    var line = new ol.geom.LineString([centerpoint, endpoint]);
    var radius = line.getLength();
    //获取
    addDrawCircle(3, 'circle', centerpoint, radius, 'rgba(240,19,23,0.7)', '#18D8F9', 2);

}


/// <summary>
/// 根据坐标点加线
/// </summary>
/// <param name="Id">线的唯一标识</param>
/// <param name="type">类型</param>
/// <param name="listPoints">线的点位集合</param>
/// <param name="strokeColor">线颜色</param>
/// <param name="listPoints">线宽度</param>
var rmblinelayer = [];
function addDrawLine(Id, type, listPoints, strokeColor, strokeWidth) {
    //创建一个绘线图层
    var linefeature = new ol.Feature({
        type: type,
        name: Id,
        geometry: new ol.geom.LineString(listPoints)
    });
    var lineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: strokeColor,
            width: strokeWidth
        })
    });
    linefeature.setStyle(lineStyle);
    var lineSource = new ol.source.Vector({
        features: [linefeature]
    });
    var lineLayer = new ol.layer.Vector({
        source: lineSource,
    });
    map.addLayer(lineLayer);
    rmblinelayer.push(lineLayer);
    return linefeature;
}

//画矩形
function drawBox() {
    //创建画笔
    var draw = new ol.interaction.Draw({
        features: [],
        type: 'Circle',
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.5)'
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ff0000'
                })
            })
        }),
        geometryFunction: ol.interaction.Draw.createBox()
    });

    draw.on('drawend', function (evt) {
        var minX, minY, maxX, maxY;
        var lines = evt.feature.getGeometry().getCoordinates();
        for (var i = 0; i < lines[0].length; i++) {
            var arr = lines[0][i];
            if (minX == null || minX > arr[0]) minX = arr[0];
            if (minY == null || minY > arr[1]) minY = arr[1];
            if (maxX == null || maxX < arr[0]) maxX = arr[0];
            if (maxY == null || maxY < arr[1]) maxY = arr[1];

        }
        var ar = [
            [minX, minY],
            [maxX, maxY]
        ];

        var starPoint = minX + "," + minY;
        var endPoint = maxX + "," + maxY;
        //清除覆盖物
        clearTrack();
        clearMulch();
        //重新初始化
        index = 0;
        rlimit = 1000;
        allSelectPoint(starPoint, endPoint);

        map.removeInteraction(draw); //移除画线
    });

    map.addInteraction(draw);
}


/// <summary>
/// 根据坐标点加画面
/// </summary>
/// <param name="pointslist">面的点位集合</param>
/// <param name="fillColor">面填充颜色'rgba(240, 19, 23, 0.7)'</param>
/// <param name="strokeColor">面边框颜色'#18D8F9'</param>
/// <param name="strokeWidth">面边框宽度2</param>
var rmbNoodleslayer = [];
function addDrawNoodles(Id, type, pointslist, fillColor, strokeColor, strokeWidth, typeName) {
    var polygon = new ol.geom.Polygon(pointslist);

    var polygonFeature = new ol.Feature({
        type: type,
        name: Id,
        typeName: typeName,
        geometry: polygon
    });
    var vectorSource = new ol.source.Vector({
        features: [polygonFeature]
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function (feature) {
            return [
                new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: fillColor
                    }),
                    stroke: new ol.style.Stroke({
                        width: strokeWidth,
                        color: strokeColor
                    })
                })
            ]
        }
    })
    map.addLayer(vectorLayer);
    rmbNoodleslayer.push(vectorLayer);
    return polygonFeature;
}

/// <summary>
/// 创建带文字面
/// </summary>
/// <param name="pointslist">面的点位集合</param>
/// <param name="fillColor">面填充颜色'rgba(240, 19, 23, 0.7)'</param>
/// <param name="strokeColor">面边框颜色'#18D8F9'</param>
/// <param name="strokeWidth">面边框宽度2</param>
function createTextNoodle(Id, type, pointslist, fillColor, strokeColor, strokeWidth, text, textColor) {
    var polygon = new ol.geom.Polygon(pointslist);

    var polygonFeature = new ol.Feature({
        type: type,
        name: Id,
        geometry: polygon
    });
    var vectorSource = new ol.source.Vector({
        features: [polygonFeature]
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function (feature) {
            return [
                new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: fillColor
                    }),
                    stroke: new ol.style.Stroke({
                        width: strokeWidth,
                        color: strokeColor
                    }),
                    text: new ol.style.Text({
                        font: '20px sans-seri',
                        offsetX: 0,
                        offsetY: 0,
                        text: text,
                        textAlign: 'center',
                        textBaseline: 'middle',
                        fill: new ol.style.Fill({ color: textColor }),
                        rotation: 0,
                    })
                })
            ]
        }
    })
    map.addLayer(vectorLayer);
    rmbNoodleslayer.push(vectorLayer);
    return polygonFeature;
}

/// <summary>
/// 根据坐标点加画圆
/// </summary>
/// <param name="Id">圆的唯一标识</param>
/// <param name="type">类型</param>
/// <param name="startPoints">中心点位</param>
/// <param name="radius">半径</param>
/// <param name="fillColor">圆填充颜色'rgba(240,19,23,0.7)'</param>
/// <param name="strokeColor">圆边颜色'#18D8F9'</param>
/// <param name="strokeWidth">圆边宽度2</param>
var rmbCirclelayer = [];
function addDrawCircle(Id, type, startPoints, radius, fillColor, strokeColor, strokeWidth) {
    var circle = new ol.geom.Circle(startPoints, radius, 0);

    var circleFeature = new ol.Feature({
        type: type,
        name: Id,
        geometry: circle,
    });

    //Icon定位图标设置
    var circleStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: fillColor
        }),
        stroke: new ol.style.Stroke({
            color: strokeColor,
            width: strokeWidth
        })
    });

    circleFeature.setStyle(circleStyle);

    var vectorSource = markerLayer.getSource();
    vectorSource.addFeature(circleFeature);
    flytocoordinate(startPoints);
}

var positions = [];
function setPointList(longpointlist) {
    positions.splice(0, positions.length);//清空数组 
    var newpoint = longpointlist.split(';');
    for (var i = 0; i < newpoint.length - 1; i++) {
        var coordinates = newpoint[i].split(',');
        var x = parseFloat(coordinates[0]);
        var y = parseFloat(coordinates[1]);
        var resultcoordinates = [x, y];
        positions.push(resultcoordinates);
    }
    return true;
}
function setStyle(iconUrl) {
    startStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            anchor: [0.5, 0.8],
            opacity: 1,
            src: '/Image/localtion/startingPoint.png',

        }))
    });

    endStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            anchor: [0.5, 0.8],
            opacity: 1,
            src: '/Image/localtion/endpoint.png'
            /*anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,*/
        }))
    });

    carStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            src: iconUrl,
            anchor: [0.5, 0.8],
            opacity: 1,
        }))
    });

    lineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#1368AA',
            width: 5
        })
    });

    pointsStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            width: 2,
            color: 'white'
        }),
        stroke: new ol.style.Stroke({
            color: 'white',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 2,
            fill: new ol.style.Fill({
                color: 'white',
            })
        })

    });
}
/*轨迹回放参数*/
var trackLineLayer = [];
var trackPointLayer = [];
var trackStartLayer = [];
var trackEndLayer = [];
var trackSportLayer = [];
var startStyle, endStyle, carStyle, lineStyle, pointsStyle;
//轨迹描绘
//轨迹描绘
function AddLayer() {
    var lineFeature = new ol.Feature({//路线
        geometry: new ol.geom.LineString(positions, 'XY'),
    });
    lineFeature.setStyle(lineStyle);

    var trackLineSource = new ol.source.Vector({
        features: [lineFeature]
    });

    var trackLineLayers = new ol.layer.Vector({
        source: trackLineSource
    });
    map.addLayer(trackLineLayers);
    trackLineLayer.push(trackLineLayers);

    var extent = trackLineLayers.getSource().getExtent();//合适比例缩放居中
    map.getView().fit(extent, map.getSize());
}

//轨迹开始点描绘
function addStartPoint() {
    var startFeature = new ol.Feature({//车子
        geometry: new ol.geom.Point(positions[0]),
        population: 4000,
        rainfall: 500
    });
    startFeature.setStyle(startStyle);
    var startSource = new ol.source.Vector({
        features: [startFeature]
    });

    var startLayers = new ol.layer.Vector({
        source: startSource
    });
    map.addLayer(startLayers);
    trackStartLayer.push(startLayers);
}

//轨迹结束点描绘
function addEndPoint() {
    var endFeature = new ol.Feature({//车子
        geometry: new ol.geom.Point(positions[positions.length - 1]),
        population: 4000,
        rainfall: 500
    });
    endFeature.setStyle(endStyle);
    var endSource = new ol.source.Vector({
        features: [endFeature]
    });

    var endLayers = new ol.layer.Vector({
        source: endSource
    });
    map.addLayer(endLayers);
    trackEndLayer.push(endLayers);
}

//轨迹运动点描绘
function addCarPoint() {
    carFeature = new ol.Feature({//车子
        geometry: new ol.geom.Point(positions[0]),
        population: 4000,
        rainfall: 500
    });

    carFeature.setStyle(carStyle);

    var carSource = new ol.source.Vector({
        features: [carFeature]
    });

    var carLayers = new ol.layer.Vector({
        source: carSource
    });
    map.addLayer(carLayers);
    trackSportLayer.push(carLayers);
}

//轨迹点描绘
function AddPoints() {
    for (var i = 0; i < positions.length; i++) {
        /*角度计算方式*/
        //var x1 = positions[i][0];
        //var y1 = positions[i][1];
        //var x2 = positions[(i + 1)][0];
        //var y2 = positions[(i + 1)][1];
        //var x = Math.abs(x1 - x2);
        //var y = Math.abs(y1 - y2);
        //var z = Math.sqrt(x * x + y * y);
        //var angle = Math.round(parseFloat(Math.asin(y / z) / Math.PI * 180));
        var linePointsFeature = new ol.Feature({
            geometry: new ol.geom.Point(positions[i]),
            population: 4000,
            rainfall: 500,
        });

        linePointsFeature.setStyle(pointsStyle);

        var pointSource = new ol.source.Vector({
            features: [linePointsFeature]
        });
        var linePointLayers = new ol.layer.Vector({
            source: pointSource
        });
        map.addLayer(linePointLayers);
        trackPointLayer.push(linePointLayers);
    }
}

var elapsedTime;
var moveFeature = function (event) {
    var vectorContext = event.vectorContext;
    var frameState = event.frameState;
    if (animating == 1) {
        carFeature.setStyle(startStyle);
        carFeature.getGeometry().setCoordinates(positions[0]);
        elapsedTime = frameState.time - now;
        var index = Math.round(speed * elapsedTime / 1000);
        if (index >= positions.length) {
            stopAnimation(3);
            return;
        }
        var currentPoint = new ol.geom.Point(positions[index]);
        var feature = new ol.Feature(currentPoint);
        vectorContext.drawFeature(feature, carStyle);
        rememberIndex = index;
    } else if (animating == 2) {
        elapsedTime = frameState.time - now + remTime;
        rememberIndex = Math.round(speed * elapsedTime / 1000);
        var currentPoint = new ol.geom.Point(positions[rememberIndex]);
        if (rememberIndex >= positions.length) {
            stopAnimation(3);
            return;
        }
        var feature = new ol.Feature(currentPoint);
        vectorContext.drawFeature(feature, carStyle);
    }
    map.render();
};

//开始轨迹回放
function startAnimation(iconUrl) {
    if (animating == 3) {
        stopAnimation(3);
    } else {
        clearTrack();
        setStyle(iconUrl);
        AddLayer();
        AddPoints();
        addStartPoint();
        addEndPoint();
        addCarPoint();
        animating = 1;
        now = new Date().getTime();
        speed = speedInput.value;
        map.on('postcompose', moveFeature);
        map.render();
    }
}

//暂停轨迹播放
function suspendAnimation() {
    remTime = elapsedTime;
    animating = 2;
    carFeature.setStyle(carStyle);
    var coord = animating == 3 ? positions[positions.length - 1] : positions[rememberIndex];
    /** @type {ol.geom.Point} */ (carFeature.getGeometry())
     .setCoordinates(coord);
    //remove listener
    map.un('postcompose', moveFeature);
    map.render();
}

//重启轨迹播放
function restartAnimation() {
    if (animating == 2) {
        now = new Date().getTime();
        carFeature.setStyle(pointsStyle);
        map.on('postcompose', moveFeature);
        map.render();
    }
}


//停止轨迹回放
function stopAnimation(status) {
    if (status == 3) {
        animating = 1;
        carFeature.setStyle(carStyle);
        // if animation cancelled set the marker at the beginning
        var coord = animating == 1 ? positions[positions.length - 1] : positions[0];
        /** @type {ol.geom.Point} */ (carFeature.getGeometry())
          .setCoordinates(coord);
        //remove listener
        var dom = document.getElementById("palyTrackIcon").getElementsByTagName("li");
        dom[0].className = "";
        dom[0].className = "trackPanel-Icon palywhite";
        map.un('postcompose', moveFeature);
        map.render();
    } else {
        animating = 1;
        map.un('postcompose', moveFeature);
        map.render();
        clearTrack();
    }
}

//清除
function clearTrack() {
    if (trackLineLayer.length > 0) {
        for (var i = 0; i < trackLineLayer.length; i++) {
            map.removeLayer(trackLineLayer[i]);
        }
        trackLineLayer.slice(0, trackLineLayer.length);
    }
    if (trackPointLayer.length > 0) {
        for (var i = 0; i < trackPointLayer.length; i++) {
            map.removeLayer(trackPointLayer[i]);
        }
        trackPointLayer.slice(0, trackLineLayer.length);
    }
    if (trackStartLayer.length > 0) {
        for (var i = 0; i < trackStartLayer.length; i++) {
            map.removeLayer(trackStartLayer[i]);
        }
        trackStartLayer.slice(0, trackStartLayer.length);
    }
    if (trackEndLayer.length > 0) {
        for (var i = 0; i < trackEndLayer.length; i++) {
            map.removeLayer(trackEndLayer[i]);
        }
        trackEndLayer.slice(0, trackEndLayer.length);
    }
    if (trackSportLayer.length > 0) {
        for (var i = 0; i < trackSportLayer.length; i++) {
            map.removeLayer(trackSportLayer[i]);
        }
        trackSportLayer.slice(0, trackEndLayer.length);
    }
}
var speed, now;
//1播放,2暂停,3停止,4重启
var animating = 1;
var rememberIndex = 0;
var remTime = 0;
var speedInput = document.getElementById('speedvalue');
//清除覆盖物
function clearMulch() {
    map.removeOverlay(point_overlay);
    map.removeOverlay(template_overlay);
    map.removeOverlay(gridtemplate_overlay);
    var source = markerLayer.getSource();
    source.clear();

    if (rmbNoodleslayer.length > 0) {
        for (var i = 0; i < rmbNoodleslayer.length; i++) {
            map.removeLayer(rmbNoodleslayer[i]);
        }
        rmbNoodleslayer.splice(0, rmbNoodleslayer.length);//清空数组 
    }
    if (rmbCirclelayer.length > 0) {
        for (var i = 0; i < rmbCirclelayer.length; i++) {
            map.removeLayer(rmbCirclelayer[i]);
        }
        rmbCirclelayer.splice(0, rmbCirclelayer.length);//清空数组 
    }
    if (rmblinelayer.length > 0) {
        for (var i = 0; i < rmblinelayer.length; i++) {
            map.removeLayer(rmblinelayer[i]);
        }
        rmblinelayer.splice(0, rmblinelayer.length);//清空数组 
    }
}