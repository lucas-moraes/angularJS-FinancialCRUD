var app =
    angular
        .module( 'cloudcontApp', [ 'ui.router', 'oc.lazyLoad' ] )
        .config(
            function ( $stateProvider, $urlRouterProvider, $locationProvider ) {
                $urlRouterProvider.otherwise( "/painel" );

                $locationProvider.html5Mode( true );
                $locationProvider.hashPrefix( '' );

                $stateProvider
                    .state( 'painel', {
                        url: '/painel',
                        templateUrl: './app/pages/painel/index.html',
                        resolve: {
                            cloudcontApp: function ( $ocLazyLoad ) {
                                return $ocLazyLoad.load( {
                                    files: [
                                        './app/service/service.js',
                                        './app/pages/painel/painel.directive.js',
                                        './app/components/modalMovimento/modalMovimento.directive.js',
                                        './app/components/modalCategorias/modalCategorias.directive.js',
                                        './app/components/modalConjunto/modalConjunto.directive.js',
                                        './app/components/navbar/navbar.directive.js',
                                    ]
                                } );
                            }
                        }

                    } )

                    .state( 'resumes', {
                        url: '/resumes',
                        templateUrl: './app/pages/resumes/index.html',
                        resolve: {
                            cloudcontApp: function ( $ocLazyLoad ) {
                                return $ocLazyLoad.load( {
                                    files: [
                                        './app/service/service.js',
                                        './app/pages/resumes/resumes.directive.js',
                                        './app/components/navbar/navbar.directive.js'
                                    ]
                                } );
                            }
                        }
                    } );
            } );