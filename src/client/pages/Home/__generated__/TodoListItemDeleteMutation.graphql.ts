/**
 * @generated SignedSource<<2f36fb44c0c44c6110e0c15c1522db54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TodoListItemDeleteMutation$variables = {
  id: string;
};
export type TodoListItemDeleteMutation$data = {
  readonly deleteOneTodo: {
    readonly id: string;
  };
};
export type TodoListItemDeleteMutation = {
  response: TodoListItemDeleteMutation$data;
  variables: TodoListItemDeleteMutation$variables;
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
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
    "cacheID": "78c845ecab926888062bcb1db71c708d",
    "id": null,
    "metadata": {},
    "name": "TodoListItemDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation TodoListItemDeleteMutation(\n  $id: ID!\n) {\n  deleteOneTodo(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a37924075160da57b336fa969662ca89";

export default node;
