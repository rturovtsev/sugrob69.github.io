hljs.initHighlightingOnLoad();

$( document ).ready(function() {
    $('.content').load('jquery.html #t_menu');

    $('li', '.nav').on('click', function(){
        var link = $(this).attr('data-src');
        $('.content').load(link + ' #t_menu');
    });

    $('#content').on('click', '#t_menu li', function(){
        var link = $(this).attr('class');
        var tem, temlink;

        switch (link.charAt(0)) {
            case 'j':
                tem = "jquery.html";
                break;
            case 'js':
                tem = "js.html";
                break;
            case 'html':
                tem = "html.html";
                break;
            case 'css':
                tem = "css.html";
                break;
        }

        temlink = tem + " #" + link;

        $('.content').load(temlink);
    });
});