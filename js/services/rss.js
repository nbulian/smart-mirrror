app.service('RssService', function($http, $q) {
    var service = {};
    service.feed = [];
    service.currentFeed = 0;

    this.init = function () {
        service.feed = [];
        service.currentFeed = 0;
        var currentTime = new moment();

        if (typeof config.rss != 'undefined' && typeof config.rss.feeds != 'undefined') {
            var promises = [];
            angular.forEach(config.rss.feeds, function (url) {
                promises.push($http.jsonp('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20\'' + encodeURIComponent(url) + '\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK'));
            });

            return $q.all(promises).then(function (response) {
                if (response.length > 0) {
                    for (var i = 0; i < response['0'].data.query.results.feed.entry.length; i++) {
                        var feedEntry = {
                            title: response['0'].data.query.results.feed.entry[i].title,
                            content: response['0'].data.query.results.feed.entry[i].content.div.content,
                            lastUpdated: currentTime,
                        };
                        service.feed.push(feedEntry);
                    }
                }
            });
        }
    }

    this.refreshRssList = function () {
        return this.init().then(function (entries) {
            return entries;
        });
    };

    this.getNews = function () {
        if (service.feed == null) {
            return null;
        }
        switch (config.rss.mode) {
            case 'random':
                service.currentFeed = Math.floor(Math.random() * service.feed.length);
                break;

            case 'sequence':
            default:
                if (service.currentFeed == (service.feed.length - 1)) {
                    service.currentFeed = 0;
                }
                else {
                    service.currentFeed = service.currentFeed + 1;
                }
        };
        return service.feed[service.currentFeed];
    };

    return this;

});