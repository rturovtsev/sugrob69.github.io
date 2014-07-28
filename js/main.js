hljs.initHighlightingOnLoad();

$( document ).ready(function() {
    $('.content').load('jquery.html #t_menu');

    $('#content').on('click', '#t_menu li', function(){
        var link = $(this).attr('class');
        var tem, temlink;

        switch (link.charAt(0)) {
            case 'j':
                tem = "jquery.html";
                break;
        }

        temlink = tem + " #" + link;

        $('.content').load(temlink);
    });
});