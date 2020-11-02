/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TodoListItemSetCompletedMutationVariables = {
  id?: number | null;
  completed?: boolean | null;
};
export type TodoListItemSetCompletedMutationResponse = {
  readonly updateOneTodo: {
    readonly completed: boolean;
  } | null;
};
export type TodoListItemSetCompletedMutation = {
  readonly response: TodoListItemSetCompletedMutationResponse;
  readonly variables: TodoListItemSetCompletedMutationVariables;
};

/*
mutation TodoListItemSetCompletedMutation(
  $id: Int
  $completed: Boolean
) {
  updateOneTodo(where: {id: $id}, data: {completed: {set: $completed}}) {
    completed
    id
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'completed',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'id',
    },
    v2 = [
      {
        fields: [
          {
            fields: [
              {
                kind: 'Variable',
                name: 'set',
                variableName: 'completed',
              },
            ],
            kind: 'ObjectValue',
            name: 'completed',
          },
        ],
        kind: 'ObjectValue',
        name: 'data',
      },
      {
        fields: [
          {
            kind: 'Variable',
            name: 'id',
            variableName: 'id',
          },
        ],
        kind: 'ObjectValue',
        name: 'where',
      },
    ],
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'completed',
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'TodoListItemSetCompletedMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'Todo',
          kind: 'LinkedField',
          name: 'updateOneTodo',
          plural: false,
          selections: [v3 /*: any*/],
          storageKey: null,
        },
      ],
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'TodoListItemSetCompletedMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'Todo',
          kind: 'LinkedField',
          name: 'updateOneTodo',
          plural: false,
          selections: [
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'id',
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '1fcb603ad9be16ff35f01906a70123de',
      id: null,
      metadata: {},
      name: 'TodoListItemSetCompletedMutation',
      operationKind: 'mutation',
      text:
        'mutation TodoListItemSetCompletedMutation(\n  $id: Int\n  $completed: Boolean\n) {\n  updateOneTodo(where: {id: $id}, data: {completed: {set: $completed}}) {\n    completed\n    id\n  }\n}\n',
    },
  };
})();
(node as any).hash = '312bab163ffa6f2a2f20161a723a6b40';
export default node;
