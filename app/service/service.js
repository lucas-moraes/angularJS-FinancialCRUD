angular
    .module('cloudcontApp')
    .service('dataSource', function ($http, $q) {

        this.getMoviment = function () {
            return $http.get('http://localhost:8079/cloudcont/backend/view/MovimentGet.php');
        };

        this.getDate = function () {
            return $http.get('http://localhost:8079/cloudcont/backend/view/DateGet.php');
        };

        this.getCategory = function () {
            return $http.get('http://localhost:8079/cloudcont/backend/view/CategoryGet.php');
        };

        this.filterMoviment = function () {
            let categories = document.getElementById('select_category').value;
            let month = document.getElementById('select_month').value;
            let year = document.getElementById('select_year').value;

            let formdata = new FormData();
            formdata.append("category", categories);
            formdata.append("month", month);
            formdata.append("year", year);

            return $http({
                method: 'POST',
                url: 'http://localhost:8079/cloudcont/backend/view/MovimentFilter.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            });
        };

        this.filterConjunto = function () {
            let date = new Date();

            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            let formdata = new FormData();
            formdata.append("month", month);
            formdata.append("year", year);

            return $http({
                method: 'POST',
                url: 'http://localhost:8079/cloudcont/backend/view/MovimentFilter.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            });
        };

        this.movimentById = function (id) {
            let formdata = new FormData();
            formdata.append("id", id);

            //return { "id": "1449", "dia": "8", "mes": "2", "ano": "2021", "tipo": "saida", "categoria": "41", "descricao": "PAGO", "valor": "1715.68994140625" };
            return $http({
                method: 'POST',
                url: 'http://localhost:8079/cloudcont/backend/view/MovimentGetById.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            });
        };

        this.deleteItem = function (id) {
            let formdata = new FormData();
            formdata.append("id", id);

            return $http({
                method: 'POST',
                url: 'http://localhost:8079/cloudcont/backend/view/MovimentDel.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            });
        };

        this.getGroup = function (mes, ano) {
            var formdata = new FormData();
            formdata.append("month", mes);
            formdata.append("year", ano);

            return $http({
                method: 'POST',
                url: 'http://localhost:8079/cloudcont/backend/view/MovimentGetGroup.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            });
        };

        this.addItem = function () {
            let date = document.getElementById('date').value;
            let categories = document.getElementById('categoria');
            categories = categories.options;
            let categoryId = categories[categories.selectedIndex].value;
            let type = document.getElementById('tipo');
            type = type.options;
            let typeId = type[type.selectedIndex].value;
            let description = document.getElementById('descricao').value;
            let value = document.getElementById('valor').value;

            let formdata = new FormData();
            formdata.append("date", date);
            formdata.append("type", typeId);
            formdata.append("category", categoryId);
            formdata.append("description", description);
            formdata.append("value", value);

            return $http({
                method: 'POST',
                url: 'http://localhost:8079/cloudcont/backend/view/MovimentReg.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            });

        };

        this.addConjunto = function (categoryId, type, value) {
            let date = new Date();
            let day = date.getDay();
            let month = date.getMonth();
            let year = date.getFullYear();
            let valor = value < 0 ? value * -1 : value;
            valor = Number(valor).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");

            let dateString = `${year}-${month + 2}-${day + 1}`;

            let formdata = new FormData();
            formdata.set("date", dateString);
            formdata.set("type", type);
            formdata.set("category", categoryId);
            formdata.set("description", " ");
            formdata.set("value", valor);

            let deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://localhost:8079/cloudcont/backend/view/MovimentReg.php',
                data: formdata,
                timeout: 1000,
                headers: { 'Content-Type': undefined }
            })
                .then((response) => {
                    deferred.resolve(response);
                })
                .catch((response) => {
                    deferred.reject(response);
                });
            return deferred.promise;

        };

        this.addCategory = function () {
            let item = document.getElementById('addCategory').value;

            let formdata = new FormData();
            formdata.append("description", item);

            return $http({
                method: 'POST',
                url: 'http://localhost:8079/cloudcont/backend/view/CategoryReg.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            });
        };

        this.updateItem = function (id) {
            let date = document.getElementById('date').value;
            let categories = document.getElementById('categoria');
            categories = categories.options;
            let categoryId = categories[categories.selectedIndex].value;
            let type = document.getElementById('tipo');
            type = type.options;
            let typeId = type[type.selectedIndex].value;
            let description = document.getElementById('descricao').value;
            let value = document.getElementById('valor').value;

            let formdata = new FormData();
            formdata.append("id", id);
            formdata.append("date", date);
            formdata.append("type", typeId);
            formdata.append("category", categoryId);
            formdata.append("description", description);
            formdata.append("value", value);

            return $http({
                method: 'POST',
                url: 'http://localhost:8079/cloudcont/backend/view/MovimentSet.php',
                data: formdata,
                headers: { 'Content-Type': undefined }
            });
        };

    })
    .service('formats', function () {
        this.date = function (day, mounth, year) {

            if (day < 10) { day = "0" + day; }
            if (mounth < 10) { mounth = "0" + mounth; }

            let dateFormated = year + "-" + mounth + "-" + day;

            return dateFormated;
        };

        this.number = function (variable) {
            return Number(variable).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
        };
    })
    .service('effects', function () {
        this.animation = function () {
            const animation = document.getElementById("animation");
            animation.style.right = "75px";
            animation.style.filter = "opacity(0%)";
            animation.style.transition = "0.5s";
            setTimeout(function () {
                animation.style.right = "0px";
                animation.style.filter = "opacity(100%)";
                animation.style.transition = "0.5s";
                setTimeout(function () { animation.style.removeProperty("filter"); }, 100);
            }, 500);
        };
    });









