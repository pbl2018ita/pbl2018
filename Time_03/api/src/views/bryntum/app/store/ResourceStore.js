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
            { Id: "r1", Name: 'Dr. João Paulo', Resource: "Médico", FavoriteColor: 'red' },
            { Id: "r2", Name: 'Dra. Maria', Resource: "Médico", FavoriteColor: 'navy' },
            { Id: "r3", Name: 'Fernanda', Resource: "Enfermeiro", FavoriteColor: 'black' },
            { Id: "r4", Name: 'Lurdes', Resource: "Enfermeiro", FavoriteColor: 'green' },
            { Id: "r5", Name: 'Medicamento', Resource: "Medicamento", FavoriteColor: 'lime' }
        ]);
    },*/

    data: [
        { Id: "r1", Name: 'Dr. João Paulo', Resource: "Médico", FavoriteColor: 'red' },
        { Id: "r2", Name: 'Dra. Maria', Resource: "Médico", FavoriteColor: 'navy' },
        { Id: "r3", Name: 'Fernanda', Resource: "Enfermeiro", FavoriteColor: 'black' },
        { Id: "r4", Name: 'Lurdes', Resource: "Enfermeiro", FavoriteColor: 'green' },
        { Id: "r5", Name: 'Medicamento', Resource: "Medicamento", FavoriteColor: 'lime' }
    ]
});