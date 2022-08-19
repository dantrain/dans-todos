/**
 * @generated SignedSource<<86682ca9e91f2d7f270590913d3de890>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TodoListItemSetCompletedMutation$variables = {
  completed?: boolean | null;
  id: string;
};
export type TodoListItemSetCompletedMutation$data = {
  readonly updateOneTodo: {
    readonly completed: boolean;
  };
};
export type TodoListItemSetCompletedMutation = {
  response: TodoListItemSetCompletedMutation$data;
  variables: TodoListItemSetCompletedMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "completed"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "completed",
    "variableName": "completed"
  },
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completed",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListItemSetCompletedMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "updateOneTodo",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "TodoListItemSetCompletedMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "updateOneTodo",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "481fc64bf607c4a850893019b16aacac",
    "id": null,
    "metadata": {},
    "name": "TodoListItemSetCompletedMutation",
    "operationKind": "mutation",
    "text": "mutation TodoListItemSetCompletedMutation(\n  $id: ID!\n  $completed: Boolean\n) {\n  updateOneTodo(id: $id, completed: $completed) {\n    completed\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9effb6ce37ea681c634dc513371c7ddd";

export default node;
