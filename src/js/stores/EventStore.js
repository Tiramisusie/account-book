var Event = require('events').EventEmitter;
var assign = require('object-assign');

var EventStore = assign({}, Event.prototype, {
    emitEvent(event, args){
        this.emit(event, args);
    },
    addEventChangeListener(event, callback){
        this.on(event, callback);
    },
    removeEventChangeListener(event, callback){
        this.removeListener(event, callback);
    }
});

module.exports = EventStore;