/**
 * @generated SignedSource<<0e5d5d61f312787d814cbd53042d555a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TodoFooterFragment$data = {
  readonly completedCount: number;
  readonly totalCount: number;
  readonly " $fragmentType": "TodoFooterFragment";
};
export type TodoFooterFragment$key = {
  readonly " $data"?: TodoFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TodoFooterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoFooterFragment",
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

(node as any).hash = "77d4ccf7709b707efa10fbc33b0a8b14";

export default node;
