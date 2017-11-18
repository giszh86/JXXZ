Ext.define('TianZun.ux.ExportExcelButton', {//导出到Excel
    extend: 'Ext.button.Button',
    xtype: 'exportbtn',

    listeners: {
        click: function (obj) {
            var grid = obj.up('tabpanel') == null ? obj.up('form').down('grid') : obj.up('tabpanel').getActiveTab().down('grid');//grid：需导出grid组件
            var webapi = obj.webapi;//webapi:api接口地址
            var excelname = obj.excelname;//excelname:文件名字
            var exceltitle = obj.exceltitle;//exceltitle：excel标题
            var extrapra = obj.extrapra;//extrapra:扩展参数
            var formsubmit = obj.formsubmit;//formsubmit:post表格提交,true:是,false和null:否
            var isecharts = obj.isecharts;//isecharts:post提交图标,true:是,false和null:否
            var timeclose = obj.timeclose;//延迟关闭导出时间

            if (isecharts) {//导出图表,仅针对秀洲项目执法监管统计报表
                
                var image;
                var panel = obj.up('panel');

                var paneldom = panel.getEl().dom;
                var table = paneldom.getElementsByTagName('iframe')[0].contentWindow.document.getElementById('datatable');//table标签
                var canvas = paneldom.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName('canvas')[0];//canvas标签
                html2canvas(table, {
                    onrendered: function (canvasin) {

                        extrapra = { canvas1: canvasin.toDataURL("image/png"), canvas2: canvas.toDataURL("image/png") }

                        var bqstr = '';
                        for (var key in extrapra) {
                            bqstr += '<input type="hidden" name=' + key + ' value=' + extrapra[key] + '>';
                        }
                        if (obj.up('panel').down('panel[name=framepanel]') == null) {                            
                            obj.up('panel').add({
                                xtype: 'panel',
                                name: 'framepanel',
                                html: '<form name="formname" action=' + webapi + ' method="post" target="moonpiazza" ><input type="hidden" name="excelname" value=' + excelname + ' ><input type="hidden" name="exceltitle" value=' + exceltitle + ' />' + bqstr + '<input type="hidden" name="exceldata" value=' + arr + ' /><input type="hidden" name="filter" value=' + filters + ' /></form>'
                            })
                        }
                        var i = document.getElementsByTagName('form').length == 1 ? 0 : obj.excelname == '执法对象统计' ? 0 : 1;

                        var newwin = window.open("", "moonpiazza", "");
                        document.getElementsByTagName('form')[i].submit();
                        setTimeout(function () {
                            newwin.close();
                        }, 500)
                    }
                });

            } else {//导出表格

                var gridcol = grid.getColumns();
                var arr = [];
                Ext.each(gridcol, function (value, key) {
                    var columncode = 'columncode' + key;
                    var columnname = 'columnname' + key;
                    if (value.dataIndex != '' && value.dataIndex != undefined && value.dataIndex != null && value.dataIndex.length != 0) {
                        arr.push({ columncode: value.dataIndex, columnname: value.text.replace(/<\/?.+?>/g, "").replace(/&nbsp;/g, "") });
                    }

                })
                arr = JSON.stringify(arr);

                var filters = [];
                Ext.each(grid.getStore().getFilters().items, function (value, key) {
                    filters.push({ property: value['_property'], value: value['_value'] });
                })
                filters = JSON.stringify(filters);

                var extrastr = '';
                var bqstr = '';
                var formtitle = obj.up('tabpanel') == null ? 'tt' : obj.up('tabpanel').getActiveTab().title;
                for (var key in extrapra) {
                    extrastr += '&' + key + '=' + extrapra[key]
                    bqstr += '<input type="hidden" name=' + key + ' value=' + extrapra[key] + '>';
                }
                if (formsubmit) {
                    if (grid.up().down('panel[name=framepanel]') != null) {
                        grid.up().down('panel[name=framepanel]').destroy();
                    }

                    grid.up().add({
                        xtype: 'panel',
                        name: 'framepanel',
                        html: '<form name="formname' + formtitle + '" action=' + webapi + ' method="post" target="moonpiazza" ><input type="hidden" name="excelname" value=' + excelname + ' ><input type="hidden" name="exceltitle" value=' + exceltitle + ' />' + bqstr + '<input type="hidden" name="exceldata" value=' + arr + ' /><input type="hidden" name="filter" value=' + filters + ' /></form>'
                    })
                    var newwin = window.open("", "moonpiazza", "");
                    document.getElementsByTagName('form')['formname' + formtitle].submit();
                    setTimeout(function () {
                        newwin.close();
                    }, timeclose!=null?timeclose:1000)
                }
                else
                    window.open(webapi + '?excelname=' + excelname + '&exceltitle=' + exceltitle + '&exceldata=' + arr + '&filter=' + filters + extrastr)
            }
        }
    }
})