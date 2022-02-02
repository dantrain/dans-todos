/**
 * @generated SignedSource<<79fcd971229dad9e5b27ee18af1b7a85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TodoInputCreateMutation$variables = {
  text: string;
};
export type TodoInputCreateMutationVariables = TodoInputCreateMutation$variables;
export type TodoInputCreateMutation$data = {
  readonly createOneTodo: {
    readonly id: string | null;
    readonly ownId: number;
    readonly text: string;
    readonly completed: boolean;
  };
};
export type TodoInputCreateMutationResponse = TodoInputCreateMutation$data;
export type TodoInputCreateMutation = {
  variables: TodoInputCreateMutationVariables;
  response: TodoInputCreateMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "text"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Literal",
            "name": "completed",
            "value": false
          },
          {
            "kind": "Variable",
            "name": "text",
            "variableName": "text"
          }
        ],
        "kind": "ObjectValue",
        "name": "data"
      }
    ],
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "createOneTodo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ownId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "completed",
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
    "name": "TodoInputCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoInputCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1da40fffbdc95e2ee48f45902bcbdc30",
    "id": null,
    "metadata": {},
    "name": "TodoInputCreateMutation",
    "operationKind": "mutation",
    "text": "mutation TodoInputCreateMutation(\n  $text: String!\n) {\n  createOneTodo(data: {text: $text, completed: false}) {\n    id\n    ownId\n    text\n    completed\n  }\n}\n"
  }
};
})();

(node as any).hash = "8e362d9d50edd4838c986f49cd0e189b";

export default node;
