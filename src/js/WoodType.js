Ext.define('LSD.WoodType', {

    config: {
        displayName: null,
        color: null
    },

    constructor: function(displayName, color) {
        this.callParent(arguments);

        this.initConfig({displayName: displayName, color: color});
    }
});