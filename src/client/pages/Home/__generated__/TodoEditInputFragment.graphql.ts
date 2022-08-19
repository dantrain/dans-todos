/**
 * @generated SignedSource<<a43d31dc8c4794897caba23317c531c3>>
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

(node as any).hash = "fc85bf6f93f73aaca7ccfc75b80a17c0";

export default node;
