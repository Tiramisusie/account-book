import moment from 'moment'

export var Store = (function() {
    // Store.js
    var store = {},
        win = (typeof window != 'undefined' ? window : global),
        storage = win['localStorage'];


    store.serialize = function (value) {
        return JSON.stringify(value)
    };
    store.deserialize = function(value) {
        if(typeof value != 'string') {
            return undefined
        }
        try {
            return JSON.parse(value)
        }
        catch(e) {
            return value || undefined
        }
    };
    store.set = function(key, val) {
        if(val === undefined) {
            return store.remove(key)
        }
        storage.setItem(key, store.serialize(val));
        return val
    };
    store.get = function(key, defaultVal) {
        var val = store.deserialize(storage.getItem(key));
        return (val === undefined ? defaultVal : val)
    };
    store.remove = function(key) {
        storage.removeItem(key)
    };
    store.clear = function() {
        storage.clear()
    };
    store.getAll = function() {
        var ret = {};
        store.forEach(function(key, val) {
            ret[key] = val
        });
        return ret
    };
    store.forEach = function(callback) {
        for(var i = 0; i < storage.length; i++) {
            var key = storage.key(i);
            callback(key, store.get(key))
        }
    };

    return store
}());

export var Utils = {
    getTimeStamp(date){
        return moment(date).format('YYYY-M-D');
    }
};