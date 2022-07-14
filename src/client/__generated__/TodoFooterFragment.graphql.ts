/**
 * @generated SignedSource<<4f5fa1de8281fa5963e8d0d18a54b341>>
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
  "type": "UserTodos_Connection",
  "abstractKey": null
};

(node as any).hash = "1ee372e1a406d12d0a55d63f293ea56f";

export default node;
