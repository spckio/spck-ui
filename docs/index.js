window.onload = function () {
  handleHashChange();
  UI.removeClass(document.body, "sp-hidden");
};
window.onhashchange = handleHashChange;


document.body.onscroll = function () {
  var navElem = $$('navBar').element;
  if (document.documentElement.scrollTop > 5) {
    UI.addClass(navElem, 'sp-box-shadow');
  } else {
    UI.removeClass(navElem, 'sp-box-shadow');
  }
};


var phrases1 = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  'Aliquam tincidunt mauris eu risus.',
  'Vestibulum auctor dapibus neque.',
  'Nunc dignissim risus id metus.',
  'Cras ornare tristique elit.',
  'Vivamus vestibulum ntulla nec ante.',
  'Praesent placerat risus quis eros.'
];


var phrases2 = [
  'Hard work pays off in the future. Laziness pays off now.',
  'A dog is a dog unless he is facing you. Then he is Mr. Dog.',
  'Experience is something you get just after you need it.',
  "If it weren't for the last minute, nothing would get done.",
  'Be nice to other people; they outnumber you 5.5 billion to one.',
  'Anything free is worth the price.',
  'A sine curve goes off to infinity, or at least to the end of the blackboard.'
];


function mapToProperty(array, property, base) {
  return array.map(function (elem) {
    var result = UI.extend({}, base || {});
    result[property] = elem;
    return result;
  });
}


function findKeyWithValue(object, value) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key] == value) {
        return key;
      }
    }
  }
}

function CommentedStringValue(value, comment) {
  var str = new String(value);
  str.$comment = comment;
  return str;
}

var Model = {
  containers: {
    input: wrapInForm,
    select: wrapInForm,
    fieldset: function (fieldset) {
      return {
        view: 'form',
        padding: true,
        fieldsets: [fieldset]
      }
    }
  },
  aliases: {
    breadcrumb: 'list',
    badge: 'element',
    card: 'element',
    notify: 'spacer',
    tab: 'list'
  },
  components: {
    badge: function () {
      return {
        component: {
          padding: true,
          cells: [
            {
              view: 'label',
              badge: true,
              label: 'Default',
              margin: 'y'
            },
            {
              view: 'label',
              badge: 'success',
              label: 'Success',
              margin: 'y'
            },
            {
              view: 'label',
              badge: 'primary',
              label: 'Primary',
              margin: 'y'
            },
            {
              view: 'label',
              badge: 'warning',
              label: 'Warning',
              margin: 'y'
            },
            {
              view: 'label',
              badge: 'danger',
              label: 'Danger',
              margin: 'y'
            }
          ]
        }
      };
    },
    breadcrumb: function () {
      return {
        component: {
          view: 'list',
          listStyle: 'breadcrumb',
          padding: true,
          data: [
            { view: 'link', label: 'Root' },
            { view: 'link', label: 'Parent' },
            { view: 'link', label: 'Child' }
          ]
        }
      };
    },
    button: function () {
      return {
        component: {
          scroll: 'x',
          template: {
            flexLayout: 'column',
            cells: [
              {
                flexAlign: 'middle',
                cells: [
                  {
                    view: 'button',
                    size: 'mini',
                    label: 'Mini Link',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    size: 'small',
                    label: 'Small Link',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Default Link',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Muted Link',
                    color: 'muted',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Success Link',
                    color: 'success',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Primary Large Link',
                    color: 'primary',
                    icon: 'heart',
                    size: 'large',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Danger Large Link',
                    size: 'large',
                    color: 'danger',
                    margin: 'y'
                  }
                ]
              },
              {
                flexAlign: 'middle',
                cells: [
                  {
                    view: 'button',
                    disabled: true,
                    label: 'Disabled',
                    buttonStyle: 'button',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    disabled: true,
                    color: 'muted',
                    label: 'Muted Disabled',
                    buttonStyle: 'button',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    disabled: true,
                    color: 'primary',
                    label: 'Primary Disabled',
                    buttonStyle: 'button',
                    margin: 'x'
                  }
                ]
              },
              {
                flexAlign: 'middle',
                margin: 'y',
                cells: [
                  {
                    view: 'button',
                    size: 'small',
                    label: 'Small Button',
                    buttonStyle: 'button',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Default Button',
                    buttonStyle: 'button',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Ghost Muted',
                    color: 'ghost-muted',
                    buttonStyle: 'button',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Ghost Primary',
                    color: 'ghost-primary',
                    buttonStyle: 'button',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Muted Button',
                    buttonStyle: 'button',
                    color: 'muted',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Success Button',
                    buttonStyle: ['button', 'shadow'],
                    color: 'success',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Primary Large Button',
                    buttonStyle: 'button',
                    icon: 'heart',
                    color: 'primary',
                    size: 'large',
                    margin: 'x'
                  },
                  {
                    view: 'button',
                    label: 'Danger Large Button',
                    buttonStyle: 'button',
                    size: 'large',
                    color: 'danger',
                    margin: 'x'
                  }
                ]
              },
              {
                cls: 'sp-button-group',
                margin: 'y x',
                template: [
                  {
                    view: 'button',
                    label: 'Left Button',
                    buttonStyle: 'button',
                  },
                  {
                    view: 'button',
                    label: 'Middle Button',
                    buttonStyle: 'button',
                  },
                  {
                    view: 'button',
                    label: 'Right Button',
                    buttonStyle: 'button',
                    color: 'success',
                  }
                ]
              }
            ]
          }
        }
      };
    },
    card: function () {
      return {
        component: {
          flexLayout: 'column',
          padding: true,
          cells: [
            {
              view: 'label',
              flexSize: 'flex',
              label: 'Default Card',
              card: true
            },
            {
              margin: 'y',
              flexLayout: 'column',
              card: true,
              cells: [
                {
                  view: 'label',
                  htmlTag: 'h5',
                  label: 'Card with Header',
                  card: 'header'
                },
                {
                  view: 'label',
                  label: 'Primary Card',
                  card: 'body'
                },
                {
                  template: 'Teaser Card',
                  card: 'teaser'
                }
              ]
            },
            {
              flexLayout: 'column',
              card: true,
              cardStyle: 'primary',
              cells: [
                {
                  view: 'label',
                  htmlTag: 'h5',
                  label: 'Card with Header',
                  card: 'header'
                },
                {
                  view: 'label',
                  label: 'Primary Card',
                  card: 'body'
                },
                {
                  template: 'Teaser Card',
                  card: 'teaser'
                }
              ]
            },
            {
              flexLayout: 'column',
              card: true,
              cardStyle: 'success',
              margin: 'y',
              cells: [
                {
                  view: 'label',
                  htmlTag: 'h5',
                  label: 'Card with Header',
                  card: 'header'
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
      };
    },
    drawer: function () {
      return {
        component: {
          padding: true,
          cells: [
            {
              view: 'button',
              label: 'Show Drawer',
              buttonStyle: 'button',
              on: {
                onClick: function () {
                  $$('drawerLeft').open();
                }
              }
            },
            {
              view: 'button',
              label: 'Show Right Drawer',
              buttonStyle: 'button',
              margin: 'left',
              on: {
                onClick: function () {
                  $$('drawerRight').open();
                }
              }
            },
            {
              id: 'drawerLeft',
              view: 'drawer',
              edge: true,
              template: {
                flex: true,
                flexAlign: 'center middle',
                cells: [
                  {
                    view: 'label',
                    label: 'Left Drawer',
                    text: 'bold'
                  }
                ]
              }
            },
            {
              id: 'drawerRight',
              view: 'drawer',
              flipped: true,
              edge: true,
              template: {
                flex: true,
                flexAlign: 'center middle',
                cells: [
                  {
                    view: 'label',
                    label: 'Right Drawer',
                    text: 'bold'
                  }
                ]
              }
            }
          ]
        }
      };
    },
    dropdown: function () {
      return {
        component: {
          padding: true,
          cells: [
            {
              view: 'button',
              label: 'Show dropdown',
              color: 'primary',
              buttonStyle: ['button', 'shadow'],
              dropdown: {
                view: 'list',
                data: [
                  { $header: true, label: 'Lyrics' }
                ].concat(mapToProperty(phrases1, 'label', { view: 'link' }))
              }
            },
            {
              view: 'button',
              label: "What's in here?",
              buttonStyle: 'button',
              margin: 'left',
              dropdown: {
                flexLayout: 'column',
                padding: 'x',
                cells: [
                  {
                    view: 'label',
                    label: 'An image',
                    htmlTag: 'H6',
                    margin: 'top'
                  },
                  {
                    view: 'image',
                    src: "logo-mark.svg"
                  }
                ]
              }
            }
          ]
        }
      };
    },
    element: function () {
      return {
        component: {
          padding: true,
          template: '<h6>Element {{name}}</h6><p>{{name}} can be anything.</p>',
          name: 'Template'
        }
      };
    },
    fieldset: function () {
      return {
        component: {
          view: 'fieldset',
          data: [
            { formLabel: 'User', view: 'input', value: 'Hello' },
            { formLabel: 'Password', view: 'input', type: 'password', placeholder: 'Password' },
            { view: 'button', color: 'primary', buttonStyle: 'button', label: 'Login', inputWidth: 'medium' }
          ]
        }
      };
    },
    form: function () {
      return {
        component: {
          padding: true,
          fill: 'width',
          template: [
            {
              view: 'form',
              fieldset: [
                { formLabel: 'User', view: 'input', value: 'Hello' },
                { formLabel: 'Password', view: 'input', type: 'password', placeholder: 'Password' },
              ]
            },
            {
              view: 'form',
              margin: 'y-lg',
              formStyle: 'horizontal',
              fieldset: [
                { formLabel: 'User', view: 'input', value: 'Hello' },
                { formLabel: 'Password', view: 'input', type: 'password', placeholder: 'Password' }
              ]
            },
            {
              view: 'form',
              formStyle: ['horizontal', 'line'],
              fieldset: [
                { formLabel: 'User', view: 'input', value: 'Hello' },
                { formLabel: 'Password', view: 'input', type: 'password', placeholder: 'Password' }
              ]
            }
          ]
        }
      };
    },
    flexgrid: function () {
      return {
        component: {
          padding: true,
          flexLayout: 'column',
          cells: [
            {
              style: {
                minHeight: '128px'
              },
              margin: 'bottom',
              cells: [
                {
                  flexSize: 'none',
                  card: true,
                  template: {
                    view: 'label',
                    label: 'None',
                    text: 'bold'
                  }
                },
                {
                  flex: true,
                  flexSize: 'flex',
                  flexAlign: 'center',
                  card: true,
                  margin: 'x',
                  template: {
                    view: 'label',
                    label: 'Flex, Center',
                    text: 'bold'
                  }
                },
                {
                  flex: true,
                  flexSize: 'none',
                  flexAlign: 'bottom',
                  card: true,
                  template: {
                    view: 'label',
                    label: 'None, Bottom',
                    text: 'bold'
                  }
                }
              ]
            },
            {
              style: {
                minHeight: '128px'
              },
              cells: [
                {
                  flex: true,
                  flexSize: 'flex',
                  flexAlign: 'right',
                  card: true,
                  template: {
                    view: 'label',
                    label: 'Flex, Right',
                    text: 'bold'
                  }
                },
                {
                  flex: true,
                  flexSize: 'auto',
                  flexAlign: 'center middle',
                  card: true,
                  margin: 'x',
                  template: {
                    view: 'label',
                    label: 'Auto, Center Middle',
                    text: 'bold'
                  }
                },
                {
                  flex: true,
                  flexSize: 'flex',
                  flexAlign: ['right', 'middle'],
                  card: true,
                  template: {
                    view: 'label',
                    label: 'Flex, Right Middle',
                    text: 'bold'
                  }
                }
              ]
            }
          ]
        }
      };
    },
    icon: function () {
      return {
        component: {
          padding: true,
          flexWrap: 'wrap',
          cells: [
            'alert', 'archive', 'arrow-both', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-switch',
            'arrow-up-left', 'arrow-up-right', 'arrow-down-left', 'arrow-down-right', 'beaker', 'bell',
            'bell-slash', 'bell-fill', 'bold', 'book', 'bookmark', 'briefcase', 'broadcast', 'bug',
            'calendar', 'check', 'check-circle', 'check-circle-fill', 'checklist',
            'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up', 'circle', 'circle-slash', 'clippy',
            'clock', 'code', 'code-review', 'code-square', 'comment', 'comment-discussion', 'commit', 'container',
            'copy', 'cpu', 'credit-card', 'cross-reference', 'dash', 'database', 'desktop-download',
            'device-camera-video', 'device-desktop', 'device-mobile', 'diff', 'dot', 'dot-fill',
            'download', 'eye-closed', 'eye', 'file', 'file-binary', 'file-code', 'file-diff', 'file-directory',
            'file-directory-fill', 'file-media', 'file-submodule', 'file-symlink-file', 'file-zip',
            'filter', 'flame', 'fold', 'fold-down', 'fold-up', 'gear', 'gift',
            'git-branch', 'git-commit', 'git-compare', 'git-fork', 'git-merge', 'git-pull-request',
            'globe', 'grabber', 'graph', 'heading', 'heart', 'heart-fill', 'history', 'home', 'home-fill',
            'horizontal-rule', 'hourglass', 'hubot', 'image', 'inbox', 'infinity', 'info', 'insights', 'issue-closed',
            'issue-opened', 'issue-reopened', 'italic', 'kebab-horizontal', 'key', 'law', 'light-bulb', 'link', 'link-external',
            'list-ordered', 'list-unordered', 'location', 'lock', 'mail',
            'megaphone', 'mention', 'milestone', 'mirror', 'moon', 'mortar-board', 'multi-select', 'mute',
            'no-entry', 'north-star', 'note', 'number', 'octoface', 'organization',
            'package', 'package-dependencies', 'package-dependents', 'paper-airplane', 'pencil',
            'people', 'person', 'pin', 'play', 'plug', 'plus', 'project', 'pulse', 'question', 'quote', 'reply',
            'repo', 'repo-push', 'repo-template', 'report', 'rocket',
            'rss', 'ruby', 'screen-full', 'screen-normal', 'search', 'server', 'share',
            'share-android', 'shield', 'shield-check', 'shield-lock', 'shield', 'sign-in', 'sign-out',
            'skip', 'smiley', 'square', 'square-fill', 'squirrel', 'star', 'star-fill', 'stop', 'stopwatch',
            'strikethrough', 'sun', 'sync', 'tab', 'tag', 'tasklist', 'telescope', 'terminal', 'thumbsdown',
            'thumbsup', 'tools', 'trash', 'triangle-down', 'triangle-up', 'triangle-left', 'triangle-right',
            'typography', 'unfold', 'unlock', 'unmute', 'unverified', 'upload', 'verified', 'versions', 'video',
            'workflow', 'x', 'x-circle', 'x-circle-fill', 'zap'
          ].map(function (icon) {
            return {
              flexLayout: "column",
              flexSize: "none",
              card: true,
              style: {
                minWidth: '96px'
              },
              margin: 'x-sm y-sm',
              cells: [
                {
                  view: 'label',
                  label: icon + '-24',
                  wrap: 'nowrap',
                  card: 'header',
                  textAlign: 'center',
                  selectable: true
                },
                {
                  view: 'icon',
                  card: 'body',
                  textAlign: 'center',
                  icon: icon + '-24',
                  size: 'xlarge'
                }
              ]
            };
          })
        }
      };
    },
    image: function () {
      return {
        component: {
          view: 'image',
          src: "logo-mark.svg"
        }
      };
    },
    input: function () {
      return {
        component: {
          cells: [
            {
              flexLayout: 'column',
              margin: 'right',
              cells: [
                {
                  view: 'input',
                  inputStyle: 'line',
                  placeholder: 'Default Size'
                },
                {
                  view: 'input',
                  inputStyle: 'line',
                  size: 'small',
                  placeholder: 'Small Size',
                  margin: 'y'
                },
                {
                  view: 'input',
                  inputStyle: 'line',
                  size: 'large',
                  placeholder: 'Large Size',
                },
                {
                  view: 'input',
                  inputStyle: 'line',
                  readonly: true,
                  placeholder: 'Readonly',
                  margin: 'y'
                },
                {
                  view: 'input',
                  disabled: true,
                  placeholder: 'Disabled',
                  margin: 'y'
                }
              ]
            },
            {
              flexLayout: 'column',
              cells: [
                {
                  cls: 'sp-input-group',
                  template: [
                    {
                      view: 'button',
                      buttonStyle: 'button',
                      disabled: true,
                      label: 'Field'
                    },
                    {
                      view: 'input',
                      placeholder: 'Default Size'
                    }
                  ]
                },
                {
                  cls: 'sp-input-group-stacked',
                  margin: 'y',
                  template: [
                    {
                      view: 'input',
                      size: 'small',
                      placeholder: 'Small Size',
                    },
                    {
                      view: 'input',
                      size: 'large',
                      placeholder: 'Large Size',
                    }
                  ]
                },
                {
                  view: 'input',
                  readonly: true,
                  placeholder: 'Readonly'
                }
              ]
            }
          ]
        }
      };
    },
    label: function () {
      return {
        component: {
          padding: true,
          view: 'label',
          label: 'Curl into a furry donut.'
        }
      };
    },
    link: function () {
      return {
        component: {
          padding: true,
          cells: [
            {
              view: 'link',
              label: 'Default Link'
            },
            {
              view: 'link',
              icon: 'heart',
              label: 'Link Icon',
              margin: 'x-lg'
            },
            {
              view: 'link',
              icon: 'link',
              label: 'Right Icon',
              alignIconRight: true
            }
          ]
        }
      };
    },
    list: function () {
      return {
        component: {
          cells: [
            listTemplate(['side', 'line'], phrases1),
            listTemplate(['side', 'line', 'striped'], phrases2)
          ]
        }
      };
    },
    modal: function () {
      var text = 'Medium brewed, dripper to go filter iced kopi-luwak qui variety cortado acerbic. Plunger pot latte organic sweet single shot robust cappuccino. Plunger pot qui decaffeinated crema, variety cappuccino carajillo shop blue mountain milk. Dark single origin filter, fair trade at grounds aged caffeine froth. In pumpkin spice ristretto single shot chicory mocha kopi-luwak robusta trifecta french press dark.';
      return {
        locals: {
          text: text
        },
        component: {
          padding: true,
          cells: [
            {
              view: 'button',
              label: 'Show modal',
              buttonStyle: 'button',
              on: {
                onClick: function () {
                  $$('modal').open();
                }
              }
            },
            {
              id: "modal",
              view: 'modal',
              header: {
                view: 'label',
                htmlTag: 'h5',
                label: 'Coffee is exquisite!'
              },
              body: {
                view: 'label',
                label: text
              },
              footer: {
                flexAlign: 'right',
                cells: [
                  {
                    view: 'button',
                    label: 'No way!',
                    margin: 'right',
                    on: {
                      onClick: function () {
                        $$('modal').close();
                      }
                    }
                  },
                  {
                    view: 'button',
                    type: 'primary',
                    label: 'Yup.',
                    on: {
                      onClick: function () {
                        $$('modal').close();
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    },
    notify: function () {
      return {
        component: {
          padding: true,
          cells: [
            {
              view: 'button',
              label: 'Show message',
              buttonStyle: 'button',
              on: {
                onClick: function () {
                  UI.message({ message: "I'm a nice message!" })
                }
              }
            }
          ]
        }
      }
    },
    progress: function () {
      return {
        component: {
          padding: true,
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
      };
    },
    resizer: function () {
      return {
        component: {
          cells: [
            {
              id: 'leftFrame',
              flex: true,
              flexAlign: 'center middle',
              template: {
                view: 'label',
                label: 'Left Frame',
                text: 'bold'
              },
              style: {
                minWidth: '200px',
                minHeight: '180px'
              }
            },
            {
              view: 'resizer',
              direction: 'x',
              minValue: 100,
              maxValue: 600,
              on: {
                onHandleResized: function (pos) {
                  $$('leftFrame').element.style.minWidth = pos + 'px';
                }
              }
            },
            {
              flexSize: 'flex',
              flexLayout: 'column',
              cells: [
                {
                  id: 'topFrame',
                  flex: true,
                  flexSize: 'none',
                  flexAlign: 'center middle',
                  template: {
                    view: 'label',
                    label: 'Top Frame',
                    text: 'bold'
                  },
                  style: {
                    minHeight: '90px'
                  }
                },
                {
                  view: 'resizer',
                  direction: 'y',
                  minValue: 30,
                  maxValue: 150,
                  on: {
                    onHandleResized: function (pos) {
                      $$('topFrame').element.style.minHeight = pos + 'px';
                    }
                  }
                },
                {
                  flex: true,
                  flexSize: 'flex',
                  flexAlign: 'center middle',
                  template: {
                    view: 'label',
                    label: 'Bottom Frame',
                    text: 'bold'
                  }
                }
              ]
            }
          ]
        }
      };
    },
    scroller: function () {
      return {
        component: {
          view: 'scroller',
          style: {
            height: '240px'
          },
          cells: [
            listTemplate(['side', 'line', 'striped'], phrases1),
            listTemplate(['side', 'line', 'striped'], phrases2)
          ]
        }
      };
    },
    search: function () {
      return {
        component: {
          padding: true,
          view: 'search'
        }
      };
    },
    select: function () {
      return {
        component: {
          cells: [
            {
              flexLayout: 'column',
              margin: 'right',
              cells: [
                {
                  view: 'select',
                  data: mapToProperty(phrases1, 'label')
                },
                {
                  view: 'select',
                  selectStyle: 'input',
                  size: 'mini',
                  margin: 'y',
                  data: mapToProperty(phrases1, 'label')
                },
                {
                  view: 'select',
                  selectStyle: 'input',
                  data: mapToProperty(phrases1, 'label')
                },
                {
                  view: 'select',
                  selectStyle: 'input',
                  size: 'small',
                  margin: 'y',
                  data: mapToProperty(phrases1, 'label')
                },
                {
                  view: 'select',
                  selectStyle: 'input',
                  size: 'large',
                  data: mapToProperty(phrases1, 'label')
                },
                {
                  view: 'select',
                  selectStyle: 'input',
                  disabled: true,
                  margin: 'y',
                  data: mapToProperty(phrases1, 'label')
                },
                {
                  view: 'select',
                  selectStyle: 'line',
                  margin: 'bottom',
                  data: mapToProperty(phrases1, 'label')
                },
                {
                  view: "label",
                  label: "Opt Group",
                  htmlTag: "H6",
                },
                {
                  view: 'select',
                  margin: "y",
                  data: [
                    { label: 'Apple', optgroup: 'Fruit' },
                    { label: 'Banana', optgroup: 'Fruit' },
                    { label: 'Oranges', optgroup: 'Fruit' },
                    { label: 'Carrot', optgroup: 'Veggies' },
                    { label: 'Celery', optgroup: 'Veggies' },
                    { label: 'Sprouts', optgroup: 'Veggies' }
                  ]
                }
              ]
            },
            {
              flexLayout: 'column',
              margin: 'right',
              cells: [
                {
                  view: "label",
                  label: "Multi Select",
                  htmlTag: "H6",
                  margin: "x y"
                },
                {
                  view: 'select',
                  multiple: true,
                  data: mapToProperty(phrases1, 'label')
                }
              ]
            }
          ]
        }
      };
    },
    spacer: function () {
      return {
        component: {
          view: 'scroller',
          style: {
            height: '240px'
          },
          cells: [
            {
              padding: true,
              view: "label",
              label: "Scroll Down Please",
              htmlTag: "H6"
            },
            {
              view: "spacer",
              height: 500
            },
            {
              padding: true,
              view: "label",
              label: "Bottom",
              htmlTag: "H6"
            }
          ]
        }
      };
    },
    table: function () {
      return {
        component: {
          margin: 'x y',
          view: 'table',
          header: true,
          footer: true,
          columns: [
            { header: 'Action', name: 'action', footer: 'F1' },
            { header: 'Preposition', name: 'preposition', footer: 'F2' },
            { header: 'Article', name: 'directObject.article', footer: 'F3' },
            { header: 'Object', template: "<code>{{directObject.object}}</code>", footer: 'F4' }
          ],
          data: [
            { action: 'Curl', preposition: 'into', directObject: { article: 'a', object: 'furry donut' } },
            { action: 'Look', preposition: 'at', directObject: { article: 'a', object: 'furry donut' } },
            { action: 'Age', preposition: 'with', directObject: { article: 'a', object: 'furry donut' } },
            { action: 'Walk', preposition: 'around', directObject: { article: 'a', object: 'furry donut' } },
            { action: 'Sprinkle', preposition: 'on', directObject: { article: 'a', object: 'furry donut' } }
          ]
        }
      };
    },
    tab: function () {
      return {
        component: {
          padding: true,
          flexLayout: 'column',
          cells: [
            {
              view: 'list',
              listStyle: 'tab',
              margin: 'y',
              tab: true,
              data: [
                { view: 'link', label: 'Apple', $selected: true },
                { view: 'link', label: 'Banana' },
                { view: 'link', label: 'Celery' }
              ]
            },
            {
              view: 'list',
              listStyle: 'tab-primary',
              tab: true,
              data: [
                { view: 'link', label: 'Apple', $selected: true },
                { view: 'link', label: 'Banana' },
                { view: 'link', label: 'Celery' }
              ]
            },
            {
              view: 'list',
              listStyle: 'tab-danger',
              margin: 'y',
              tab: true,
              data: [
                { view: 'link', label: 'Apple' },
                { view: 'link', label: 'Banana' },
                { view: 'link', label: 'Celery', $selected: true }
              ]
            },
            {
              view: 'list',
              listStyle: 'tab-success',
              tab: true,
              data: [
                { view: 'link', label: 'Apple' },
                { view: 'link', label: 'Banana', $selected: true },
                { view: 'link', label: 'Celery' }
              ]
            },
            {
              view: 'list',
              listStyle: 'tab-muted',
              margin: 'y',
              tab: true,
              data: [
                { view: 'link', label: 'Apple', $selected: true },
                { view: 'link', label: 'Banana' },
                { view: 'link', label: 'Celery' }
              ]
            }
          ]
        }
      };
    },
    toggle: function () {
      return {
        component: {
          padding: true,
          flexSpace: 'around',
          cells: [
            {
              view: 'toggle',
              checked: true
            },
            {
              view: 'toggle',
              checked: true,
              color: 'primary'
            },
            {
              view: 'toggle',
              checked: true,
              color: 'success'
            },
            {
              view: 'toggle',
              checked: true,
              color: 'warning'
            },
            {
              view: 'toggle',
              checked: true,
              color: 'danger'
            }
          ]
        }
      };
    },
    tooltip: function () {
      return {
        component: {
          padding: true,
          cells: [
            {
              view: 'button',
              label: 'Show tooltip',
              buttonStyle: 'button',
              tooltip: "I'm a tooltip!"
            }
          ]
        }
      };
    },
    tree: function () {
      return {
        component: {
          padding: true,
          view: 'tree',
          data: [
            { label: 'Chicken', id: '1' },
            { label: 'Egg 1', id: '1.1', $parent: '1', $closed: true },
            { label: 'Egg 2', id: '1.2', $parent: '1' },
            { label: 'Chick 1', id: '1.1.1', $parent: '1.1' },
            { label: 'Chick 2', id: '1.2.1', $parent: '1.2' }
          ]
        }
      };
    }
  },
  properties: UI.forIn(function (name, value) {
    return UI.extend({}, value.prototype.$defaults)
  }, UI.definitions)
};


var Examples = [
  function () {
    return {
      label: 'Tab Switcher',
      component: {
        cells: [
          {
            batch: 'tab',
            view: 'list',
            listStyle: "tab-vertical",
            tab: true,
            data: [
              {
                view: 'icon',
                icon: 'heart-24',
                size: 'large',
                value: 'heart',
                $selected: true
              },
              {
                view: 'icon',
                icon: 'zap-24',
                value: 'bolt',
                size: 'large'
              },
              {
                view: 'icon',
                icon: 'star-24',
                value: 'star',
                size: 'large'
              },
              {
                view: 'icon',
                icon: 'globe-24',
                value: ['heart', 'bolt', 'star'],
                size: 'large'
              }
            ],
            on: {
              onItemClick: function (item) {
                $$('tabs').showBatch(item.value);
              }
            }
          },
          {
            id: 'tabs',
            flexSize: 'flex',
            flexAlign: 'center middle',
            flexLayout: 'column',
            defaultBatch: 'heart',
            card: true,
            margin: 'x-lg y-lg',
            style: {
              minWidth: '200px'
            },
            cells: [
              {
                batch: 'heart',
                view: 'label',
                label: CommentedStringValue("<i class='sp-icon-heart'></i> Heart", "You can use HTML directly in fields!"),
                htmlTag: 'H2'
              },
              {
                batch: 'bolt',
                view: 'label',
                label: "<i class='sp-icon-bolt'></i> Bolt",
                htmlTag: 'H2'
              },
              {
                batch: 'star',
                view: 'label',
                label: "<i class='sp-icon-star'></i> Star",
                htmlTag: 'H2'
              }
            ]
          }
        ]
      }
    }
  },
  function () {
    return {
      label: 'Tree Searching',
      component: {
        flexLayout: 'column',
        margin: 'right',
        cells: [
          {
            id: 'search',
            view: 'search',
            margin: 'bottom',
            on: {
              onInput: function () {
                $$('tree').refresh();  // Refresh tree after input
              }
            }
          },
          {
            scroll: 'y',
            style: {
              maxHeight: CommentedStringValue('345px', 'You can use any CSS property as a key in the style object.'),
              height: CommentedStringValue('345px', 'All CSS property values work also (like auto, vh, %)')
            },
            cells: [
              inheritanceTree('tree', {
                filter: function (item) {
                  // Search phrase
                  var searchPhrase = $$('search').getValue().toLowerCase();
                  var match = true;

                  if (searchPhrase) {
                    // Check keyword match in current node
                    match = item.id.indexOf(searchPhrase) != -1;
                    // Highlight keyword by modifying the 'label' field
                    if (match) {
                      var regExpr = RegExp('(' + escapeRegExp(searchPhrase) + ')', 'ig')
                      item.label = item.value.replace(regExpr, '<span class="accent-text">$&</span>');
                      item.$dirty = true;
                    } else {
                      item.$dirty = item.label !== item.value;
                      item.label = item.value;
                    }
                    // Check if any children of current node matches keyword
                    if (!match && item.$branch) {
                      match = item.$children.some(function (child) {
                        return child.id.indexOf(searchPhrase) != -1;
                      });
                    }
                  } else {
                    item.$dirty = item.label !== item.value;
                    item.label = item.value;
                  }
                  // Rerenders the current node
                  if (item.$dirty) {
                    this.refreshItem(item);
                    item.$dirty = false;
                  }
                  // Return true if node should show up in the tree
                  return !item.$parentClosed && match;
                  // Helper utility to escape special characters in the RegExp parser
                  function escapeRegExp(string) {
                    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                  }
                }
              })
            ]
          }
        ]
      }
    }
  },
  function () {
    var contacts = [
      { name: 'Ambrose', phone: CommentedStringValue('<a>XXX-222-1234</a>', 'You can use HTML in fields!'), icon: 'user' },
      { name: 'Clarine', phone: 'XXX-333-1234', icon: 'users' },
      { name: 'Mickie', phone: 'XXX-555-1234', icon: 'mail' },
      { name: 'Sammie', phone: 'XXX-111-1234', icon: 'heart' },
    ];
    return {
      label: 'Contact List',
      locals: {
        contacts: contacts
      },
      component: {
        view: 'list',
        template: function (item) {
          return {
            padding: 'small',
            flexAlign: 'middle',
            cells: [
              {
                view: 'icon',
                icon: item.icon,
                size: 'large',
                margin: 'right-lg'
              },
              {
                flexLayout: 'column',
                cells: [
                  {
                    view: 'label',
                    label: item.name
                  },
                  {
                    view: 'label',
                    label: item.phone
                  }
                ]
              }
            ]
          };
        },
        data: contacts
      }
    }
  },
  function () {
    return {
      label: 'Image Switcher',
      component: {
        flexLayout: 'column',
        margin: 'right',
        cells: [
          {
            id: 'imageSelect',
            view: 'select',
            style: {
              maxWidth: '360px'
            },
            data: [
              { label: 'Image 1', value: 'image1.jpg', desc: 'Photo by Oleksandr Kurchev on Unsplash' },
              { label: 'Image 2', value: 'image2.jpg', desc: 'Photo by Yong Chuan on Unsplash' }
            ],
            on: {
              onChange: function () {
                var item = this.findOne('value', this.getValue());
                $$('image').setSource(item);
              }
            }
          },
          {
            id: 'image',
            view: 'image',
            width: '360px',
            margin: 'y-lg',
            setSource: function (data) {
              this.set('src', 'images/' + data.value);
              $$('imageCaption').setLabel(data.desc);
            }
          },
          {
            id: 'imageCaption',
            view: 'label',
            textAlign: 'center',
            setLabel: function (label) {
              this.set('label', label);
              this.render();
            }
          }
        ],
        on: {
          onInitialized: function () {
            $$('imageSelect').dispatch('onChange');
          }
        }
      }
    }
  }
];


function wrapInForm(input) {
  return {
    padding: true,
    view: 'form',
    fieldset: [input]
  }
}


function listTemplate(listStyle, data) {
  return {
    view: 'list',
    listStyle: listStyle,
    data: mapToProperty(data, 'label', { view: 'label' }),
    margin: 'right'
  }
}


function inheritanceTree(id, props) {
  return UI.extend({
    id: id,
    view: 'tree',
    data: [
      { label: 'Element', id: id + '-element' },
      { label: 'Flexgrid', id: id + '-flexgrid', $parent: id + '-element' },
      { label: 'Stack', id: id + '-stack', $parent: id + '-element' },
      { label: 'Input', id: id + '-input', $parent: id + '-element' },
      { label: 'List', id: id + '-list', $parent: id + '-stack' },
      { label: 'Button', id: id + '-button', $parent: id + '-element' },
      { label: 'Drawer', id: id + '-drawer', $parent: id + '-element' },
      { label: 'Dropdown', id: id + '-dropdown', $parent: id + '-flexgrid' },
      { label: 'Fieldset', id: id + '-fieldset', $parent: id + '-stack' },
      { label: 'Form', id: id + '-form', $parent: id + '-element' },
      { label: 'Icon', id: id + '-icon', $parent: id + '-element' },
      { label: 'Image', id: id + '-image', $parent: id + '-element' },
      { label: 'Label', id: id + '-label', $parent: id + '-element' },
      { label: 'Link', id: id + '-link', $parent: id + '-button' },
      { label: 'Modal', id: id + '-modal', $parent: id + '-flexgrid' },
      { label: 'Progress', id: id + '-progress', $parent: id + '-element' },
      { label: 'Resizer', id: id + '-resizer', $parent: id + '-element' },
      { label: 'Scroller', id: id + '-scroller', $parent: id + '-element' },
      { label: 'Search', id: id + '-search', $parent: id + '-input' },
      { label: 'Select', id: id + '-select', $parent: id + '-list' },
      { label: 'Spacer', id: id + '-spacer', inherits: '' },
      { label: 'Tab', id: id + '-tab', $parent: id + '-stack' },
      { label: 'Table', id: id + '-table', $parent: id + '-list' },
      { label: 'Toggle', id: id + '-toggle', $parent: id + '-element' },
      { label: 'Tooltip', id: id + '-tooltip', $parent: id + '-element' },
      { label: 'Tree', id: id + '-tree', $parent: id + '-list' }
    ].map(function (item) {
      item.value = item.label;
      return item;
    })
  }, props);
}


function handleHashChange() {
  var hash = location.hash.substring(1);
  var introViews = UI.pluck($$('introView').cells, 'batch');
  var landing = document.getElementById('landing');

  if (introViews.indexOf(hash) != -1) {
    UI.addClass(landing, 'sp-hidden');
    $$('mainView').hide();
    $$('introView').showBatch(hash);
    $$('introView').show();
    $$('sideBar').setActive('value', hash);
    highlightBlocks();
    window.scrollTo(0, 0);
  }
  else if (Model.components[hash]) {
    UI.addClass(landing, 'sp-hidden');
    $$('introView').hide();
    var view = Model.aliases[hash] || hash;
    $$('methodTable').parseMethods(UI.definitions[view]);
    $$('propertiesTable').parseProperties(UI.definitions[view]);
    var config = $$('codeView').parseCode(Model.components[hash]());
    $$('componentView').parseConfig(config, view);
    $$('mainTitle').setValue(UI.capitalize(hash));
    $$('sideBar').setActive('value', hash);
    $$('mainView').show();
    highlightBlocks();
    window.scrollTo(0, 0);
  }
  else {
    $$('mainView').hide();
    $$('introView').hide();
    UI.removeClass(landing, 'sp-hidden');
  }

  gtag('event', 'change_hash', {
    'event_category': 'page',
    'event_label': hash
  });
}

function selectText(node) {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    console.warn("Could not select text in node: Unsupported browser.");
    gtag('event', 'copy_failed', {
      'event_category': 'error'
    });
  }
}

UI.def({
  __name__: 'codeview',
  $defaults: {
    cls: 'dark',
    code: ''
  },
  template: function () {
    var self = this;
    var wrapper = UI.new({
      position: 'relative',
      cells: [
        {
          view: 'icon',
          iconStyle: 'hover',
          position: 'absolute z-index',
          icon: 'copy-24',
          title: 'Copy',
          size: 'large',
          style: {
            top: '16px',
            right: '24px'
          },
          on: {
            onClick: function () {
              selectText(self.el.querySelector('code'));
              $$('copiedTooltip').open(null, 1500);
              $$('copiedTooltip').positionNextTo(this.el, 'top-center', 0, 16);
              document.execCommand('copy');
            }
          }
        }
      ]
    });

    var scroller = UI.new({
      view: 'scroller',
      flexSize: 'flex',
      style: {
        maxHeight: '400px'
      },
      cells: []
    }, wrapper.el);

    self.inner = UI.new({
      template: '<pre class="sp-margin-remove">' +
        '<code class="javascript">{{locals}}UI.new({{code}}, document.body);</code></pre>'
    }, scroller.content);

    return wrapper.el;
  },
  parseCode: function (componentData) {
    var locals = componentData.locals || {};

    var localCode = Object.keys(locals).map(function (key) {
      return UI.interpolate('var {{variable}} = {{value}};', {
        variable: key,
        value: JSON.stringify(locals[key], function (name, value) {
          if (typeof value == 'function') {
            return value.toString();
          } else if (value && value.$comment) {
            return value + '[[' + value.$comment + ']]';
          } else {
            return value;
          }
        }, '  ')
          .replace(/\[\[(.+)]]"(,?)/g, '"$2  // $1')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
      });
    }).join('\n').replace(/"([\$\w]+)":/g, '$1:');

    this.inner.config.locals = localCode ? localCode + '\n\n' : '';
    this.inner.config.code = indent.js(JSON.stringify(componentData.component,
      function (name, value) {
        var key = findKeyWithValue(locals, value);
        if (typeof value == 'function') {
          return value.toString();
        } else if (key) {
          return '~' + key + '~';
        } else if (value && value.$comment) {
          return value + '[[' + value.$comment + ']]';
        } else {
          return value;
        }
      }, "  ")
      .replace(/\[\[(.+)]]"(,?)/g, '"$2  // $1')
      .replace(/"function/g, 'function')
      .replace(/}"/g, '}')
      .replace(/"([\$\w]+)":/g, '$1:')
      .replace(/"~/g, '')
      .replace(/~"/g, '')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'), { tabString: "  " });

    this.inner.render();

    return componentData.component;
  }
}, UI.definitions.element);


UI.new({
  template: [
    {
      style: {
        height: '64px'
      }
    },
    {
      id: "navBar",
      cls: ['sp-navbar', 'sp-position-fixed', 'sp-position-cover', 'sp-card-muted'],
      template: {
        padding: 'x',
        flexAlign: 'middle',
        fill: 'height',
        cells: [
          {
            view: 'link',
            cls: 'sp-navbar-toggle',
            device: 'touch',
            margin: 'right-sm',
            on: {
              onClick: function () {
                $$('sideDrawer').open();
              }
            }
          },
          {
            view: 'image',
            src: 'logo-mark.svg',
            width: 42
          },
          {
            view: 'label',
            htmlTag: 'h4',
            textColor: 'contrast',
            label: 'UI'
          },
          {
            view: 'list',
            listStyle: 'navbar',
            cls: 'sp-form',
            flex: true,
            flexAlign: 'middle',
            style: {
              marginLeft: 'auto'
            },
            data: [
              {
                view: 'link',
                screen: 'except-small',
                icon: 'logo-github-16',
                href: 'https://github.com/spckio/spck-ui',
                target: '_blank'
              },
              {
                view: 'link',
                icon: 'moon-16',
                margin: 'x',
                cls: 'sp-button-circle',
                on: {
                  onClick: function () {
                    this.darkMode = !this.darkMode
                    if (this.darkMode) {
                      UI.addClass(document.documentElement, 'dark')
                      UI.addClass(this.element, 'sp-primary')
                    } else {
                      UI.removeClass(document.documentElement, 'dark')
                      UI.removeClass(this.element, 'sp-primary')
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ]
}, document.getElementById('navbar'));

UI.new({
  id: "sideDrawer",
  view: "drawer",
  touchOnly: true,
  edge: true,
  template: {
    view: 'scroller',
    style: {
      minWidth: '200px',
      width: '200px'
    },
    cells: [
      {
        id: 'sideBar',
        view: 'list',
        listStyle: 'nav-side-primary',
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
            label: 'Introduction',
            $selected: true,
            margin: 'left'
          },
          {
            view: 'link',
            label: 'Installation',
            value: 'installation',
            margin: 'left'
          },
          {
            view: 'link',
            label: 'Examples',
            value: 'examples',
            margin: 'left'
          },
          { $divider: true },
          { $header: true, label: 'Components' }
        ].concat(Object.keys(Model.components).sort().map(function (n) {
          return {
            view: 'link',
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
  id: 'introView',
  text: 'large',
  margin: 'y-lg',
  cells: [
    {
      batch: 'installation',
      flexLayout: 'column',
      cells: [
        {
          view: 'label',
          label: 'Installation',
          htmlTag: 'H1',
          margin: 'bottom'
        },
        {
          template: "<p>Adding the library to your project is no complicated than adding jQuery or Bootstrap to your project. There aren't any complicated build tools, all that's required is <a href='https://nodejs.org' target='_blank'>Node.js</a> or <a href='https://bower.io' target='_blank'>Bower</a>. Alternatively, you can just directly include the library using the CDN links, if you want to quickly use the library without downloading it.</p>"
        },
        {
          view: 'label',
          label: 'Getting the Library',
          htmlTag: 'H2',
          margin: 'y-lg'
        },
        {
          view: 'label',
          label: 'The library is available on popular package repositories.'
        },
        {
          template: '<ul><li>To install with bower, run the following command: <code>bower install spck-ui</code></li><li>Likewise, to install with npm, run the following: <code>npm install spck-ui</code></li><li>To install the newest <b class="sp-text-primary">unreleased</b> code, run the following: <code>bower install spck-ui#master</code></li></ul>'
        },
        {
          view: 'label',
          label: 'Adding the HTML Tags',
          htmlTag: 'H2',
          margin: 'y-lg'
        },
        {
          template: '<span>To add the default CSS styling, add this tag to your HTML file:</span><pre><code class="html">&lt;!-- Bower installation --&gt;\n&lt;link rel="stylesheet" href="bower_components/spck-ui/dist/spck-ui.css"&gt;\n&lt;!-- Npm installation --&gt;\n&lt;link rel="stylesheet" href="node_modules/spck-ui/dist/spck-ui.css"&gt;</code></pre>'
        },
        {
          template: '<span>To add the <b>optional</b> library icons (from UIkit 3), add this tag to your HTML file:</span><pre><code class="html">&lt;!-- Bower installation --&gt;\n&lt;link rel="stylesheet" href="bower_components/spck-ui/dist/spck-ui-icons.css"&gt;\n&lt;!-- Npm installation --&gt;\n&lt;link rel="stylesheet" href="node_modules/spck-ui/dist/spck-ui-icons.css"&gt;</code></pre>'
        },
        {
          template: '<p>To add the library scripts, add this tag to your HTML file:</p><pre><code class="html">&lt;script src="jquery.js" type="text/javascript"&gt;&lt;/script&gt;\n&lt;!-- Bower installation --&gt;\n&lt;script src="bower_components/spck-ui/dist/spck-ui.js" type="text/javascript"&gt;&lt;/script&gt;\n&lt;!-- Npm installation --&gt;\n&lt;script src="node_modules/spck-ui/dist/spck-ui.js" type="text/javascript"&gt;&lt;/script&gt;</code></pre>'
        },
        {
          margin: 'y-lg',
          flexLayout: 'column',
          cells: [
            {
              view: 'label',
              textColor: 'primary',
              label: 'Tip',
              text: 'bold',
              card: 'header'
            },
            {
              template: '<p>You must include a non-slim version of <b>jQuery 2.x or 3.x</b> before including the library. Otherwise, you will get an error when trying to load the library.</p><span>The icon CSS file is completely optional as the icon font file is embedded into the CSS file, so it is quite large. You may want to exclude it if you are not using any of the default icons.</span>'
            }
          ]
        },
        {
          view: 'label',
          label: 'CDN Links',
          htmlTag: 'H2',
          margin: 'y-lg'
        },
        {
          template: 'There are CDN links available for the library thanks to the <a href="https://unpkg.com" target="_blanks">unpkg</a> service.<pre><code class="html">&lt;link rel="stylesheet" href="https://unpkg.com/spck-ui@latest/dist/spck-ui.css"&gt;\n&lt;link rel="stylesheet" href="https://unpkg.com/spck-ui@latest/dist/spck-ui-icons.css"&gt;\n&lt;script src="https://unpkg.com/spck-ui@latest/dist/spck-ui.js" type="text/javascript"&gt;&lt;/script&gt;</code></pre>'
        }
      ]
    },
    {
      batch: 'examples',
      flexLayout: 'column',
      cells: [
        {
          view: 'label',
          label: 'Examples',
          htmlTag: 'H1',
          margin: 'bottom'
        },
        {
          template: "<p>Learning a library can be difficult. This is why we have provided a list of advanced examples to help. We believe these examples can help teach a few additional ways of using the library that may not be obvious at first.</p>"
        }
      ].concat(Examples.map(function (example) {
        var data = example();
        return {
          margin: 'y-lg',
          card: true,
          flexLayout: 'column',
          flexSize: 'auto',
          cells: [
            {
              view: 'label',
              label: data.label,
              htmlTag: 'H2',
              card: 'header',
              margin: 'bottom-lg'
            },
            {
              flexLayout: 'column-small',
              cells: [
                {
                  flexSize: 'none',
                  cells: [data.component]
                },
                {
                  screen: 'small',
                  view: 'spacer',
                  height: 32
                },
                {
                  view: 'scroller',
                  flexSize: 'flex',
                  style: {
                    maxHeight: '400px',
                    height: '400px',
                    borderRadius: '4px'
                  },
                  cells: [
                    {
                      view: 'codeview',
                      on: {
                        onInitialized: function () {
                          this.parseCode(example());
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        };
      }))
    }
  ],
}, document.getElementById('main'));


UI.new({
  view: 'scroller',
  style: {
    maxHeight: '320px',
    height: '320px'
  },
  cells: [
    inheritanceTree('inhertanceTree')
  ]
}, document.getElementById('inhertiance'));


UI.new({
  id: 'copiedTooltip',
  view: 'tooltip',
  label: 'Copied!'
}, document.body);


UI.new({
  id: 'mainView',
  flexLayout: 'column',
  margin: 'y-lg',
  hidden: true,
  cells: [
    {
      id: 'exampleView',
      card: true,
      flexSize: 'none',
      flexLayout: 'column',
      cells: [
        {
          batch: 'tab',
          card: 'header',
          flexAlign: 'middle',
          flexSpace: 'between',
          cells: [
            {
              id: 'mainTitle',
              view: 'label',
              htmlTag: 'H5'
            },
            {
              view: 'list',
              listStyle: 'tab-primary',
              tab: true,
              data: [
                { view: 'link', label: 'Preview', value: 'component', $selected: true },
                { view: 'link', label: 'Code', value: 'code' }
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
            }
          ]
        },
        {
          id: 'componentView',
          batch: 'component',
          flexSize: 'none',
          scroll: 'x',
          card: 'body-blank',
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
          view: 'codeview',
          card: 'body-blank'
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
          card: 'header',
          flexAlign: 'middle',
          flexSpace: 'between',
          cells: [
            {
              id: 'propsTitle',
              view: 'label',
              htmlTag: 'H5',
              label: 'Properties'
            },
            {
              view: 'list',
              listStyle: 'tab-primary',
              tab: true,
              data: [
                { view: 'link', label: 'Props', value: 'properties', $selected: true },
                { view: 'link', label: 'Methods', value: 'methods' }
              ],
              on: {
                onItemClick: function (item) {
                  this.setActiveLabel(item.label);
                  var view = $$('apiView');
                  var title = $$('propsTitle')

                  switch (item.value) {
                    case 'properties':
                      title.setValue('Properties')
                      view.showBatch(['tab', 'props']);
                      break;

                    case 'methods':
                      title.setValue('Methods')
                      view.showBatch(['tab', 'methods']);
                      break;
                  }
                }
              }
            }
          ]
        },
        {
          batch: 'props',
          flexLayout: 'column',
          card: 'body-blank',
          scroll: 'x',
          cells: [
            {
              id: 'propertiesTable',
              view: 'table',
              tableStyle: 'flat',
              header: true,
              style: {
                minWidth: '600px'
              },
              columns: [
                {
                  header: 'Name',
                  template: function (item) {
                    if (item.title) {
                      return '<h6>{{name}}</h6>';
                    } else if (item.header) {
                      return '<div class="sp-text-capitalize sp-text-primary">{{name}}</div>';
                    } else {
                      return '<span class="sp-text-nowrap">{{name}}</span>';
                    }
                  }
                },
                {
                  header: 'Type',
                  template: function (item) {
                    return item.types.reduce(function (html, type) {
                      return html + '<span class="sp-badge sp-margin-small-x sp-margin-mini-y">' + type + '</span>'
                    }, '');
                  }
                },
                {
                  header: 'Description',
                  name: 'desc'
                },
                {
                  header: 'Opts',
                  template: function (item) {
                    return item.options ? {
                      view: 'button',
                      cls: 'sp-text-nowrap',
                      icon: 'kebab-horizontal-16',
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
                bases[name] = true;
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
                      types: meta[n].$$types || [],
                      desc: UI.isString(meta[n]) ? meta[n] : meta[n].$$desc || '',
                      options: meta[n].options
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
                      types: setters[s].$$types || (setters[s].options ? ['string', 'string[]'] : []),
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
                      types: [],
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
          batch: 'methods',
          flexLayout: 'column',
          card: 'body-blank',
          scroll: 'x',
          cells: [
            {
              id: 'methodTable',
              view: 'table',
              header: true,
              tableStyle: 'flat',
              columns: [
                {
                  header: 'Name',
                  template: function (item) {
                    if (item.title) {
                      return '<h6>{{header}}</h6>';
                    } else if (item.header) {
                      return '<div class="sp-text-capitalize sp-text-primary">{{header}}</div>';
                    } else {
                      return '<span class="sp-text-nowrap">{{name}}</span>';
                    }
                  }
                },
                {
                  header: 'Description',
                  template: function (method) {
                    var params = method.params
                    return {
                      margin: 'y',
                      template: [
                        method.summary,
                        params && params.length ? {
                          view: 'table',
                          header: true,
                          margin: 'top',
                          data: params,
                          columns: [
                            {
                              header: 'Parameter',
                              name: 'name'
                            },
                            {
                              header: 'Description',
                              name: 'description'
                            }
                          ]
                        } : null,
                        method.dispatch ? '<h6 class="sp-margin-top sp-margin-small-bottom">Dispatch</h6>' + method.dispatch : null,
                        method.example ? '<h6 class="sp-margin-top sp-margin-small-bottom">Example</h6>{{$$code}}' : null,
                        method.returns ? '<h6 class="sp-margin-top sp-margin-small-bottom">Return</h6>{{$$returns}}' : null
                      ],
                      $$returns: method.returns ? formatReturnsString(method.returns) : null,
                      $$code: method.example ? '<code>' + method.example + '</code>' : null
                    }
                  }
                }
              ],
              style: {
                minWidth: '600px'
              },
              parseMethods: function (component) {
                this.setData(getComponentMethods(component));
              }
            }
          ]
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
    '<span class="sp-badge sp-badge-notification sp-margin-right">{{type}}</span>', { type: type }))
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
          params.push({ name: l[1], description: l.slice(2).join(' ') });
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
    return { name: name, summary: summary, dispatch: dispatch, returns: returns, params: params, example: example };
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
