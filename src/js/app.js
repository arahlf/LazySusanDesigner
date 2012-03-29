Ext.onReady(function() {
    var selectedRow = null;
    var selectedWoodType = LSD.WoodTypes[0];
    var rows = [];
    var serializer = new LSD.CompressionSerializer();
    var lazySusan;
    var history = [];
    var historyIndex = 0;

    function undo() {
        if (history[historyIndex]) {
            var command = history[historyIndex--];
            command.undo();
        }
    }

    function redo() {
        if (history[historyIndex + 1]) {
            var command = history[++historyIndex];
            command.execute();
        }
    }



    LSD.WoodTypes.each(function(woodType) {
        rows.push({
            xtype: 'container',
            padding: 3,
            layout: 'hbox',
            items: [{
                xtype: 'component',
                height: 25,
                woodType: woodType,
                cls: 'lsd-menu-row',
                html: '<div class="lsd-color-selector" style="background-color: ' + woodType.getColor() + '"></div><span class="lsd-menu-text">' + woodType.getDisplayName() + '</span>'
            }]
        })
    });

    var menuWindow = Ext.create('Ext.window.Window', {
        width: 150,
        height: 255,
        bodyPadding: 5,
        closable: false,
        dockedItems: [{
            xtype: 'toolbar',
            items: ['->', {
                xtype: 'button',
                iconCls: 'lsd-icon-help'
            }]
        }],
        items: rows
    });

    menuWindow.showAt(730, 250);

    var selectRow = function(event, dom) {
        var row = Ext.getCmp(dom.id);

        selectedWoodType = row.woodType;

        if (selectedRow != null) {
            selectedRow.removeCls('lsd-menu-row-active');
        }

        row.addCls('lsd-menu-row-active');
        selectedRow = row;
    }


    menuWindow.el.on('mousedown', selectRow, window, {
        delegate: '.lsd-menu-row'
    });

    selectRow(null, Ext.select('.lsd-menu-row').item(3).dom);


    


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

    /*
    lazySusan.on('diamondmouseover', function(diamond, lazySusan, e) {
        diamond.setWoodType(selectedWoodType);
    });

    lazySusan.on('diamondmouseout', function(diamond, lazySusan, e) {
        diamond.restorePreviousWoodType();
    });
    */

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
