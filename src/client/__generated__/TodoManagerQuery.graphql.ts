/**
 * @generated SignedSource<<dd1ca05c958f9a7bfea0db88bd53aae2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Filter = "ACTIVE" | "ALL" | "COMPLETED" | "%future added value";
export type TodoManagerQuery$variables = {
  filter?: Filter | null;
};
export type TodoManagerQueryVariables = TodoManagerQuery$variables;
export type TodoManagerQuery$data = {
  readonly viewer: {
    readonly id: string | null;
    readonly todos: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string | null;
          readonly " $fragmentSpreads": FragmentRefs<"TodoListItemFragment">;
        } | null;
      } | null> | null;
      readonly " $fragmentSpreads": FragmentRefs<"ToggleAllFragment" | "TodoFooterFragment">;
    } | null;
  } | null;
};
export type TodoManagerQueryResponse = TodoManagerQuery$data;
export type TodoManagerQuery = {
  variables: TodoManagerQueryVariables;
  response: TodoManagerQuery$data;
};

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
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
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
v6 = [
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
    "name": "TodoManagerQuery",
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
            "name": "__TodoManagerQuery_todos_connection",
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
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "TodoListItemFragment"
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ToggleAllFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "TodoFooterFragment"
              },
              (v5/*: any*/)
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
    "name": "TodoManagerQuery",
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
            "args": (v6/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "ownId",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "completed",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "text",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
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
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": [
              "filter"
            ],
            "handle": "connection",
            "key": "TodoManagerQuery_todos",
            "kind": "LinkedHandle",
            "name": "todos"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c6d81aba9fb5bed211a82eff7de18b6a",
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
    "name": "TodoManagerQuery",
    "operationKind": "query",
    "text": "query TodoManagerQuery(\n  $filter: Filter\n) {\n  viewer {\n    id\n    todos(first: 50, filter: $filter) {\n      edges {\n        node {\n          id\n          ...TodoListItemFragment\n          __typename\n        }\n        cursor\n      }\n      ...ToggleAllFragment\n      ...TodoFooterFragment\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment TodoEditInputFragment on Todo {\n  id\n  ownId\n  text\n  completed\n}\n\nfragment TodoFooterFragment on UserTodos_Connection {\n  totalCount\n  completedCount\n}\n\nfragment TodoListItemFragment on Todo {\n  id\n  ownId\n  completed\n  ...TodoEditInputFragment\n}\n\nfragment ToggleAllFragment on UserTodos_Connection {\n  totalCount\n  completedCount\n}\n"
  }
};
})();

(node as any).hash = "bdd9b0d0207391e53df55e537333d675";

export default node;
