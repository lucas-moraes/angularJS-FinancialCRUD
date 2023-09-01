angular
    .module( 'modalCategorias', [] )
    .directive( 'modalCategorias', function () {
        return {
            restrict: 'AE',
            templateUrl: 'http://localhost:8079/frontend/app/components/modalCategorias/modalCategorias.template.html',
            controller: function ( $scope, dataSource ) {
                $scope.stateCategorias = false; //false
                $scope.isLoading = false;

                $scope.toggleCategorias = function () {
                    $scope.stateCategorias = !$scope.stateCategorias;
                };

                $scope.register = function () {
                    $scope.isLoading = false;
                    dataSource.addCategory().then( function ( response ) {
                        if ( response.status == 200 )
                        {
                            $scope.categoria = dataSource.getCategory().then( function ( response ) {
                                $scope.categoria = response.data;

                            } );
                        }
                    } );
                };
            }
        };
    } );
