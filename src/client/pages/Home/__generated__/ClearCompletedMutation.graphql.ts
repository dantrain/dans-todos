/**
 * @generated SignedSource<<b6857f1fdc0869e64af19866f4040fac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ClearCompletedMutation$variables = {};
export type ClearCompletedMutation$data = {
  readonly deleteManyCompletedTodo: {
    readonly count: number;
  };
};
export type ClearCompletedMutation = {
  response: ClearCompletedMutation$data;
  variables: ClearCompletedMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AffectedRowsOutput",
    "kind": "LinkedField",
    "name": "deleteManyCompletedTodo",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ClearCompletedMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ClearCompletedMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "4e2ad29e9fd175450c2673261a4e9ee1",
    "id": null,
    "metadata": {},
    "name": "ClearCompletedMutation",
    "operationKind": "mutation",
    "text": "mutation ClearCompletedMutation {\n  deleteManyCompletedTodo {\n    count\n  }\n}\n"
  }
};
})();

(node as any).hash = "71aa69e160554fafd37bcafae5eae372";

export default node;
