import { singleton } from "./fable_modules/fable-library.4.9.0/AsyncBuilder.js";
import { awaitPromise } from "./fable_modules/fable-library.4.9.0/Async.js";
import { fetch$ } from "./fable_modules/Fable.Fetch.2.7.0/Fetch.fs.js";
import { printf, toText } from "./fable_modules/fable-library.4.9.0/String.js";
import { ofArray, singleton as singleton_1, append, empty } from "./fable_modules/fable-library.4.9.0/List.js";
import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { TodoModule_create, ITodosApi_$reflection, Route_builder, Todo_$reflection } from "./Shared/Shared.js";
import { union_type, record_type, string_type, list_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { Remoting_buildProxy_64DC51C } from "./fable_modules/Fable.Remoting.Client.7.30.0/Remoting.fs.js";
import { RemotingModule_createApi, RemotingModule_withRouteBuilder } from "./fable_modules/Fable.Remoting.Client.7.30.0/Remoting.fs.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { createElement } from "react";
import { createObj } from "./fable_modules/fable-library.4.9.0/Util.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { Interop_reactApi as Interop_reactApi_1 } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import react_editor from "../js/react-editor.jsx";
import molstar from "../js/molstar.jsx";

export function fetchContent(pdbId) {
    return singleton.Delay(() => singleton.Bind(awaitPromise(fetch$(toText(printf("https://files.rcsb.org/download/%s.cif"))(pdbId), empty())), (_arg) => {
        const response = _arg;
        return singleton.Bind(awaitPromise(response.text()), (_arg_1) => {
            const item = _arg_1;
            return singleton.Return(item);
        });
    }));
}

export class Model extends Record {
    constructor(Todos, Input, PdbIdInput, EditorValue, RawPdbText) {
        super();
        this.Todos = Todos;
        this.Input = Input;
        this.PdbIdInput = PdbIdInput;
        this.EditorValue = EditorValue;
        this.RawPdbText = RawPdbText;
    }
}

export function Model_$reflection() {
    return record_type("Index.Model", [], Model, () => [["Todos", list_type(Todo_$reflection())], ["Input", string_type], ["PdbIdInput", string_type], ["EditorValue", string_type], ["RawPdbText", string_type]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["GotTodos", "SetInput", "AddTodo", "AddedTodo", "ChangeEditorValue", "ChangePdbIdInput", "SetPdbId", "FetchedContent", "SetRawPdbText"];
    }
}

export function Msg_$reflection() {
    return union_type("Index.Msg", [], Msg, () => [[["Item", list_type(Todo_$reflection())]], [["Item", string_type]], [], [["Item", Todo_$reflection()]], [["Item", string_type]], [["Item", string_type]], [], [["Item", string_type]], [["Item", string_type]]]);
}

export const todosApi = Remoting_buildProxy_64DC51C(RemotingModule_withRouteBuilder(Route_builder, RemotingModule_createApi()), ITodosApi_$reflection());

export function init() {
    const model = new Model(empty(), "", "1LOL", "", "");
    const cmd = Cmd_OfAsyncWith_perform((x) => {
        Cmd_OfAsync_start(x);
    }, todosApi.getTodos, void 0, (Item) => (new Msg(0, [Item])));
    return [model, cmd];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const value = msg.fields[0];
            return [new Model(model.Todos, value, model.PdbIdInput, model.EditorValue, model.RawPdbText), Cmd_none()];
        }
        case 2: {
            const todo = TodoModule_create(model.Input);
            const cmd = Cmd_OfAsyncWith_perform((x) => {
                Cmd_OfAsync_start(x);
            }, todosApi.addTodo, todo, (Item) => (new Msg(3, [Item])));
            return [new Model(model.Todos, "", model.PdbIdInput, model.EditorValue, model.RawPdbText), cmd];
        }
        case 3: {
            const todo_1 = msg.fields[0];
            return [new Model(append(model.Todos, singleton_1(todo_1)), model.Input, model.PdbIdInput, model.EditorValue, model.RawPdbText), Cmd_none()];
        }
        case 4: {
            const s = msg.fields[0];
            return [new Model(model.Todos, model.Input, model.PdbIdInput, s, model.RawPdbText), Cmd_none()];
        }
        case 5: {
            const s_1 = msg.fields[0];
            return [new Model(model.Todos, model.Input, s_1, model.EditorValue, model.RawPdbText), Cmd_none()];
        }
        case 7: {
            const s_2 = msg.fields[0];
            return [new Model(model.Todos, model.Input, model.PdbIdInput, s_2, model.RawPdbText), Cmd_none()];
        }
        case 6: {
            const cmd_1 = Cmd_OfAsyncWith_perform((x_1) => {
                Cmd_OfAsync_start(x_1);
            }, fetchContent, model.PdbIdInput, (Item_1) => (new Msg(7, [Item_1])));
            return [model, cmd_1];
        }
        case 8: {
            const s_3 = msg.fields[0];
            return [new Model(model.Todos, model.Input, model.PdbIdInput, model.EditorValue, s_3), Cmd_none()];
        }
        default: {
            const todos = msg.fields[0];
            return [new Model(todos, model.Input, model.PdbIdInput, model.EditorValue, model.RawPdbText), Cmd_none()];
        }
    }
}

export function view(model, dispatch) {
    let elems_6, elems_2, elems_5, elems_3, elems_4;
    const options = {
        minimap: {
            enabled: false,
        },
        theme: "vs-dark",
    };
    return createElement("section", createObj(ofArray([["className", "flex flex-col h-screen"], (elems_6 = [createElement("div", createObj(ofArray([["className", "flex flex-row bg-gray-200 p-4"], (elems_2 = [createElement("input", {
        value: model.PdbIdInput,
        onChange: (ev) => {
            dispatch(new Msg(5, [ev.target.value]));
        },
    }), createElement("button", {
        className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2",
        onClick: (_arg) => {
            dispatch(new Msg(6, []));
        },
        children: Interop_reactApi.Children.toArray(["Click to retrieve raw PDB source by ID"]),
    }), createElement("button", {
        className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2",
        onClick: (_arg_1) => {
            dispatch(new Msg(8, [model.EditorValue]));
        },
        children: Interop_reactApi.Children.toArray(["Click to send editor value to viewer"]),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))), createElement("div", createObj(ofArray([["className", "flex flex-row h-full w-full"], (elems_5 = [createElement("div", createObj(ofArray([["style", {
        width: 50 + "%",
        height: 100 + "%",
    }], (elems_3 = [Interop_reactApi_1.createElement(react_editor, {
        options: options,
        value: model.EditorValue,
        onChange: (s_1) => {
            dispatch(new Msg(4, [s_1]));
        },
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))), createElement("div", createObj(ofArray([["style", {
        width: 50 + "%",
        height: 100 + "%",
    }], (elems_4 = [Interop_reactApi_1.createElement(molstar, {
        rawPdbText: model.RawPdbText,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_5))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_6))])])));
}

//# sourceMappingURL=Index.js.map
