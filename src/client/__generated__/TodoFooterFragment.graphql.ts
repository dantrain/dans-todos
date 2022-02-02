/**
 * @generated SignedSource<<eb125d3b8c076cca62f447f415994829>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TodoFooterFragment$data = {
  readonly totalCount: number | null;
  readonly completedCount: number | null;
  readonly " $fragmentType": "TodoFooterFragment";
};
export type TodoFooterFragment = TodoFooterFragment$data;
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
  "type": "UserTodos_Connection",
  "abstractKey": null
};

(node as any).hash = "1ee372e1a406d12d0a55d63f293ea56f";

export default node;
