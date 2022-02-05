import { connectionPlugin, makeSchema } from 'nexus';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import path from 'path';
import * as schemaTypes from './schemaTypes';

const schema = makeSchema({
  types: Object.values(schemaTypes),
  nonNullDefaults: { output: true },
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      // See https://github.com/graphql-nexus/nexus-plugin-prisma/issues/531
      outputs: {
        typegen: path.join(
          __dirname,
          '/__generated__/typegen-nexus-plugin-prisma.d.ts'
        ),
      },
    }),
    connectionPlugin(),
  ],
  outputs: {
    schema: path.join(__dirname, '/__generated__/schema.graphql'),
    typegen: path.join(__dirname, '/__generated__/nexus.ts'),
  },
  contextType: {
    module: path.join(process.cwd(), './src/server/context.ts'),
    export: 'Context',
  },
});

export default schema;
