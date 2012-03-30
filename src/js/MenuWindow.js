Ext.define('LSD.MenuWindow', {
    extend: 'Ext.window.Window',

    width: 150,
    bodyPadding: 5,
    closable: false,
    resizable: false,

    selectedItemCls: 'lsd-menu-row-selected',
    selectedItem: null,

    initComponent: function() {
        this.addEvents('woodtypeselect');

        this.items = Ext.create('Ext.view.View', {
            store: LSD.WoodTypes,
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="lsd-menu-row">',
                        '<div class="lsd-color-selector" style="background-color: {color}"></div>',
                        '<span class="lsd-menu-text">{displayName}</span>',
                    '</div>',
                '</tpl>'
            ),
            itemSelector: '.lsd-menu-row',
            listeners: {
                itemclick: this.onMenuRowClick,
                scope: this
            }
        });

        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent(arguments);

        el = this.el.dom;
    },

    onMenuRowClick: function(dataView, record, item, index) {
        if (this.selectedItem !== null) {
            Ext.fly(this.selectedItem).removeCls(this.selectedItemCls);
        }

        Ext.fly(item).addCls(this.selectedItemCls);

        this.selectedItem = item;

        this.fireEvent('woodtypeselect', record);
    }
});