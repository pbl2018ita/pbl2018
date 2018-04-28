Ext.define('App.store.mixin.SocketIO', {
    socket : null,

    getSocket : function () {
        return this.socket;
    },

    initSocket : function () {

        var that   = this;
        var socket = this.getSocket();

        socket.on('server-doInitialLoad', function (data) {
            that.onInitialLoad(data);
        });
        socket.on('server-doUpdate', function (data) {
            that.onRemoteUpdate(data);
        });
        socket.on('server-doAdd', function (data) {
            that.onRemoteAdd(data);
        });
        socket.on('server-syncId', function (data) {
            that.onRemoteSyncId(data);
        });
        socket.on('server-doRemove', function (data) {
            that.onRemoteRemove(data);
        });

        this.myListeners = {
            add    : this.onLocalAdd,
            update : this.onLocalUpdate,
            remove : this.onLocalRemove
        };

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

    /**
     * Emit event to server in order to receive initial data for store from the DB.
     */
    doInitialLoad : function () {
        this.getSocket().emit('client-doInitialLoad');
    },

    /* BEGIN REMOTE LISTENER METHODS */

    /**
     * New records were added remotely, add them to our local client store
     */
    onRemoteAdd : function (data) {
        var records = data.records,
            record,
            current,
            model   = this.getModel();

        this.removeMyListeners();

        for (var i = 0, l = records.length; i < l; i += 1) {
            current = records[ i ].data;

            //change dates from JSON form to Date
            current.startDate = new Date(current.StartDate);
            current.endDate   = new Date(current.EndDate);

            // Work around a bug in ST when adding new records (internalId not set correctly)
            this.add(new model(current, current.Id));
        }

        this.addMyListeners();
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

    /**
     * Records were updated remotely, update them in our local client store
     */
    onRemoteUpdate : function (data) {
        var localRecord;

        // Only one record updated at a time
        data = data.record.data;

        this.removeMyListeners();

        localRecord = this.getById(data.Id);
        if (localRecord) {
            data.StartDate && (data.StartDate = new Date(data.StartDate));
            data.EndDate && (data.EndDate = new Date(data.EndDate));

            localRecord.set(data);
        }

        this.addMyListeners();
    },

    /**
     * Records were removed remotely, remove them from our local client store
     */
    onRemoteRemove : function (data) {
        var ids = data.data,
            record,
            current;

        this.removeMyListeners();

        for (var i = 0, l = ids.length; i < l; i += 1) {
            current = ids[ i ];
            record  = this.getById(current);

            this.remove(record);
        }

        this.addMyListeners();
    },

    /**
     * Initial data loaded from server.
     */
    onInitialLoad : function (data) {
        var d = data.data;
        (this.loadData || this.setData).call(this, d);
    },

    /* EOF REMOTE LISTENER METHODS */


    /* BEGIN LOCAL STORE LISTENER METHODS */

    /**
     * On adding records to client store, send event to server and add items to DB.
     */
    onLocalAdd : function (store, records, index, opts) {
        var recordsData = [];
        records         = records.length ? records : [ records ];

        for (var i = 0, l = records.length; i < l; i += 1) {
            records[ i ].data.Name = 'New Assignment';

            recordsData.push({
                data        : records[i].data,
                internalId  : records[i].internalId
            });
        }

        this.getSocket().emit('client-doAdd', { records : recordsData });
    },

    /**
     * On updating records in client store, send event to server and update items in DB.
     */
    onLocalUpdate : function (store, record) {
        var data = { Id : record.getId() };

        for (var prop in record.previous) {
            data[ prop ] = record.data[ prop ];
        }

        this.getSocket().emit('client-doUpdate', { record : { data : data } });
    },

    /**
     * On adding removing records from client store, send event to server and remove items from DB.
     */
    onLocalRemove : function (store, records, index, opts) {
        records = records.length ? records : [ records ];
        var ids = Ext.Array.map(records, function (rec) {
            return rec.get('Id');
        });

        this.getSocket().emit('client-doRemove', { ids : ids });
    }

    /* EOF LOCAL STORE LISTENER METHODS */
});