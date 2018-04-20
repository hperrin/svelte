/* generated by Svelte vX.Y.Z */
import { addListener, assign, init, noop, proto, removeListener } from "svelte/shared.js";

var methods = {
	handleClick() {
		alert('Clicked.');
	}
};

function create_main_fragment(component, state) {
	var svelte_target;

	function click_handler(event) {
		component.handleClick();
	}

	return {
		c: function create() {
			svelte_target = component.options.target;
			this.h();
		},

		h: function hydrate() {
			addListener(svelte_target, "click", click_handler);
		},

		m: noop,

		p: noop,

		u: noop,

		d: function destroy() {
			removeListener(svelte_target, "click", click_handler);
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, proto);
assign(SvelteComponent.prototype, methods);
export default SvelteComponent;