!(function (exports) {
  var $definitions = exports.definitions;
  var Types = {
    boolean: 'bool',
    string: 'string',
    array: '[]',
    object: 'object',
    number: 'number',
    func: 'func',
    Component: 'Component'
  };

  (function ($setters) {
    $setters.screen.$$desc = 'Determines which screen size to show the component on.';
    $setters.badge.$$desc = 'Change the label style to a badge.';
    $setters.card.$$desc = 'Change the element style to a card.';
    $setters.fill.$$desc = 'Determine how the element will fill its parent.';
    $setters.margin.$$desc = 'Add margins to the component.';
    $setters.position.$$desc = 'Change the CSS property <code>position</code>.';
    $setters.display.$$desc = 'Change the CSS property <code>display</code>.';
    $setters.hidden.$$desc = 'Show or hide the component.';
    $setters.animation.$$desc = 'Animation classes to use for the component.';
    $setters.selectable.$$desc = 'Change text to unselectable.';
    $setters.flex.$$types = [Types.boolean];
    $setters.flex.$$desc = 'Change component to use flex layout.';
    $setters.flexOrder.$$desc = 'Flex order of the component.';
    $setters.flexLayout.$$desc = 'Set the flex layout class.';
    $setters.flexAlign.$$desc = 'Set the flex alignment class.';
    $setters.flexSize.$$desc = 'Set the flex size class.';
    $setters.flexSpace.$$desc = 'Set the flex spacing class.';
    $setters.flexWrap.$$desc = 'Set the flex wrap class.';
    $setters.float.$$desc = 'Change the CSS property <code>float</code>.';
    $setters.textAlign.$$desc = 'Change the CSS property <code>text-align</code>.';
    $setters.textColor.$$desc = 'Set the text color from a list of predefined colors.';
    $setters.text.$$desc = 'Special text classes, mostly transformations.';
    $setters.wrap.$$desc = 'Text wrap classes for the component.';
    $setters.scroll.$$desc = 'Determine the scrolling behavior of the component.';
    $setters.padding.$$desc = 'Padding classes for the component.';
    $setters.device.$$desc = 'Show the component on touch or no-touch devices only.';
  }(exports.CommonStyles.$setters));


  (function ($setters) {
    $setters.href.$$types = [Types.string];
    $setters.href.$$desc = 'Set the <code>href</code> attribute.';
    $setters.target.$$types = [Types.string];
    $setters.target.$$desc = 'Set the <code>target</code> attribute.';
  }(exports.MouseEvents.$setters));


  (function ($setters) {
    $setters.disabled.$$desc = 'Set the <code>disabled</code> attribute.';
    $setters.disabled.$$types = [Types.boolean];
    $setters.uploader.$$types = [Types.boolean];
    $setters.uploader.$$desc = 'Turns the component into an upload button.';
    $setters.tooltip.$$desc = 'Add a tooltip to the component.';
    $setters.tooltip.$$types = [Types.string];
    $setters.title.$$desc = 'Set the <code>title</code> attribute of the element.';
    $setters.title.$$types = [Types.string];
    $setters.cls.$$desc = 'Custom CSS classes for the component.';
    $setters.cls.$$types = [Types.string, Types.string + Types.array];
    $setters.dropdown.$$types = [Types.object];
    $setters.dropdown.$$desc = 'Configuration object to show in a dropdown component.';

    $setters.$$meta = {
      dropdownEvent: {$$types: [Types.string], $$desc: "The event type to trigger a dropdown."},
      dropdownOptions: {$$types: [Types.object], $$desc: "Configuration passed to dropdown component."},
      template: {$$types: [Types.func, Types.string, Types.object], $$desc: "For examples, see source code on Github."},
      style: {$$types: [Types.object], $$desc: "A object containing properties to feed into the style attribute of the element."}
    };
  }($definitions.element.prototype.$setters));


  (function ($setters) {
    $setters.cells.$$types = [Types.object + Types.array];
    $setters.cells.$$desc = "An array of Component configuration objects.";
    $setters.$$meta = {
      defaultBatch: {
        $$types: [Types.string, Types.string + Types.array],
        $$desc: 'Upon initializing, <code>showBatch</code> will be called with this value.'
      }
    };
  }($definitions.flexgrid.prototype.$setters));


  (function ($setters) {
    $setters.dropdown.$$types = [Types.object];
    $setters.dropdown.$$desc = "Configuration object to put in the dropdown.";
  }($definitions.dropdown.prototype.$setters));


  (function ($setters) {
    $setters.multiple.$$types = [Types.boolean];
    $setters.multiple.$$desc = "Set the <code>multiple</code> attribute of the form control.";
  }($definitions.select.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      scrollDirection: {
        $$types: [Types.string],
        $$desc: "Change the scroll direction of the scroller.",
        options: {'y': 'y', 'x': 'x'}
      }
    }
  }($definitions.scroller.prototype.$setters));


  (function ($setters) {
    $setters.help.$$types = [Types.string];
    $setters.help.$$desc = "Set the help text of the form control.";
    $setters.formClass.options = {"": "", "danger": "danger", "success": "success"};
    $setters.formClass.$$desc = "Set the validation class of the form control.";
    $setters.type.$$types = [Types.string];
    $setters.type.$$desc = "Set the <code>type</code> attribute of the form control.";
    $setters.value.$$desc = "Initial value of the input element.";
    $setters.value.$$types = [Types.string];
    $setters.size.$$desc = "Form control size classes.";
  }(exports.FormControl.$setters));


  (function ($setters) {
    $setters.bodyWidth.$$types = [Types.string];
    $setters.bodyWidth.$$desc = 'Change the CSS property <code>width</code> of the dialog body element.';
    $setters.bodyHeight.$$types = [Types.string];
    $setters.bodyHeight.$$desc = 'Change the CSS property <code>height</code> of the dialog body element.';
    $setters.dialogStyle.$$desc = 'Predefined modal dialog style classes.';
    $setters.closeButton.$$types = [Types.boolean];
    $setters.closeButton.$$desc = 'Show or hide the modal close button.';
    $setters.body.$$desc = "Configuration object to put in the modal body";
    $setters.header.$$desc = "Configuration object to put in the modal header";
    $setters.footer.$$desc = "Configuration object to put in the modal footer";
    $setters.caption.$$types = [Types.string];
    $setters.caption.$$desc = 'Modal caption text.';
    $setters.$$meta = {
      bgClose: {$$types: [Types.boolean], $$desc: 'If true, modal will close when the modal backdrop is clicked.'},
      keyboard: {$$types: [Types.boolean], $$desc: 'If true, modal will can be dismissed via keyboard ESC key.'},
      minScrollHeight: {$$types: [Types.number], $$desc: 'Minimum height for modal container to be scrollable.'},
      closeModals: {$$types: [Types.boolean], $$desc: 'If true, other active modals will be dismissed before showing this modal.'},
      center: {$$types: [Types.boolean], $$desc: 'If true, modal will be placed in the center of the screen.'}
    };
  }($definitions.modal.prototype.$setters));


  (function ($setters) {
    $setters.buttonStyle.$$desc = 'Predefined button style classes.';
    $setters.size.$$desc = 'Size classes for controlling the button appearance.';
    $setters.color.$$desc = "Color classes for changing the button appearance.";

    $setters.$$meta = {
      label: {$$types: [Types.string], $$desc: 'Displayed label for the component.'},
      labelClass: {
        $$types: [Types.string],
        $$desc: 'CSS class for the label.'
      },
      alignIconRight: {
        $$types: [Types.boolean],
        $$desc: 'Displayed icon on the right side.'
      },
      icon: {
        $$types: [Types.string],
        $$desc: 'Shorthand icon class, leave out the sp-icon prefix.'
      },
      iconSize: {
        $$types: [Types.string],
        $$desc: 'Predefined icon size classes.'
      },
      iconClass: {
        $$types: [Types.string],
        $$desc: 'CSS class for the icon.'
      },
      iconContent: {
        $$types: [Types.string],
        $$desc: 'Content within the icon tag.'
      },
      iconTemplate: {
        $$types: [Types.string, Types.func],
        $$desc: 'Function that return the icon HTML.'
      }
    };
  }($definitions.button.prototype.$setters));


  (function ($setters) {
    $setters.src.$$types = [Types.string];
    $setters.src.$$desc = 'Set the <code>src</code> attribute of the image.';
    $setters.width.$$types = [Types.string, Types.number];
    $setters.width.$$desc = 'Set the <code>width</code> attribute of the image.';
    $setters.height.$$types = [Types.string, Types.number];
    $setters.height.$$desc = 'Set the <code>height</code> attribute of the image.';
  }($definitions.image.prototype.$setters));

  (function ($setters) {
    $setters.iconStyle.$$desc = 'Predefined icon style classes.';
    $setters.$$meta = {
      icon: {
        $$types: [Types.string],
        $$desc: 'Shorthand icon class, leave out the sp-icon prefix.'
      },
      iconSize: {
        $$types: [Types.string],
        $$desc: 'Predefined icon size classes.'
      },
      iconClass: {
        $$types: [Types.string],
        $$desc: 'CSS class for the icon.'
      },
      iconContent: {
        $$types: [Types.string],
        $$desc: 'Content within the icon tag.'
      },
      iconTemplate: {
        $$types: [Types.string, Types.func],
        $$desc: 'Function that return the icon HTML.'
      }
    };
  }($definitions.icon.prototype.$setters));


  (function ($setters) {
    $setters.labelStyle.$$desc = 'Predefined label style classes.';
    $setters.$$meta = {
      label: {$$types: [Types.string], $$desc: 'Displayed label.'}
    };
  }($definitions.label.prototype.$setters));


  (function ($setters) {
    $setters.color.$$desc = "Color classes for changing the progress appearance.";
    $setters.size.$$desc = 'Size classes for controlling the progress appearance.';
    $setters.value.$$types = [Types.number];
    $setters.value.$$desc = "Value of the progress, a number between 0-100.";
  }($definitions.progress.prototype.$setters));


  (function ($setters) {
    $setters.autocomplete.$$types = [Types.boolean];
    $setters.autocomplete.$$desc = 'Set the <code>autocomplete</code> attribute of the input.';
    $setters.autocapitalize.$$types = [Types.boolean];
    $setters.autocapitalize.$$desc = 'Set the <code>autocapitalize</code> attribute of the input.';
    $setters.autocorrect.$$types = [Types.boolean];
    $setters.autocorrect.$$desc = 'Set the <code>autocorrect</code> attribute of the input.';
    $setters.placeholder.$$types = [Types.string];
    $setters.placeholder.$$desc = 'Set the <code>placeholder</code> attribute of the input.';
  }(exports.InputControl.$setters));


  (function ($setters) {
    $setters.readonly.$$types = [Types.boolean];
    $setters.readonly.$$desc = 'Set the <code>readonly</code> attribute of the input.';
    $setters.size.$$desc = 'Size classes for controlling the input appearance.';
    $setters.width.$$desc = 'Width classes for controlling the input appearance.';
  }($definitions.input.prototype.$setters));


  (function ($setters) {
    $setters.direction.$$desc = 'Set the direction of the tooltip, which affects the arrow direction.';
    $setters.$$meta = {
      label: {$$types: [Types.string], $$desc: 'Displayed label for the tooltip.'}
    };
  }($definitions.tooltip.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      height: {$$types: [Types.string, Types.number], $$desc: 'Change the CSS property <code>height</code> of the spacer element.'},
      width: {$$types: [Types.string, Types.number], $$desc: 'Change the CSS property <code>width</code> of the spacer element.'}
    };
  }($definitions.spacer.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      inputClass: {
        $$types: [Types.string],
        $$desc: 'CSS class applied to the input element.'
      },
      alignIconRight: {
        $$types: [Types.boolean],
        $$desc: 'Displayed icon on the right side.'
      },
      icon: {
        $$types: [Types.string],
        $$desc: 'Shorthand icon class, leave out the sp-icon prefix.'
      },
      iconSize: {
        $$types: [Types.string],
        $$desc: 'Predefined icon size classes.'
      },
      iconClass: {
        $$types: [Types.string],
        $$desc: 'CSS class for the icon.'
      },
      iconContent: {
        $$types: [Types.string],
        $$desc: 'Content within the icon tag.'
      },
      iconTemplate: {
        $$types: [Types.string, Types.func],
        $$desc: 'Function that return the icon HTML.'
      }
    };
  }($definitions.search.prototype.$setters));


  (function ($setters) {
    $setters.checked.$$types = [Types.boolean];
    $setters.checked.$$desc = 'Set the <code>checked</code> attribute of the checkbox input.';
    $setters.color.$$desc = 'Color classes for changing the toggle appearance.';
  }($definitions.toggle.prototype.$setters));


  (function ($setters) {
    $setters.direction.$$desc = 'Change the direction of the resizer.';
    $setters.$$meta = {
      minValue: {
        $$types: [Types.number, Types.func],
        $$desc: 'Minimum screen value in pixels, or a function that returns it, that resizer cannot go past.'
      },
      maxValue: {
        $$types: [Types.number, Types.func],
        $$desc: 'Maximum screen value in pixels, or a function that returns it, that the resizer cannot exceed.'
      }
    }
  }($definitions.resizer.prototype.$setters));


  (function ($setters) {
    $setters.edge.$$types = [Types.boolean];
    $setters.edge.$$desc = 'If true, drawer will be openable by swiping the edges of the screen. (Touch devices only)';
    $setters.touchOnly.$$types = [Types.boolean];
    $setters.touchOnly.$$desc = 'If true, drawer will be always open on no-touch devices.';
    $setters.flipped.$$types = [Types.boolean];
    $setters.flipped.$$desc = 'If true, drawer will show on right-side rather than left.';
  }($definitions.drawer.prototype.$setters));


  (function ($setters) {
    $setters.filter.$$types = [Types.func];
    $setters.filter.$$desc = 'Function to determine which child components to display. The function is passed the child component object.';
    $setters.droppable.$$types = [Types.func];
    $setters.droppable.$$desc = 'Function to determine if a child component can be drag and dropped upon. The function is passed the child component object.';
    $setters.$$meta = {
      data: {$$types: [Types.Component + Types.array], $$desc: 'An array of item/component objects.'},
      itemTagClass: {$$types: [Types.string], $$desc: 'CSS class applied to each item element.'}
    };
  }($definitions.stack.prototype.$setters));


  (function ($setters) {
    $setters.listStyle.$$desc = 'Predefined list style classes.';
    $setters.tab.$$types = [Types.number, Types.boolean]
    $setters.tab.$$desc = 'Set additional behaviors for tabs such as <code>onItemClick, onTabMenuClick, onItemSelectionChanged</code> events.';
    $setters.tab.options = {"false": "false", "true": "true", "responsive": "responsive"};
  }($definitions.list.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      indentWidth: {$$types: [Types.number], $$desc: 'Change the indentation in pixels per depth in the tree.'},
      dataTransfer: 'The data representation of an item, only for FireFox.',
      draggable: {$$types: [Types.boolean], $$desc: 'If true, tree child elements are draggable.'},
      orderAfter: {$$types: [Types.func], $$desc: 'Low level function that determines ordering of tree items.'},
      droppable: {
        $$types: [Types.func],
        $$desc: 'Function that determines if an item can be dropped upon.'
      }
    };
  }($definitions.tree.prototype.$setters));


  (function ($setters) {
    $setters.tableStyle.$$desc = 'Predefined table style classes.';
    $setters.columns.$$desc = "List of schema objects containing data display info.";
    $setters.columns.$$types = [Types.object + Types.array];
    $setters.header.$$desc = "List of header objects containing the header and alignment info.";
    $setters.header.$$types = [Types.object + Types.array, Types.boolean];
    $setters.footer.$$desc = "List of footer objects containing the footer title.";
    $setters.footer.$$types = [Types.object + Types.array, Types.boolean];
    $setters.caption.$$desc = 'Table caption text.';
    $setters.caption.$$types = [Types.string];
  }($definitions.table.prototype.$setters));


  (function ($setters) {
    $setters.formStyle.$$desc = 'Predefined form style classes.';
  }($definitions.fieldset.prototype.$setters));


  (function ($setters) {
    $setters.formStyle.$$desc = 'Predefined form style classes.';
    $setters.fieldset.$$desc = 'Fieldset configuration object.';
    $setters.fieldset.$$types = [Types.object];
    $setters.fieldsets.$$desc = 'An array of Fieldset configuration objects.';
    $setters.fieldsets.$$types = [Types.object + Types.array];
  }($definitions.form.prototype.$setters));

  Object.keys($definitions).forEach(function (def) {
    var setters = $definitions[def].prototype.$setters;
    var meta = setters.$$meta || {};
    Object.keys(meta).forEach(function (n) {
      meta[n].__class__ = def;
    });
  });

  Object.keys($definitions).forEach(function (def) {
    var setters = $definitions[def].prototype.$setters;
    var bases = $definitions[def].prototype.__bases__;
    var meta = setters.$$meta || {};

    setters.$$meta = meta;
    bases.forEach(function (base) {
      if (UI.isFunction(base)) base = base.prototype;
      var $setters = base.$setters || {};
      UI.defaults(meta, $setters.$$meta || {});
    });
  });

  exports.debug = true;
}(UI));
