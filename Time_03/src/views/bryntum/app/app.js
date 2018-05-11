Ext.Loader.setConfig({
    enabled        : true,
    disableCaching : true,
    paths: {
        //'images': '/scheduler/static/js/testapp',
    }
});

Ext.require([
    'app.SchedulerGrid'
]);

Ext.application({
    name : 'app',

    viewport : {
        layout : 'fit'
    },

    // Initialize application
    launch : function() {

        var vp; //viewport
         
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
