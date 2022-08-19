/**
 * @generated SignedSource<<5827433d4fa28c7491dcb4caafcafcf2>>
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
export type ToggleAllSetAllCompletedMutation$data = {
  readonly updateManyTodo: {
    readonly count: number;
  };
};
export type ToggleAllSetAllCompletedMutation = {
  response: ToggleAllSetAllCompletedMutation$data;
  variables: ToggleAllSetAllCompletedMutation$variables;
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
        "kind": "Variable",
        "name": "completed",
        "variableName": "completed"
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
    "cacheID": "834763ee62e88b15445310086ee847d8",
    "id": null,
    "metadata": {},
    "name": "ToggleAllSetAllCompletedMutation",
    "operationKind": "mutation",
    "text": "mutation ToggleAllSetAllCompletedMutation(\n  $completed: Boolean\n) {\n  updateManyTodo(completed: $completed) {\n    count\n  }\n}\n"
  }
};
})();

(node as any).hash = "75ab08021a1dce555d1727834b348bd4";

export default node;
