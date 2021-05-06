angular
    .module( 'cloudcontApp' )
    .service( 'dataSource', function ( $http ) {

        this.getMoviment = function () {
            return $http.get( 'http://localhost:777/view/MovimentGet.php' );
        };

        this.getDate = function () {
            return $http.get( 'http://localhost:777/view/DateGet.php' );
        };

        this.getCategory = function () {
            return $http.get( 'http://localhost:777/view/CategoryGet.php' );
        };

        this.filterMoviment = function () {
            let categories = document.getElementById( 'select_category' ).value;
            let month = document.getElementById( 'select_month' ).value;
            let year = document.getElementById( 'select_year' ).value;

            let formdata = new FormData();
            formdata.append( "category", categories );
            formdata.append( "month", month );
            formdata.append( "year", year );

            return $http( {
                method: 'POST',
                url: 'http://localhost:777/view/MovimentFilter.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            } );
        };

        this.movimentById = function ( id ) {
            let formdata = new FormData();
            formdata.append( "id", id );

            return $http( {
                method: 'POST',
                url: 'http://localhost:777/view/MovimentGetById.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            } );
        };

        this.deleteItem = function ( id ) {
            let formdata = new FormData();
            formdata.append( "id", id );

            return $http( {
                method: 'POST',
                url: 'http://localhost:777/view/MovimentDel.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            } );
        };

        this.getGroup = function ( mes, ano ) {
            var formdata = new FormData();
            formdata.append( "month", mes );
            formdata.append( "year", ano );

            return $http( {
                method: 'POST',
                url: 'http://localhost:777/view/MovimentGetGroup.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            } );
        };

        this.addItem = function () {
            let date = document.getElementById( 'date' ).value;
            let categories = document.getElementById( 'categoria' );
            categories = categories.options;
            let categoryId = categories[ categories.selectedIndex ].value;
            let type = document.getElementById( 'tipo' );
            type = type.options;
            let typeId = type[ type.selectedIndex ].value;
            let description = document.getElementById( 'descricao' ).value;
            let value = document.getElementById( 'valor' ).value;

            let formdata = new FormData();
            formdata.append( "date", date );
            formdata.append( "type", typeId );
            formdata.append( "category", categoryId );
            formdata.append( "description", description );
            formdata.append( "value", value );

            return $http( {
                method: 'POST',
                url: 'http://localhost:777/view/MovimentReg.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            } );

        };

        this.addCategory = function () {
            let item = document.getElementById( 'addCategory' ).value;

            let formdata = new FormData();
            formdata.append( "description", item );

            return $http( {
                method: 'POST',
                url: 'http://localhost:777/view/CategoryReg.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            } );
        };

        this.updateItem = function ( id ) {
            let date = document.getElementById( 'date' ).value;
            let categories = document.getElementById( 'categoria' );
            categories = categories.options;
            let categoryId = categories[ categories.selectedIndex ].value;
            let type = document.getElementById( 'tipo' );
            type = type.options;
            let typeId = type[ type.selectedIndex ].value;
            let description = document.getElementById( 'descricao' ).value;
            let value = document.getElementById( 'valor' ).value;

            let formdata = new FormData();
            formdata.append( "id", id );
            formdata.append( "date", date );
            formdata.append( "type", typeId );
            formdata.append( "category", categoryId );
            formdata.append( "description", description );
            formdata.append( "value", value );

            return $http( {
                method: 'POST',
                url: 'http://localhost:777/view/MovimentSet.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            } );
        };

    } )
    .service( 'formats', function () {
        this.date = function ( day, mounth, year ) {

            if ( day < 10 ) { day = "0" + day; }
            if ( mounth < 10 ) { mounth = "0" + mounth; }

            let dateFormated = year + "-" + mounth + "-" + day;

            return dateFormated;
        };

        this.number = function ( variable ) {
            return Number( variable ).toFixed( 2 ).replace( '.', ',' ).replace( /(\d)(?=(\d{3})+\,)/g, "$1." );
        };
    } )
    .service( 'effects', function () {
        this.animation = function () {
            const animation = document.getElementById( "animation" );
            animation.style.right = "75px";
            animation.style.filter = "opacity(0%)";
            animation.style.transition = "0.5s";
            setTimeout( function () {
                animation.style.right = "0px";
                animation.style.filter = "opacity(100%)";
                animation.style.transition = "0.5s";
                setTimeout( function () { animation.style.removeProperty( "filter" ); }, 100 );
            }, 500 );
        };
    } );









