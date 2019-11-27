import $ from 'jquery';

export class Util {
    static getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');

        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);

        if (!results || !results[2]) {
            return null;
        }

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    static cookieEnabled() {
        return document.documentElement.classList.contains('cookies');
    }

    static localStorageEnabled() {
        return document.documentElement.classList.contains('localstorage');
    }

    static sessionStorageEnabled() {
        return document.documentElement.classList.contains('sessionstorage');
    }

    static bindButtonTouchFocus() {
        $(document).on('touchstart', '.btn:not(:disabled)', function (evt) {
            evt.preventDefault();

            if (this === evt.currentTarget) {
                $(this).addClass('active');

                $(this).on('touchmove', function (e2) {
                    var that = this;
                    e2.preventDefault();

                    function touchInElement(elm, x, y) {
                        var $elm = $(elm);

                        return (x >= $elm.offset().left && x <= $elm.offset().left + $elm.outerWidth()) &&
                            (y >= $elm.offset().top && y <= $elm.offset().top + $elm.outerHeight());
                    }

                    if (that === e2.currentTarget) {
                        if (touchInElement(that, e2.originalEvent.changedTouches[0].pageX, e2.originalEvent.changedTouches[0].pageY)) {
                            $(that).addClass('active');
                        } else {
                            $(that).removeClass('active');
                        }
                    }
                });
            }
        });

        $(document).on('touchend touchcancel', '.btn:not(:disabled)', function (evt) {
            evt.preventDefault();

            if (this === evt.currentTarget) {
                $(this).off('touchmove');

                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).trigger('click');
                }
            }
        });
    }

    static doTransitions(arrFunc, delay) {
        const functionSeries = arrFunc.map(func => function () {
            return Util.doTransition(func, delay);
        });

        return new Promise(resolve => {
            functionSeries.reduce((p, fn) => p.then(fn), Promise.resolve());
            setTimeout(resolve, delay * functionSeries.length);
        });
    }

    static doTransition(func, delay) {
        return new Promise(function (resolve) {
            func();
            setTimeout(resolve, delay);
        });
    };

    static round(num, decimal = 1) {
        return Math.round(num * 10 ** decimal) / 10 ** decimal;
    }

    static playSound(audioElm, handler) {
        const _p = audioElm.play();
        Util.devLog('Util.playSound', audioElm, _p);

        if (_p) {
            _p.then(handler).catch(handler);
        } else {
            handler();
        }
    }

}
