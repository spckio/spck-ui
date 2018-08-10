(function (exports) {
  var $definitions = exports.definitions;

  (function ($setters) {
    $setters.order.$$desc = 'Flex order of the component';
    $setters.screen.$$desc = 'Determines which screen size to show the component on';
    $setters.margin.$$desc = 'Add margins to the component';
    $setters.position.$$desc = 'Determines the CSS <code>position</code>';
    $setters.hidden.$$desc = 'Show or hide the component';
    $setters.animation.$$desc = 'Animation classes to use for the component';
    $setters.layout.$$desc = 'Sets the flex layout';
    $setters.selectable.$$desc = 'Changes text to unselectable';
    $setters.flex.$$desc = 'Changes component to use flex layout';
    $setters.device.$$desc = 'Show the component on touch or no-touch devices only';
  }(exports.CommonCSS.$setters));


  (function ($setters) {
    $setters.disabled.$$desc = 'Sets the <code>disabled</code> attribute';
    $setters.disabled.$$type = 'boolean';
    $setters.tooltip.$$desc = 'Add a tooltip to the component';
    $setters.tooltip.$$type = 'string';
    $setters.css.$$desc = 'Custom CSS classes for the component';
    $setters.css.$$type = 'string | string[]';
    $setters.dropdown.$$desc = 'Configuration object to show in a context menu';
    $setters.uploader.$$type = 'boolean';

    $setters.$$meta = {
      dropdownEvent: "The event type to trigger a dropdown",
      dropdownOptions: "Configuration passed to dropdown component",
      template: "A string or a function that returns a HTML template string for the component. For examples, see source code on Github.",
      style: "A object containing properties to feed into the style attribute of the element"
    };
  }($definitions.element.prototype.$setters));


  (function ($setters) {
    $setters.cells.$$desc = "A list of configuration objects.";
  }($definitions.flexgrid.prototype.$setters));


  (function ($setters) {
    $setters.help.$$type = 'string';
    $setters.formClass.options = {"": "", "danger": "danger", "success": "success"};
    $setters.type.$$desc = "Set the <code>type</code> attribute of the input element";
    $setters.type.$$type = 'string';
    $setters.multiple.$$desc = "Set the <code>multiple</code> attribute of the element";
    $setters.multiple.$$type = 'boolean';
    $setters.value.$$desc = "Initial value of the input element";
    $setters.value.$$type = 'string';
  }(exports.FormControl.$setters));


  (function ($setters) {
    $setters.bodyWidth.$$type = 'string';
    $setters.bodyHeight.$$type = 'string';
    $setters.closeButton.$$type = 'boolean';
    $setters.body.$$desc = "Configuration object to put in the modal body";
    $setters.header.$$desc = "Configuration object to put in the modal header";
    $setters.footer.$$desc = "Configuration object to put in the modal footer";
    $setters.caption.$$type = 'string';
    $setters.$$meta = {
      bgClose: {$$type: 'boolean'},
      keyboard: {$$type: 'boolean'},
      minScrollHeight: {$$type: 'number'},
      closeModals: {$$type: 'boolean'},
      center: {$$type: 'boolean'},
      dialogClass: {options: ['', 'uk-modal-dialog-blank', 'uk-modal-dialog-full']}
    };
  }($definitions.modal.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      iconClass: {$$type: 'string'},
      icon: {$$type: 'string'}
    };
  }($definitions.button.prototype.$setters));


  (function ($setters) {
    $setters.href.$$type = 'string';
    $setters.src.$$type = 'string';
    $setters.target.$$type = 'string';
  }($definitions.image.prototype.$setters));


  (function ($setters) {
    $setters.href.$$type = 'string';
    $setters.target.$$type = 'string';
  }($definitions.link.prototype.$setters));


  (function ($setters) {
    $setters.iconStyle.$$desc = 'Type of icon';
  }($definitions.icon.prototype.$setters));


  (function ($setters) {
    $setters.color.$$desc = "Set the style type of the progress element";
  }($definitions.progress.prototype.$setters));


  (function ($setters) {
    $setters.autocomplete.$$type = 'boolean';
    $setters.autocapitalize.$$type = 'boolean';
    $setters.autocorrect.$$type = 'boolean';
    $setters.placeholder.$$type = 'string';
  }(exports.InputControl.$setters));


  (function ($setters) {
    $setters.sources.$$desc = 'Function that provides the completions or a list of completions';
    $setters.sources.$$type = 'any[] | Function';
  }($definitions.autocomplete.prototype.$setters));

  
  (function ($setters) {
    $setters.checked.$$type = 'boolean';
    $setters.readonly.$$type = 'boolean';
  }($definitions.input.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      caseSensitive: {$$type: 'boolean', $$desc: 'Completion matching will be case-sensitive'},
      minLength: {$$type: 'number', $$desc: 'Minimum number of characters for completions matching'},
      sources: 'An array of sources for the autocomplete.',
      autocomplete: "A matching function that is passed a release callback to determine the final displayed autocomplete results. Default uses the 'sources' property."
    };
  }($definitions.autocomplete.prototype.$setters));


  (function ($setters) {
    $setters.filter.$$desc = 'A function to determine which child components to display. The function is passed the child component object.';
    $setters.droppable.$$desc = 'A function to determine if a child component can be drag and dropped upon. The function is passed the child component object.';

    $setters.$$meta = {
      data: 'An array of component objects.'
    };
  }($definitions.stack.prototype.$setters));


  (function ($setters) {
    $setters.listStyle.$$desc = 'Predefined list style';
    $setters.tab.$$type = 'boolean';
    $setters.tab.$$desc = 'When true, sets additional behaviors for tabs such as responsiveness and events ' +
      '<code>onTabMenuClick, onItemSelectionChanged</code>';
    $setters.$$meta = {
      selectable: {$$type: 'boolean'},
      itemTagClass: {$$type: 'string'}
    };
  }($definitions.list.prototype.$setters));


  (function ($setters) {
    $setters.$$meta = {
      indentWidth: {$$type: 'number'},
      dataTransfer: 'The data representation of an item, only for FireFox',
      draggable: {$$type: 'boolean'},
      orderAfter: {$$type: 'Function', $$desc: 'Low level function that determines ordering of tree items'},
      droppable: {
        $$type: 'Function',
        $$desc: 'Function that determines if an item can be dropped upon'
      }
    };
  }($definitions.tree.prototype.$setters));

  
  (function ($setters) {
    $setters.tableStyle.$$desc = 'Predefined table style';
    $setters.columns.$$desc = "List of schema objects containing data display info";
    $setters.columns.$$type = 'any[]';
    $setters.header.$$desc = "List of header objects containing the header and alignment info";
    $setters.header.$$type = 'boolean | any[]';
    $setters.footer.$$desc = "List of footer objects containing the footer title";
    $setters.footer.$$type = 'boolean | any[]';
    $setters.caption.$$desc = 'Table caption';
    $setters.caption.$$type = 'string';
  }($definitions.table.prototype.$setters));


  (function ($setters) {
    $setters.formStyle.$$desc = 'Predefined form style';
    $setters.fieldset.$$desc = 'Fieldset object';
    $setters.fieldsets.$$desc = 'An array of Fieldset objects';
    $setters.fieldset.$$type = 'any[]';
  }($definitions.form.prototype.$setters));


  Object.keys($definitions).forEach(function (def) {
    var setters = $definitions[def].prototype.$setters;
    var bases = $definitions[def].prototype.__bases__;
    var meta = setters.$$meta || {};
    Object.keys(meta).forEach(function (n) {
      meta[n].__class__ = def;
    });
    setters.$$meta = meta;
    bases.forEach(function (base) {
      if (UI.isFunction(base)) base = base.prototype;
      var $setters = base.$setters || {};
      UI.defaults(meta, $setters.$$meta || {});
    });
  });
  
  exports.debug = true;
}(UI));
