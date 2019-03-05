var app = angular.module("SmartMirror", ['angularMoment', 'ngAnimate']);

app.run(function($window, $rootScope) {
      $rootScope.online = navigator.onLine;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
          $rootScope.isReady = false;
          $rootScope.offline = lang.offline;
        });
      }, false);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;
          $rootScope.isReady = true;
          $rootScope.offline = '';
        });
      }, false);
});

/*
app.config(function($httpProvider) {
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
*/