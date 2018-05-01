/*------------------------------
Setup da Barra de Titulo
--------------------------------*/
function configHeaderBar(me, Ext) {

    Ext.apply(me, {
        header: {
            items: [
                {
                    iconCls: 'fa fa-refresh', // 'icon-prev',
                    tooltip: 'Reload',
                    handler: function () {
                        location.reload();
                    }
                },
                {
                    iconCls: 'fa fa-search-plus', // 'icon-prev',
                    tooltip: 'Zoom In',
                    handler: function () {
                        me.zoomIn()
                    }
                },
                {
                    //xtype  : 'button',
                    iconCls: 'fa fa-search-minus',
                    tooltip: 'Zoom Out',
                    width: null,
                    handler: function () {
                        me.zoomOut();
                    }
                },
                {
                    //xtype  : 'button',
                    iconCls: 'x-fa fa-arrow-left',
                    handler: function () {
                        me.shiftPrevious();
                    }
                },
                {
                    //xtype  : 'button',
                    iconCls: 'x-fa fa-arrow-right',
                    handler: function () {
                        me.shiftNext();
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-unlock',
                    text: 'Unlocked',
                    enableToggle: true,
                    handler: function () {
                        me.setReadOnly(this.pressed);
                        this.setIconCls(this.pressed ? 'x-fa fa-lock' : 'x-fa fa-unlock');
                        this.setText(this.pressed ? 'Locked' : 'Unlocked');
                    }
                },
            ]
        }
    });
}