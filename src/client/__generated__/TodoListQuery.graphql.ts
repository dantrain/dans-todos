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
    readonly todos: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly completed: boolean;
                readonly " $fragmentRefs": FragmentRefs<"TodoListItemFragment">;
            };
        } | null> | null;
        readonly totalCount: number;
        readonly completedCount: number;
    };
};
export type TodoListQuery = {
    readonly response: TodoListQueryResponse;
    readonly variables: TodoListQueryVariables;
};



/*
query TodoListQuery(
  $filter: Filter
) {
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
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
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
  (v1/*: any*/),
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
        "alias": "todos",
        "args": [
          (v1/*: any*/)
        ],
        "concreteType": "QueryTodos_Connection",
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
                  (v2/*: any*/),
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
        "args": (v9/*: any*/),
        "concreteType": "QueryTodos_Connection",
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
                  (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "fb5eae447e6266fa605be379f8edc557",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "todos"
          ]
        }
      ]
    },
    "name": "TodoListQuery",
    "operationKind": "query",
    "text": "query TodoListQuery(\n  $filter: Filter\n) {\n  todos(first: 50, filter: $filter) {\n    edges {\n      node {\n        id\n        completed\n        ...TodoListItemFragment\n        __typename\n      }\n      cursor\n    }\n    totalCount\n    completedCount\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TodoListItemFragment on Todo {\n  id\n  text\n  completed\n}\n"
  }
};
})();
(node as any).hash = 'dffa45eeb915acc30a912a3b80a6ac73';
export default node;
