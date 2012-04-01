Ext.define('LSD.MenuWindow', {
    extend: 'Ext.window.Window',

    width: 150,
    bodyPadding: 5,
    closable: false,
    resizable: false,

    loaded: false,
    selectedItemCls: 'lsd-menu-row-selected',
    selectedItem: null,

    initComponent: function() {
        this.addEvents('woodtypeselect');

        var dataView = this.dataView = Ext.create('Ext.view.View', {
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
                itemclick: this.changeSelection,
                scope: this
            }
        });

        dataView.on('refresh', function() {
            this.loaded = true;
        }, this, { single: true });

        this.items = dataView;

        this.callParent(arguments);
    },

    selectWoodType: function(woodType) {
        var me = this;

        function changeSelection() {
            var storeIndex = LSD.WoodTypes.indexOf(woodType);
            var menuItem = me.el.select('.lsd-menu-row').item(storeIndex).dom;
            
            me.changeSelection(me, woodType, menuItem);
        }

        if (this.loaded) {
            changeSelection();
        }
        else {
            this.dataView.on('refresh', function() {
                changeSelection();
            }, this, { single: true });
        }
    },

    changeSelection: function(dataView, record, item) {
        if (this.selectedItem !== null) {
            Ext.fly(this.selectedItem).removeCls(this.selectedItemCls);
        }

        Ext.fly(item).addCls(this.selectedItemCls);

        this.selectedItem = item;

        this.fireEvent('woodtypeselect', record);
    }
});