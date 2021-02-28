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
