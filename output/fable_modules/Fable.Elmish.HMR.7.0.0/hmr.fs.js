import { Union } from "../fable-library.4.9.0/Types.js";
import { union_type } from "../fable-library.4.9.0/Reflection.js";

export class Msg$1 extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["UserMsg", "Stop"];
    }
}

export function Msg$1_$reflection(gen0) {
    return union_type("Elmish.HMR.Program.Msg`1", [gen0], Msg$1, () => [[["Item", gen0]], []]);
}

export class Internal_Platform extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Browser", "ReactNative"];
    }
}

export function Internal_Platform_$reflection() {
    return union_type("Elmish.HMR.Program.Internal.Platform", [], Internal_Platform, () => [[], []]);
}

export const Internal_platform = (window.navigator.product === "ReactNative") ? (new Internal_Platform(1, [])) : (new Internal_Platform(0, []));

export function Internal_tryRestoreState(hmrState, data) {
    if (Internal_platform.tag === 0) {
        if (!(data == null) && !(data.hmrState == null)) {
            hmrState.contents = data.hmrState;
        }
    }
    else {
        const savedHmrState = window.react_native_elmish_hmr_state;
        if (!(savedHmrState == null)) {
            hmrState.contents = savedHmrState;
        }
    }
}

export function Internal_saveState(data, hmrState) {
    if (Internal_platform.tag === 0) {
        data.hmrState = hmrState;
    }
    else {
        window.react_native_elmish_hmr_state = hmrState;
    }
}

//# sourceMappingURL=hmr.fs.js.map
