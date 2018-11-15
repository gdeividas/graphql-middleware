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
var iterall_1 = require("iterall");
var __1 = require("../");
// Setup ---------------------------------------------------------------------
var typeDefs = "\n  type Query {\n    before(arg: String!): String!\n    beforeNothing(arg: String!): String!\n    after: String!\n    afterNothing: String!\n    null: String\n    nested: Nothing!\n    resolverless: Resolverless!\n  }\n\n  type Mutation {\n    before(arg: String!): String!\n    beforeNothing(arg: String!): String!\n    after: String!\n    afterNothing: String!\n    null: String\n    nested: Nothing!\n  }\n  \n  type Subscription {\n    sub: String\n  }\n\n  type Nothing {\n    nothing: String!\n  }\n\n  type Resolverless {\n    someData: String!\n  }\n\n  schema {\n    query: Query,\n    mutation: Mutation,\n    subscription: Subscription\n  }\n";
var resolvers = {
    Query: {
        before: function (parent, _a, ctx, info) {
            var arg = _a.arg;
            return arg;
        },
        beforeNothing: function (parent, _a, ctx, info) {
            var arg = _a.arg;
            return arg;
        },
        after: function () { return 'after'; },
        afterNothing: function () { return 'after'; },
        null: function () { return null; },
        nested: function () { return ({}); },
        resolverless: function () { return ({ someData: 'data' }); },
    },
    Mutation: {
        before: function (parent, _a, ctx, info) {
            var arg = _a.arg;
            return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                return [2 /*return*/, arg];
            }); });
        },
        beforeNothing: function (parent, _a, ctx, info) {
            var arg = _a.arg;
            return arg;
        },
        after: function () { return 'after'; },
        afterNothing: function () { return 'after'; },
        null: function () { return null; },
        nested: function () { return ({}); },
    },
    Subscription: {
        sub: {
            subscribe: function (parent, _a, ctx, info) {
                var arg = _a.arg;
                return __awaiter(_this, void 0, void 0, function () {
                    var _b, iterator;
                    return __generator(this, function (_c) {
                        iterator = (_b = {
                                next: function () { return Promise.resolve({ done: false, value: { sub: arg } }); },
                                return: function () {
                                    return;
                                },
                                throw: function () {
                                    return;
                                }
                            },
                            _b[iterall_1.$$asyncIterator] = function () { return iterator; },
                            _b);
                        return [2 /*return*/, iterator];
                    });
                });
            },
        },
    },
    Nothing: {
        nothing: function () { return 'nothing'; },
    },
};
var getSchema = function () { return graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers }); };
ava_1.default.serial('showcase-without-applyMiddleware', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var dummyMiddleware, schema, query, startTime, res, i, startTimeAfterSingleQuery, endTimeAfterSingleQuery, startTimeAfterSingleRegularQuery, endTimeAfterSingleRegularQuery, endTime;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n Test: showcase-without-applyMiddleware");
                console.log("----------\n");
                dummyMiddleware = function (resolve, parent, args, ctx, info) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, resolve(parent, args, ctx, info)];
                    });
                }); };
                schema = getSchema();
                query = "\n  query {\n    before(arg: \"before\")\n    beforeNothing(arg: \"before\")\n    after\n    afterNothing\n    null\n    nested { nothing }\n  }\n";
                startTime = new Date();
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i <= 200)) return [3 /*break*/, 4];
                return [4 /*yield*/, graphql_1.graphql(schema, graphql_1.introspectionQuery)];
            case 2:
                res = _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                startTimeAfterSingleQuery = new Date();
                return [4 /*yield*/, graphql_1.graphql(schema, graphql_1.introspectionQuery)];
            case 5:
                res = _a.sent();
                endTimeAfterSingleQuery = new Date();
                startTimeAfterSingleRegularQuery = new Date();
                return [4 /*yield*/, graphql_1.graphql(schema, query)];
            case 6:
                res = _a.sent();
                endTimeAfterSingleRegularQuery = new Date();
                endTime = new Date();
                console.log("single \"introspection\" query duration after loop: " + (endTimeAfterSingleQuery - startTimeAfterSingleQuery) /
                    1000);
                console.log("single \"regular\" query duration after loop: " + (endTimeAfterSingleRegularQuery - startTimeAfterSingleRegularQuery) /
                    1000);
                console.log("duration total (with loop): " + (endTime - startTime) / 1000);
                t.pass();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial('showcase-getting-slower', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var dummyMiddleware, schema, query, startTime, res, i, startTimeAfterSingleQuery, endTimeAfterSingleQuery, startTimeAfterSingleRegularQuery, endTimeAfterSingleRegularQuery, endTime;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n Test: showcase-getting-slower");
                console.log("----------\n");
                dummyMiddleware = function (resolve, parent, args, ctx, info) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, resolve(parent, args, ctx, info)];
                    });
                }); };
                schema = getSchema();
                query = "\n  query {\n    before(arg: \"before\")\n    beforeNothing(arg: \"before\")\n    after\n    afterNothing\n    null\n    nested { nothing }\n  }\n";
                startTime = new Date();
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i <= 200)) return [3 /*break*/, 4];
                schema = __1.applyMiddleware(schema, dummyMiddleware);
                return [4 /*yield*/, graphql_1.graphql(schema, graphql_1.introspectionQuery)];
            case 2:
                res = _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                startTimeAfterSingleQuery = new Date();
                schema = __1.applyMiddleware(schema, dummyMiddleware);
                return [4 /*yield*/, graphql_1.graphql(schema, graphql_1.introspectionQuery)];
            case 5:
                res = _a.sent();
                endTimeAfterSingleQuery = new Date();
                startTimeAfterSingleRegularQuery = new Date();
                return [4 /*yield*/, graphql_1.graphql(schema, query)];
            case 6:
                res = _a.sent();
                endTimeAfterSingleRegularQuery = new Date();
                endTime = new Date();
                console.log("single \"introspection\" query duration after loop: " + (endTimeAfterSingleQuery - startTimeAfterSingleQuery) /
                    1000);
                console.log("single \"regular\" query duration after loop: " + (endTimeAfterSingleRegularQuery - startTimeAfterSingleRegularQuery) /
                    1000);
                console.log("duration total (with loop): " + (endTime - startTime) / 1000);
                console.log("\n Note: ");
                console.log('The more times you applyMiddleware and do the introspection query, the longer it takes for later queries to run');
                t.pass();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=showcase.test.js.map