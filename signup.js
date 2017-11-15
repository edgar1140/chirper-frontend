$('#signup-form').on('submit', function(event) {
    event.preventDefault();
    var name = $('#name-input').val();
    console.log(name);
    var username = $('#username-input').val();
    console.log(username);
    var email = $('#email-input').val();
    console.log(email);
    var password = $('#password-input').val();
    console.log(password);
});

function postServer() {
    $('#signup-form').on('submit', function(event) {
        $.post(
            'https://bcca-chirper.herokuapp.com/api/signup/',
            JSON.stringify({
                name: $('#name-input').val(),
                username: $('#username-input').val(),
                email: $('#email-input').val(),
                password: $('#password-input').val()
            })
        )
            .then(function successulSignup(data) {
                console.log(data);
            })
            .catch(function unsuccessfulSignup(response) {
                console.log(response.status);
                console.log(response.response.JSON);
            });
    });
}

function main() {
    postServer();
}

$(main);
