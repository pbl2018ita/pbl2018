var aux = new SchedulerAuxiliary;

/* globals io: true */
Ext.define('App.view.SchedulerGrid', { 
    extend : 'Sch.panel.SchedulerGrid',
    xtype  : 'scheduler',
    //readOnly: true,
    //width: myWidth,
    //height: myHeight,
    //renderTo: "SchedulerPanel",
    allowOverlap: true,
    requires : ['App.store.EventStore', 
                'App.store.ResourceStore'],

    title              : 'STAGIHO-BD / Centro Cirúrgico HS',
    startDate          : new Date(2018, 0, 11, 8),
    endDate            : new Date(2018, 4, 11, 20),
    //userName           : 'John Doe',
    //draggingRecord     : null,
    //socketHost         : null,
    rowHeight          : 50,
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
    highlightWeekends : true,
    enableDragCreation : false,
    columns : [
        { header : 'Nome', width : 120, dataIndex : 'Name', sortable : true },
        { header : 'Recurso', width : 120, dataIndex : 'Resource', sortable : true },
    ],
        /*----------------------------------------------------------------
    configuracao do painel e colunas do painel estatico (esquerdo)          
    -----------------------------------------------------------------*/   
    resourceStore : {
        type    : 'resourcestore',
        //sorters : { property  : 'Name', direction : 'ASC'},
        sortInfo : { field : 'Name', direction : 'ASC' },

        data : [
            { Id: "r1", Name: 'Dr. João Paulo', Resource: "Médico", FavoriteColor: 'red' },
            { Id: "r2", Name: 'Dra. Maria', Resource: "Médico", FavoriteColor: 'navy' },
            { Id: "r3", Name: 'Fernanda', Resource: "Enfermeiro", FavoriteColor: 'black' },
            { Id: "r4", Name: 'Lurdes', Resource: "Enfermeiro", FavoriteColor: 'green' },
            { Id: "r5", Name: 'Medicamento', Resource: "Medicamento", FavoriteColor: 'lime' }
        ]
    },
    /*---------------------------------------------------------------
    Relativo a rederizacao dos eventos no painel dinamico (direito)
    -----------------------------------------------------------------*/
    //eventRenderer : aux.eventRenderer,            
    eventBodyTemplate  : '<div class="paciente {cls}">{Title}</div>',
    eventStore : {
        type  : 'eventstore',
        //model : 'Sch.examples.configuration.model.MyEventModel', // See definition above
        data  : [
            {
                ResourceId  : 'r1',
                PercentDone : 60,
                StartDate   : new Date(2018, 0, 11, 10),
                EndDate     : new Date(2018, 0, 11, 12),
                Title       : "Paciente 1",
                cls         : "p1"
            },
            {
                ResourceId  : 'r2',
                PercentDone : 20,
                StartDate   : new Date(2018, 0, 11, 12),
                EndDate     : new Date(2018, 0, 11, 13),
                Title       : "Paciente 1",
                cls         : "p1"
            },
            {
                ResourceId  : 'r3',
                PercentDone : 80,
                StartDate   : new Date(2018, 0, 11, 14),
                EndDate     : new Date(2018, 0, 11, 16),
                Title       : "Paciente 1",
                cls         : "p1"
            },
            {
                ResourceId  : 'r4',
                PercentDone : 70,
                StartDate   : new Date(2018, 0, 11, 16),
                EndDate     : new Date(2018, 0, 11, 18),
                Draggable   : true,  
                Title       : "Paciente 2",
                cls         : "p2"
            }
        ]
    },



    //dragConfig : aux.onBeforeDrag,



    constructor : function() {
        var me = this;

        //create a WebSocket and connect to the server running at host domain
        //var socket = me.socket = io.connect(me.socketHost);
        //console.log(socket);

        Ext.apply(me, {

            viewConfig : {
                onEventUpdate : function(store, model, operation) {
                    // Skip local paints of the record currently being dragged
                    if (model !== me.draggingRecord) {
                        this.horizontal.onEventUpdate(store, model, operation);
                    }
                }
            },

            //resourceStore : new App.store.ResourceStore({ /* Extra configs here */ }),
            
            /*
            eventStore : new App.store.EventStore({
                socket : socket
            }),
            */

            //header : {
            //    items: [
            //        {
            //            xtype    : 'textfield',
            //            emptyText: 'Enter username',
            //            listeners: {
            //                change: me.onUsernameChange,
            //                scope : me
            //            }
            //        }
            //    ]
            //}
        });

        /*------------------------------
        Setup da Barra de Titulo
        --------------------------------*/
        Ext.apply(me, {
            header : {
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
                    xtype  : 'button',
                    iconCls: 'fa fa-search-minus',
                    tooltip: 'Zoom Out',
                    width  : null,
                    handler: function () {
                        me.zoomOut();
                    }
                },
                {
                    xtype  : 'button',
                    iconCls: 'x-fa fa-arrow-left',
                    handler: function () {
                        me.shiftPrevious();
                    }
                },
                {
                    xtype  : 'button',
                    iconCls: 'x-fa fa-arrow-right',
                    handler: function () {
                        me.shiftNext();
                    }
                },
                {
                    xtype       : 'button',
                    iconCls     : 'x-fa fa-unlock',
                    text        : 'Unlocked',
                    enableToggle: true,
                    handler     : function () {
                        me.setReadOnly(this.pressed);
                        this.setIconCls(this.pressed ? 'x-fa fa-lock' : 'x-fa fa-unlock');
                        this.setText(this.pressed ? 'Locked' : 'Unlocked');
                    }
                },
            ]}
        });

        me.callParent(arguments);

        // Change default drag drop behavior to update the dragged record 'live'
        me.on({
            eventdragstart   : me.onDragStart,
            eventdrag        : me.onEventDrag,
            //eventcontextmenu : me.onEventContextMenu,

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

    //onEventContextMenu : function(scheduler, rec, e) {
    //    var me = this;
    //    e.stopEvent();
    //
    //    if (!me.gCtx) {
    //        me.gCtx = new Ext.menu.Menu({
    //            items : [
    //                {
    //                    text    : 'Delete event',
    //                    iconCls : 'icon-delete',
    //                    handler : function() {
    //                        me.eventStore.remove(me.gCtx.rec);
    //                    }
    //                }
    //            ]
    //        });
    //    }
    //    me.gCtx.rec = rec;
    //    me.gCtx.showAt(e.getXY());
    //}
    
}); 



//Classe auxiliar para simplificar a leitura do programa principal
function SchedulerAuxiliary(){
    this.eventRenderer = function(event, resource, tplData) {
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
    }
    this.onBeforeDrag = function (data) {
        for (var i = 0; i < data.draggedRecords.length; i++) {
            var record = data.draggedRecords[i];
            if (record.get('Blocked')) {
                return false;
            }
        }
        return true;
    }
    

}