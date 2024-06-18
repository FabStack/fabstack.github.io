import { Record } from "../fable-library.4.9.0/Types.js";
import { int32_type, record_type, bool_type, lambda_type, class_type, unit_type } from "../fable-library.4.9.0/Reflection.js";
import { current } from "./Bundler.fs.js";
import { Component } from "react";
import * as react from "react";
import { equalArrays, equals } from "../fable-library.4.9.0/Util.js";

export class LazyProps$1 extends Record {
    constructor(model, render, equal) {
        super();
        this.model = model;
        this.render = render;
        this.equal = equal;
    }
}

export function LazyProps$1_$reflection(gen0) {
    return record_type("Elmish.HMR.Common.LazyProps`1", [gen0], LazyProps$1, () => [["model", gen0], ["render", lambda_type(unit_type, class_type("Fable.React.ReactElement"))], ["equal", lambda_type(gen0, lambda_type(gen0, bool_type))]]);
}

export class LazyState extends Record {
    constructor(HMRCount) {
        super();
        this.HMRCount = (HMRCount | 0);
    }
}

export function LazyState_$reflection() {
    return record_type("Elmish.HMR.Common.LazyState", [], LazyState, () => [["HMRCount", int32_type]]);
}

export class Components_LazyView$1 extends Component {
    constructor(props) {
        super(props);
        const hmrCount = ((window.Elmish_HMR_Count == null) ? 0 : window.Elmish_HMR_Count) | 0;
        this.state = (new LazyState(hmrCount));
    }
    shouldComponentUpdate(nextProps, _nextState) {
        const this$ = this;
        if (current == null) {
            return !(this$.props).equal((this$.props).model, nextProps.model);
        }
        else {
            const currentHmrCount = window.Elmish_HMR_Count | 0;
            if (currentHmrCount > (this$.state).HMRCount) {
                this$.setState((_prevState, _props) => (new LazyState(currentHmrCount)));
                return true;
            }
            else {
                return !(this$.props).equal((this$.props).model, nextProps.model);
            }
        }
    }
    render() {
        const this$ = this;
        return (this$.props).render();
    }
}

export function Components_LazyView$1_$reflection(gen0) {
    return class_type("Elmish.HMR.Common.Components.LazyView`1", [gen0], Components_LazyView$1, class_type("Fable.React.Component`2", [LazyProps$1_$reflection(gen0), LazyState_$reflection()], Component));
}

export function Components_LazyView$1_$ctor_7D66F9C0(props) {
    return new Components_LazyView$1(props);
}

/**
 * Avoid rendering the view unless the model has changed.
 * equal: function to compare the previous and the new states
 * view: function to render the model
 * state: new state to render
 */
export function lazyViewWith(equal, view, state) {
    const props = new LazyProps$1(state, () => view(state), equal);
    return react.createElement(Components_LazyView$1, props);
}

/**
 * Avoid rendering the view unless the model has changed.
 * equal: function to compare the previous and the new states
 * view: function to render the model using the dispatch
 * state: new state to render
 * dispatch: dispatch function
 */
export function lazyView2With(equal, view, state, dispatch) {
    const props = new LazyProps$1(state, () => view(state, dispatch), equal);
    return react.createElement(Components_LazyView$1, props);
}

/**
 * Avoid rendering the view unless the model has changed.
 * equal: function to compare the previous and the new model (a tuple of two states)
 * view: function to render the model using the dispatch
 * state1: new state to render
 * state2: new state to render
 * dispatch: dispatch function
 */
export function lazyView3With(equal, view, state1, state2, dispatch) {
    const props = new LazyProps$1([state1, state2], () => view(state1, state2, dispatch), equal);
    return react.createElement(Components_LazyView$1, props);
}

/**
 * Avoid rendering the view unless the model has changed.
 * view: function of two arguments to render the model using the dispatch
 */
export function lazyView2(view) {
    return (state) => ((dispatch) => lazyView2With(equals, view, state, dispatch));
}

/**
 * Avoid rendering the view unless the model has changed.
 * view: function of three arguments to render the model using the dispatch
 */
export function lazyView3(view) {
    return (state) => ((state_1) => ((dispatch) => lazyView3With(equalArrays, view, state, state_1, dispatch)));
}

//# sourceMappingURL=common.fs.js.map
