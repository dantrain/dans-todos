/**
 * @generated SignedSource<<53d8f3cab687ed46e8fd0789a5ed46fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ToggleAllSetAllCompletedMutation$variables = {
  completed?: boolean | null;
};
export type ToggleAllSetAllCompletedMutationVariables = ToggleAllSetAllCompletedMutation$variables;
export type ToggleAllSetAllCompletedMutation$data = {
  readonly updateManyTodo: {
    readonly count: number;
  };
};
export type ToggleAllSetAllCompletedMutationResponse = ToggleAllSetAllCompletedMutation$data;
export type ToggleAllSetAllCompletedMutation = {
  variables: ToggleAllSetAllCompletedMutationVariables;
  response: ToggleAllSetAllCompletedMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "completed"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "set",
                "variableName": "completed"
              }
            ],
            "kind": "ObjectValue",
            "name": "completed"
          }
        ],
        "kind": "ObjectValue",
        "name": "data"
      }
    ],
    "concreteType": "AffectedRowsOutput",
    "kind": "LinkedField",
    "name": "updateManyTodo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "count",
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
    "name": "ToggleAllSetAllCompletedMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ToggleAllSetAllCompletedMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "15ee70fcef550387b9d4cdbdcf55e050",
    "id": null,
    "metadata": {},
    "name": "ToggleAllSetAllCompletedMutation",
    "operationKind": "mutation",
    "text": "mutation ToggleAllSetAllCompletedMutation(\n  $completed: Boolean\n) {\n  updateManyTodo(data: {completed: {set: $completed}}) {\n    count\n  }\n}\n"
  }
};
})();

(node as any).hash = "402adcbe9a31eebcaff01829ddf84a2e";

export default node;
