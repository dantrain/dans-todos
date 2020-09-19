/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ToggleAllQueryVariables = {};
export type ToggleAllQueryResponse = {
    readonly todosCount: number;
    readonly todosLeftCount: number;
};
export type ToggleAllQuery = {
    readonly response: ToggleAllQueryResponse;
    readonly variables: ToggleAllQueryVariables;
};



/*
query ToggleAllQuery {
  todosCount
  todosLeftCount
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "todosCount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "todosLeftCount",
    "storageKey": null
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
    "cacheID": "d2786b99afb649aea02925b3fcbea94f",
    "id": null,
    "metadata": {},
    "name": "ToggleAllQuery",
    "operationKind": "query",
    "text": "query ToggleAllQuery {\n  todosCount\n  todosLeftCount\n}\n"
  }
};
})();
(node as any).hash = 'c274d6b9c8d74ddc0148cfac71988917';
export default node;
