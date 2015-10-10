var m = require("mithril");

module.exports = {
  _attrs: null,
  _component: null,

  show: function(component, attrs) {
    this._component = component;
    this._attrs = attrs;

    // If there is a callback argument we wrap it in a function that will hide the popup
    if (typeof this._attrs.callback === "function") {
      var callback = this._attrs.callback;
      this._attrs.callback = function() {
        callback.apply(null, arguments);
        this.hide();
      }.bind(this);
    }
  },

  hide: function() {
    this._attrs = null;
    this._component = null;
  },

  view: function(ctrl) {
    if (this._component === null) {
      return m("");
    }

    return m(".modal-container", [
      m(".modal-backdrop.fade.in"),
      m(".modal.fade.in[style='display: block']", {onclick: this.hide.bind(this)}, 
        m(".modal-dialog", 
          m(".modal-content", {
            onclick: function(e){
              m.redraw.strategy("none");
              e.stopPropagation();
            }
          }, [
            m(".modal-header", [
              m("button[aria-hidden='true'][data-dismiss='modal'][class='close'][type='button']", {onclick: this.hide.bind(this)}, m("span[aria-hidden=true]", "×")),
              m("h4.modal-title", this._component.title ? this._component.title(this._attrs) : "")
            ]),
            m(".modal-body", m.component(this._component, this._attrs))
          ])
        )
      )
    ]);     
  }
};