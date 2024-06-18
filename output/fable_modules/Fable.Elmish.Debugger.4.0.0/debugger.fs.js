import { some } from "../fable-library.4.9.0/Option.js";
import { singleton, ofArray, toArray } from "../fable-library.4.9.0/List.js";
import { Union } from "../fable-library.4.9.0/Types.js";
import { union_type, int32_type, string_type } from "../fable-library.4.9.0/Reflection.js";
import { extractState } from "remotedev";
import { ProgramModule_map, ProgramModule_mapErrorHandler, ProgramModule_setState } from "../Fable.Elmish.4.1.0/program.fs.js";
import { last } from "../fable-library.4.9.0/Array.js";
import { uncurry3, defaultOf } from "../fable-library.4.9.0/Util.js";
import { Sub_map, Sub_batch } from "../Fable.Elmish.4.1.0/sub.fs.js";

export function Debugger_showError(msgs) {
    console.error(some("[ELMISH DEBUGGER]"), ...toArray(msgs));
}

export function Debugger_showWarning(msgs) {
    console.warn(some("[ELMISH DEBUGGER]"), ...toArray(msgs));
}

export class Debugger_ConnectionOptions extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ViaExtension", "Remote", "Secure"];
    }
}

export function Debugger_ConnectionOptions_$reflection() {
    return union_type("Elmish.Debug.Debugger.ConnectionOptions", [], Debugger_ConnectionOptions, () => [[], [["address", string_type], ["port", int32_type]], [["address", string_type], ["port", int32_type]]]);
}

export function Program_withDebuggerUsing(deflater, inflater, connection, program) {
    const init = (userInit, a) => {
        const patternInput = userInit(a);
        const model = patternInput[0];
        const cmd = patternInput[1];
        connection.init(deflater(model), void 0);
        return [model, cmd];
    };
    const update = (userUpdate, msg, model_1) => {
        const patternInput_1 = userUpdate(msg)(model_1);
        const model$0027 = patternInput_1[0];
        const cmd_1 = patternInput_1[1];
        connection.send(msg, deflater(model$0027));
        return [model$0027, cmd_1];
    };
    const sub = (dispatch) => {
        const unsub = connection.subscribe((_arg) => {
            let msg_1;
            if ((msg_1 = _arg, msg_1.type === "DISPATCH")) {
                const msg_2 = _arg;
                try {
                    const matchValue = msg_2.payload.type;
                    switch (matchValue) {
                        case "JUMP_TO_ACTION":
                        case "JUMP_TO_STATE": {
                            const state = inflater(extractState(msg_2));
                            ProgramModule_setState(program)(state)(dispatch);
                            break;
                        }
                        case "IMPORT_STATE": {
                            const state_1 = last(msg_2.payload.nextLiftedState.computedStates);
                            const state_2 = inflater(state_1.state);
                            ProgramModule_setState(program)(state_2)(dispatch);
                            connection.send(defaultOf(), msg_2.payload.nextLiftedState);
                            break;
                        }
                        default:
                            0;
                    }
                }
                catch (ex) {
                    Debugger_showError(ofArray(["Unable to process monitor command", ex.message, msg_2]));
                }
            }
        });
        return {
            Dispose() {
                unsub();
            },
        };
    };
    const subscribe = (userSubscribe, model_2) => Sub_batch(ofArray([singleton([singleton("debugger"), sub]), Sub_map("user", (x) => x, userSubscribe(model_2))]));
    const onError = (userOnError, tupledArg) => {
        const text = tupledArg[0];
        const ex_1 = tupledArg[1];
        userOnError([text, ex_1]);
        connection.error(text + ex_1.message);
    };
    const termination = (tupledArg_1) => {
        const predicate = tupledArg_1[0];
        const terminate = tupledArg_1[1];
        return [predicate, terminate];
    };
    return ProgramModule_mapErrorHandler(onError, ProgramModule_map(init, update, uncurry3((x_1) => x_1), uncurry3((x_2) => x_2), subscribe, termination, program));
}

//# sourceMappingURL=debugger.fs.js.map
