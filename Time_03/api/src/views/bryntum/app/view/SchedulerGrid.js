/* globals io: true */
Ext.define('App.view.SchedulerGrid', {
    extend : 'Sch.panel.SchedulerGrid',
    xtype  : 'scheduler',

    requires : ['App.store.EventStore', 'App.store.ResourceStore'],

    title              : 'STAGIHO-BD / Centro Cirúrgico HS',
    startDate          : new Date(2018, 0, 9, 8),
    endDate            : new Date(2018, 4, 9, 20),
    userName           : 'John Doe',
    draggingRecord     : null,
    socketHost         : null,
    rowHeight          : 75,
    barMargin          : 10,
    eventBarTextField  : 'Name',
    viewPreset         : {
        name           : 'hourAndDay',
        // Limit the resolution, to avoid putting too much data on the wire.
        timeResolution : {
            unit      : 'MINUTE',
            increment : 15
        }
    },
    eventBodyTemplate  : '<div>{Name}</div><div class="blocked-by {[values.Blocked ? \"\" : \"x-hidden\"]}">{BlockedBy}</div>',
    enableDragCreation : false,

    dragConfig : {
        onBeforeDrag : function(data) {
            for (var i = 0; i < data.draggedRecords.length; i++) {
                var record = data.draggedRecords[i];
                if (record.get('Blocked')) {
                    return false;
                }
            }
            return true;
        }
    },

    columns : [
        { header : 'Name', width : 120, dataIndex : 'Name', sortable : true }
    ],

    eventRenderer : function(event, resource, tplData) {
        tplData.cls = '';

        if (event.data.Done) {
            tplData.cls += ' sch-event-done ';
        }

        if (event.data.Blocked) {
            tplData.cls += ' sch-event-blocked ';

            if (event === this.draggingRecord) {
                tplData.cls += ' x-hidden ';
            }
        }

        return event.data;
    },

    constructor : function() {
        var me = this,
            //create a WebSocket and connect to the server running at host domain
            socket = me.socket = io.connect(me.socketHost);

        Ext.apply(me, {

            viewConfig : {
                onEventUpdate : function(store, model, operation) {
                    // Skip local paints of the record currently being dragged
                    if (model !== me.draggingRecord) {
                        this.horizontal.onEventUpdate(store, model, operation);
                    }
                }
            },

            resourceStore : new App.store.ResourceStore({ /* Extra configs here */ }),

            eventStore : new App.store.EventStore({
                socket : socket
            }),

            header : {
                items: [
                    {
                        xtype    : 'textfield',
                        emptyText: 'Enter username',
                        listeners: {
                            change: me.onUsernameChange,
                            scope : me
                        }
                    }
                ]
            }
        });

        me.callParent(arguments);

        // Change default drag drop behavior to update the dragged record 'live'
        me.on({
            eventdragstart   : me.onDragStart,
            eventdrag        : me.onEventDrag,
            eventcontextmenu : me.onEventContextMenu,

            aftereventdrop : me.onDragEnd,
            scope          : me
        });

        // Uncomment this to see what's happening in the EventStore
        //Ext.util.Observable.capture(me.eventStore, function() { console.log(arguments); });
    },

    onUsernameChange : function(field, value) {
        this.userName = value;
    },

    onEventCreated : function(record) {
        record.set('Name', 'New task');
    },

    // Block a record when it is being dragged
    onDragStart : function(view, records) {

        var rec = records[0];
        this.draggingRecord = rec;

        rec.block(this.userName);
    },

    // Update underlying record as it is moved around in the schedule
    onEventDrag : function(sch, draggedRecords, startDate, newResource) {

        if (newResource && startDate) {
            var task = draggedRecords[0];
            task.beginEdit();
            task.setStartDate(startDate, true);
            task.assign(newResource);
            task.endEdit();
        }
    },

    // Unblock a record after dragging it
    onDragEnd : function(view, records) {
        this.draggingRecord = null;

        // Every drag will update record and plugin will think drop didn't modified record and thus it will not update
        // row with old resource, we need to do it manually
        var dragData = view.eventDragZone.dragData;

        if (dragData.resourceRecord !== dragData.newResource) {
            view.repaintEventsForResource(dragData.resourceRecord);
        }

        records[0].unblock();
    },

    onEventContextMenu : function(scheduler, rec, e) {
        var me = this;
        e.stopEvent();

        if (!me.gCtx) {
            me.gCtx = new Ext.menu.Menu({
                items : [
                    {
                        text    : 'Delete event',
                        iconCls : 'icon-delete',
                        handler : function() {
                            me.eventStore.remove(me.gCtx.rec);
                        }
                    }
                ]
            });
        }
        me.gCtx.rec = rec;
        me.gCtx.showAt(e.getXY());
    }
}); 