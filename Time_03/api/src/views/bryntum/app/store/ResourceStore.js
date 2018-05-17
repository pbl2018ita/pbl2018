Ext.define('app.store.ResourceStore', {
    extend: 'Sch.data.ResourceStore',
    //xtype  : 'Resource'

    sortInfo: {
        field: 'Name',
        direction: "ASC"
    },
    //autoLoad    : true,
    //autoDestroy : true,

    /*
    proxy: {
        type: 'ajax',
        Url: 'http://localhost:3000/scheduler/res',
        reader: {
            type: 'json',
            //rootProperty: 'data'
        }
    },
    */
    

    
     
    constructor: function (config) {

        this.callParent(arguments);

        //$.getJSON('http://localhost:3000/scheduler/res', {}, function (resp) {
           //console.log(resp);
    
        //})
      
        /*
        this.setData([
            { Id: "r1", Name: 'Dr. João Paulo', Resource: "Especialista", FavoriteColor: 'red' },
            { Id: "r2", Name: 'Dra. Maria', Resource: "Especialista", FavoriteColor: 'navy' },
            { Id: "r3", Name: 'Dr. Rodney', Resource: "Clinico", FavoriteColor: 'navy' },
            { Id: "r4", Name: 'Fernanda', Resource: "Enfermeiro", FavoriteColor: 'black' },
            { Id: "r5", Name: 'Lurdes', Resource: "Enfermeiro", FavoriteColor: 'green' },
            { Id: "r6", Name: 'Medicamento', Resource: "Medicamento", FavoriteColor: 'lime' }
        ]);

        */
        
    },
    
    


    data: [
        { Id: "r1", Name: 'Dr. João Paulo', Resource: "Especialista", FavoriteColor: 'red' },
        { Id: "r2", Name: 'Dra. Maria', Resource: "Especialista", FavoriteColor: 'navy' },
        { Id: "r3", Name: 'Dr. Rodney', Resource: "Clinico", FavoriteColor: 'navy' },
        { Id: "r4", Name: 'Fernanda', Resource: "Enfermeiro", FavoriteColor: 'black' },
        { Id: "r5", Name: 'Lurdes', Resource: "Enfermeiro", FavoriteColor: 'green' },
        { Id: "r6", Name: 'Medicamento', Resource: "Medicamento", FavoriteColor: 'lime' }
    ],


});