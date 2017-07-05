$(function() {
    //Slider({interval: false});

    const elements = $('.tabs-nav a');
    const activeLink = $('.tabs-nav a.active').text().replace(' ', '_');
    const content = $('.tabs-content');
    let lastName = activeLink;
    let firstLoad = true;

    console.log($(this).scrollTop());

    elements.click(function(e) {
        e.preventDefault();
        elements.removeClass();
        $(this).addClass('active');
        const fileName = $(this).text().replace(' ', '_');
        loadData(fileName);
        lastName = fileName;
    });

    $(document).scroll(function(e) {
        let { top } = content.offset();
        console.log(top - $(this).scrollTop() / 2);
        if (((top - $(this).scrollTop()) / 2 < $(this).scrollTop()) && firstLoad) {
         loadData(activeLink);
         firstLoad = false;
        }
    });

    function loadData(name) {
        contentClasses(name);
        if (localStorage.getItem(name)) {
            console.log('local')
            content.html(JSON.parse(localStorage.getItem(name)));
        } else {
            content.load(`../data/${name}.html`, () => localStorage.setItem(name, JSON.stringify(content.html())) );
        }
    }

    function contentClasses(name) {
        console.log(lastName);
        content.removeClass(lastName);
        content.addClass(name);
    }
});