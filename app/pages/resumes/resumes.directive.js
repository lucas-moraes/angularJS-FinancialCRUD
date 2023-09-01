angular
    .module( 'cloudcontApp' )
    .directive( 'resumes', function () {
        return {
            restrict: 'AE',
            templateUrl: 'http://localhost:8079/frontend/app/pages/resumes/resumes.template.html',
            controller: function ( $scope, dataSource, formats, effects ) {

                ( function () {
                    effects.animation();
                } )();

                let d = new Date();
                let mesAtual = d.getMonth() + 1;
                let anoAtual = d.getFullYear();

                $scope.style = {
                    positivo: 'has-text-link',
                    negativo: 'has-text-danger'
                };

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

                $scope.dataGroup = dataSource.getGroup( mesAtual, anoAtual )
                    .then( function ( response ) {
                        $scope.dataGroup = response.data;
                        translatorMonth( response.data.mes );
                        $scope.anoNome = response.data.ano;
                    } );

                function translatorMonth ( arg ) {
                    $scope.mesNome = arg.replace( arg, x => monthTranslation[ x ] );
                };

                $scope.number = function ( variable ) {
                    return formats.number( variable );
                };




            }
        };
    } );


