/*----------------------------------------------------------------
                |                                               
                |                                               
    Painel      |        Painel Dinamico                        
    Estatico    |                                               
                |                                               
                |                                               
                |                                               
-----------------------------------------------------------------*/
var g = null;

Ext.onReady(function() {
    Ext.create('app.SchedulerGrid', {
        renderTo: 'myContainer'
    });

    g = Ext.create('app.SchedulerGrid', {});
    $.getJSON('http://localhost:3000/scheduler/res', {}, function(resp) {
        //JSON.parse()
        g.resourceStore.loadRawData(resp.resources);
        g.eventStore.loadData(resp.events);
        //console.log(resp);
    })

});

/*--------------------------------------------------------------
relativo ao painel de recursos, Static Panel
configuracao das colunas do Painel estatico
----------------------------------------------------------------*/
Ext.define('Resource', { extend: 'Sch.model.Resource', fields: [{ Id: 'Id' }, { name: 'Available' }] });
var resourceStore = Ext.create('Sch.data.ResourceStore', { model: 'Resource', sorters: { property: 'Id', direction: "ASC" /*--> relativo ordencao da coluna, static Panel*/ } });

/*---------------------------------------------------------------------------------------------
relativo aos eventos, linhas de schedule, Dynamic Panel
http://www.bryntum.com/docs/scheduling/4.x/?#!/api/Sch.data.EventStore
Relativo ao Template de Formatacao e Renderizacao das barras dinamicas customizadas
-----------------------------------------------------------------------------------------------*/
Ext.define('Event', { extend: 'Sch.model.Event', nameField: 'Title' }); //, fields: [{ name: 'Title', mapping: 'Title' }, { name: 'ResourceId' }, { name: 'PatientId' }, { name: 'StartDate' }, { name: 'EndDate' }, { name: 'Name' }, { name: 'blood' }, { name: 'temperature' }, { name: 'heartbeat' }, { name: 'age' }, { name: 'place' }, { name: 'text' }] });
var eventStore = Ext.create('Sch.data.EventStore', { model: 'Event' });

/* globals io: true */
Ext.define('app.SchedulerGrid', {
    extend: 'Sch.panel.SchedulerGrid',
    xtype: 'scheduler-STAGIHO-BD',
    height: '100%',
    width: '100%',
    //readOnly: true,
    //renderTo: "myContainer", //-> NAO FUNCIONOU AINDA
    allowOverlap: true,
    /*----------------------------------
    Instancia bibliotecas externas
    ------------------------------------*/
    requires: [
        'app.ext.eventFilter',
        'app.ext.configHeaderBar',
        'app.ext.tooltip',
        //'app.store.EventStore',
        //'app.store.ResourceStore'
    ],

    title: 'STAGIHO-BD / Centro Cirúrgico HS',
    startDate: new Date(2018, 0, 11, 8),
    endDate: new Date(2018, 4, 11, 20),
    //draggingRecord     : null,
    //socketHost         : null,
    rowHeight: 50,
    barMargin: 10,
    eventBarTextField: 'Name',
    viewPreset: {
        name: 'hourAndDay',
        // Limit the resolution, to avoid putting too much data on the wire.
        timeResolution: {
            unit: 'MINUTE',
            increment: 15
        }
    },
    highlightWeekends: true,
    enableDragCreation: true,
    columns: [
        //{ header: '#', width: 40, dataIndex: 'Id', sortable: true },
        { header: 'Nome', width: 120, dataIndex: 'Name', sortable: true },
        { header: 'Recurso', width: 120, dataIndex: 'Resource', sortable: true },
    ],


    /*---------------------------------------------------------------
    Relativo a rederizacao dos eventos no painel dinamico (direito)
    -----------------------------------------------------------------*/
    eventRenderer: function(event, resource, tplData) {
        var cls = 'evt-{0} paciente {1} {2}'

        //Deixa em vermelho o paciente que tem temperatura acima de 37 C
        if (event.get('temperature') > 37) {
            tplData.cls = Ext.String.format(cls, event.data.ResourceId, 'p2')
        } else {
            tplData.cls = Ext.String.format(cls, event.data.ResourceId, 'p1')
        };
        return event.data;
    },
    //Template de exibicao em cada Evento
    eventBodyTemplate: '{Name}',

    resourceStore: resourceStore,
    eventStore:eventStore,




    constructor: function() {
        var me = this;
        //create a WebSocket and connect to the server running at host domain
        var socket = me.socket = io.connect(me.socketHost);

        /*----------------------------------------------------------------
        Relativo as linhas verticais e Zonas Sombreadas
        - Linha do Agora
        ----------------------------------------------------------------*/
        Ext.define('Line', { extend: 'Ext.data.Model', fields: ['Date', 'Text', 'Cls'] });
        var lineStore = Ext.create('Ext.data.JsonStore', { model: 'Line', data: [{ Date: new Date(2018, 0, 11, 13, 30), Text: '', Cls: 'verticalLine' }] });
        plugins = [Ext.create("Sch.plugin.Lines", { store: lineStore })];

        //create a WebSocket and connect to the server running at host domain
        //var socket = me.socket = io.connect(me.socketHost);
        //console.log(socket);

        Ext.apply(me, {

            viewConfig: {
                onEventUpdate: function(store, model, operation) {
                    // Skip local paints of the record currently being dragged
                    if (model !== me.draggingRecord) {
                        this.horizontal.onEventUpdate(store, model, operation);
                    }
                }
            },

            //eventStore: new app.store.EventStore({ socket: socket }),

            //resourceStore: new app.store.ResourceStore({                /* Extra configs here */            }),

            /*------------------------------
            Setup da Barra de Titulo
            --------------------------------*/
            header: new app.ext.configHeaderBar(me),

            /*------------------------------
            Inclusao de plugins (Linha vertical / area sombreada)
            --------------------------------*/
            plugins: plugins,

            /*------------------------------
            configuracao do Tooltip 
            (Hover sobre o evento)
            --------------------------------*/
            tipCfg: app.ext.tooltip().config,
            tooltipTpl: new app.ext.tooltip(),

        });


        me.callParent(arguments);

        // Change default drag drop behavior to update the dragged record 'live'
        me.on({
            eventdragstart: me.onDragStart,
            eventdrag: me.onEventDrag,
            //eventcontextmenu : me.onEventContextMenu,

            aftereventdrop: me.onDragEnd,
            scope: me
        });


        // Uncomment this to see what's happening in the EventStore
        //Ext.util.Observable.capture(me.eventStore, function() { console.log(arguments); });
    },

    onUsernameChange: function(field, value) {
        console.log('onUsernameChange');
        //this.userName = value;
    },

    onEventCreated: function(record) {
        //record.set('Name', 'New task');
        console.log('onEventCreated');
    },

    // Block a record when it is being dragged
    onDragStart: function(view, records) {

        //var rec = records[0];
        //this.draggingRecord = rec;

        //rec.block(this.userName);

        console.log('onDragStart');
    },

    // Update underlying record as it is moved around in the schedule
    onEventDrag: function(sch, draggedRecords, startDate, newResource) {
        console.log('onEventDrag');
        //if (newResource && startDate) {
        //    var task = draggedRecords[0];
        //    task.beginEdit();
        //    task.setStartDate(startDate, true);
        //    task.assign(newResource);
        //    task.endEdit();
        //}
    },

    // Unblock a record after dragging it
    onDragEnd: function(view, records) {
        console.log('onDragEnd');
        /*
        this.draggingRecord = null;

        // Every drag will update record and plugin will think drop didn't modified record and thus it will not update
        // row with old resource, we need to do it manually
        var dragData = view.eventDragZone.dragData;

        if (dragData.resourceRecord !== dragData.newResource) {
            view.repaintEventsForResource(dragData.resourceRecord);
        }

        records[0].unblock();
        */
    },

    addTask: function(resource) {
        //var editor = this.normalGrid.findPlugin('myeditor');

        var newTask = this.eventStore.add({
            ResourceId: resource.getId(),
            Title: 'New Task',
            StartDate: this.getStart(),
            EndDate: Sch.util.Date.add(this.getStart(), Sch.util.Date.HOUR, 3)
        })[0];

        //editor.showForEvent(newTask);
    },


    tbar: [],


});