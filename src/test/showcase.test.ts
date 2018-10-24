import test from 'ava'
import { makeExecutableSchema } from 'graphql-tools'
import { graphql, introspectionQuery } from 'graphql'
import { $$asyncIterator } from 'iterall'

import { applyMiddleware } from '../'

// Setup ---------------------------------------------------------------------

const typeDefs = `
  type Query {
    before(arg: String!): String!
    beforeNothing(arg: String!): String!
    after: String!
    afterNothing: String!
    null: String
    nested: Nothing!
    resolverless: Resolverless!
  }

  type Mutation {
    before(arg: String!): String!
    beforeNothing(arg: String!): String!
    after: String!
    afterNothing: String!
    null: String
    nested: Nothing!
  }
  
  type Subscription {
    sub: String
  }

  type Nothing {
    nothing: String!
  }

  type Resolverless {
    someData: String!
  }

  schema {
    query: Query,
    mutation: Mutation,
    subscription: Subscription
  }
`

const resolvers = {
  Query: {
    before: (parent, { arg }, ctx, info) => arg,
    beforeNothing: (parent, { arg }, ctx, info) => arg,
    after: () => 'after',
    afterNothing: () => 'after',
    null: () => null,
    nested: () => ({}),
    resolverless: () => ({ someData: 'data' }),
  },
  Mutation: {
    before: async (parent, { arg }, ctx, info) => arg,
    beforeNothing: (parent, { arg }, ctx, info) => arg,
    after: () => 'after',
    afterNothing: () => 'after',
    null: () => null,
    nested: () => ({}),
  },
  Subscription: {
    sub: {
      subscribe: async (parent, { arg }, ctx, info) => {
        const iterator = {
          next: () => Promise.resolve({ done: false, value: { sub: arg } }),
          return: () => {
            return
          },
          throw: () => {
            return
          },
          [$$asyncIterator]: () => iterator,
        }
        return iterator
      },
    },
  },
  Nothing: {
    nothing: () => 'nothing',
  },
}
const getSchema = () => makeExecutableSchema({ typeDefs, resolvers })



test.serial('showcase-without-applyMiddleware', async t => {

  console.log("\n Test: showcase-without-applyMiddleware")
  console.log("----------\n")

  const dummyMiddleware = async (resolve, parent, args, ctx, info) => {
    return resolve(parent, args, ctx, info)
  }

  let schema = getSchema()
  const query = `
  query {
    before(arg: "before")
    beforeNothing(arg: "before")
    after
    afterNothing
    null
    nested { nothing }
  }
`

  const startTime: any = new Date()
  
  let res;
  for (let i = 0; i <= 200; i++) {
    res = await graphql(schema, introspectionQuery)
  }

  const startTimeAfterSingleQuery: any = new Date()
  res = await graphql(schema, introspectionQuery)

  const endTimeAfterSingleQuery: any = new Date()

  const startTimeAfterSingleRegularQuery: any = new Date()
  res = await graphql(schema, query)

  const endTimeAfterSingleRegularQuery: any = new Date()
  const endTime: any = new Date()

  
  console.log(
    `single "introspection" query duration after loop: ${(endTimeAfterSingleQuery - startTimeAfterSingleQuery
      ) /
      1000}`,
  )

  console.log(
    `single "regular" query duration after loop: ${(endTimeAfterSingleRegularQuery - startTimeAfterSingleRegularQuery) /
      1000}`,
  )
  console.log(`duration total (with loop): ${(endTime - startTime) / 1000}`)

  t.pass();
})

test.serial('showcase-getting-slower', async t => {

  console.log("\n Test: showcase-getting-slower")
  console.log("----------\n")

  const dummyMiddleware = async (resolve, parent, args, ctx, info) => {
    return resolve(parent, args, ctx, info)
  }

  let schema = getSchema()
  const query = `
  query {
    before(arg: "before")
    beforeNothing(arg: "before")
    after
    afterNothing
    null
    nested { nothing }
  }
`

  const startTime: any = new Date()
  
  let res;
  for (let i = 0; i <= 200; i++) {
    schema = applyMiddleware(schema, dummyMiddleware)

    res = await graphql(schema, introspectionQuery)
  }

 
  const startTimeAfterSingleQuery: any = new Date()
  schema = applyMiddleware(schema, dummyMiddleware)
  res = await graphql(schema, introspectionQuery)

  const endTimeAfterSingleQuery: any = new Date()

  const startTimeAfterSingleRegularQuery: any = new Date()
  res = await graphql(schema, query)

  const endTimeAfterSingleRegularQuery: any = new Date()
  const endTime: any = new Date()

  
  console.log(
    `single "introspection" query duration after loop: ${(endTimeAfterSingleQuery - startTimeAfterSingleQuery
      ) /
      1000}`,
  )

  console.log(
    `single "regular" query duration after loop: ${(endTimeAfterSingleRegularQuery - startTimeAfterSingleRegularQuery) /
      1000}`,
  )
  console.log(`duration total (with loop): ${(endTime - startTime) / 1000}`)
  

  console.log("\n Note: ")
  console.log('The more times you applyMiddleware and do the introspection query, the longer it takes for later queries to run');
  t.pass();
})

