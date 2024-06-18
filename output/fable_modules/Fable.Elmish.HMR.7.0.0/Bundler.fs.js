import { Union } from "../fable-library.4.9.0/Types.js";
import { union_type } from "../fable-library.4.9.0/Reflection.js";

export class T extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Vite", "WebpackESM", "WebpackCJS_and_Parcel"];
    }
}

export function T_$reflection() {
    return union_type("Elmish.HMR.Bundler.T", [], T, () => [[], [], []]);
}

export const current = (() => {
    let result = void 0;
    try {
        if ((import.meta.webpackHot /* If error see https://github.com/elmish/hmr/issues/35 */)) {
            result = (new T(1, []));
        }
    }
    catch (matchValue) {
    }
    if (result == null) {
        try {
            if (module.hot) {
                result = (new T(2, []));
            }
        }
        catch (matchValue_1) {
        }
    }
    if (result == null) {
        try {
            if ((import.meta.hot /* If error see https://github.com/elmish/hmr/issues/35 */)) {
                result = (new T(0, []));
            }
        }
        catch (matchValue_2) {
        }
    }
    return result;
})();

//# sourceMappingURL=Bundler.fs.js.map
