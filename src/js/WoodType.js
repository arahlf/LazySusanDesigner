Ext.define('LSD.WoodType', {
    extend: 'Ext.data.Model',

    fields: ['code', 'displayName', 'color'],

    getCode: function() {
        return this.get('code');
    },

    getColor: function() {
        return this.get('color');
    },

    getDisplayName: function() {
        return this.get('displayName');
    }
});