import { connectionPlugin, makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import * as schemaTypes from './schemaTypes';

const schema = makeSchema({
  types: Object.values(schemaTypes),
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      // See https://github.com/graphql-nexus/nexus-plugin-prisma/issues/531
      outputs: {
        typegen: __dirname + '/__generated__/typegen-nexus-plugin-prisma.d.ts',
      },
    }),
    connectionPlugin(),
  ],
  outputs: {
    schema: __dirname + '/__generated__/schema.graphql',
    typegen: __dirname + '/__generated__/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      { source: '@prisma/client', alias: 'prisma' },
      { source: require.resolve('./context'), alias: 'Context' },
    ],
  },
});

export default schema;
