define(['app'], function (app) {

  app.controller('indexCtrl', ['$scope', function($scope) {

    $scope.welcome = "Example Single Page App - MEAN";
    $scope.appTechs = {
      'angular' : [
          {'name': 'Config'},
          {'name': 'Controller'},
          {'name': 'Directive'},
          {'name': 'Factory'},
          {'name': 'NgRoute'},
          {'name': 'NgResource'},
          {'name': 'UI Bootstrap'},
        ],
      'bootstrap' : [
          {'name': 'Buttons'},
          {'name': 'Grid System'},
          {'name': 'Helper Classes'},
          {'name': 'Glyphicons'},
          {'name': 'Modals'},
          {'name': 'Tabs'},
        ],
      'express' : [
          {'name': 'MVC Server-Side Routing'},
          {'name': 'Jade Templating'},
          {'name': 'REST API'},
          {'name': 'JSON format handling'},
        ],
      'libraries' : [
          {'name': 'AngularJS'},
          {'name': 'Require.js'},
          {'name': 'jQuery'},
          {'name': 'Bootstrap'},
        ],

    };
  }]);
});
