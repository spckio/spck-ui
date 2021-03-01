(function(core) {

    var uikit;

    if (!window.jQuery) {
        throw new Error('UIkit 2.x requires jQuery');
    } else {
        uikit = core(window.jQuery);
    }

    if (typeof define == 'function' && define.amd) { // AMD

        define('uikit', function(){

            uikit.load = function(res, req, onload, config) {

                var resources = res.split(','), load = [], i, base = (config.config && config.config.uikit && config.config.uikit.base ? config.config.uikit.base : '').replace(/\/+$/g, '');

                if (!base) {
                    throw new Error('Please define base path to UIkit in the requirejs config.');
                }

                for (i = 0; i < resources.length; i += 1) {
                    var resource = resources[i].replace(/\./g, '/');
                    load.push(base+'/components/'+resource);
                }

                req(load, function() {
                    onload(uikit);
                });
            };

            return uikit;
        });
    }

})(function($) {

    "use strict";

    if (window.UIkit2) {
        return window.UIkit2;
    }

    var UI = {}, _UI = window.UIkit || undefined;

    UI.version = '2.27.5';

    UI.noConflict = function() {
        // restore UIkit version
        if (_UI) {
            window.UIkit = _UI;
            $.UIkit      = _UI;
            $.fn.uk      = _UI.fn;
        }

        return UI;
    };

    window.UIkit2 = UI;

    if (!_UI) {
        window.UIkit = UI;
    }

    // cache jQuery
    UI.$ = $;

    UI.$doc  = UI.$(document);
    UI.$win  = UI.$(window);
    UI.$html = UI.$('html');

    UI.support = {};
    UI.support.transition = (function() {

        var transitionEnd = (function() {

            var element = document.body || document.documentElement,
                transEndEventNames = {
                    WebkitTransition : 'webkitTransitionEnd',
                    MozTransition    : 'transitionend',
                    OTransition      : 'oTransitionEnd otransitionend',
                    transition       : 'transitionend'
                }, name;

            for (name in transEndEventNames) {
                if (element.style[name] !== undefined) return transEndEventNames[name];
            }
        }());

        return transitionEnd && { end: transitionEnd };
    })();

    UI.support.animation = (function() {

        var animationEnd = (function() {

            var element = document.body || document.documentElement,
                animEndEventNames = {
                    WebkitAnimation : 'webkitAnimationEnd',
                    MozAnimation    : 'animationend',
                    OAnimation      : 'oAnimationEnd oanimationend',
                    animation       : 'animationend'
                }, name;

            for (name in animEndEventNames) {
                if (element.style[name] !== undefined) return animEndEventNames[name];
            }
        }());

        return animationEnd && { end: animationEnd };
    })();

    // requestAnimationFrame polyfill
    //https://github.com/darius/requestAnimationFrame
    (function() {

        Date.now = Date.now || function() { return new Date().getTime(); };

        var vendors = ['webkit', 'moz'];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
            window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                       || window[vp+'CancelRequestAnimationFrame']);
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
            || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var lastTime = 0;
            window.requestAnimationFrame = function(callback) {
                var now = Date.now();
                var nextTime = Math.max(lastTime + 16, now);
                return setTimeout(function() { callback(lastTime = nextTime); },
                                  nextTime - now);
            };
            window.cancelAnimationFrame = clearTimeout;
        }
    }());

    UI.support.touch = (
        ('ontouchstart' in document) ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
        (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0) || //IE 10
        (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0) || //IE >=11
        false
    );

    UI.support.mutationobserver = (window.MutationObserver || window.WebKitMutationObserver || null);

    UI.Utils = {};

    UI.Utils.isFullscreen = function() {
        return document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement || false;
    };

    UI.Utils.str2json = function(str, notevil) {
        try {
            if (notevil) {
                return JSON.parse(str
                    // wrap keys without quote with valid double quote
                    .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":';})
                    // replacing single quote wrapped ones to double quote
                    .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"';})
                );
            } else {
                return (new Function('', 'var json = ' + str + '; return JSON.parse(JSON.stringify(json));'))();
            }
        } catch(e) { return false; }
    };

    UI.Utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    UI.Utils.throttle = function (func, limit) {
        var wait = false;
        return function () {
            if (!wait) {
                func.call();
                wait = true;
                setTimeout(function () {
                    wait = false;
                }, limit);
            }
        }
    };

    UI.Utils.removeCssRules = function(selectorRegEx) {
        var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;

        if(!selectorRegEx) return;

        setTimeout(function(){
            try {
              _ref = document.styleSheets;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                stylesheet = _ref[_i];
                idxs = [];
                stylesheet.cssRules = stylesheet.cssRules;
                for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
                  if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
                    idxs.unshift(idx);
                  }
                }
                for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
                  stylesheet.deleteRule(idxs[_k]);
                }
              }
            } catch (_error) {}
        }, 0);
    };

    UI.Utils.isInView = function(element, options) {

        var $element = $(element);

        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = UI.$win.scrollLeft(), window_top = UI.$win.scrollTop(), offset = $element.offset(), left = offset.left, top = offset.top;

        options = $.extend({topoffset:0, leftoffset:0}, options);

        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + UI.$win.height() &&
            left + $element.width() >= window_left && left - options.leftoffset <= window_left + UI.$win.width()) {
          return true;
        } else {
          return false;
        }
    };

    UI.Utils.checkDisplay = function(context, initanimation) {

        var elements = UI.$('[data-sp-margin], [data-sp-grid-match], [data-sp-grid-margin], [data-sp-check-display]', context || document), animated;

        if (context && !elements.length) {
            elements = $(context);
        }

        elements.trigger('display.uk.check');

        // fix firefox / IE animations
        if (initanimation) {

            if (typeof(initanimation)!='string') {
                initanimation = '[class*="sp-animation-"]';
            }

            elements.find(initanimation).each(function(){

                var ele  = UI.$(this),
                    cls  = ele.attr('class'),
                    anim = cls.match(/sp-animation-(.+)/);

                ele.removeClass(anim[0]).width();

                ele.addClass(anim[0]);
            });
        }

        return elements;
    };

    UI.Utils.options = function(string) {

        if ($.type(string)!='string') return string;

        if (string.indexOf(':') != -1 && string.trim().substr(-1) != '}') {
            string = '{'+string+'}';
        }

        var start = (string ? string.indexOf("{") : -1), options = {};

        if (start != -1) {
            try {
                options = UI.Utils.str2json(string.substr(start));
            } catch (e) {}
        }

        return options;
    };

    UI.Utils.animate = function(element, cls) {

        var d = $.Deferred();

        element = UI.$(element);

        element.css('display', 'none').addClass(cls).one(UI.support.animation.end, function() {
            element.removeClass(cls);
            d.resolve();
        });

        element.css('display', '');

        return d.promise();
    };

    UI.Utils.uid = function(prefix) {
        return (prefix || 'id') + (new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
    };

    UI.Utils.template = function(str, data) {

        var tokens = str.replace(/\n/g, '\\n').replace(/\{\{\{\s*(.+?)\s*\}\}\}/g, "{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),
            i=0, toc, cmd, prop, val, fn, output = [], openblocks = 0;

        while(i < tokens.length) {

            toc = tokens[i];

            if(toc.match(/\{\{\s*(.+?)\s*\}\}/)) {
                i = i + 1;
                toc  = tokens[i];
                cmd  = toc[0];
                prop = toc.substring(toc.match(/^(\^|\#|\!|\~|\:)/) ? 1:0);

                switch(cmd) {
                    case '~':
                        output.push('for(var $i=0;$i<'+prop+'.length;$i++) { var $item = '+prop+'[$i];');
                        openblocks++;
                        break;
                    case ':':
                        output.push('for(var $key in '+prop+') { var $val = '+prop+'[$key];');
                        openblocks++;
                        break;
                    case '#':
                        output.push('if('+prop+') {');
                        openblocks++;
                        break;
                    case '^':
                        output.push('if(!'+prop+') {');
                        openblocks++;
                        break;
                    case '/':
                        output.push('}');
                        openblocks--;
                        break;
                    case '!':
                        output.push('__ret.push('+prop+');');
                        break;
                    default:
                        output.push('__ret.push(escape('+prop+'));');
                        break;
                }
            } else {
                output.push("__ret.push('"+toc.replace(/\'/g, "\\'")+"');");
            }
            i = i + 1;
        }

        fn  = new Function('$data', [
            'var __ret = [];',
            'try {',
            'with($data){', (!openblocks ? output.join('') : '__ret = ["Not all blocks are closed correctly."]'), '};',
            '}catch(e){__ret = [e.message];}',
            'return __ret.join("").replace(/\\n\\n/g, "\\n");',
            "function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"
        ].join("\n"));

        return data ? fn(data) : fn;
    };

    UI.Utils.focus = function(element, extra) {

        element = $(element);

        if (!element.length) {
            return element;
        }

        var autofocus = element.find('[autofocus]:first'), tabidx;

        if (autofocus.length) {
            return autofocus.focus();
        }

        autofocus = element.find(':input'+(extra && (','+extra) || '')).first();

        if (autofocus.length) {
            return autofocus.focus();
        }

        if (!element.attr('tabindex')) {
            tabidx = 1000;
            element.attr('tabindex', tabidx);
        }

        element[0].focus();

        if (tabidx) {
            element.attr('tabindex', '');
        }

        return element;
    }

    UI.Utils.events       = {};
    UI.Utils.events.click = UI.support.touch ? 'tap' : 'click';

    // deprecated

    UI.fn = function(command, options) {

        var args = arguments, cmd = command.match(/^([a-z\-]+)(?:\.([a-z]+))?/i), component = cmd[1], method = cmd[2];

        if (!UI[component]) {
            $.error('UIkit component [' + component + '] does not exist.');
            return this;
        }

        return this.each(function() {
            var $this = $(this), data = $this.data(component);
            if (!data) $this.data(component, (data = UI[component](this, method ? undefined : options)));
            if (method) data[method].apply(data, Array.prototype.slice.call(args, 1));
        });
    };

    $.UIkit          = UI;
    $.fn.uk          = UI.fn;

    UI.langdirection = UI.$html.attr("dir") == "rtl" ? "right" : "left";

    UI.components    = {};

    UI.component = function(name, def, override) {

        if (UI.components[name] && !override) {
            return UI.components[name];
        }

        var fn = function(element, options) {

            var $this = this;

            this.UIkit   = UI;
            this.element = element ? UI.$(element) : null;
            this.options = $.extend(true, {}, this.defaults, options);
            this.plugins = {};

            if (this.element) {
                this.element.data(name, this);
            }

            this.init();

            (this.options.plugins.length ? this.options.plugins : Object.keys(fn.plugins)).forEach(function(plugin) {

                if (fn.plugins[plugin].init) {
                    fn.plugins[plugin].init($this);
                    $this.plugins[plugin] = true;
                }

            });

            this.trigger('init.uk.component', [name, this]);

            return this;
        };

        fn.plugins = {};

        $.extend(true, fn.prototype, {

            defaults : {plugins: []},

            boot: function(){},
            init: function(){},

            on: function(a1,a2,a3){
                return UI.$(this.element || this).on(a1,a2,a3);
            },

            one: function(a1,a2,a3){
                return UI.$(this.element || this).one(a1,a2,a3);
            },

            off: function(evt){
                return UI.$(this.element || this).off(evt);
            },

            trigger: function(evt, params) {
                return UI.$(this.element || this).trigger(evt, params);
            },

            find: function(selector) {
                return UI.$(this.element ? this.element: []).find(selector);
            },

            proxy: function(obj, methods) {

                var $this = this;

                methods.split(' ').forEach(function(method) {
                    if (!$this[method]) $this[method] = function() { return obj[method].apply(obj, arguments); };
                });
            },

            mixin: function(obj, methods) {

                var $this = this;

                methods.split(' ').forEach(function(method) {
                    if (!$this[method]) $this[method] = obj[method].bind($this);
                });
            },

            option: function() {

                if (arguments.length == 1) {
                    return this.options[arguments[0]] || undefined;
                } else if (arguments.length == 2) {
                    this.options[arguments[0]] = arguments[1];
                }
            }

        }, def);

        this.components[name] = fn;

        this[name] = function() {

            var element, options;

            if (arguments.length) {

                switch(arguments.length) {
                    case 1:

                        if (typeof arguments[0] === 'string' || arguments[0].nodeType || arguments[0] instanceof jQuery) {
                            element = $(arguments[0]);
                        } else {
                            options = arguments[0];
                        }

                        break;
                    case 2:

                        element = $(arguments[0]);
                        options = arguments[1];
                        break;
                }
            }

            if (element && element.data(name)) {
                return element.data(name);
            }

            return (new UI.components[name](element, options));
        };

        if (UI.domready) {
            UI.component.boot(name);
        }

        return fn;
    };

    UI.plugin = function(component, name, def) {
        this.components[component].plugins[name] = def;
    };

    UI.component.boot = function(name) {

        if (UI.components[name].prototype && UI.components[name].prototype.boot && !UI.components[name].booted) {
            UI.components[name].prototype.boot.apply(UI, []);
            UI.components[name].booted = true;
        }
    };

    UI.component.bootComponents = function() {

        for (var component in UI.components) {
            UI.component.boot(component);
        }
    };


    // DOM mutation save ready helper function

    UI.domObservers = [];
    UI.domready     = false;

    UI.ready = function(fn) {

        UI.domObservers.push(fn);

        if (UI.domready) {
            fn(document);
        }
    };

    UI.on = function(a1,a2,a3){

        if (a1 && a1.indexOf('ready.uk.dom') > -1 && UI.domready) {
            a2.apply(UI.$doc);
        }

        return UI.$doc.on(a1,a2,a3);
    };

    UI.one = function(a1,a2,a3){

        if (a1 && a1.indexOf('ready.uk.dom') > -1 && UI.domready) {
            a2.apply(UI.$doc);
            return UI.$doc;
        }

        return UI.$doc.one(a1,a2,a3);
    };

    UI.trigger = function(evt, params) {
        return UI.$doc.trigger(evt, params);
    };

    UI.domObserve = function(selector, fn) {

        if(!UI.support.mutationobserver) return;

        fn = fn || function() {};

        UI.$(selector).each(function() {

            var element  = this,
                $element = UI.$(element);

            if ($element.data('observer')) {
                return;
            }

            try {

                var observer = new UI.support.mutationobserver(UI.Utils.debounce(function(mutations) {
                    fn.apply(element, [$element]);
                    $element.trigger('changed.uk.dom');
                }, 50), {childList: true, subtree: true});

                // pass in the target node, as well as the observer options
                observer.observe(element, { childList: true, subtree: true });

                $element.data('observer', observer);

            } catch(e) {}
        });
    };

    UI.init = function(root) {

        root = root || document;

        UI.domObservers.forEach(function(fn){
            fn(root);
        });
    };

    UI.on('domready.uk.dom', function(){

        UI.init();

        if (UI.domready) UI.Utils.checkDisplay();
    });

    document.addEventListener('DOMContentLoaded', function(){

        var domReady = function() {

            UI.$body = UI.$('body');

            UI.trigger('beforeready.uk.dom');

            UI.component.bootComponents();

            // custom scroll observer
            var rafToken = requestAnimationFrame((function(){

                var memory = {dir: {x:0, y:0}, x: window.pageXOffset, y:window.pageYOffset};

                var fn = function(){
                    // reading this (window.page[X|Y]Offset) causes a full page recalc of the layout in Chrome,
                    // so we only want to do this once
                    var wpxo = window.pageXOffset;
                    var wpyo = window.pageYOffset;

                    // Did the scroll position change since the last time we were here?
                    if (memory.x != wpxo || memory.y != wpyo) {

                        // Set the direction of the scroll and store the new position
                        if (wpxo != memory.x) {memory.dir.x = wpxo > memory.x ? 1:-1; } else { memory.dir.x = 0; }
                        if (wpyo != memory.y) {memory.dir.y = wpyo > memory.y ? 1:-1; } else { memory.dir.y = 0; }

                        memory.x = wpxo;
                        memory.y = wpyo;

                        // Trigger the scroll event, this could probably be sent using memory.clone() but this is
                        // more explicit and easier to see exactly what is being sent in the event.
                        UI.$doc.trigger('scrolling.uk.document', [{
                            dir: {x: memory.dir.x, y: memory.dir.y}, x: wpxo, y: wpyo
                        }]);
                    }

                    cancelAnimationFrame(rafToken);
                    rafToken = requestAnimationFrame(fn);
                };

                if (UI.support.touch) {
                    UI.$html.on('touchmove touchend MSPointerMove MSPointerUp pointermove pointerup', fn);
                }

                if (memory.x || memory.y) fn();

                return fn;

            })());

            // run component init functions on dom
            UI.trigger('domready.uk.dom');

            if (UI.support.touch) {

                // remove css hover rules for touch devices
                // UI.Utils.removeCssRules(/\.sp-(?!navbar).*:hover/);

                // viewport unit fix for sp-height-viewport - should be fixed in iOS 8
                if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {

                    UI.$win.on('load orientationchange resize', UI.Utils.debounce((function(){

                        var fn = function() {
                            $('.sp-height-viewport').css('height', window.innerHeight);
                            return fn;
                        };

                        return fn();

                    })(), 100));
                }
            }

            UI.trigger('afterready.uk.dom');

            // mark that domready is left behind
            UI.domready = true;

            // auto init js components
            if (UI.support.mutationobserver) {

                var initFn = UI.Utils.debounce(function(){
                    requestAnimationFrame(function(){ UI.init(document.body);});
                }, 10);

                (new UI.support.mutationobserver(function(mutations) {

                    var init = false;

                    mutations.every(function(mutation){

                        if (mutation.type != 'childList') return true;

                        for (var i = 0, node; i < mutation.addedNodes.length; ++i) {

                            node = mutation.addedNodes[i];

                            if (node.outerHTML && node.outerHTML.indexOf('data-sp-') !== -1) {
                                return (init = true) && false;
                            }
                        }
                        return true;
                    });

                    if (init) initFn();

                })).observe(document.body, {childList: true, subtree: true});
            }
        };

        if (document.readyState == 'complete' || document.readyState == 'interactive') {
            setTimeout(domReady);
        }

        return domReady;

    }());

    // add touch identifier class
    UI.$html.addClass(UI.support.touch ? 'sp-touch' : 'sp-notouch');

    // add sp-hover class on tap to support overlays on touch devices
    if (UI.support.touch) {

        var hoverset = false,
            exclude,
            hovercls = 'sp-hover',
            selector = '.sp-overlay, .sp-overlay-hover, .sp-overlay-toggle, .sp-animation-hover, .sp-has-hover';

        UI.$html.on('mouseenter touchstart MSPointerDown pointerdown', selector, function() {

            if (hoverset) $('.'+hovercls).removeClass(hovercls);

            hoverset = $(this).addClass(hovercls);

        }).on('mouseleave touchend MSPointerUp pointerup', function(e) {

            exclude = $(e.target).parents(selector);

            if (hoverset) {
                hoverset.not(exclude).removeClass(hovercls);
            }
        });
    }

    return UI;
});

(function(UI) {

    "use strict";

    UI.component('alert', {

        defaults: {
            fade: true,
            duration: 200,
            trigger: '.sp-alert-close'
        },

        boot: function() {

            // init code
            UI.$html.on('click.alert.uikit', '[data-sp-alert]', function(e) {

                var ele = UI.$(this);

                if (!ele.data('alert')) {

                    var alert = UI.alert(ele, UI.Utils.options(ele.attr('data-sp-alert')));

                    if (UI.$(e.target).is(alert.options.trigger)) {
                        e.preventDefault();
                        alert.close();
                    }
                }
            });
        },

        init: function() {

            var $this = this;

            this.on('click', this.options.trigger, function(e) {
                e.preventDefault();
                $this.close();
            });
        },

        close: function() {

            var element       = this.trigger('close.uk.alert'),
                removeElement = function () {
                    this.trigger('closed.uk.alert').remove();
                }.bind(this);

            if (this.options.fade) {
                element.css('overflow', 'hidden').css("max-height", element.height()).animate({
                    height         : 0,
                    opacity        : 0,
                    paddingTop    : 0,
                    paddingBottom : 0,
                    marginTop     : 0,
                    marginBottom  : 0
                }, this.options.duration, removeElement);
            } else {
                removeElement();
            }
        }

    });

})(UIkit2);

(function(UI) {

    "use strict";

    UI.component('buttonRadio', {

        defaults: {
            activeClass: 'sp-active',
            target: '.sp-button'
        },

        boot: function() {

            // init code
            UI.$html.on('click.buttonradio.uikit', '[data-sp-button-radio]', function(e) {

                var ele = UI.$(this);

                if (!ele.data('buttonRadio')) {

                    var obj    = UI.buttonRadio(ele, UI.Utils.options(ele.attr('data-sp-button-radio'))),
                        target = UI.$(e.target);

                    if (target.is(obj.options.target)) {
                        target.trigger('click');
                    }
                }
            });
        },

        init: function() {

            var $this = this;

            // Init ARIA
            this.find($this.options.target).attr('aria-checked', 'false').filter('.' + $this.options.activeClass).attr('aria-checked', 'true');

            this.on('click', this.options.target, function(e) {

                var ele = UI.$(this);

                if (ele.is('a[href="#"]')) e.preventDefault();

                $this.find($this.options.target).not(ele).removeClass($this.options.activeClass).blur();
                ele.addClass($this.options.activeClass);

                // Update ARIA
                $this.find($this.options.target).not(ele).attr('aria-checked', 'false');
                ele.attr('aria-checked', 'true');

                $this.trigger('change.uk.button', [ele]);
            });

        },

        getSelected: function() {
            return this.find('.' + this.options.activeClass);
        }
    });

    UI.component('buttonCheckbox', {

        defaults: {
            activeClass: 'sp-active',
            target: '.sp-button'
        },

        boot: function() {

            UI.$html.on('click.buttoncheckbox.uikit', '[data-sp-button-checkbox]', function(e) {
                var ele = UI.$(this);

                if (!ele.data('buttonCheckbox')) {

                    var obj    = UI.buttonCheckbox(ele, UI.Utils.options(ele.attr('data-sp-button-checkbox'))),
                        target = UI.$(e.target);

                    if (target.is(obj.options.target)) {
                        target.trigger('click');
                    }
                }
            });
        },

        init: function() {

            var $this = this;

            // Init ARIA
            this.find($this.options.target).attr('aria-checked', 'false').filter('.' + $this.options.activeClass).attr('aria-checked', 'true');

            this.on('click', this.options.target, function(e) {
                var ele = UI.$(this);

                if (ele.is('a[href="#"]')) e.preventDefault();

                ele.toggleClass($this.options.activeClass).blur();

                // Update ARIA
                ele.attr('aria-checked', ele.hasClass($this.options.activeClass));

                $this.trigger('change.uk.button', [ele]);
            });

        },

        getSelected: function() {
            return this.find('.' + this.options.activeClass);
        }
    });


    UI.component('button', {

        defaults: {},

        boot: function() {

            UI.$html.on('click.button.uikit', '[data-sp-button]', function(e) {
                var ele = UI.$(this);

                if (!ele.data('button')) {

                    var obj = UI.button(ele, UI.Utils.options(ele.attr('data-sp-button')));
                    ele.trigger('click');
                }
            });
        },

        init: function() {

            var $this = this;

            // Init ARIA
            this.element.attr('aria-pressed', this.element.hasClass("sp-active"));

            this.on('click', function(e) {

                if ($this.element.is('a[href="#"]')) e.preventDefault();

                $this.toggle();
                $this.trigger('change.uk.button', [$this.element.blur().hasClass('sp-active')]);
            });

        },

        toggle: function() {
            this.element.toggleClass('sp-active');

            // Update ARIA
            this.element.attr('aria-pressed', this.element.hasClass('sp-active'));
        }
    });

})(UIkit2);

(function(UI){

    "use strict";

    UI.component('cover', {

        defaults: {
            automute : true
        },

        boot: function() {

            // auto init
            UI.ready(function(context) {

                UI.$('[data-sp-cover]', context).each(function(){

                    var ele = UI.$(this);

                    if(!ele.data('cover')) {
                        var plugin = UI.cover(ele, UI.Utils.options(ele.attr('data-sp-cover')));
                    }
                });
            });
        },

        init: function() {

            this.parent = this.element.parent();

            UI.$win.on('load resize orientationchange', UI.Utils.debounce(function(){
                this.check();
            }.bind(this), 100));

            this.on('display.uk.check', function(e) {
                if (this.element.is(':visible')) this.check();
            }.bind(this));

            this.check();

            if (this.element.is('iframe') && this.options.automute) {

                var src = this.element.attr('src');

                this.element.attr('src', '').on('load', function(){
                    this.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', '*');
                }).attr('src', [src, (src.indexOf('?') > -1 ? '&':'?'), 'enablejsapi=1&api=1'].join(''));
            }
        },

        check: function() {

            this.element.css({ width  : '', height : '' });

            this.dimension = {w: this.element.width(), h: this.element.height()};

            if (this.element.attr('width') && !isNaN(this.element.attr('width'))) {
                this.dimension.w = this.element.attr('width');
            }

            if (this.element.attr('height') && !isNaN(this.element.attr('height'))) {
                this.dimension.h = this.element.attr('height');
            }

            this.ratio = this.dimension.w / this.dimension.h;

            var w = this.parent.width(), h = this.parent.height(), width, height;

            // if element height < parent height (gap underneath)
            if ((w / this.ratio) < h) {

                width  = Math.ceil(h * this.ratio);
                height = h;

            // element width < parent width (gap to right)
            } else {

                width  = w;
                height = Math.ceil(w / this.ratio);
            }

            this.element.css({ width  : width, height : height });
        }
    });

})(UIkit2);

(function(UI) {

    "use strict";

    var active = false, hoverIdle, flips = {
        x: {
            'bottom-left'   : 'bottom-right',
            'bottom-right'  : 'bottom-left',
            'bottom-center' : 'bottom-center',
            'top-left'      : 'top-right',
            'top-right'     : 'top-left',
            'top-center'    : 'top-center',
            'left-top'      : 'right-top',
            'left-bottom'   : 'right-bottom',
            'left-center'   : 'right-center',
            'right-top'     : 'left-top',
            'right-bottom'  : 'left-bottom',
            'right-center'  : 'left-center'
        },
        y: {
            'bottom-left'   : 'top-left',
            'bottom-right'  : 'top-right',
            'bottom-center' : 'top-center',
            'top-left'      : 'bottom-left',
            'top-right'     : 'bottom-right',
            'top-center'    : 'bottom-center',
            'left-top'      : 'left-bottom',
            'left-bottom'   : 'left-top',
            'left-center'   : 'left-center',
            'right-top'     : 'right-bottom',
            'right-bottom'  : 'right-top',
            'right-center'  : 'right-center'
        },
        xy: {
            'bottom-left'   : 'top-right',
            'bottom-right'  : 'top-left',
            'bottom-center' : 'top-center',
            'top-left'      : 'bottom-right',
            'top-right'     : 'bottom-left',
            'top-center'    : 'bottom-center',
            'left-top'      : 'right-bottom',
            'left-bottom'   : 'right-top',
            'left-center'   : 'right-center',
            'right-top'     : 'left-bottom',
            'right-bottom'  : 'left-top',
            'right-center'  : 'left-center'
        }
    };

    UI.component('dropdown', {

        defaults: {
           mode            : 'hover',
           pos             : 'bottom-left',
           offset          : 0,
           remaintime      : 800,
           justify         : false,
           boundary        : UI.$win,
           delay           : 0,
           dropdownSelector: '.sp-dropdown,.sp-dropdown-blank',
           hoverDelayIdle  : 250,
           preventflip     : false
        },

        remainIdle: false,

        boot: function() {

            var triggerevent = UI.support.touch ? 'click' : 'mouseenter';

            // init code
            UI.$html.on(triggerevent+'.dropdown.uikit focus pointerdown', '[data-sp-dropdown]', function(e) {

                var ele = UI.$(this);

                if (!ele.data('dropdown')) {

                    var dropdown = UI.dropdown(ele, UI.Utils.options(ele.attr('data-sp-dropdown')));

                    if (e.type=='click' || (e.type=='mouseenter' && dropdown.options.mode=='hover')) {
                        dropdown.element.trigger(triggerevent);
                    }

                    if (dropdown.dropdown.length) {
                        e.preventDefault();
                    }
                }
            });
        },

        init: function() {

            var $this = this;

            this.dropdown     = this.find(this.options.dropdownSelector);
            this.offsetParent = this.dropdown.parents().filter(function() {
                return UI.$.inArray(UI.$(this).css('position'), ['relative', 'fixed', 'absolute']) !== -1;
            }).slice(0,1);

            if (!this.offsetParent.length) {
                this.offsetParent = this.element;
            }

            this.centered  = this.dropdown.hasClass('sp-dropdown-center');
            this.justified = this.options.justify ? UI.$(this.options.justify) : false;

            this.boundary  = UI.$(this.options.boundary);

            if (!this.boundary.length) {
                this.boundary = UI.$win;
            }

            // legacy DEPRECATED!
            if (this.dropdown.hasClass('sp-dropdown-up')) {
                this.options.pos = 'top-left';
            }
            if (this.dropdown.hasClass('sp-dropdown-flip')) {
                this.options.pos = this.options.pos.replace('left','right');
            }
            if (this.dropdown.hasClass('sp-dropdown-center')) {
                this.options.pos = this.options.pos.replace(/(left|right)/,'center');
            }
            //-- end legacy

            // Init ARIA
            this.element.attr('aria-haspopup', 'true');
            this.element.attr('aria-expanded', this.element.hasClass('sp-open'));
            this.dropdown.attr('aria-hidden', 'true');

            if (this.options.mode == 'click' || UI.support.touch) {

                this.on('click.uk.dropdown', function(e) {

                    var $target = UI.$(e.target);

                    if (!$target.parents($this.options.dropdownSelector).length) {

                        if ($target.is("a[href='#']") || $target.parent().is("a[href='#']") || ($this.dropdown.length && !$this.dropdown.is(':visible')) ){
                            e.preventDefault();
                        }

                        $target.blur();
                    }

                    if (!$this.element.hasClass('sp-open')) {

                        $this.show();

                    } else {

                        if (!$this.dropdown.find(e.target).length || $target.is('.sp-dropdown-close') || $target.parents('.sp-dropdown-close').length) {
                            $this.hide();
                        }
                    }
                });

            } else {

                this.on('mouseenter', function(e) {

                    $this.trigger('pointerenter.uk.dropdown', [$this]);

                    if ($this.remainIdle) {
                        clearTimeout($this.remainIdle);
                    }

                    if (hoverIdle) {
                        clearTimeout(hoverIdle);
                    }

                    if (active && active == $this) {
                        return;
                    }

                    // pseudo manuAim
                    if (active && active != $this) {

                        hoverIdle = setTimeout(function() {
                            hoverIdle = setTimeout($this.show.bind($this), $this.options.delay);
                        }, $this.options.hoverDelayIdle);

                    } else {

                        hoverIdle = setTimeout($this.show.bind($this), $this.options.delay);
                    }

                }).on('mouseleave', function() {

                    if (hoverIdle) {
                        clearTimeout(hoverIdle);
                    }

                    $this.remainIdle = setTimeout(function() {
                        if (active && active == $this) $this.hide();
                    }, $this.options.remaintime);

                    $this.trigger('pointerleave.uk.dropdown', [$this]);

                }).on('click', function(e){

                    var $target = UI.$(e.target);

                    if ($this.remainIdle) {
                        clearTimeout($this.remainIdle);
                    }

                    if (active && active == $this) {
                        if (!$this.dropdown.find(e.target).length || $target.is('.sp-dropdown-close') || $target.parents('.sp-dropdown-close').length) {
                            $this.hide();
                        }
                        return;
                    }

                    if ($target.is("a[href='#']") || $target.parent().is("a[href='#']")){
                        e.preventDefault();
                    }

                    $this.show();
                });
            }
        },

        show: function(){

            UI.$html.off('click.outer.dropdown');

            if (active && active != this) {
                active.hide(true);
            }

            if (hoverIdle) {
                clearTimeout(hoverIdle);
            }

            this.trigger('beforeshow.uk.dropdown', [this]);

            this.checkDimensions();
            this.element.addClass('sp-open');

            // Update ARIA
            this.element.attr('aria-expanded', 'true');
            this.dropdown.attr('aria-hidden', 'false');

            this.trigger('show.uk.dropdown', [this]);

            UI.Utils.checkDisplay(this.dropdown, true);
            UI.Utils.focus(this.dropdown);
            active = this;

            this.registerOuterClick();
        },

        hide: function(force) {

            this.trigger('beforehide.uk.dropdown', [this, force]);

            this.element.removeClass('sp-open');

            if (this.remainIdle) {
                clearTimeout(this.remainIdle);
            }

            this.remainIdle = false;

            // Update ARIA
            this.element.attr('aria-expanded', 'false');
            this.dropdown.attr('aria-hidden', 'true');

            this.trigger('hide.uk.dropdown', [this, force]);

            if (active == this) active = false;
        },

        registerOuterClick: function(){

            var $this = this;

            UI.$html.off('click.outer.dropdown');

            setTimeout(function() {

                UI.$html.on('click.outer.dropdown', function(e) {

                    if (hoverIdle) {
                        clearTimeout(hoverIdle);
                    }

                    var $target = UI.$(e.target);

                    if (active == $this && !$this.element.find(e.target).length) {
                        $this.hide(true);
                        UI.$html.off('click.outer.dropdown');
                    }
                });
            }, 10);
        },

        checkDimensions: function() {

            if (!this.dropdown.length) return;

            // reset
            this.dropdown.removeClass('sp-dropdown-top sp-dropdown-bottom sp-dropdown-left sp-dropdown-right sp-dropdown-stack sp-dropdown-autoflip').css({
                topLeft :'',
                left :'',
                marginLeft :'',
                marginRight :''
            });

            if (this.justified && this.justified.length) {
                this.dropdown.css('min-width', '');
            }

            var $this          = this,
                pos            = UI.$.extend({}, this.offsetParent.offset(), {width: this.offsetParent[0].offsetWidth, height: this.offsetParent[0].offsetHeight}),
                posoffset      = this.options.offset,
                dropdown       = this.dropdown,
                offset         = dropdown.show().offset() || {left: 0, top: 0},
                width          = dropdown.outerWidth(),
                height         = dropdown.outerHeight(),
                boundarywidth  = this.boundary.width(),
                boundaryoffset = this.boundary[0] !== window && this.boundary.offset() ? this.boundary.offset(): {top:0, left:0},
                dpos           = this.options.pos;

            var variants =  {
                    'bottom-left'   : {top: 0 + pos.height + posoffset, left: 0},
                    'bottom-right'  : {top: 0 + pos.height + posoffset, left: 0 + pos.width - width},
                    'bottom-center' : {top: 0 + pos.height + posoffset, left: 0 + pos.width / 2 - width / 2},
                    'top-left'      : {top: 0 - height - posoffset, left: 0},
                    'top-right'     : {top: 0 - height - posoffset, left: 0 + pos.width - width},
                    'top-center'    : {top: 0 - height - posoffset, left: 0 + pos.width / 2 - width / 2},
                    'left-top'      : {top: 0, left: 0 - width - posoffset},
                    'left-bottom'   : {top: 0 + pos.height - height, left: 0 - width - posoffset},
                    'left-center'   : {top: 0 + pos.height / 2 - height / 2, left: 0 - width - posoffset},
                    'right-top'     : {top: 0, left: 0 + pos.width + posoffset},
                    'right-bottom'  : {top: 0 + pos.height - height, left: 0 + pos.width + posoffset},
                    'right-center'  : {top: 0 + pos.height / 2 - height / 2, left: 0 + pos.width + posoffset}
                },
                css = {},
                pp;

            pp = dpos.split('-');
            css = variants[dpos] ? variants[dpos] : variants['bottom-left'];

            // justify dropdown
            if (this.justified && this.justified.length) {
                justify(dropdown.css({left:0}), this.justified, boundarywidth);
            } else {

                if (this.options.preventflip !== true) {

                    var fdpos;

                    switch(this.checkBoundary(pos.left + css.left, pos.top + css.top, width, height, boundarywidth)) {
                        case "x":
                            if(this.options.preventflip !=='x') fdpos = flips['x'][dpos] || 'right-top';
                            break;
                        case "y":
                            if(this.options.preventflip !=='y') fdpos = flips['y'][dpos] || 'top-left';
                            break;
                        case "xy":
                            if(!this.options.preventflip) fdpos = flips['xy'][dpos] || 'right-bottom';
                            break;
                    }

                    if (fdpos) {

                        pp  = fdpos.split('-');
                        css = variants[fdpos] ? variants[fdpos] : variants['bottom-left'];
                        dropdown.addClass('sp-dropdown-autoflip');

                        // check flipped
                        if (this.checkBoundary(pos.left + css.left, pos.top + css.top, width, height, boundarywidth)) {
                            pp  = dpos.split('-');
                            css = variants[dpos] ? variants[dpos] : variants['bottom-left'];
                        }
                    }
                }
            }

            if (width > boundarywidth) {
                dropdown.addClass('sp-dropdown-stack');
                this.trigger('stack.uk.dropdown', [this]);
            }

            dropdown.css(css).css('display', '').addClass('sp-dropdown-'+pp[0]);
        },

        checkBoundary: function(left, top, width, height, boundarywidth) {

            var axis = "";

            if (left < 0 || ((left - UI.$win.scrollLeft())+width) > boundarywidth) {
               axis += "x";
            }

            if ((top - UI.$win.scrollTop()) < 0 || ((top - UI.$win.scrollTop())+height) > window.innerHeight) {
               axis += "y";
            }

            return axis;
        }
    });


    UI.component('dropdownOverlay', {

        defaults: {
           justify : false,
           cls     : '',
           duration: 200
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$('[data-sp-dropdown-overlay]', context).each(function() {
                    var ele = UI.$(this);

                    if (!ele.data('dropdownOverlay')) {
                        UI.dropdownOverlay(ele, UI.Utils.options(ele.attr('data-sp-dropdown-overlay')));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.justified = this.options.justify ? UI.$(this.options.justify) : false;
            this.overlay   = this.element.find('sp-dropdown-overlay');

            if (!this.overlay.length) {
                this.overlay = UI.$('<div class="sp-dropdown-overlay"></div>').appendTo(this.element);
            }

            this.overlay.addClass(this.options.cls);

            this.on({

                'beforeshow.uk.dropdown': function(e, dropdown) {
                    $this.dropdown = dropdown;

                    if ($this.justified && $this.justified.length) {
                        justify($this.overlay.css({display:'block', marginLeft:'', marginRight:''}), $this.justified, $this.justified.outerWidth());
                    }
                },

                'show.uk.dropdown': function(e, dropdown) {

                    var h = $this.dropdown.dropdown.outerHeight(true);

                    $this.dropdown.element.removeClass('sp-open');

                    $this.overlay.stop().css('display', 'block').animate({height: h}, $this.options.duration, function() {

                       $this.dropdown.dropdown.css('visibility', '');
                       $this.dropdown.element.addClass('sp-open');

                       UI.Utils.checkDisplay($this.dropdown.dropdown, true);
                    });

                    $this.pointerleave = false;
                },

                'hide.uk.dropdown': function() {
                    $this.overlay.stop().animate({height: 0}, $this.options.duration);
                },

                'pointerenter.uk.dropdown': function(e, dropdown) {
                    clearTimeout($this.remainIdle);
                },

                'pointerleave.uk.dropdown': function(e, dropdown) {
                    $this.pointerleave = true;
                }
            });


            this.overlay.on({

                'mouseenter': function() {
                    if ($this.remainIdle) {
                        clearTimeout($this.dropdown.remainIdle);
                        clearTimeout($this.remainIdle);
                    }
                },

                'mouseleave': function(){

                    if ($this.pointerleave && active) {

                        $this.remainIdle = setTimeout(function() {
                           if(active) active.hide();
                        }, active.options.remaintime);
                    }
                }
            })
        }

    });


    function justify(ele, justifyTo, boundarywidth, offset) {

        ele           = UI.$(ele);
        justifyTo     = UI.$(justifyTo);
        boundarywidth = boundarywidth || window.innerWidth;
        offset        = offset || ele.offset();

        if (justifyTo.length) {

            var jwidth = justifyTo.outerWidth();

            ele.css('min-width', jwidth);

            if (UI.langdirection == 'right') {

                var right1   = boundarywidth - (justifyTo.offset().left + jwidth),
                    right2   = boundarywidth - (ele.offset().left + ele.outerWidth());

                ele.css('margin-right', right1 - right2);

            } else {
                ele.css('margin-left', justifyTo.offset().left - offset.left);
            }
        }
    }

})(UIkit2);

(function(UI) {

    "use strict";

    var grids = [];

    UI.component('gridMatchHeight', {

        defaults: {
            target        : false,
            row           : true,
            ignorestacked : false,
            observe       : false
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$('[data-sp-grid-match]', context).each(function() {
                    var grid = UI.$(this), obj;

                    if (!grid.data('gridMatchHeight')) {
                        obj = UI.gridMatchHeight(grid, UI.Utils.options(grid.attr('data-sp-grid-match')));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.columns  = this.element.children();
            this.elements = this.options.target ? this.find(this.options.target) : this.columns;

            if (!this.columns.length) return;

            UI.$win.on('load resize orientationchange', (function() {

                var fn = function() {
                    if ($this.element.is(':visible')) $this.match();
                };

                UI.$(function() { fn(); });

                return UI.Utils.debounce(fn, 50);
            })());

            if (this.options.observe) {

                UI.domObserve(this.element, function(e) {
                    if ($this.element.is(':visible')) $this.match();
                });
            }

            this.on('display.uk.check', function(e) {
                if(this.element.is(':visible')) this.match();
            }.bind(this));

            grids.push(this);
        },

        match: function() {

            var firstvisible = this.columns.filter(':visible:first');

            if (!firstvisible.length) return;

            var stacked = Math.ceil(100 * parseFloat(firstvisible.css('width')) / parseFloat(firstvisible.parent().css('width'))) >= 100;

            if (stacked && !this.options.ignorestacked) {
                this.revert();
            } else {
                UI.Utils.matchHeights(this.elements, this.options);
            }

            return this;
        },

        revert: function() {
            this.elements.css('min-height', '');
            return this;
        }
    });

    UI.component('gridMargin', {

        defaults: {
            cls      : 'sp-grid-margin',
            rowfirst : 'sp-row-first'
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$('[data-sp-grid-margin]', context).each(function() {
                    var grid = UI.$(this), obj;

                    if (!grid.data('gridMargin')) {
                        obj = UI.gridMargin(grid, UI.Utils.options(grid.attr('data-sp-grid-margin')));
                    }
                });
            });
        },

        init: function() {

            var stackMargin = UI.stackMargin(this.element, this.options);
        }
    });

})(UIkit2);

(function(UI) {

    "use strict";

    var active = false, activeCount = 0, $html = UI.$html, body;

    UI.$win.on('resize orientationchange', UI.Utils.debounce(function(){
        UI.$('.sp-modal.sp-open').each(function(){
            return UI.$(this).data('modal') && UI.$(this).data('modal').resize();
        });
    }, 150));

    UI.component('modal', {

        defaults: {
            keyboard: true,
            bgclose: true,
            minScrollHeight: 150,
            center: false,
            modal: true
        },

        scrollable: false,
        transition: false,
        hasTransitioned: true,

        init: function() {

            if (!body) body = UI.$('body');

            if (!this.element.length) return;

            var $this = this;

            $this.paddingdir = 'padding-' + (UI.langdirection == 'left' ? 'right':'left');
            $this.dialog     = $this.find('.sp-modal-dialog');

            $this.active     = false;

            // Update ARIA
            $this.element.attr('aria-hidden', $this.element.hasClass('sp-open'));

            $this.on('click', '.sp-modal-close', function(e) {

                e.preventDefault();

                var modal = UI.$(e.target).closest('.sp-modal');
                if (modal[0] === $this.element[0]) $this.hide();

            }).on('mousedown', function(e) {

                var target = UI.$(e.target);

                if (target[0] == $this.element[0] && $this.options.bgclose) {
                    $this.bgclose_mousedown = true
                } else {
                    $this.bgclose_mousedown = false
                }
            }).on('mouseup', function(e) {

                var target = UI.$(e.target);

                if (target[0] == $this.element[0] && $this.options.bgclose && $this.bgclose_mousedown) {
                    $this.hide();
                }
            });

            UI.domObserve($this.element, function(e) { $this.resize(); });
        },

        toggle: function() {
            return this[this.isActive() ? 'hide' : 'show']();
        },

        show: function() {

            if (!this.element.length) return;

            var $this = this, finalize = function() {
                $this.dialog.css('transform', 'none');
                UI.Utils.focus($this.dialog, 'a[href]');
            };

            if ($this.isActive()) return;

            if ($this.options.modal && active) {
                active.hide(true);
            }

            $this.element.removeClass('sp-open').show();
            $this.resize(true);

            if ($this.options.modal) {
                active = $this;
            }

            $this.active = true;

            activeCount++;

            if (UI.support.transition) {
                $this.hasTransitioned = false;
                $this.element.one(UI.support.transition.end, function(){
                    $this.hasTransitioned = true;
                    finalize();
                }).addClass('sp-open');
            } else {
                $this.element.addClass('sp-open');
                finalize();
            }

            $html.addClass('sp-modal-page').height(); // force browser engine redraw

            // Update ARIA
            $this.element.attr('aria-hidden', 'false');

            $this.element.trigger('show.uk.modal');

            UI.Utils.checkDisplay($this.dialog, true);

            return $this;
        },

        hide: function(force) {

            if (!force && UI.support.transition && this.hasTransitioned) {

                var $this = this;

                this.one(UI.support.transition.end, function() {
                    $this._hide();
                }).removeClass('sp-open');

            } else {

                this._hide();
            }

            return this;
        },

        resize: function(force) {

            if (!this.isActive() && !force) return;

            var bodywidth  = body.width();

            this.scrollbarwidth = window.innerWidth - bodywidth;

            body.css(this.paddingdir, this.scrollbarwidth);

            this.element.css('overflow-y', this.scrollbarwidth ? 'scroll' : 'auto');

            if (!this.updateScrollable() && this.options.center) {

                var dh  = this.dialog.outerHeight(),
                pad = parseInt(this.dialog.css('margin-top'), 10) + parseInt(this.dialog.css('margin-bottom'), 10);

                if ((dh + pad) < window.innerHeight) {
                    this.dialog.css({top: (window.innerHeight/2 - dh/2) - pad });
                } else {
                    this.dialog.css({top: ''});
                }
            }
        },

        updateScrollable: function() {

            // has scrollable?
            var scrollable = this.dialog.find('.sp-overflow-container:visible:first');

            if (scrollable.length) {

                scrollable.css('height', 0);

                var offset = Math.abs(parseInt(this.dialog.css('margin-top'), 10)),
                dh     = this.dialog.outerHeight(),
                wh     = window.innerHeight,
                h      = wh - 2*(offset < 20 ? 20:offset) - dh;

                scrollable.css({
                    maxHeight: (h < this.options.minScrollHeight ? '':h),
                    height:''
                });

                return true;
            }

            return false;
        },

        _hide: function() {

            this.active = false;
            if (activeCount > 0) activeCount--;
            else activeCount = 0;

            this.element.hide().removeClass('sp-open');
            this.dialog.css('transform', '');

            // Update ARIA
            this.element.attr('aria-hidden', 'true');

            if (!activeCount) {
                $html.removeClass('sp-modal-page');
                body.css(this.paddingdir, "");
            }

            if (active===this) active = false;

            this.trigger('hide.uk.modal');
        },

        isActive: function() {
            return this.element.hasClass('sp-open');
        }

    });

    UI.component('modalTrigger', {

        boot: function() {

            // init code
            UI.$html.on('click.modal.uikit', '[data-sp-modal]', function(e) {

                var ele = UI.$(this);

                if (ele.is('a')) {
                    e.preventDefault();
                }

                if (!ele.data('modalTrigger')) {
                    var modal = UI.modalTrigger(ele, UI.Utils.options(ele.attr('data-sp-modal')));
                    modal.show();
                }

            });

            // close modal on esc button
            UI.$html.on('keydown.modal.uikit', function (e) {

                if (active && e.keyCode === 27 && active.options.keyboard) { // ESC
                    e.preventDefault();
                    active.hide();
                }
            });
        },

        init: function() {

            var $this = this;

            this.options = UI.$.extend({
                target: $this.element.is('a') ? $this.element.attr('href') : false
            }, this.options);

            this.modal = UI.modal(this.options.target, this.options);

            this.on("click", function(e) {
                e.preventDefault();
                $this.show();
            });

            //methods
            this.proxy(this.modal, 'show hide isActive');
        }
    });

    UI.modal.dialog = function(content, options) {

        var modal = UI.modal(UI.$(UI.modal.dialog.template).appendTo('body'), options);

        modal.on('hide.uk.modal', function(){
            if (modal.persist) {
                modal.persist.appendTo(modal.persist.data('modalPersistParent'));
                modal.persist = false;
            }
            modal.element.remove();
        });

        setContent(content, modal);

        return modal;
    };

    UI.modal.dialog.template = '<div class="sp-modal"><div class="sp-modal-dialog" style="min-height:0;"></div></div>';

    UI.modal.alert = function(content, options) {

        options = UI.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UI.modal.labels}, options);

        var modal = UI.modal.dialog(([
            '<div class="sp-margin sp-modal-content">'+String(content)+'</div>',
            '<div class="sp-modal-footer sp-text-right"><button class="sp-button sp-button-primary sp-modal-close">'+options.labels.Ok+'</button></div>'
        ]).join(""), options);

        modal.on('show.uk.modal', function(){
            setTimeout(function(){
                modal.element.find('button:first').focus();
            }, 50);
        });

        return modal.show();
    };

    UI.modal.confirm = function(content, onconfirm, oncancel) {

        var options = arguments.length > 1 && arguments[arguments.length-1] ? arguments[arguments.length-1] : {};

        onconfirm = UI.$.isFunction(onconfirm) ? onconfirm : function(){};
        oncancel  = UI.$.isFunction(oncancel) ? oncancel : function(){};
        options   = UI.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UI.modal.labels}, UI.$.isFunction(options) ? {}:options);

        var modal = UI.modal.dialog(([
            '<div class="sp-margin sp-modal-content">'+String(content)+'</div>',
            '<div class="sp-modal-footer sp-text-right"><button class="sp-button js-modal-confirm-cancel">'+options.labels.Cancel+'</button> <button class="sp-button sp-button-primary js-modal-confirm">'+options.labels.Ok+'</button></div>'
        ]).join(""), options);

        modal.element.find(".js-modal-confirm, .js-modal-confirm-cancel").on("click", function(){
            UI.$(this).is('.js-modal-confirm') ? onconfirm() : oncancel();
            modal.hide();
        });

        modal.on('show.uk.modal', function(){
            setTimeout(function(){
                modal.element.find('.js-modal-confirm').focus();
            }, 50);
        });

        return modal.show();
    };

    UI.modal.prompt = function(text, value, onsubmit, options) {

        onsubmit = UI.$.isFunction(onsubmit) ? onsubmit : function(value){};
        options  = UI.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UI.modal.labels}, options);

        var modal = UI.modal.dialog(([
            text ? '<div class="sp-modal-content sp-form">'+String(text)+'</div>':'',
            '<div class="sp-margin-small-top sp-modal-content sp-form"><p><input type="text" class="sp-width-1-1"></p></div>',
            '<div class="sp-modal-footer sp-text-right"><button class="sp-button sp-modal-close">'+options.labels.Cancel+'</button> <button class="sp-button sp-button-primary js-modal-ok">'+options.labels.Ok+'</button></div>'
        ]).join(""), options),

        input = modal.element.find("input[type='text']").val(value || '').on('keyup', function(e){
            if (e.keyCode == 13) {
                modal.element.find('.js-modal-ok').trigger('click');
            }
        });

        modal.element.find('.js-modal-ok').on('click', function(){
            if (onsubmit(input.val())!==false){
                modal.hide();
            }
        });

        return modal.show();
    };

    UI.modal.blockUI = function(content, options) {

        var modal = UI.modal.dialog(([
            '<div class="sp-margin sp-modal-content">'+String(content || '<div class="sp-text-center">...</div>')+'</div>'
        ]).join(""), UI.$.extend({bgclose:false, keyboard:false, modal:false}, options));

        modal.content = modal.element.find('.sp-modal-content:first');

        return modal.show();
    };

    UI.modal.labels = {
        Ok: 'Ok',
        Cancel: 'Cancel'
    };

    // helper functions
    function setContent(content, modal){

        if(!modal) return;

        if (typeof content === 'object') {

            // convert DOM object to a jQuery object
            content = content instanceof jQuery ? content : UI.$(content);

            if(content.parent().length) {
                modal.persist = content;
                modal.persist.data('modalPersistParent', content.parent());
            }
        }else if (typeof content === 'string' || typeof content === 'number') {
                // just insert the data as innerHTML
                content = UI.$('<div></div>').html(content);
        }else {
                // unsupported data type!
                content = UI.$('<div></div>').html('UIkit2.modal Error: Unsupported data type: ' + typeof content);
        }

        content.appendTo(modal.element.find('.sp-modal-dialog'));

        return modal;
    }

})(UIkit2);

(function(UI) {

    "use strict";

    var scrollpos = {x: window.scrollX, y: window.scrollY},
        $win      = UI.$win,
        $doc      = UI.$doc,
        $html     = UI.$html,
        Offcanvas = {

        show: function(element, options) {

            element = UI.$(element);

            if (!element.length) return;

            options = UI.$.extend({mode: 'push'}, options);

            var $body     = UI.$('body'),
                bar       = element.find('.sp-offcanvas-bar:first'),
                rtl       = (UI.langdirection == 'right'),
                flip      = bar.hasClass('sp-offcanvas-bar-flip') ? -1:1,
                dir       = flip * (rtl ? -1 : 1),

                scrollbarwidth =  window.innerWidth - $body.width();

            scrollpos = {x: window.pageXOffset, y: window.pageYOffset};

            bar.attr('mode', options.mode);
            element.addClass('sp-active');

            $body.css({width: window.innerWidth - scrollbarwidth, height: window.innerHeight}).addClass('sp-offcanvas-page');

            if (options.mode == 'push' || options.mode == 'reveal') {
                $body.css((rtl ? 'margin-right' : 'margin-left'), (rtl ? -1 : 1) * (bar.outerWidth() * dir));
            }

            if (options.mode == 'reveal') {
                bar.css('clip', 'rect(0, '+bar.outerWidth()+'px, 100vh, 0)');
            }

            $html.css('margin-top', scrollpos.y * -1).width(); // .width() - force redraw


            bar.addClass('sp-offcanvas-bar-show');

            this._initElement(element);

            bar.trigger('show.uk.offcanvas', [element, bar]);

            // Update ARIA
            element.attr('aria-hidden', 'false');
        },

        hide: function(force) {

            var $body = UI.$('body'),
                panel = UI.$('.sp-offcanvas.sp-active'),
                rtl   = (UI.langdirection == 'right'),
                bar   = panel.find('.sp-offcanvas-bar:first'),
                finalize = function() {
                    $body.removeClass('sp-offcanvas-page').css({width: '', height: '', marginLeft: '', marginRight: ''});
                    panel.removeClass('sp-active');

                    bar.removeClass('sp-offcanvas-bar-show');
                    $html.css('margin-top', '');
                    window.scrollTo(scrollpos.x, scrollpos.y);
                    bar.trigger('hide.uk.offcanvas', [panel, bar]);

                    // Update ARIA
                    panel.attr('aria-hidden', 'true');
                };

            if (!panel.length) return;
            if (bar.attr('mode') == 'none') force = true;

            if (UI.support.transition && !force) {

                $body.one(UI.support.transition.end, function() {
                    finalize();
                }).css((rtl ? 'margin-right' : 'margin-left'), '');

                if (bar.attr('mode') == 'reveal') {
                    bar.css('clip', '');
                }

                setTimeout(function(){
                    bar.removeClass('sp-offcanvas-bar-show');
                }, 0);

            } else {
                finalize();
            }
        },

        _initElement: function(element) {

            if (element.data('OffcanvasInit')) return;

            element.on('click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas', function(e) {

                var target = UI.$(e.target);

                if (e.type.match(/swipe/)) {
                    if (target.parents('.sp-offcanvas-bar:first').length) return;
                } else {

                    if (!target.hasClass('sp-offcanvas-close')) {
                        if (target.hasClass('sp-offcanvas-bar')) return;
                        if (target.parents('.sp-offcanvas-bar:first').length) return;
                    }
                }

                e.stopImmediatePropagation();
                Offcanvas.hide();
            });

            element.on('click', 'a[href*="#"]', function(e){

                var link = UI.$(this),
                    href = link.attr('href');

                if (href == '#') {
                    return;
                }

                UI.$doc.one('hide.uk.offcanvas', function() {

                    var target;

                    try {
                        target = UI.$(link[0].hash);
                    } catch (e){
                        target = '';
                    }

                    if (!target.length) {
                        target = UI.$('[name="'+link[0].hash.replace('#','')+'"]');
                    }

                    if (target.length && UI.Utils.scrollToElement) {
                        UI.Utils.scrollToElement(target, UI.Utils.options(link.attr('data-sp-smooth-scroll') || '{}'));
                    } else {
                        window.location.href = href;
                    }
                });

                Offcanvas.hide();
            });

            element.data('OffcanvasInit', true);
        }
    };

    UI.component('offcanvasTrigger', {

        boot: function() {

            // init code
            $html.on('click.offcanvas.uikit', '[data-sp-offcanvas]', function(e) {

                e.preventDefault();

                var ele = UI.$(this);

                if (!ele.data('offcanvasTrigger')) {
                    var obj = UI.offcanvasTrigger(ele, UI.Utils.options(ele.attr('data-sp-offcanvas')));
                    ele.trigger("click");
                }
            });

            $html.on('keydown.uk.offcanvas', function(e) {

                if (e.keyCode === 27) { // ESC
                    Offcanvas.hide();
                }
            });
        },

        init: function() {

            var $this = this;

            this.options = UI.$.extend({
                target: $this.element.is('a') ? $this.element.attr('href') : false,
                mode: 'push'
            }, this.options);

            this.on('click', function(e) {
                e.preventDefault();
                Offcanvas.show($this.options.target, $this.options);
            });
        }
    });

    UI.offcanvas = Offcanvas;

})(UIkit2);

(function(UI) {

    "use strict";

    var Animations;

    UI.component('switcher', {

        defaults: {
            connect   : false,
            toggle    : '>*',
            active    : 0,
            animation : false,
            duration  : 200,
            swiping   : true
        },

        animating: false,

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$('[data-sp-switcher]', context).each(function() {
                    var switcher = UI.$(this);

                    if (!switcher.data('switcher')) {
                        var obj = UI.switcher(switcher, UI.Utils.options(switcher.attr('data-sp-switcher')));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.on('click.uk.switcher', this.options.toggle, function(e) {
                e.preventDefault();
                $this.show(this);
            });

            if (!this.options.connect) {
                return;
            }

            this.connect = UI.$(this.options.connect);

            if (!this.connect.length) {
                return;
            }

            this.connect.on('click.uk.switcher', '[data-sp-switcher-item]', function(e) {

                e.preventDefault();

                var item = UI.$(this).attr('data-sp-switcher-item');

                if ($this.index == item) return;

                switch(item) {
                    case 'next':
                    case 'previous':
                        $this.show($this.index + (item=='next' ? 1:-1));
                        break;
                    default:
                        $this.show(parseInt(item, 10));
                }
            });

            if (this.options.swiping) {

                this.connect.on('swipeRight swipeLeft', function(e) {
                    e.preventDefault();
                    if (!window.getSelection().toString()) {
                        $this.show($this.index + (e.type == 'swipeLeft' ? 1 : -1));
                    }
                });
            }

            this.update();
        },

        update: function() {

            this.connect.children().removeClass('sp-active').attr('aria-hidden', 'true');

            var toggles = this.find(this.options.toggle),
                active  = toggles.filter('.sp-active');

            if (active.length) {
                this.show(active, false);
            } else {

                if (this.options.active===false) return;

                active = toggles.eq(this.options.active);
                this.show(active.length ? active : toggles.eq(0), false);
            }

            // Init ARIA for toggles
            toggles.not(active).attr('aria-expanded', 'false');
            active.attr('aria-expanded', 'true');
        },

        show: function(tab, animate) {

            if (this.animating) {
                return;
            }

            var toggles = this.find(this.options.toggle);

            if (isNaN(tab)) {
                tab = UI.$(tab);
            } else {
                tab = tab < 0 ? toggles.length-1 : tab;
                tab = toggles.eq(toggles[tab] ? tab : 0);
            }

            var $this     = this,
                active    = UI.$(tab),
                animation = Animations[this.options.animation] || function(current, next) {

                    if (!$this.options.animation) {
                        return Animations.none.apply($this);
                    }

                    var anim = $this.options.animation.split(',');

                    if (anim.length == 1) {
                        anim[1] = anim[0];
                    }

                    anim[0] = anim[0].trim();
                    anim[1] = anim[1].trim();

                    return coreAnimation.apply($this, [anim, current, next]);
                };

            if (animate===false || !UI.support.animation) {
                animation = Animations.none;
            }

            if (active.hasClass("sp-disabled")) return;

            // Update ARIA for Toggles
            toggles.attr('aria-expanded', 'false');
            active.attr('aria-expanded', 'true');

            toggles.filter(".sp-active").removeClass("sp-active");
            active.addClass("sp-active");

            if (this.options.connect && this.connect.length) {

                this.index = this.find(this.options.toggle).index(active);

                if (this.index == -1 ) {
                    this.index = 0;
                }

                this.connect.each(function() {

                    var container = UI.$(this),
                        children  = UI.$(container.children()),
                        current   = UI.$(children.filter('.sp-active')),
                        next      = UI.$(children.eq($this.index));

                        $this.animating = true;

                        animation.apply($this, [current, next]).then(function(){

                            current.removeClass("sp-active");
                            next.addClass("sp-active");

                            // Update ARIA for connect
                            current.attr('aria-hidden', 'true');
                            next.attr('aria-hidden', 'false');

                            UI.Utils.checkDisplay(next, true);

                            $this.animating = false;

                        });
                });
            }

            this.trigger("show.uk.switcher", [active]);
        }
    });

    Animations = {

        'none': function() {
            var d = UI.$.Deferred();
            d.resolve();
            return d.promise();
        },

        'fade': function(current, next) {
            return coreAnimation.apply(this, ['sp-animation-fade', current, next]);
        },

        'slide-bottom': function(current, next) {
            return coreAnimation.apply(this, ['sp-animation-slide-bottom', current, next]);
        },

        'slide-top': function(current, next) {
            return coreAnimation.apply(this, ['sp-animation-slide-top', current, next]);
        },

        'slide-vertical': function(current, next, dir) {

            var anim = ['sp-animation-slide-top', 'sp-animation-slide-bottom'];

            if (current && current.index() > next.index()) {
                anim.reverse();
            }

            return coreAnimation.apply(this, [anim, current, next]);
        },

        'slide-left': function(current, next) {
            return coreAnimation.apply(this, ['sp-animation-slide-left', current, next]);
        },

        'slide-right': function(current, next) {
            return coreAnimation.apply(this, ['sp-animation-slide-right', current, next]);
        },

        'slide-horizontal': function(current, next, dir) {

            var anim = ['sp-animation-slide-right', 'sp-animation-slide-left'];

            if (current && current.index() > next.index()) {
                anim.reverse();
            }

            return coreAnimation.apply(this, [anim, current, next]);
        },

        'scale': function(current, next) {
            return coreAnimation.apply(this, ['sp-animation-scale-up', current, next]);
        }
    };

    UI.switcher.animations = Animations;


    // helpers

    function coreAnimation(cls, current, next) {

        var d = UI.$.Deferred(), clsIn = cls, clsOut = cls, release;

        if (next[0]===current[0]) {
            d.resolve();
            return d.promise();
        }

        if (typeof(cls) == 'object') {
            clsIn  = cls[0];
            clsOut = cls[1] || cls[0];
        }

        UI.$body.css('overflow-x', 'hidden'); // fix scroll jumping in iOS

        release = function() {

            if (current) current.hide().removeClass('sp-active '+clsOut+' sp-animation-reverse');

            next.addClass(clsIn).one(UI.support.animation.end, function() {

                setTimeout(function () {
                    next.removeClass(''+clsIn+'').css({opacity:'', display:''});
                }, 0);

                d.resolve();

                UI.$body.css('overflow-x', '');

                if (current) current.css({opacity:'', display:''});

            }.bind(this)).show();
        };

        next.css('animation-duration', this.options.duration+'ms');

        if (current && current.length) {

            current.css('animation-duration', this.options.duration+'ms');

            current.css('display', 'none').addClass(clsOut+' sp-animation-reverse').one(UI.support.animation.end, function() {
                release();
            }.bind(this)).css('display', '');

        } else {
            next.addClass('sp-active');
            release();
        }

        return d.promise();
    }

})(UIkit2);

(function(UI) {

    "use strict";

    UI.component('tab', {

        defaults: {
            target    : '>li:not(.sp-tab-responsive, .sp-disabled)',
            connect   : false,
            active    : 0,
            animation : false,
            duration  : 200,
            swiping   : true
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$('[data-sp-tab]', context).each(function() {

                    var tab = UI.$(this);

                    if (!tab.data('tab')) {
                        var obj = UI.tab(tab, UI.Utils.options(tab.attr('data-sp-tab')));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.current = false;

            this.on('click.uk.tab', this.options.target, function(e) {

                e.preventDefault();

                if ($this.switcher && $this.switcher.animating) {
                    return;
                }

                var current = $this.find($this.options.target).not(this);

                current.removeClass('sp-active').blur();

                $this.trigger('change.uk.tab', [UI.$(this).addClass('sp-active'), $this.current]);

                $this.current = UI.$(this);

                // Update ARIA
                if (!$this.options.connect) {
                    current.attr('aria-expanded', 'false');
                    UI.$(this).attr('aria-expanded', 'true');
                }
            });

            if (this.options.connect) {
                this.connect = UI.$(this.options.connect);
            }

            // init responsive tab
            this.responsivetab = UI.$('<li class="sp-tab-responsive sp-active"><a></a></li>').append('<div class="sp-dropdown sp-dropdown-small"><ul class="sp-nav sp-nav-dropdown"></ul><div>');

            this.responsivetab.dropdown = this.responsivetab.find('.sp-dropdown');
            this.responsivetab.lst      = this.responsivetab.dropdown.find('ul');
            this.responsivetab.caption  = this.responsivetab.find('a:first');

            if (this.element.hasClass('sp-tab-bottom')) this.responsivetab.dropdown.addClass('sp-dropdown-up');

            // handle click
            this.responsivetab.lst.on('click.uk.tab', 'a', function(e) {

                e.preventDefault();
                e.stopPropagation();

                var link = UI.$(this);

                $this.element.children('li:not(.sp-tab-responsive)').eq(link.data('index')).trigger('click');
            });

            this.on('show.uk.switcher change.uk.tab', function(e, tab) {
                $this.responsivetab.caption.html(tab.text());
            });

            this.element.append(this.responsivetab);

            // init UIkit components
            if (this.options.connect) {

                this.switcher = UI.switcher(this.element, {
                    toggle    : '>li:not(.sp-tab-responsive)',
                    connect   : this.options.connect,
                    active    : this.options.active,
                    animation : this.options.animation,
                    duration  : this.options.duration,
                    swiping   : this.options.swiping
                });
            }

            UI.dropdown(this.responsivetab, {mode: 'click', preventflip: 'y'});

            // init
            $this.trigger('change.uk.tab', [this.element.find(this.options.target).not('.sp-tab-responsive').filter('.sp-active')]);

            this.check();

            UI.$win.on('resize orientationchange', UI.Utils.debounce(function(){
                if ($this.element.is(':visible'))  $this.check();
            }, 100));

            this.on('display.uk.check', function(){
                if ($this.element.is(':visible'))  $this.check();
            });
        },

        check: function() {

            var children = this.element.children('li:not(.sp-tab-responsive)').removeClass('sp-hidden');

            if (!children.length) {
                this.responsivetab.addClass('sp-hidden');
                return;
            }

            var top          = (children.eq(0).offset().top + Math.ceil(children.eq(0).height()/2)),
                doresponsive = false,
                item, link, clone;

            this.responsivetab.lst.empty();

            children.each(function(){

                if (UI.$(this).offset().top > top) {
                    doresponsive = true;
                }
            });

            if (doresponsive) {

                for (var i = 0; i < children.length; i++) {

                    item  = UI.$(children.eq(i));
                    link  = item.find('a');

                    if (item.css('float') != 'none' && !item.attr('sp-dropdown')) {

                        if (!item.hasClass('sp-disabled')) {

                            clone = UI.$(item[0].outerHTML);
                            clone.find('a').data('index', i);

                            this.responsivetab.lst.append(clone);
                        }

                        item.addClass('sp-hidden');
                    }
                }
            }

            this.responsivetab[this.responsivetab.lst.children('li').length ? 'removeClass':'addClass']('sp-hidden');
        }
    });

})(UIkit2);

(function(UI){

    "use strict";

    var toggles = [];

    UI.component('toggle', {

        defaults: {
            target    : false,
            cls       : 'sp-hidden',
            animation : false,
            duration  : 200
        },

        boot: function(){

            // init code
            UI.ready(function(context) {

                UI.$('[data-sp-toggle]', context).each(function() {
                    var ele = UI.$(this);

                    if (!ele.data('toggle')) {
                        var obj = UI.toggle(ele, UI.Utils.options(ele.attr('data-sp-toggle')));
                    }
                });

                setTimeout(function(){

                    toggles.forEach(function(toggle){
                        toggle.getToggles();
                    });

                }, 0);
            });
        },

        init: function() {

            var $this = this;

            this.aria = (this.options.cls.indexOf('sp-hidden') !== -1);

            this.on('click', function(e) {

                if ($this.element.is('a[href="#"]')) {
                    e.preventDefault();
                }

                $this.toggle();
            });

            toggles.push(this);
        },

        toggle: function() {

            this.getToggles();

            if(!this.totoggle.length) return;

            if (this.options.animation && UI.support.animation) {

                var $this = this, animations = this.options.animation.split(',');

                if (animations.length == 1) {
                    animations[1] = animations[0];
                }

                animations[0] = animations[0].trim();
                animations[1] = animations[1].trim();

                this.totoggle.css('animation-duration', this.options.duration+'ms');

                this.totoggle.each(function(){

                    var ele = UI.$(this);

                    if (ele.hasClass($this.options.cls)) {

                        ele.toggleClass($this.options.cls);

                        UI.Utils.animate(ele, animations[0]).then(function(){
                            ele.css('animation-duration', '');
                            UI.Utils.checkDisplay(ele);
                        });

                    } else {

                        UI.Utils.animate(this, animations[1]+' sp-animation-reverse').then(function(){
                            ele.toggleClass($this.options.cls).css('animation-duration', '');
                            UI.Utils.checkDisplay(ele);
                        });

                    }

                });

            } else {
                this.totoggle.toggleClass(this.options.cls);
                UI.Utils.checkDisplay(this.totoggle);
            }

            this.updateAria();

        },

        getToggles: function() {
            this.totoggle = this.options.target ? UI.$(this.options.target):[];
            this.updateAria();
        },

        updateAria: function() {
            if (this.aria && this.totoggle.length) {
                this.totoggle.not('[aria-hidden]').each(function(){
                    UI.$(this).attr('aria-hidden', UI.$(this).hasClass('sp-hidden'));
                });
            }
        }
    });

})(UIkit2);

(function(UI) {

    "use strict";

    var stacks = [];

    UI.component('stackMargin', {

        defaults: {
            cls: 'sp-margin-small-top',
            rowfirst: false,
            observe: false
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$('[data-sp-margin]', context).each(function() {

                    var ele = UI.$(this);

                    if (!ele.data('stackMargin')) {
                        UI.stackMargin(ele, UI.Utils.options(ele.attr('data-sp-margin')));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            UI.$win.on('resize orientationchange', (function() {

                var fn = function() {
                    $this.process();
                };

                UI.$(function() {
                    fn();
                    UI.$win.on('load', fn);
                });

                return UI.Utils.debounce(fn, 20);
            })());

            this.on('display.uk.check', function(e) {
                if (this.element.is(':visible')) this.process();
            }.bind(this));

            if (this.options.observe) {

                UI.domObserve(this.element, function(e) {
                    if ($this.element.is(':visible')) $this.process();
                });
            }

            stacks.push(this);
        },

        process: function() {

            var $this = this, columns = this.element.children();

            UI.Utils.stackMargin(columns, this.options);

            if (!this.options.rowfirst || !columns.length) {
                return this;
            }

            // Mark first column elements
            var group = {}, minleft = false;

            columns.removeClass(this.options.rowfirst).each(function(offset, $ele){

                $ele = UI.$(this);

                if (this.style.display != 'none') {
                    offset = $ele.offset().left;
                    ((group[offset] = group[offset] || []) && group[offset]).push(this);
                    minleft = minleft === false ? offset : Math.min(minleft, offset);
                }
            });

            UI.$(group[minleft]).addClass(this.options.rowfirst);

            return this;
        }

    });


    // responsive element e.g. iframes

    (function(){

        var elements = [], check = function(ele) {

            if (!ele.is(':visible')) return;

            var width  = ele.parent().width(),
                iwidth = ele.data('width'),
                ratio  = (width / iwidth),
                height = Math.floor(ratio * ele.data('height'));

            ele.css({height: (width < iwidth) ? height : ele.data('height')});
        };

        UI.component('responsiveElement', {

            defaults: {},

            boot: function() {

                // init code
                UI.ready(function(context) {

                    UI.$('iframe.sp-responsive-width, [data-sp-responsive]', context).each(function() {

                        var ele = UI.$(this), obj;

                        if (!ele.data('responsiveElement')) {
                            obj = UI.responsiveElement(ele, {});
                        }
                    });
                });
            },

            init: function() {

                var ele = this.element;

                if (ele.attr('width') && ele.attr('height')) {

                    ele.data({
                        width : ele.attr('width'),
                        height: ele.attr('height')
                    }).on('display.uk.check', function(){
                        check(ele);
                    });

                    check(ele);

                    elements.push(ele);
                }
            }
        });

        UI.$win.on('resize load', UI.Utils.debounce(function(){

            elements.forEach(function(ele){
                check(ele);
            });

        }, 15));

    })();


    // helper

    UI.Utils.stackMargin = function(elements, options) {

        options = UI.$.extend({
            cls: 'sp-margin-small-top'
        }, options);

        elements = UI.$(elements).removeClass(options.cls);

        var min = false;

        elements.each(function(offset, height, pos, $ele){

            $ele   = UI.$(this);

            if ($ele.css('display') != 'none') {

                offset = $ele.offset();
                height = $ele.outerHeight();
                pos    = offset.top + height;

                $ele.data({
                    ukMarginPos: pos,
                    ukMarginTop: offset.top
                });

                if (min === false || (offset.top < min.top) ) {

                    min = {
                        top  : offset.top,
                        left : offset.left,
                        pos  : pos
                    };
                }
            }

        }).each(function($ele) {

            $ele   = UI.$(this);

            if ($ele.css('display') != 'none' && $ele.data('ukMarginTop') > min.top && $ele.data('ukMarginPos') > min.pos) {
                $ele.addClass(options.cls);
            }
        });
    };

    UI.Utils.matchHeights = function(elements, options) {

        elements = UI.$(elements).css('min-height', '');
        options  = UI.$.extend({ row : true }, options);

        var matchHeights = function(group){

            if (group.length < 2) return;

            var max = 0;

            group.each(function() {
                max = Math.max(max, UI.$(this).outerHeight());
            }).each(function() {

                var element = UI.$(this),
                    height  = max - (element.css('box-sizing') == 'border-box' ? 0 : (element.outerHeight() - element.height()));

                element.css('min-height', height + 'px');
            });
        };

        if (options.row) {

            elements.first().width(); // force redraw

            setTimeout(function(){

                var lastoffset = false, group = [];

                elements.each(function() {

                    var ele = UI.$(this), offset = ele.offset().top;

                    if (offset != lastoffset && group.length) {

                        matchHeights(UI.$(group));
                        group  = [];
                        offset = ele.offset().top;
                    }

                    group.push(ele);
                    lastoffset = offset;
                });

                if (group.length) {
                    matchHeights(UI.$(group));
                }

            }, 0);

        } else {
            matchHeights(elements);
        }
    };

    (function(cacheSvgs){

        UI.Utils.inlineSvg = function(selector, root) {

            var images = UI.$(selector || 'img[src$=".svg"]', root || document).each(function(){

                var img = UI.$(this),
                    src = img.attr('src');

                if (!cacheSvgs[src]) {

                    var d = UI.$.Deferred();

                    UI.$.get(src, {nc: Math.random()}, function(data){
                        d.resolve(UI.$(data).find('svg'));
                    });

                    cacheSvgs[src] = d.promise();
                }

                cacheSvgs[src].then(function(svg) {

                    var $svg = UI.$(svg).clone();

                    if (img.attr('id')) $svg.attr('id', img.attr('id'));
                    if (img.attr('class')) $svg.attr('class', img.attr('class'));
                    if (img.attr('style')) $svg.attr('style', img.attr('style'));

                    if (img.attr('width')) {
                        $svg.attr('width', img.attr('width'));
                        if (!img.attr('height'))  $svg.removeAttr('height');
                    }

                    if (img.attr('height')){
                        $svg.attr('height', img.attr('height'));
                        if (!img.attr('width')) $svg.removeAttr('width');
                    }

                    img.replaceWith($svg);
                });
            });
        };

        // init code
        UI.ready(function(context) {
            UI.Utils.inlineSvg('[data-sp-svg]', context);
        });

    })({});

    UI.Utils.getCssVar = function(name) {

        /* usage in css:  .var-name:before { content:"xyz" } */

        var val, doc = document.documentElement, element = doc.appendChild(document.createElement('div'));

        element.classList.add('var-'+name);

        try {
            val = JSON.parse(val = getComputedStyle(element, ':before').content.replace(/^["'](.*)["']$/, '$1'));
        } catch (e) {
            val = undefined;
        }

        doc.removeChild(element);

        return val;
    }

})(UIkit2);

(function(addon) {

    var component;

    if (window.UIkit2) {
        component = addon(UIkit2);
    }

    if (typeof define == 'function' && define.amd) {
        define('uikit-notify', ['uikit'], function(){
            return component || addon(UIkit2);
        });
    }

})(function(UI){

    "use strict";

    var containers = {},
        messages   = {},

        notify     =  function(options){

            if (UI.$.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = UI.$.extend(options, UI.$.type(arguments[1]) == 'string' ? {status:arguments[1]} : arguments[1]);
            }

            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){

            var id;

            if (group) {
                for(id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(id in messages) { messages[id].close(instantly); }
            }
        };

    var Message = function(options){

        this.options = UI.$.extend({}, Message.defaults, options);

        this.uuid    = UI.Utils.uid('notifymsg');
        this.element = UI.$([

            '<div class="sp-notify-message">',
                '<a class="sp-close"></a>',
                '<div></div>',
            '</div>'

        ].join('')).data("notifyMessage", this);

        this.content(this.options.message);

        // status
        if (this.options.status) {
            this.element.addClass('sp-notify-message-'+this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if(!containers[this.options.pos]) {
            containers[this.options.pos] = UI.$('<div class="sp-notify sp-notify-'+this.options.pos+'"></div>').appendTo('body').on("click", ".sp-notify-message", function(){

                var message = UI.$(this).data('notifyMessage');

                message.element.trigger('manualclose.uk.notify', [message]);
                message.close();
            });
        }
    };


    UI.$.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,

        show: function() {

            if (this.element.is(':visible')) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css('margin-bottom'), 10);

            this.element.css({opacity:0, marginTop: -1*this.element.outerHeight(), marginBottom:0}).animate({opacity:1, marginTop:0, marginBottom:marginbottom}, function(){

                if ($this.options.timeout) {

                    var closefn = function(){ $this.close(); };

                    $this.timeout = setTimeout(closefn, $this.options.timeout);

                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }

            });

            return this;
        },

        close: function(instantly) {

            var $this    = this,
                finalize = function(){
                    $this.element.remove();

                    if (!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    $this.options.onClose.apply($this, []);
                    $this.element.trigger('close.uk.notify', [$this]);

                    delete messages[$this.uuid];
                };

            if (this.timeout) clearTimeout(this.timeout);

            if (instantly) {
                finalize();
            } else {
                this.element.animate({opacity:0, marginTop: -1* this.element.outerHeight(), marginBottom:0}, function(){
                    finalize();
                });
            }
        },

        content: function(html){

            var container = this.element.find(">div");

            if(!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function(status) {

            if (!status) {
                return this.currentstatus;
            }

            this.element.removeClass('sp-notify-message-'+this.currentstatus).addClass('sp-notify-message-'+status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: "",
        status: "",
        timeout: 5000,
        group: null,
        pos: 'top-center',
        onClose: function() {}
    };

    UI.notify          = notify;
    UI.notify.message  = Message;
    UI.notify.closeAll = closeAll;

    return notify;
});

window.UI = window.ui = (function (exports, window, UIkit) {
  var
    ACTIVE_CLASS = 'sp-active',
    HIDDEN_CLASS = 'sp-hidden',
    PASSIVE_EVENT = {passive: true};

  var
    $counters = {},
    $definitions = {},
    $listeners = {},
    $windowListeners = {
      mousedown: [windowOnMouseDown],
      mousemove: [windowOnMouseMove],
      mouseup: [windowOnMouseUp, windowResizerOnMouseUp],
      touchstart: [windowOnMouseDown],
      touchend: [windowOnMouseUp, windowResizerOnMouseUp],
      touchmove: [windowOnMouseMove],
      load: [windowOnLoad],
      resize: []
    },
    $globalListenerIds = {},
    $components = {};

  // Request animation frame fallback
  var raf = window.requestAnimationFrame || window.setImmediate || function(c) { return setTimeout(c, 0); };

  extend(exports, {
    $ready: false,
    $dragThreshold: 10,
    $globalListenerIds: $globalListenerIds,
    $windowListeners: $windowListeners,
    $counters: $counters,
    $scrollState: null,

    listeners: $listeners,
    definitions: $definitions,
    components: $components,

    message: UIkit.notify,
    confirm: UIkit.modal.confirm,
    prompt: UIkit.modal.prompt,
    alert: UIkit.modal.alert,

    support: UIkit.support,

    $$: $$,

    isArray: isArray,
    isString: isString,
    isObject: isObject,
    isDefined: isDefined,
    isUndefined: isUndefined,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isFunction: isFunction,

    polyfillKeyboardEvent: polyfillKeyboardEvent,

    forIn: forIn,
    forInLoop: forInLoop,
    forEachUntil: forEachUntil,

    assert: assert,
    assertPropertyValidator: assertPropertyValidator,
    fail: fail,
    log: log,

    classString: classString,
    classSetters: classSetters,
    prefixClassOptions: prefixClassOptions,

    extend: extend,
    defaults: defaults,
    pluck: pluck,
    bind: bind,
    echo: echo,
    noop: noop,
    delay: delay,
    interpolate: interpolate,
    capitalize: capitalize,
    template: template,

    createElement: createElement,
    removeAllChildren: removeAllChildren,
    preventEvent: preventEvent,
    stopPropagation: stopPropagation,
    setAttributes: setAttributes,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,

    def: def,
    uid: uid,

    addListener: addListener,
    removeListener: removeListener
  });

  function isArray(obj) {
    return Array.isArray ? Array.isArray(obj) : (Object.prototype.toString.call(obj) == '[object Array]');
  }

  function isString(obj) {
    return typeof obj === 'string' || Object.prototype.toString.call(obj) == '[object String]';
  }

  function isObject(obj) {
    return Object.prototype.toString.call(obj) == '[object Object]';
  }

  function isDefined(obj) {
    return obj !== undefined && obj !== null;
  }

  function isUndefined(obj) {
    return obj === undefined;
  }

  function isFalsy(obj) {
    return !obj;
  }

  function isNumber(obj) {
    return typeof obj === 'number';
  }

  function isBoolean(obj) {
    return typeof obj === 'boolean';
  }

  function isFunction(obj) {
    return typeof obj === 'function';
  }

  function isElement(obj) {
    return obj && obj.nodeName && (obj.nodeType === 1 || obj.nodeType === 3);
  }

  function assert(cond, msg, details) {
    if (!cond) {
      fail(msg, details);
    }
  }

  function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
  }

  function assertPropertyValidator(value, name, validator, resolveMessage) {
    assert(validator(value),
      name + ' failed "' + functionName(validator) +
      '" validator, got ' + value + ' instead.' +
      (resolveMessage ? '\n' + resolveMessage : ''));
  }

  function assertBasesCheck(baseName, defName, bases, isLast) {
    if (isLast)
      assert(bases.indexOf(baseName) == bases.length - 1,
        interpolate("{{base}} should be the last extension in {{name}}",
          {base: baseName, name: defName}));
    else if (defName == baseName)
      assert(bases.indexOf(baseName) != -1, defName + " is an abstract class.");
    else
      assert(bases.indexOf(baseName) != -1,
        interpolate("{{def}} must extend {{base}}.", {def: defName, base: baseName}));
  }

  function fail(message, details) {
    log("error", message, details);
    if (exports.debug !== false) {
      throw new Error(message);
    }
  }

  function log(type, message, explanation) {
    if (message === undefined) {
      message = type;
      type = "log";
    }
    var console = window.console;
    if (console) {
      if (console[type]) console[type](message || "");
      else console.log(type + ": " + message);
      if (explanation) console.log(explanation);
    }
  }

  var keyLookup = (function () {
    var keys = {
      3: 'Cancel',
      6: 'Help',
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      28: 'Convert',
      29: 'NonConvert',
      30: 'Accept',
      31: 'ModeChange',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      41: 'Select',
      42: 'Print',
      43: 'Execute',
      44: 'PrintScreen',
      45: 'Insert',
      46: 'Delete',
      48: ['0', ')'],
      49: ['1', '!'],
      50: ['2', '@'],
      51: ['3', '#'],
      52: ['4', '$'],
      53: ['5', '%'],
      54: ['6', '^'],
      55: ['7', '&'],
      56: ['8', '*'],
      57: ['9', '('],
      91: 'OS',
      93: 'ContextMenu',
      106: '*',
      107: '+',
      109: '-',
      110: '.',
      111: '/',
      144: 'NumLock',
      145: 'ScrollLock',
      181: 'VolumeMute',
      182: 'VolumeDown',
      183: 'VolumeUp',
      186: [';', ':'],
      187: ['=', '+'],
      188: [',', '<'],
      189: ['-', '_'],
      190: ['.', '>'],
      191: ['/', '?'],
      192: ['`', '~'],
      219: ['[', '{'],
      220: ['\\', '|'],
      221: [']', '}'],
      222: ["'", '"'],
      224: 'Meta',
      225: 'AltGraph',
      246: 'Attn',
      247: 'CrSel',
      248: 'ExSel',
      249: 'EraseEof',
      250: 'Play',
      251: 'ZoomOut'
    };

    // Function keys (F1-24).
    var i;
    for (i = 1; i < 25; i++) {
      keys[111 + i] = 'F' + i;
    }

    // Printable ASCII characters.
    var letter = '';
    for (i = 65; i < 91; i++) {
      letter = String.fromCharCode(i);
      keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
    }

    // Numbers on numeric keyboard.
    for (i = 96; i < 106; i++) {
      letter = String.fromCharCode(i - 48);
      keys[i] = letter;
    }

    return keys;
  }());

  function polyfillKeyboardEvent(keyEvent) {
    var key = keyLookup[keyEvent.which || keyEvent.keyCode] || keyEvent.key;
    if (isArray(key)) {
      key = key[+keyEvent.shiftKey];
    }
    keyEvent.key = key;
    return keyEvent;
  }

  function capitalize(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }

  function interpolate(str, obj) {
    var regex = /\{\{[^\s}]*}}/gi;
    return str.replace(regex, function (match) {
      return exports.selectors.property(match.substring(2, match.length - 2))(obj);
    });
  }

  function extend(target, src) {
    forInLoop(function (key, value) {
      if (isDefined(value)) target[key] = value;
    }, src);
    return target;
  }

  function defaults(target, defaults) {
    forInLoop(function (key, value) {
      if (isUndefined(target[key])) target[key] = value;
    }, defaults);
    return target;
  }

  function pluck(array, property) {
    return array.map(exports.selectors.property(property));
  }

  function def(config) {
    var bases = Array.prototype.slice.call(arguments, 1);
    var cls = buildDef(config, bases);
    $definitions[config.__name__] = cls;
    return cls;
  }

  function classString(value) {
    if (isArray(value)) {
      return value.reduce(function (classList, cls) {
        if (classList.indexOf(cls) == -1) classList.push(cls);
        return classList;
      }, []).join(' ');
    }
    else if (isString(value)) {
      return value;
    }
    else if (isBoolean(value)) {
      return String(value);
    }
    else return '';
  }

  function iconTemplate(config, linkIcon) {
    var iconSize = config.iconSize ? ' sp-icon-{{iconSize}}' : '';
    var icon = config.icon ? ' sp-icon-{{icon}}' : '';
    return '<i class="{{iconClass}}' + icon + iconSize + (linkIcon ? ' sp-link-icon' : '') + '">{{iconContent}}</i>';
  }

  function elementIconTemplate(templateFn) {
    return function (config) {
      if (config.icon || config.iconClass) {
        var iconTemplate = isFunction(config.iconTemplate) ? config.iconTemplate.call(this, config, true) : (config.iconTemplate || '');
        return config.alignIconRight ? templateFn(config) + iconTemplate : iconTemplate + templateFn(config);
      }
      else {
        return templateFn(config);
      }
    };
  }

  function containsInterpolateValues(string) {
    return /{{[$\w]+}}/.test(string)
  }

  function containsHTML(string) {
    return /(<\w+|&\w+;)/.test(string)
  }

  function template(templateObject, config, thisArg, parentNode, partOfArray) {
    var returnFlag = false;

    if (isFunction(templateObject)) {
      templateObject = templateObject.call(thisArg, config);
      returnFlag = true;
    }
    if (isNumber(templateObject)) {
      if (partOfArray) {
        parentNode.appendChild(document.createTextNode(templateObject.toString()))
      } else {
        parentNode.textContent = templateObject.toString()
      }
    } else if (isString(templateObject)) {
      if (containsHTML(templateObject)) {
        var innerHTML = templateObject
        if (containsInterpolateValues(templateObject)) {
          innerHTML = interpolate(templateObject, config);
        }
        if (partOfArray) {
          parentNode.insertAdjacentHTML('beforeend', innerHTML)
        } else {
          parentNode.innerHTML = innerHTML
        }
      } else {
        var text = templateObject
        if (containsInterpolateValues(templateObject)) {
          text = interpolate(templateObject, config);
        }
        if (partOfArray) {
          parentNode.appendChild(document.createTextNode(text))
        } else {
          parentNode.textContent = text
        }
      }
    }
    else if (isElement(templateObject)) {
      parentNode.appendChild(templateObject);
    }
    else if (isObject(templateObject)) {
      if (!templateObject.$component) {
        templateObject.$component = exports.new(templateObject, parentNode);
        thisArg.$components.push(templateObject.$component);
      }
    }
    else if (isArray(templateObject)) {
      templateObject.forEach(function (obj) {
        template(obj, config, thisArg, parentNode, true);
      });
    }
    else if (isDefined(templateObject)) {
      fail(returnFlag ?
        'Unrecognized return value from template' :
        'Unrecognized template!', {
          template: templateObject,
          config: config
        });
    }
  }

  function assignClassToMethods(methods, cls) {
    Object.keys(methods).forEach(function (name) {
      if (isFunction(methods[name])) methods[name].__class__ = cls;
    });
  }

  function buildDef(config, bases) {
    assertPropertyValidator(config.__name__, '__name__', isDefined);

    var compiled = extend({}, config);
    var init = config.__init__ ? [config.__init__] : [];
    var after = config.__after__ ? [config.__after__] : [];
    var $defaults = config.$defaults || {};
    var $setters = config.$setters || {};
    var $events = config.$events || {};

    assignClassToMethods($setters, config.__name__);
    assignClassToMethods(config, config.__name__);

    var baseNames = bases.reduce(function (names, base, index) {
      assertPropertyValidator(base, config.__name__ + ' base[' + index + ']', isDefined);

      if (base.__name__) {
        names.push(base.__name__);
      } else if (isFunction(base)) {
        names.push(base.prototype.__name__);
        return names.concat(base.prototype.__baseNames__);
      }
      return names;
    }, []);

    bases.forEach(function (base) {
      if (isFunction(base)) {
        base = base.prototype;
      }
      if (base.__check__) {
        base.__check__(baseNames);
      }
      if (base.__init__) {
        init.push(base.__init__);
      }
      if (base.__after__) {
        after.push(base.__after__);
      }
      if (base.$defaults) {
        defaults($defaults, base.$defaults);
      }
      if (base.$events) {
        defaults($events, base.$events);
      }
      if (base.$setters) {
        defaults($setters, base.$setters);
      }
      defaults(compiled, base);
    });

    // Override special properties that are carried through the inheritance structure.
    compiled.__init__ = function () {
      // Initialize ancestor bases first.
      for (var k = init.length - 1; k >= 0; k--) {
        init[k].apply(this, arguments);
      }
    };
    compiled.__after__ = function () {
      // Initialize ancestor bases first.
      for (var h = after.length - 1; h >= 0; h--)
        after[h].apply(this, arguments);
    };
    compiled.__name__ = config.__name__;
    compiled.__baseNames__ = baseNames;
    compiled.__bases__ = bases;
    compiled.$defaults = $defaults;
    compiled.$events = $events;
    compiled.$setters = $setters;

    function Component(config, callback) {
      var self = this;
      defaults(config, self.$defaults);
      extend(self, config);
      self.template = config.template || self.template;
      if (self.__init__) self.__init__(config);
      if (callback) callback(self.el);
      if (self.__after__) self.__after__(config);
      if (self.dispatch) self.dispatch("onInitialized");
    }
    Component.prototype = compiled;

    return Component;
  }

  function noop() {}

  function echo(input) {
    return function () {
      return input;
    }
  }

  function bind(func, object) {
    return function () {
      return func.apply(object, arguments);
    };
  }

  function delay(func, obj, params, delay) {
    return window.setTimeout(function () {
      func.apply(obj, params);
    }, delay || 1);
  }

  function returnTrue() {
    return true;
  }

  function uid(name) {
    name = name || 0;
    $counters[name] = ($counters[name] || 0) + 1;
    return name + $counters[name];
  }

  function getConfig(obj) {
    return obj.config;
  }

  function addListener(element, event, handler, thisArg, opts) {
    assertPropertyValidator(element, 'element', isDefined);
    assertPropertyValidator(handler, 'handler', isDefined);

    var id = uid();

    if (thisArg)
      handler = bind(handler, thisArg);

    $listeners[id] = [element, event, handler];	//store event info, for detaching

    // Not officially supporting, or going out of the way to support IE10-
    element.addEventListener(event, handler, opts);

    return id;
  }

  function removeListener(id) {
    if (!id) return;
    var e = $listeners[id];
    if (e) {
      e[0].removeEventListener(e[1], e[2]);
      delete $listeners[id];
    }
  }

  exports.Dispatcher = {
    __name__: "Dispatcher",
    __init__: function (config) {
      this._listenersByEvent = {};
      this._listeners = {};

      var listeners = config.on;
      if (listeners) forInLoop(this.addListener, listeners, this);
    },
    dispatch: function (type, params) {
      /**
       * Dispatches an event to the element. This is the way user-interaction is handled.
       * @param type Name of the event.
       * @param params Array of the parameters to pass to the handler. Typically, this follows the order of the component configuration, the HTML element, and the event.
       * @example dispatch('onClick', [config, element, event])
       */
      var self = this;
      var handlers = self._listenersByEvent[type];
      if (handlers) {
        return Promise.all(handlers.map(function (cb) {
          return cb.apply(self, params);
        }));
      }
    },
    addListener: function (type, func, id) {
      /**
       * Adds an event handler to the component.
       * @param type The type of event.
       * @param func The handling function.
       * @param id An optional event id that can be used to remove the listener.
       * @returns {number} The event id, automatically generated if id is not set.
       * @example addListener('onClick', function(config, element, event) {})
       */
      assertPropertyValidator(func, "listener for " + type, isFunction);

      id = id || uid();

      var handlers = this._listenersByEvent[type] || [];
      handlers.push(func);
      this._listenersByEvent[type] = handlers;
      this._listeners[id] = {_func: func, _name: type};

      return id;
    },
    removeListener: function (id) {
      /**
       * Removes a listener based on the event id.
       * @param id Listener id from adding the listener.
       * @example removeListener(listenerId)
       * @returns {boolean}
       */
      if (!this._listeners[id]) return;

      var name = this._listeners[id]._name;
      var func = this._listeners[id]._func;

      var handlers = this._listenersByEvent[name];

      handlers.remove(func);

      delete this._listeners[id];
    },
    hasListener: function (id) {
      /**
       * Checks if an particular event listener exists.
       * @param id Listener id from adding the listener.
       * @example hasListener(listenerId)
       * @returns {boolean}
       */
      return !!this._listeners[id];
    },
    hasListenersForEvent: function (type) {
      /**
       * Checks if there are any listeners to a particular event.
       * @param type Type of event.
       * @example hasListenersForEvent('onInitialized')
       * @returns {boolean}
       */
      var handlers = this._listenersByEvent[type];
      return handlers && handlers.length;
    }
  };

  assignClassToMethods(exports.Dispatcher, exports.Dispatcher.__name__);


  exports.Responder = {
    __name__: "Responder",
    __check__: function (bases) {
      assertBasesCheck('Dispatcher', 'Responder', bases);
    },
    $events: {},
    __after__: function (config) {
      var $this = this;
      var keyTest = /^key/;
      var on = config.on || {};
      $this.$listeners  = [];
      forIn(function (eventName, listenerConfig) {
        if (!listenerConfig.lazy || on[listenerConfig.dispatch]) {
          $this.$listeners.push(
            addListener($this.responder(), eventName, function (e) {
              var retVal;
              var config = getConfig($this);
              if (keyTest.test(e.type)) polyfillKeyboardEvent(e);
              if (isFunction(listenerConfig.callback)) {
                retVal = listenerConfig.callback.call($this, config, $this.el, e);
              }
              if (!listenerConfig.defaultEvent) preventEvent(e);
              $this.dispatch(listenerConfig.dispatch, [config, $this.el, e]);
              return retVal;
            }, listenerConfig.passive && PASSIVE_EVENT)
          );
        }
      }, defaults(config.$events || {}, $this.$events));
    },
    responder: function () {
      /**
       * The responder to events.
       * This element will get bound to events such as blur/focus/change etc.
       * @returns {Element}
       */
      return this.el;
    }
  };

  assignClassToMethods(exports.Responder, exports.Responder.__name__);


  exports.selectors = {
    property: function (name) {
      var nested = name.split(".");
      return function (obj) {
        var result = obj;
        for (var i = 0; i < nested.length; i++)
          result = result[nested[i]]
        return result;
      }
    }
  };


  exports.classOptions = {
    flex: {
      true: "sp-flex",
      false: "",
      inline: "sp-flex-inline"
    },
    selectable: {
      true: "",
      false: "unselectable"
    },
    wrap: prefixClassOptions({
      break: "",
      nowrap: "",
      truncate: "",
      "": ""
    }, 'sp-text-', true),
    padding: prefixClassOptions({
      "": "",
      none: "remove",
      x: "x",
      y: "y",
      "x-mi": "mini-x",
      "y-mi": "mini-y",
      "x-sm": "small-x",
      "y-sm": "small-y",
      "x-lg": "large-x",
      "y-lg": "large-y",
      mini: "mini",
      small: "small",
      medium: "sp-padding",
      true: "sp-padding",
      large: "large",
    }, 'sp-padding-', false, ["true", "medium"]),
    flexSize: prefixClassOptions({
      "": "",
      none: "none",
      auto: "auto",
      flex: "1"
    }, 'sp-flex-item-'),
    flexAlign: prefixClassOptions({
      center: "",
      right: "",
      top: "",
      middle: "",
      bottom: "",
      "": ""
    }, 'sp-flex-', true),
    flexLayout: prefixClassOptions({
      "": "",
      column: "",
      row: "",
      "row-reverse": "",
      "column-reverse": "",
      "column-large": "",
      "column-small": "",
      "column-reverse-large": "",
      "column-reverse-small": "",
      "row-reverse-large": "",
      "row-reverse-small": ""
    }, 'sp-flex-', true),
    flexSpace: prefixClassOptions({
      between: "",
      around: ""
    }, 'sp-flex-space-', true),
    flexWrap: prefixClassOptions({
      top: "",
      middle: "",
      bottom: "",
      reverse: "",
      "space-between": "",
      "space-around": "",
      wrap: "sp-flex-wrap",
      nowrap: "sp-flex-nowrap",
      "": ""
    }, 'sp-flex-wrap-', true, ["nowrap", "wrap"]),
    flexOrder: prefixClassOptions({
      first: "",
      last: "",
      "first-small": "",
      "last-small": "",
      "first-medium": "",
      "last-medium": "",
      "first-large": "",
      "last-large": "",
      "first-xlarge": "",
      "last-xlarge": "",
      "": ""
    }, 'sp-flex-order-', true),
    card: prefixClassOptions({
      true: "sp-card",
      teaser: "",
      header: "",
      body: "",
      shadow: "",
      "body-blank": "",
      divider: "",
      "": ""
    }, 'sp-card-', true, ["true"]),
    cardStyle: prefixClassOptions({
      primary: "",
      success: "",
      danger: "",
      muted: "",
      warning: "",
      "": ""
    }, 'sp-card-', true),
    badge: prefixClassOptions({
      true: "sp-badge",
      success: ["badge", "badge-success"],
      warning: ["badge", "badge-warning"],
      danger: ["badge", "badge-danger"],
      primary: ["badge", "badge-primary"],
      "": ""
    }, 'sp-', true, ['true']),
    display: prefixClassOptions({
      block: "",
      inline: "",
      "inline-block": "",
      "": ""
    }, 'sp-display-', true),
    position: prefixClassOptions({
      "top": "",
      "top-left": "",
      "top-right": "",
      "bottom": "",
      "bottom-right": "",
      "bottom-left": "",
      "cover": "",
      "relative": "",
      "absolute": "",
      "z-index": "",
      "": ""
    }, 'sp-position-', true),
    fill: prefixClassOptions({
      height: "height-100",
      width: "width-100",
      screen: "screen-100",
      "": ""
    }, 'sp-'),
    float: prefixClassOptions({
      left: "",
      right: "",
      clearfix: "sp-clearfix",
      "": ""
    }, 'sp-float-', true, ['clearfix']),
    scroll: prefixClassOptions({
      xy: "container",
      y: "ycontainer",
      x: "xcontainer",
      text: "sp-scrollable-text",
      hidden: "",
      "": ""
    }, 'sp-overflow-', false, ['text']),
    hidden: {
      true: HIDDEN_CLASS,
      false: "",
      hover: "sp-hidden-hover"
    },
    margin: prefixClassOptions({
      "": "",
      "x": "x",
      "x-mi": "mini-x",
      "x-sm": "small-x",
      "x-lg": "large-x",
      "y": "y",
      "y-mi": "mini-y",
      "y-sm": "small-y",
      "y-lg": "large-y",
      "top": "top",
      "top-lg": "large-top",
      "top-sm": "small-top",
      "top-mi": "mini-top",
      "bottom": "bottom",
      "bottom-lg": "large-bottom",
      "bottom-sm": "small-bottom",
      "bottom-mi": "mini-bottom",
      "left": "left",
      "left-lg": "large-left",
      "left-sm": "small-left",
      "left-mi": "mini-left",
      "right": "right",
      "right-lg": "large-right",
      "right-sm": "small-right",
      "right-mi": "mini-right"
    }, 'sp-margin-'),
    screen: prefixClassOptions({
      "small": "visible-small",
      "medium": "visible-medium",
      "large": "visible-large",
      "except-small": "hidden-small",
      "except-medium": "hidden-medium",
      "except-large": "hidden-large",
      "": ""
    }, 'sp-'),
    device: prefixClassOptions({
      touch: "notouch",
      notouch: "touch",
      "": ""
    }, 'sp-hidden-'),
    text: prefixClassOptions({
      small: "",
      large: "",
      bold: "",
      capitalize: "",
      lowercase: "",
      uppercase: "",
      "": ""
    }, 'sp-text-', true),
    textColor: prefixClassOptions({
      muted: "",
      primary: "",
      success: "",
      warning: "",
      danger: "",
      contrast: "",
      "": ""
    }, 'sp-text-', true),
    textAlign: prefixClassOptions({
      middle: "",
      top: "",
      bottom: "",
      left: "",
      "left-small": "",
      right: "",
      "right-small": "",
      center: "",
      "center-small": "",
      justify: "",
      "": ""
    }, 'sp-text-', true),
    animation: prefixClassOptions({
      fade: "",
      "scale-up": "",
      "scale-down": "",
      "slide-top": "",
      "slide-bottom": "",
      "slide-left": "",
      "slide-right": "",
      shake: "",
      scale: "",
      reverse: "",
      "15": "",
      "top-left": "",
      "top-center": "",
      "top-right": "",
      "middle-left": "",
      "middle-right": "",
      "bottom-left": "",
      "bottom-center": "",
      "bottom-right": "",
      hover: "",
      "": ""
    }, 'sp-animation-', true)
  };

  function createElement(name, attributes, html) {
    attributes = attributes || {};

    var element = name.toLowerCase() == "svg" ?
      document.createElementNS("http://www.w3.org/2000/svg", "svg") :
      document.createElement(name);

    setAttributes(element, attributes);

    if (attributes.style)
      element.style.cssText = attributes.style;
    if (attributes.class)
      element.className = attributes["class"];
    if (html)
      element.innerHTML = html;
    return element;
  }

  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function setAttributes(element, attributes) {
    forInLoop(element.setAttribute, attributes, element);
  }

  function preventEvent(e) {
    if (e.cancelable) {
      if (e.preventDefault) e.preventDefault();
      e.defaultPrevented = true;
      e.cancelBubble = true;
    }
  }

  function stopPropagation(e) {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  function addClass(node, name) {
    classString(name).split(' ').forEach(function (cls) {
      if (cls && node && node.classList) node.classList.add(cls);
    });
  }

  function hasClass(node, name) {
    return node && node.classList.contains(name);
  }

  function removeClass(node, name) {
    if (name && name.length > 0 && node && node.classList)
      node.classList.remove(name);
  }

  exports.ready = function (fn) {
    if (exports.$ready) fn.call();
    else $windowListeners.load.push(fn);
  };

  function buildWindowListener(listeners) {
    assertPropertyValidator(listeners, 'listeners', isArray);
    function executeAllListeners(e) {
      listeners.forEach(function (listener) {
        listener.call(window, e);
      });
    }
    return executeAllListeners;
  }

  $globalListenerIds.mousedown = addListener(window, "mousedown", buildWindowListener($windowListeners.mousedown));
  $globalListenerIds.mouseup = addListener(window, "mouseup", buildWindowListener($windowListeners.mouseup));
  $globalListenerIds.mousemove = addListener(window, "mousemove", buildWindowListener($windowListeners.mousemove));
  $globalListenerIds.resize = addListener(window, "resize", buildWindowListener($windowListeners.resize));

  if (document.readyState == "complete") {
    windowOnLoad();
  } else {
    $globalListenerIds.load = addListener(window, "load", buildWindowListener($windowListeners.load));
  }

  if (exports.support.touch) {
    $globalListenerIds.touchstart = addListener(window, "touchstart", buildWindowListener($windowListeners.touchstart), window, PASSIVE_EVENT);
    $globalListenerIds.touchend = addListener(window, "touchend", buildWindowListener($windowListeners.touchend));
    $globalListenerIds.touchmove = addListener(window, "touchmove", buildWindowListener($windowListeners.touchmove));
  }

  function windowOnMouseUp(e) {
    var dragged = exports.$dragged;
    if (dragged) {
      var nodeStyle = dragged.node.style;
      var display = nodeStyle.display;

      nodeStyle.display = 'none';

      var src = e.changedTouches ? e.changedTouches[0] : e;
      var dropTarget = findDroppableParent(document.elementFromPoint(src.clientX, src.clientY));
      if (dropTarget && dropTarget.master.config.droppable(dropTarget.config, dragged.config, dragged.node)) {
        // Must be before dragEnd to prevent position of elements shifting in tree
        // Shifted position will shift the drop target
        dropTarget.master.dispatch("onItemDrop", [dropTarget.config, dragged.config, dropTarget, e]);
      }

      dragged.target.dispatch("onItemDragEnd", [dragged.config, dragged.node, e]);

      removeClass(dragged.node, 'sp-active-drag');

      nodeStyle.top = dragged.originalPos.top;
      nodeStyle.left = dragged.originalPos.left;
      nodeStyle.display = display;
      exports.$dragged = null;
    }
    exports._selectedForDrag = null;
    exports.$scrollState = null;
  }

  function windowResizerOnMouseUp(e) {
    var resizer = exports.$activeResizer;
    if (resizer) {
      if (resizer.dragging) {
        addClass(resizer.dragHandle, 'sp-hidden');
        addClass(resizer.dragBackdrop, 'sp-hidden');
        resizer.dragging = false;
        resizer.dispatch("onHandleResized", [resizer.updateDragHandlePosition(e), resizer.el, e]);
      }
      exports.$activeResizer = null;
    }
  }

  function windowOnMouseDown() {
    exports.$scrollState = 'start';
  }

  function windowOnMouseMove(e) {
    var selectedForDrag = exports._selectedForDrag;
    var src = e.touches ? e.touches[0] : e;
    var dragged = exports.$dragged;

    if (selectedForDrag) {
      preventEvent(e);

      if (Math.abs(src.clientX - selectedForDrag.pos.x) > exports.$dragThreshold ||
        Math.abs(src.clientY - selectedForDrag.pos.y) > exports.$dragThreshold) {
        // Begin drag event
        exports.$dragged = selectedForDrag;
        exports._selectedForDrag = null;
        addClass(selectedForDrag.node, 'sp-active-drag');

        // Fire drag listener event
        selectedForDrag.target.dispatch("onItemDragStart",
          [selectedForDrag.config, selectedForDrag.node, selectedForDrag.event]);
      }
    }
    else if (dragged) {
      preventEvent(e);

      dragged.node.style.top = (src.clientY + dragged.mouseOffset.top) + 'px';
      dragged.node.style.left = (src.clientX + dragged.mouseOffset.left) + 'px';

      var dropTarget = findDroppableParent(document.elementFromPoint(src.clientX, src.clientY));

      if (dropTarget && dropTarget.master.config.droppable(dropTarget.config, dragged.config, dragged.node)) {
        var oldDropTarget = exports._dropTarget;

        if (oldDropTarget != dropTarget) {
          if (oldDropTarget) {
            oldDropTarget.master.dispatch('onItemDragLeave', [oldDropTarget.config, oldDropTarget, e]);
          }
          dropTarget.master.dispatch('onItemDragEnter', [dropTarget.config, dropTarget, e]);
          exports._dropTarget = dropTarget;
        }
        else if (oldDropTarget) {
          oldDropTarget.master.dispatch('onItemDragOver', [oldDropTarget.config, oldDropTarget, e]);
        }
      }
    }
  }

  function windowOnLoad() {
    exports.$ready = true;
    setAttributes(document.body, {"data-sp-observe": ""});
  }

  function findDroppableParent(node) {
    // Exit after 100 tries, otherwise assume circular reference
    for (var i = 0; i < 100; i++) {
      if (!node)
        break;
      else if (node.config && node.master && node.$droppable)
        return node;
      else
        node = node.parentNode;
    }
  }


  exports.PropertySetter = {
    __name__: "PropertySetter",
    __check__: function (bases) {
      assertBasesCheck('PropertySetter', this.__name__, bases, true);
    },
    __init__: function (config) {
      this.config = config;
    },
    __after__: function (config) {
      if (this.$setters) {
        var names = Object.keys(config);
        for (var name, i = 0; i < names.length; i++) {
          name = names[i];
          this.set(name, config[name]);
        }
      }
    },
    set: function (name, value) {
      /**
       * Sets a property of the component and invokes its setter function.
       * @param name Name of the property.
       * @param value Value of the property.
       * @example set('type', 'primary')
       */
      var $setters = this.$setters;
      if ($setters.hasOwnProperty(name)) {
        assertPropertyValidator($setters[name], 'Property setter for ' + name, isFunction);
        $setters[name].call(this, value);
      }
      this.config[name] = value;
    }
  };

  assignClassToMethods(exports.PropertySetter, exports.PropertySetter.__name__);


  exports.AbsolutePositionMethods = {
    __name__: "AbsolutePositionMethods",
    positionNextTo: function (node, position, marginX, marginY) {
      /**
       * Positions this element next to another element.
       * @param node The anchor element to position next to.
       * @param position Can be 1 of the following values: bottom-right, bottom-left, bottom-center, top-right, top-left, top-center, left-top, left-bottom, left-center, right-top, right-bottom, right-center.
       * @param marginX The amount of x-offset from the anchor element edge.
       * @param marginY The amount of y-offset from the anchor element edge.
       */
      var parent = this.el.parentNode ? this.el.parentNode : document.body;
      var parentPos = parent.getBoundingClientRect(); // Affected by scrolling
      var origin = node.getBoundingClientRect();
      var rect = this.getBoundingClientRect();
      var width = rect.width,
        height = rect.height;

      marginX = marginX || 0;
      marginY = marginY || 0;

      var variants = {
        "bottom-left": pos(origin.height + marginY, marginX),
        "bottom-right": pos(origin.height + marginY, origin.width - width + marginX),
        "bottom-center": pos(origin.height + marginY, origin.width / 2 - width / 2 + marginX),
        "top-left": pos(-marginY - height, marginX),
        "top-right": pos(-marginY - height, origin.width - width + marginX),
        "top-center": pos(-marginY - height, origin.width / 2 - width / 2 + marginX),
        "left-top": pos(marginY, -marginX - width),
        "left-bottom": pos(origin.height - height, -marginX - width),
        "left-center": pos(origin.height / 2 - height / 2, -marginX - width),
        "right-top": pos(marginY, origin.width + marginX),
        "right-bottom": pos(origin.height - height, origin.width + marginX),
        "right-center": pos(origin.height / 2 - height / 2, origin.width + marginX)
      };

      assert(!!variants[position], 'position: "' + position + '" not recognized.', this.el);

      this.position(
        origin.top - parentPos.top + variants[position].top,
        origin.left + variants[position].left - parentPos.left);

      function pos(top, left) {
        return {top: top, left: left};
      }
    },
    getBoundingClientRect: function () {
      /**
       * Gets the bounding rectangle of the element. Needs to be added first since this delegates the call to element.getBoundingClientRect.
       * @returns {any | ClientRect}
       */
      return this.el.getBoundingClientRect();
    },
    position: function (top, left) {
      /**
       * Sets the position of the element.
       * @param top Top position in pixels.
       * @param left Left position in pixels.
       * @example position(10, 10)
       */
      var style = this.el.style;
      style.top = (top || 0) + "px";
      style.left = (left || 0) + "px";
      style.position = "absolute";
    },

    moveWithinBoundary: function (boundary, pivot, padding, offset) {
      /**
       * Moves the element to be within the specified boundary.
       * @param boundary The bounding box to move the element inside of.
       * @param pivot Use this to override the final boundary edges values.
       * @param padding The amount of padding to the edges of the boundary.
       * @param offset The amount of final offset added to the position depending on which edges are hidden.
       * @example moveWithinBoundary({top: 0, bottom: 500, left: 0, right: 1000}, {top: 100, bottom: 100}, {top: 10, left: 10}, {top: 10, left: 20, right: 30, bottom: 40})
       */
      var parent = this.el.parentNode ? this.el.parentNode : document.body;
      var parentPos = parent.getBoundingClientRect(); // Affected by scrolling

      padding = padding || {};
      pivot = pivot || {};
      boundary = boundary || {};
      offset = offset || {};

      var paddingTop = padding.top || 0;
      var paddingRight = padding.right || 0;
      var paddingBottom = padding.bottom || 0;
      var paddingLeft = padding.left || 0;

      var boundaryTop = boundary.top || 0;
      var boundaryBottom = boundary.bottom || window.innerHeight;
      var boundaryLeft = boundary.left || 0;
      var boundaryRight = boundary.right || window.innerWidth;

      var pivotLeft = pivot.left || boundaryLeft + paddingLeft;
      var pivotRight = pivot.right || boundaryRight - paddingRight;
      var pivotTop = pivot.top || boundaryTop + paddingTop;
      var pivotBottom = pivot.bottom || boundaryBottom - paddingBottom;

      var rect = this.getBoundingClientRect();
      var htmlStyle = this.el.style;

      rect.left = htmlStyle.left || rect.left;
      rect.top = htmlStyle.top || rect.top;

      var hiddenLeft = rect.left < boundaryLeft + paddingLeft;
      var hiddenRight = rect.left + rect.width > boundaryRight - paddingRight;
      var hiddenTop = rect.top < boundaryTop + paddingTop;
      var hiddenBottom = rect.top + rect.height > boundaryBottom - paddingBottom;

      var offsetTop = offset.top || 0;
      var offsetBottom = offset.bottom || 0;
      var offsetLeft = offset.left || 0;
      var offsetRight = offset.right || 0;

      if (hiddenLeft) {
        htmlStyle.left = (pivotLeft + offsetLeft - parentPos.left) + "px";
      }
      else if (hiddenRight) {
        htmlStyle.left = (pivotRight - rect.width + offsetRight - parentPos.left) + "px";
      }

      if (hiddenTop) {
        htmlStyle.top = (pivotTop + offsetTop - parentPos.top) + "px";
      }
      else if (hiddenBottom) {
        htmlStyle.top = (pivotBottom - rect.height + offsetBottom - parentPos.top) + "px";
      }
    }
  };

  assignClassToMethods(exports.AbsolutePositionMethods, exports.AbsolutePositionMethods.__name__);


  exports.new = function (config, callback) {
    assertPropertyValidator(config, 'config', isObject);

    if (callback && !isFunction(callback)) callback = callback.appendChild.bind(callback);
    return makeView(config, callback);

    function makeView(config, callback) {
      var view;
      if (config.view) view = config.view;
      else if (config.cells) view = 'flexgrid';
      else view = 'element';
      assertPropertyValidator($definitions[view], 'definition ' + view, isDefined);
      return new $definitions[view](config, callback);
    }
  };

  function $$(id) {
    if (!id)
      return null;
    else if ($components[id])
      return $components[id];
  }

  function forInLoop(func, obj, thisArg) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (func.call(thisArg, i, obj[i]) === false) {
          break;
        }
      }
    }
  }

  function forIn(func, obj, thisArg) {
    var result = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = func.call(thisArg, key, obj[key]);
      }
    }
    return result;
  }

  function forEachUntil(predicate, array, thisArg) {
    var copy = array.slice();
    var value, i = 0;
    while (copy.length) {
      value = copy.shift();
      if (!predicate.call(thisArg, value, copy)) {
        copy.push(value);
        i++;
      }
      else {
        i = 0;
      }
      if (copy.length == 0) {
        break;
      }
      else if (i > copy.length) {
        fail("Infinite loop detected.");
        break;  // Infinite loop detected.
      }
    }
  }

  function removeFromArray(array, value) {
    var index = array.indexOf(value);
    if (index !== -1) array.splice(index, 1);
  }

  function prefixClassOptions(obj, prefix, mirrorKey, exclude) {
    prefix = prefix || '';

    return forIn(function (key, value) {
      if (isArray(exclude) && exclude.indexOf(key) != -1) {
        return value;
      }
      else if (isArray(value)) {
        return value.map(function (string) {
          return !string.length ? string : prefix + string;
        });
      }
      else {
        value = mirrorKey ? key : value;
        return !value.length ? value : prefix + value;
      }
    }, obj);
  }

  function classSetters(classOptions, elementPropetyName) {
    return forIn(function (property, options) {
      var setter = function (value) {
        var self = this;
        var oldValue = self.config[property];
        var el = self[elementPropetyName || 'el'];
        if (options[oldValue])
          removeClass(el, options[oldValue]);

        var values = classString(value).split(" ");

        for (var v, i = 0; i < values.length; i++) {
          v = values[i];

          assertPropertyValidator(options[v],
            'value "' + v + '" for property "' + property + '"', isDefined,
            'Value must be one of "' + Object.keys(options).join('", "') + '".'
          );

          var classes = options[v];

          if (isArray(classes))
            for (var c = 0; c < classes.length; c++)
              addClass(el, classes[c]);
          else
            addClass(el, classes);
        }
      };
      setter.options = options;
      return setter;
    }, classOptions);
  }


  exports.CommonStyles = {
    __name__: "CommonStyles",
    __check__: function (bases) {
      assertBasesCheck('CommonStyles', 'CommonStyles', bases);
      assertBasesCheck('PropertySetter', 'CommonStyles', bases);
    },
    $setters: classSetters(exports.classOptions)
  };

  assignClassToMethods(exports.CommonStyles.$setters, exports.CommonStyles.__name__);


  exports.CommonEvents = {
    __name__: "CommonEvents",
    __check__: function (bases) {
      assertBasesCheck('Responder', 'CommonEvents', bases);
    },
    $events: {
      focus: {lazy: true, dispatch: "onFocus", defaultEvent: true},
      blur: {lazy: true, dispatch: "onBlur", defaultEvent: true}
    },
    __after__: function (config) {
      var $this = this;
      if (config.on) {
        if (config.on.onResize) {
          $windowListeners.resize.push(function (e) {
            $this.dispatch("onResize", [e]);
          });
        }
        if (config.on.onDebounceResize) {
          $windowListeners.resize.push(UIkit.Utils.debounce(function (e) {
            $this.dispatch("onDebounceResize", [e]);
          }, 1000));
        }
      }
    }
  };


  $definitions.element = def({
    __name__: "element",
    $defaults: {
      dropdownEvent: "onClick",
      dropdownOptions: {
        pos: "bottom-center",
        marginX: 0,
        marginY: 8,
        lazy: false
      },
      tooltipOptions: {
        pos: "top-center",
        marginX: 0,
        marginY: 5,
        closeDelay: 0
      },
      tooltipDismissEvent: 'onMouseLeave',
      tooltipEvent: 'onMouseEnter'
    },
    $setters: {
      attributes: function (value) {
        setAttributes(this.el, value)
      },
      disabled: function (value) {
        if (value)
          this.disable();
        else
          this.enable();
      },
      cls: function (value) {
        addClass(this.el, classString(value));
      },
      title: function (value) {
        setAttributes(this.el, {
          "title": value
        });
      },
      tooltip: function (value) {
        if (!value) return;

        var self = this;
        var config = self.config;
        var tooltipOptions = config.tooltipOptions;
        var tooltip = extend({
          view: "tooltip",
          label: value
        }, tooltipOptions);

        var ui = self.tooltipPopup = exports.new(tooltip, document.body);

        config.on = config.on || {};
        self.addListener(config.tooltipEvent, function (config, node) {
          var relativeNode = $$(tooltipOptions.relativeTo);
          relativeNode = relativeNode ? relativeNode.el : node;
          var bb = {left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight};
          ui.open(config, tooltipOptions.closeDelay);
          ui.positionNextTo(relativeNode, tooltipOptions.pos, tooltipOptions.marginX, tooltipOptions.marginY);
          ui.moveWithinBoundary(bb);
        });

        self.addListener(config.tooltipDismissEvent, function () {
          ui.close(config);
        });
      },
      dropdown: function (value) {
        var self = this;
        var config = self.config;
        var dropdownOptions = config.dropdownOptions;
        var dropdown = extend({
          view: "dropdown",
          dropdown: value
        }, dropdownOptions);

        if (!dropdown.lazy) {
          self.dropdownPopup = exports.new(dropdown, document.body);
        }

        config.on = config.on || {};
        self.addListener(config.dropdownEvent, function (config, node) {
          var relativeNode = $$(dropdown.relativeTo);
          relativeNode = relativeNode ? relativeNode.el : node;
          var bb = {left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight};
          if (!self.dropdownPopup) {
            self.dropdownPopup = exports.new(dropdown, document.body);
          }
          var popup = self.dropdownPopup
          popup.open(config);
          popup.positionNextTo(relativeNode, dropdown.pos, dropdown.marginX, dropdown.marginY);
          popup.moveWithinBoundary(bb);
        });
      },
      uploader: function (value) {
        if (value) {
          // Must allow default events to open uploader
          var $this = this;
          addClass($this.el, "sp-form-file");
          var uploader = $this._uploader = createElement('INPUT', {type: 'file', multiple: value == 'multiple' ? value : null});
          uploader.onchange = function (e) {
            $this.dispatch('onFileChange', [getConfig($this), this, e])
          };
          $this.el.appendChild(uploader);
        }
      }
    },
    __init__: function (config) {
      var self = this;
      if (!config.id) config.id = uid(self.__name__);
      var element = document.getElementById(config.id);

      assertPropertyValidator(element, 'node ' + config.id + ' exist check', isFalsy);

      $components[config.id] = self;

      self.$components = [];
      self.element = self.el = createElement(config.htmlTag || "DIV", {id: config.id});

      if (isString(config.tagClass))
        setAttributes(self.el, {class: config.tagClass});

      if (config.style)
        extend(self.el.style, config.style);

      self.render();

      var on = config.on = config.on || {};
      if (config.tooltip) {
        var tooltipEvent = config.tooltipEvent;
        var tooltipDismissEvent = config.tooltipDismissEvent;
        if (tooltipEvent && !on[tooltipEvent]) {
          on[tooltipEvent] = noop;
        }
        if (tooltipDismissEvent && !on[tooltipDismissEvent]) {
          on[tooltipDismissEvent] = noop;
        }
      }
      if (config.dropdown) {
        var dropdownEvent = config.dropdownEvent;
        if (dropdownEvent && !on[dropdownEvent]) {
          on[dropdownEvent] = noop;
        }
      }
    },
    dispose: function () {
      var self = this;
      self.dispatch("onDispose");
      self.$components.forEach(function (component) {
        component.dispose();
      });
      delete $components[getConfig(self).id];
      self.$listeners.forEach(removeListener);
    },
    render: function () {
      /**
       * Force a re-render of the element, which runs the template function.
       */
      var self = this;
      template(self.template, self.config, self, self.el);
    },
    template: function () {
      /**
       * The template function of the final HTML.
       * @param config The configuration JSON.
       * @param component The created component object with functions.
       * @param parent The parent HTML element.
       * @returns {string}
       */
      return ""
    },
    isVisible: function () {
      /**
       * Checks if the element is hidden. (Not to be confused with conceal/reveal.)
       */
      return !hasClass(this.el, HIDDEN_CLASS);
    },
    show: function () {
      /**
       * Shows the element.
       */
      removeClass(this.el, HIDDEN_CLASS);
    },
    hide: function () {
      /**
       * Hides the element.
       */
      addClass(this.el, HIDDEN_CLASS);
    },
    conceal: function () {
      /**
       * Makes the element invisible, which doesn't affect the layout.
       */
      addClass(this.el, "sp-invisible");
    },
    reveal: function () {
      /**
       * Makes the element visible again.
       */
      removeClass(this.el, "sp-invisible");
    },
    isEnabled: function () {
      /**
       * Checks if the element is enabled.
       * @returns {boolean}
       */
      return !this.el.hasAttribute('disabled');
    },
    disable: function () {
      /**
       * Disables the element.
       */
      setAttributes(this.el, {disabled: "disabled"});
    },
    enable: function () {
      /**
       * Enables the element.
       */
      this.el.removeAttribute('disabled');
    },
    getComponent: function (key, value) {
      /**
       * Gets a child component from a key value match.
       * @param key The key to look up.
       * @param value The compared value.
       * @returns {Component}
       */
      return this.$components.filter(function (item) {
        return item[key] === value;
      })[0];
    }
  }, exports.Dispatcher, exports.Responder, exports.CommonEvents, exports.CommonStyles, exports.PropertySetter);


  $definitions.flexgrid = def({
    __name__: "flexgrid",
    $defaults: {
      flex: true,
      flexLayout: "row",
      flexSize: "flex"
    },
    $setters: {
      cells: function (value) {
        assertPropertyValidator(value, 'cells', isArray);

        var self = this;

        for (var config, i = 0; i < value.length; i++) {
          config = value[i];
          // null is a special value that will be ignored (for prettier code)
          if (config !== null) self.addChild(config);
        }

        if (self.config.defaultBatch)
          self.showBatch(self.config.defaultBatch);
      }
    },
    render: function () {
      // Do nothing, overwrites render function.
    },
    each: function (func, thisArg) {
      /**
       * Invokes a function on each child of the flexgrid.
       * @param func The invoked function.
       * @param thisArg The 'this' object passed to the invoked function.
       * @returns Return an array containing the results of the invoked call.
       */
      return this.$components.map(func, thisArg);
    },
    insertChild: function (index, config) {
      /**
       * Inserts a child configuration object at a particular index.
       * @param index Index to insert at.
       * @param config The configuration object representing the new child.
       * @returns {Component} The child component
       */
      var self = this;
      var ui;

      if (config.el) {
        ui = config;
        appendChild(ui.el);
      } else {
        ui = exports.new(config, appendChild);
      }

      self.$components.splice(index, 0, ui);

      return ui;

      function appendChild(element) {
        if (index > 0)
          self.el.insertAfter(element, self.$components[index - 1].el);
        else if (index + 1 < self.$components.length)
          self.el.insertBefore(element, self.$components[index + 1].el);
        else
          self.el.appendChild(element)
      }
    },
    addChild: function (config) {
      /**
       * Adds a child to the end of the stack.
       * @param config Configuration of the new child.
       * @returns {Component} The child component
       */
      var self = this;
      var component = config.el ? config : exports.new(config);
      self.el.appendChild(component.el);
      self.$components.push(component);
      return component;
    },
    removeChild: function (id) {
      /**
       * Removes a child by its id.
       * @param id Id of the child to remove.
       */
      var self = this;
      var components = self.$components;
      var target;

      if (id.el) {
        target = id;
      } else if (isString(id)) {
        target = self.getChild(id);
      } else {
        fail("flexgrid: unknown argument id " + id + " received in removeChild().");
      }

      self.el.removeChild(target.el);
      removeFromArray(components, target);
    },
    getChild: function (id) {
      /**
       * Get a child of the flexgrid by id.
       * @param id The string id of the component.
       * @returns {Component}
       */
      return this.getComponent('id', id);
    },
    getChildren: function () {
      /**
       * Get a list of all children. Make a copy if mutating this object.
       * @returns {Component[]} Array of child components.
       */
      return this.$components;
    },
    getItems: function () {
      /**
       * Get a list of the children's JSON configuration objects. Do not need to make a copy if mutating.
       * @returns {any[]} Array of child components config objects.
       */
      return this.$components.map(function (item) {
        return item.config;
      });
    },
    activeChild: function () {
      /**
       * Returns the current active child.
       */
      return this._activeChild;
    },

    setChild: function (id) {
      /**
       * Makes a child visible, also makes it the active child.
       * @dispatch onChildChange
       * @param id The id of a child.
       */
      var self = this;
      self._setVisible('id', [id]);
      var newChild = self.getChild(id);
      self.dispatch("onChildChange", [self._activeChild, newChild]);
      self._activeChild = newChild;
    },
    getBatch: function () {
      /**
       * Get the 'batch' value that was passed to `showBatch`.
       */
      return this.$batch;
    },
    showBatch: function (name) {
      /**
       * Checks the batch property of all children and makes all matching batch visible.
       * @param name An array or a string to identify batch(es). Matching is done using indexOf.
       */
      // Tricky: Rendering input fields will cause problems with on-screen keyboards.
      // However, to preserve the order of elements, will need to rerender.
      this._setVisible('batch', isArray(name) ? name : [name], true);
      this.$batch = name;
    },
    _setVisible: function (key, value, rerender) {
      var self = this;
      var el = self.el;
      self.$components.forEach(function (item) {
        if (value.indexOf(item.config[key]) != -1) {
          if (item.el.parentNode != el || rerender) {
            el.appendChild(item.el);
          }
        }
        else if (item.el.parentNode) {
          el.removeChild(item.el);
        }
      });
    }
  }, $definitions.element);


  exports.FormControl = {
    __name__: 'FormControl',
    $defaults: {
      formDangerClass: "sp-form-danger",
      formSuccessClass: "sp-form-success",
      helpDangerClass: "sp-text-danger",
      helpSuccessClass: "sp-text-success",
      helpTag: "P",
      helpTagClass: "sp-form-help-block",
      helpTagClassInline: "sp-form-help-inline"
    },
    $setters: extend(
      classSetters({
        size: prefixClassOptions({
          large: "",
          small: "",
          "": ""
        }, 'sp-form-', true)
      }),
      {
        formClass: function (value) {
          this.setFormClass(value);
        },
        help: function (value) {
          var self = this;
          if (self.help && self.help.parentNode) {
            self.help.parentNode.removeChild(self.help);
          }
          if (value) {
            self.help = createElement(this.helpTag, {class: (self.config.inline ?
              this.helpTagClassInline : this.helpTagClass)});
            self.help.innerHTML = value;
            self.getFormControl().parentNode.appendChild(self.help);
          }
        },
        type: function (value) {
          setAttributes(this.getFormControl(), {type: value});
        },
        value: function (value) {
          if (isDefined(value))
            this.setValue(value);
        }
      }
    ),
    responder: function () {
      /**
       * The responder to events. This element will get bound to events such as blur/focus/change etc.
       * @returns {Element}
       */
      return this.getFormControl();
    },
    getFormControl: function () {
      /**
       * Get the HTML element.
       * @returns {Element}
       */
      return this.el;
    },
    clearFormClass: function () {
      /**
       * Clear any of display class applied to the form control.
       */
      var formControl = this.getFormControl();
      removeClass(formControl, this.formDangerClass);
      removeClass(formControl, this.formSuccessClass);

      var helpControl = this.help;
      if (helpControl) {
        removeClass(helpControl, this.helpDangerClass);
        removeClass(helpControl, this.helpSuccessClass);
      }
    },
    setFormClass: function (value) {
      /**
       * Set the display class for the form control.
       * @param value One of <code>success</code>, <code>danger</code>
       */
      var formControl = this.getFormControl();
      var helpControl = this.help;

      this.clearFormClass();

      if (value == 'success') {
        addClass(formControl, this.formSuccessClass);
        if (helpControl) addClass(helpControl, this.helpSuccessClass);
      }
      else if (value == 'danger') {
        addClass(formControl, this.formDangerClass);
        if (helpControl) addClass(helpControl, this.helpDangerClass);
      }
    },
    raiseConcern: function (error) {
      /**
       * Set an error message to be displayed for the FormControl.
       * @param error Error string or null, null will clear the error.
       */
      var $this = this;
      if (error) {
        $this.set("help", error);
        $this.setFormClass("danger");
      }
      else {
        $this.set("help", "");
        $this.setFormClass("");
      }
      $this.invalid = !!error;
    },
    reset: function () {
      /**
       * Clear the form control.
       */
      this.getFormControl().value = "";
    },
    focus: function () {
      this.getFormControl().focus();
    },
    enable: function () {
      /**
       * Enable the form control.
       */
      this.getFormControl().removeAttribute('disabled');
    },
    disable: function () {
      /**
       * Disable the form control.
       */
      setAttributes(this.getFormControl(), {disabled: 'disabled'});
    },
    getValue: function () {
      /**
       * Get the value of the form control.
       * @returns {any}
       */
      return this.getFormControl().value;
    },
    setValue: function (value) {
      /**
       * Set the value of the form control.
       * @param value
       */
      this.getFormControl().value = value;
    }
  };

  assignClassToMethods(exports.FormControl.$setters, exports.FormControl.__name__);
  assignClassToMethods(exports.FormControl, exports.FormControl.__name__);


  exports.MouseEvents = {
    __name__: 'MouseEvents',
    $events: {
      click: {lazy: true, dispatch: "onClick", defaultEvent: true},
      contextmenu: {lazy: true, dispatch: "onContext"},
      mouseenter: {lazy: true, dispatch: "onMouseEnter"},
      mouseleave: {lazy: true, dispatch: "onMouseLeave"},
      mouseout: {lazy: true, dispatch: "onMouseOut"},
      mousedown: {lazy: true, dispatch: "onMouseDown"},
      mouseup: {lazy: true, dispatch: "onMouseUp", callback: function (config, el, e) {
        windowOnMouseUp(e);
      }}
    },
    $setters: {
      target: function (value) {
        setAttributes(this.el, {target: value});
      },
      href: function (value) {
        setAttributes(this.el, {href: value});
      }
    },
    __check__: function (bases) {
      assertBasesCheck('Responder', 'MouseEvents', bases);
    }
  };

  assignClassToMethods(exports.MouseEvents.$setters, exports.MouseEvents.__name__);


  $definitions.modal = def({
    __name__: "modal",
    $defaults: {
      tagClass: "sp-modal",
      light: false,
      closeButton: true,
      bgClose: true,
      keyboard: true,
      minScrollHeight: 150,
      closeModals: false,
      center: true,
      flex: false,
      flexSize: "",
      flexLayout: "",
      dialogClass: "",
      headerClass: "",
      footerClass: ""
    },
    __init__: function (config) {
      var self = this;
      self.header = createElement("DIV", {class: "sp-modal-header"});
      self.footer = createElement("DIV", {class: "sp-modal-footer"});
      self.body = createElement("DIV", {class: "sp-modal-dialog"});

      if (config.headerClass) addClass(self.header, config.headerClass);
      if (config.dialogClass) addClass(self.body, config.dialogClass);
      if (config.footerClass) addClass(self.footer, config.footerClass);

      self.el.appendChild(self.body);
      if (config.header) self.body.appendChild(self.header);
      if (config.footer) self.body.appendChild(self.footer);
    },
    $setters: extend(
      classSetters({
        dialogStyle: prefixClassOptions({
          lightbox: "",
          large: "",
          blank: "",
          scroll: "",
          full: "",
          "": ""
        }, 'sp-modal-dialog-', true)
      }, "body"),
      {
        bodyWidth: function (value) {
          value = isNumber(value) ? value + "px" : value;
          this.body.style.width = value;
        },
        bodyHeight: function (value) {
          value = isNumber(value) ? value + "px" : value;
          this.body.style.height = value;
        },
        closeButton: function (value) {
          if (value) {
            var self = this;
            var close = self.closeButton = createElement("A",
              {class: "sp-modal-close sp-close"});
            var body = self.body;

            if (body.firstChild) {
              body.insertBefore(close, body.firstChild);
            }
            else {
              body.appendChild(close);
            }
          }
        },
        body: function (value) {
          var self = this;
          self.bodyContent = exports.new(value, function (el) {
            if (self.footer.parentNode) {
              self.body.insertBefore(el, self.footer);
            } else {
              self.body.appendChild(el);
            }
          });
          self.$components.push(self.bodyContent);
        },
        header: function (value) {
          var self = this;
          self.headerContent = exports.new(value, self.header);
          self.$components.push(self.headerContent);
        },
        footer: function (value) {
          var self = this;
          self.footerContent = exports.new(value, self.footer);
          self.$components.push(self.footerContent);
        },
        caption: function (value) {
          var self = this;
          if (!self.caption)
            self.caption = createElement("DIV", {class: "sp-modal-caption"});
          self.caption.innerHTML = value;
          self.body.appendChild(self.caption);
        }
      }
    ),
    open: function (args) {
      /**
       * Opens the modal.
       * @dispatch onOpen, onOpened
       * @param args Parameter to pass into the dispatch handlers. (3rd argument of the callback.)
       */
      var self = this;
      var config = self.config;
      self.dispatch("onOpen", [config, self.el, args]);
      var modal = UIkit.modal('#' + config.id, {
        center: config.center,
        bgclose: config.bgClose,
        keyboard: config.keyboard,
        modal: config.closeModals,
        minScrollHeight: config.minScrollHeight
      });
      modal.one('show.uk.modal', function() {
        self.dispatch("onOpened", [config, self.el, args]);
      });
      modal.one('hide.uk.modal', function() {
        self.dispatch("onClosed", [config, self.el, args]);
      });
      modal.show();
    },
    close: function (args) {
      /**
       * Closes the modal.
       * @dispatch onClose, onClosed
       * @param args Parameter to pass into the dispatch handlers. (3rd argument of the callback.)
       */
      var self = this;
      var config = self.config;
      var modal = UIkit.modal('#' + config.id);

      self.dispatch("onClose", [config, self.el, args]);

      if (modal.isActive()) {
        modal.hide();
      }
    }
  }, $definitions.flexgrid);


  $definitions.button = def({
    __name__: "button",
    $defaults: {
      htmlTag: "BUTTON",
      label: "",
      tagClass: "",
      selectable: false,
      buttonStyle: "link",
      labelClass: "",
      iconContent: "",
      iconClass: "",
      iconTemplate: iconTemplate,
      activeClass: ACTIVE_CLASS
    },
    $setters: classSetters({
      buttonStyle: prefixClassOptions({
        link: "button-link",
        button: "button",
        shadow: "button-shadow",
        "": ""
      }, 'sp-'),
      color: prefixClassOptions({
        primary: "",
        success: "",
        danger: "",
        muted: "",
        "": ""
      }, 'sp-button-', true),
      size: prefixClassOptions({
        mini: "",
        small: "",
        large: "",
        "": ""
      }, 'sp-button-', true)
    }),
    template: elementIconTemplate(function (config) {
      if (config.label) {
        if (config.labelClass) {
          return '<span class="{{labelClass}}">{{label}}</span>';
        } else if (config.icon || config.iconClass) {
          return '<span>{{label}}</span>';
        } else {
          return config.label;
        }
      }
      return ''
    }),
    select: function () {
      /**
       * Change the button state to selected.
       */
      getConfig(this).$selected = true;
      addClass(this.el, this.activeClass);
    },
    isSelected: function () {
      /**
       * Returns if the button is in the selected state.
       * @returns {boolean}
       */
      return !!getConfig(this).$selected;
    },
    deselect: function () {
      /**
       * Change the button state to deselected.
       */
      getConfig(this).$selected = false;
      removeClass(this.el, this.activeClass);
    },
    getLabel: function () {
      /**
       * Gets the label value of the button.
       * @returns {string}
       */
      return getConfig(this).label;
    },
    setLabel: function (value) {
      /**
       * Sets the label (HTML accepted) of the button component.
       * @param value The label value, which can be HTML.
       */
      getConfig(this).label = value;
      this.render();
    }
  }, $definitions.element, exports.MouseEvents);


  $definitions.icon = def({
    __name__: "icon",
    $defaults: {
      htmlTag: "A",
      iconStyle: "hover",
      selectable: false,
      iconContent: "",
      iconClass: "",
      iconTemplate: iconTemplate
    },
    $setters: classSetters({
      iconStyle: prefixClassOptions({
        hover: "",
        button: "",
        justify: "",
        "": ""
      }, 'sp-icon-', true),
      size: prefixClassOptions({
        small: "",
        medium: "",
        large: "",
        xlarge: "",
        "": ""
      }, 'sp-icon-', true)
    }),
    template: function (config) {
      return isFunction(config.iconTemplate) ?
        config.iconTemplate.call(this, config) : (config.iconTemplate || '');
    }
  }, $definitions.element, exports.MouseEvents);


  $definitions.label = def({
    __name__: "label",
    $defaults: {
      htmlTag: "SPAN",
      label: "",
      selectable: false
    },
    $setters: classSetters({
      labelStyle: {
        form: "sp-form-label",
        "": ""
      }
    }),
    template: function (config) {
      return config.label;
    },
    getValue: function () {
      /**
       * Gets the text value of the label.
       * @returns {string}
       */
      return getConfig(this).label;
    },
    setValue: function (value) {
      /**
       * Sets the value (HTML accepted) of the label component.
       * @param value
       */
      getConfig(this).label = value;
      this.render();
    }
  }, $definitions.element);


  $definitions.link = def({
    __name__: "link",
    $defaults: {
      label: "",
      htmlTag: "A",
      buttonStyle: ""
    }
  }, $definitions.button, exports.MouseEvents);


  $definitions.progress = def({
    __name__: "progress",
    $defaults: {
      htmlTag: "DIV",
      tagClass: "sp-progress",
      fill: "width"
    },
    $setters: extend(classSetters({
      size: prefixClassOptions({
        mini: "",
        small: "",
        "": ""
      }, 'sp-progress-', true),
      color: prefixClassOptions({
        danger: "",
        warning: "",
        success: "",
        primary: "",
        striped: "",
        "": ""
      }, 'sp-progress-', true)
    }), {
      value: function (value) {
        if (isDefined(value))
          this.setValue(value);
      }
    }),
    render: function () {
    },
    __init__: function () {
      this._bar = createElement("DIV", {class: "sp-progress-bar"});
      this.el.appendChild(this._bar);
    },
    getValue: function () {
      /**
       * Gets the value of the progress component.
       * @returns {number}
       */
      return this._progress;
    },
    setValue: function (value) {
      /**
       * Sets the value of the progress component.
       * @param value A percentage value from 0-100.
       */
      assertPropertyValidator(value, 'value', isNumber);

      var self = this;
      self._bar.style.width = value + '%';
      self._progress = value;
    }
  }, $definitions.element);


  $definitions.image = def({
    __name__: "image",
    $defaults: {
      htmlTag: "IMG"
    },
    $events: {
      load: {lazy: true, dispatch: "onLoad"}
    },
    $setters: {
      src: function (value) {
        setAttributes(this.el, {src: value});
      },
      width: function (value) {
        setAttributes(this.el, {width: value});
      },
      height: function (value) {
        setAttributes(this.el, {height: value});
      }
    }
  }, $definitions.element, exports.MouseEvents);


  exports.ChangeEvent = {
    __name__: 'ChangeEvent',
    __check__: function (bases) {
      assertBasesCheck('Responder', 'ChangeEvent', bases);
    },
    $events: {
      change: {lazy: true, dispatch: "onChange", defaultEvent: true}
    }
  };

  exports.InputControl = {
    __name__: 'InputControl',
    __check__: function (bases) {
      assertBasesCheck('Responder', 'InputControl', bases);
      assertBasesCheck('FormControl', 'InputControl', bases);
    },
    $events: {
      input: {lazy: true, dispatch: 'onInput', defaultEvent: true},
      keyup: {lazy: true, dispatch: 'onKeyUp', defaultEvent: true}
    },
    $setters: {
      autocomplete: function (value) {
        setAttributes(this.getFormControl(), {autocomplete: value});
      },
      autocapitalize: function (value) {
        setAttributes(this.getFormControl(), {autocapitalize: value});
      },
      autocorrect: function (value) {
        setAttributes(this.getFormControl(), {autocorrect: value});
      },
      spellcheck: function (value) {
        setAttributes(this.getFormControl(), {spellcheck: value});
      },
      placeholder: function (value) {
        setAttributes(this.getFormControl(), {placeholder: value});
      }
    }
  };

  assignClassToMethods(exports.InputControl.$setters, exports.InputControl.__name__);


  $definitions.toggle = def({
    __name__: "toggle",
    $setters: extend(
      classSetters({
        color: prefixClassOptions({
          "primary": '',
          "success": '',
          "danger": '',
          "warning": '',
          "": ""
        }, 'sp-toggle-', true)
      }),
      {
        checked: function (value) {
          this.getFormControl().checked = value;
        }
      }
    ),
    $defaults: {
      htmlTag: "LABEL",
      tagClass: "sp-toggle",
      type: 'checkbox'
    },
    template: '<input><div class="sp-toggle-slider"></div>',
    getFormControl: function () {
      /**
       * Get the HTML input element.
       * @returns {Element}
       */
      return this.el.firstChild;
    },
    reset: function () {
      /**
       * Reset the toggle.
       */
      this.getFormControl().checked = false;
    },
    getValue: function () {
      /**
       * Get the value of the toggle.
       * @returns {boolean}
       */
      return this.getFormControl().checked;
    },
    setValue: function (value) {
      /**
       * Set the value of the toggle.
       * @param value
       */
      this.getFormControl().checked = value;
    }
  }, exports.ChangeEvent, exports.FormControl, $definitions.element);


  $definitions.input = def({
    __name__: 'input',
    $defaults: {
      htmlTag: 'INPUT',
      tagClass: 'sp-input',
      inputStyle: '',
      width: ""
    },
    $setters: extend(
      classSetters({
        inputStyle: prefixClassOptions({
          line: '',
          round: '',
          "": ""
        }, 'sp-input-', true),
        width: prefixClassOptions({
          "": "",
          mini: "",
          small: "",
          medium: "",
          large: "",
          full: "sp-width-100"
        }, 'sp-form-width-', true, ['full']),
        size: prefixClassOptions({
          "": "",
          small: "",
          large: ""
        }, 'sp-form-', true)
      }),
    {
      readonly: function (value) {
        setAttributes(this.getFormControl(), {readonly: value});
      }
    }),
    reset: function () {
      /**
       * Clear the HTML input element.
       */
      var self = this;
      var formControl = self.getFormControl();
      switch (self.config.type) {
        case "checkbox":
          formControl.checked = self.config.checked;
          break;
        case "number":
          formControl.value = 0;
          break;
        default:
          formControl.value = "";
          break;
      }
    },
    getValue: function () {
      /**
       * Get the value of the HTML input element.
       * @returns {string | boolean}
       */
      var self = this;
      if (self.config.type == "checkbox")
        return self.getFormControl().checked;
      else
        return self.getFormControl().value;
    },
    setValue: function (value) {
      /**
       * Set the value of the HTML input element.
       * @param value
       */
      var self = this;
      if (self.config.type == "checkbox")
        self.getFormControl().checked = value;
      else
        self.getFormControl().value = value;
    }
  }, exports.InputControl, exports.ChangeEvent, exports.FormControl, $definitions.element);


  $definitions.search = def({
    __name__: "search",
    $defaults: {
      htmlTag: 'DIV',
      tagClass: 'sp-search',
      placeholder: 'Search...',
      iconClass: "sp-icon-search-16 sp-search-icon",
      iconContent: "",
      icon: 'search',
      iconTemplate: iconTemplate,
      inputClass: 'sp-input',
      type: 'search'
    },
    template: elementIconTemplate(function () {
      return '<input class="{{inputClass}}">'
    }),
    getFormControl: function () {
      /**
       * Gets the HTML input element.
       * @returns {Element}
       */
      return this.el.lastChild;
    }
  }, $definitions.input);


  $definitions.drawer = def({
    __name__: "drawer",
    $defaults: {
      tagClass: "sp-offcanvas",
      $blockDrawerOpen: false,
      $blockDrawerPan: false,
      $closeInProgress: false,
      openable: returnTrue,
      closable: returnTrue
    },

    $setters: extend(
      classSetters({
        touchOnly: {
          "": "",
          "false": "",
          "true": 'sp-offcanvas-touch'
        },
        flipped: {
          "": "",
          "false": "",
          "true": "sp-offcanvas-flip"
        }
      }),
      {
        edge: function (value) {
          if (value) {
            var edgeBorder = 45;
            var $this = this;
            var flipped = $this.isFlipped()
            var direction = flipped ? DrawerSwipe.Direction.RTL : DrawerSwipe.Direction.LTR;
            var swiper = new DrawerSwipe(document.body, {
              direction: direction,
              friction: 0.01,
              minThreshold: flipped ? 0   : -100,
              maxThreshold: flipped ? 100 : 0,
              posThreshold: flipped ? 18 : -18,
              startPos: flipped ? 100 : -100
            });
            $this.openSwipe = swiper;

            swiper.getWidth = function () {
              return $this.content().width();
            };

            swiper.onPanStart = function (e) {
              if (!$this.openable()) return false;
              if (this.beganPan) {
                return true;
              } else if (!exports.support.animation || $this.$blockDrawerOpen || exports.$scrollState == 'scroll') {
                return false;
              } else {
                var firstTouch = e.touches[0];
                var lastTouch = this.lastTouch;
                if ($this.isFlipped()) {
                  var rightScreenThreshold = window.innerWidth - edgeBorder;
                  return (firstTouch && firstTouch.clientX >= rightScreenThreshold) || (lastTouch && lastTouch.clientX >= rightScreenThreshold);
                } else {
                  return (firstTouch && firstTouch.clientX <= edgeBorder) || (lastTouch && lastTouch.clientX <= edgeBorder);
                }
              }
            };

            swiper.onSwipe = function () {
              return !$this.$blockDrawerOpen && exports.$scrollState != 'scroll';
            };

            swiper.applyChanges = function (percent) {
              if (this.beganPan) {
                $this.showDrawer();
                percent = $this.closeSwipe.percent = percent;
                $this.closeSwipe.applyChanges(percent);
              }
            };

            swiper.onCompleteSwipe = function () {
              $this.closeSwipe.reset();
            };
          }
        }
      }
    ),

    __after__: function () {
      var $this = this;
      var content = $this.el.firstChild;
      if (content) addClass(content, 'sp-offcanvas-bar');

      var flipped = $this.isFlipped();
      var swipeGesture = $this.closeSwipe = new DrawerSwipe($this.element, {
        direction: flipped ? DrawerSwipe.Direction.LTR : DrawerSwipe.Direction.RTL,
        minThreshold: flipped ? 0   : -100,
        maxThreshold: flipped ? 100 : 0,
        posThreshold: flipped ? 40 : -40,
        startPos: flipped ? 100 : -100
      });

      swipeGesture.getWidth = function () {
        return $this.content().width();
      };

      swipeGesture.onAnimate = function () {
        return !$this.openSwipe || !$this.openSwipe.closeInProgress;
      };

      swipeGesture.onPan = function () {
        return !$this.$blockDrawerPan && exports.$scrollState != 'scroll';
      };

      swipeGesture.onSwipe = function () {
        return !$this.$blockDrawerPan && exports.$scrollState != 'scroll';
      };

      swipeGesture.onPanStart = function (e) {
        if (!$this.closable()) return false;
        var firstTouch = e.touches[0];
        return this.beganPan || (firstTouch && document.elementFromPoint(firstTouch.clientX, firstTouch.clientY) != $this.element);
      };

      swipeGesture.applyChanges = function (percent) {
        if ($this.openSwipe && $this.closeSwipe) {
          $this.openSwipe.percent = $this.closeSwipe.percent = percent;
        }
        var contentElement = $this.element.firstChild;
        if (contentElement) {
          var elementStyle = $this.element.style;
          var contentElementStyle = contentElement.style;
          var transform = $this.config.flipped ? "translateX(100vw) translateX(-" + (100 - percent) + "%)" : "translateX(" + percent + "%)";
          var transition = "none";
          var bgTransition = "background-color 100ms linear";
          var backface = "hidden";
          var bgColor = "rgba(0,0,0," + 0.53*(1-Math.min(Math.abs(percent)+10, 100)/100) + ')';
          contentElementStyle.webkitTransform = transform;
          contentElementStyle.transform = transform;
          contentElementStyle.webkitTransition = transition;
          contentElementStyle.transition = transition;
          contentElementStyle.backfaceVisibility = backface;
          elementStyle.backgroundColor = bgColor;
          elementStyle.webkitTransition = bgTransition;
          elementStyle.transition = bgTransition;
          elementStyle.backfaceVisibility = backface;
        }
      };

      swipeGesture.onCompleteSwipe = function () {
        $this.finalize();
      };

      $($this.element)
        .on("click", function (e) {
          if (e.target == e.delegateTarget) {
            $this.close();
          }
        });
    },

    finalize: function () {
      $('body').removeClass('sp-offcanvas-page');
      removeClass(this.element, 'sp-active');
      this.content().removeClass('sp-offcanvas-bar-show');
    },

    showDrawer: function() {
      var $this = this;
      if (!$this.isVisible()) {
        var body = $("body");

        $($this.element)
          .addClass("sp-active");

        body.addClass("sp-offcanvas-page");
        body.width();  // .width() - force redraw to apply css
        $this.content().addClass("sp-offcanvas-bar-show");
        return true;
      }
      return false;
    },

    open: function () {
      var $this = this;
      if ($this.showDrawer()) {
        $this.closeSwipe.animate(null, true, true);
      }
    },

    close: function () {
      if (this.closeSwipe) {
        this.closeSwipe.animate();
      } else {
        this.finalize();
      }
    },

    content: function () {
      return $(this.el).find(".sp-offcanvas-bar");
    },

    isVisible: function () {
      return $(this.el).is(":visible");
    },

    isFlipped: function () {
      return hasClass(this.el, "sp-offcanvas-flip");
    }
  }, $definitions.element);


  $definitions.tooltip = def({
    __name__: "tooltip",
    $defaults: {
      label: "",
      tagClass: "sp-tooltip",
      direction: "top",
      device: "notouch",
      activeClass: ACTIVE_CLASS
    },
    $setters: classSetters({
      direction: prefixClassOptions({
        top: "",
        "top-left": "",
        "top-right": "",
        bottom: "",
        "bottom-left": "",
        "bottom-right": "",
        left: "",
        right: ""
      }, 'sp-tooltip-', true)
    }),
    template: '<div class="sp-tooltip-inner">{{label}}</div>',
    isOpened: function () {
      /**
       * Returns if the tooltip is open.
       * @returns {boolean}
       */
      return hasClass(this.el, this.activeClass);
    },
    open: function (args, timeout) {
      /**
       * Open the tooltip.
       * @param args Parameter to pass into the dispatch handlers. (3rd argument of the callback.)
       * @param timeout Close the tooltip automatically after this long.
       */
      var self = this;
      args = [self.config, self.el, args];
      self.dispatch("onOpen", args);
      self.el.style.display = 'block';
      addClass(self.el, self.activeClass);
      self.dispatch("onOpened", []);
      if (timeout) {
        setTimeout(function () {
          self.close();
        }, timeout);
      }
    },
    close: function (args) {
      /**
       * Close the tooltip.
       * @param args Parameter to pass into the dispatch handlers. (3rd argument of the callback.)
       */
      var self = this;
      args = [self.config, self.el, args];
      self.dispatch("onClose", args);
      self.el.style.display = null;
      removeClass(self.el, self.activeClass);
      self.dispatch("onClosed", args);
    }
  }, $definitions.element, exports.AbsolutePositionMethods);


  $definitions.dropdown = def({
    __name__: "dropdown",
    $defaults: {
      mode: "click",
      pos: "bottom-center",
      padding: "none",
      justify: false,
      dropdownDelay: 0,
      dropdownClass: "sp-dropdown-close",
      dropdownAnimation: "sp-animation-scale-up-y sp-animation-top-center",
      dropdownRect: null,
      blank: false
    },
    $setters: {
      dropdown: function (value) {
        var self = this;
        var dropdownContainer = createElement("DIV",
          {class: classString(self.getDropdownClass())});

        if (!value.listStyle) {
          value.listStyle = "dropdown";
        }
        self.el.appendChild(dropdownContainer);
        self._inner = exports.new(value, dropdownContainer);
        self.$components.push(self._inner);
      },
      dropdownStyle: prefixClassOptions({
        small: '',
        blank: '',
        scrollable: '',
        "": ""
      }, 'sp-dropdown-', true),
    },
    __init__: function (config) {
      var self = this;
      var dropdown = self._dropdown = UIkit.dropdown(self.el, {pos: config.pos, justify: config.justify, mode: config.mode});
      dropdown.on('beforehide.uk.dropdown', function (e) {
        var args = [self.config, self.el, e];
        self.dispatch("onClose", args);
        self._inner.dispatch("onClose", args);
      });
      dropdown.on('hide.uk.dropdown', function (e) {
        var args = [self.config, self.el, e];
        self.dispatch("onClosed", args);
        self._inner.dispatch("onClosed", args);
      });
    },
    getDropdownClass: function () {
      var config = getConfig(this);
      var result = config.dropdownClass;
      result += config.blank ? " sp-dropdown-blank" : " sp-dropdown";
      result += config.scrollable ? " sp-dropdown-scrollable" : "";
      result += " " + config.dropdownAnimation;
      return result;
    },
    getBoundingClientRect: function () {
      /**
       * Gets the bounding rectangle of the element. Needs to be added first since this delegates the call to element.getBoundingClientRect.
       * @returns {any | ClientRect}
       */
      return getConfig(this).dropdownRect || this.el.firstChild.getBoundingClientRect();
    },
    isOpened: function () {
      /**
       * Returns if the dropdown is open.
       * @returns {boolean}
       */
      return hasClass(this.el, 'sp-open');
    },
    open: function (args, cb) {
      /**
       * Opens the dropdown.
       * @dispatch onOpen, onOpened
       * @param args Parameter to pass into the dispatch handlers. (3rd argument of the callback.)
       */
      var self = this;
      var config = self.config;
      args = [config, self.el, args];

      if (config.dropdownDelay) {
        setTimeout(open, config.dropdownDelay);
      } else {
        open();
      }

      function open() {
        self.dispatch("onOpen", args);
        self._inner.dispatch("onOpen", args);
        self._dropdown.show();
        self.dispatch("onOpened", args);
        self._inner.dispatch("onOpened", args);
        if (cb && cb.call) cb.call(self);
      }
    },
    close: function (args) {
      /**
       * Close the dropdown.
       * @dispatch onClose, onClosed
       * @param args Parameter to pass into the dispatch handlers. (3rd argument of the callback.)
       */
      var self = this;
      self.dispatch("onClose", args);
      self._inner.dispatch("onClose", args);
      self._dropdown.hide(true);
      self.dispatch("onClosed", args);
      self._inner.dispatch("onClosed", args);
    }
  }, $definitions.flexgrid, exports.AbsolutePositionMethods);


  exports.LinkedList = {
    __name__: "LinkedList",
    __check__: function (bases) {
      assertBasesCheck('LinkedList', 'LinkedList', bases);
      assertBasesCheck('Dispatcher', 'LinkedList', bases);
    },
    __init__: function () {
      this.headNode = null;
      this.tailNode = null;
      this.$items = {};
      this.$count = 0;
    },
    _id: function (data) {
      /**
       * Assigns an id to an object if one doesn't exist.
       * @param data The object to assign an id to.
       * @returns {any | string} The id of the object.
       */
      return data.id || (data.id = uid("data"));
    },
    getItem: function (id) {
      /**
       * Gets a configuration object by its id.
       * @param id The id of the element.
       * @returns {string}
       */
      return this.$items[id];
    },
    updateItem: function (item, update) {
      /**
       * Updates an item by adding properties found on the update object.
       * @param item The item to update.
       * @param update An object containing properties and values to modify.
       */
      assertPropertyValidator(update, 'update object for ' + item.id, isDefined);
      var refNode = item.$tailNode;
      this.remove(item);
      extend(item, update, true);
      this.add(item, refNode);
    },
    refresh: function () {
      /**
       * Refresh the list.
       * @dispatch onRefresh
       */
      this.dispatch("onRefresh");
    },
    pluck: function (key) {
      /**
       * Plucks a property from all child objects.
       * @param key The key of the child objects.
       * @returns {any[]}
       */
      return this.each(function (item) {
        return item[key]
      });
    },
    each: function (func, thisArg) {
      /**
       * Invokes a function on each child.
       * @param func The invoked function.
       * @param thisArg The 'this' object passed to the invoked function.
       * @returns {any[]} Return an array containing the results of the invoked call.
       */
      var node = this.headNode;
      var nextNode;
      var results = [];
      while (node) {
        nextNode = node.$tailNode;
        results.push(func.call(thisArg || this, node));
        node = nextNode;
      }
      return results;
    },
    add: function (item, node) {
      /**
       * Adds an item to the end.
       * @param item The item to add.
       * @dispatch onAdd, onAdded
       * @returns {string} The object id after adding.
       */
      return this.insertBefore(item, node);
    },
    insertBefore: function (item, node) {
      /**
       * Add an item before another item.
       * @param item The item to add.
       * @param node The reference item to add the item before.
       * @dispatch onAdd, onAdded
       * @returns {string} The object id after adding.
       */
      var self = this;
      assertPropertyValidator(item, 'item', isObject);
      assert(!self.$items[item.id], "Circular reference detected with node insert!");

      item.id = self._id(item);

      if (!node && self.tailNode) {
        // Insert as last node
        return self.insertAfter(item, self.tailNode);
      }
      else {
        self.dispatch("onAdd", [item]);

        if (self.headNode == null || self.tailNode == null) {
          self.headNode = item;
          self.tailNode = item;
          item.$headNode = item.$tailNode = null;
        }
        else {
          if (node.$headNode) {
            node.$headNode.$tailNode = item;
          }
          item.$headNode = node.$headNode;
          item.$tailNode = node;
          node.$headNode = item;

          if (node == self.headNode)
            self.headNode = item;
        }

        self.$items[item.id] = item;
        self.$count++;

        self.dispatch("onAdded", [item, node]);

        return item.id;
      }
    },
    insertAfter: function (item, node) {
      /**
       * Add an item after another item.
       * @param item The item to add.
       * @param node The reference item to add the item after.
       * @dispatch onAdd, onAdded
       * @returns {string} The object id after adding.
       */
      var self = this;
      assertPropertyValidator(item, 'item object ' + item, isObject);
      assert(!self.$items[item.id], "Circular reference detected with node insert!");

      item.id = self._id(item);

      if (!node && self.headNode) {
        // Insert as first node
        return self.insertBefore(item, self.headNode);
      }
      else {
        self.dispatch("onAdd", [item]);

        if (self.headNode == null || self.tailNode == null) {
          self.headNode = item;
          self.tailNode = item;
          item.$headNode = item.$tailNode = null;
        }
        else {
          if (node.$tailNode) {
            node.$tailNode.$headNode = item;
          }
          item.$tailNode = node.$tailNode;
          item.$headNode = node;
          node.$tailNode = item;

          if (node == self.tailNode)
            self.tailNode = item;
        }

        self.$items[item.id] = item;
        self.$count++;

        self.dispatch("onAdded", [item]);

        return item.id;
      }
    },
    remove: function (item) {
      /**
       * Removes an item.
       * @param item The item to remove.
       * @dispatch onDelete, onDeleted
       * @returns {any} The item object.
       */
      assertPropertyValidator(item, 'item', isObject);

      var self = this;
      self.dispatch("onDelete", [item]);

      if (item.$headNode) item.$headNode.$tailNode = item.$tailNode;
      if (item.$tailNode) item.$tailNode.$headNode = item.$headNode;
      if (item == self.headNode)
        self.headNode = item.$tailNode;
      if (item == self.tailNode)
        self.tailNode = item.$headNode;
      item.$tailNode = item.$headNode = null;

      delete self.$items[item.id];
      self.$count--;

      self.dispatch("onDeleted", [item]);
      return item;
    },
    clearAll: function () {
      /**
       * Remove all items.
       */
      var self = this;
      self.headNode = null;
      self.tailNode = null;
      self.$items = {};
      self.$count = 0;
      self.dispatch("onClearAll", []);
    },
    previous: function (node) {
      return node.$headNode;
    },
    next: function (node) {
      return node.$tailNode;
    },
    contains: function (item) {
      /**
       * Checks if an item exists.
       * @param item The item to check for.
       * @returns {boolean} True if the item exists.
       */
      return !!this.$items[item.id];
    },
    indexOf: function (item, beginNode) {
      /**
       * Gets the index of an item.
       * @param item The item to find the index for.
       * @param beginNode An optional node which specifies the start.
       * @returns {int | undefined} The index of the item, or undefined if doesn't exist.
       */
      var i = 0;
      var node = beginNode || this.headNode;
      while (node) {
        // Apparently 1 == "1" in JS
        if (node === item)
          return i;
        node = node.$tailNode;
        i++;
      }
    },
    findWhere: function (key, value, beginNode) {
      /**
       * Find all items based on a key and value.
       * @param key The key to look at for matching.
       * @param value The value of the key.
       * @param beginNode An optional node which specifies the start.
       * @returns {any} The item if found, undefined otherwise.
       */
      var result = [];
      var node = beginNode || this.headNode;
      while (node) {
        // Apparently 1 == "1" in JS
        if (node[key] === value)
          result.push(node);
        node = node.$tailNode;
      }
      return result;
    },
    findOne: function (key, value, beginNode) {
      /**
       * Finds an item based on a key and value of the item.
       * @param key The key to look at for matching.
       * @param value The value of the key.
       * @param beginNode An optional node which specifies the start.
       * @returns {any} The item if found, undefined otherwise.
       */
      var node = beginNode || this.headNode;
      while (node) {
        // Apparently 1 == "1" in JS
        if (node[key] === value)
          return node;
        node = node.$tailNode;
      }
    },
    findFirst: function (cond, beginNode, thisArg) {
      /**
       * Finds the first item which matches a condition predicate function.
       * @param cond The condition function.
       * @param beginNode An optional node which specifies the start.
       * @param thisArg The 'this' argument to pass to the function.
       * @returns {any} The item if found, undefined otherwise.
       */
      var node = beginNode || this.headNode;
      while (node) {
        if (cond.call(thisArg || this, node)) {
          return node;
        }
        node = node.$tailNode;
      }
    },
    findLast: function (cond, beginNode, thisArg) {
      /**
       * Finds the last item which matches a condition predicate function.
       * @param cond The condition function.
       * @param beginNode An optional node which specifies the start.
       * @param thisArg The 'this' argument to pass to the function.
       * @returns {any} The item if found, undefined otherwise.
       */
      var node = beginNode || this.headNode;
      var lastNode = null;
      while (node) {
        if (cond.call(thisArg || this, node)) {
          lastNode = node;
        }
        else {
          return lastNode;
        }
        node = node.$tailNode;
      }
      return lastNode;
    }
  };

  assignClassToMethods(exports.LinkedList, 'LinkedList');


  $definitions.stack = def({
    __name__: "stack",
    $defaults: {
      filter: function (item) {
        return !item.$parentClosed;
      },
      droppable: returnTrue,
      itemTag: 'DIV',
      itemTagClass: '',
      activeClass: ACTIVE_CLASS
    },
    $setters: {
      filter: function (value) {
        assertPropertyValidator(value, 'filter', isFunction);
      },
      droppable: function (value) {
        assertPropertyValidator(value, 'value', isFunction);
      }
    },
    __after__: function (config) {
      var self = this;
      self.addListener("onAdded", self._onAdded);
      self.addListener("onDeleted", self._onDeleted);
      self.addListener("onRefresh", self._onRefresh);
      self.addListener("onClearAll", self._onClearAll);
      self.addListener("onDispose", self._onClearAll);

      if (config.data) self.setData(config.data);
    },
    __init__: function () {
      this.$elements = {};
      this.$itemListeners = {};
      this.$itemComponents = {};  // Mapping of item ids to component objects;
    },
    getItemNode: function (id) {
      /**
       * Get the wrapper element that used to hold a child component with a specific id. For example, this would be an LI in a list.
       * @returns {Element}
       */
      return this.$elements[id];
    },
    disposeItemNode: function (id) {
      /**
       * Removes all children and disposes all components of the item node.
       */
      var self = this
      var component = self.$itemComponents[id]
      if (component) {
        removeFromArray(self.$components, component)
        component.dispose()
      }
      var el = self.getItemNode(id);
      if (el) removeAllChildren(el);
    },
    render: function () {
      // Do nothing, overwrites render function.
    },
    containerElement: function () {
      return this.el;
    },
    itemElement: function (item) {
      return createElement(this.itemTagString(item), {class: this.itemClass(item)});
    },
    itemClass: function (item) {
      var itemClass = classString(getConfig(this).itemTagClass);
      itemClass += item.$selected ? ' ' + this.activeClass : '';
      itemClass += ' ' + classString(item.$cls);
      return itemClass;
    },
    itemTagString: function () {
      return getConfig(this).itemTag;
    },
    buildItemElement: function () {
    },
    attachItemEvents: function () {
    },
    createItemElement: function (item) {
      var el = this.itemElement(item);
      setAttributes(el, {'data-id': item.id});
      this.buildItemElement(el, item);
      this.attachItemEvents(el, item);
      this.$elements[item.id] = el;
      return el;
    },
    _addToDOM: function (obj) {
      var self = this;
      var node = self.getItemNode(obj.id);

      if (!node) {
        node = self.createItemElement(obj);

        if (obj.$tailNode)
          self.containerElement(obj).insertBefore(node, self._addToDOM(obj.$tailNode));
        else
          self.containerElement(obj).appendChild(node);
      }

      if (obj.$hidden) addClass(node, HIDDEN_CLASS);
      else removeClass(node, HIDDEN_CLASS);

      if (obj.$selected) addClass(node, this.activeClass);
      else removeClass(node, this.activeClass);

      return node;
    },
    _onDispose: function () {
      var self = this;
      forInLoop(function (key, node) {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, self.$elements);

      forInLoop(function (id, listeners) {
        listeners.forEach(removeListener);
      }, self.$itemListeners);

      forInLoop(function (id, component) {
        component.dispose();
      }, self.$itemComponents);

      self.$itemListeners = {};
      self.$elements = {};
      self.$itemComponents = {};
      self.$components = [];
    },
    _onAdded: function (obj) {
      var self = this;

      obj.$hidden = self._checkItemHidden(obj);

      if (!obj.$hidden) {
        self._addToDOM(obj);
      }

      if (obj.$parent) {
        var parent = self.getItem(obj.$parent);
        if (parent && parent.$children && parent.$children.length === 1) {
          var parentNode = self.getItemNode(parent.id);
          // If parentNode exists: replace it with a new one
          // Otherwise: defer parent creation until it's needed
          if (parentNode) {
            var newParentNode = self.createItemElement(parent);
            if (parent.$hidden) addClass(newParentNode, HIDDEN_CLASS);
            parentNode.parentNode.replaceChild(newParentNode, parentNode);
          }
        }
      }

      self.dispatch("onDOMChanged", [obj, "added"]);
    },
    _onDeleted: function (obj) {
      var self = this;
      if (obj.$parent) {
        var parent = self.getItem(obj.$parent);
        if (parent && parent.$branch) {
          removeFromArray(parent.$children, obj);
          if (parent.$children.length === 0) {
            var parentNode = self.getItemNode(parent.id);
            // If parentNode exists: replace it with a new one
            // Otherwise: defer parent creation until it's needed
            if (parentNode) {
              var newParentNode = self.createItemElement(parent);
              if (parent.$hidden) addClass(newParentNode, HIDDEN_CLASS);
              parentNode.parentNode.replaceChild(newParentNode, parentNode);
            }
          }
        }
      }

      var node = self.getItemNode(obj.id);
      if (node) {
        node.parentNode.removeChild(node);
        delete self.$elements[obj.id];
      }

      // Dispose item global listeners
      var itemListeners = self.$itemListeners[obj.id];
      if (itemListeners) {
        itemListeners.forEach(removeListener);
        delete self.$itemListeners[obj.id];
      }

      // Dispose item component
      var itemComponent = self.$itemComponents[obj.id];
      if (itemComponent) {
        itemComponent.dispose();
        delete self.$itemComponents[obj.id];
      }

      self.dispatch("onDOMChanged", [obj, "deleted"]);
    },
    _onRefresh: function () {
      var self = this;
      self.each(function (item) {
        item.$hidden = self._checkItemHidden(item);
        self._addToDOM(item);
      });
      self.dispatch("onDOMChanged", [null, "refresh"]);
    },
    _onClearAll: function () {
      this._onDispose();  // This just cleans up the item listeners and global references
      this.dispatch("onDOMChanged", [null, "clear"]);
    },
    _checkItemHidden: function (item) {
      return !this.filter(item);
    },
    beforeSetData: function (data) {
      return data;
    },
    setData: function (data) {
      /**
       * Sets the data for the component.
       * @param data An array of component configuration objects. The default view object is 'link' if none is specified.
       */
      assertPropertyValidator(data, 'setData argument data', isArray);

      var $this = this;
      $this.clearAll();

      data = $this.beforeSetData(data);

      data.forEach(function (item) {
        // null is a special value that will be ignored (for prettier code)
        if (item !== null) $this.add(item);
      });

      $this.data = data;
    },
    getBatch: function () {
      /**
       * Get the 'batch' value that was passed to `showBatch`.
       */
    return this.$batch;
    },
    showBatch: function (name) {
      /**
       * Show only elements with a specific 'batch' value in its configuration. Hides all other elements.
       * @param name An array or a delimited string with a list of batch values to filter by.
       * @example showBatch('icons sidebar mainWindow')
       */
      this.$batch = name;
      this.each(function (item) {
        if (name.indexOf(item.batch) != -1)
          removeClass(this.$elements[item.id], HIDDEN_CLASS);
        else
          addClass(this.$elements[item.id], HIDDEN_CLASS);
      }, this);
    }
  }, exports.LinkedList, $definitions.element);


  $definitions.list = def({
    __name__: "list",
    $defaults: {
      htmlTag: "UL",
      itemTag: "LI",
      itemTagClass: "sp-list-item",
      selectable: false,
      closeButton: false,
      listStyle: "list",
      dropdownEvent: "onItemClick",
      activeClass: ACTIVE_CLASS
    },
    $setters: extend(
      classSetters({
        listStyle: prefixClassOptions({
          "nav": "nav",
          "side": ["nav", "nav-side"],
          "dropdown": ["nav", "nav-dropdown", "nav-side"],
          "striped": ["nav", "list", "list-striped"],
          "line": ["list", "list-line"],
          "navbar": "navbar-nav",
          "nav-side-primary": ["nav", "nav-side", "nav-primary"],
          "nav-side-success": ["nav", "nav-side", "nav-success"],
          "danger": "nav-danger",
          "list": "list",
          "blank": ["list", "list-blank"],
          "tab": "tab",
          "tab-vertical": ["tab", "flex-column"],
          "tab-primary": ["tab", "primary"],
          "tab-success": ["tab", "success"],
          "tab-muted": ["tab", "muted"],
          "tab-danger": ["tab", "danger"],
          "breadcrumb": "breadcrumb",
          "": ""
        }, 'sp-')
      }),
      {
        tab: function (value) {
          if (value) {
            var self = this;
            self.addListener("onItemClick", self._onTabClick);

            if (value == "responsive") {
              // Create a list of linked data to the actual data
              // This avoids needing to duplicate the data
              var linkedData = self.config.data.map(function (item) {
                return {label: item.label, $link: item, $close: item.$close};
              });

              self.set('dropdownEvent', "onTabMenuClick");
              self.set('dropdown', {
                view: "list",
                data: linkedData,
                on: {
                  onItemClick: function (item, node, e) {
                    self._onTabClick(item.$link, node, e);
                  },
                  onItemSelectionChanged: function (item, node, e) {
                    self._onTabClick(item.$link, node, e);
                  },
                  onItemClosed: function (item) {
                    self.closeItem(item.$link);
                  }
                }
              });
              self.dropdownList = self.dropdownPopup._inner;
            }
          }
        }
      }
    ),
    __after__: function (config) {
      if (config.tab) {
        var self = this;
        self.addListener("onAdded", self._onTabAdded);
        self.addListener("onDeleted", self._onTabDeleted);
        self.addListener("onItemSelectionChanged", self._onItemSelectionChanged);
        if (config.tab == 'responsive') {
          self.addListener("onDOMChanged", self._onDOMChanged);
          self.add({label: "<i class='sp-icon-bars'></i>", $tabMenu: true, batch: "$menu"}, self.headNode);
          $windowListeners.resize.push(bind(self.updateFit, self));
          self.dispatch("onDOMChanged", [null, "refresh"]);
        }
      }
    },
    _onDOMChanged: function () {
      delay(this.updateFit, this);
    },
    _onTabAdded: function (item, before) {
      var self = this;
      if (self.dropdownList && !item.$tabMenu) {
        var linked = {label: item.label, $link: item, $close: item.$close};
        self.dropdownList.add(linked, self.dropdownList.findOne("$link", before));
        // Select dropdown item if item is selected
        if (item.$selected) {
          self.dropdownList.deselectAll();
          self.dropdownList.select(linked);
        }
      }
      if (item.$selected) {
        self.deselectAll();
        self.select(item);
      }
    },
    _onTabDeleted: function (item) {
      if (this.dropdownList) {
        var linked = this.dropdownList.findOne("$link", item);
        if (linked) this.dropdownList.remove(linked);
      }
    },
    _onTabClick: function (item, node, e) {
      var self = this;
      if (item.$tabMenu) {
        self.dispatch("onTabMenuClick", [item, node, e]);
      }
      else if (self.contains(item)) {
        self.dispatch("onItemSelectionChanged", [item]);
      }
    },
    _onItemSelectionChanged: function (item) {
      var self = this;
      self.deselectAll();
      self.select(item);

      // Select item
      if (self.dropdownList) {
        var linked = self.dropdownList.findOne("$link", item);
        if (linked) {
          self.dropdownList.deselectAll();
          self.dropdownList.select(linked);
        }

        // Show active visible item
        self.updateFit();
      }
    },
    updateFit: function () {
      /**
       * Checks if the screen is wide enough to fit all components. Used with tab mode to allow for a responsive tab menu.
       */
      var self = this;
      self.each(function (item) {
        // Show everything for checking y-offset (keep invisible to avoid blink)
        addClass(this.$elements[item.id], "sp-invisible");
        // Update batch according to $selected state
        if (!item.$tabMenu) {
          item.batch = item.$selected ? "$selected" : undefined;
        }
      }, self);

      var offset, doResponsive;

      forInLoop(function (key, node) {
        if (offset && node.offsetTop != offset) {
          doResponsive = true;
          return false;
        }
        offset = node.offsetTop;
      }, self.$elements);

      self.each(function (item) {
        removeClass(this.$elements[item.id], "sp-invisible");
      }, self);

      if (doResponsive) {
        self.showBatch(["$menu", "$selected"]);
      }
      else {
        self.showBatch([undefined, "$selected"]);
      }
    },
    setActiveLabel: function (label) {
      /**
       * Sets the active item of the list based on the item's label property. This operates as a single-selection of an item. Returns true on success.
       * @param label The label value of an item.
       * @returns {boolean}
       */
      return this.setActive("label", label);
    },
    setActive: function (key, value) {
      /**
       * Set the active item of the list based on a property. This operates as a single-selection of an item. Returns true on success.
       * @returns {boolean}
       */
      this.deselectAll();
      var item = this.findOne(key, value);
      if (item) this.select(item);
      return !!item;
    },
    isSelected: function (item) {
      /**
       * Checks if an item is selected.
       * @param item An item of the component.
       */
      if (isString(item))
        item = this.getItem(item);
      return item.$selected;
    },
    getSelected: function () {
      /**
       * Return all selected items.
       * @returns {any[]} A list of selected items.
       */
      return this.findWhere('$selected', true);
    },
    select: function (item) {
      /**
       * Selects an active item of the list. This method will not deselect previously selected items.
       * @param item The object to select in the list.
       */
      if (isString(item))
        item = this.getItem(item);
      item.$selected = true;
      var node = this.getItemNode(item.id);
      if (node) addClass(node, this.activeClass);
    },
    deselect: function (item) {
      if (isString(item)) item = this.getItem(item);
      item.$selected = false;
      var node = this.getItemNode(item.id);
      if (node) removeClass(node, this.activeClass);
    },
    deselectAll: function () {
      /**
       * Deselects all items in the list, use this for single-selection lists.
       */
      this.each(function (item) {
        this.deselect(item);
      }, this);
    },
    closeItem: function (item) {
      /**
       * For tabs only, closes a tab item and removes it.
       * @param item The item to remove.
       * @dispatch onItemClose, onItemClosed, onItemSelectionChanged
       */
      var self = this;
      self.dispatch("onItemClose", [item]);

      if (self.isSelected(item)) {
        // Select the next tab that's not a tab menu.
        var nextItem = self.previous(item) || self.next(item);
        nextItem = nextItem && nextItem.$tabMenu ? self.next(item) : nextItem;

        if (nextItem && !nextItem.$tabMenu) {
          self.select(nextItem);
          self.dispatch("onItemSelectionChanged", [nextItem]);
        }
      }

      // Don't remove if is tab menu
      if (item && !item.$tabMenu) {
        self.remove(item);
      }

      self.dispatch("onItemClosed", [item]);
    },
    itemClass: function (item) {
      var cls = $definitions.stack.prototype.itemClass.call(this, item);
      if (item.$header) cls += " sp-nav-header";
      if (item.$divider) cls += " sp-nav-divider";
      return cls;
    },
    template: function (item) {
      if (item.$header) {
        return item.label;
      }
      else if (item.$divider) {
        return '';
      }
      else if (item.el) {
        return item
      }
      else {
        return exports.new(item);
      }
    },
    /**
     * Refreshes/rerenders a single item.
     * @param item The item to refresh.
     */
    refreshItem: function (item) {
      var el = this.getItemNode(item.id);
      if (el) {
        this.disposeItemNode(item.id);
        this.buildItemElement(el, item);
      }
    },
    buildItemElement: function (el, item) {
      var self = this;
      var templateArray = self.template(item);

      if (!isArray(templateArray)) {
        templateArray = [templateArray];
      }

      templateArray.forEach(function (itemTemplate) {
        if (isString(itemTemplate)) {
          if (containsHTML(itemTemplate)) {
            el.innerHTML = itemTemplate;
          } else {
            el.textContent = itemTemplate;
          }
        }
        else if (isUndefined(itemTemplate) || itemTemplate === null) {
          // Ignore undefined and nulls
        }
        else if (isElement(itemTemplate)) {
          el.appendChild(itemTemplate);
        }
        else if (itemTemplate.el) {
          el.appendChild(itemTemplate.el);
          self.$itemComponents[item.id] = itemTemplate;
          self.$components.push(itemTemplate);
        }
        else if (isObject(itemTemplate)) {
          var component = exports.new(itemTemplate, el);
          self.$itemComponents[itemTemplate.id] = component;
          self.$components.push(component);
        }
        else {
          fail('Unrecognized object returned by template function.', itemTemplate);
        }
      });
    },
    attachItemEvents: function (el, item) {
      if (item.header || item.divider) return;

      var self = this;
      var listenerId;
      var on = self.config.on || {};

      var $listeners = self.$itemListeners[item.id] = self.$itemListeners[item.id] || [];

      // Some components may depend on this firing, so always register it
      listenerId = addListener(el, "click", function (e) {
        if (!exports.$dragged) self.dispatch("onItemClick", [item, el, e]);
      });
      $listeners.push(listenerId);
      self.$listeners.push(listenerId);

      if (on.onItemContext) {
        listenerId = addListener(el, "contextmenu", function (e) {
          self.dispatch("onItemContext", [item, el, e]);
        });
        $listeners.push(listenerId);
        self.$listeners.push(listenerId);
      }

      if (self.droppable && item.$droppable !== false) {
        el.config = item;
        el.master = self;
        el.$droppable = true;
      }

      if (self.draggable && item.$draggable !== false) {
        setAttributes(el, {draggable: 'false'});

        listenerId = addListener(el, "dragstart", function (e) {
          preventEvent(e);
        }, self);

        $listeners.push(listenerId);
        self.$listeners.push(listenerId);

        if (exports.support.touch) {
          listenerId = addListener(el, "touchstart", onMouseDown, self, PASSIVE_EVENT);
          $listeners.push(listenerId);
          self.$listeners.push(listenerId);
        }

        listenerId = addListener(el, "mousedown", onMouseDown, self);
        $listeners.push(listenerId);
        self.$listeners.push(listenerId);

        function onMouseDown(e) {
          if (isFunction(this.draggable) && !this.draggable(e)) {
            return;
          }
          var ev = e.touches && e.touches[0] || e;
          var offset = el.getBoundingClientRect();
          exports._selectedForDrag = {
            target: this,
            config: item,
            node: el,
            originalPos: {top: el.style.top, left: el.style.left},
            pos: {x: ev.clientX, y: ev.clientY},
            mouseOffset: {
              left: offset.left - ev.clientX,
              top: offset.top - ev.clientY
            },
            event: e
          };
        }
      }
    }
  }, $definitions.stack);


  $definitions.tree = def({
    __name__: "tree",
    $defaults: {
      listStyle: "side",
      selectable: false,
      indentWidth: 15,
      dataTransfer: 'id',
      draggable: true,
      activeClass: ACTIVE_CLASS
    },
    __after__: function () {
      var self = this;
      self.addListener("onItemClick", self.toggle);
      self.addListener("onItemDragStart", self._dragStart);
      self.addListener("onItemDragOver", self._dragOver);
      self.addListener("onItemDragLeave", self._dragLeave);
      self.addListener("onItemDragEnd", self._dragEnd);
      self.addListener("onItemDrop", self._dragLeave);
    },
    _dragStart: function (item) {
      var $this = this;
      if (item.$branch)
        $this._hideChildren(item);
    },
    _dragEnd: function (item) {
      if (item.$branch && !item.$closed)
        this._showChildren(item);
    },
    _dragOver: function (item) {
      if (getConfig(this).droppable(item, exports.$dragged.config, exports.$dragged.node))
        addClass(this._addToDOM(item), this.activeClass);
    },
    _dragLeave: function (item) {
      removeClass(this._addToDOM(item), this.activeClass);
    },
    _showChildren: function (item) {
      forEachUntil(function (child, queue) {
        child.$parentClosed = false;
        child.$hidden = this._checkItemHidden(child);
        this._addToDOM(child);

        if (child.$branch && !child.$closed) {
          for (var i = 0; i < child.$children.length; i++) {
            queue.push(child.$children[i]);
          }
        }
        return true;
      }, item.$children, this);
    },
    _hideChildren: function (item) {
      forEachUntil(function (child, queue) {
        child.$parentClosed = true;
        child.$hidden = this._checkItemHidden(child);
        this._addToDOM(child);

        if (child.$branch) {
          for (var i = 0; i < child.$children.length; i++) {
            queue.push(child.$children[i]);
          }
        }
        return true;
      }, item.$children, this);
    },
    _checkParentClosed: function (item) {
      var parent = this.getItem(item.$parent);
      var closed = false;
      while (parent) {
        if (parent.$closed) {
          closed = true;
          break;
        } else {
          parent = this.getItem(parent.$parent);
        }
      }
      return closed;
    },
    orderAfter: function (self, other) {
      var isParent = self.$parent == other.id;
      var isNestedDeeper = self.$depth < other.$depth;
      var sameParent = self.$parent == other.$parent;
      return (isParent || isNestedDeeper || (sameParent && (
        this.sortValue(self) > this.sortValue(other) && self.$branch == other.$branch || self.$branch < other.$branch)));
    },
    sortValue: function (item) {
      return item.label.toLowerCase();
    },
    droppable: function (item) {
      return item.$branch;
    },
    beforeSetData: function (data) {
      var itemCache = {};
      data.forEach(function (item) {
        if (item.id) itemCache[item.id] = item;
      });
      data.forEach(function (item) {
        var parentId = item.$parent;
        if (parentId && itemCache[parentId])
          itemCache[parentId].$branch = true;
      });
      return data;
    },
    add: function (obj) {
      /**
       * Add a child to the tree.
       * @param item A child of the tree. The parent id of the object should be specified in its $parent property.
       * @returns {string} The object id after adding.
       */
      obj.$branch = !!obj.$branch; // Convert to boolean
      if (obj.$branch) obj.$children = [];

      var self = this;
      var parent;
      if (!obj.$parent) {
        obj.$depth = 0;
      }
      else {
        parent = self.getItem(obj.$parent);
        obj.$parentClosed = self._checkParentClosed(obj);
        obj.$depth = parent.$depth + 1;
        obj.$hidden = this._checkItemHidden(obj);
        parent.$branch = true;
        parent.$children = parent.$children || [];
        parent.$children.push(obj);
      }
      var refChild = self.findLast(function (other) {
        return self.orderAfter(obj, other);
      }, parent);
      return self.insertAfter(obj, refChild);
    },
    remove: function (obj) {
      /**
       * Removes a child of the tree. If the child is branch, removes all branch children as well.
       * @param item A child of the tree.
       */
      if (obj.$branch) {
        while (obj.$children.length > 0) {
          this.remove(obj.$children[0]);
        }
      }
      exports.LinkedList.remove.call(this, obj);
    },
    template: function (config) {
      return interpolate(
        '<a><i class="sp-icon-{{icon}}" style="margin-left: {{margin}}px">' +
        '</i><span class="sp-margin-small-left">{{label}}</span></a>',
        {
          icon: getChevron(config),
          label: config.label,
          margin: config.$depth * this.indentWidth
        });

      function getChevron (item) {
        if (item.$children && item.$children.length > 0) {
          return item.$closed ? 'chevron-right-16' : 'chevron-down-16';
        } else {
          return 'blank';
        }
      }
    },
    open: function (item) {
      /**
       * Expand a specific branch of the tree.
       * @param item A child branch of the tree.
       * @dispatch onOpen, onOpened
       */
      if (!item.$branch || !item.$closed) return;

      var self = this;
      self.dispatch("onOpen", [item.id]);

	    item.$closed = false;

      var node = self.getItemNode(item.id);
      if (node) node.parentNode.replaceChild(self.createItemElement(item), node);

      self._showChildren(item);

      item.$hidden = this._checkItemHidden(item);

      self.dispatch("onOpened", [item.id]);

      if (item.$parent)
        self.open(item.$parent);
    },
    close: function (item) {
      /**
       * Collapse a specific branch of the tree.
       * @param item A child branch of the tree.
       * @dispatch onClose, onClosed
       */
      if (!item.$branch || item.$closed) return;

      var self = this;
      self.dispatch("onClose", [item.id]);

      item.$closed = true;
      var node = self.getItemNode(item.id);
      if (node) node.parentNode.replaceChild(self.createItemElement(item), node);

      self._hideChildren(item);

      item.$hidden = this._checkItemHidden(item);

      self.dispatch("onClosed", [item.id]);
    },
    openAll: function () {
      /**
       * Expand all children of the tree component.
       * @dispatch onOpen, onOpened
       */
      this.each(function (obj) {
        if (obj.$branch)
          this.open(obj.id);
      });
    },
    closeAll: function () {
      /**
       * Collapse all children of the tree component.
       * @dispatch onClose, onClosed
       */
      this.each(function (obj) {
        if (obj.$branch)
          this.close(obj.id);
      });
    },
    isBranchOpen: function (item) {
      /**
       * Checks if a specific branch of the tree is open.
       * @param item A child branch of the tree.
       * @returns {boolean}
       */
      if (item.$branch && !item.$closed)
        return this.isBranchOpen(item.$parent);
      return false;
    },
    toggle: function (item) {
      /**
       * Toggles a branch child of the tree. If the child is not a branch, ignores it.
       * @param item A child branch of the tree.
       * @dispatch onClose, onClosed, onOpen, onOpened
       */
      if (item.$branch) {
        if (item.$closed)
          this.open(item);
        else
          this.close(item);
      }
    }
  }, $definitions.list);


  $definitions.table = def({
    __name__: "table",
    $defaults: {
      tagClass: "sp-table",
      htmlTag: "TABLE",
      itemTag: "TR",
      flex: false,
      flexSize: "",
      listStyle: ""
    },
    __init__: function () {
      var self = this;
      self.header = createElement("THEAD");
      self.footer = createElement("TFOOT");
      self.body = createElement("TBODY");

      // Make Chrome wrapping behavior same as firefox
      self.body.style.wordBreak = "break-word";

      self.el.appendChild(self.header);
      self.el.appendChild(self.footer);
      self.el.appendChild(self.body);
    },
    $setters: extend(classSetters({
        tableStyle: prefixClassOptions({
          hover: "",
          striped: "",
          condensed: "",
          flat: "",
          "": ""
        }, 'sp-table-', true)
      }),
      {
        columns: function (value) {
          assertPropertyValidator(value, 'columns', isArray);
          value.forEach(function (item) {
            if (isUndefined(item.template) && item.name) {
              item.template = exports.selectors.property(item.name);
            }
          });
        },
        header: function (value) {
          if (value) {
            var self = this;
            if (isObject(value)) {
              var column = self.config.columns.filter(function (item) { return  item.name === value.name} );
              assertPropertyValidator(column, 'column name ' + value.name, isDefined);
              column.header = value.header;
            }
            var columns = self.config.columns;
            var headersHTML = "";

            columns.forEach(function (column) {
              headersHTML += column.align ?
                interpolate("<th style='text-align: {{align}}'>{{text}}</th>", {
                  align: column.align,
                  text: column.header
                })
                : "<th>" + column.header + "</th>";
            });

            self.header.innerHTML = "<tr>" + headersHTML + "</tr>";
          }
        },
        footer: function (value) {
          if (value) {
            var self = this;
            if (isObject(value)) {
              var column = self.config.columns.filter(function (item) { return  item.name === value.name} );
              assertPropertyValidator(column, 'column name ' + value.name, isDefined);
              column.footer = value.footer;
            }
            var footers = pluck(self.config.columns, "footer");
            self.footer.innerHTML = "<tr><td>" + footers.join("</td><td>") + "</td></tr>";
          }
        },
        caption: function (value) {
          var self = this;
          self.caption = createElement("CAPTION");
          self.caption.innerHTML = value;
          self.el.appendChild(self.caption);
        }
      }
    ),
    template: function (item) {
      var self = this;
      return self.config.columns.map(function (column) {
        var td = createElement("TD", {class: column.$cls ? classString(column.$cls) : ""});

        if (column.align)
          td.style.textAlign = column.align;

        template(column.template, item, self, td);
        return td;
      });
    },
    containerElement: function () {
      return this.body;
    }
  }, $definitions.list);


  $definitions.resizer = def({
    __name__: 'resizer',
    $defaults: {
      tagClass: 'sp-resizer',
      direction: 'x',
      minValue: 0,
      maxValue: Number.MAX_VALUE
    },
    $setters: classSetters({
      direction: {
        x: "x",
        y: "y"
      }
    }),
    __after__: function (config) {
      var $this = this;
      var el = $this.el
      var dragHandle = createElement('div', {class: 'sp-hidden sp-resizer-drag-handle'});
      var dragBackdrop = createElement('div', {class: 'sp-hidden sp-resizer-drag-backdrop'});
      var body = document.body
      $this.dragHandle = dragHandle;
      $this.dragBackdrop = dragBackdrop;
      $this.updateDragHandlePosition = updateDragHandlePosition
      el.appendChild(dragHandle);
      el.appendChild(dragBackdrop);

      addListener(el, 'mousedown', mouseDown);
      addListener(body, 'mousemove', mouseMove);
      addListener(body, 'touchstart', mouseDown, $this, {passive: false});
      addListener(body, 'touchmove', mouseMove);

      function transformTouchToMouse(touchEvent) {
        if (touchEvent.touches && touchEvent.changedTouches) {
          var firstTouch = touchEvent.touches[0] || touchEvent.changedTouches[0];
          if (firstTouch) {
            touchEvent.clientX = firstTouch.clientX
            touchEvent.clientY = firstTouch.clientY
          }
        }
      }

      function mouseDown(e) {
        if (!$this.dragging && e.target === el) {
          preventEvent(e)  // Stop Chrome changing to globe icon
          exports.$activeResizer = $this;
          updateDragHandlePosition(e);
          removeClass(dragHandle, 'sp-hidden');
          removeClass(dragBackdrop, 'sp-hidden');
          var parentRect = $this.el.parentNode.getBoundingClientRect();
          extend(dragBackdrop.style, {
            left: parentRect.left + 'px',
            width: parentRect.width + 'px',
            height: parentRect.height + 'px',
            top: parentRect.top + 'px'
          });
          $this.dragging = true;
        }
      }

      function mouseMove(e) {
        if ($this.dragging) {
          updateDragHandlePosition(e);
        }
      }

      function updateDragHandlePosition (event) {
        transformTouchToMouse(event)

        var isDirectionEqualX = config.direction == 'x';
        var el = $this.el;

        var clientRect = el.getBoundingClientRect();
        var parentRect = el.parentNode.getBoundingClientRect();

        var minValue = config.minValue;
        minValue = isFunction(minValue) ? minValue() : minValue;

        var maxValue = config.maxValue;
        maxValue = isFunction(maxValue) ? maxValue() : maxValue;
        maxValue = Math.min(maxValue, (isDirectionEqualX ? parentRect.width : parentRect.height));

        var value = isDirectionEqualX ? event.clientX - parentRect.left: event.clientY - parentRect.top;

        if (minValue >= maxValue) value = 0;
        else if (value < minValue) value = minValue;
        else if (value > maxValue) value = maxValue;

        var relativeValue = value - (isDirectionEqualX ?
          clientRect.left - parentRect.left : clientRect.top - parentRect.top);
        dragHandle.style = (isDirectionEqualX ? 'left:' : 'top:') + relativeValue + 'px';

        return value;
      }
    }
  }, $definitions.element);


  $definitions.spacer = def({
    __name__: 'spacer',
    __init__: function (config) {
      var self = this;
      self.element = self.el = createElement("DIV");
      self.config = config;
      var width = (isNumber(config.width) ? config.width + 'px' : config.width) || 'auto';
      var height = (isNumber(config.height) ? config.height + 'px' : config.height) || 'auto';
      addClass(self.el, config.cls);
      extend(self.el.style, {minWidth: width, minHeight: height});
    }
  });


  $definitions.scroller = def({
    __name__: 'scroller',
    $defaults: {
      tagClass: 'sp-scroller-container',
      scrollDirection: 'y',
      nativeScroll: false,
      flex: true
    },
    __init__: function (config) {
      var $this = this;
      var el = $this.el;
      var scrollDirection = $this.scrollDirection = config.scrollDirection;

      $this.wrapper = createElement('DIV');
      addClass($this.wrapper, 'sp-scroller-wrapper');
      el.appendChild($this.wrapper);

      $this.$content = exports.new({
        cls: ["sp-scroller-content", scrollDirection],
        cells: config.cells,
        flexLayout: scrollDirection == 'y' ? 'column' : 'row'
      }, $this.wrapper);
      $this.content = $this.$content.el;

      $this.content.addEventListener('scroll', function (e) {
        if (exports.$scrollState == 'start') exports.$scrollState = 'scroll';
        if (!config.nativeScroll) {
          $this.moveBar();
        }
        $this.dispatch("onScroll", [config, $this.content, e]);
      });

      if (!config.nativeScroll) {
        $this.bar = createElement('DIV');
        addClass($this.bar, 'sp-scroller-bar ' + scrollDirection);
        el.appendChild($this.bar);

        $windowListeners.resize.push($this.moveBar.bind($this));
        $this.content.addEventListener('mouseenter', $this.moveBar.bind($this));
      }
    },

    __after__: function (config) {
      if (!config.nativeScroll) {
        this.initScrollbar(this.bar, this);
        this.moveBar();
      }
    },

    initScrollbar: function (el, context) {
      var lastPageY, lastPageX;

      el.addEventListener('mousedown', function(e) {
        lastPageY = e.pageY;
        lastPageX = e.pageX;
        addClass(el, 'sp-scroller-grabbed');
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stop);
        return false;
      });

      function drag(e) {
        var delta = context.scrollDirection == 'y' ? e.pageY - lastPageY : e.pageX - lastPageX;
        lastPageY = e.pageY;
        lastPageX = e.pageX;

        raf(function() {
          if (context.scrollDirection == 'y') {
            context.content.scrollTop += delta / context.scrollRatio;
          }
          else if ((context.scrollDirection == 'x')) {
            context.content.scrollLeft += delta / context.scrollRatio;
          }
        });
      }

      function stop() {
        removeClass(el, 'sp-scroller-grabbed');
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stop);
      }
    },

    moveBar: function(e) {
      var $this = this;
      var totalHeight = $this.content.scrollHeight || 1,
          ownHeight = $this.content.clientHeight || 1,
          totalWidth = $this.content.scrollWidth || 1,
          ownWidth = $this.content.clientWidth || 1;
      var isRtl = $this.direction === 'rtl';

      $this.scrollRatio = $this.scrollDirection == 'y' ? ownHeight / totalHeight : ownWidth / totalWidth;

      raf(function() {
        // Hide scrollbar if no scrolling is possible
        if($this.scrollRatio >= 1) {
          addClass($this.bar, 'sp-hidden');
        } else {
          removeClass($this.bar, 'sp-hidden');

          if ($this.scrollDirection == 'y') {
            $this.bar.style.cssText = 'height:' + Math.max($this.scrollRatio * 100, 10) + '%; top:' +
              ($this.content.scrollTop / totalHeight ) * 100 + '%;' +
              (isRtl ? '' : 'right:0px;');
          }
          else if ($this.scrollDirection == 'x') {
            $this.bar.style.cssText = 'width:' + Math.max($this.scrollRatio * 100, 10) + '%; left:' +
              ($this.content.scrollLeft / totalWidth ) * 100 + '%;';
          }
        }
      });
    },

    showBatch: function (batch) {
      this.$content.showBatch(batch);
    }
  }, $definitions.element);


  $definitions.select = def({
    __name__: "select",
    $defaults: {
      htmlTag: "SELECT",
      itemTag: "OPTION",
      groupTag: "OPTGROUP",
      tagClass: "sp-select",
      flex: false,
      flexSize: "",
      listStyle: ""
    },
    $setters: extend(
      classSetters({
        selectStyle: prefixClassOptions({
          line: '',
          input: '',
          "": ""
        }, 'sp-select-', true),
        size: prefixClassOptions({
          mini: "",
          small: "",
          large: "",
          "": ""
        }, 'sp-select-', true)
      }),
      {
        multiple: function (value) {
          setAttributes(this.getFormControl(), value ? {multiple: value} : {});
        }
      }
    ),
    __init__: function () {
      this.optgroups = {};
    },
    select: function (item) {
      /**
       * Selects an item in the select component.
       * @param item Object to select.
       */
      var self = this;
      if (isString(item))
        item = self.getItem(item);
      item.$selected = true;
      self.getFormControl().selectedIndex = self.indexOf(item);
    },
    deselectAll: function () {
      // Do nothing, invalid for select component.
    },
    setValue: function (value) {
      /**
       * Sets the selected value of the select component.
       * @param value
       * @returns {boolean} True if value exist in options, false otherwise.
       */
      return this.setActive('value', value);
    },
    template: function (item) {
      return item.label;
    },
    itemElement: function (item) {
      var attributes = {value: item.value, class: this.itemClass(item)};
      if (item.selected) attributes.selected = item.selected;
      return createElement(this.itemTagString(item), attributes);
    },
    containerElement: function (item) {
      var self = this;
      var optgroup = item.optgroup;
      if (optgroup) {
        var optGroupEl = self.optgroups[optgroup];
        if (!optGroupEl) {
          optGroupEl = createElement(self.config.groupTag, {label: optgroup});
          self.optgroups[optgroup] = optGroupEl;
          self.el.appendChild(optGroupEl);
        }
        return optGroupEl;
      } else {
        return self.el;
      }
    }
  }, exports.ChangeEvent, exports.FormControl, $definitions.list);


  $definitions.form = def({
    __name__: "form",
    $defaults: {
      htmlTag: "FORM",
      tagClass: "sp-form",
      formStyle: "stacked",
      fieldset: []
    },
    $events: {
      submit: {dispatch: 'onSubmit', callback: returnTrue}
    },
    $setters: extend(
      classSetters({
        formStyle: prefixClassOptions({
          stacked: "",
          horizontal: "",
          line: "",
          "": ""
        }, 'sp-form-', true)
      }),
      {
        fieldset: function (value) {
          this.set('fieldsets', [{
            view: "fieldset",
            formStyle: getConfig(this).formStyle,
            data: value
          }]);
        },
        fieldsets: function (value) {
          assertPropertyValidator(value, 'fieldsets', isArray);
          var self = this;
          var fieldsetOptions = self.config.fieldsetOptions || {};
          value.forEach(function (config) {
            var ui = exports.new(extend(config, fieldsetOptions), self.el);
            self.$fieldsets.push(ui);
            self.$components.push(ui);
          });
        }
      }),
    __init__: function () {
      this.$fieldsets = [];
    },
    clear: function () {
      /**
       * Clear all values from the form.
       */
      this.$fieldsets.forEach(function (fs) {
        fs.clear();
      });
    },
    enable: function () {
      /**
       * Enable the fieldset of the form.
       */
      this.$fieldsets.forEach(function (fs) {
        fs.enable();
      });
    },
    disable: function () {
      /**
       * Disable the fieldset of the form.
       */
      this.$fieldsets.forEach(function (fs) {
        fs.disable();
      });
    },
    getValues: function () {
      /**
       * Gets the values of the form's components.
       * @returns {any} Object of key values of the form.
       */
      var result = {};
      this.$fieldsets.forEach(function (fs) {
        extend(result, fs.getValues());
      });
      return result;
    },
    setValues: function (values) {
      /**
       * Sets the values for the form components. The keys of the object correspond with the 'name' of child components.
       * @param values Object of names and values.
       */
      this.$fieldsets.forEach(function (fs) {
        fs.setValues(values);
      });
    },
    getFieldset: function (index) {
      /**
       * Retrieves the fieldset component of the form.
       * @param index The index of the fieldset in the form, default 0.
       * @returns {Component}
       */
      return this.$fieldsets[index || 0];
    }
  }, $definitions.element);


  $definitions.fieldset = def({
    __name__: "fieldset",
    $defaults: {
      htmlTag: "FIELDSET",
      itemTag: "DIV",
      itemTagClass: "sp-form-row"
    },
    $setters: classSetters({
      formStyle: prefixClassOptions({
        stacked: "",
        horizontal: "",
        line: "",
        "": ""
      }, 'sp-form-', true)
    }),
    itemTagString: function (item) {
      return item.$title ? "LEGEND" : getConfig(this).itemTag;
    },
    buildItemElement: function (el, item) {
      if (item.$title) {
        el.innerHTML = item.label;
      }
      else {
        var component = exports.new(item, function (componentElement) {
          if (!item.$inline) {
            var controlContainer = createElement("DIV", {class: "sp-form-controls"});
            controlContainer.appendChild(componentElement);
            el.appendChild(controlContainer);
          }
          else {
            el.appendChild(componentElement);
          }
        });
        this.$itemComponents[item.id] = component;
        this.$components.push(component);

        if (item.formLabel || item.formLabelAttributes) {
          var attrs = {class: "sp-form-label", for: item.id}
          if (item.formLabelAttributes) extend(attrs, item.formLabelAttributes)
          var label = component.label = createElement("LABEL", attrs);
          if (item.formLabel) label.innerHTML = item.formLabel;
          if (item.$inline) addClass(label, "sp-display-inline");
          el.insertBefore(label, el.firstChild);
        }
      }
    },
    clear: function () {
      /**
       * Clear all values from the fieldset.
       */
      this.each(function (item) {
        if (item.name) {
          $$(item.id).reset();
        }
      });
    },
    enable: function () {
      /**
       * Enables the fieldset.
       */
      this.each(function (item) {
        if (item.name || item.view == "button") {
          $$(item.id).enable();
        }
      });
    },
    disable: function () {
      /**
       * Disables the fieldset. (Works by disabling each child.)
       */
      this.each(function (item) {
        if (item.name || item.view == "button") {
          $$(item.id).disable();
        }
      });
    },
    getValues: function () {
      /**
       * Gets the values of the form's components.
       * @returns {any} Object of key values of the fieldset.
       */
      var results = {};

      var unprocessed = this.$components.slice();

      // Extract all children with `name` attributes, including nested flexgrid children.
      var ui;
      while (unprocessed.length > 0) {
        ui = unprocessed.pop();
        if (ui && ui.config.name) {
          results[ui.config.name] = ui.getValue();
        }
        else if (ui.$components) {
          unprocessed = unprocessed.concat(ui.$components);
        }
      }

      return results;
    },
    setValues: function (config) {
      /**
       * Sets the values for the form components. The keys of the object correspond with the 'name' of child components.
       * @param values Object of names and values.
       */
      config = config || {};
      var unprocessed = this.$components.slice();

      var ui;
      while (unprocessed.length > 0) {
        ui = unprocessed.pop();
        if (ui && isDefined(config[ui.config.name])) {
          ui.setValue(config[ui.config.name]);
        }
        else if (ui.$components) {
          unprocessed = unprocessed.concat(ui.$components);
        }
      }
    }
  }, $definitions.stack);

  function DrawerSwipe(element, options) {
    var $this = this;
    $this.percent = options.startPos;
    $this.lastTouch = null;
    $this._buffer = [];
    $this._bufferLength = 8;
    $this.closeInProgress = false;
    // Friction coefficient
    $this.friction = options.friction || 0.015;
    // Threshold to aggregate speed
    $this.speedTimeDeltaThreshold = options.speedTimeDeltaThreshold || 160;
    $this.minimumSpeed = options.minimumSpeed || 20;
    $this.direction = options.direction;
    $this.minThreshold = options.minThreshold;
    $this.maxThreshold = options.maxThreshold;
    $this.posThreshold = options.posThreshold;
    $this.minPosThreshold = 8;
    $this.minTimeThreshold = 120;
    $this.initialTime = 0;
    $this.beganPan = false;
    $this.getWidth = function () { return 0 };
    $this.onPanStart = function () { return true };
    $this.onPan = function () { return true };
    $this.onAnimate = function () { return true };
    $this.onSwipe = function () { return true };
    $this.onCompleteSwipe = function () {};
    $this.applyChanges = function () {};

    element.addEventListener("touchstart", function (e) {
      if ($this.onPanStart(e)) {
        var firstTouch = e.touches[0];
        $this.initialTime = Date.now();
        $this.addBuffer(firstTouch.screenX, firstTouch.screenY);
      }
    }, PASSIVE_EVENT);

    element.addEventListener("touchmove", function (e) {
      if ($this.onPanStart(e)) {
        var firstTouch = e.touches[0];
        if ($this.lastTouch) {
          var deltaX = firstTouch.screenX - $this.lastTouch.screenX;
          var beginPan = $this.pan(deltaX);
          if (!$this.beganPan && beginPan) {
            $this.beganPan = true;
          }
        }
        $this.addBuffer(firstTouch.screenX, firstTouch.screenY);
        $this.lastTouch = firstTouch;
      }
    }, PASSIVE_EVENT);

    element.addEventListener("touchend", function (e) {
      $this.lastTouch = null;
      var buffer = $this._buffer;
      if ($this.onPanStart(e) && buffer.length) {
        var i = 1;
        var averageSpeed = 0;
        var newest = buffer[0];
        var initialTime = newest.t;
        var initialX = newest.x;
        var initialY = newest.y;
        var lastSpeed = 0;
        var prev;
        while (i < buffer.length) {
          prev = buffer[i];
          var dt = initialTime - prev.t;
          if (dt < $this.speedTimeDeltaThreshold) {
            var dx = initialX - prev.x;
            var dy = initialY - prev.y;
            // Ensure going in the same direction
            if (lastSpeed*dx >= 0) {
              // Angle between prev and current pos
              var angle = Math.abs(Math.atan2(dy, dx));
              if (angle < Math.PI/7) {
                // Positive direction
                lastSpeed = dx/dt;
                averageSpeed = (initialX - prev.x)/(initialTime - prev.t);
              } else if (angle > Math.PI*6/7) {
                // Negative direction
                lastSpeed = dx/dt;
                averageSpeed = (initialX - prev.x)/(initialTime - prev.t);
              }
            } else {
              break;
            }
          } else {
            break;
          }
          i++;
        }
        buffer.length = 0;

        var stoppingDistance = averageSpeed*Math.abs(averageSpeed)/$this.friction;
        var deltaPercent = Math.max(-100, Math.min(100, 100*stoppingDistance/$this.getWidth()));
        var finalPercent = $this.percent + deltaPercent;
        var leftToRight = $this.direction & DrawerSwipe.Direction.LTR;
        var rightToLeft = $this.direction & DrawerSwipe.Direction.RTL;

        var closeToRight = leftToRight && finalPercent >= $this.posThreshold;
        var closeToLeft = rightToLeft && finalPercent <= $this.posThreshold;

        if ($this.onSwipe() && (closeToRight || closeToLeft)) {
          $this.animate({
            maxValue: closeToRight && (deltaPercent + 0.01),
            minValue: closeToLeft && (deltaPercent + 0.01)
          });
        }
        else if ($this.beganPan) {
          if ((leftToRight && !closeToRight) ||
              (rightToLeft && !closeToLeft)) {
            $this.animate(null, true);
          }
        }
      }
    });
  };

  DrawerSwipe.prototype = {
    addBuffer: function (x, y) {
      var buffer = this._buffer;
      var bufferLength = this._bufferLength;
      if (buffer.unshift({
        x: x, y: y,
        t: Date.now()
      }) > bufferLength) buffer.length = bufferLength;
    },

    pan: function (distanceX) {
      var $this = this;

      if ($this.closeInProgress) {
        return;
      }
      else if (!$this.onPan(distanceX)) {
        $this.reset();
        return;
      }

      var width = $this.getWidth();
      var leftToRight = $this.direction & DrawerSwipe.Direction.LTR;
      var rightToLeft = $this.direction & DrawerSwipe.Direction.RTL;
      var percent = $this.percent + (distanceX / width * 100);
      var maxPercent = $this.maxThreshold;
      var minPercent = $this.minThreshold;

      if (percent >= maxPercent) percent = maxPercent;
      else if (percent <= minPercent) percent = minPercent;

      var minTimeThresholdMet = (Date.now() - $this.initialTime) > $this.minTimeThreshold;
      var beganPan = false;
      if (minTimeThresholdMet &&
          Math.abs(percent - minPercent) > $this.minPosThreshold &&
          Math.abs(percent - maxPercent) > $this.minPosThreshold) {
        if ((leftToRight && percent >= maxPercent) ||
            (rightToLeft && percent <= minPercent)) {
          $this.animate();
        } else {
          beganPan = true;
          $this.applyChanges(percent);
        }
      }
      $this.percent = percent;
      return beganPan;
    },

    animate: function (speed, reverse, restart) {
      var $this = this;
      var minSpeedPercent = $this.minimumSpeed/$this.getWidth() * 100;

      if (restart) {
        $this.closeInProgress = false;
      }

      if (!$this.closeInProgress && $this.onAnimate()) {
        if (exports.support.animation && raf) {
          $this.closeInProgress = true;
          raf(update);
        }
        else {
          if (!reverse) {
            $this.onCompleteSwipe();
          }
          $this.reset();
        }
      }

      function update() {
        var deltaPercent = 0;
        var leftToRight = $this.direction & DrawerSwipe.Direction.LTR;
        var rightToLeft = $this.direction & DrawerSwipe.Direction.RTL;
        var denom = 0.075/$this.friction;

        if (speed && speed.maxValue) {
          deltaPercent = Math.max(speed.maxValue/denom, minSpeedPercent);
        }
        else if (speed && speed.minValue) {
          deltaPercent = Math.min(speed.minValue/denom, -minSpeedPercent);
        }
        else if (leftToRight) {
          deltaPercent = minSpeedPercent * (reverse ? -1 : 1);
        }
        else if (rightToLeft) {
          deltaPercent = -minSpeedPercent * (reverse ? -1 : 1);
        }
        $this.percent += deltaPercent;
        var percent = $this.percent;

        if (percent >= $this.maxThreshold) percent = $this.maxThreshold;
        else if (percent <= $this.minThreshold) percent = $this.minThreshold;
        $this.percent = percent;
        $this.applyChanges(percent);

        if ((leftToRight && percent >= $this.maxThreshold) ||
            (rightToLeft && percent <= $this.minThreshold)) {
          $this.reset();
          $this.onCompleteSwipe();
        }
        else if (
          (leftToRight && percent === $this.minThreshold) ||
          (rightToLeft && percent === $this.maxThreshold)) {
          $this.reset();
        }
        else if ($this.onAnimate()) {
          raf(update);
        }
        else {
          $this.reset();
        }
      }
    },

    reset: function () {
      this.beganPan = false;
      this.closeInProgress = false;
    }
  }

  DrawerSwipe.Direction = {
    LEFT_TO_RIGHT: 1,
    LTR: 1,
    RIGHT_TO_LEFT: 2,
    RTL: 2,
    BOTH: 3
  }

  window.$$ = $$;

  return exports;
})({}, window, window.UIkit);

window.UI.VERSION = '0.3.6';
