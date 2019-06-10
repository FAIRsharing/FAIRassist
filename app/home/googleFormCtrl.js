define([], function () {
    let googleFormController = function ($scope, $sce) {
        $scope.showGoogleForm = false;
        $scope.form_URL = $sce.trustAsResourceUrl("");

        $scope.toggleFrame = function(){
            $scope.showGoogleForm = !$scope.showGoogleForm;
        }
    };

    googleFormController.$inject = ['$scope', '$sce'];

    return googleFormController;
});