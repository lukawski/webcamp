'use strict';

$(function () {
    //Slider({interval: false});

    var elements = $('.tabs-nav a');
    var activeLink = $('.tabs-nav a.active').text().replace(' ', '_');
    var content = $('.tabs-content');
    var lastName = activeLink;
    var firstLoad = true;

    console.log($(this).scrollTop());

    elements.click(function (e) {
        e.preventDefault();
        elements.removeClass();
        $(this).addClass('active');
        var fileName = $(this).text().replace(' ', '_');
        loadData(fileName);
        lastName = fileName;
    });

    $(document).scroll(function (e) {
        var _content$offset = content.offset(),
            top = _content$offset.top;

        console.log(top - $(this).scrollTop() / 2);
        if ((top - $(this).scrollTop()) / 2 < $(this).scrollTop() && firstLoad) {
            loadData(activeLink);
            firstLoad = false;
        }
    });

    function loadData(name) {
        contentClasses(name);
        if (localStorage.getItem(name)) {
            console.log('local');
            content.html(JSON.parse(localStorage.getItem(name)));
        } else {
            content.load('../data/' + name + '.html', function () {
                return localStorage.setItem(name, JSON.stringify(content.html()));
            });
        }
    }

    function contentClasses(name) {
        console.log(lastName);
        content.removeClass(lastName);
        content.addClass(name);
    }
});