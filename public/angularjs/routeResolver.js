define(['angular'],function () {
    /**
     * this service returns a valid route definition object
     * for the angular route 'when' method
     *
     * @type {*|module}
     */
    angular.module('routeResolver', [])

        .provider('routeResolver', function () {

            this.$get = function () {
                return this;
            };

            /**
             * configuration object
             */
            this.routeConfig = (function () {

                var serviceDirectory = '/angularjs/services/',
                    componentsDirectory = '/angularjs/components/',
                    viewsDirectory = 'views/',


                    setServiceDirectory = function (serviceDir) {
                        serviceDirectory = serviceDir + '/';
                    },

                    getServiceDirectory = function () {
                        return serviceDirectory;
                    },

                    setComponentsDirectory = function (componentDir) {
                        componentsDirectory = componentDir + '/';
                    },

                    getComponentsDirectory = function () {
                        return componentsDirectory;
                    },

                    setViewsDirectory = function (viewsDir) {
                        viewsDirectory = viewsDir + '/';
                    },

                    getViewsDirectory = function () {
                        return viewsDirectory;
                    };

                return {
                    setServiceDirectory: setServiceDirectory,
                    getServiceDirectory: getServiceDirectory,
                    setViewsDirectory: setViewsDirectory,
                    getViewsDirectory: getViewsDirectory,
                    setComponentsDirectory: setComponentsDirectory,
                    getComponentsDirectory: getComponentsDirectory

                };
            }());

            /**
             * build and return the route defniation object
             */
            this.route = function (routeConfig) {

                var resolve = function (component, action, services) {

                        var componentDir = component + '/';
                        var routeDef = {};

                        routeDef.templateUrl = routeConfig.getComponentsDirectory() + componentDir + component + action + 'View.html';
                        routeDef.controller = component + 'Ctrl';
                        routeDef.resolve = {

                            load: ['$q', '$rootScope', function ($q, $rootScope) {

                                /**
                                 * init the controller dependency
                                 * @type {Array}
                                 */
                                var dependencies = [routeConfig.getComponentsDirectory() + componentDir + component + 'Ctrl.js'];

                                /**
                                 * add services to dependencies array
                                 */
                                if (services) {
                                    var service;
                                    for (service in services) {
                                        if (services.hasOwnProperty(service)) {
                                            dependencies.push(routeConfig.getComponentsDirectory() + services[service] + '.js');
                                        }
                                    }
                                }
                                return resolveDependencies($q, $rootScope, dependencies);
                            }]
                        };

                        return routeDef;
                    },

                    /**
                     * load the required dependencies, resolve
                     * a promise on sucsses
                     * @param $q
                     * @param $rootScope
                     * @param dependencies
                     * @returns {Function|promise}
                     */
                        resolveDependencies = function ($q, $rootScope, dependencies) {
                        var defer = $q.defer();
                        require(dependencies, function () {
                            defer.resolve();
                            $rootScope.$apply()
                        });

                        return defer.promise;
                    };

                return {
                    resolve: resolve
                }

            }(this.routeConfig);

        });
});
