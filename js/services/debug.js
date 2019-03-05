app.service('DebugService', function() {

    //Returns the YouTube search results for the given query
    this.initDebug = function (text, value = null) {
        if (config.debugmode == true) console.debug(text, value);
    }
    return this;

});