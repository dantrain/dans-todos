/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type TodoListItemFragment = {
  readonly id: string | null;
  readonly text: string;
  readonly completed: boolean;
  readonly ' $refType': 'TodoListItemFragment';
};
export type TodoListItemFragment$data = TodoListItemFragment;
export type TodoListItemFragment$key = {
  readonly ' $data'?: TodoListItemFragment$data;
  readonly ' $fragmentRefs': FragmentRefs<'TodoListItemFragment'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'TodoListItemFragment',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'text',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'completed',
      storageKey: null,
    },
  ],
  type: 'Todo',
  abstractKey: null,
};
(node as any).hash = 'cc4b4d879b126e1f72a1d55c506eb860';
export default node;
