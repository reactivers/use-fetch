'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var applicationJSONHeader = { "Content-Type": "application/json" };
var iFetch = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var url, _body, _a, stringify, onSuccess, onError, _b, responseContentType, _c, method, rest, body, httpResponse, _d, responseJson, responseBlob, responseFormData, responseText, responseArrayBuffer, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                url = payload.url, _body = payload.body, _a = payload.stringify, stringify = _a === void 0 ? true : _a, onSuccess = payload.onSuccess, onError = payload.onError, _b = payload.responseContentType, responseContentType = _b === void 0 ? "JSON" : _b, _c = payload.method, method = _c === void 0 ? "GET" : _c, rest = __rest(payload, ["url", "body", "stringify", "onSuccess", "onError", "responseContentType", "method"]);
                if (url === undefined) {
                    throw new Error("No URL Found in the request");
                }
                body = stringify ? JSON.stringify(_body) : _body;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 15, , 16]);
                return [4 /*yield*/, fetch(url, __assign({ body: body, method: method }, rest))];
            case 2:
                httpResponse = _e.sent();
                _d = responseContentType;
                switch (_d) {
                    case "JSON": return [3 /*break*/, 3];
                    case "BLOB": return [3 /*break*/, 5];
                    case "FORM-DATA": return [3 /*break*/, 7];
                    case "TEXT": return [3 /*break*/, 9];
                    case "ARRAY-BUFFER": return [3 /*break*/, 11];
                }
                return [3 /*break*/, 13];
            case 3: return [4 /*yield*/, httpResponse.json()];
            case 4:
                responseJson = _e.sent();
                onSuccess(responseJson);
                return [3 /*break*/, 14];
            case 5: return [4 /*yield*/, httpResponse.blob()];
            case 6:
                responseBlob = _e.sent();
                onSuccess(responseBlob);
                return [3 /*break*/, 14];
            case 7: return [4 /*yield*/, httpResponse.formData()];
            case 8:
                responseFormData = _e.sent();
                onSuccess(responseFormData);
                return [3 /*break*/, 14];
            case 9: return [4 /*yield*/, httpResponse.text()];
            case 10:
                responseText = _e.sent();
                onSuccess(responseText);
                return [3 /*break*/, 14];
            case 11: return [4 /*yield*/, httpResponse.arrayBuffer()];
            case 12:
                responseArrayBuffer = _e.sent();
                onSuccess(responseArrayBuffer);
                return [3 /*break*/, 14];
            case 13:
                onSuccess(httpResponse);
                _e.label = 14;
            case 14: return [2 /*return*/, httpResponse];
            case 15:
                error_1 = _e.sent();
                onError(error_1);
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };

var FetchContext = react.createContext({});
var FetchProvider = function (_a) {
    var children = _a.children, _b = _a.getAuthorizationHeader, getAuthorizationHeader = _b === void 0 ? function () { return ""; } : _b, rest = __rest(_a, ["children", "getAuthorizationHeader"]);
    return (jsxRuntime.jsx(FetchContext.Provider, __assign({ value: __assign({ getAuthorizationHeader: getAuthorizationHeader }, rest) }, { children: children })));
};
FetchProvider.defaultProps = {};
var useFetchContext = function () {
    var context = react.useContext(FetchContext);
    if (context === undefined) {
        throw new Error('useFetchContext must be used within an FetchContext.Provider');
    }
    return context;
};

var useFetch = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var abortOnUnmount = params.abortOnUnmount;
    var _a = useFetchContext(), contextURL = _a.url, contextOnSuccess = _a.onSuccess, contextOnError = _a.onError, onRequest = _a.onRequest, isError = _a.isError, isSuccess = _a.isSuccess, credentials = _a.credentials, transformResponse = _a.transformResponse, getAuthorizationHeader = _a.getAuthorizationHeader;
    var _b = react.useState({
        success: undefined,
        firstTimeFetched: false,
        fetched: false,
        fetching: false,
        response: {}
    }), data = _b[0], setData = _b[1];
    var abortController = react.useMemo(function () { return new AbortController(); }, []);
    var onSuccess = react.useCallback(function (_a) {
        var payloadOnSuccess = _a.onSuccess, response = _a.response;
        if (transformResponse)
            response = transformResponse(response);
        if (contextOnSuccess)
            contextOnSuccess(response);
        if (payloadOnSuccess)
            payloadOnSuccess(response);
        setData(function (oldData) { return (__assign(__assign({}, oldData), { success: true, response: response, fetching: false, fetched: true, firstTimeFetched: true })); });
    }, [contextOnSuccess, transformResponse]);
    var onError = react.useCallback(function (_a) {
        var payloadOnError = _a.onError, response = _a.response;
        if (transformResponse)
            response = transformResponse(response);
        if (contextOnError)
            contextOnError(response);
        if (payloadOnError)
            payloadOnError(response);
        setData(function (oldData) { return (__assign(__assign({}, oldData), { success: false, response: response, fetching: false, fetched: true, firstTimeFetched: true })); });
    }, [contextOnError, transformResponse]);
    var request = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        var _url = payload.url, endpoint = payload.endpoint, payloadOnSuccess = payload.onSuccess, payloadOnError = payload.onError, payloadHeaders = payload.headers, _credentials = payload.credentials, rest = __rest(payload, ["url", "endpoint", "onSuccess", "onError", "headers", "credentials"]);
        var url = "".concat(_url || contextURL).concat(endpoint);
        if (onRequest)
            onRequest(__assign(__assign({}, payload), { url: url }));
        setData(function (old) { return (__assign(__assign({}, old), { fetching: true, fetched: false })); });
        var authorizationHeader = getAuthorizationHeader();
        var headers = __assign({ "Authorization": authorizationHeader }, (payloadHeaders || {}));
        if (!headers["Authorization"])
            delete headers["Authorization"];
        return iFetch(__assign(__assign({}, rest), { url: url, headers: headers, credentials: _credentials || credentials, onSuccess: function (response) {
                if (!isSuccess || isSuccess(response)) {
                    onSuccess({
                        onSuccess: payloadOnSuccess,
                        response: response
                    });
                }
                else {
                    onError({
                        onError: payloadOnError,
                        response: response,
                    });
                }
            }, onError: function (response) {
                if (!isError || isError(response)) {
                    onError({
                        onError: payloadOnError,
                        response: response,
                    });
                }
                else {
                    onSuccess({
                        onSuccess: payloadOnSuccess,
                        response: response
                    });
                }
            }, signal: abortController.signal }));
    }, [
        isError,
        isSuccess,
        credentials,
        getAuthorizationHeader,
        contextURL,
        onSuccess,
        onError,
        setData,
        onRequest,
        abortController.signal
    ]);
    react.useEffect(function () {
        return function () {
            if (abortOnUnmount)
                abortController.abort();
        };
    }, [abortController.abort, abortOnUnmount]);
    return __assign({ request: request }, data);
};

var useGet = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var _a = useFetch(params), request = _a.request, rest = __rest(_a, ["request"]);
    var getRequest = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        return request(__assign(__assign({}, payload), { method: "GET" }));
    }, [request]);
    return __assign({ request: getRequest }, rest);
};

var usePost = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var _a = useFetch(params), request = _a.request, rest = __rest(_a, ["request"]);
    var postRequest = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        return request(__assign(__assign({ headers: applicationJSONHeader }, payload), { method: "POST" }));
    }, [request]);
    return __assign({ request: postRequest }, rest);
};

var usePut = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var _a = useFetch(params), request = _a.request, rest = __rest(_a, ["request"]);
    var putRequest = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        return request(__assign(__assign({ headers: applicationJSONHeader }, payload), { method: "PUT" }));
    }, [request]);
    return __assign({ request: putRequest }, rest);
};

var useDelete = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var _a = useFetch(params), request = _a.request, rest = __rest(_a, ["request"]);
    var deleteRequest = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        return request(__assign(__assign({ headers: applicationJSONHeader }, payload), { method: "DELETE" }));
    }, [request]);
    return __assign({ request: deleteRequest }, rest);
};

exports.FetchProvider = FetchProvider;
exports.useDelete = useDelete;
exports.useFetch = useFetch;
exports.useGet = useGet;
exports.usePost = usePost;
exports.usePut = usePut;
