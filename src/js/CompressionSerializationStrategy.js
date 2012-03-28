Ext.define('LSD.CompressionSerializationStrategy', {
    extend: 'LSD.SerializationStrategy',

    serialize: function(lazySusan) {
        var diamonds = lazySusan.getAllDiamonds();
        var sb = [], diamond;
        var currentCode;
        var currentCount = 0;

        for (var d = 0; d < diamonds.length; d++) {
            diamond = diamonds[d];

            var code = diamond.getWoodType().getCode();

            if (currentCode === undefined) {
                currentCode = code;
                currentCount = 1;
            }
            else if (code === currentCode) {
                currentCount++;
            }
            else {
                if (currentCount > 1) {
                    sb.push(currentCount);
                }

                sb.push(code);

                currentCode = code;
                currentCount = 1;
            }
        }

        if (currentCount > 1) {
            sb.push(currentCount);
        }
        sb.push(currentCode);

        return sb.join('');
    },

    deserialize: function(lazySusan) {
        function getWoodType(code) {
            for (var i = 0; i < LSD.WoodTypes.length; i++) {
                var woodType = LSD.WoodTypes[i];

                if (woodType.getCode() === code) {
                    return woodType;
                }
            }

            throw new Error('Unrecognized wood type code: ' + code);
        }

        var str = '3k3y2b216b';
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
            var woodType = getWoodType(code);

            for (var i = 0; i < count; i++) {
                var diamond = diamonds.shift();
                diamond.setWoodType(woodType);
            }
        }
    }
});