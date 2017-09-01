window.onload = function () {
    let tables = []

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