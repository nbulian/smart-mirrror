app.service('SearchService', function($http) {

    //Returns the YouTube search results for the given query
    this.searchYouTube = function (query) {
        return $http({
            url: 'https://www.googleapis.com/youtube/v3/search',
            method: 'GET',
            params: {
                'part': 'snippet',
                'order': 'relevance',
                'q': query,
                'type': 'video',
                'videoEmbeddable': 'true',
                'key': config.youtube.key
            }
        }).then(function (response) {
                return response.data.items[0].id.videoId;
        });
    }
    return this;

});