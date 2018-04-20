/* generated by Svelte vX.Y.Z */
import { assign, init, noop, proto, setAttribute } from "svelte/shared.js";

function create_main_fragment(component, state) {
	var svelte_target, svelte_target_href_value;

	return {
		c: function create() {
			svelte_target = component.options.target;
			this.h();
		},

		h: function hydrate() {
			svelte_target.className = "addedClass";
			setAttribute(svelte_target, "href", svelte_target_href_value = "/element/" + state.element + "/" + state.id);
		},

		m: noop,

		p: function update(changed, state) {
			if ((changed.element || changed.id) && svelte_target_href_value !== (svelte_target_href_value = "/element/" + state.element + "/" + state.id)) {
				setAttribute(svelte_target, "href", svelte_target_href_value);
			}
		},

		u: noop,

		d: noop
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
export default SvelteComponent;