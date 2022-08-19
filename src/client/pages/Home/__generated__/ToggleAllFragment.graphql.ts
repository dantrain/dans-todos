/**
 * @generated SignedSource<<1bd5e94b968cf50695bed250ed898bb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ToggleAllFragment$data = {
  readonly completedCount: number;
  readonly totalCount: number;
  readonly " $fragmentType": "ToggleAllFragment";
};
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
  "type": "UserTodosConnection",
  "abstractKey": null
};

(node as any).hash = "ed90bf9bc871019f8bcb8a2e351f5765";

export default node;
