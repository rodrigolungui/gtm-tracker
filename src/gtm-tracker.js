(function(global){
  var GTMTracker = {};
  global.GTMTracker = GTMTracker;

  GTMTracker.options = {
    'event': 'eventTracking',
    'eventCategory': null,
    'eventAction': null,
    'eventLabel': null
  };

  GTMTracker.init = function(options) {
    this.setProperties(options);
    this.bindEvents();
  };

  GTMTracker.bindEvents = function() {
    document.body.addEventListener('click', function(event){
      var element = event.target,
          data = element.getAttribute('data-gtm');

      if (data)
        this.fetchOptions(data.split(/\s*,\s*/));

      event.preventDefault();
    }.bind(this));
  };

  GTMTracker.setProperties = function(options) {
    for(var property in options) {
      if (this.options.hasOwnProperty(property)) {
        this.options[property] = options[property];
      }
    }
  };

  GTMTracker.trackEvent = function() {
    var options = this.options;

    if (global.dataLayer !== undefined) {
      dataLayer.push(options);
      return true;
    }

    return false;
  };

  GTMTracker.fetchOptions = function() {
    var data = [ ].slice.call(arguments);

    if (data && data[0]) {
      var data = data[0],
          eventAction = data[0],
          eventLabel = data[1];

      var options = {
        'eventAction': eventAction,
        'eventLabel': eventLabel
      };
      this.setProperties(options);
      this.trackEvent();
    }
  };
})(window);