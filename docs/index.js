window.onload = function () {
  handleHashChange();
  UI.removeClass(document.body, "uk-hidden");
  $$('navBar').set('sticky', true);
};
window.onhashchange = handleHashChange;


document.body.onscroll = function () {
  var navElem = $$('navBar').el;
  if (document.documentElement.scrollTop > 5) {
    UI.addClass(navElem, 'uk-box-shadow');
    UI.addClass(navElem, 'x-active');
  } else {
    UI.removeClass(navElem, 'uk-box-shadow');
    UI.removeClass(navElem, 'x-active');

  }
};


var Model = {
  containers: {
    input: wrapInForm,
    autocomplete: wrapInForm,
    select: wrapInForm,
    fieldset: function (fieldset) {
      return {
        view: 'form',
        fieldsets: [fieldset]
      }
    },
    dropdown: function (dropdown) {
      return {
        view: 'button',
        label: 'Show dropdown',
        type: 'primary',
        dropdown: dropdown.dropdown
      }
    },
    modal: function (modal) {
      return {
        cells: [
          {
            view: 'button',
            label: 'Show modal',
            type: 'primary',
            on: {
              onClick: function () {
                $$(modal.id).open();
              }
            }
          },
          modal
        ]
      }
    }
  },
  aliases: {
    breadcrumb: 'list',
    card: 'element',
    tab: 'list'
  },
  components: {
    autocomplete: function () {
      return {
        flexLayout: "column",
        cells: [
          {
            view: "label",
            label: "Basic Autocomplete",
            htmlTag: "H6",
            margin: "bottom"
          },
          {
            view: 'autocomplete',
            placeholder: 'Type something...',
            sources: [
              {value: 'Hard work pays off in the future. Laziness pays off now.'},
              {value: 'A dog is a dog unless he is facing you. Then he is Mr. Dog.'},
              {value: 'Experience is something you get just after you need it.'},
              {value: "If it weren't for the last minute, nothing would get done."},
              {value: 'Be nice to other people; they outnumber you 5.5 billion to one.'},
              {value: 'Anything free is worth the price.'},
              {value: 'A sine curve goes off to infinity, or at least to the end of the blackboard.'}
            ]
          },
          {
            view: "label",
            badge: "primary",
            label: 'Type "free" or "nice" for example.',
            margin: "top right"
          }
        ]
      }
    },
    breadcrumb: function () {
      return {
        view: 'list',
        listStyle: 'breadcrumb',
        data: [
          {view: 'link', label: 'Root'},
          {view: 'link', label: 'Parent'},
          {view: 'link', label: 'Child'}
        ]
      }
    },
    button: function () {
      return {
        flex: false,
        cells: [
          {
            view: 'button',
            size: 'small',
            label: 'Small Primary',
            color: 'primary'
          },
          {
            view: 'button',
            label: 'Default',
            margin: 'x'
          },
          {
            view: 'button',
            label: 'Muted',
            color: 'muted',
            margin: 'x'
          },
          {
            view: 'button',
            label: 'Success',
            color: 'success',
            margin: 'x'
          },
          {
            view: 'button',
            label: 'Muted Button',
            link: false,
            color: 'muted',
            margin: 'x'
          },
          {
            view: 'button',
            size: 'large',
            label: 'Large Button',
            link: false,
            color: 'danger'
          }
        ]
      }
    },
    card: function () {
      return {
        flexLayout: 'column',
        cells: [
          {
            flexSpace: 'between',
            margin: 'bottom-lg',
            cells: [
              {
                view: 'label',
                flexSize: 'flex',
                label: 'Default Card',
                card: true
              },
              {
                view: 'label',
                flexSize: 'flex',
                label: 'Primary Card',
                card: 'primary',
                margin: 'left-lg'
              }
            ]
          },
          {
            flexLayout: 'column',
            card: true,
            cells: [
              {
                view: 'label',
                card: 'badge',
                badge: 'danger',
                label: 'Awesome'
              },
              {
                view: 'label',
                htmlTag: 'h5',
                label: 'Card with Header',
                card: 'header title'
              },
              {
                view: 'label',
                label: 'Primary Card',
                card: 'body'
              }
            ]
          }
        ]
      }
    },
    dropdown: function () {
      return {
        dropdown: {
          view: 'list',
          data: [
            {$header: true, label: 'Random'},
            {view: 'link', label: 'Curl into a furry donut.'},
            {view: 'link', label: 'Look into a furry donut.'},
            {view: 'link', label: 'Age into a furry donut.'},
            {view: 'link', label: 'Walk into a furry donut.'},
            {view: 'link', label: 'Elope into a furry donut.'},
            {view: 'link', label: 'Dig into a furry donut.'}
          ]
        }
      }
    },
    element: function () {
      return {
        template: '<p>{{action}} into a furry donut.</p>',
        action: 'Curl'
      }
    },
    fieldset: function () {
      return {
        view: 'fieldset',
        data: [
          {formLabel: 'User', view: 'input', value: 'Hello'},
          {formLabel: 'Password', view: 'input', type: 'password', placeholder: 'Password'},
          {view: 'button', type: 'primary', label: 'Login', inputWidth: 'medium', margin: 'top'}
        ]
      }
    },
    form: function () {
      return {
        view: 'form',
        fieldset: [
          {formLabel: 'User', view: 'input', value: 'Hello'},
          {formLabel: 'Password', view: 'input', type: 'password', placeholder: 'Password'},
          {view: 'button', type: 'primary', label: 'Login', inputWidth: 'medium', margin: 'top'}
        ]
      }
    },
    flexgrid: function () {
      return {
        cells: [
          {
            view: 'list',
            listStyle: 'side',
            data: [
              {view: 'link', label: 'Curl into a furry donut.'},
              {view: 'link', label: 'Look into a furry donut.'},
              {view: 'link', label: 'Age into a furry donut.'},
              {view: 'link', label: 'Walk into a furry donut.'},
              {view: 'link', label: 'Elope into a furry donut.'},
              {view: 'link', label: 'Dig into a furry donut.'}
            ]
          },
          {
            view: 'form',
            margin: 'left-lg',
            fieldset: [
              {formLabel: 'User', view: 'input', value: 'Hello'},
              {formLabel: 'Password', view: 'input', type: 'password', placeholder: 'Password'},
              {view: 'button', type: 'primary', label: 'Login', inputWidth: 'medium', margin: 'top'}
            ]
          }
        ]
      }
    },
    icon: function () {
      return {
        flexSpace: 'between',
        cells: [
          'cog', 'bolt', 'heart', 'instagram', 'reply', 'close', 'cloud-upload', 'cloud-download',
          'more', 'more-vertical', 'plus', 'minus', 'image'
        ].map(function (icon) {
          return {
            view: 'icon',
            icon: 'uk-icon-' + icon,
            iconStyle: 'medium'
          }
        })
      }
    },
    image: function () {
      return {
        view: 'image',
        src: "logo.svg"
      }
    },
    input: function () {
      return {
        flexLayout: 'column',
        cells: [
          {
            view: 'input',
            placeholder: 'Default Size'
          },
          {
            view: 'input',
            size: 'small',
            placeholder: 'Small Size',
            margin: 'y'
          },
          {
            view: 'input',
            size: 'large',
            placeholder: 'Large Size'
          }
        ]
      }
    },
    label: function () {
      return {
        view: 'label',
        label: 'Curl into a furry donut.'
      }
    },
    link: function () {
      return {
        view: 'link',
        label: 'Curl into a furry donut.'
      }
    },
    list: function () {
      return {
        view: 'list',
        listStyle: ['side', 'line', 'striped'],
        style: {
          minWidth: '50%'
        },
        data: [
          {view: 'link', label: 'Curl into a furry donut.'},
          {view: 'link', label: 'Look into a furry donut.'},
          {view: 'link', label: 'Age into a furry donut.'},
          {view: 'link', label: 'Walk into a furry donut.'},
          {view: 'link', label: 'Elope into a furry donut.'},
          {view: 'link', label: 'Dig into a furry donut.'}
        ]
      }
    },
    modal: function () {
      return {
        view: 'modal',
        header: {
          view: 'label',
          htmlTag: 'h5',
          padding: true,
          label: 'Coffee is exquisite!'
        },
        body: {
          view: 'label',
          label: 'Medium brewed, dripper to go filter iced kopi-luwak qui variety cortado acerbic. Plunger pot latte organic sweet single shot robust cappuccino. Plunger pot qui decaffeinated crema, variety cappuccino carajillo shop blue mountain milk. Dark single origin filter, fair trade at grounds aged caffeine froth. In pumpkin spice ristretto single shot chicory mocha kopi-luwak robusta trifecta french press dark.'
        },
        footer: {
          flexAlign: 'right',
          padding: 'x y-sm',
          cells: [
            {view: 'button', label: 'No way!', margin: 'right'},
            {view: 'button', type: 'primary', label: 'Yup.'}
          ]
        }
      }
    },
    progress: function () {
      return {
        flexLayout: 'column',
        cells: [
          {
            view: 'progress',
            color: 'primary',
            value: 80
          },
          {
            view: 'progress',
            color: 'success striped',
            value: 65,
            margin: 'y-lg'
          },
          {
            view: 'progress',
            size: 'small',
            value: 50,
            margin: 'bottom-lg'
          },
          {
            view: 'progress',
            size: 'small',
            color: ['warning', 'striped'],
            value: 35,
            margin: 'bottom-lg'
          },
          {
            view: 'progress',
            size: 'mini',
            color: 'danger',
            value: 20
          }
        ]
        
      }
    },
    search: function () {
      return {
        view: 'search'
      }
    },
    select: function () {
      return {
        view: 'select',
        data: [
          {label: 'Curl'},
          {label: 'Look'},
          {label: 'Age'},
          {label: 'Walk'},
          {label: 'Elope'},
          {label: 'Dig'}
        ]
      }
    },
    table: function () {
      return {
        view: 'table',
        tableStyle: ['hover', 'striped'],
        header: true,
        footer: true,
        columns: [
          {header: 'Action', name: 'action', footer: '1'},
          {header: 'Preposition', name: 'preposition', footer: '2'},
          {header: 'Article', name: 'directObject.article', footer: '3'},
          {header: 'Object', template: "<code>{{directObject.object}}</code>", footer: 'Y'}
        ],
        data: [
          {action: 'Curl', preposition: 'into', directObject: {article: 'a', object: 'furry donut'}},
          {action: 'Look', preposition: 'into', directObject: {article: 'a', object: 'furry donut'}},
          {action: 'Age', preposition: 'into', directObject: {article: 'a', object: 'furry donut'}},
          {action: 'Walk', preposition: 'into', directObject: {article: 'a', object: 'furry donut'}},
          {action: 'Elope', preposition: 'into', directObject: {article: 'a', object: 'furry donut'}},
          {action: 'Dig', preposition: 'into', directObject: {article: 'a', object: 'furry donut'}}
        ]
      }
    },
    tab: function () {
      return {
        view: 'list',
        listStyle: 'tab',
        tab: true,
        data: [
          {view: 'link', label: 'A', $selected: true},
          {view: 'link', label: 'B'},
          {view: 'link', label: 'C'}
        ]
      }
    },
    toggle: function () {
      return {
        view: 'toggle',
        checked: true
      }
    },
    tree: function () {
      return {
        view: 'tree',
        data: [
          {label: 'Curl', id: 'root'},
          {label: 'into', id: 'into', $parent: 'root'},
          {label: 'a', id: 'a', $parent: 'root'},
          {label: 'furry', id: 'furry', $parent: 'a'},
          {label: 'donut', id: 'donut', $parent: 'a'}
        ]
      }
    }
  },
  properties: UI.forIn(function (name, value) {
    return UI.extend({}, value.prototype.$defaults)
  }, UI.definitions)
};


function wrapInForm(input) {
  return {
    view: 'form',
    fieldset: [input]
  }
}


function handleHashChange() {
  var value = location.hash.substring(1);
  if (Model.components[value]) {
    var view = Model.aliases[value] || value;
    // If link is empty, assume it points to a component
    UI.addClass(document.getElementById('gettingStarted'), 'uk-hidden');
    $$('methodList').parseMethods(UI.definitions[view]);
    $$('propertiesTable').parseProperties(UI.definitions[view]);
    var config = $$('codeView').parseCode(value);
    $$('componentView').parseConfig(config, view);
    $$('mainTitle').setValue(UI.capitalize(value));
    $$('sideBar').setActiveLabel(UI.capitalize(value));
    $$('mainView').show();
    highlightBlocks();
  }
  else {
    $$('mainView').hide();
    UI.removeClass(document.getElementById('gettingStarted'), 'uk-hidden');
  }
}

UI.new({
  id: "navBar",
  cls: 'uk-navbar',
  template: {
    padding: 'x',
    cells: [
      {
        view: 'list',
        listStyle: 'navbar',
        flexSize: 'none',
        data: [
          {
            view: 'image',
            src: 'logo.svg',
            width: 145,
            on: {
              onClick: function () {
                console.log('cools')
              }
            }
          }
        ]
      },
      {
        view: 'list',
        listStyle: 'navbar',
        cls: 'uk-form',
        flex: true,
        flexAlign: 'middle',
        style: {
          marginLeft: 'auto'
        },
        data: [
          {
            view: 'link-icon',
            screen: 'except-small',
            label: 'Github',
            icon: 'github',
            href: 'https://github.com/spckio/spck-ui',
            margin: 'right-lg'
          },
          {
            view: 'select',
            margin: 'right',
            data: [
              {value: 'light', label: 'Light'},
              {value: 'dark', label: 'Dark'}
            ],
            on: {
              onChange: function () {
                switch (this.getValue()) {
                  case 'dark':
                    UI.addClass(document.documentElement, 'dark');
                    break;
                  default:
                    UI.removeClass(document.documentElement, 'dark');
                }
              }
            }
          },
          {
            view: 'select',
            data: [
              {value: UI.VERSION, label: UI.VERSION}
            ]
          }
        ]
      }
    ]
  }
}, document.getElementById('navbar'));

UI.new({
  view: "drawer",
  touchOnly: true,
  edge: true,
  template: {
    view: 'scroller',
    cells: [
      {
        id: 'sideBar',
        view: 'list',
        listStyle: 'side',
        style: {
          minWidth: '200px',
        },
        data: [
          {
            view: 'spacer',
            height: 16
          },
          {
            $header: true, label: 'Getting Started'
          },
          {
            view: 'link',
            cls: 'uk-active-line',
            label: 'Introduction',
            $selected: true,
            margin: 'left'
          },
          {
            view: 'link',
            cls: 'uk-active-line',
            label: 'Installation',
            margin: 'left'
          },
          {
            view: 'link',
            cls: 'uk-active-line',
            label: 'CDN Links',
            margin: 'left'
          },
          {$divider: true},
          {$header: true, label: 'Components'}
        ].concat(Object.keys(Model.components).sort().map(function (n) {
          return {
            view: 'link',
            cls: 'uk-active-line',
            label: UI.capitalize(n),
            margin: 'left',
            value: n
          }
        })).concat([
          {
            view: 'spacer',
            height: 64
          }
        ]),
        on: {
          onItemClick: function (item) {
            var value = item.value;
            this.setActiveLabel(item.label);
            location.hash = value || "";
          }
        }
      }
    ]
  }
}, document.getElementById('sidebar'));

UI.new({
  id: 'mainView',
  flexLayout: 'column',
  hidden: true,
  cells: [
    {
      id: 'mainTitle',
      view: 'label',
      htmlTag: 'h1',
      margin: 'bottom-lg'
    },
    {
      id: 'exampleView',
      card: true,
      flexSize: 'none',
      flexLayout: 'column',
      cells: [
        {
          batch: 'tab',
          view: 'list',
          listStyle: 'tab',
          tab: true,
          card: 'header',
          margin: 'bottom-lg',
          data: [
            {view: 'link', label: 'Preview', value: 'component', $selected: true},
            {view: 'link', label: 'Code', value: 'code'}
          ],
          on: {
            onItemClick: function (item) {
              this.setActiveLabel(item.label);
              var view = $$('exampleView');
              switch (item.value) {
                case 'component':
                  view.showBatch(['tab', 'component']);
                  break;

                case 'code':
                  view.showBatch(['tab', 'code']);
                  highlightBlocks();
                  break;
              }
            }
          }
        },
        {
          id: 'componentView',
          batch: 'component',
          flexSize: 'none',
          card: 'body',
          cells: [],
          parseConfig: function (config, componentName) {
            if (this.childComponent) {
              this.removeChild(this.childComponent);
            }
            if (Model.containers[componentName]) {
              config = Model.containers[componentName](config);
            }
            this.childComponent = this.addChild(config);
          }
        },
        {
          id: 'codeView',
          batch: 'code',
          template: "<pre><code>UI.new({{code}}, document.body);</code></pre>",
          card: 'body',
          code: '',
          parseCode: function (name) {
            var view = Model.aliases[name] || name;
            var objectModel = UI.extend(UI.extend({}, Model.properties[name]), Model.components[name]());
            var defaults = UI.definitions[view].prototype.$defaults;
            for (var k in objectModel) {
              if (objectModel.hasOwnProperty(k)) {
                if (objectModel[k] == defaults[k]) {
                  delete objectModel[k];
                }
              }
            }

            this.config.code = JSON.stringify(objectModel,
              function(name, value) {
                if (typeof value == 'function') {
                  return value.toString();
                }
                else {
                  return value;
                }
              }, "  ")
              .replace(/&/g, '&amp;')
              .replace(/"/g, '&quot;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;');

            this.render();

            return objectModel;
          }
        }
      ]
    },
    {
      id: 'apiView',
      flexSize: 'none',
      flexLayout: 'column',
      margin: 'y-lg',
      card: true,
      cells: [
        {
          batch: 'tab',
          view: 'list',
          listStyle: 'tab',
          tab: true,
          card: 'header',
          data: [
            {view: 'link', label: 'Properties', value: 'properties', $selected: true},
            {view: 'link', label: 'Methods', value: 'methods'}
          ],
          on: {
            onItemClick: function (item) {
              this.setActiveLabel(item.label);
              var view = $$('apiView');

              switch (item.value) {
                case 'properties':
                  view.showBatch(['tab', 'props']);
                  break;

                case 'methods':
                  view.showBatch(['tab', 'methods']);
                  break;
              }
            }
          }
        },
        {
          batch: 'props',
          flexLayout: 'column',
          card: 'body',
          cells: [
            {
              id: 'propertiesTable',
              view: 'table',
              header: true,
              margin: 'top',
              columns: [
                {
                  header: 'Name',
                  template: function (item) {
                    if (item.title) {
                      return '<h5 style="margin:32px 0 8px -16px">{{name}}</h5>';
                    } else if (item.header) {
                      return '<div class="uk-text-capitalize" style="margin: 16px 0 8px -8px"><b>{{name}}</b></div>';
                    } else {
                      return '<code class="uk-text-nowrap">{{name}}</code>';
                    }
                  }
                },
                {
                  header: 'Type',
                  template: function (item) {
                    return item.type ? '<span class="uk-badge uk-badge-notification">{{type}}</code>' : '';
                  }
                },
                {
                  header: 'Description',
                  name: 'desc'
                },
                {
                  header: 'Options',
                  template: function (item) {
                    return item.options ? {
                      view: 'button',
                      cls: 'uk-text-nowrap',
                      label: 'Options',
                      size: 'small',
                      dropdownOptions: {
                        marginY: Object.keys(item.options).length > 12 ? -300 : 8
                      },
                      dropdown: {
                        view: 'list',
                        data: Object.keys(item.options).sort()
                          .map(function (option) {
                            return {
                              view: 'link',
                              label: option || '&nbsp;',
                              value: option
                            }
                          })
                      }
                    } : '';
                  }
                }
              ],
              parseProperties: function (component) {
                var setters = component.prototype.$setters;
                var meta = UI.extend({}, setters.$$meta);
                var name = component.prototype.__name__;
                var bases = {};
                var baseOrder = {};

                component.prototype.__baseNames__.forEach(function (name, i) {
                  baseOrder[name] = ('00' + i).substr(-3);
                });

                baseOrder[name] = '$$';

                var properties = Object.keys(meta)
                  .filter(function (n) {
                    return n.charAt(0) != '$' && n.charAt(0) != '_';
                  })
                  .map(function (n) {
                    return {
                      name: n,
                      sortKey: baseOrder[meta[n].__class__] + '_' + n,
                      type: meta[n].$$type || 'string',
                      desc: UI.isString(meta[n]) ? meta[n] : meta[n].$$desc || ''
                    }
                  });

                properties = properties.concat(Object.keys(setters)
                  .filter(function (s) {
                    return s.charAt(0) != '$' && s.charAt(0) != '_';
                  })
                  .map(function (s) {
                    bases[setters[s].__class__] = true;
                    return {
                      name: s,
                      sortKey: baseOrder[setters[s].__class__] + '_' + s,
                      type: setters[s].$$type || (setters[s].options ? 'string | string[]' : 'any'),
                      desc: setters[s].$$desc || '',
                      options: setters[s].options
                    }
                  })
                  .concat(Object.keys(bases).map(function (b) {
                    return {
                      name: b == name ? 'Inherited' : b,
                      sortKey: b == name ? '$_' : baseOrder[b],
                      header: true,
                      title: b == name,
                      type: '',
                      desc: ''
                    }
                  }))
                );

                this.setData(properties.sort(function (a, b) {
                  if (a.sortKey > b.sortKey) {
                    return 1;
                  } else if (a.sortKey < b.sortKey) {
                    return -1;
                  } else {
                    return 0;
                  }
                }));
              }
            }
          ]
        },
        {
          id: 'methodList',
          batch: 'methods',
          view: 'list',
          listStyle: 'line',
          card: 'body',
          selectable: true,
          parseMethods: function (component) {
            this.setData(getComponentMethods(component)
              .map(function (method) {
                if (method.header) {
                  return {
                    view: 'label',
                    text: 'capitalize',
                    htmlTag: method.title ? 'h5' : 'div',
                    label: method.title ? method.header : '<b>' + method.header + '</b>',
                    style: method.title ? {
                      marginTop:  '40px',
                      marginBottom: '24px'
                    } : {
                      marginTop: '24px',
                      marginBottom: '16px'
                    }
                  }
                } else {
                  return {
                    view: 'element',
                    template: [
                      '<dl class="uk-description-list-horizontal">',
                      '<dt><code>{{name}}</code></dt><dd>{{summary}}</dd>',
                      '</dl>',
                      '<dl class="uk-description-list-horizontal">',
                      (method.params && method.params.length ?
                        '<dt class="uk-margin-small-left">Parameters</dt><dd>&nbsp;</dd>{{parameters}}' : ''),
                      (method.dispatch ? '<dt class="uk-margin-small-left">Dispatch</dt><dd><code>{{dispatch}}</code></dd>' : ''),
                      (method.returns ? '<dt class="uk-margin-small-left">Returns</dt><dd>{{returns}}</dd>' : ''),
                      (method.example ? '<dt class="uk-margin-small-left">Example</dt><dd><code>{{example}}</code></dd>' : ''),
                      '</dl>'
                    ].join(''),
                    name: method.name,
                    summary: method.summary,
                    dispatch: method.dispatch,
                    returns: method.returns ? formatReturnsString(method.returns) : null,
                    example: method.example,
                    parameters: method.params.map(function (n) {
                      return UI.interpolate(
                        '<dt class="uk-text-muted uk-margin-left">{{name}}</dt><dd>{{description}}</dd>', n);
                    }).join('')
                  }
                }
              })
            );
          }
        }
      ]
    }
  ],
  on: {
    onInitialized: function () {
      $$('exampleView').showBatch(['tab', 'component']);
      $$('apiView').showBatch(['tab', 'props']);
    }
  }
}, document.getElementById('main'));


function formatReturnsString(str) {
  var regex = /\{[^}]*}/;
  var type = str.match(regex);
  type = type ? type[0].slice(1, -1) : '';
  return str.replace(regex, UI.interpolate(
    '<span class="uk-badge uk-badge-notification uk-margin-right">{{type}}</span>', {type: type}))
}

function getComponentMethods(component) {
  var classes = {};
  var name = component.prototype.__name__;
  var baseOrder = {};

  component.prototype.__baseNames__.forEach(function (name, i) {
    baseOrder[name] = ('00' + i).substr(-3);
  });

  baseOrder[name] = '$$';

  return Object.keys(component.prototype)
    .filter(function (n) {
      return (n.charAt(0) != '$' && n.charAt(0) != '_');
    })
    .map(function (n) {
      var meta = extractDocString(n, component.prototype[n]);
      if (meta) {
        var cls = component.prototype[n].__class__;
        if (cls) {
          meta.sortKey = cls === name ? '$' : baseOrder[cls] + n.name;
          classes[cls] = true;
        }
      }
      return meta;
    })
    .filter(function (n) {
      return !!n;
    })
    .concat(Object.keys(classes)
      .map(function (cls) {
        return {
          sortKey: cls == name ? '$_' : baseOrder[cls],
          title: cls == name,
          header: cls == name ? 'Inherited' : cls
        }
      })
    )
    .sort(function (a, b) {
      if (a.sortKey > b.sortKey) {
        return 1;
      } else if (a.sortKey < b.sortKey) {
        return -1;
      } else {
        return 0;
      }
    });
}

function extractDocString(name, fn) {
  var fnStr = fn.toString();
  var startIndex = fnStr.indexOf('/**'),
    endIndex = fnStr.indexOf('*/');
  if (endIndex != -1 && startIndex != -1) {
    var docString = fnStr.slice(startIndex, endIndex);
    var lines = docString.split('\n').map(function (n) {
      return n.slice(n.indexOf('* ') + 2);
    }).slice(1, -1);
    var summary = '';
    var params = [];
    var dispatch = null,
      returns = null,
      example = null;

    lines.forEach(function (l) {
      l = l.split(' ');
      switch (l[0]) {
        case "@param":
          params.push({name: l[1], description: l.slice(2).join(' ')});
          break;
        case "@returns":
          returns = l.slice(1).join(' ');
          break;
        case "@dispatch":
          dispatch = l.slice(1).join(' ');
          break;
        case "@example":
          example = l.slice(1).join(' ');
          break;
        default:
          summary += l.join(' ');
      }
    });
    return {name: name, summary: summary, dispatch: dispatch, returns: returns, params: params, example: example};
  }
}

function highlightBlocks() {
  $('pre code').each(function (i, block) {
    hljs.highlightBlock(block);
  });
}

$(document).ready(function () {
  highlightBlocks();
});
