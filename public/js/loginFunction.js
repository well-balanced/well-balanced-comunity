$(function() {
    $('#login-form-link2').click(function(e) {
    $('#register-form').attr('style','display:none')
    $('#login-form').attr('style','display:block')
    $('.register-form').attr('class','login-form')
    e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
    $('#login-form').attr('style','display:none')
    $('#register-form').attr('style','display:block')
    $('#register-form-link2').text('Complete');
    $('.login-form').attr('class','register-form')
    e.preventDefault();
    });
});