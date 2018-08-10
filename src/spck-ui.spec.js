describe('helper basis', function () {
  it('should detect types', function () {
    expect(UI.isObject({})).toBeTruthy();
    expect(UI.isArray([])).toBeTruthy();
    expect(UI.isString("")).toBeTruthy();
    expect(UI.isUndefined(undefined)).toBeTruthy();
    expect(UI.isDefined(0)).toBeTruthy();
  });

  it('should not detect types', function () {
    expect(UI.isObject([])).toBeFalsy();
    expect(UI.isArray({})).toBeFalsy();
    expect(UI.isString(0)).toBeFalsy();
    expect(UI.isFunction({})).toBeFalsy();
    expect(UI.isUndefined(null)).toBeFalsy();
    expect(UI.isDefined(undefined)).toBeFalsy();
  });

  it('should extend and default', function () {
    var original = {a: 1};
    expect(UI.defaults(original, {a: 0, b: 1})).toEqual({a: 1, b: 1});
    expect(original).toEqual({a: 1, b: 1});
    expect(UI.extend(original, {a: 1, b: 2})).toEqual({a: 1, b: 2});
    expect(original).toEqual({a: 1, b: 2});
  });

  it('should default properly', function () {
    var original = {a: 0, b: undefined};
    UI.defaults(original, {a: 10, b: 11});
    expect(original).toEqual({a: 0, b: 11});
  });

  it('should pluck values', function () {
    var original = [{a: 1}, {a: 2}, {a: 3}];
    expect(UI.pluck(original, 'a')).toEqual([1, 2, 3]);
    var nested = [{a: {b: 0}}, {a: {b: 1}}, {a: {b: 2}}];
    expect(UI.pluck(nested, 'a.b')).toEqual([0, 1, 2]);
  });

  it("prefixClassOptions", function () {
    expect(UI.prefixClassOptions({
      'test': '',
      'test1': 'test1',
      'test2': ['t', 'test1'],
      '': ''
    }, 'pr-', true)).toEqual({
      'test': 'pr-test',
      'test1': 'pr-test1',
      'test2': ['pr-t', 'pr-test1'],
      '': ''
    });
  });

  it("should normalize classString", function () {
    expect(UI.classString(['test', 'test1'])).toBe('test test1');
    expect(UI.classString('test test1')).toBe('test test1');
  });

  it('should get unique id', function () {
    expect(UI.uid()).not.toEqual(UI.uid());
    expect(UI.uid('test')).not.toEqual(UI.uid('test'));
  });

  it('should interpolate string with params', function () {
    var templateString = '{{test.awesome}}, {{test.ride.ride}}, {{cool}}{{cool2}}';
    expect(UI.interpolate(templateString,
      {test: {awesome: 'cool', ride: {ride: 'know'}}, cool: 'sixty', cool2: '-two'})).toEqual('cool, know, sixty-two');
  });

  it('should polyfill keyboardevent', function () {
    expect(UI.polyfillKeyboardEvent({keyCode: 13}).key).toBe('Enter');
  });
});

describe('dispatcher', function () {
  var Dispatcher = UI.def({__name__: "dispatcherTest"}, UI.Dispatcher);
  var dispatcher = new Dispatcher({});
  var handlers = {
    fireWithArgs: function () {
    }
  };

  it('should fire listeners', function () {
    spyOn(handlers, 'fireWithArgs');
    dispatcher.addListener('onTestArgs', handlers.fireWithArgs);
    dispatcher.dispatch('onTestArgs', [1, 2, 3]);
    expect(handlers.fireWithArgs).toHaveBeenCalledWith(1, 2, 3);
  });

});

describe('class system', function () {
  var base1 = {
    __name__: "base1",
    __check__: function (bases) {
    },
    __init__: function () {
      this.init1 = 1;
      this.init2 = 2;
    },
    __after__: function () {
      this.init1 += 1;
      this.init2 += 1;
    },
    func1: function () {
    }
  };
  var ebase1 = UI.def({
    __name__: "ebase1", efunc1: function () {
      name: "ebase1"
    }
  }, base1);
  var eebase1 = UI.def({__name__: "eebase1", init1: 0}, ebase1);

  it('should call checks', function () {
    spyOn(base1, "__check__");
    expect(base1.__check__).not.toHaveBeenCalled();
    var inst1 = UI.def({__name__: "test"}, base1);
    expect(base1.__check__).toHaveBeenCalled();
  });

  it('should extend from base 1', function () {
    var inst1 = new ebase1({});
    expect(inst1.func1).toBeDefined();
    expect(inst1.init1).toBe(2);
    expect(inst1.init2).toBe(3);
    expect(inst1.__baseNames__).toEqual(["base1"]);
  });

  it('should extend from ebase 1', function () {
    var einst1 = new eebase1({instance1: 1});
    expect(einst1.func1).toBeDefined();
    expect(einst1.init1).toBeDefined(1);
    expect(einst1.init2).toBeDefined(3);
    expect(einst1.__baseNames__).toEqual(["ebase1", "base1"]);
  });
});


describe('addClass removeClass', function () {
  var node = document.body;
  it('should add and remove css', function () {
    UI.addClass(node, "s1");
    expect(node.className).toEqual("s1");
    UI.addClass(node, "s1", true);
    expect(node.className).toEqual("s1");
    UI.addClass(node, "s2", true);
    expect(node.className).toEqual("s1 s2");
    UI.removeClass(node, "s1");
    UI.removeClass(node, "s2");
    expect(node.className).toEqual("");
  })
});

describe('element', function () {
  it('should set properties', function () {
    spyOn(UI.definitions.element.prototype.$setters, 'hidden');
    expect(UI.definitions.element.prototype.$setters.hidden).not.toHaveBeenCalled();
    var elem = UI.new({view: 'element', hidden: true});
    expect(UI.definitions.element.prototype.$setters.hidden).toHaveBeenCalled();
  });

  it('should not allow duplicates', function () {
    UI.new({view: 'element', hidden: true, id: "repeated-id"}, document.body);
    expect(function () {
      UI.new({view: 'element', hidden: true, id: "repeated-id"});
    }).toThrow();
  });

  it('should dispatch render event', function () {
    var on = {onInitialized: {}};
    spyOn(on, "onInitialized");
    var ui = UI.new({view: 'element', hidden: true, on: on});
    expect(ui._listenersByEvent.onInitialized).toBeDefined();
    expect(on.onInitialized.calls.count()).toBe(1);
  });
});

describe('flexgrid', function () {
});

describe('linked-list', function () {
  var n1 = {}, n2 = {}, n3 = {};
  var List = UI.def({__name__: "test-linked-list"}, UI.LinkedList, UI.Dispatcher);
  var list = new List({});

  function echo(obj) {
    return obj;
  }

  it('should insert in order', function () {
    list.add(n1);
    list.add(n2);
    list.add(n3);
    expect(n1.$tailNode).toBe(n2);
    expect(list.headNode).toBe(n1);
    expect(list.tailNode).toBe(n3);
  });

  it('should contain', function () {
    expect(list.contains(n1)).toBeTruthy();
    expect(list.contains(n2)).toBeTruthy();
    expect(list.contains(n3)).toBeTruthy();
    expect(list.contains({})).toBeFalsy();
  });

  it('should insert before', function () {
    list.remove(n1);
    expect(list.headNode).toBe(n2);
    list.insertBefore(n1, n2);
    expect(list.each(echo)).toEqual([n1, n2, n3]);
    expect(list.headNode).toBe(n1);
  });

  it('should insert after', function () {
    list.remove(n3);
    expect(list.tailNode).toBe(n2);
    list.insertAfter(n3, n2);
    expect(list.each(echo)).toEqual([n1, n2, n3]);
    expect(list.tailNode).toBe(n3);
  });

  it('should find last', function () {
    expect(list.findLast(function (o) {
      return o == n1 || o == n3
    }, n1)).toBe(n1);
    expect(list.findLast(function () {
      return true
    }, n1)).toBe(n3);
  });

  it('should find first', function () {
    expect(list.findFirst(function (o) {
      return o == n1
    }, n1)).toBe(n1);
    expect(list.findFirst(function (o) {
      return o == n3
    }, n1)).toBe(n3);
  });

  it('should should be functional after clearAll', function () {
    list.clearAll();
    expect(list.headNode).toBeFalsy();
    expect(list.tailNode).toBeFalsy();
    list.add(n1);
    list.add(n3);
    expect(list.findFirst(function () {
      return true
    })).toBe(n1);
    expect(list.findLast(function () {
      return true
    })).toBe(n3);
  });

  it('should should be able to fetch by id', function () {
    n1.id = "1";
    n3.id = 1;
    expect(list.findOne('id', 1)).toBe(n3);
  });
});

describe('tree', function () {
  var elem = UI.new({
    id: "t12", view: 'tree', data: [
      {id: 'root', label: 'Root'},
      {label: 'Parent', $parent: 'root', id: 'parent'},
      {id: 'child-a', label: 'Child-A', $parent: 'parent'},
      {id: 'child-c', label: 'Child-C', $parent: 'parent'},
      {id: 'child-b', label: 'Child-B', $parent: 'parent'},
      {label: 'Subchild-A-A', $parent: 'child-a'}
    ]
  }, document.body);

  it('should create branched structure', function () {
    var root = elem.getItem('root');
    var parent = elem.getItem('parent');
    expect(root.$children).toBeDefined();
    expect(parent.$depth).toBe(1);
    expect(root.$tailNode).toBe(parent);
  });

  it('should create html comp properly', function () {
    expect(elem.element.childElementCount).toBe(elem.config.data.length);
    expect(elem.element.parentElement).toBe(document.body);
  });

  it('should sort alphabetically', function () {
    expect(elem.each(function (o) {
      return o.label
    })).toEqual(
      ['Root', 'Parent', 'Child-A', 'Subchild-A-A', 'Child-B', 'Child-C']);
  });

  it('should move child-b, child-c to child-a', function () {
    var parent = elem.getItem('parent');
    var childA = elem.getItem('child-a');
    var childB = elem.getItem('child-b');
    var childC = elem.getItem('child-c');
    expect(parent.$children.length).toBe(3);
    expect(childA.$children.length).toBe(1);
    // Move child-c and child-b to child-a
    elem.updateItem(childB, {$parent: 'child-a'});
    elem.updateItem(childC, {$parent: 'child-a'});
    expect(parent.$children.length).toBe(1);
    expect(childA.$children.length).toBe(3);
    // Move them back
    elem.updateItem(childB, {$parent: 'parent'});
    elem.updateItem(childC, {$parent: 'parent'});
    expect(parent.$children.length).toBe(3);
    expect(childA.$children.length).toBe(1);
  });

  it('should remove all children under branch', function () {
    var tree = UI.new({
      id: "t1", view: 'tree', data: [
        {id: 'root', label: 'Root'},
        {id: 'parent', label: 'Parent', $parent: 'root'},
        {id: 'child-a', label: 'Child-A', $parent: 'parent'},
        {id: 'child-b', label: 'Child-B', $parent: 'parent'}
      ]
    }, document.body);
    var parent = tree.getItem('parent');
    expect(parent.$children.length).toBe(2);
    expect(tree.$count).toBe(4);
    tree.remove(parent);
    expect(tree.$count).toBe(1);
    expect(tree.each(function (o) {
      return o.label
    })).toEqual(['Root']);
  });
});

describe('list-ui', function () {
  var elem = UI.new({
    id: "l12", view: 'list', data: [
      {id: 'lroot', label: 'Root'},
      {label: 'Parent', $parent: 'lroot', id: 'lparent'},
      {label: 'Child', $parent: 'lparent'},
      {label: 'Test', $parent: 'lparent'}
    ]
  }, document.body);

  it('should create html comp properly', function () {
    expect(elem.element.childElementCount).toBe(4);
    expect(elem.element.parentElement).toBe(document.body);
  });

  it('should not change order after update', function () {
    expect(elem.headNode.label).toBe("Root");
    elem.updateItem(elem.headNode, {label: "Nice"});
    expect(elem.headNode.label).toBe("Nice");
  });
});

describe('selectors', function () {
  it('should select out property', function () {
    var obj = {a: {b: {c: 1}}};
    expect(UI.selectors.property('a')(obj)).toEqual({b: {c: 1}});
    expect(UI.selectors.property('a.b')(obj)).toEqual({c: 1});
    expect(UI.selectors.property('a.b.c')(obj)).toEqual(1);
  })
});

describe('form', function () {
  var elem = UI.new({
    view: 'form',
    fieldset: [
      {
        formLabel: "Name",
        view: "input", name: "name"
      },
      {
        formLabel: "Speed",
        view: "input", type: "number", name: "speed",
      },
      {
        formLabel: "Loop", view: "input", type: "checkbox", name: "loop", checked: true
      },
      {
        view: "flexgrid", cells: [
        {view: "input", type: "number", name: "nested"}
      ]
      }
    ]
  });

  it('should get and set values', function () {
    expect(elem.getValues()).toEqual({name: "", speed: "", loop: true, nested: ""});
    elem.setValues({loop: false, speed: 100, name: "Awesome", nested: 150});
    expect(elem.getValues()).toEqual({name: "Awesome", speed: '100', loop: false, nested: '150'});
  });
});


describe('responsive-tabs', function () {
  var elem = UI.new({
    id: "t31", view: 'list', tab: "responsive", data: [
      {label: 'Test 1'},
      {label: 'Test 2'},
      {label: 'Test 3'}
    ]
  }, document.body);

  it('should remove 1 tab', function () {
    expect(elem.$count).toBe(4);
    var item = elem.findOne("label", "Test 1");
    expect(elem.contains(item)).toBeTruthy();
    elem.remove(item);
    expect(elem.contains(item)).toBeFalsy();
    expect(elem.$count).toBe(3);
  });

  it('should setActive and close tabs properly', function () {
    elem.setActiveLabel("Test 2");
    elem.each(function (item) {
      elem.closeItem(item);
      console.log(item)
    });
    // Only responsive tab toggle should remain
    expect(elem.$count).toBe(1);
  });
});