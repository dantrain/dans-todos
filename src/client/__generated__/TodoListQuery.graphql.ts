/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TodoListQueryVariables = {};
export type TodoListQueryResponse = {
    readonly todos: ReadonlyArray<{
        readonly text: string;
        readonly completed: boolean;
    }>;
};
export type TodoListQuery = {
    readonly response: TodoListQueryResponse;
    readonly variables: TodoListQueryVariables;
};



/*
query TodoListQuery {
  todos(orderBy: {created_at: asc}) {
    text
    completed
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
        "name": "orderBy",
        "value": {
          "created_at": "asc"
        }
      }
    ],
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "todos",
    "plural": true,
    "selections": [
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
    "storageKey": "todos(orderBy:{\"created_at\":\"asc\"})"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TodoListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "3fcd97fca1dfc41bf337d8a04855e720",
    "id": null,
    "metadata": {},
    "name": "TodoListQuery",
    "operationKind": "query",
    "text": "query TodoListQuery {\n  todos(orderBy: {created_at: asc}) {\n    text\n    completed\n  }\n}\n"
  }
};
})();
(node as any).hash = '36ff7c67bdb45acd1651fed9c379f0fe';
export default node;
