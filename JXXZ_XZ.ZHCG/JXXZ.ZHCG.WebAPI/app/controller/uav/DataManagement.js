Ext.define('TianZun.controller.uav.DataManagement', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dataManagement',
    requires: [
       'TianZun.view.uav.datamanagement.DataManagementAdd',
       'TianZun.view.uav.datamanagement.DataManagementQuery',
    ],
    //查询
    onQuerysjgl: function (obj, e) {
        var win = this.getView().child("dataManagementQuery");
        if (!win) {
            win = Ext.create('widget.dataManagementQuery');
            this.getView().add(win);
        }
        win.show();

    },
    //新增
    onAddsjgl: function (obj, e) {
        var win = Ext.create('widget.dataManagementAdd');
        this.getView().add(win);
        win.show();
    },
    //取消
    onclosesjgl: function (obj) {
        var win = obj.up('window');
        win.hide();
    },
    onLook: function (obj, e) {
        var me = this;
        var grid = this.getView().down('panel[name=visitTab]').child('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var FullPath = record.get('FullPath');
        FullPath = FullPath.substring(2, FullPath.length);

        var songPlayer = new Ext.Window({
            layout: 'fit',
            width: 640,
            title: record.get('FileName'),
            height: 364,
            modal: true,
            frame: true,
            autoHeight: true,
            html: '<video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto"             poster="MY_VIDEO_POSTER.jpg" data-setup="{}" src="' + FullPath + '" data-setup="{"example_option":true}"><source src="' + FullPath + '" type="video/mp4"; codecs="avc1.42E01E, mp4a.40.2"></source></video>'
        });

       
        songPlayer.show();
    }
})