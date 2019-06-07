define(['app'], function (app) {
    app.register.controller('View1Controller', ['$scope', function ($scope) {

        $scope.data = {};
        $scope.data.title = "List of FAIR evaluation services";
        $scope.data.labels = [
            "label 1",
            "label 2",
            "label 3",
            "label 4",
            "label 5"
        ];
        $scope.data.content = [
        ]



    }])
});
