Ext.define('App.store.ResourceStore', {
    extend: 'Sch.data.ResourceStore',

    sortInfo: { 
        field: 'Name', 
        direction: "ASC" 
    },
    //proxy: {
    //    type: 'memory',
    //    reader: {
    //        type: 'json'
    //    }
    //},

    /*
    constructor: function (config) {

        this.callParent(arguments);

        this.setData([
            { Id: 1, Name: 'Dr. João', Resource: "Médico", FavoriteColor: 'red' },
            { Id: 2, Name: 'Dra. Maria', Resource: "Médico", FavoriteColor: 'navy' },
            { Id: 3, Name: 'Fernanda', Resource: "Enfermeiro", FavoriteColor: 'black' },
            { Id: 4, Name: 'Lurdes', Resource: "Enfermeiro", FavoriteColor: 'green' },
            { Id: 5, Name: 'Medicamento', Resource: "Medicamento", FavoriteColor: 'lime' }
        ]);
    },*/

    data : [
        { Id: 1, Name: 'Dr. João Paulo', Resource: "Médico", FavoriteColor: 'red' },
        { Id: 2, Name: 'Dra. Maria', Resource: "Médico", FavoriteColor: 'navy' },
        { Id: 3, Name: 'Fernanda', Resource: "Enfermeiro", FavoriteColor: 'black' },
        { Id: 4, Name: 'Lurdes', Resource: "Enfermeiro", FavoriteColor: 'green' },
        { Id: 5, Name: 'Medicamento', Resource: "Medicamento", FavoriteColor: 'lime' }
    ]
});