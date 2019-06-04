define(function () {

    let app = angular.module("FAIRassist", ['ngRoute']);

    app.config(['$routeProvider', '$controllerProvider', '$provide', function ($routeProvider, $controllerProvider, $provide) {

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
                templateUrl: "app/home/unknown.html",
                controller: "View1Controller",
                resolve: resolveController(["View1Controller"])
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



    return app;
});