Ext.define('LSD.Command', {

    execute: function() {
        throw new Error('Must implement the {execute} method.');
    },

    undo: function() {
        throw new Error('Must implement the {undo} method.');
    }
});