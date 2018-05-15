Ext.define('app.store.EventStore', {
    extend: "Sch.data.EventStore",

    /*
    requires: [
        'app.model.CustomEvent'
    ],

    config: Ext.versions.touch ? {
        socket: null,
        model: 'app.model.CustomEvent'
    } : null,

    model: 'app.model.CustomEvent',
    mixins: [
        'app.store.mixin.SocketIO'
    ],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    */
    constructor: function () {

        //var socket = io();

        /*
        socket.on('toClientScheduler', function (message) {
          //var messages = document.getElementById('messages');
          //messages.innerHTML += message + '<br/>';
          console.log(message);
        });
        */
 
        var send = function() {
          //var message = document.getElementById('message');
          //socket.emit('toServer', message.value);
        };

        //this.callParent(arguments);
        //this.initSocket();

        //console.log(this.data);
        return {
            type: 'eventstore',
            storeId: 'MyPatients',
            data: [
                {
                    ResourceId: 'r1',
                    PatientId: 'p1',
                    PercentDone: 60,
                    StartDate: new Date(2018, 0, 11, 10),
                    EndDate: new Date(2018, 0, 11, 12),
                    Title: "Paciente 1",
                    Name: "Mr. Bean",
                    blood: "O+",
                    temperature: 36.6,
                    heartbeat: 80,
                    age: 50,
                    place: "1o Andar / Ala 1 / Sala 8",
                    text: "Case insolens persecuti et est, id aliquip viderer adolescens sed, fugit saepe eu per. Enim ullum quo id, modus eleifend temporibus eu vis. Te mea assum doctus verear, nec at sint tempor deterruisset. Cu qui facer reformidans, ea est."
                    //IconCls : "fa fa-user-circle"
                },
                {
                    ResourceId: 'r2',
                    PatientId: 'p2',
                    PercentDone: 20,
                    StartDate: new Date(2018, 0, 11, 12),
                    EndDate: new Date(2018, 0, 11, 13),
                    Title: "Paciente 1",
                    Name: "Jerry Lewis",
                    blood: "A+" ,
                    temperature: 36.4,
                    heartbeat: 75,
                    age: 88,
                    place: "2o Andar / Ala 1 / Sala 3",
                    text: "Tollit repudiare adolescens an mea, ut mei electram delicatissimi. Ut vel elitr iriure nusquam, delicatissimi mediocritatem cum cu."
                },
                {
                    ResourceId: 'r3',
                    PatientId: 'p3',
                    PercentDone: 80,
                    StartDate: new Date(2018, 0, 11, 14),
                    EndDate: new Date(2018, 0, 11, 16),
                    Title: "Paciente 1",
                    Name: "Jo Soares",
                    IconCls: "fa fa-users",
                    blood: "B-" ,
                    temperature: 40.1,
                    heartbeat: 98,
                    age: 75,
                    place: "1o Andar / Ala 1 / Sala 7",
                    text: "Eu per solum pertinax complectitur, volumus appellantur vel an, at utroque recusabo indoctum cum. Ius ad eirmod epicuri. Ad magna affert semper eam."
                },
                {
                    ResourceId: 'r4',
                    PatientId: 'p4',
                    PercentDone: 70,
                    StartDate: new Date(2018, 0, 11, 16),
                    EndDate: new Date(2018, 0, 11, 18),
                    Draggable: true,
                    Title: "Paciente 2",
                    Name: "Quico",
                    blood: "O+" ,
                    temperature: 36.0,
                    heartbeat: 110,
                    age: 12,
                    place: "1o Andar / Ala 2 / Sala 1",
                    text: "An mollis scaevola apeirian eum, ad eam lorem nonumy, aeque dolorum postulant vel in."
                    
                }]
        };

    },


});