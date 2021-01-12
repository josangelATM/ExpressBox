$(document).ready(() =>{
    
    var navButton = $('.navbutton li a, .userButtons li a');
    
    navButton.hover(function () {
            $(this).animate({
                fontSize:'2.3rem'
            },300)
        }, function () {
            $(this).animate({
                fontSize:'2rem'
            },200)
        }
    );

    $('#table').DataTable();




})