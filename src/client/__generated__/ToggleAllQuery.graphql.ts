/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ToggleAllQueryVariables = {};
export type ToggleAllQueryResponse = {
    readonly todos: {
        readonly totalCount: number;
        readonly completedCount: number;
    };
};
export type ToggleAllQuery = {
    readonly response: ToggleAllQueryResponse;
    readonly variables: ToggleAllQueryVariables;
};



/*
query ToggleAllQuery {
  todos(first: 50) {
    totalCount
    completedCount
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
        "name": "first",
        "value": 50
      }
    ],
    "concreteType": "QueryTodos_Connection",
    "kind": "LinkedField",
    "name": "todos",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "completedCount",
        "storageKey": null
      }
    ],
    "storageKey": "todos(first:50)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ToggleAllQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ToggleAllQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a6f380731d50381d13963d325f9b5e22",
    "id": null,
    "metadata": {},
    "name": "ToggleAllQuery",
    "operationKind": "query",
    "text": "query ToggleAllQuery {\n  todos(first: 50) {\n    totalCount\n    completedCount\n  }\n}\n"
  }
};
})();
(node as any).hash = '6e75fb5e226191a5c19159a02f5c4f61';
export default node;
