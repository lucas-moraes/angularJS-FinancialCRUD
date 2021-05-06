angular
    .module( 'modalMovimento', [ 'rw.moneymask' ] )
    .directive( 'modalMovimento', function () {
        return {
            restrict: 'AE',
            templateUrl: 'http://localhost:777/app/components/modalMovimento/modalMovimento.template.html',
            controller: function ( $scope, dataSource, formats ) {
                $scope.stateMovimento = false; //false
                $scope.titleMovimento;
                $scope.buttonTitleMovimento;
                $scope.dateMovimento;

                $scope.formatNumbers = function () {
                    formats.numbers();
                };

                $scope.toggleMovimento = function ( variable, id ) {
                    switch ( variable )
                    {
                        case 'register':
                            $scope.stateMovimento = !$scope.stateMovimento;
                            $scope.titleMovimento = "Adicionar movimento";
                            $scope.buttonTitleMovimento = "Registrar";

                            $scope.dateMovimento = new Date().toISOString().substring( 0, 10 );
                            document.getElementById( "categoria" ).value = "";
                            document.getElementById( "tipo" ).value = "";
                            document.getElementById( "valor" ).value = "";
                            document.getElementById( "descricao" ).value = "";

                            break;
                        case 'change':
                            $scope.stateMovimento = !$scope.stateMovimento;
                            $scope.titleMovimento = "Alterar movimento";
                            $scope.buttonTitleMovimento = "Alterar";

                            ( function () {
                                dataSource.movimentById( id )
                                    .then( function ( response ) {
                                        let item = response.data;

                                        $scope.id = item.id;
                                        $scope.dateMovimento = formats.date( item.dia, item.mes, item.ano );
                                        document.getElementById( "categoria" ).value = item.categoria;
                                        document.getElementById( "tipo" ).value = item.tipo;
                                        document.getElementById( "valor" ).value = Number( item.valor ).toFixed( 2 ).replace( '.', ',' ).replace( /(\d)(?=(\d{3})+\,)/g, "$1." );
                                        document.getElementById( "descricao" ).value = item.descricao;
                                    } );
                            } )();

                            break;
                        default:
                            $scope.stateMovimento = !$scope.stateMovimento;
                            $scope.titleMovimento = "";
                            $scope.buttonTitleMovimento = "";
                            $scope.dateMovimento = "";
                            break;
                    }
                };

                $scope.registerMovimento = function ( variable ) {
                    switch ( variable )
                    {
                        case 'add':
                            dataSource.addItem().then( function ( response ) {
                                if ( response.status == 200 )
                                {
                                    $scope.stateMovimento = false;
                                    dataSource.getMoviment().then( response => $scope.movimentacao = response.data );
                                }
                            } );
                            break;
                        case 'update':
                            dataSource.updateItem( $scope.id ).then( function ( response ) {
                                if ( response.status == 200 )
                                {
                                    $scope.stateMovimento = false;
                                    dataSource.getMoviment().then( response => $scope.movimentacao = response.data );
                                }
                            } );
                            break;
                    }
                };
            }
        };
    } );
