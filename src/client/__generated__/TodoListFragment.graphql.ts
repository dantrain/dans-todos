/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoListFragment = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string | null;
            readonly " $fragmentRefs": FragmentRefs<"TodoListItemFragment">;
        } | null;
    } | null> | null;
    readonly " $refType": "TodoListFragment";
};
export type TodoListFragment$data = TodoListFragment;
export type TodoListFragment$key = {
    readonly " $data"?: TodoListFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"TodoListFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListFragment",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "TodoListItemFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UserTodos_Connection",
  "abstractKey": null
};
(node as any).hash = '5c2e6378364e1d73316ec60f8ded6851';
export default node;
