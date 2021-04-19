/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ClearCompletedMutationVariables = {};
export type ClearCompletedMutationResponse = {
    readonly deleteManyTodo: {
        readonly count: number;
    };
};
export type ClearCompletedMutation = {
    readonly response: ClearCompletedMutationResponse;
    readonly variables: ClearCompletedMutationVariables;
};



/*
mutation ClearCompletedMutation {
  deleteManyTodo(where: {completed: {equals: true}}) {
    count
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "where",
        "value": {
          "completed": {
            "equals": true
          }
        }
      }
    ],
    "concreteType": "AffectedRowsOutput",
    "kind": "LinkedField",
    "name": "deleteManyTodo",
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
    "storageKey": "deleteManyTodo(where:{\"completed\":{\"equals\":true}})"
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
    "cacheID": "334cd2448ad11ab1bd741e707c43e25d",
    "id": null,
    "metadata": {},
    "name": "ClearCompletedMutation",
    "operationKind": "mutation",
    "text": "mutation ClearCompletedMutation {\n  deleteManyTodo(where: {completed: {equals: true}}) {\n    count\n  }\n}\n"
  }
};
})();
(node as any).hash = '44c8515860f8e4c2e496bc311573e5cd';
export default node;
