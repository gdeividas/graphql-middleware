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
var __1 = require("../");
ava_1.default('Applies schema middleware with fragments correctly.', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var typeDefs, resolvers, schema, schemaMiddlewareWithFragment, fragmentReplacements;
    return __generator(this, function (_a) {
        typeDefs = "\n  type Query {\n    book: Book!\n  }\n\n  type Book {\n    id: ID!\n    name: String!\n    content: String!\n    author: String!\n  }\n";
        resolvers = {
            Query: {
                book: function (parent, args, ctx, info) {
                    return {
                        id: 'id',
                        name: 'name',
                        content: 'content',
                        author: 'author',
                    };
                },
            },
        };
        schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
        schemaMiddlewareWithFragment = {
            fragment: "schema-fragment",
            resolve: function (resolve) { return resolve(); },
        };
        fragmentReplacements = __1.applyMiddleware(schema, schemaMiddlewareWithFragment).fragmentReplacements;
        t.deepEqual(fragmentReplacements, [
            { field: 'book', fragment: 'schema-fragment' },
            { field: 'id', fragment: 'schema-fragment' },
            { field: 'name', fragment: 'schema-fragment' },
            { field: 'content', fragment: 'schema-fragment' },
            { field: 'author', fragment: 'schema-fragment' },
        ]);
        return [2 /*return*/];
    });
}); });
ava_1.default('Applies type middleware with fragments correctly.', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var typeDefs, resolvers, schema, typeMiddlewareWithFragment, fragmentReplacements;
    return __generator(this, function (_a) {
        typeDefs = "\n    type Query {\n      book: Book!\n    }\n\n    type Book {\n      id: ID!\n      name: String!\n      content: String!\n      author: String!\n    }\n  ";
        resolvers = {
            Query: {
                book: function (parent, args, ctx, info) {
                    return {
                        id: 'id',
                        name: 'name',
                        content: 'content',
                        author: 'author',
                    };
                },
            },
        };
        schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
        typeMiddlewareWithFragment = {
            Query: {
                fragments: ["type-fragment:Query-1", "type-fragment:Query-2"],
                resolve: function (resolve) { return resolve(); },
            },
            Book: {
                fragment: "type-fragment:Book",
                resolve: function (resolve) { return resolve(); },
            },
        };
        fragmentReplacements = __1.applyMiddleware(schema, typeMiddlewareWithFragment).fragmentReplacements;
        t.deepEqual(fragmentReplacements, [
            {
                field: 'book',
                fragment: 'type-fragment:Query-1',
            },
            {
                field: 'book',
                fragment: 'type-fragment:Query-2',
            },
            {
                field: 'id',
                fragment: 'type-fragment:Book',
            },
            {
                field: 'name',
                fragment: 'type-fragment:Book',
            },
            {
                field: 'content',
                fragment: 'type-fragment:Book',
            },
            {
                field: 'author',
                fragment: 'type-fragment:Book',
            },
        ]);
        return [2 /*return*/];
    });
}); });
ava_1.default('Applies field middleware with fragments correctly.', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var typeDefs, resolvers, schema, fieldMiddlewareWithFragment, fragmentReplacements;
    return __generator(this, function (_a) {
        typeDefs = "\n    type Query {\n      book: Book!\n    }\n\n    type Book {\n      id: ID!\n      name: String!\n      content: String!\n      author: String!\n    }\n  ";
        resolvers = {
            Query: {
                book: function (parent, args, ctx, info) {
                    return {
                        id: 'id',
                        name: 'name',
                        content: 'content',
                        author: 'author',
                    };
                },
            },
        };
        schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
        fieldMiddlewareWithFragment = {
            Book: {
                content: {
                    fragment: "field-fragment:Book.content",
                    resolve: function (resolve) { return resolve(); },
                },
                author: {
                    fragments: [
                        "field-fragment:Book.author-1",
                        "field-fragment:Book.author-2",
                    ],
                    resolve: function (resolve) { return resolve(); },
                },
            },
        };
        fragmentReplacements = __1.applyMiddleware(schema, fieldMiddlewareWithFragment).fragmentReplacements;
        t.deepEqual(fragmentReplacements, [
            {
                field: 'content',
                fragment: 'field-fragment:Book.content',
            },
            {
                field: 'author',
                fragment: 'field-fragment:Book.author-1',
            },
            {
                field: 'author',
                fragment: 'field-fragment:Book.author-2',
            },
        ]);
        return [2 /*return*/];
    });
}); });
ava_1.default('Applies schema middleware with fragments correctly on declared resolvers.', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var typeDefs, resolvers, schema, schemaMiddlewareWithFragment, fragmentReplacements;
    return __generator(this, function (_a) {
        typeDefs = "\n    type Query {\n      book: Book!\n    }\n\n    type Book {\n      id: ID!\n      name: String!\n      content: String!\n      author: String!\n    }\n  ";
        resolvers = {
            Query: {
                book: function (parent, args, ctx, info) {
                    return {
                        id: 'id',
                        name: 'name',
                        content: 'content',
                        author: 'author',
                    };
                },
            },
        };
        schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
        schemaMiddlewareWithFragment = {
            fragment: "schema-fragment",
            resolve: function (resolve) { return resolve(); },
        };
        fragmentReplacements = __1.applyMiddlewareToDeclaredResolvers(schema, schemaMiddlewareWithFragment).fragmentReplacements;
        t.deepEqual(fragmentReplacements, [
            { field: 'book', fragment: 'schema-fragment' },
        ]);
        return [2 /*return*/];
    });
}); });
ava_1.default('Applies type middleware with fragments correctly on declared resolvers.', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var typeDefs, resolvers, schema, typeMiddlewareWithFragment, fragmentReplacements;
    return __generator(this, function (_a) {
        typeDefs = "\n    type Query {\n      book: Book!\n    }\n\n    type Book {\n      id: ID!\n      name: String!\n      content: String!\n      author: String!\n    }\n  ";
        resolvers = {
            Query: {
                book: function (parent, args, ctx, info) {
                    return {
                        id: 'id',
                        name: 'name',
                        content: 'content',
                        author: 'author',
                    };
                },
            },
        };
        schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
        typeMiddlewareWithFragment = {
            Query: {
                fragments: ["type-fragment:Query-1", "type-fragment:Query-2"],
                resolve: function (resolve) { return resolve(); },
            },
            Book: {
                fragment: "type-fragment:Book",
                resolve: function (resolve) { return resolve(); },
            },
        };
        fragmentReplacements = __1.applyMiddlewareToDeclaredResolvers(schema, typeMiddlewareWithFragment).fragmentReplacements;
        t.deepEqual(fragmentReplacements, [
            {
                field: 'book',
                fragment: 'type-fragment:Query-1',
            },
            {
                field: 'book',
                fragment: 'type-fragment:Query-2',
            },
        ]);
        return [2 /*return*/];
    });
}); });
ava_1.default('Applies field middleware with fragments correctly on declared resolvers.', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var typeDefs, resolvers, schema, fieldMiddlewareWithFragment, fragmentReplacements;
    return __generator(this, function (_a) {
        typeDefs = "\n    type Query {\n      book: Book!\n    }\n\n    type Book {\n      id: ID!\n      name: String!\n      content: String!\n      author: String!\n    }\n  ";
        resolvers = {
            Query: {
                book: function (parent, args, ctx, info) {
                    return {
                        id: 'id',
                        name: 'name',
                        content: 'content',
                        author: 'author',
                    };
                },
            },
            Book: {
                name: function (parent) { return parent.name; },
                content: function (parent) { return parent.content; },
                author: function (parent) { return parent.author; },
            },
        };
        schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
        fieldMiddlewareWithFragment = {
            Book: {
                id: {
                    fragment: "not-copied",
                    resolve: function (resolve) { return resolve(); },
                },
                content: {
                    fragment: "field-fragment:Book.content",
                    resolve: function (resolve) { return resolve(); },
                },
                author: {
                    fragments: [
                        "field-fragment:Book.author-1",
                        "field-fragment:Book.author-2",
                    ],
                    resolve: function (resolve) { return resolve(); },
                },
            },
        };
        fragmentReplacements = __1.applyMiddlewareToDeclaredResolvers(schema, fieldMiddlewareWithFragment).fragmentReplacements;
        t.deepEqual(fragmentReplacements, [
            {
                field: 'content',
                fragment: 'field-fragment:Book.content',
            },
            {
                field: 'author',
                fragment: 'field-fragment:Book.author-1',
            },
            {
                field: 'author',
                fragment: 'field-fragment:Book.author-2',
            },
        ]);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=fragments.test.js.map