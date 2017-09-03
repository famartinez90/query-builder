window.onload = function () {
    let tables = [
        'usuario',
        'inmobiliaria',
        'sucursal',
        'propiedad'
    ];

    let fields = [
        'usuario.id',
        'usuario.nombre',
        'inmobiliaria.id',
        'inmobiliaria.nombre',
        'sucursal.id',
        'sucursal.nombre',
        'propiedad.id',
        'propiedad.titulo'
    ];

    let selectedFields = [
        
    ];

    var app = new Vue({
        el: '#app',
        data: {
            tables: tables,
            message: 'Hello!'
        }
    });

    axios.get('http://localhost:2412/tables')
        .then(response => {
            console.log(response);
            tables = response.data;
        })
        .catch(e => {
            console.log(e);
        });
};