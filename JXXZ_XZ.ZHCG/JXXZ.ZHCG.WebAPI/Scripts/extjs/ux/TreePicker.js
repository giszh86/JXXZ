Ext.define('Ext.ux.TreePicker', {
    extend: 'Ext.form.field.Picker',
    xtype: 'treepicker',

    uses: [
        'Ext.tree.Panel'
    ],

    triggerCls: Ext.sysCSSPrefix + 'form-arrow-trigger',

    config: {
        /**
         * @cfg {Ext.data.TreeStore} store
         * A tree store that the tree picker will be bound to
         */
        store: null,

        /**
         * @cfg {String} displayField
         * The field inside the model that will be used as the node's text.
         * Defaults to the default value of {@link Ext.tree.Panel}'s `displayField` configuration.
         */
        displayField: null,
        valueField: null,

        /**
         * @cfg {Array} columns
         * An optional array of columns for multi-column trees
         */
        columns: null,

        /**
         * @cfg {Boolean} selectOnTab
         * Whether the Tab key should select the currently highlighted item. Defaults to `true`.
         */
        selectOnTab: true,

        /**
         * @cfg {Number} maxPickerHeight
         * The maximum height of the tree dropdown. Defaults to 300.
         */
        maxPickerHeight: 300,

        /**
         * @cfg {Number} minPickerHeight
         * The minimum height of the tree dropdown. Defaults to 100.
         */
        //minPickerHeight: 100
    },

    editable: false,

    initComponent: function () {
        var me = this;
        var value = me.value;

        me.callParent(arguments);

        me.mon(me.store, {
            scope: me,
            load: function (store) {
                //var picker = me.getPicker();
                //var div = picker.getEl().dom.querySelector(".x-grid-item-container")
                //div.className = "";
                //picker.getEl().dom.querySelector(".x-tree-view").style.maxHeight = '150px';

                if (value == null)
                    return;

                var rawValue = "";
                var rootNode = store.getRootNode();
                rootNode.cascadeBy(function (node) {
                    if (node.isRoot())
                        return;

                    if ($.inArray(node.get(me.valueField), value) != -1) {
                        node.data['checked'] = true;

                        if (rawValue != "") {
                            rawValue = rawValue + "," + node.get(me.displayField);
                        }
                        else {
                            rawValue = node.get(me.displayField);
                        }
                    }

                });

                me.setRawValue(rawValue);
            }
        });

        me.getStore().load();
    },

    createPicker: function () {
        var me = this,
            picker = new Ext.tree.Panel({
                sysCls: Ext.sysCSSPrefix + 'boundlist',
                bodyCls: 'treepicker',
                shrinkWrapDock: 2,
                checkModel: 'single',
                store: me.store,
                floating: true,
                displayField: me.displayField,
                valueField: me.valueField,
                columns: me.columns,
                minHeight: me.minPickerHeight,
                maxHeight: 150,
                manageHeight: false,
                shadow: false,
                rootVisible: false,
                scrollable: true,
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick,
                    itemkeydown: me.onPickerKeyDown
                }
            }),
            view = picker.getView();

        if (Ext.isIE9 && Ext.isStrict) {
            // In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
            // Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    },

    /**
     * repaints the tree view
     */
    repaintPickerView: function () {
        var style = this.picker.getView().getEl().dom.style;

        // can't use Element.repaint because it contains a setTimeout, which results in a flicker effect
        style.display = style.display;
    },

    /**
     * Handles a click even on a tree node
     * @private
     * @param {Ext.tree.View} view
     * @param {Ext.data.Model} record
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.event.Event} e
     */
    onItemClick: function (view, record, node, rowIndex, e) {
        this.selectItem(view, record);
    },

    /**
     * Handles a keypress event on the picker element
     * @private
     * @param {Ext.event.Event} e
     * @param {HTMLElement} el
     */
    onPickerKeyDown: function (view, record, item, index, e) {
        var key = e.getKey();

        if (key === e.ENTER || (key === e.TAB && this.selectOnTab)) {
            this.selectItem(view, record);
        }
    },

    /**
     * Changes the selection to a given record and closes the picker
     * @private
     * @param {Ext.data.Model} record
     */
    selectItem: function (view, record) {
        var me = this;

        if (me.checkModel != 'single') {
            if (record.get("checked") != true) {
                record.set("checked", true);
            }
            else {
                record.set("checked", false);
            }
        }
        var value = new Array();
        var rawValue = "";
        var store = view.getStore();
        var rootNode = store.getRootNode();

        if (me.checkModel != 'single') {
            //级联多选
            rootNode.cascadeBy(function (node) {
                if (node.isRoot())
                    return;

                if (node.get("checked") == true) {
                    if (rawValue != "") {
                        rawValue = rawValue + "," + node.get(me.displayField);
                    }
                    else {
                        rawValue = node.get(me.displayField);
                    }
                    value.push(node.get(me.valueField));
                }
            });
        } else {
            value.push(record.get('ID'));
            rawValue = record.get('Name');
        }
        me.setRawValue(rawValue);
        me.setValue(value);
    },

    /**
     * Sets the specified value into the field
     * @param {Mixed} value
     * @return {Ext.ux.TreePicker} this
     */
    setValue: function (value) {
        this.value = value;
    },

    /**
     * Returns the current data value of the field (the idProperty of the record)
     * @return {Number}
     */
    getValue: function () {
        return this.value;
    }
});