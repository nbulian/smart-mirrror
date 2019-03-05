var config = {
  // Lenguage for the mirror
  language: "es",
  debugmode: false,
  headtracker: true, //face recognition
  artyom: true, //voice commands

   // An array of greetings to randomly choose from
  //greeting: ["Hi, sexy!", "Bienvenido majestad"]

  // Alternativly you can have greetings that appear based on the time of day
  greeting : {
     start: lang.greeting.start,
     night: lang.greeting.night,
     morning: lang.greeting.morning,
     midday: lang.greeting.midday,
     evening: lang.greeting.evening
  },

  // forecast.io
  forecast: {
      key: "", // Your forecast.io api key
      units: "auto", // See forecast.io documentation if you are getting the wrong units
      refreshInterval: 2, // Number of minutes the information is refreshed. Forecast.io limits requests to 1000/day: a 2min interval = 720 calls/day
  },

  //use this only if you want to hardcode your geoposition (used for weather)
  geoPosition: {
     latitude: 0,
     longitude: 0
  },
  rss: {
      feeds: ["http://contenidos.lanacion.com.ar/herramientas/rss/origen=2"],  // RSS feeds list - e.g. ["rss1.com", "rss2.com"]
      refreshInterval: 10, // Number of minutes the information is refreshed
      mode: 'sequence' //sequence or random
  },
  traffic: {
    key: "", // Bing Maps API Key
    refreshInterval: 5, // Number of minutes the information is refreshed
    // An array of tips that you would like to display travel time for
    trips : [{
          mode: "Driving", // Possibilities: Driving / Transit / Walking
          origin: "", // Start of your trip. Human readable address.
          via: "",  // [Optional] Set an intermediate goal for getting an alternate route for example
          destination: "", // Destination of your trip. Human readable address.
          name: "", // Name of your destination ex: "work"
          /*startTime: "",
          endTime: ""*/ // Optional starttime and endtime when the traffic information should be displayed on screen. The format can be either hh:mm or hh:mm am/pm
    }
  ]
  },
  map: {
      key: "", //Google Static Maps API Key
      locaiton: "", //default map locaiton
      zoom: 13 //default zoom is 13
  },
  youtube: {
      key: "" // Your YouTube API key
  },
};
