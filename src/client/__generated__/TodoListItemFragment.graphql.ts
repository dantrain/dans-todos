/**
 * @generated SignedSource<<55d390fbfd3e4d767ec3c4a1dfe89212>>
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
  readonly ownId: number;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "TodoEditInputFragment"
    }
  ],
  "type": "Todo",
  "abstractKey": null
};

(node as any).hash = "8fd6e030afd0a50b2ad88610394b3445";

export default node;
