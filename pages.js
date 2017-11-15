var API_url = 'https://bcca-chirper.herokuapp.com/api/';
var PAGE_DATA = new Object();

function getM(num) {
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    return months[num - 1];
}

function makeChirp() {
    var count = 0;
    var newdata = '';
    while (count < PAGE_DATA.chirps.length) {
        newdata += showchirps(count);
        count += 1;
    }
    return newdata;
}

function showProfilePic() {
    var user = PAGE_DATA.user;
    var html = '<img id="profile_img" src="' + user.profile_pic + '">';
    $('.follow_blank').append(html);
}

function personalData() {
    var html = '<h2>' + PAGE_DATA.user.name + '</h2>';
    html +=
        '<p><i class="fa fa-at" aria-hidden="true"></i>' +
        PAGE_DATA.user.username +
        '</p>';
    // html += '<p>' + PAGE_DATA.user.description + '</p>';
    // html +=
    //     '<p><i class="fa fa-map-marker" aria-hidden="true"></i> ' +
    //     PAGE_DATA.user.location +
    //     ' </p>';
    // html +=
    //     '<i class="fa fa-link" aria-hidden="true"></i> ' +
    //     '<a href="https://' +
    //     PAGE_DATA.user.website +
    //     '">' +
    //     PAGE_DATA.user.website +
    //     '</a>';
    html +=
        '<p><i class="fa fa-calendar" aria-hidden="true"></i>' +
        '<span> Joined ' +
        getM(PAGE_DATA.chirper.joined.month) +
        ' ' +
        PAGE_DATA.user.joined.year +
        ' ';
}

function chirps(chirp) {
    var html =
        '<h3>' +
        chirp.author.name +
        ' @' +
        chirp.author.username +
        ' ' +
        chirp.date.month +
        '/' +
        chirp.date.day +
        '/' +
        chirp.date.year +
        '</h3>';
    html += chirp.message;

    return html;
}
function showchirps() {
    var html = PAGE_DATA.chirps.map(function(chirp) {
        return chirps(chirp);
    });
    $('#chirps').html(html);
}

function pushChirp(chirp) {
    var d = new Date();
    var chirpobj = {
        author: {
            name: PAGE_DATA.chirper.name,
            username: PAGE_DATA.chirper.username
        },

        date: {
            month: d.getMonth() + 1,
            day: d.getDate(),
            year: d.getFullYear()
        },
        message: chirp
    };
    return chirpobj;
}

$('#post-chirp').on('submit', function(event) {
    event.preventDefault();
    var chirp = pushChirp($('#chirp-message').val());
    console.log(chirp);
    $('#chirp-message').val('');
    $.post(
        'https://bcca-chirper.herokuapp.com/api/chirp/',
        JSON.stringify({
            key: window.localStorage.getItem('key'),
            message: chirp.message
        })
    )
        .then(function(response) {
            PAGE_DATA.chirps.splice(0, 0, chirp);
            // $('#post-chirp').html(makeChirp());
            showchirps();
            // personalData();
        })
        .catch(function(response) {
            $('#post-chirp').html('You thought it worked !!');
        });
});

function getParameterByName() {
    var user = new URLSearchParams(document.location.search.substring(1)).get(
        'user'
    );
    return user;
}

// $(main);
$(function() {
    var username = getParameterByName();
    $.get(API_url + username + '/').then(function successfulLogin(response) {
        PAGE_DATA = response;
        showchirps();
    });
});

function logout() {
    window.location.replace('login.html');
}
