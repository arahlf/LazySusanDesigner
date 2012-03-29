Ext.define('LSD.Serializer', {

    serialize: function(lazySusan) {
        throw new Error('Must implement the {serialize} method.');
    },

    deserialize: function(lazySusan, serializedForm) {
        throw new Error('Must implement the {deserialize} method.');
    }
});