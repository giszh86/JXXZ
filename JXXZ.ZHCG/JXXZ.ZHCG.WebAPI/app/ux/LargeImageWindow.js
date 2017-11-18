Ext.define('TianZun.ux.LargeImageWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.largeImageWindow',
    title: '查看原图',
    layout: 'fit',
    autoShow: true,
    modal: true,
    fileUrl: null,
    maxWidth: 960,
    maxHeight: 590,
    constructor: function (fileUrl) {
        this.fileUrl = fileUrl;
        this.callParent();
    },
    initComponent: function () {
        var me = this;
        var maxWidth = 960;
        var maxHeight = 590;

        var img = new Image();
        img.src = this.fileUrl;

        var imgWidth = img.width; //图片实际宽度 
        var imgHeight = img.height; //图片实际宽度 
        var scale = imgHeight / imgWidth;

        if (maxWidth < imgWidth) {
            imgWidth = maxWidth;
            imgHeight = imgWidth * scale;
        }

        if (maxHeight < imgHeight) {
            imgHeight = maxHeight;
            imgWidth = imgHeight / scale;
        }

        this.width = 960;
        this.height = 590;

        // max-width:800px; max-height: 550px;
        this.items = [{
            xtype: 'image',
            src: this.fileUrl,
            style: "cursor: pointer;",
            //listeners: {
            //    el: {
            //        click: function () {
            //            window.open(me.fileUrl);
            //        }
            //    }
            //}
        }];

        this.callParent();
    }
});