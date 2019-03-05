app.controller("MirrorCtrl", 
    function(
            SearchService,
            AiService,
            MapService,
            TrafficService,
            RssService,
            WeatherService,
            DebugService,
            moment,
            $interval,
            $timeout,
            $rootScope,
            $scope, $sce) {
    
    // Local Scope Vars
    var _this = this;
    var isReady = false;
    $scope.commands = [];
    $scope.offline = '';

    DebugService.initDebug("Conn", $rootScope.online);

    //set lang
    moment.locale(config.language);

    //Update the time
    function updateTime() {
        $scope.date = new moment();
    }

    function greetingUpdater(greeting) {
        if (typeof greeting !== 'undefined') {
            $scope.greeting = greeting;
            greeting = null;
            return;
        }

        if (typeof config.greeting !== 'undefined' && !Array.isArray(config.greeting) && typeof config.greeting.midday !== 'undefined') {
            var hour = moment().hour();
            var greetingTime = "midday";

            if (hour > 4 && hour < 11) {
                greetingTime = "morning";
            } else if (hour > 18 && hour < 23) {
                greetingTime = "evening";
            } else if (hour >= 23 || hour < 4) {
                greetingTime = "night";
            }
            var nextIndex = Math.floor(Math.random() * config.greeting[greetingTime].length);
            var nextGreeting = config.greeting[greetingTime][nextIndex]
            $scope.greeting = nextGreeting;
        } else if (Array.isArray(config.greeting)) {
            $scope.greeting = config.greeting[Math.floor(Math.random() * config.greeting.length)];
        }
    }

    var refreshWeatherData = function () {
        WeatherService.init().then(function () {
            $scope.currentForecast = WeatherService.currentForecast();
            $scope.weeklyForecast = WeatherService.weeklyForecast();
            $scope.hourlyForecast = WeatherService.hourlyForecast();
            $scope.minutelyForecast = WeatherService.minutelyForecast();

            DebugService.initDebug("Current", $scope.currentForecast);
            DebugService.initDebug("Weekly", $scope.weeklyForecast);
            DebugService.initDebug("Hourly", $scope.hourlyForecast);
            DebugService.initDebug("Minutely", $scope.minutelyForecast);

            var skycons = new Skycons({ "color": "#aaa" });
            skycons.add("icon_weather_current", $scope.currentForecast.iconAnimation);

            skycons.play();

            $scope.iconLoad = function (elementId, iconAnimation) {
                skycons.add(document.getElementById(elementId), iconAnimation);
                skycons.play();
            };

        });
    };

    var updateNews = function () {
        $scope.news = RssService.getNews();
    };

    var refreshRss = function () {
        DebugService.initDebug("Refreshing RSS");
        $scope.news = null;
        RssService.refreshRssList();
        $interval(updateNews, 5000);
    };

    var refreshTrafficData = function () {
        TrafficService.getDurationForTrips().then(function (tripsWithTraffic) {
            DebugService.initDebug("Traffic", tripsWithTraffic);
            //Todo this needs to be an array of traffic objects -> $trips[]
            $scope.trips = tripsWithTraffic;
        }, function (error) {
            $scope.traffic = { error: error };
        });
    };

    /**
     * Map configuration
     */

    $scope.map = MapService.generateMap(config.geoPosition.latitude + ',' + config.geoPosition.longitude);

    var mapShow = function () {
        DebugService.initDebug("Going on an adventure?");
        $scope.map = MapService.generateMap(config.geoPosition.latitude + ',' + config.geoPosition.longitude);
        $scope.focus = "map";
    };

    var mapLocation = function (location) {
        DebugService.initDebug("Getting map of", location);
        $scope.map = MapService.generateMap(location);
        $scope.focus = "map";
    };

    var mapZoomIn = function () {
        DebugService.initDebug("Zoooooooom!!!");
        $scope.map = MapService.zoomIn();
    };

    var mapZoomOut = function () {
        DebugService.initDebug("Moooooooooz!!!");
        $scope.map = MapService.zoomOut();
    };

    var mapShowNewPlace = function (value) {
        DebugService.initDebug("Map next place!!!", value);
        $scope.map = MapService.showNewMap(value);
        $scope.focus = "map";
    };

    var mapZoomReset = function () {
        DebugService.initDebug("Zoooommmmmzzz00000!!!");
        $scope.map = MapService.reset();
        $scope.focus = "map";
    };

    /**
     * Search for a video
     */

    var videoSearch = function (query) {
        SearchService.searchYouTube(query).then(function (videoId) {
            //Set cc_load_policy=1 to force captions
            $scope.ondemandVideo = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId + '?autoplay=1&controls=0&iv_load_policy=3&enablejsapi=1&showinfo=0');
            $scope.focus = "video";
        });
    }

    var videoStop = function () {
        var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
        iframe.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        $scope.focus = "sleep";
    }

    /**
     * Show AvailableCommands
     */

    var showCommands = function () {
        var commands = artyom.getAvailableCommands();
        var length = commands.length;
        for (i = 0; i < length; i++) {
            var str = commands[i].description;
            var res = str.split("|");
            var text = eval('lang.commands.' + res[0] + '.text');
            desc = res[1];
            $scope.commands.push( { "text": text, "description": desc } );
        };
        $scope.commands.title = lang.commands.title;
    }

    /**
     * Vocie commands
     */

    var cmdShowCommands = {
        description:lang.commands.cmdShowCommands.description,
        indexes: lang.commands.cmdShowCommands.voice,
        action: function(){
            $scope.focus = "commands";
        }
    };
    artyom.addCommands(cmdShowCommands);

    var cmdHideContent = {
        description:lang.commands.cmdHideContent.description,
        indexes: lang.commands.cmdHideContent.voice,
        action: function(){
            $scope.focus = "sleep";
        }
    };
    artyom.addCommands(cmdHideContent);

    var cmdMapShow = {
        description:lang.commands.cmdMapShow.description,
        indexes: lang.commands.cmdMapShow.voice,
        action: function(){
            mapShow();
        }
    };
    artyom.addCommands(cmdMapShow);

    var cmdMapZoomIn = {
        description:lang.commands.cmdMapZoomIn.description,
        indexes: lang.commands.cmdMapZoomIn.voice,
        action: function(){
            mapZoomIn();
        }
    };
    artyom.addCommands(cmdMapZoomIn);

    var cmdMapZoomOut = {
        description:lang.commands.cmdMapZoomOut.description,
        indexes: lang.commands.cmdMapZoomOut.voice,
        action: function(){
            mapZoomOut();
        }
    };
    artyom.addCommands(cmdMapZoomOut);

    var cmdMapShowNewPlace = {
        description:lang.commands.cmdMapShowNewPlace.description,
        smart:true,
        indexes: lang.commands.cmdMapShowNewPlace.voice,
        action:function(i,wildcard){
            switch(i){
                case 0:
                    mapShowNewPlace(wildcard.trim());
                break;
                default:
                    artyom.say(lang.commands.invalid);
            }
        }
    };
    artyom.addCommands(cmdMapShowNewPlace);

    var cmdMapZoomReset = {
        description:lang.commands.cmdMapZoomReset.description,
        indexes: lang.commands.cmdMapZoomReset.voice,
        action: function(){
            mapZoomReset();
        }
    };
    artyom.addCommands(cmdMapZoomReset);

    var cmdVideoSearch = {
        description:lang.commands.cmdVideoSearch.description,
        smart:true,
        indexes: lang.commands.cmdVideoSearch.voice,
        action:function(i,wildcard){
            switch(i){
                case 0:
                    videoSearch(wildcard.trim());
                break;
                default:
                    artyom.say(lang.commands.invalid);
            }
        }
    };
    artyom.addCommands(cmdVideoSearch);

    var cmdVideoStop = {
        description:lang.commands.cmdVideoStop.description,
        indexes: lang.commands.cmdVideoStop.voice,
        action: function(){
            videoStop();
        }
    };
    artyom.addCommands(cmdVideoStop);

    /**
     * Register a refresh callback for a given interval (in minutes)
     */
    var registerRefreshInterval = function (callback, interval) {
        //Load the data initially
        callback();
        if (typeof interval !== 'undefined') {
            $interval(callback, interval * 60000);
        }
    }

    _this.init = function () {
        $scope.focus = "sleep";

        $interval(updateTime, 1000);

        $scope.greeting = config.greeting.start;
        registerRefreshInterval(greetingUpdater, 30);

        registerRefreshInterval(refreshWeatherData, config.forecast.refreshInterval);

        registerRefreshInterval(refreshRss, config.rss.refreshInterval);

        registerRefreshInterval(refreshTrafficData, config.traffic.refreshInterval);

        showCommands();

        AiService.init();

        if ($rootScope.online == true) {
            $scope.isReady=true;
        } else {
            $scope.offline = lang.offline;
        }
    }

    _this.init();

});