'use strict';


//'DATABASE'
var DB = {
    eventsTable : [
        {
            Id         : 1,
            ResourceId : 2,
            Name       : 'Chase turkey',
            StartDate  : "2010-12-09 08:00",
            EndDate    : "2010-12-09 10:00",
            Done       : true
        },
        {
            Id         : 2,
            ResourceId : 1,
            Name       : 'Stuff turkey',
            StartDate  : "2010-12-09 10:00",
            EndDate    : "2010-12-09 12:00",
            Done       : true,
            Blocked: true,
            BlockedBy: 'Bryntum'
        },
        {
            Id         : 3,
            ResourceId : 3,
            Name       : 'Cook turkey',
            StartDate  : "2010-12-09 12:00",
            EndDate    : "2010-12-09 15:00",
            Done       : true
        },
        {
            Id         : 4,
            ResourceId : 5,
            Name       : 'Set table',
            StartDate  : "2010-12-09 14:00",
            EndDate    : "2010-12-09 16:00",
            Done       : false
        },
        {
            Id         : 5,
            ResourceId : 4,
            Name       : 'Serve dinner',
            StartDate  : "2010-12-09 16:00",
            EndDate    : "2010-12-09 19:00",
            Done       : false
        },
        {
            Id         : 6,
            ResourceId : 6,
            Name       : 'Hack on NodeJS',
            StartDate  : "2010-12-09 16:00",
            EndDate    : "2010-12-09 18:30",
            Done       : false
        },
        {
            Id         : 7,
            ResourceId : 7,
            Name       : 'Clean up',
            StartDate  : "2010-12-09 19:00",
            EndDate    : "2010-12-09 20:00",
            Done       : false
        },
        {
            Id         : 8,
            ResourceId : 8,
            Name       : 'Do laundry',
            StartDate  : "2010-12-09 17:00",
            EndDate    : "2010-12-09 19:00",
            Done       : false
        }
    ],

    getEventsData : function() {
        return this.eventsTable;
    },

    // get record by ID
    getById : function(id) {
        var table = this.getEventsData(),
            current;

        for (var i = 0, l = table.length; i < l; i += 1) {
            current = table[i];

            if (current.Id === id) {
                return current;
            }
        }
        return null;
    },

    // update record
    update : function(record) {
        var data = record.data;
        var item = this.getById(data.Id);

        if (item) {
            for (var f in data) {
                item[f] = data[f];
            }
        }
    },

    // add records
    add : function(records) {
        var table = this.getEventsData(),
            record,
            ID;

        for (var i = 0, l = records.length; i < l; i += 1) {
            record = records[i];
            ID = table[table.length - 1].Id + 1;

            record.data.Id = ID;
            table.push(record.data);
        }
    },

    // remove records
    remove : function(ids) {
        var table = this.getEventsData();

        ids.forEach(function(id) {
            var item = this.getById(id);
            table.splice(table.indexOf(item), 1);
        }, this);
    }
};


module.exports = DB;