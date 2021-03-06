"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var graphql_tools_1 = require("graphql-tools");
var graphql_1 = require("graphql");
var __1 = require("../");
// Setup ---------------------------------------------------------------------
var typeDefs = "\n  type Query {\n    withObjectTypeConfig: String!\n  }\n\n  type Mutation {\n    withObjectTypeConfig: String!\n  }\n\n  schema {\n    query: Query,\n    mutation: Mutation,\n  }\n";
var resolvers = {
    Query: {
        withObjectTypeConfig: {
            extraProperties: 'extra properties are passed down',
            resolve: function () { return 'withObjectTypeConfig'; },
        },
    },
    Mutation: {
        withObjectTypeConfig: {
            extraProperties: 'extra properties are passed down',
            resolve: function () { return 'withObjectTypeConfig'; },
        },
    },
};
var getSchema = function () { return graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers }); };
// Middleware ----------------------------------------------------------------
// Field Middleware
var fieldMiddleware = {
    Query: {
        withObjectTypeConfig: function (resolve, parent, args, context, info) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (info.schema.getQueryType().getFields()[info.fieldName]
                        .extraProperties || 'fail')];
            });
        }); },
    },
    Mutation: {
        withObjectTypeConfig: function (resolve, parent, args, context, info) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (info.schema.getMutationType().getFields()[info.fieldName]
                        .extraProperties || 'fail')];
            });
        }); },
    },
};
// Type Middleware
var typeMiddlewareBefore = {
    Query: function (resolve, parent, args, context, info) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (info.schema.getQueryType().getFields()[info.fieldName].extraProperties ||
                    'fail')];
        });
    }); },
    Mutation: function (resolve, parent, args, context, info) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (info.schema.getMutationType().getFields()[info.fieldName]
                    .extraProperties || 'fail')];
        });
    }); },
};
// Test ----------------------------------------------------------------------
// Field
ava_1.default('Additional properties are passed down properly on field middleware - Query', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var schema, schemaWithMiddleware, query, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema = getSchema();
                schemaWithMiddleware = __1.applyMiddleware(schema, fieldMiddleware);
                query = "\n    query {\n      withObjectTypeConfig\n    }\n  ";
                return [4 /*yield*/, graphql_1.graphql(schemaWithMiddleware, query)];
            case 1:
                res = _a.sent();
                t.deepEqual(res, {
                    data: {
                        withObjectTypeConfig: 'extra properties are passed down',
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Additional properties are passed down properly on field middleware - Mutation', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var schema, schemaWithMiddleware, query, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema = getSchema();
                schemaWithMiddleware = __1.applyMiddleware(schema, fieldMiddleware);
                query = "\n    mutation {\n      withObjectTypeConfig\n    }\n  ";
                return [4 /*yield*/, graphql_1.graphql(schemaWithMiddleware, query)];
            case 1:
                res = _a.sent();
                t.deepEqual(res, {
                    data: {
                        withObjectTypeConfig: 'extra properties are passed down',
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
// Type
ava_1.default('Additional properties are passed down properly on type middleware - Query', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var schema, schemaWithMiddleware, query, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema = getSchema();
                schemaWithMiddleware = __1.applyMiddleware(schema, typeMiddlewareBefore);
                query = "\n    query {\n      withObjectTypeConfig\n    }\n  ";
                return [4 /*yield*/, graphql_1.graphql(schemaWithMiddleware, query)];
            case 1:
                res = _a.sent();
                t.deepEqual(res, {
                    data: {
                        withObjectTypeConfig: 'extra properties are passed down',
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Additional properties are passed down properly on type middleware - Mutation', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var schema, schemaWithMiddleware, query, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema = getSchema();
                schemaWithMiddleware = __1.applyMiddleware(schema, typeMiddlewareBefore);
                query = "\n    mutation {\n      withObjectTypeConfig\n    }\n  ";
                return [4 /*yield*/, graphql_1.graphql(schemaWithMiddleware, query)];
            case 1:
                res = _a.sent();
                t.deepEqual(res, {
                    data: {
                        withObjectTypeConfig: 'extra properties are passed down',
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=extra-properties.test.js.map