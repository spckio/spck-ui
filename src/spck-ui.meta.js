(function (exports) {
  var $definitions = exports.definitions;

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
    $setters.flex.$$type = 'boolean';
    $setters.flex.$$desc = 'Change component to use flex layout.';
    $setters.flexOrder.$$desc = 'Flex order of the component.';
    $setters.flexLayout.$$desc = 'Set the flex layout class.';
    $setters.flexAlign.$$desc = 'Set the flex alignment class.';
    $setters.flexSize.$$desc = 'Set the flex size class.';
    $setters.flexSpace.$$desc = 'Set the flex spacing class.';
    $setters.flexWrap.$$desc = 'Set the flex wrap class.';
    $setters.float.$$desc = 'Change the CSS property <code>float</code>.';
    $setters.halign.$$desc = 'Determine horizontal alignment for non-flex layout.';
    $setters.valign.$$desc = 'Determine vertical alignment for non-flex layout.';
    $setters.textAlign.$$desc = 'Change the CSS property <code>text-align</code>.';
    $setters.textColor.$$desc = 'Set the text color from a list of predefined colors.';
    $setters.text.$$desc = 'Special text classes, mostly transformations.';
    $setters.wrap.$$desc = 'Text wrap classes for the component.';
    $setters.scroll.$$desc = 'Determine the scrolling behavior of the component.';
    $setters.padding.$$desc = 'Padding classes for the component.';
    $setters.device.$$desc = 'Show the component on touch or no-touch devices only.';
  }(exports.CommonStyles.$setters));


  (function ($setters) {
    $setters.href.$$type = 'String';
    $setters.href.$$desc = 'Set the <code>href</code> attribute.';
    $setters.target.$$type = 'String';
    $setters.target.$$desc = 'Set the <code>target</code> attribute.';
  }(exports.ClickEvents.$setters));


  (function ($setters) {
    $setters.disabled.$$desc = 'Set the <code>disabled</code> attribute.';
    $setters.disabled.$$type = 'boolean';
    $setters.sticky.$$type = 'object';
    $setters.sticky.$$desc = 'Makes the component sticky on the screen.';
    $setters.uploader.$$type = 'boolean';
    $setters.uploader.$$desc = 'Turns the component into an upload button.';
    $setters.tooltip.$$desc = 'Add a tooltip to the component.';
    $setters.tooltip.$$type = 'string';
    $setters.cls.$$desc = 'Custom CSS classes for the component.';
    $setters.cls.$$type = 'string | string[]';
    $setters.dropdown.$$type = 'object';
    $setters.dropdown.$$desc = 'Configuration object to show in a dropdown component.';

    $setters.$$meta = {
      dropdownEvent: {$$type: "string", $$desc: "The event type to trigger a dropdown."},
      dropdownOptions: {$$type: "object", $$desc: "Configuration passed to dropdown component."},
      template: {$$type: "Function | string | object", $$desc: "For examples, see source code on Github."},
      style: {$$type: "object", $$desc: "A object containing properties to feed into the style attribute of the element."}
    };
  }($definitions.element.prototype.$setters));


  (function ($setters) {
    $setters.cells.$$type = 'object[]';
    $setters.cells.$$desc = "An array of Component configuration objects.";
  }($definitions.flexgrid.prototype.$setters));


  (function ($setters) {
    $setters.dropdown.$$type = 'object';
    $setters.dropdown.$$desc = "Configuration object to put in the dropdown.";
  }($definitions.dropdown.prototype.$setters));


  (function ($setters) {
    $setters.multiple.$$type = 'boolean';
    $setters.multiple.$$desc = "Set the <code>multiple</code> attribute of the form control.";
  }($definitions.select.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      scrollDirection: {
        $$type: 'string',
        $$desc: "Change the scroll direction of the scroller.",
        options: {'y': 'y', 'x': 'x'}
      }
    }
  }($definitions.scroller.prototype.$setters));


  (function ($setters) {
    $setters.help.$$type = 'string';
    $setters.help.$$desc = "Set the help text of the form control.";
    $setters.formClass.options = {"": "", "danger": "danger", "success": "success"};
    $setters.formClass.$$desc = "Set the validation class of the form control.";
    $setters.type.$$type = 'string';
    $setters.type.$$desc = "Set the <code>type</code> attribute of the form control.";
    $setters.value.$$desc = "Initial value of the input element.";
    $setters.value.$$type = 'string';
    $setters.size.$$desc = "Form control size classes.";
  }(exports.FormControl.$setters));


  (function ($setters) {
    $setters.bodyWidth.$$type = 'string';
    $setters.bodyWidth.$$desc = 'Change the CSS property <code>width</code> of the dialog body element.';
    $setters.bodyHeight.$$type = 'string';
    $setters.bodyHeight.$$desc = 'Change the CSS property <code>height</code> of the dialog body element.';
    $setters.dialogStyle.$$desc = 'Predefined modal dialog style classes.';
    $setters.closeButton.$$type = 'boolean';
    $setters.closeButton.$$desc = 'Show or hide the modal close button.';
    $setters.body.$$desc = "Configuration object to put in the modal body";
    $setters.header.$$desc = "Configuration object to put in the modal header";
    $setters.footer.$$desc = "Configuration object to put in the modal footer";
    $setters.caption.$$type = 'string';
    $setters.caption.$$desc = 'Modal caption text.';
    $setters.$$meta = {
      bgClose: {$$type: 'boolean', $$desc: 'If true, modal will close when the modal backdrop is clicked.'},
      keyboard: {$$type: 'boolean', $$desc: 'If true, modal will can be dismissed via keyboard ESC key.'},
      minScrollHeight: {$$type: 'number', $$desc: 'Minimum height for modal container to be scrollable.'},
      closeModals: {$$type: 'boolean', $$desc: 'If true, other active modals will be dismissed before showing this modal.'},
      center: {$$type: 'boolean', $$desc: 'If true, modal will be placed in the center of the screen.'}
    };
  }($definitions.modal.prototype.$setters));


  (function ($setters) {
    $setters.buttonStyle.$$desc = 'Predefined button style classes.';
    $setters.size.$$desc = 'Size classes for controlling the button appearance.';
    $setters.color.$$desc = "Color classes for changing the button appearance.";

    $setters.$$meta = {
      iconClass: {$$type: 'string', $$desc: 'CSS class to apply to the icon. For example: <code>uk-icon-small</code>.'},
      icon: {$$type: 'string', $$desc: 'CSS class for button icon. This is the full CSS class name, no shorthands. For example: <code>uk-icon-heart</code>.'},
      label: {$$type: 'string', $$desc: 'Displayed label for the button.'}
    };
  }($definitions.button.prototype.$setters));


  (function ($setters) {
    $setters.src.$$type = 'string';
    $setters.src.$$desc = 'Set the <code>src</code> attribute of the image.';
    $setters.width.$$type = 'number | string';
    $setters.width.$$desc = 'Set the <code>width</code> attribute of the image.';
    $setters.height.$$type = 'number | string';
    $setters.height.$$desc = 'Set the <code>height</code> attribute of the image.';
  }($definitions.image.prototype.$setters));


  (function ($setters) {
    $setters.linkStyle.$$desc = 'Predefined link style classes.';

    $setters.$$meta = {
      label: {$$type: 'string', $$desc: 'Displayed label for the link.'},
      alignIconRight: {$$type: 'boolean', $$desc: 'Displayed icon on the right side.'},
      icon: {
        $$type: 'string',
        $$desc: 'Shorthand icon class, see Icon component for examples.'
      }
    }
  }($definitions.link.prototype.$setters));


  (function ($setters) {
    $setters.iconStyle.$$desc = 'Predefined icon style classes.';
  }($definitions.icon.prototype.$setters));


  (function ($setters) {
    $setters.labelStyle.$$desc = 'Predefined label style classes.';
  }($definitions.label.prototype.$setters));


  (function ($setters) {
    $setters.color.$$desc = "Color classes for changing the progress appearance.";
    $setters.size.$$desc = 'Size classes for controlling the progress appearance.';
    $setters.value.$$type = 'number';
    $setters.value.$$desc = "Value of the progress, a number between 0-100.";
  }($definitions.progress.prototype.$setters));


  (function ($setters) {
    $setters.autocomplete.$$type = 'boolean';
    $setters.autocomplete.$$desc = 'Set the <code>autocomplete</code> attribute of the input.';
    $setters.autocapitalize.$$type = 'boolean';
    $setters.autocapitalize.$$desc = 'Set the <code>autocapitalize</code> attribute of the input.';
    $setters.autocorrect.$$type = 'boolean';
    $setters.autocorrect.$$desc = 'Set the <code>autocorrect</code> attribute of the input.';
    $setters.placeholder.$$type = 'string';
    $setters.placeholder.$$desc = 'Set the <code>placeholder</code> attribute of the input.';
  }(exports.InputControl.$setters));


  (function ($setters) {
    $setters.autocomplete.$$type = 'Function';
    $setters.autocomplete.$$desc = 'Function that overrides the way completions are fetched. Use this if completions are fetched using a Promise. The first argument is a callback function that handles autocompletion results; default uses the <code>sources</code> property.';
    $setters.sources.$$desc = 'Array of sources for the autocomplete or a function that provides the completions or a list of completions.';
    $setters.sources.$$type = 'object[] | Function';
    $setters.$$meta = {
      caseSensitive: {$$type: 'boolean', $$desc: 'Completion matching will be case-sensitive.'},
      minLength: {$$type: 'number', $$desc: 'Minimum number of characters for completions matching.'}
    };
  }($definitions.autocomplete.prototype.$setters));

  
  (function ($setters) {
    $setters.readonly.$$type = 'boolean';
    $setters.readonly.$$desc = 'Set the <code>readonly</code> attribute of the input.';
    $setters.size.$$desc = 'Size classes for controlling the input appearance.';
    $setters.width.$$desc = 'Width classes for controlling the input appearance.';
  }($definitions.input.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      height: {$$type: 'number | string', $$desc: 'Change the CSS property <code>height</code> of the spacer element.'},
      width: {$$type: 'number | string', $$desc: 'Change the CSS property <code>width</code> of the spacer element.'}
    };
  }($definitions.spacer.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      iconTemplate: {$$type: 'string', $$desc: 'Raw HTML for adding an icon next to the input element.'},
      inputClass: {$$type: 'string', $$desc: 'CSS class applied to the input element.'}
    };
  }($definitions.search.prototype.$setters));


  (function ($setters) {
    $setters.checked.$$type = 'boolean';
    $setters.checked.$$desc = 'Set the <code>checked</code> attribute of the checkbox input.';
    $setters.color.$$desc = 'Color classes for changing the toggle appearance.';
  }($definitions.toggle.prototype.$setters));


  (function ($setters) {
    $setters.direction.$$desc = 'Change the direction of the resizer.';
    $setters.$$meta = {
      minValue: {$$type: 'number', $$desc: 'Minimum screen value that resizer cannot go past.'},
      maxValue: {$$type: 'number', $$desc: 'Maximum screen value that the resizer cannot exceed.'}
    }
  }($definitions.resizer.prototype.$setters));


  (function ($setters) {
    $setters.edge.$$type = 'boolean';
    $setters.edge.$$desc = 'If true, drawer will be openable by swiping the edges of the screen. (Touch devices only)';
    $setters.touchOnly.$$type = 'boolean';
    $setters.touchOnly.$$desc = 'If true, drawer will be always open on no-touch devices.';
    $setters.flipped.$$type = 'boolean';
    $setters.flipped.$$desc = 'If true, drawer will show on right-side rather than left.';
  }($definitions.drawer.prototype.$setters));


  (function ($setters) {
    $setters.filter.$$type = 'Function';
    $setters.filter.$$desc = 'Function to determine which child components to display. The function is passed the child component object.';
    $setters.droppable.$$type = 'Function';
    $setters.droppable.$$desc = 'Function to determine if a child component can be drag and dropped upon. The function is passed the child component object.';
    $setters.$$meta = {
      data: {$$type: 'Component[]', $$desc: 'An array of item/component objects.'},
      itemTagClass: {$$type: 'string', $$desc: 'CSS class applied to each item element.'}
    };
  }($definitions.stack.prototype.$setters));


  (function ($setters) {
    $setters.listStyle.$$desc = 'Predefined list style classes.';
    $setters.tab.$$type = 'boolean | string';
    $setters.tab.$$desc = 'Set additional behaviors for tabs such as <code>onItemClick, onTabMenuClick, onItemSelectionChanged</code> events.';
    $setters.tab.options = {"false": "false", "true": "true", "responsive": "responsive"};
  }($definitions.list.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      indentWidth: {$$type: 'number', $$desc: 'Change the indentation in pixels per depth in the tree.'},
      dataTransfer: 'The data representation of an item, only for FireFox.',
      draggable: {$$type: 'boolean', $$desc: 'If true, tree child elements are draggable.'},
      orderAfter: {$$type: 'Function', $$desc: 'Low level function that determines ordering of tree items.'},
      droppable: {
        $$type: 'Function',
        $$desc: 'Function that determines if an item can be dropped upon.'
      }
    };
  }($definitions.tree.prototype.$setters));

  
  (function ($setters) {
    $setters.tableStyle.$$desc = 'Predefined table style classes.';
    $setters.columns.$$desc = "List of schema objects containing data display info.";
    $setters.columns.$$type = 'object[]';
    $setters.header.$$desc = "List of header objects containing the header and alignment info.";
    $setters.header.$$type = 'boolean | object[]';
    $setters.footer.$$desc = "List of footer objects containing the footer title.";
    $setters.footer.$$type = 'boolean | object[]';
    $setters.caption.$$desc = 'Table caption text.';
    $setters.caption.$$type = 'string';
  }($definitions.table.prototype.$setters));


  (function ($setters) {
    $setters.formStyle.$$desc = 'Predefined form style classes.';
  }($definitions.fieldset.prototype.$setters));


  (function ($setters) {
    $setters.formStyle.$$desc = 'Predefined form style classes.';
    $setters.fieldset.$$desc = 'Fieldset configuration object.';
    $setters.fieldset.$$type = 'object';
    $setters.fieldsets.$$desc = 'An array of Fieldset configuration objects.';
    $setters.fieldsets.$$type = 'object[]';
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
