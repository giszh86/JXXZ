Ext.define('TianZun.ux.ArcgisMapWindow', {
    extend: 'TianZun.ux.Window',
    xtype: 'uxarcgismapwindow',

    requires: [
        'TianZun.ux.Window'
    ],

    layout: 'fit',
    modal: true,
    initComponent: function () {
        var me = this;

        //參數
        var model = me.configs.model;
        var showModel = me.configs.showModel;
        var iuputControl = me.configs.iuputControl;
        var mapData = me.configs.mapData;

        arcgisMapLoaded = function () {
            if (showModel == 1) {
                addMapPoint(mapData);
            } else if (showModel == 2) {
                addMapPolyline(mapData);
            } else if (showModel == 3) {
                addMapPolygon(mapData);
            }
        }

        this.html = "<div style='width:600px;height:400px'><object id='arcgisMapApp' data='data:application/x-silverlight-2,' type='application/x-silverlight-2' width='100%' height='100%'><param name='source' value='ClientBin/ArcGISMapApp.xap' /><param name='onError' value='onSilverlightError' /><param name='background' value='white' /><param name='minRuntimeVersion' value='5.0.61118.0' /><param name='autoUpgrade' value='true' /><param name='initParams' value='mode=" + model + ",url=http://172.18.13.180/gisProxy/Tile/ArcGISFlex/HZTDTVECTORBLEND.gis,minx=120.082421100261,miny=30.1979580315871,maxx=120.280283961832,maxy=30.2858486565871' /></object></div>",


        this.buttons = [
            {
                text: '确定',
                hidden: function () {
                    if (model == 0) {
                        return true;
                    }
                }(),
                handler: function () {
                    var _mapData = getMapData();
                    iuputControl.setValue(_mapData);
                    mapWindow.close();
                }
            }, {
                text: '关闭',
                handler: function () {
                    me.close();
                }
            }
        ]

        this.callParent();
    }
});
