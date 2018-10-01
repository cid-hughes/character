/******************************************************************************/
function checkWidth(element, font) {
    if (!element.innerText) return element;
    font = String(font).match(/(\d+)(\D{1,2})/);
    if (font === null) font = [,1,"em"];
    while (element.clientWidth < element.scrollWidth)
        element.style.fontSize = (font[1]-= 0.01) + font[2];
    return element;
}
function checkHeight(element, font) {
    if (!element.innerText) return element;
    font = String(font).match(/(\d+)(\D{1,2})/);
    if (font === null) font = [,1,"em"];
    while (element.clientHeight < element.scrollHeight)
        element.style.fontSize = (font[1]-= 0.01) + font[2];
    return element;
}
function checkField(element) {
    if (!element.innerText) return element;
    if (element.classList.contains("txtbx")) checkHeight(element);
    else checkWidth(element);
    return element;
}
/**************************************/
function adjustWidth(element) {
    if (!element.innerText) return element;
    let font = element.style.fontSize.match(/(\d+)(\w{1,2})/);
    if (font === null) font = [,0.1,"em"];
    do element.style.fontSize = (font[1]+= 0.01) + font[2];
    while (element.clientWidth >= element.scrollWidth);
    while (element.clientWidth < element.scrollWidth)
        element.style.fontSize = (font[1]-= 0.01) + font[2];
    return element;
}
function adjustHeight(element) {
    if (!element.innerText) return element;
    let font = element.style.fontSize.match(/(\d+)(\w{1,2})/);
    if (font === null) font = [,0.1,"em"];
    do element.style.fontSize = (font[1]+= 0.01) + font[2];
    while (element.clientHeight >= element.scrollHeight);
    while (element.clientHeight < element.scrollHeight)
        element.style.fontSize = (font[1]-= 0.01) + font[2];
    return element;
}
function adjustField(element) {
    if (!element.innerText) return element;
    if (element.classList.contains("txtbx")) adjustHeight(element);
    else adjustWidth(element);
    return element;
}
/******************************************************************************/