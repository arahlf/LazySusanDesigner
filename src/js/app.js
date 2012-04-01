// http://arahlf/LazySusanDesigner/#kmkmkmkmykymykymykymykym2yk2ym2yk2ym2yk2ym2yk2ymby2pby2pby2pby2pby2pby2pby2pby2pk2bp2k2bp2k2bp2k2bp2k2bp2k2bp2k2bp2k2bpkmkbak2mkbak2mkbak2mkbak2mkbak2mkbak2mkbak2mkbakmamkakm2bmkakm2amkakm2bmkakm2amkakm2bmkakm2amkakm2bmkakma

Ext.onReady(function() {
    var selectedWoodType = LSD.WoodTypes.getAt(1);
    var serializer = new LSD.CompressionSerializer();
    var lazySusan;
    var history = [];
    var historyIndex = 0;

    function undo() {
        if (history[historyIndex]) {
            var command = history[historyIndex--];
            command.undo();

            Ext.util.History.add(serializer.serialize(lazySusan));
        }
    }

    function redo() {
        if (history[historyIndex + 1]) {
            var command = history[++historyIndex];
            command.execute();

            Ext.util.History.add(serializer.serialize(lazySusan));
        }
    }

    var menuWindow = Ext.create('LSD.MenuWindow');
    menuWindow.showAt(730, 250);

    menuWindow.on('woodtypeselect', function(woodType) {
        selectedWoodType = woodType;
    });

    menuWindow.selectWoodType(selectedWoodType);

    var panel = Ext.create('Ext.panel.Panel', {
        title: 'Lazy Susan Designer',
        bodyStyle: 'background-color: #cecece',
        layout: 'fit',

        items: [{
            xtype: 'draw',
            viewBox: false,
            id: 'foo'
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        items: panel
    });

    var draw = Ext.getCmp('foo');

    lazySusan = Ext.create('LSD.LazySusan', {
        surface: draw.surface
    });

    lazySusan.on('diamondmouseover', function(diamond, lazySusan, e) {
        diamond.setColor(selectedWoodType.getColor());
    });

    lazySusan.on('diamondmouseout', function(diamond, lazySusan, e) {
        diamond.setColor(diamond.getWoodType().getColor());
    });

    lazySusan.on('diamondmousedown', function(diamond, lazySusan, e) {
        var command;

        if (e.ctrlKey === true) {
            command = new LSD.BatchWoodChangeCommand(lazySusan.getRingFromDiamond(diamond), selectedWoodType);
        }
        else {
            command = new LSD.WoodChangeCommand(diamond, selectedWoodType);
        }

        history.push(command);
        historyIndex = history.length - 1;
        command.execute();

        Ext.util.History.add(serializer.serialize(lazySusan));
    });


    var token = Ext.util.History.getToken();

    if (!Ext.isEmpty(token)) {
        serializer.deserialize(lazySusan, token);
    }

    Ext.EventManager.on(document.body, 'keyup', function(e) {
        if (e.ctrlKey) {
            if (e.keyCode === 90) {
                undo();
            }
            if (e.keyCode === 89) {
                redo();
            }
        }
    })
});
