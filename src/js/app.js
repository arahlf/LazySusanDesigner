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

    menuWindow.show();

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

    var diamonds = [];
    var startX = 325;
    var startY = 325;
    var x = startX;
    var y = startY;
    var side = 40;
    var height = side * Math.sin(45 * (Math.PI / 180));
    var draw = Ext.getCmp('foo');






    var addDiamond = function(x, y, rotation, color) {
        var baseColor = color || LSD.WoodTypes[0].getColor();

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

        sprite.addListener('mousedown', function(sprite, e) {
            if (e.ctrlKey === true) {
                Ext.each(rings, function(ring) {
                    if (Ext.Array.contains(ring, sprite)) {
                        Ext.each(ring, function(diamond) {
                            diamond.baseColor = ACTIVE_COLOR;

                            diamond.setAttributes({
                                fill: ACTIVE_COLOR,
                            }, true);
                        });
                    }
                });
            }
            else {
                sprite.baseColor = ACTIVE_COLOR;

                sprite.setAttributes({
                    fill: ACTIVE_COLOR,
                }, true);
            }
        });

        sprite.show(true);

        return sprite;
    }

    for (var quadrant = 0; quadrant < 8; quadrant++) {
        for (var ring = 0; ring < ringCount; ring++) {
            for (var i = ring; i >= 0; i--) {
                var xPos = startX + side * ring;
                var color;

                if (i !== 0) {
                    xPos += height * i - side * i;
                    color = '#f00';
                }

                if (ring == 3) {
                    color = '#0f0';
                }

                var diamond = addDiamond(xPos, y + i * height, quadrant * 45);

                if (!Ext.isArray(rings[ring])) {
                    rings[ring] = [];
                }

                rings[ring].push(diamond);
            }
        }
    }
});
