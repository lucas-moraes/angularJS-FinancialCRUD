app
    .directive( 'navbar', function () {
        return {
            restrict: 'AE',
            templateUrl: 'http://localhost:8079/frontend/app/components/navbar/navbar.template.html',
            controller: function ( $scope ) {
                $scope.state = false;
                $scope.toggle = function () {
                    $scope.state = !$scope.state;
                };
            }
        };
    } );