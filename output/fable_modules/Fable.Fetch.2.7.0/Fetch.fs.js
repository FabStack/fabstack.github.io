import { Union } from "../fable-library.4.9.0/Types.js";
import { array_type, tuple_type, bool_type, class_type, union_type, obj_type, int32_type, string_type } from "../fable-library.4.9.0/Reflection.js";
import { defaultArg } from "../fable-library.4.9.0/Option.js";
import { empty } from "../fable-library.4.9.0/Seq.js";
import { keyValueList } from "../fable-library.4.9.0/MapUtil.js";
import { int32ToString } from "../fable-library.4.9.0/Util.js";
import { result } from "../Fable.Promise.2.2.2/Promise.fs.js";
import { singleton } from "../fable-library.4.9.0/List.js";

export class Types_HttpRequestHeaders extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Accept", "Accept-Charset", "Accept-Encoding", "Accept-Language", "Accept-Datetime", "Authorization", "Cache-Control", "Connection", "Cookie", "Content-Length", "Content-MD5", "Content-Type", "Date", "Expect", "Forwarded", "From", "Host", "If-Match", "If-Modified-Since", "If-None-Match", "If-Range", "If-Unmodified-Since", "Max-Forwards", "Origin", "Pragma", "Proxy-Authorization", "Range", "Referer", "SOAPAction", "TE", "User-Agent", "Upgrade", "Via", "Warning", "X-Requested-With", "DNT", "X-Forwarded-For", "X-Forwarded-Host", "X-Forwarded-Proto", "Front-End-Https", "X-Http-Method-Override", "X-ATT-DeviceId", "X-Wap-Profile", "Proxy-Connection", "X-UIDH", "X-Csrf-Token", "Custom"];
    }
}

export function Types_HttpRequestHeaders_$reflection() {
    return union_type("Fetch.Types.HttpRequestHeaders", [], Types_HttpRequestHeaders, () => [[["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", int32_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["key", string_type], ["value", obj_type]]]);
}

export class Types_RequestProperties extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Method", "Headers", "Body", "Mode", "Credentials", "Cache", "Redirect", "Referrer", "ReferrerPolicy", "Integrity", "KeepAlive", "Signal"];
    }
}

export function Types_RequestProperties_$reflection() {
    return union_type("Fetch.Types.RequestProperties", [], Types_RequestProperties, () => [[["Item", string_type]], [["Item", class_type("Fetch.Types.IHttpRequestHeaders")]], [["Item", class_type("Fable.Core.U3`3", [class_type("Browser.Types.Blob", void 0), class_type("Browser.Types.FormData", void 0), string_type])]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", bool_type]], [["Item", class_type("Fetch.Types.AbortSignal")]]]);
}

export class Types_ResponseInitProperties extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Status", "StatusText", "Headers"];
    }
}

export function Types_ResponseInitProperties_$reflection() {
    return union_type("Fetch.Types.ResponseInitProperties", [], Types_ResponseInitProperties, () => [[["Item", int32_type]], [["Item", string_type]], [["Item", array_type(tuple_type(string_type, string_type))]]]);
}

export function Fetch_Types_Response__Response_create_Static_36F1D09D(content, options) {
    const options_1 = defaultArg(options, empty());
    return new Response(content, keyValueList(options_1, 1));
}

export function Fetch_Types_Response__Response_create_Static_Z7AF41C79(content, options) {
    const options_1 = defaultArg(options, empty());
    return new Response(content, keyValueList(options_1, 1));
}

export function Fetch_Types_Response__Response_create_Static_Z43D75E86(content, options) {
    const options_1 = defaultArg(options, empty());
    return new Response(content, keyValueList(options_1, 1));
}

export function Fetch_Types_Response__Response_create_Static_7B93BED7(content, options) {
    const options_1 = defaultArg(options, empty());
    return new Response(content, keyValueList(options_1, 1));
}

function errorString(response) {
    return (((int32ToString(response.status) + " ") + (response.statusText)) + " for URL ") + (response.url);
}

/**
 * Retrieves data from the specified resource. Fails if `response.Ok` evals to false.
 */
export function fetch$(url, init) {
    const pr = fetch(url, keyValueList(init, 1));
    return pr.then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            throw new Error(errorString(response));
        }
    });
}

/**
 * Retrieves data from the specified resource without check for 2xx status.
 */
export function fetchUnsafe(url, init) {
    return fetch(url, keyValueList(init, 1));
}

export function tryFetch(url, init) {
    return result(fetch$(url, init));
}

/**
 * Sends a HTTP OPTIONS request.
 */
export function tryOptionsRequest(url) {
    return result(fetch$(url, singleton(new Types_RequestProperties(0, ["OPTIONS"]))));
}

//# sourceMappingURL=Fetch.fs.js.map
