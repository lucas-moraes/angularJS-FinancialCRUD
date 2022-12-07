angular
    .module( 'modalConjunto', [ 'rw.moneymask' ] )
    .directive( 'modalConjunto', function () {
        return {
            restrict: 'AE',
            templateUrl: 'http://localhost:8079/cloudcont/frontend/app/components/modalConjunto/modalConjunto.template.html',
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
                        let a = element.descricao;
                        let b = element.id;
                        let ab = JSON.parse( `{${ JSON.stringify( a ) }:${ b }}` );
                        translate = Object.assign( translate, ab );
                    } );

                    let index = 0;
                    const Trigger = ( int ) => {
                        index = index + int;
                        if ( index < $scope.conjunto.length )
                        {
                            let original = $scope.conjunto[ index ].categoria;
                            let cat = original.replace( original, original => translate[ original ] );
                            dataSource.addConjunto( cat, $scope.conjunto[ index ].tipo, $scope.conjunto[ index ].valor )
                                .then( ( res ) => {
                                    if ( res.data <= 0 )
                                    {
                                        console.log( res );
                                    }
                                    else
                                    {
                                        Trigger( 1 );
                                    }
                                } );

                        }
                    };

                    Trigger( index );

                };


            }
        };
    } );
