/**
 * @generated SignedSource<<29ac0c537dc0bfc083ff167f1f0fadb5>>
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
export type TodoInputCreateMutation$data = {
  readonly createOneTodo: {
    readonly completed: boolean;
    readonly id: string;
    readonly text: string;
  };
};
export type TodoInputCreateMutation = {
  response: TodoInputCreateMutation$data;
  variables: TodoInputCreateMutation$variables;
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
        "kind": "Variable",
        "name": "text",
        "variableName": "text"
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
    "cacheID": "7349dd3f4558285ade9d1d4b881865ab",
    "id": null,
    "metadata": {},
    "name": "TodoInputCreateMutation",
    "operationKind": "mutation",
    "text": "mutation TodoInputCreateMutation(\n  $text: String!\n) {\n  createOneTodo(text: $text) {\n    id\n    text\n    completed\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b24da9167ba68fc3fd216dd54f18d47";

export default node;
