app
    .directive( 'navbar', function () {
        return {
            restrict: 'AE',
            templateUrl: 'http://localhost:777/app/components/navbar/navbar.template.html',
            controller: function ( $scope ) {
                $scope.state = false;
                $scope.toggle = function () {
                    $scope.state = !$scope.state;
                };
            }
        };
    } );