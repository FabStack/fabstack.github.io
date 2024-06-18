import { some } from "./fable_modules/fable-library.4.9.0/Option.js";

export function Dispatch_cursorMove(eventId, range) {
    const data = {
        detail: some({
            eventType: "cursorMove",
            range: {
                startLineNumber: range.startLineNumber,
                startColumn: range.startColumn,
                endLineNumber: range.startLineNumber,
                endColumn: range.startColumn,
            },
        }),
    };
    const event = new CustomEvent(eventId, data);
    window.dispatchEvent(event);
}

//# sourceMappingURL=ReactEditor.js.map
