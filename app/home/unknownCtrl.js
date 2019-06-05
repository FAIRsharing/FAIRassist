define(['app'], function (app) {
    app.register.controller('View1Controller', ['$scope', function ($scope) {

        $scope.data = {}
        $scope.data.title = "Page title unknown yet";
        $scope.data.labels = [
            "label 1",
            "label 2",
            "label 3"
        ]


    }])
});
