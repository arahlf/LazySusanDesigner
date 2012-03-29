Ext.define('LSD.WoodChangeCommand', {
    extend: 'LSD.Command',

    constructor: function(diamond, newWoodType) {
        Ext.apply(this, {
            _diamond: diamond,
            _newWoodType: newWoodType,
            _oldWoodType: diamond.getWoodType()
        });
    },

    execute: function() {
        this._diamond.setWoodType(this._newWoodType);
    },

    undo: function() {
        this._diamond.setWoodType(this._oldWoodType);
    }
});