Ext.define('LSD.Diamond', {
    extend: 'Ext.draw.Sprite',

    type: 'path',

    angle: Math.sin(45 * (Math.PI / 180)),

    tpl: new Ext.XTemplate(
                'M{x} {y} ',
                'L{[values.x+values.side]} {y} ',
                'L{[values.x+values.side+values.shortSide]} {[values.y+values.shortSide]} ',
                'L{[values.x+values.shortSide]} {[values.y+values.shortSide]} ',
                'L{x} {y} ',
                'Z'
    ),

    constructor: function(config) {
        var side = config.side,
            shortSide = config.side * this.angle;

        config.path = this.tpl.apply({ side: side, shortSide: shortSide, x: config.x, y: config.y });

        this.callParent(arguments);
    }

});