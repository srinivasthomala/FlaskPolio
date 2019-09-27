var ILOVETT = (function () {
    'use strict';

    function outboundSiteClick(e) {
        jQuery.get('/tracking', {
            event: 'exit',
            url: jQuery(e.target).attr('href').replace(/https?:\/\//, '').replace(/\/$/, '')
        });
    }

    function sendBeacon() {
        var endpoint = '/au-revoir';
        if (window.navigator.sendBeacon) {
            window.navigator.sendBeacon(endpoint);
        }
    }

    function debounce(func, delay, immediate) {
        var timeout;

        return function() {
            var context;

            context = this;

            clearTimeout(timeout);

            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, context.arguments);
                }
            }, delay);

            if (immediate && !timeout) {
                func.apply(context, context.arguments);
            }
        };
    }

    function trackScroll() {
        var yprogress = Math.round(jQuery(window).scrollTop() / (jQuery(document).height() - jQuery(window).height()) * 100);

        jQuery.get('/caps', {
            yprogress: yprogress,
            path: window.location.pathname
        });
    }

    function testCapabilities() {
        var keyword = 'probably';

        if (!window.sessionStorage) {
            return;
        }

        if (window.sessionStorage.getItem('human') === keyword) {
            return;
        }

        jQuery('BODY').one('touchstart mousemove', function (e) {
            jQuery.get('/caps', {
                m: (e.type === 'mousemove')? 1:0,
                w: screen.width,
                h: screen.height,
                ah: screen.availHeight,
                al: screen.availLeft,
                at: screen.availTop,
                aw: screen.availWidth,
                px: screen.pixelDepth,
                sx: window.screenX,
                sy: window.screenY
            });
            window.sessionStorage.setItem('human', keyword);
        });
    }

    return {
        init: function () {
            jQuery('A[rel=external]').click(outboundSiteClick);

            jQuery('#who .trigger').on('click', function (e) {
                e.preventDefault();
                jQuery('#who .answers').toggleClass('hidden');
            });

            jQuery('#who .answers A').on('click', function (e) {
                e.preventDefault();
                jQuery('#who .trigger').toggleClass('hidden');
                jQuery('#who .answers').toggleClass('hidden');
                jQuery('#who .identification').toggleClass('hidden').data('answer', jQuery(e.target).attr('data-answer'));
            });

            testCapabilities();

            jQuery(window).on('unload', sendBeacon);

            jQuery(window).on('scroll', debounce(trackScroll, 500));
        }
    };
}());

jQuery(document).ready(ILOVETT.init);
