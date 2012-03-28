Ext.define('LSD.Diamond', {
    extend: 'Ext.draw.Sprite',

    angle: null,
    woodType: null,
    lastWoodType: null,

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

        this.lastWoodType = this.woodType;
    },

    getWoodType: function() {
        return this.woodType;
    },

    setWoodType: function(woodType) {
        this.lastWoodType = this.woodType;
        this.woodType = woodType;

        this.setAttributes({
            fill: woodType.getColor()
        }, true);
    },

    restorePreviousWoodType: function() {
        this.setWoodType(this.lastWoodType);
    }
});