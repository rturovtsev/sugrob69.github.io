hljs.initHighlightingOnLoad();

$( document ).ready(function() {
    //загружаем первоначальное меню от jquery
    $('.content').load('jquery.html #t_menu');  


    //подкружаем меню при клике в главном меню
    $('li', '.nav').on('click', function(){  
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');

        var link = $(this).attr('data-src');
        $('.content').load(link + ' #t_menu', function(){
            var name = $('li:first' , '#t_menu').text();
            $('a', '.breadcrumbs').text(name);
        });
    });


    //подгрузка контента при клике в дополнительном меню
    $('#content').on('click', '#t_menu li', function(){
        var link = $(this).attr('class');
        var name = $(this).text();
        var tem, temlink;

        switch (link.charAt(0)) {
            case 'q':
                tem = "jquery.html";
                break;
            case 'j':
                tem = "js.html";
                break;
            case 'h':
                tem = "html.html";
                break;
            case 'c':
                tem = "css.html";
                break;
            case 's':
                tem = "smarty.html";
                break;
            case 'p':
                tem = "plagins.html";
                break;
        }

        temlink = tem + " #" + link;

        //загрузка и подсветка контента
        $('.content').load(temlink, function(){
            $('pre').each(function(i, block) {
                hljs.highlightBlock(block);
            });

            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        });

        //обновляем заголовок
        $('a', '.breadcrumbs').text(name);
    });
});