import { Record } from "../fable-library.4.9.0/Types.js";
import { array_type, record_type, option_type, lambda_type, obj_type, string_type, int32_type, bool_type } from "../fable-library.4.9.0/Reflection.js";

export class Options$1 extends Record {
    constructor(remote, port, hostname, secure, getActionType) {
        super();
        this.remote = remote;
        this.port = (port | 0);
        this.hostname = hostname;
        this.secure = secure;
        this.getActionType = getActionType;
    }
}

export function Options$1_$reflection(gen0) {
    return record_type("Fable.Import.RemoteDev.Options`1", [gen0], Options$1, () => [["remote", bool_type], ["port", int32_type], ["hostname", string_type], ["secure", bool_type], ["getActionType", option_type(lambda_type(gen0, obj_type))]]);
}

export class Action extends Record {
    constructor(type, fields) {
        super();
        this.type = type;
        this.fields = fields;
    }
}

export function Action_$reflection() {
    return record_type("Fable.Import.RemoteDev.Action", [], Action, () => [["type", string_type], ["fields", array_type(obj_type)]]);
}

export class LiftedState extends Record {
    constructor(actionsById, computedStates, currentStateIndex, nextActionId) {
        super();
        this.actionsById = actionsById;
        this.computedStates = computedStates;
        this.currentStateIndex = (currentStateIndex | 0);
        this.nextActionId = (nextActionId | 0);
    }
}

export function LiftedState_$reflection() {
    return record_type("Fable.Import.RemoteDev.LiftedState", [], LiftedState, () => [["actionsById", array_type(Action_$reflection())], ["computedStates", array_type(obj_type)], ["currentStateIndex", int32_type], ["nextActionId", int32_type]]);
}

export class Payload extends Record {
    constructor(nextLiftedState, type) {
        super();
        this.nextLiftedState = nextLiftedState;
        this.type = type;
    }
}

export function Payload_$reflection() {
    return record_type("Fable.Import.RemoteDev.Payload", [], Payload, () => [["nextLiftedState", LiftedState_$reflection()], ["type", string_type]]);
}

export class Msg extends Record {
    constructor(state, action, type, payload) {
        super();
        this.state = state;
        this.action = action;
        this.type = type;
        this.payload = payload;
    }
}

export function Msg_$reflection() {
    return record_type("Fable.Import.RemoteDev.Msg", [], Msg, () => [["state", string_type], ["action", obj_type], ["type", string_type], ["payload", Payload_$reflection()]]);
}

//# sourceMappingURL=Fable.Import.RemoteDev.fs.js.map
