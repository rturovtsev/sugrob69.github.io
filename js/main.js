hljs.initHighlightingOnLoad();

$( document ).ready(function() {
    $.ajax({
        url: 'jquery.html #t_menu',             // указываем URL
        dataType : "html",
        success: function (data) { // вешаем свой обработчик на функцию success
            if (typeof(data) == 'undefined' || !data) {
                // произошла ошибка
                alert('Произошла ошибка.');
            } else {
                var menu = $(data.responseText).find('#t_menu').html();
                $('.content').text(menu);
            }
        }
    });
});