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


    //скролл сайдбара
    (function () {
        var sideTopStart = $('.sidebar_nav').offset().top;
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > sideTopStart) {
                $('.sidebar_nav').addClass('fixed');
            } else {
                $('.sidebar_nav').removeClass('fixed');
            }
        });

    })();


    //добавить в избранное
    $('.a_fvrt', '#sidebar').on('click', add_favorite);
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
                var result = $('<div></div>').append(response).find('#' + sel).html(),
                    content = $('<div id="' + sel + '"></div>').append(result);
                $('.content').hide().html(content).fadeIn(150);
                //callback function
                if (typeof (f) === "function") {
                    f();
                }
            }

            $('#loader').remove();
        }
    });
}


// Добавить в Избранное
function add_favorite(a) {
  title=document.title;
  url=document.location;
  try {
    // Internet Explorer
    window.external.AddFavorite(url, title);
  }
  catch (e) {
    try {
      // Mozilla
      window.sidebar.addPanel(title, url, "");
    }
    catch (e) {
      // Opera
      if (typeof(opera)=="object") {
        a.rel="sidebar";
        a.title=title;
        a.url=url;
        return true;
      }
      else {
        // Unknown
        alert('Нажмите клавиши Ctrl и D чтобы добавить страницу в закладки');
      }
    }
  }
  return false;
}
