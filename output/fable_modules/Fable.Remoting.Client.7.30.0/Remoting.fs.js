import { empty } from "../fable-library.4.9.0/List.js";
import { defaultOf, uncurry2 } from "../fable-library.4.9.0/Util.js";
import { toFail, printf, toText } from "../fable-library.4.9.0/String.js";
import { RemoteBuilderOptions } from "./Types.fs.js";
import { Reader_$ctor_Z3F6BC7B1, Reader__Read_24524716 } from "../Fable.Remoting.MsgPack.1.21.0/Read.fs.js";
import { fullName, makeRecord, getRecordElements, name as name_1, class_type } from "../fable-library.4.9.0/Reflection.js";
import { createTypeInfo } from "../Fable.SimpleJson.3.24.0/TypeInfo.Converter.fs.js";
import { pick, map } from "../fable-library.4.9.0/Array.js";
import { singleton, collect, delay, toArray } from "../fable-library.4.9.0/Seq.js";
import { Proxy_proxyFetch } from "./Proxy.fs.js";

/**
 * Starts with default configuration for building a proxy
 */
export function RemotingModule_createApi() {
    let clo;
    return new RemoteBuilderOptions(empty(), void 0, void 0, false, uncurry2((clo = toText(printf("/%s/%s")), (arg) => {
        const clo_1 = clo(arg);
        return clo_1;
    })), void 0);
}

/**
 * Defines how routes are built using the type name and method name. By default, the generated routes are of the form `/typeName/methodName`.
 */
export function RemotingModule_withRouteBuilder(builder, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, options.WithCredentials, builder, options.CustomResponseSerialization);
}

/**
 * Sets the base url for the request. Useful if you are making cross-domain requests
 */
export function RemotingModule_withBaseUrl(url, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, url, options.Authorization, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

/**
 * Adds custom headers to each request of the proxy
 */
export function RemotingModule_withCustomHeader(headers, options) {
    return new RemoteBuilderOptions(headers, options.BaseUrl, options.Authorization, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

/**
 * Sets the authorization header of every request from the proxy
 */
export function RemotingModule_withAuthorizationHeader(token, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, token, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

/**
 * Sets the withCredentials option on the XHR request, which is useful for CORS scenarios
 */
export function RemotingModule_withCredentials(withCredentials, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, withCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

/**
 * Specifies that the API uses binary serialization for responses
 */
export function RemotingModule_withBinarySerialization(options) {
    const serializer = (response, returnType) => Reader__Read_24524716(Reader_$ctor_Z3F6BC7B1(response), returnType);
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, options.WithCredentials, options.RouteBuilder, serializer);
}

export class Remoting {
    constructor() {
    }
}

export function Remoting_$reflection() {
    return class_type("Fable.Remoting.Client.Remoting", void 0, Remoting);
}

export function Remoting_$ctor() {
    return new Remoting();
}

/**
 * For internal library use only.
 */
export function Remoting_buildProxy_64DC51C(options, resolvedType) {
    const schemaType = createTypeInfo(resolvedType);
    if (schemaType.tag === 39) {
        const getFields = schemaType.fields[0];
        const patternInput = getFields();
        const recordType = patternInput[1];
        const fields = patternInput[0];
        const fieldTypes = map((prop) => [name_1(prop), prop[1]], getRecordElements(recordType));
        const recordFields = toArray(delay(() => collect((field) => {
            const normalize = (n) => {
                const fieldType = pick((tupledArg) => {
                    const name = tupledArg[0];
                    const typ = tupledArg[1];
                    if (name === field.FieldName) {
                        return typ;
                    }
                    else {
                        return void 0;
                    }
                }, fieldTypes);
                const fn = Proxy_proxyFetch(options, name_1(recordType), field, fieldType);
                switch (n) {
                    case 0:
                        return fn(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf());
                    case 1:
                        return (a) => fn(a)(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf());
                    case 2: {
                        const proxyF = (a_1, b) => fn(a_1)(b)(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf());
                        return proxyF;
                    }
                    case 3: {
                        const proxyF_1 = (a_2, b_1, c) => fn(a_2)(b_1)(c)(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf());
                        return proxyF_1;
                    }
                    case 4: {
                        const proxyF_2 = (a_3, b_2, c_1, d) => fn(a_3)(b_2)(c_1)(d)(defaultOf())(defaultOf())(defaultOf())(defaultOf());
                        return proxyF_2;
                    }
                    case 5: {
                        const proxyF_3 = (a_4, b_3, c_2, d_1, e) => fn(a_4)(b_3)(c_2)(d_1)(e)(defaultOf())(defaultOf())(defaultOf());
                        return proxyF_3;
                    }
                    case 6: {
                        const proxyF_4 = (a_5, b_4, c_3, d_2, e_1, f) => fn(a_5)(b_4)(c_3)(d_2)(e_1)(f)(defaultOf())(defaultOf());
                        return proxyF_4;
                    }
                    case 7: {
                        const proxyF_5 = (a_6, b_5, c_4, d_3, e_2, f_1, g) => fn(a_6)(b_5)(c_4)(d_3)(e_2)(f_1)(g)(defaultOf());
                        return proxyF_5;
                    }
                    case 8: {
                        const proxyF_6 = (a_7, b_6, c_5, d_4, e_3, f_2, g_1, h) => fn(a_7)(b_6)(c_5)(d_4)(e_3)(f_2)(g_1)(h);
                        return proxyF_6;
                    }
                    default:
                        return toFail(printf("Cannot generate proxy function for %s. Only up to 8 arguments are supported. Consider using a record type as input"))(field.FieldName);
                }
            };
            let argumentCount;
            const matchValue = field.FieldType;
            switch (matchValue.tag) {
                case 25: {
                    argumentCount = 0;
                    break;
                }
                case 26: {
                    argumentCount = 0;
                    break;
                }
                case 37: {
                    const getArgs = matchValue.fields[0];
                    argumentCount = (getArgs().length - 1);
                    break;
                }
                default:
                    argumentCount = 0;
            }
            return singleton(normalize(argumentCount));
        }, fields)));
        const proxy = makeRecord(recordType, recordFields);
        return proxy;
    }
    else {
        const arg_1 = fullName(resolvedType);
        return toFail(printf("Cannot build proxy. Exepected type %s to be a valid protocol definition which is a record of functions"))(arg_1);
    }
}

//# sourceMappingURL=Remoting.fs.js.map
