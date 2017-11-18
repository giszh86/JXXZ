Ext.define('TianZun.view.uav.basicinformation.InformationEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.informationEdit',
    title:'编辑',
    layout: 'fit',
    
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 550,
            overflowY: 'auto',
           
                layout: {
                    type: 'table',
                    columns:2,
                },
                fieldDefaults: {
                    labelAlign: "right",
                    labelWidth:100,
                },
                defaults: {
                    xtype: 'textfield',
                    width:250
                },
                items: [
                    {
                        xtype: 'hidden',
                        name: 'ovaid',
                        value: this.record.ovaid,
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>编号',
                        xtype: 'textfield',
                        name: 'ovanum',
                        allowBlank: false,
                        value: this.record.ovanum,
                        //validator: function (v)
                        //{
                        //    var num = /^[0-9]*$/;
                        //    if (!num.test(v))
                        //    {
                        //        return "编号为数字，请核对！";
                        //    }
                        //    else
                        //    {
                        //        return true;
                        //    }
                        //}
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>设备名称',
                        xtype: 'textfield',
                        name: 'ovaname',
                        allowBlank: false,
                        value: this.record.ovaname
                    },
                    {
                        fieldLabel: '终端编号',
                        xtype: 'textfield',
                        name: 'device',
                        value: this.record.device
                    },
                    {
                        fieldLabel: '管理部门',
                        xtype: 'textfield',
                        name: 'unit',
                        value: this.record.unit
                    }
                ],
            buttons: [{
                text: '提交',
                handler: 'onEditOK',
            },
            {
                text: '取消',
                handler: 'onClose',
            }]
        }]
        this.callParent();
    }

})