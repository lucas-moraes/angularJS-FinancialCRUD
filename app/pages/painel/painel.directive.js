angular
    .module( 'cloudcontApp' )
    .directive( 'painel', function () {
        return {
            restrict: 'AE',
            templateUrl: 'http://localhost:777/app/pages/painel/painel.template.html',
            controller: function ( $scope, dataSource, effects ) {

                ( function () {
                    effects.animation();
                } )();

                $scope.movimentacao = dataSource.getMoviment().then( response => { $scope.movimentacao = response.data; } );

                $scope.data = dataSource.getDate().then( function ( response ) { $scope.data = response.data; } );

                $scope.categoria = dataSource.getCategory().then( function ( response ) { $scope.categoria = response.data; } );

                $scope.delete = function ( id ) {
                    dataSource.deleteItem( id ).then( function ( response ) {
                        if ( response.status == 200 )
                        {
                            dataSource.getMoviment().then( response => $scope.movimentacao = response.data );
                        }
                    } );
                };

                $scope.style = function ( value ) {
                    if ( value > 0 )
                    {
                        return 'has-text-info';
                    } else
                    {
                        return 'has-text-danger';
                    }
                };

                $scope.monetize = function ( money ) {
                    return Number( money ).toFixed( 2 ).replace( '.', ',' ).replace( /(\d)(?=(\d{3})+\,)/g, "$1." );
                };

                $scope.monthTranslate = function ( arg ) {
                    let monthTranslation = {
                        '1': 'janeiro',
                        '2': 'fevereiro',
                        '3': 'março',
                        '4': 'abril',
                        '5': 'maio',
                        '6': 'junho',
                        '7': 'julho',
                        '8': 'agosto',
                        '9': 'setembro',
                        '10': 'outubro',
                        '11': 'novembro',
                        '12': 'dezembro'
                    };
                    return arg.replace( arg, arg => monthTranslation[ arg ] );
                };

                $scope.filterMoviment = function () {
                    dataSource.filterMoviment().then( response => { $scope.movimentacao = response.data; } );
                };

            }
        };
    } );


