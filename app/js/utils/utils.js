export var Store = {
    get(key){
        var val = localStorage.getItem(key);
        return val ? JSON.parse(val) : val;
    },
    set(key, data){
        var val = JSON.stringify(data);
        localStorage.setItem(key, val);
    }
};