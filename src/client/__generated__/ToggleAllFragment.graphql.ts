/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type ToggleAllFragment = {
  readonly totalCount: number | null;
  readonly completedCount: number | null;
  readonly ' $refType': 'ToggleAllFragment';
};
export type ToggleAllFragment$data = ToggleAllFragment;
export type ToggleAllFragment$key = {
  readonly ' $data'?: ToggleAllFragment$data;
  readonly ' $fragmentRefs': FragmentRefs<'ToggleAllFragment'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'ToggleAllFragment',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'completedCount',
      storageKey: null,
    },
  ],
  type: 'UserTodos_Connection',
  abstractKey: null,
};
(node as any).hash = '8301d3b6880c99413d40be16675e547e';
export default node;
