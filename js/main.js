hljs.initHighlightingOnLoad();

$( document ).ready(function() {
    $.ajax({
        url: 'jquery.html',             // указываем URL
        dataType : "html",
        success: function (data) { // вешаем свой обработчик на функцию success
            if (typeof(data) == 'undefined' || !data) {
                // произошла ошибка
                alert('Произошла ошибка.');
            } else {
                var menu = $.html(data);
                var m = menu.find('#t_menu').html();
                $('.content').append(m);
            }
        }
    });
});