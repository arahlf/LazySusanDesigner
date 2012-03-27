Ext.onReady(function() {
    var selectedRow = null;
    var selectedWoodType = LSD.WoodTypes[0];
    var rows = [];

    Ext.each(LSD.WoodTypes, function(woodType) {
        rows.push({
            xtype: 'container',
            padding: 3,
            layout: 'hbox',
            items: [{
                xtype: 'component',
                height: 25,
                woodType: woodType,
                cls: 'lsd-menu-row',
                html: '<div class="lsd-color-selector" style="background-color: ' + woodType.getColor() + '"></div><span class="lsd-menu-text">' + woodType.getDisplayName() + '</span>'
            }]
        })
    });

    var menuWindow = Ext.create('Ext.window.Window', {
        width: 150,
        height: 225,
        bodyPadding: 5,
        items: rows
    });

    menuWindow.showAt(700, 250);

    var selectRow = function(event, dom) {
        var row = Ext.getCmp(dom.id);

        selectedWoodType = row.woodType;

        if (selectedRow != null) {
            selectedRow.removeCls('lsd-menu-row-active');
        }

        row.addCls('lsd-menu-row-active');
        selectedRow = row;
    }


    menuWindow.el.on('mousedown', selectRow, window, {
        delegate: '.lsd-menu-row'
    });

    selectRow(null, Ext.select('.lsd-menu-row').item(3).dom);


    var panel = Ext.create('Ext.panel.Panel', {
        title: 'Lazy Susan Designer',
        bodyStyle: 'background-color: #cecece',
        layout: 'fit',
        items: [{
            xtype: 'draw',
            viewBox: false,
            id: 'foo'
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        items: panel
    });

    var draw = Ext.getCmp('foo');

    var lazySusan = Ext.create('LSD.LazySusan', {
        surface: draw.surface
    });

    lazySusan.on('diamondmouseover', function(diamond, lazySusan, e) {
        diamond.setWoodType(selectedWoodType);
    });

    lazySusan.on('diamondmouseout', function(diamond, lazySusan, e) {
        diamond.restorePreviousWoodType();
    });

    lazySusan.on('diamondmousedown', function(diamond, lazySusan, e) {
        if (e.ctrlKey === true) {
            var ring = lazySusan.getRingFromDiamond(diamond);

            for (var i = 0; i < ring.length; i++) {
                ring[i].setWoodType(selectedWoodType);
            }
        }
        else {
            diamond.setWoodType(selectedWoodType);
        }
    });
});
