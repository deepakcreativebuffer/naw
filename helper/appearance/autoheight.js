import { heightNav } from '../constants/appearance'

export function autoHeightMin(classname, height=heightNav) {
    var h = window.innerHeight
    var elements = document.getElementsByClassName(classname);
    Array.prototype.forEach.call(elements, function(element) {
        element.style.minHeight = (h-height)+'px'
    });
}

export function autoHeightMinMiddle(classname, height=heightNav) {
    var h = window.innerHeight
    var hh = 0
    var elements = document.getElementsByClassName(classname);
    Array.prototype.forEach.call(elements, function(element) {
        element.style.minHeight = (h/2)+'px'
        hh = (h/2)
    });
    return hh
}

export function autoHeight(classname, height=heightNav) {
    var h = window.innerHeight
    var elements = document.getElementsByClassName(classname);
    Array.prototype.forEach.call(elements, function(element) {
        element.style.height = (h-height)+'px'
    });
}