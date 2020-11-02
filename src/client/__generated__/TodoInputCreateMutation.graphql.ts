/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TodoInputCreateMutationVariables = {
  text: string;
};
export type TodoInputCreateMutationResponse = {
  readonly createOneTodo: {
    readonly id: string | null;
    readonly text: string;
    readonly completed: boolean;
  };
};
export type TodoInputCreateMutation = {
  readonly response: TodoInputCreateMutationResponse;
  readonly variables: TodoInputCreateMutationVariables;
};

/*
mutation TodoInputCreateMutation(
  $text: String!
) {
  createOneTodo(data: {text: $text, completed: false}) {
    id
    text
    completed
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'text',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            fields: [
              {
                kind: 'Literal',
                name: 'completed',
                value: false,
              },
              {
                kind: 'Variable',
                name: 'text',
                variableName: 'text',
              },
            ],
            kind: 'ObjectValue',
            name: 'data',
          },
        ],
        concreteType: 'Todo',
        kind: 'LinkedField',
        name: 'createOneTodo',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'id',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'text',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'completed',
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'TodoInputCreateMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'TodoInputCreateMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: 'd735baf0a180acedf575c713b84ddeb4',
      id: null,
      metadata: {},
      name: 'TodoInputCreateMutation',
      operationKind: 'mutation',
      text:
        'mutation TodoInputCreateMutation(\n  $text: String!\n) {\n  createOneTodo(data: {text: $text, completed: false}) {\n    id\n    text\n    completed\n  }\n}\n',
    },
  };
})();
(node as any).hash = '2117664640611a2c9de21e64142bb419';
export default node;
