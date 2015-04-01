/* if (window.attachEvent) {
    window.attachEvent('onload', initialize());
} else {
    if (window.addEventListener) { 
        window.addEventListener('load', initialize(), false);
    } else {
        document.addEventListener('load', initialize(), false);
    }
} */
    
// Using jQuery
$(document).ready(initialize);

function initialize() {
    $('.rslides').responsiveSlides({
        auto: false,
        pager: false,
        nav: true,
        speed: 500,
        maxwidth: 800,
        namespace: "large-btns"
    });
}