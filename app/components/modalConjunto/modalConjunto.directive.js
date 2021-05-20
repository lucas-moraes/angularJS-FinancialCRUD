angular
    .module( 'modalConjunto', [ 'rw.moneymask' ] )
    .directive( 'modalConjunto', function () {
        return {
            restrict: 'AE',
            templateUrl: 'http://localhost:777/app/components/modalConjunto/modalConjunto.template.html',
            controller: function ( $scope, dataSource, formats ) {
                $scope.stateConjunto = false; //false

                $scope.toggleConjunto = function () {
                    $scope.stateConjunto = !$scope.stateConjunto;
                    ( function () {
                        dataSource.filterConjunto().then( response => {
                            $scope.conjunto = [];
                            response.data.moviment.forEach( ( element ) => {
                                $scope.conjunto.push( element );
                            } );
                        } );
                    } )();
                };

                $scope.deleteItemConjunto = function ( index ) {
                    $scope.conjunto.splice( index, 1 );
                };

                $scope.addConjunto = function () {
                    $scope.stateConjunto = !$scope.stateConjunto;
                    let translate = {};
                    $scope.categoria.categoria.forEach( ( element ) => {
                        let a = element.nome;
                        let b = element.id;
                        let ab = JSON.parse( `{${ JSON.stringify( a ) }:${ b }}` );
                        translate = Object.assign( translate, ab );
                    } );

                    $scope.conjunto.forEach( element => {
                        let original = element.categoria;
                        let cat = original.replace( original, original => translate[ original ] );
                        dataSource.addConjunto( cat, element.tipo, element.valor );
                    } );
                };


            }
        };
    } );
