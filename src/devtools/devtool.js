import $ from 'jquery';

window.testConsole = (...arg) => {
    console.log(...arg);
};

window.appendBody = (content) => {
    $('body').append(`<div>${content || 'appended'}</div>`)
};

class DevTool {
    constructor() {

    }
}

window._devTool = new DevTool();
