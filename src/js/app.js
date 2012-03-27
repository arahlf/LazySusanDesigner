Ext.onReady(function() {
    var ringCount = 7;
    var selectedRow = null;
    var rings = [];
    var rows = [];

    Ext.each(LSD.WoodTypes, function(value) {
        rows.push({
            xtype: 'container',
            padding: 3,
            layout: 'hbox',
            items: [{
                xtype: 'component',
                height: 25,
                color: value.getColor(),
                cls: 'lsd-menu-row',
                html: '<div class="lsd-color-selector" style="background-color: ' + value.getColor() + '"></div><span class="lsd-menu-text">' + value.getDisplayName() + '</span>'
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

        ACTIVE_COLOR = row.color;

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
        diamond.setAttributes({
            fill: ACTIVE_COLOR
        }, true);
    });

    lazySusan.on('diamondmouseout', function(diamond, lazySusan, e) {
        diamond.setAttributes({
            fill: diamond.baseColor
        }, true);
    });

    lazySusan.on('diamondmousedown', function(diamond, lazySusan, e) {
        if (e.ctrlKey === true) {
            var ring = lazySusan.getRingFromDiamond(diamond);

            Ext.each(ring, function(d) {
                d.baseColor = ACTIVE_COLOR;
                d.setAttributes({
                    fill: ACTIVE_COLOR,
                }, true);
            });
        }
        else {
            diamond.baseColor = ACTIVE_COLOR;
            diamond.setAttributes({
                fill: ACTIVE_COLOR,
            }, true);
        }
    });
});
