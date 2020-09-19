/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TodoListQueryVariables = {};
export type TodoListQueryResponse = {
    readonly todos: ReadonlyArray<{
        readonly id: string;
        readonly text: string;
        readonly completed: boolean;
    }>;
    readonly incomplete: ReadonlyArray<{
        readonly id: string;
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
    text
    completed
  }
  incomplete: todos(where: {completed: {equals: false}}) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
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
      (v0/*: any*/),
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
  {
    "alias": "incomplete",
    "args": [
      {
        "kind": "Literal",
        "name": "where",
        "value": {
          "completed": {
            "equals": false
          }
        }
      }
    ],
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "todos",
    "plural": true,
    "selections": [
      (v0/*: any*/)
    ],
    "storageKey": "todos(where:{\"completed\":{\"equals\":false}})"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TodoListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7208d9cb81df4ba69408fc614c14950a",
    "id": null,
    "metadata": {},
    "name": "TodoListQuery",
    "operationKind": "query",
    "text": "query TodoListQuery {\n  todos(orderBy: {created_at: asc}) {\n    id\n    text\n    completed\n  }\n  incomplete: todos(where: {completed: {equals: false}}) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f2aa0cfbba0ed8be830a7e24beb0d6c4';
export default node;
