app.service('AiService', function(DebugService) {

    function initHtracker() {
        var videoInput = document.getElementById('inputVideo');
        var canvasInput = document.getElementById('inputCanvas');

        var htracker = new headtrackr.Tracker({
          ui: false,
          smoothing: false,
          fadeVideo: false
        });

        htracker.init(videoInput, canvasInput);
        htracker.start();
    }

    function initArtyom () {
        if (config.headtracker == true) {
            document.addEventListener("headtrackrStatus", function(event) {
                DebugService.initDebug('Stop listening', event.status);
                artyom.fatality();

                if (event.status == "found" )
                {
                    starArtyom();
                }
                else
                {
                  DebugService.initDebug('Stop listening', event.status);
                  artyom.fatality();
                }
            }, false);
        } else {
             starArtyom();
        }
    }

    function starArtyom() {
        DebugService.initDebug('Start listening', event.status);
        //Initialization of artyom
        artyom.initialize({
            lang:config.language,
            debug: config.debugmode,
            continuous:true,
            listen:true,
            //executionKeyword:'cufa'
        });
        artyom.say("Bienvenido...");        
    }

    this.init = function () {
        if (config.headtracker == true) initHtracker();
        if (config.artyom == true) initArtyom();
    }

    return this;

});