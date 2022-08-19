/**
 * @generated SignedSource<<816f13aaa87f4b4673691245c9b5911b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TodoListItemFragment$data = {
  readonly completed: boolean;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"TodoEditInputFragment">;
  readonly " $fragmentType": "TodoListItemFragment";
};
export type TodoListItemFragment$key = {
  readonly " $data"?: TodoListItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TodoListItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListItemFragment",
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
      "name": "completed",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TodoEditInputFragment"
    }
  ],
  "type": "Todo",
  "abstractKey": null
};

(node as any).hash = "dac3a219539c6143b4e3a424303844c5";

export default node;
