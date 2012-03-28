Ext.define('LSD.SerializationStrategy', {

    serialize: function(lazySusan) {
        throw new Error('Must implement the {serialize} method.');
    },

    deserialize: function(lazySusan) {
        throw new Error('Must implement the {deserialize} method.');
    }
});