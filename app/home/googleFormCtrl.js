define([], function () {
    let googleFormController = function ($scope, $sce) {
        $scope.showGoogleForm = false;
        $scope.form_URL = $sce.trustAsResourceUrl("https://docs.google.com/forms/d/e/1FAIpQLSf0_tqdJ4T2vMYbKKLX0RWgack0ZpvMwrzSg29nmdmRIDQImA/viewform?embedded=true");

        $scope.toggleFrame = function(){
            $scope.showGoogleForm = !$scope.showGoogleForm;
            document.body.style.overflowY = 'hidden';
            if (!$scope.showGoogleForm) {
              document.body.style.overflowY = 'scroll';
            }
        }
    };

    googleFormController.$inject = ['$scope', '$sce'];

    return googleFormController;
});