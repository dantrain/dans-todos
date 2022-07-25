/**
 * @generated SignedSource<<9f27fd9b2883b2c7177c61c4069eb792>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RelayTestQuery$variables = {};
export type RelayTestQuery$data = {
  readonly viewer: {
    readonly todos: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly text: string;
        };
      } | null>;
      readonly totalCount: number;
    };
  };
};
export type RelayTestQuery = {
  response: RelayTestQuery$data;
  variables: RelayTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserTodosConnection",
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
            "concreteType": "UserTodosConnectionEdge",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
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
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelayTestQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelayTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "18cd262d68ddb7bfdc29c79b9a78af41",
    "id": null,
    "metadata": {},
    "name": "RelayTestQuery",
    "operationKind": "query",
    "text": "query RelayTestQuery {\n  viewer {\n    todos {\n      totalCount\n      edges {\n        node {\n          id\n          text\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ed3e98c322bd7508cf69875196217749";

export default node;
