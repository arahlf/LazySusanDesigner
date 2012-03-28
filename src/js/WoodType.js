Ext.define('LSD.WoodType', {

    config: {
        code: null,
        displayName: null,
        color: null
    },

    constructor: function(code, displayName, color) {
        this.callParent(arguments);

        this.initConfig({code: code, displayName: displayName, color: color});
    }
});