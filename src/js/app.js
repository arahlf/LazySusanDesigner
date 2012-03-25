Ext.onReady(function() {

    var panel = Ext.create('Ext.panel.Panel', {
        title: 'Lazy Susan Designer',
        layout: 'fit',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'lsd-icon-paintcan'
            }]
        }],
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
    var startX = 400;
    var startY = 300;
    var x = startX;
    var y = startY;
    var side = 50;
    var height = side * Math.sin(45 * (Math.PI / 180));
    var tpl = new Ext.XTemplate('M{x} {y} L{[values.x+values.side]} {y} L{[values.x+values.side+values.height]} {[values.y+values.height]} L{[values.x+values.height]} {[values.y+values.height]} L{x} {y} Z');
    var draw = Ext.getCmp('foo');
    var colors = ['#f00', '#0f0', '#00f', '#f00', '#0f0', '#00f', '#f00', '#0f0', '#00f'];

    var addSprite = function(x, rotation, ring) {
        var path = tpl.apply({ x: x, y: y, side: side, height: height });

        var sprite = draw.surface.add({
            type: 'path',
            path: path,
            fill: colors[ring],
            rotate: {
                x: startX,
                y: y,
                degrees: rotation
            }
        });

        sprite.show(true);
    };

    called = 0;

    var addDiamond = function(x, y, rotation, ring) {
        var path = tpl.apply({ x: x, y: y, side: side, height: height });
        called++;
        var sprite = draw.surface.add({
            type: 'path',
            path: path,
            fill: colors[ring],
            rotate: {
                x: startX,
                y: startY,
                degrees: rotation
            }
        });

        sprite.addListener('mousedown', function(sprite) {
            sprite.setAttributes({
                fill: '#000'   
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