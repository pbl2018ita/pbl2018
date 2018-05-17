Ext.define('App.store.SocketIO', {
    //socket : null,

/*
    getSocket : function () {
        return this.socket;
    },

    initSocket : function () {

        console.log('initSocket');

        var that   = this;
        var socket = this.getSocket();

        socket.on('server-doInitialLoad', function (data) {
            that.onInitialLoad(data);
        });
        socket.on('server-syncId', function (data) {
            that.onRemoteSyncId(data);
        });

        this.addMyListeners();

        //Load initial data to Store from Server
        this.doInitialLoad();
    },

    addMyListeners : function () {
        //Add event listeners to store operations
        this.on(this.myListeners);
    },

    removeMyListeners : function () {
        //Add event listeners to store operations
        this.un(this.myListeners);
    },

    //
     //Emit event to server in order to receive initial data for store from the DB.
     //
    doInitialLoad : function () {
        this.getSocket().emit('client-doInitialLoad');
    },


    

    onRemoteSyncId : function (data) {
        var records = data.records,
            model   = this.getModel();

        this.removeMyListeners();

        Ext.Array.each(records, function (updatedRecord) {
            var internalId = updatedRecord.internalId;

            this.each(function (rec, idx) {
                if (rec.internalId == internalId) {
                    this.remove(rec);
                    this.add(updatedRecord.data);
                    return false;
                }
            }, this);
        }, this);

        this.addMyListeners();
    },


    //
    // Initial data loaded from server.
    //
    onInitialLoad : function (data) {
        var d = data.data;
        (this.loadData || this.setData).call(this, d);
    },
    */
    
});