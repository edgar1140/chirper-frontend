function getServer() {
    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        $.post(
            'https://bcca-chirper.herokuapp.com/api/login/',
            JSON.stringify({
                username: $('#username-input').val(),
                password: $('#password-input').val()
            })
        )
            .then(function successfulLogin(data) {
                console.log(data.key);
                window.localStorage.setItem('key', data.key);
                window.location =
                    'page.html?user=' + $('#username-input').val();
            })
            .catch(function unsuccessfulLogin(response) {
                console.log(response.status);
                console.log(response.response.JSON);
            });
    });
}

function main() {
    getServer();
}

$(main);
