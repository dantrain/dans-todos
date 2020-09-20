/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TodoListItemDeleteMutationVariables = {
    todoId?: number | null;
};
export type TodoListItemDeleteMutationResponse = {
    readonly deleteOneTodo: {
        readonly id: string;
    } | null;
};
export type TodoListItemDeleteMutation = {
    readonly response: TodoListItemDeleteMutationResponse;
    readonly variables: TodoListItemDeleteMutationVariables;
};



/*
mutation TodoListItemDeleteMutation(
  $todoId: Int
) {
  deleteOneTodo(where: {id: $todoId}) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "todoId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "todoId"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "deleteOneTodo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListItemDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoListItemDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "45c56709caa2570ccfe49217f3a5cb4b",
    "id": null,
    "metadata": {},
    "name": "TodoListItemDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation TodoListItemDeleteMutation(\n  $todoId: Int\n) {\n  deleteOneTodo(where: {id: $todoId}) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '2645a455cd982605660e98cb19c07441';
export default node;
