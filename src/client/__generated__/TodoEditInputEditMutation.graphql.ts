/**
 * @generated SignedSource<<e3cb95c2902986d895986577c59a115b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TodoEditInputEditMutation$variables = {
  id?: number | null;
  text: string;
};
export type TodoEditInputEditMutationVariables = TodoEditInputEditMutation$variables;
export type TodoEditInputEditMutation$data = {
  readonly updateOneTodo: {
    readonly text: string;
  } | null;
};
export type TodoEditInputEditMutationResponse = TodoEditInputEditMutation$data;
export type TodoEditInputEditMutation = {
  variables: TodoEditInputEditMutationVariables;
  response: TodoEditInputEditMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "text"
  }
],
v1 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "set",
            "variableName": "text"
          }
        ],
        "kind": "ObjectValue",
        "name": "text"
      }
    ],
    "kind": "ObjectValue",
    "name": "data"
  },
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoEditInputEditMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "updateOneTodo",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoEditInputEditMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "updateOneTodo",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "cacheID": "8a733cb9ef1b74236105d1e7f2389d6b",
    "id": null,
    "metadata": {},
    "name": "TodoEditInputEditMutation",
    "operationKind": "mutation",
    "text": "mutation TodoEditInputEditMutation(\n  $id: Int\n  $text: String!\n) {\n  updateOneTodo(where: {id: $id}, data: {text: {set: $text}}) {\n    text\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0f61f5f044bf10629a9aa6f34540b5fd";

export default node;
