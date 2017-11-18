Ext.define('TianZun.model.mechanicalassessment.ScoreTableModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'deail', type: 'string'
        },
        { name: 'deduct', type: 'string', },
        { name: 'deductuserid', type: 'string', },
        { name: 'examinetime', type: 'datetime', },
    ]
});
