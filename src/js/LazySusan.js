Ext.define('LSD.LazySusan', {
    extend: 'Ext.draw.CompositeSprite',

    centerX: 325,
    centerY: 325,
    diamondSize: 40,
    quadrants: 8, // calculate angle based off of this
    ringCount: 7,

    constructor: function() {
        this.callParent(arguments);

        this.addEvents('diamondmouseover', 'diamondmouseout', 'diamondmousedown');

        this.rings = [];
        this.diamondAngle = Math.sin((360 / this.quadrants) * (Math.PI / 180));
        this.diamondHeight = this.diamondSize * this.diamondAngle;

        for (var quadrant = 0; quadrant < this.quadrants; quadrant++) {
            for (var ring = 0; ring < this.ringCount; ring++) {
                for (var i = ring; i >= 0; i--) {
                    var xPos = this.centerX + this.diamondSize * ring;

                    if (i !== 0) {
                        xPos += this.diamondHeight * i - this.diamondSize * i;
                    }

                    var diamond = this.createDiamond(xPos, this.centerY + i * this.diamondHeight, quadrant * 45);

                    diamond.on('mouseover', this.onDiamondMouseOver, this);
                    diamond.on('mouseout', this.onDiamondMouseOut, this);
                    diamond.on('mousedown', this.onDiamondMouseDown, this);

                    if (!Ext.isArray(this.rings[ring])) {
                        this.rings[ring] = [];
                    }

                    this.rings[ring].push(diamond);
                    this.surface.add(diamond); // not sure why I have to call this -- the composite should take care of it imo
                    this.add(diamond);
                }
            }
        }

        this.show(true);
    },

    getRingFromDiamond: function(diamond) {
        for (var i = 0; i < this.rings.length; i++) {
            var ring = this.rings[i];

            if (Ext.Array.contains(ring, diamond)) {
                return ring;
            }
        }
    },

    serialize: function() {
        return null;
    },

    createDiamond: function(x, y, rotation) {
        return Ext.create('LSD.Diamond', {
            x: x,
            y: y,
            side: this.diamondSize,
            fill: '#f00',
            baseColor: '#f00',
            shortSide: this.diamondHeight,
            rotate: {
                x: this.centerX,
                y: this.centerY,
                degrees: rotation
            }
        });
    },

    onDiamondMouseOver: function(diamond, e) {
        this.fireEvent('diamondmouseover', diamond, this, e);
    },

    onDiamondMouseOut: function(diamond, e) {
        this.fireEvent('diamondmouseout', diamond, this, e);
    },

    onDiamondMouseDown: function(diamond, e) {
        this.fireEvent('diamondmousedown', diamond, this, e);
    }
});