/**
 * @generated SignedSource<<af90e751af428d5a58aa05f52c99ffdf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TodoListItemDeleteMutation$variables = {
  id?: number | null;
};
export type TodoListItemDeleteMutationVariables = TodoListItemDeleteMutation$variables;
export type TodoListItemDeleteMutation$data = {
  readonly deleteOneTodo: {
    readonly id: string | null;
  } | null;
};
export type TodoListItemDeleteMutationResponse = TodoListItemDeleteMutation$data;
export type TodoListItemDeleteMutation = {
  variables: TodoListItemDeleteMutationVariables;
  response: TodoListItemDeleteMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
            "variableName": "id"
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
    "cacheID": "7ef985c882afc60debffa29a961e9ce5",
    "id": null,
    "metadata": {},
    "name": "TodoListItemDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation TodoListItemDeleteMutation(\n  $id: Int\n) {\n  deleteOneTodo(where: {id: $id}) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2db35513e6dedb68b1376ba5926a3701";

export default node;
