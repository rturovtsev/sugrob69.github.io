/*global $, jQuery, alert, console, Prism*/

$(document).ready(function () {
    'use strict';

    //загружаем первоначальное меню от jquery
    getData('t_menu', 'jquery.html');


    //подгружаем меню при клике в главном меню
    $('li', '.nav').on('click', function () {
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');

        var link = $(this).attr('data-src');

        getData('t_menu', link, function () {
            var name = $('li:first', '#t_menu').text();
            $('a', '.breadcrumbs').text(name);
        });
    });


    //подгрузка контента при клике в дополнительном меню
    $('#content').on('click', '#t_menu li', function () {
        var sel = $(this).attr('class'),
            name = $(this).text(),
            link;

        switch (sel.charAt(0)) {
        case 'q':
            link = "jquery.html";
            break;
        case 'j':
            link = "js.html";
            break;
        case 'h':
            link = "html.html";
            break;
        case 'c':
            link = "css.html";
            break;
        case 's':
            link = "smarty.html";
            break;
        case 'p':
            link = "plagins.html";
            break;
        }

        //загрузка и подсветка контента
        getData(sel, link, function () {
            $('pre code').each(function (i, block) {
                Prism.highlightElement(block);
            });
        });

        //обновляем заголовок
        $('a', '.breadcrumbs').text(name);
    });
});




function getData(sel, link, f) {
    'use strict';

    $('body').append('<div id="loader"></div>');

    $.ajax({
        type: 'GET',
        dataType: "html",
        url: link,
        success: function (response) {
            if (typeof (response) === 'undefined' || !response) {
                // произошла ошибка
                console.log('произошла ошибка');
            } else {
                // вставляем
                var result = $('<div></div>').append(response).find('#' + sel).html();
                var content = $('<div id="' + sel + '"></div>').append(result);
                $('.content').hide().html(content).fadeIn(100);
                //callback function
                if (typeof (f) === "function") {
                    f();
                }
            }

            $('#loader').remove();
        }
    });
}
