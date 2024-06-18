import { fromContinuations } from "../fable-library.4.9.0/Async.js";
import { class_type } from "../fable-library.4.9.0/Reflection.js";
import { isNullOrWhiteSpace } from "../fable-library.4.9.0/String.js";

/**
 * Creates a typed byte array of binary data if it not already typed
 */
export function InternalUtilities_toUInt8Array(data) {
    if (data instanceof Uint8Array) {
        return data;
    }
    else {
        return new Uint8Array(data);
    }
}

/**
 * Asynchronously reads the File content as byte[]
 */
export function Browser_Types_File__File_ReadAsByteArray(instance) {
    return fromContinuations((tupledArg) => {
        const resolve = tupledArg[0];
        const reader = new FileReader();
        reader.onload = ((_arg_2) => {
            if (reader.readyState === 2) {
                resolve(new Uint8Array(reader.result));
            }
        });
        reader.readAsArrayBuffer(instance);
    });
}

/**
 * Asynchronously reads the File content as a data url string
 */
export function Browser_Types_File__File_ReadAsDataUrl(instance) {
    return fromContinuations((tupledArg) => {
        const resolve = tupledArg[0];
        const reader = new FileReader();
        reader.onload = ((_arg_2) => {
            if (reader.readyState === 2) {
                resolve(reader.result);
            }
        });
        reader.readAsDataURL(instance);
    });
}

/**
 * Asynchronously reads the File contents as text
 */
export function Browser_Types_File__File_ReadAsText(instance) {
    return fromContinuations((tupledArg) => {
        const resolve = tupledArg[0];
        const reader = new FileReader();
        reader.onload = ((_arg_2) => {
            if (reader.readyState === 2) {
                resolve(reader.result);
            }
        });
        reader.readAsText(instance);
    });
}

export class ByteArrayExtensions {
    constructor() {
    }
}

export function ByteArrayExtensions_$reflection() {
    return class_type("Fable.Remoting.Client.ByteArrayExtensions", void 0, ByteArrayExtensions);
}

/**
 * Saves the binary content as a file using the provided file name.
 */
export function ByteArrayExtensions_SaveFileAs_5EF83E14(content, fileName) {
    if (isNullOrWhiteSpace(fileName)) {
    }
    else {
        const mimeType = "application/octet-stream";
        const binaryData = InternalUtilities_toUInt8Array(content);
        const blob = new Blob([binaryData.buffer], { type: mimeType });
        const dataUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.style = "display: none";
        anchor.href = dataUrl;
        anchor.download = fileName;
        anchor.rel = "noopener";
        anchor.click();
        anchor.remove();
        window.setTimeout(() => {
            URL.revokeObjectURL(dataUrl);
        }, 40 * 1000);
    }
}

/**
 * Saves the binary content as a file using the provided file name.
 */
export function ByteArrayExtensions_SaveFileAs_Z4C1C8351(content, fileName, mimeType) {
    if (isNullOrWhiteSpace(fileName)) {
    }
    else {
        const binaryData = InternalUtilities_toUInt8Array(content);
        const blob = new Blob([binaryData.buffer], { type: mimeType });
        const dataUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.style = "display: none";
        anchor.href = dataUrl;
        anchor.download = fileName;
        anchor.rel = "noopener";
        anchor.click();
        anchor.remove();
        window.setTimeout(() => {
            URL.revokeObjectURL(dataUrl);
        }, 40 * 1000);
    }
}

/**
 * Converts the binary content into a data url by first converting it to a Blob of type "application/octet-stream" and reading it as a data url.
 */
export function ByteArrayExtensions_AsDataUrl_Z3F6BC7B1(content) {
    const binaryData = InternalUtilities_toUInt8Array(content);
    const blob = new Blob([binaryData.buffer], { type: "application/octet-stream" });
    const dataUrl = window.URL.createObjectURL(blob);
    return dataUrl;
}

/**
 * Converts the binary content into a data url by first converting it to a Blob of the provided mime-type and reading it as a data url.
 */
export function ByteArrayExtensions_AsDataUrl_5EF83E14(content, mimeType) {
    const binaryData = InternalUtilities_toUInt8Array(content);
    const blob = new Blob([binaryData.buffer], { type: mimeType });
    const dataUrl = window.URL.createObjectURL(blob);
    return dataUrl;
}

//# sourceMappingURL=Extensions.fs.js.map
