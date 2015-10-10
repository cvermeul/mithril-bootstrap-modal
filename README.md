# mithril-bootstrap-modal
Bootstrap modal with Mithril

## Sample code

### Basic

Display any component in a bootstrap modal.

```js
var m = require("mithril"),
  modal = require("mithril-bootstrap-modal");

var message = {
  title: function(attrs) {
    return "Sample";
  },
  view: function(ctrl, attrs) {
    return m("h2", "This is an example");
  }
};

var page = {
  view: function(ctrl) {
    return [
      m("button[type='button']", {onclick: modal.show.bind(modal, message)}, "This will display a reusable component in a popup"),
      m.component(modal)
    ];
  }
};

m.mount(document.body, page);
```

### With callback

Component can be used to prompt information from user. 
If you add a **callback** to component attributes, modal will be automatically closed when callback will be called.

```js
var m = require("mithril"),
  modal = require("mithril-bootstrap-modal");

var prompt = {
  title: function(attrs) {
    return attrs.title ? attrs.title : "Title";
  },
  controller: function(attrs) {
    this.field = m.prop("");
    this.submit = function() {
      attrs.callback(this.field());
    }.bind(this);
  },
  view: function(ctrl, attrs) {
    return m("form", [
      m("p",
        m("input[type='text']", {onchange: m.withAttr("value", ctrl.field), value: ctrl.field()})
      ),
      m("p",
        m("button[type='button']", {onclick: ctrl.submit}, "Submit")
      )
    ]);
  }
};

var page = {
  controller: function() {
    this.feedback = m.prop("");
    this.action = function(name) {
      this.feedback("Thanks " + name + ", you're welcome");
    }.bind(this);
  },
  view: function(ctrl) {
    return [
      m("button[type='button']", {onclick: modal.show.bind(modal, prompt, {callback: ctrl.action, title: "Please enter your name"})}, "Register"),
      m("span", ctrl.feedback()),
      m.component(modal)
    ];
  }
};

m.mount(document.body, page);
```

## API

### show(component, attributes)

**Arguments:**

  * `component` *Component* A Mithril component (Object with two keys: controller and view).
  * `attributes` *Object* A key/value map of attributes that gets bound as an argument to both the controller and view functions of the component.
