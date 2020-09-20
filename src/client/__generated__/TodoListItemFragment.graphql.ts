/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoListItemFragment = {
    readonly text: string;
    readonly completed: boolean;
    readonly " $refType": "TodoListItemFragment";
};
export type TodoListItemFragment$data = TodoListItemFragment;
export type TodoListItemFragment$key = {
    readonly " $data"?: TodoListItemFragment$data;
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
(node as any).hash = 'b08affb3b83a76f67c4f8075be6d47b5';
export default node;
