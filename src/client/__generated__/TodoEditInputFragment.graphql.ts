/**
 * @generated SignedSource<<6ec495e6f9af7551d3fc9090827e355f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TodoEditInputFragment$data = {
  readonly completed: boolean;
  readonly id: string;
  readonly ownId: number;
  readonly text: string;
  readonly " $fragmentType": "TodoEditInputFragment";
};
export type TodoEditInputFragment$key = {
  readonly " $data"?: TodoEditInputFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TodoEditInputFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoEditInputFragment",
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
      "name": "text",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completed",
      "storageKey": null
    }
  ],
  "type": "Todo",
  "abstractKey": null
};

(node as any).hash = "bd15f9bd712042d4745dc32a9de084e7";

export default node;
