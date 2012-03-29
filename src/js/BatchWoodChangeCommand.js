Ext.define('LSD.BatchWoodChangeCommand', {
    extend: 'LSD.Command',

    constructor: function(diamonds, newWoodType) {
        this._commands = [];

        for (var i = 0; i < diamonds.length; i++) {
            var diamond = diamonds[i];

            this._commands.push(new LSD.WoodChangeCommand(diamond, newWoodType));
        }
    },

    execute: function() {
        for (var i = 0; i < this._commands.length; i++) {
            this._commands[i].execute();
        }
    },

    undo: function() {
        for (var i = 0; i < this._commands.length; i++) {
            this._commands[i].undo();
        }
    }
});