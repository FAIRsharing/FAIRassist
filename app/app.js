/*define(['angular', 'home/testCtrl'], function (angular,controller) {
    angular.module('app',[])
        .controller('myController', controller);
});*/

define(['angular', 'home/googleFormCtrl'], function (angular, controller) {

    let app = angular.module("FAIRassist", ['ngRoute']);

    // Inject the googleFormController (different from using into a view, see below) */
    app.controller('googleFormController', controller);

    app.config(['$routeProvider', '$controllerProvider', '$provide', function ($routeProvider,
                                                                               $controllerProvider,
                                                                               $provide) {

        app.register = {
            controller: $controllerProvider.register,
            factory: $provide.factory
        };

        function resolveController(names) {
            return {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    let defer = $q.defer();
                    require(names, function () {
                        defer.resolve();
                        $rootScope.$apply();
                    });
                    return defer.promise;
                }]
            }
        }

        $routeProvider
            .when("/", {
                templateUrl: "app/home/home.html",
                controller: "HomeController",
                resolve: resolveController(["HomeController"])
            })
            .otherwise({redirectTo: '/'});
    }]);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['FAIRassist']);
    });

    app.directive('navigation', function(){
        return{
            restrict: 'A',
            templateUrl: 'app/navigation/navBar.html',
        }
    });

    app.directive('googleForm', function(){
        return{
            restrict: 'A',
            templateUrl: 'app/home/googleForm.html',
        }
    });

    app.filter('remove_dash', function() {
        return function (str) {
            return str.replace(/-/g, ' ');
        };
    });

    return app;
});