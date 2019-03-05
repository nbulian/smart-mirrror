app.service('TimeboxService', function() {

    this.shouldDisplay = function (startTime, endTime) {
      if (startTime === undefined && endTime === undefined) {
        return true;
      } else {
        var now = new moment();
        var format = null;
        if (startTime.match(/am/i) || startTime.match(/pm/i)) {
          format = 'h:mm a';
        } else {
          format = 'HH:mm';
        }
        var start = new moment(startTime, format);
        var end = new moment(endTime, format);

        return now.isBetween(start, end);
      }
    }

    return this;
});