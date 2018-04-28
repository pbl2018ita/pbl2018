Ext.Loader.setConfig({
    enabled        : true,
    disableCaching : true
});

Ext.require([
    'App.view.SchedulerGrid'
]);

Ext.application({
    name : 'App',

    viewport : {
        layout : 'fit'
    },

    // Initialize application
    launch : function() {
        var vp;

        if (Ext.versions.touch) {
            vp = Ext.Viewport;
        } else {
            // Ext JS
            vp = new Ext.Viewport(this.viewport);
            Ext.QuickTips.init();
        }

        vp.add([
            {
                xtype: 'scheduler',
                region: 'center'
            }
        ]);
    }
});
