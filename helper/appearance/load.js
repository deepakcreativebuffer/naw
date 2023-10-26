
export var loadElement = (flag) => {
    let element = document.getElementById("rootElementLoader")
    if(flag)
        element.classList.add("show")
    if(!flag)
        element.classList.remove("show")
}