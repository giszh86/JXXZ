Ext.define('TianZun.view.uav.basicinformation.InformationAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.informationAdd',
    title:'新增',
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
                        name:'createuserid',
                        value:$.cookie("USER_ID")
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>编号',
                        xtype: 'textfield',
                        name: 'ovanum',
                        allowBlank: false,
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
                        allowBlank:false
                    },
                    {
                        fieldLabel: '终端编号',
                        xtype: 'textfield',
                        name: 'device',
                    },
                    {
                        fieldLabel: '管理部门',
                        xtype: 'textfield',
                        name: 'unit',
                    }
                ],
            buttons: [{
                text: '提交',
                handler: 'onAddOK',
            },
            {
                text: '取消',
                handler: 'onClose',
            }]
        }]
        this.callParent();
    }

})