Ext.define('TianZun.ux.Window', {
    extend: 'Ext.Window',
    xtype: 'uxwindow',
    layout: 'fit',
    maxHeight: 550,
    listeners: {
        show: function (win) {
            var w = win.getWidth();
            var h = win.getHeight();

            var x = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;

            var y = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;

            win.setX((x - w) / 2);
            win.setY((y - h) / 4);
            Mask();
        },
        close: function (win) {
            var uploadfile = win.down('uploadpanel');
            if (uploadfile) {
                uploadfile.store.removeAll();
            }
            UnMask();

        },
        hide: function (win) {
            var uploadfile = win.down('uploadpanel');
            if (uploadfile) {
                uploadfile.store.removeAll();
            }
            UnMask();
        }
    }
});