Ext.define('TianZun.store.qwmanager.PatrolAreaList', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.legalcase.CaseSource',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/PatrolArea/GetPatrolAreasList' + (configs.TOWNID == null ? '' : '?filter=[{"property":"sszd","value":' + configs.TOWNID + '}]'),
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    fields: [
         {
             name: 'areatypestr', type: 'string', convert: function (value,record) {
                 var areatypestr = "";
                 if (record.get('areatype') == 1) {
                     areatypestr = "人员巡查区域";
                 } else {
                     areatypestr = "车辆巡查区域";
                 }
                 return areatypestr;
             }
         },
    ],
    autoLoad: true
});