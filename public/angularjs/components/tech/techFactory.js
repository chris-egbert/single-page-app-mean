define(['app'], function (app) {

    app.factory('techFactory', ['$resource', function($resource) {

                /*

                return {
                        'get' : function() {
                                return $http.get('/tech');
                        },
                        'create' : function(techData) {
                                return $http.post('/tech', techData);
                        },
                        'delete' : function(id) {
                                return $http.delete('/tech/' + id);
                        },
                        'getCategoryOptions' : function () {
                                return ['Front End', 'Backend'];
                        },
                        'getRatingOptions' : function () {
                                return [1, 2, 3, 4, 5];
                        },
                }

                */

        // Core API handling
        var api = $resource('/tech/:id', {id: '@_id'}, {
                      update : {
                          method: 'PUT'
                      }
                  });

        // Category Options
        api.prototype.getCategoryOptions = function () {
            return ['Front End', 'Backend'];
        }

        return api;
    }]);



});
