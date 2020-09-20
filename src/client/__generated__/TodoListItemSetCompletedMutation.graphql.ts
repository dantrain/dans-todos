/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TodoListItemSetCompletedMutationVariables = {
    todoId?: number | null;
    completed?: boolean | null;
};
export type TodoListItemSetCompletedMutationResponse = {
    readonly updateOneTodo: {
        readonly completed: boolean;
    } | null;
};
export type TodoListItemSetCompletedMutation = {
    readonly response: TodoListItemSetCompletedMutationResponse;
    readonly variables: TodoListItemSetCompletedMutationVariables;
};



/*
mutation TodoListItemSetCompletedMutation(
  $todoId: Int
  $completed: Boolean
) {
  updateOneTodo(where: {id: $todoId}, data: {completed: {set: $completed}}) {
    completed
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "completed"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "todoId"
},
v2 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "set",
            "variableName": "completed"
          }
        ],
        "kind": "ObjectValue",
        "name": "completed"
      }
    ],
    "kind": "ObjectValue",
    "name": "data"
  },
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "todoId"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completed",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListItemSetCompletedMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "updateOneTodo",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "TodoListItemSetCompletedMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "updateOneTodo",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d8088fdea1602838cd704ddf52b1a3bd",
    "id": null,
    "metadata": {},
    "name": "TodoListItemSetCompletedMutation",
    "operationKind": "mutation",
    "text": "mutation TodoListItemSetCompletedMutation(\n  $todoId: Int\n  $completed: Boolean\n) {\n  updateOneTodo(where: {id: $todoId}, data: {completed: {set: $completed}}) {\n    completed\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '2a7d5598b29d0e8c6003a43f6d8290dc';
export default node;
