/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoListQueryVariables = {};
export type TodoListQueryResponse = {
    readonly todos: ReadonlyArray<{
        readonly id: string;
        readonly completed: boolean;
        readonly " $fragmentRefs": FragmentRefs<"TodoListItemFragment">;
    }>;
};
export type TodoListQuery = {
    readonly response: TodoListQueryResponse;
    readonly variables: TodoListQueryVariables;
};



/*
query TodoListQuery {
  todos(orderBy: {created_at: asc}) {
    id
    completed
    ...TodoListItemFragment
  }
}

fragment TodoListItemFragment on Todo {
  id
  todoId
  text
  completed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "created_at": "asc"
    }
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completed",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "todos",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TodoListItemFragment"
          }
        ],
        "storageKey": "todos(orderBy:{\"created_at\":\"asc\"})"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TodoListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "todos",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "todoId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
            "storageKey": null
          }
        ],
        "storageKey": "todos(orderBy:{\"created_at\":\"asc\"})"
      }
    ]
  },
  "params": {
    "cacheID": "8240fdec70ca063b24bdcc04b8fdecf7",
    "id": null,
    "metadata": {},
    "name": "TodoListQuery",
    "operationKind": "query",
    "text": "query TodoListQuery {\n  todos(orderBy: {created_at: asc}) {\n    id\n    completed\n    ...TodoListItemFragment\n  }\n}\n\nfragment TodoListItemFragment on Todo {\n  id\n  todoId\n  text\n  completed\n}\n"
  }
};
})();
(node as any).hash = 'd52d1634d63fcfdf4235f53f25fa8ffd';
export default node;
