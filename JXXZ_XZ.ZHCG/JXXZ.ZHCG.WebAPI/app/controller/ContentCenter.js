Ext.define('TianZun.controller.ContentCenter', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contentCenter',

    //关闭
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    }
});