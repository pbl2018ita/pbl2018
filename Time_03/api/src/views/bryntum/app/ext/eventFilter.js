Ext.define('App.ext.eventFilter', {
    extend : 'Ext.form.TextField',
    xtype  : 'taskFilterField', 

    enableKeyEvents : true,
    store    : null,
    property : '',

    initComponent : function () {
        this.store = Ext.StoreMgr.lookup(this.store);
        this.callParent(arguments);
    },

    triggers : {
        clear : {
            cls     : 'x-fa fa-times',
            handler : function () {
                this.filter('');
            },
            scope   : 'this'
        }
    },

    onKeyUp : function (e) {
        var value = this.getValue().toLowerCase();

        this.filter(e.getKey() === e.ESC ? '' : value);
    },

    filter : function (value) {       
        var store = this.store;
        store.clearFilter();
        if (!value) {
          
            this.setValue('');
        } else {
            var regexps = Ext.Array.map(value.split(/\s+/), function (token) {
                return new RegExp(Ext.String.escapeRegex(token), 'i');
            });
            var length = regexps.length;
            store.filterBy(function (me) {
                var name = me.get('Name');
                var title = me.get('Title');

                // blazing fast "for" loop! :)
                for (var i = 0; i < length; i++)
                    if (!regexps[i].test(name) && !regexps[i].test(title)) return false;

                return true;
            });
            //store.filter([
            //    {
            //        property : this.property,
            //        value    : value,
            //        anyMatch : true
            //    }
            //]);
        }
    },

    listeners : {
        keyup  : 'onKeyUp',
        buffer : 200
    }

});