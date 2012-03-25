Ext.onReady(function() {
    var ACTIVE_COLOR = LSD.WoodTypes[0].getColor();
    var selectedRow = null;

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
        width: 135,
        height: 225,
        bodyPadding: 5,
        items: rows
    });

    menuWindow.show();

    var selectRow = function(event, dom) {
        var row = Ext.getCmp(dom.parentNode.id);

        ACTIVE_COLOR = row.color;

        if (selectedRow != null) {
            selectedRow.removeCls('lsd-menu-row-active');
        }

        row.addCls('lsd-menu-row-active');
        selectedRow = row;
    }


    menuWindow.el.on('mousedown', selectRow, window, {
        delegate: '.lsd-color-selector'
    });

    selectRow(null, Ext.select('.lsd-color-selector').first().dom);


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

    var diamonds = [];
    var startX = 325;
    var startY = 325;
    var x = startX;
    var y = startY;
    var side = 40;
    var height = side * Math.sin(45 * (Math.PI / 180));
    var draw = Ext.getCmp('foo');






    var addDiamond = function(x, y, rotation, ring) {
        var baseColor = LSD.WoodTypes[1].getColor();

        var sprite = draw.surface.add(Ext.create('LSD.Diamond', {
            fill: baseColor,
            baseColor: baseColor,
            x: x,
            y: y,
            side: side,
            shortSide: height,
            rotate: {
                x: startX,
                y: startY,
                degrees: rotation
            }
        }));

        sprite.addListener('mouseout', function(sprite) {
            sprite.setAttributes({
                fill: sprite.baseColor
            }, true);
        });

        sprite.addListener('mouseover', function(sprite) {
            sprite.setAttributes({
                fill: ACTIVE_COLOR
            }, true);
        });

        sprite.addListener('mousedown', function(sprite) {
            sprite.baseColor = ACTIVE_COLOR;

            sprite.setAttributes({
                fill: ACTIVE_COLOR,
            }, true);
        });

        sprite.show(true);
    }

    var rings = 7;

    for (var quadrant = 0; quadrant < 8; quadrant++) {
        for (var row = 0; row < rings; row++) {
            for (var col = 0; col < rings - row; col++) {
                addDiamond(startX + side * col + (row * height), y + row * height, quadrant * 45, row);
            }
        }
    }
});