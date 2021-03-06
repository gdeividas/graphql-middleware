"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var utils_1 = require("./utils");
// Applicator
function wrapResolverInMiddleware(resolver, middleware) {
    return function (parent, args, ctx, info) {
        return middleware(function (_parent, _args, _ctx, _info) {
            if (_parent === void 0) { _parent = parent; }
            if (_args === void 0) { _args = args; }
            if (_ctx === void 0) { _ctx = ctx; }
            if (_info === void 0) { _info = info; }
            return resolver(_parent, _args, _ctx, _info);
        }, parent, args, ctx, info);
    };
}
function applyMiddlewareToField(field, options, middleware) {
    if (utils_1.isMiddlewareWithFragment(middleware) && field.resolve) {
        return __assign({}, field, { fragment: middleware.fragment, fragments: middleware.fragments, resolve: wrapResolverInMiddleware(field.resolve, middleware.resolve) });
    }
    else if (utils_1.isMiddlewareWithFragment(middleware) && field.subscribe) {
        return __assign({}, field, { fragment: middleware.fragment, fragments: middleware.fragments, subscribe: wrapResolverInMiddleware(field.subscribe, middleware.resolve) });
    }
    else if (utils_1.isMiddlewareResolver(middleware) && field.resolve) {
        return __assign({}, field, { resolve: wrapResolverInMiddleware(field.resolve, middleware) });
    }
    else if (utils_1.isMiddlewareResolver(middleware) && field.subscribe) {
        return __assign({}, field, { subscribe: wrapResolverInMiddleware(field.subscribe, middleware) });
    }
    else if (utils_1.isMiddlewareWithFragment(middleware) &&
        !options.onlyDeclaredResolvers) {
        return __assign({}, field, { fragment: middleware.fragment, fragments: middleware.fragments, resolve: wrapResolverInMiddleware(graphql_1.defaultFieldResolver, middleware.resolve) });
    }
    else if (utils_1.isMiddlewareResolver(middleware) &&
        !options.onlyDeclaredResolvers) {
        return __assign({}, field, { resolve: wrapResolverInMiddleware(graphql_1.defaultFieldResolver, middleware) });
    }
    else {
        return __assign({}, field, { resolve: graphql_1.defaultFieldResolver });
    }
}
function applyMiddlewareToType(type, options, middleware) {
    var fieldMap = type.getFields();
    if (utils_1.isMiddlewareFunction(middleware)) {
        var resolvers = Object.keys(fieldMap).reduce(function (resolvers, fieldName) {
            var _a;
            return (__assign({}, resolvers, (_a = {}, _a[fieldName] = applyMiddlewareToField(fieldMap[fieldName], options, middleware), _a)));
        }, {});
        return resolvers;
    }
    else {
        var resolvers = Object.keys(middleware).reduce(function (resolvers, field) {
            var _a;
            return (__assign({}, resolvers, (_a = {}, _a[field] = applyMiddlewareToField(fieldMap[field], options, middleware[field]), _a)));
        }, {});
        return resolvers;
    }
}
function isMetaType(type) {
    return type.name.startsWith('__');
}
function applyMiddlewareToSchema(schema, options, middleware) {
    var typeMap = schema.getTypeMap();
    var resolvers = Object.keys(typeMap)
        .filter(function (type) { return utils_1.isGraphQLObjectType(typeMap[type]); })
        .filter(function (type) { return !isMetaType(typeMap[type]); })
        .reduce(function (resolvers, type) {
        var _a;
        return (__assign({}, resolvers, (_a = {}, _a[type] = applyMiddlewareToType(typeMap[type], options, middleware), _a)));
    }, {});
    return resolvers;
}
// Generator
function generateResolverFromSchemaAndMiddleware(schema, options, middleware) {
    if (utils_1.isMiddlewareFunction(middleware)) {
        return applyMiddlewareToSchema(schema, options, middleware);
    }
    else {
        var typeMap_1 = schema.getTypeMap();
        var resolvers = Object.keys(middleware).reduce(function (resolvers, type) {
            var _a;
            return (__assign({}, resolvers, (_a = {}, _a[type] = applyMiddlewareToType(typeMap_1[type], options, middleware[type]), _a)));
        }, {});
        return resolvers;
    }
}
exports.generateResolverFromSchemaAndMiddleware = generateResolverFromSchemaAndMiddleware;
//# sourceMappingURL=applicator.js.map