hljs.initHighlightingOnLoad();

$( document ).ready(function() {
    $('.content').load('jquery.html #t_menu');

    $('li', '.nav').on('click', function(){
        var link = $(this).attr('data-src');
        $('.content').load(link + ' #t_menu');
    });

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

        $('.content').load(temlink);
        $('a', '.breadcrumbs').text(name);
    });
});