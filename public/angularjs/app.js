define(function () {
    /**
     * configure the main app module
     * @type {*|module}
     */
    var app = angular.module('App', ['ui.bootstrap', 'ngResource', 'ngRoute', 'routeResolver','oc.lazyLoad'])

        .config(function ($routeProvider, $locationProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider) {

            /**
             * configure the ocLazyLoader to use requireJS as the loader
             */
            $ocLazyLoadProvider.config({
                asyncLoader: require
            });

            /**
             * override angular default module api for creating components
             * @type {Function|register|register|register}
             */
            app.controller = $controllerProvider.register;
            app.service = $provide.service;
            app.factory = $provide.factory;
            app.filter = $filterProvider.register;
            app.directive = $compileProvider.directive;

            // $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');

            /**
             * get referance to the route method of routeResolverProvider
             * @type {*}
             */
            var route = routeResolverProvider.route;

            $routeProvider
                .when('/welcome', route.resolve('index', 'Index'))
                .when('/techs', route.resolve('tech', 'Index', ['tech/techFactory']))
                // .when('/users/edit/:id', route.resolve('userForm', ['userMngr','validation']))
                .when('/', {redirectTo: '/welcome'})
        });

    return app;
});



