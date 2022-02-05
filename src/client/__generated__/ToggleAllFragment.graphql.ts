/**
 * @generated SignedSource<<5ca5d3e5f44f107f1f112ea9b53005c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ToggleAllFragment$data = {
  readonly totalCount: number;
  readonly completedCount: number;
  readonly " $fragmentType": "ToggleAllFragment";
};
export type ToggleAllFragment = ToggleAllFragment$data;
export type ToggleAllFragment$key = {
  readonly " $data"?: ToggleAllFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ToggleAllFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ToggleAllFragment",
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
      "kind": "ScalarField",
      "name": "completedCount",
      "storageKey": null
    }
  ],
  "type": "UserTodos_Connection",
  "abstractKey": null
};

(node as any).hash = "8301d3b6880c99413d40be16675e547e";

export default node;
