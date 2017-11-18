//创建地图
function CreateAarcgisMap(input_id, title, model, show_model, map_data,btobj) {
    
    var pointstr, htmlstr, map_data_c, draw_pub, mapWindow;
    if (model == 0)
        htmlstr = '';
    else if (model == 1)
        htmlstr = '<button title="画点" class="map-draw-style" onclick="addPointer(this);"></button><button title="清除" class="map-clearall-style" onclick="clearAll();"></button>';
    else if (model == 2)
        htmlstr = '<button title="画线" class="map-draw-style" onclick="addPolyline(this);"></button><button title="清除" class="map-clearall-style" onclick="clearAll();"></button>';
    else if (model == 3)
        htmlstr = '<button title="画面" class="map-draw-style" onclick="addPolygon(this);"></button><button title="清除" class="map-clearall-style" onclick="clearAll();"></button>';

    if (btobj == null)
    {
        mapWindow = new Ext.Window({
            title: title,
            layout: 'fit',
            autoShow: true,
            html: '<div id="map" class="map-map-base"></div><ul id="menu" class="map-map-ul">' + htmlstr + '<button title="全屏" class="map-fullscreen-style" onclick="fullScreenFS();"></button></ul>',
            buttons: [
                {
                    text: '确定',
                    hidden: function () {
                        if (model == 0) {
                            return true;
                        }
                    }(),
                    handler: function (obj) {
                        var mapData = obj.up('window').geometryArr;
                        Ext.getCmp(input_id).setValue(mapData);
                        mapWindow.close();
                    }
                }, {
                    text: '关闭',
                    handler: function () {
                        mapWindow.close();
                    }
                }
            ],
        });
    } else
    {
        mapWindow = new Ext.panel.Panel({
            layout: 'fit',
            name:'mapPanel',
            autoShow: true,
            autoRender: true,
            html: '<div id="map" class="map-map-base-xzsp"></div><ul id="menu" class="map-map-ul">' + htmlstr + '<button title="全屏" class="map-fullscreen-style" onclick="fullScreenFS();"></button></ul>',
        });
        btobj.add(mapWindow);
    }

    if (show_model == 1)
        map_data_c = map_data;
    else
        map_data_c = map_data.split(';')[0];

    var oMap = new OpenlayerMap({
        containerId: 'map',
        center: map_data == '' ? [120.70470350244467, 30.767954215582677] : [parseFloat(map_data_c.split(',')[0]), parseFloat(map_data_c.split(',')[1])],
        zoom: 13,
        modelExtra: map_data != '' ? model : null,
        showModelExtra: show_model,
        valueExtra: (map_data != '') ? getValueSt(map_data) : null
    });


    function setValue(arr) {
        var st = arr.toString();
        st = st.replace(/(\d+(\.\d+)?,\d+(\.\d+)?)(,|$)/g, '$1;');
        pointstr = st;
    }

    function getValue(type) {
        var st = pointstr;
        var arr = []
        var mat = st.match(/\d+(\.\d+)?/g);
        for (var i = 1; i < mat.length; i += 2) {
            var x = parseFloat(mat[i - 1]);
            var y = parseFloat(mat[i]);
            arr.push([x, y]);
        }
        if (type == 0)
            mapWindow.geometryArr = st;
        else
            mapWindow.geometryArr = arr;

        if (btobj != null)
        {
            btobj.down('hidden').setValue(mapWindow.geometryArr);
        }
        return arr;
    }

    function getValueSt(st) {
        var str = '';
        var mat = st.match(/\d+(\.\d+)?/g);
        for (var i = 1; i < mat.length; i += 2) {
            var x = parseFloat(mat[i - 1]);
            var y = parseFloat(mat[i]);
            str += '['+x+','+y+'],'
        }
        str = str.substr(0,str.length-1);
        return str;
    }

    //画点
    self.addPointer = function (button) {
        if ($(button).attr('class') == 'map-draw-style')
            $(button).attr('class', 'map-draw-focus-style');
        else
            $(button).attr('class', 'map-draw-style');

        var draw = new ol.interaction.Draw({ //创建画笔
            features: [],
            type: 'Point',
            style: new ol.style.Style({}) //样式
        });

        if ($(button).attr('class') == 'map-draw-style') {
            oMap.map.removeInteraction(draw); //移除画线
            oMap.map.removeInteraction(draw_pub); //移除画线
        }
        else {
            draw.on('drawend', function (evt) {
                var lines = evt.feature.getGeometry().getCoordinates();
                setValue(lines);
                oMap.clearMarker();
                var arr = getValue(1);
                var marker = oMap.addMarker({
                    x: arr[0][0],
                    y: arr[0][1]
                });
                draw_pub = draw;
            });

            oMap.map.addInteraction(draw);
        }
    }

    //画线
    self.addPolyline = function (button) {
        if ($(button).attr('class') == 'map-draw-style')
            $(button).attr('class', 'map-draw-focus-style');
        else
            $(button).attr('class', 'map-draw-style');

        var draw = new ol.interaction.Draw({ //创建画笔
            features: [],
            type: 'LineString',
            style: new ol.style.Style({ //样式
                stroke: new ol.style.Stroke({
                    color: '#ff0000',
                    width: 3
                }),
            })
        });

        if ($(button).attr('class') == 'map-draw-style') {
            oMap.map.removeInteraction(draw); //移除画线
            oMap.map.removeInteraction(draw_pub); //移除画线
        }
        else {
            draw.on('drawend', function (evt) {
                var lines = evt.feature.getGeometry().getCoordinates();
                setValue(lines);
                oMap.clearLine();
                var arr = getValue(0);
                oMap.addLine(arr);
                draw_pub = draw;
            });

            oMap.map.addInteraction(draw);
        }
    }

    //画面
    self.addPolygon = function (button) {
        if ($(button).attr('class') == 'map-draw-style')
            $(button).attr('class', 'map-draw-focus-style');
        else
            $(button).attr('class', 'map-draw-style');

        var draw = new ol.interaction.Draw({ //创建画笔
            features: [],
            type: 'Polygon',
            style: new ol.style.Style({ //画笔在绘制过程中的样式
                fill: new ol.style.Fill({
                    color: 'rgba(44, 143, 227, 0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgb(44, 143, 227)',
                    width: 3
                }),

            })
        });

        if ($(button).attr('class') == 'map-draw-style') {
            oMap.map.removeInteraction(draw); //移除画线
            oMap.map.removeInteraction(draw_pub); //移除画线
        }
        else {
            draw.on('drawend', function (evt) {
                var lines = evt.feature.getGeometry().getCoordinates();
                setValue(lines);
                oMap.clearPolygon();
                var arr = getValue(0);
                var option = {
                    color: [255, 0, 0, 0.5], //多边形线条颜色
                    fillColor: [255, 0, 0, 0.5], //填充颜色
                    center: null,
                    width: 3,
                    click: undefined,
                    move: undefined
                };
                oMap.addPolygon(arr, option);
                draw_pub = draw;
            });

            oMap.map.addInteraction(draw);
        }
    }

    //清除
    self.clearAll = function () {
        oMap.clearLine();
        oMap.clearMarker();
        oMap.clearPolygon();
    }

    //全屏
    self.fullScreenFS = function () {
        $('#map').css('width', '100%');
        $('#map').css('height', '100%');
        $('.ol-full-screen-false').click();
    }
}