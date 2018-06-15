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

var socket = io();

$.post('/scheduler/reserva', '' , function(resp, textStatus) {
    //data contains the JSON object
    //textStatus contains the status: success, error, etc
    g.resourceStore.loadRawData(resp.resources);
    g.eventStore.loadData(resp.events);
    console.log(resp);
  }, "json");

socket.on('toSchedule', function (message) {

    console.log(message);

    //var msg = JSON.parse(message);

    

    $.post('/scheduler/reserva', message, function(resp, textStatus) {
        //data contains the JSON object
        //textStatus contains the status: success, error, etc
        g.resourceStore.loadRawData(resp.resources);
        g.eventStore.loadData(resp.events);
        console.log(resp);
      }, "json");


    //messages.innerHTML += message + '<br/>';
});

Ext.onReady(function() {
    Ext.create('app.SchedulerGrid', {
        renderTo: 'myContainer'
    });

    g = Ext.create('app.SchedulerGrid', {});

    $.getJSON('/scheduler/reserva', {}, function(resp) {
        //JSON.parse()
        //resp = JSON.parse(resp);
        //console.log(resp);
        g.resourceStore.loadRawData(resp.resources);
        g.eventStore.loadData(resp.events);
        
    })


});

/*--------------------------------------------------------------
relativo ao painel de recursos, Static Panel
configuracao das colunas do Painel estatico
----------------------------------------------------------------*/
Ext.define('Resource', { extend: 'Sch.model.Resource', fields: [{ Id: 'ResourceId' }, {name: "crm"}] });
var resourceStore = Ext.create('Sch.data.ResourceStore', { model: 'Resource', sorters: { property: 'Id', direction: "ASC" /*--> relativo ordencao da coluna, static Panel*/ } });

/*---------------------------------------------------------------------------------------------
relativo aos eventos, linhas de schedule, Dynamic Panel
http://www.bryntum.com/docs/scheduling/4.x/?#!/api/Sch.data.EventStore
Relativo ao Template de Formatacao e Renderizacao das barras dinamicas customizadas
-----------------------------------------------------------------------------------------------*/
//Ext.define('Event', { extend: 'Sch.model.Event', nameField: 'Title', fields: [{ name: 'Title', mapping: 'Title' }, { name: 'ResourceId' }, { name: 'StartDate' }, { name: 'EndDate' }, { name: 'PatientId' }, { name: 'Name' }, { name: 'Title' },{ name: 'age' }, { name: 'blood' }, { name: 'temperature' }, { name: 'heartbeat' },  { name: 'text' } , { name: 'place' }] });
Ext.define('Event', { extend: 'Sch.model.Event', nameField: 'name', fields: [{ Id: 'PatientId' }, { name: 'ResourceId', mapping: 'ResourceId' }, { name: 'StartDate', mapping: 'StartDate'  }, { name: 'EndDate', mapping: 'EndDate'  }, { name: 'LEI_Id'}, { name: 'ESP_ID'},{ name: 'age' }, { name: 'blood' }, { name: 'temperature' }, { name: 'heartbeat' }  ] });
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
        'app.ext.tooltip'
    ],
    load: function(store, events, o){
        console.log(store);
    },

    title: 'STAGIHO-BD / Centro Cirúrgico HS',
    startDate: new Date(2018, 5, 15, 15),
    endDate: new Date(2018, 5, 16, 4),
    //  setTimeColumnWidth: 40,
    //draggingRecord     : null,
    //socketHost         : null,
    rowHeight: 50,
    barMargin: 10,
    eventBarTextField: 'Name',
    viewPreset: {
        name: 'hourAndDay',  // hourAndDay dayAndWeek //http://www.bryntum.com/docs/scheduling/3.x/?#!/api/Sch.preset.Manager
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
        { header: 'CRM', width: 60, dataIndex: 'crm', sortable: false },
        { header: 'Recurso', width: 120, dataIndex: 'Resource', sortable: true },
    ],


    /*---------------------------------------------------------------
    Relativo a rederizacao dos eventos no painel dinamico (direito)
    -----------------------------------------------------------------*/
    eventRenderer: function(event, resource, tplData) {
        var cls = 'evt-{0} paciente {1} {2}'

        //Deixa em vermelho o paciente que tem temperatura acima de 37 C
        if ( event.get('manchester') > 3 ) { //event.get('temperature') > 37
            tplData.cls = Ext.String.format(cls, event.data.ResourceId, 'p2')
        } else {
            tplData.cls = Ext.String.format(cls, event.data.ResourceId, 'p1')
        };
        //console.log(event);
        return event.data;
    },
    //Template de exibicao em cada Evento
    eventBodyTemplate: '{name}',

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
        var lineStore = Ext.create('Ext.data.JsonStore', { model: 'Line', data: [{ Date: Date.now(), Text: '', Cls: 'verticalLine' }] });
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