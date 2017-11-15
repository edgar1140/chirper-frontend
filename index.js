// var PAGE_DATA = {};
// function draw() {
//     $('body').html(PAGE_DATA.chirper.name);
// }

// function main() {
//     $('body').html(
//         '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
//     );
//     $.get('https://bcca-chirper.herokuapp.com/api/raymondh/')
//         .then(function handleFeedResponse(response) {
//             console.log(response);
//             PAGE_DATA = response;
//             draw();
//         })
//         .catch(function handleFeedReasons(reason) {
//             console.log('Failure', reason);
//         });
// }

$(main);
