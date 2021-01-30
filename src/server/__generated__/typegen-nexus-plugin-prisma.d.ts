import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    first?: boolean
    last?: boolean
    before?: boolean
    after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Todo: Prisma.Todo
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'todos'
      ordering: 'id'
    }
    todos: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdat' | 'text' | 'completed' | 'userid' | 'user'
      ordering: 'id' | 'createdat' | 'text' | 'completed' | 'userid'
    }
  },
  User: {
    todos: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdat' | 'text' | 'completed' | 'userid' | 'user'
      ordering: 'id' | 'createdat' | 'text' | 'completed' | 'userid'
    }
  }
  Todo: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    todo: 'Todo'
    todos: 'Todo'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOneTodo: 'Todo'
    updateOneTodo: 'Todo'
    updateManyTodo: 'BatchPayload'
    deleteOneTodo: 'Todo'
    deleteManyTodo: 'BatchPayload'
    upsertOneTodo: 'Todo'
  },
  User: {
    id: 'String'
    todos: 'Todo'
  }
  Todo: {
    id: 'Int'
    createdat: 'DateTime'
    text: 'String'
    completed: 'Boolean'
    userid: 'String'
    user: 'User'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Todo: Typegen.NexusPrismaFields<'Todo'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  