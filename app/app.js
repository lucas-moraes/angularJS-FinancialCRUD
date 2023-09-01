var app =
    angular
        .module( 'cloudcontApp', [ 'ui.router', 'oc.lazyLoad' ] )
        .config(
            function ( $stateProvider, $urlRouterProvider, $locationProvider ) {
                $urlRouterProvider.otherwise( "/painel" );

                $locationProvider.html5Mode( false );
                $locationProvider.hashPrefix( '' );

                $stateProvider
                    .state( 'painel', {
                        url: '/painel',
                        templateUrl: 'http://localhost:8079/frontend/app/pages/painel/index.html',
                        resolve: {
                            cloudcontApp: function ( $ocLazyLoad ) {
                                return $ocLazyLoad.load( {
                                    files: [
                                        'http://localhost:8079/frontend/app/service/service.js',
                                        'http://localhost:8079/frontend/app/pages/painel/painel.directive.js',
                                        'http://localhost:8079/frontend/app/components/modalMovimento/modalMovimento.directive.js',
                                        'http://localhost:8079/frontend/app/components/modalCategorias/modalCategorias.directive.js',
                                        'http://localhost:8079/frontend/app/components/modalConjunto/modalConjunto.directive.js',
                                        'http://localhost:8079/frontend/app/components/navbar/navbar.directive.js',
                                    ]
                                } );
                            }
                        }
                    } )

                    .state( 'resumes', {
                        url: '/resumes',
                        templateUrl: 'http://localhost:8079/frontend/app/pages/resumes/index.html',
                        resolve: {
                            cloudcontApp: function ( $ocLazyLoad ) {
                                return $ocLazyLoad.load( {
                                    files: [
                                        'http://localhost:8079/frontend/app/service/service.js',
                                        'http://localhost:8079/frontend/app/pages/resumes/resumes.directive.js',
                                        'http://localhost:8079/frontend/app/components/navbar/navbar.directive.js'
                                    ]
                                } );
                            }
                        }
                    } );
            } );
