/**
 * @generated SignedSource<<7e7fa4ab19c4bb7526d2a0f05a534e1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TodoEditInputEditMutation$variables = {
  id: string;
  text: string;
};
export type TodoEditInputEditMutation$data = {
  readonly updateOneTodo: {
    readonly text: string;
  };
};
export type TodoEditInputEditMutation = {
  response: TodoEditInputEditMutation$data;
  variables: TodoEditInputEditMutation$variables;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "text",
    "variableName": "text"
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
    "cacheID": "1f9683f8874fa98e9ee72206c74a22db",
    "id": null,
    "metadata": {},
    "name": "TodoEditInputEditMutation",
    "operationKind": "mutation",
    "text": "mutation TodoEditInputEditMutation(\n  $id: ID!\n  $text: String!\n) {\n  updateOneTodo(id: $id, text: $text) {\n    text\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ba2ba7a1f84527e59cf1b5b3d0be1dff";

export default node;
