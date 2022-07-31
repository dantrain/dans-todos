/**
 * @generated SignedSource<<abc0e396badd064c0e52ded50e24adc8>>
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
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
            (v0/*: any*/),
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelayTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelayTestQuery",
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
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "236e67ca69813cd4aee09315894b15a1",
    "id": null,
    "metadata": {},
    "name": "RelayTestQuery",
    "operationKind": "query",
    "text": "query RelayTestQuery {\n  viewer {\n    todos {\n      totalCount\n      edges {\n        node {\n          id\n          text\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ed3e98c322bd7508cf69875196217749";

export default node;
