Ext.define('LSD.CompressionSerializer', {
    extend: 'LSD.Serializer',

    serialize: function(lazySusan) {
        var diamonds = lazySusan.getAllDiamonds();
        var sb = [], diamond;
        var currentCode;
        var count = 0;

        for (var d = 0; d < diamonds.length; d++) {
            diamond = diamonds[d];

            var code = diamond.getWoodType().getCode();

            if (currentCode === undefined) {
                currentCode = code;
                count = 1;
            }
            else if (code === currentCode) {
                count++;
            }
            else {
                if (count > 1) {
                    sb.push(count);
                }

                sb.push(currentCode);

                currentCode = code;
                count = 1;
            }
        }

        if (count > 1) {
            sb.push(count);
        }
        sb.push(currentCode);

        return sb.join('');
    },

    deserialize: function(lazySusan, serializedForm) {
        var str = serializedForm;
        var diamonds = lazySusan.getAllDiamonds();

        while (str.length > 0) {
            var count = 1;
            var match = str.match(/^\d+/);

            if (match != null) {
                count = parseInt(match[0], 10);
                str = str.substr(match[0].length);
            }

            var code = str.slice(0, 1);
            str = str.substr(1);
            var woodType = LSD.WoodTypes.findRecord('code', code);

            for (var i = 0; i < count; i++) {
                var diamond = diamonds.shift();
                diamond.setWoodType(woodType);
            }
        }
    }
});