/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoListItemFragment = {
    readonly id: string | null;
    readonly ownId: number;
    readonly completed: boolean;
    readonly " $fragmentRefs": FragmentRefs<"TodoEditInputFragment">;
    readonly " $refType": "TodoListItemFragment";
};
export type TodoListItemFragment$data = TodoListItemFragment;
export type TodoListItemFragment$key = {
    readonly " $data"?: TodoListItemFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"TodoListItemFragment">;
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
(node as any).hash = '8fd6e030afd0a50b2ad88610394b3445';
export default node;
