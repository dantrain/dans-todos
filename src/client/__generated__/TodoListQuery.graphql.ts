/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Filter = "ACTIVE" | "ALL" | "COMPLETED" | "%future added value";
export type TodoListQueryVariables = {
    filter?: Filter | null;
};
export type TodoListQueryResponse = {
    readonly viewer: {
        readonly id: string | null;
        readonly todos: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string | null;
                    readonly completed: boolean;
                    readonly " $fragmentRefs": FragmentRefs<"TodoListItemFragment">;
                } | null;
            } | null> | null;
            readonly totalCount: number | null;
            readonly completedCount: number | null;
        } | null;
    } | null;
};
export type TodoListQuery = {
    readonly response: TodoListQueryResponse;
    readonly variables: TodoListQueryVariables;
};



/*
query TodoListQuery(
  $filter: Filter
) {
  viewer {
    id
    todos(first: 50, filter: $filter) {
      edges {
        node {
          id
          completed
          ...TodoListItemFragment
          __typename
        }
        cursor
      }
      totalCount
      completedCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}

fragment TodoListItemFragment on Todo {
  id
  text
  completed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filter"
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
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completed",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completedCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": "todos",
            "args": [
              (v2/*: any*/)
            ],
            "concreteType": "UserTodos_Connection",
            "kind": "LinkedField",
            "name": "__TodoList_todos_connection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TodoEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Todo",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "TodoListItemFragment"
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": (v9/*: any*/),
            "concreteType": "UserTodos_Connection",
            "kind": "LinkedField",
            "name": "todos",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TodoEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Todo",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "text",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v9/*: any*/),
            "filters": [
              "filter"
            ],
            "handle": "connection",
            "key": "TodoList_todos",
            "kind": "LinkedHandle",
            "name": "todos"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "44fe2e7cd12237c8d7eb6d96c6c1136f",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "viewer",
            "todos"
          ]
        }
      ]
    },
    "name": "TodoListQuery",
    "operationKind": "query",
    "text": "query TodoListQuery(\n  $filter: Filter\n) {\n  viewer {\n    id\n    todos(first: 50, filter: $filter) {\n      edges {\n        node {\n          id\n          completed\n          ...TodoListItemFragment\n          __typename\n        }\n        cursor\n      }\n      totalCount\n      completedCount\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment TodoListItemFragment on Todo {\n  id\n  text\n  completed\n}\n"
  }
};
})();
(node as any).hash = '8a78aee6c85dad5f776c1c2a57e3c2b7';
export default node;
