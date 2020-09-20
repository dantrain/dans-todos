/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoListQueryVariables = {};
export type TodoListQueryResponse = {
    readonly todos: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"TodoListItemFragment">;
    }>;
    readonly todosLeftCount: number;
};
export type TodoListQuery = {
    readonly response: TodoListQueryResponse;
    readonly variables: TodoListQueryVariables;
};



/*
query TodoListQuery {
  todos(orderBy: {created_at: asc}) {
    id
    ...TodoListItemFragment
  }
  todosLeftCount
}

fragment TodoListItemFragment on Todo {
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
  "name": "todosLeftCount",
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TodoListItemFragment"
          }
        ],
        "storageKey": "todos(orderBy:{\"created_at\":\"asc\"})"
      },
      (v2/*: any*/)
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
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "f3d56aeaea1863a96a76e859ec4904ea",
    "id": null,
    "metadata": {},
    "name": "TodoListQuery",
    "operationKind": "query",
    "text": "query TodoListQuery {\n  todos(orderBy: {created_at: asc}) {\n    id\n    ...TodoListItemFragment\n  }\n  todosLeftCount\n}\n\nfragment TodoListItemFragment on Todo {\n  text\n  completed\n}\n"
  }
};
})();
(node as any).hash = 'c5dc7af0490d4767cbe70eacc59ccc64';
export default node;
