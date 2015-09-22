'use strict';

require.config({
    baseUrl: '/angularjs',
    paths: {
	'angular': '/bower_components/angular/angular.min',
        'angular-animate' : '/bower_components/angular-animate/angular-animate.min',
        'angular-bootstrap' : '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-cookies' : '/bower_components/angular-cookies/angular-cookies.min',
        'angular-mocks' : '/bower_components/angular-mocks/angular-mocks',
        'angular-resource' : '/bower_components/angular-resource/angular-resource.min',
        'angular-route' : '/bower_components/angular-route/angular-route.min',
        'angular-sanitize' : '/bower_components/angular-sanitize/angular-sanitize.min',
        'angular-ui-select' : '/bower_components/angular-ui-select/dist/select.min',
        // 'angular-ui-router' : '/bower_components/angular-ui-router/release/angular-ui-router.min',
	'jquery': '/bower_components/jquery/dist/jquery.min',
        'oc-lazy-load' : '/angularjs/ocLazyLoad',
	'react': '/bower_components/react/react',
	'react-jsx': '/bower_components/react/JSXTransformer',
	'react-bootstrap': '/bower_components/react-bootstrap/react-bootstrap.min',
        'route-resolver' : '/angularjs/routeResolver'
	},
    shim: {
	'angular': {
            deps: ['jquery'],
	    exports: 'angular'
	    },
        'angular-animate' : {
            deps: ['angular']
            },
        'angular-bootstrap' : {
            deps: ['angular']
            },
        'angular-cookies' : {
            deps: ['angular']
            },
        'angular-mocks' : {
            deps: ['angular']
            },
        'angular-resource' : {
            deps: ['angular']
            },
        'angular-route' : {
            deps: ['angular']
            },
        'angular-sanitize' : {
            deps: ['angular']
            },
        'angular-ui-select' : {
            deps: ['angular']
            },
        'react-jsx' : {
            deps: ['react'],
            exports: 'JSXTransformer'
            },
        'react-bootstrap' : {
            deps: ['react', 'react-jsx']
            },
        'route-resolver' : {
            deps: ['angular']
            },
        'oc-lazy-load' : {
            deps: ['angular', 'angular-animate']
            },
        'app' : {
            deps: ['angular', 'angular-bootstrap', 'angular-resource', 'angular-route', 'route-resolver', 'oc-lazy-load', 'react', 'react-jsx', 'react-bootstrap']
            },
        'components/common/menuFactory' : {
            deps: ['app']
            },

	}
});

// Required to expose React to the global scope
require(['react'], function(React) {
    window.React = React;
});

require([
    'angular', 
    'angular-bootstrap', 
    'angular-cookies', 
    'angular-mocks', 
    'angular-resource', 
    'angular-route', 
    'angular-sanitize',
    'angular-ui-select', 
    'jquery',
    'react',
    'react-bootstrap',
    'route-resolver',
    'oc-lazy-load',
    'app',
    'components/common/menuFactory'
    ], 
    function () {
      angular.bootstrap(document, ['App']);
    }
);
