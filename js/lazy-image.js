function lazyLoad(){
    var lazy =
    document.getElementsByClassName('lazy');

    for(var i=0; i<lazy.length; i++){
       lazy[i].src = 
           lazy[i].getAttribute('data-src');
    }
}
function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func)
    } else {
        window.attachEvent('on' + event, func)
    }
}
registerListener('load', lazyLoad);
function isInViewport(el){
    var rect = el.getBoundingClientRect();

return (
    rect.bottom >= 0 && 
    rect.right >= 0 && 

    rect.top <= (
    window.innerHeight || 
    document.documentElement.clientHeight) && 

    rect.left <= (
    window.innerWidth || 
    document.documentElement.clientWidth)
 );
}
function lazyLoad(){
    var lazy = 
    document.getElementsByClassName('lazy');

    for(var i=0; i<lazy.length; i++) {
        if(isInViewport(lazy[i])){
           lazy[i].src =
            lazy[i].getAttribute('data-src');
        }
    }
 }
 registerListener('scroll', lazyLoad);
 window.addEventListener('load', function(){
    var allimages= document.getElementsByTagName('img');
    for (var i=0; i<allimages.length; i++) {
        if (allimages[i].getAttribute('data-src')) {
            allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
        }
    }
}, false)