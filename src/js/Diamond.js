Ext.define('LSD.Diamond', {
    extend: 'Ext.draw.Sprite',

    angle: null,
    woodType: null,

    type: 'path',

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
            shortSide = config.side * config.angle;

        config.woodType = LSD.WoodTypes.first();

        config.path = this.tpl.apply({ side: side, shortSide: shortSide, x: config.x, y: config.y });
        config.fill = config.woodType.getColor();

        this.callParent(arguments);
    },

    getWoodType: function() {
        return this.woodType;
    },

    setWoodType: function(woodType) {
        this.woodType = woodType;

        this.setColor(woodType.getColor());
    },

    setColor: function(color) {
        this.setAttributes({
            fill: color
        }, true);
    }
});