"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function validateMiddleware(schema, middleware) {
    if (utils_1.isMiddlewareFunction(middleware)) {
        return middleware;
    }
    var types = schema.getTypeMap();
    Object.keys(middleware).forEach(function (type) {
        if (!Object.keys(types).includes(type)) {
            throw new MiddlewareError("Type " + type + " exists in middleware but is missing in Schema.");
        }
        if (!utils_1.isMiddlewareFunction(middleware[type])) {
            var fields_1 = types[type].getFields();
            Object.keys(middleware[type]).forEach(function (field) {
                if (!Object.keys(fields_1).includes(field)) {
                    throw new MiddlewareError("Field " + type + "." + field + " exists in middleware but is missing in Schema.");
                }
                if (!utils_1.isMiddlewareFunction(middleware[type][field])) {
                    throw new MiddlewareError("Expected " + type + "." + field + " to be a function but found " +
                        typeof middleware[type][field]);
                }
            });
        }
    });
    return middleware;
}
exports.validateMiddleware = validateMiddleware;
var MiddlewareError = /** @class */ (function (_super) {
    __extends(MiddlewareError, _super);
    function MiddlewareError() {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        return _super.apply(this, props) || this;
    }
    return MiddlewareError;
}(Error));
exports.MiddlewareError = MiddlewareError;
//# sourceMappingURL=validation.js.map