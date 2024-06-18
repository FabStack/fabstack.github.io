import { HttpResponse, HttpRequest, RequestBody, HttpMethod as HttpMethod_1 } from "./Types.fs.js";
import { empty } from "../fable-library.4.9.0/List.js";
import { singleton } from "../fable-library.4.9.0/AsyncBuilder.js";
import { isCancellationRequested, fromContinuations, cancellationToken } from "../fable-library.4.9.0/Async.js";
import { disposeSafe, getEnumerator } from "../fable-library.4.9.0/Util.js";
import { some } from "../fable-library.4.9.0/Option.js";
import { InternalUtilities_toUInt8Array } from "./Extensions.fs.js";

const defaultRequestConfig = new HttpRequest(new HttpMethod_1(0, []), "/", empty(), new RequestBody(0, []), false);

/**
 * Creates a GET request to the specified url
 */
export function get$(url) {
    return new HttpRequest(new HttpMethod_1(0, []), url, defaultRequestConfig.Headers, defaultRequestConfig.RequestBody, defaultRequestConfig.WithCredentials);
}

/**
 * Creates a POST request to the specified url
 */
export function post(url) {
    return new HttpRequest(new HttpMethod_1(1, []), url, defaultRequestConfig.Headers, defaultRequestConfig.RequestBody, defaultRequestConfig.WithCredentials);
}

/**
 * Creates a request using the given method and url
 */
export function request(method, url) {
    return new HttpRequest(method, url, defaultRequestConfig.Headers, defaultRequestConfig.RequestBody, defaultRequestConfig.WithCredentials);
}

/**
 * Appends a request with headers as key-value pairs
 */
export function withHeaders(headers, req) {
    return new HttpRequest(req.HttpMethod, req.Url, headers, req.RequestBody, req.WithCredentials);
}

/**
 * Sets the withCredentials option on the XHR request, useful for CORS requests
 */
export function withCredentials(withCredentials_1, req) {
    return new HttpRequest(req.HttpMethod, req.Url, req.Headers, req.RequestBody, withCredentials_1);
}

/**
 * Appends a request with string body content
 */
export function withBody(body, req) {
    return new HttpRequest(req.HttpMethod, req.Url, req.Headers, body, req.WithCredentials);
}

function sendAndRead(preparation, resultMapper, req) {
    return singleton.Delay(() => singleton.Bind(cancellationToken(), (_arg) => {
        const token = _arg;
        const request_1 = fromContinuations((tupledArg) => {
            const resolve = tupledArg[0];
            const cancel = tupledArg[2];
            const xhr = new XMLHttpRequest();
            if (req.HttpMethod.tag === 1) {
                xhr.open("POST", req.Url);
            }
            else {
                xhr.open("GET", req.Url);
            }
            if (preparation != null) {
                const f = preparation;
                f(xhr);
            }
            const cancellationTokenRegistration = token.register(() => {
                xhr.abort();
                cancel(new Error(token));
            });
            const enumerator = getEnumerator(req.Headers);
            try {
                while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                    const forLoopVar = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    const value = forLoopVar[1];
                    const key = forLoopVar[0];
                    xhr.setRequestHeader(key, value);
                }
            }
            finally {
                disposeSafe(enumerator);
            }
            xhr.withCredentials = req.WithCredentials;
            xhr.onreadystatechange = (() => {
                const matchValue_1 = xhr.readyState | 0;
                let matchResult;
                if (matchValue_1 === 4) {
                    if (!isCancellationRequested(token)) {
                        matchResult = 0;
                    }
                    else {
                        matchResult = 1;
                    }
                }
                else {
                    matchResult = 1;
                }
                switch (matchResult) {
                    case 0: {
                        disposeSafe(cancellationTokenRegistration);
                        resolve(resultMapper(xhr));
                        break;
                    }
                    case 1: {
                        break;
                    }
                }
            });
            const matchValue_2 = req.RequestBody;
            switch (matchValue_2.tag) {
                case 1: {
                    const content = matchValue_2.fields[0];
                    xhr.send(some(content));
                    break;
                }
                case 2: {
                    const content_1 = matchValue_2.fields[0];
                    xhr.send(some(InternalUtilities_toUInt8Array(content_1)));
                    break;
                }
                default:
                    xhr.send();
            }
        });
        return singleton.ReturnFrom(request_1);
    }));
}

export const send = (req) => sendAndRead(void 0, (xhr) => (new HttpResponse(xhr.status, xhr.responseText)), req);

export const sendAndReadBinary = (req) => sendAndRead((xhr) => {
    xhr.responseType = "arraybuffer";
}, (xhr_1) => {
    const bytes = new Uint8Array(xhr_1.response);
    return [bytes, xhr_1.status];
}, req);

//# sourceMappingURL=Http.fs.js.map
