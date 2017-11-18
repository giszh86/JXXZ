﻿Ext.define('TianZun.model.reportcenter.AddUp.AddUpstrawAndWasteControlModel', {
    extend: 'Ext.data.Model',
    idProperty: 'taskId',
    fields: [
               { name: 'month', type: 'string' },
               { name: 'cdzfry', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'cdzfcl', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'kzzfxccs1', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'kzzfdccs', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'kzzfxccs2', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'fxczmhd', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'ghmj1', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'ghmj2', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'fxysjtd', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'fxczs', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'ltfsjgla', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'ltfsjgja', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'ltfsjgsjsjfk', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'nyjyla', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'nyjyja', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'nyjysjsjfmk', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'fscsljla', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'fscsljja', type: 'float', convert: function (value) { return value == null ? 0 : value } },
               { name: 'fscsljsjsjfmk', type: 'float', convert: function (value) { return value == null ? 0 : value } },
    ],
})