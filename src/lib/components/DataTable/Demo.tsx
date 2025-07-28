import { DataTable, IDataTableProps } from "@containers/Authorized/components/DataTable/DataTable";

const columns: IDataTableProps['columns'] = [
  {
    title: 'Timestamp',
    dataPath: 'node.observedAt'
  },
  {
    title: 'Name',
    dataPath: 'node.operationName'
  },
  {
    title: 'Latency',
    dataPath: 'node.serverProcessTime'
  },
  {
    title: 'Errors',
    dataPath: 'node.errorReasonsMap'
  },
  {
    title: 'Severity',
    dataPath: 'node.impact'
  },
  {
    title: 'Status',
    dataPath: 'node.status'
  },
  {
    title: 'Type',
    dataPath: 'node.operationType'
  },
  {
    title: 'User',
    dataPath: 'node.userId'
  },
  {
    title: 'Role',
    dataPath: 'node.roles'
  },
  {
    title: 'Depth',
    dataPath: 'node.depth'
  },
  {
    title: 'Height',
    dataPath: 'node.height'
  },
  {
    title: 'Inigo',
    dataPath: 'node.sidecarProcessTime'
  },
  {
    title: 'Objects',
    dataPath: 'node.creditCost'
  },
];

const data: IDataTableProps['data'] =  [
  {
    "node": {
      "id": 0,
      "traceID": "043a15b9-ab2b-4653-865e-2417961b374b",
      "observedAt": "2024-07-16T13:50:10.929Z",
      "status": "PASSED",
      "serverProcessTime": 47,
      "sidecarProcessTime": 4,
      "creditCost": 1,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 408000
          },
          {
            "label": "request : sanitize",
            "duration": 10000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 703000
          },
          {
            "label": "request : analyze",
            "duration": 42000
          },
          {
            "label": "request : check access",
            "duration": 2799000
          },
          {
            "label": "request : check rate limit",
            "duration": 121000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 76000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 4000
          },
          {
            "label": "server : request done",
            "duration": 47384000
          },
          {
            "label": "response : get body",
            "duration": 14000
          },
          {
            "label": "response : update ratelimit",
            "duration": 4000
          },
          {
            "label": "response : attach errors",
            "duration": 21000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "async : queue time",
            "duration": 428000
          },
          {
            "label": "async : get header details",
            "duration": 149000
          },
          {
            "label": "async : analyze response",
            "duration": 3000
          },
          {
            "label": "async : update ratelimit",
            "duration": 27000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_Logout",
      "depth": 1,
      "height": 1,
      "queryHash": "1729259954508659411",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "a6ee88b2-1c63-48fa-9cfd-b7b5bbf1d408",
      "observedAt": "2024-07-16T13:50:06.739Z",
      "status": "PASSED",
      "serverProcessTime": 28,
      "sidecarProcessTime": 4,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 215000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 3624000
          },
          {
            "label": "request : check rate limit",
            "duration": 122000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 104000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 28068000
          },
          {
            "label": "response : get body",
            "duration": 18000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 21000
          },
          {
            "label": "response : reduct extensions",
            "duration": 90000
          },
          {
            "label": "async : queue time",
            "duration": 53000
          },
          {
            "label": "async : get header details",
            "duration": 162000
          },
          {
            "label": "async : analyze response",
            "duration": 25000
          },
          {
            "label": "async : update ratelimit",
            "duration": 25000
          },
          {
            "label": "async : collect variables",
            "duration": 133000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreCoverageData",
      "depth": 5,
      "height": 14,
      "queryHash": "14362674409394913302",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "925c7010-ae7a-412b-b211-7fb0d3aacf55",
      "observedAt": "2024-07-16T13:50:06.454Z",
      "status": "PASSED",
      "serverProcessTime": 38,
      "sidecarProcessTime": 5,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 233000
          },
          {
            "label": "request : get from cache",
            "duration": 5000
          },
          {
            "label": "request : check access",
            "duration": 4718000
          },
          {
            "label": "request : check rate limit",
            "duration": 101000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 115000
          },
          {
            "label": "response : reduct extensions",
            "duration": 11000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 38868000
          },
          {
            "label": "response : get body",
            "duration": 40000
          },
          {
            "label": "response : update ratelimit",
            "duration": 4000
          },
          {
            "label": "response : attach errors",
            "duration": 75000
          },
          {
            "label": "response : reduct extensions",
            "duration": 26000
          },
          {
            "label": "async : queue time",
            "duration": 2689000
          },
          {
            "label": "async : get header details",
            "duration": 114000
          },
          {
            "label": "async : analyze response",
            "duration": 15000
          },
          {
            "label": "async : update ratelimit",
            "duration": 24000
          },
          {
            "label": "async : collect variables",
            "duration": 151000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreHistogramData",
      "depth": 5,
      "height": 10,
      "queryHash": "13135927283073985373",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e3e789a6-60c7-403b-b733-52236fe2b712",
      "observedAt": "2024-07-16T13:50:06.45Z",
      "status": "PASSED",
      "serverProcessTime": 49,
      "sidecarProcessTime": 4,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 260000
          },
          {
            "label": "request : get from cache",
            "duration": 7000
          },
          {
            "label": "request : check access",
            "duration": 4046000
          },
          {
            "label": "request : check rate limit",
            "duration": 112000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 171000
          },
          {
            "label": "response : reduct extensions",
            "duration": 37000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 49704000
          },
          {
            "label": "response : get body",
            "duration": 18000
          },
          {
            "label": "response : update ratelimit",
            "duration": 9000
          },
          {
            "label": "response : attach errors",
            "duration": 27000
          },
          {
            "label": "response : reduct extensions",
            "duration": 29000
          },
          {
            "label": "async : queue time",
            "duration": 476000
          },
          {
            "label": "async : get header details",
            "duration": 122000
          },
          {
            "label": "async : analyze response",
            "duration": 13000
          },
          {
            "label": "async : update ratelimit",
            "duration": 28000
          },
          {
            "label": "async : collect variables",
            "duration": 157000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreHistogramData",
      "depth": 5,
      "height": 10,
      "queryHash": "13135927283073985373",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "f11f4cbf-8821-420b-8d65-0da4d5d7d141",
      "observedAt": "2024-07-16T13:50:06.447Z",
      "status": "PASSED",
      "serverProcessTime": 62,
      "sidecarProcessTime": 5,
      "creditCost": 104,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 257000
          },
          {
            "label": "request : sanitize",
            "duration": 349000
          },
          {
            "label": "request : introspection check",
            "duration": 4000
          },
          {
            "label": "request : parse",
            "duration": 566000
          },
          {
            "label": "request : analyze",
            "duration": 1362000
          },
          {
            "label": "request : check access",
            "duration": 2491000
          },
          {
            "label": "request : check rate limit",
            "duration": 166000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 12000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 153000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 62016000
          },
          {
            "label": "response : get body",
            "duration": 15000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 19000
          },
          {
            "label": "response : reduct extensions",
            "duration": 15000
          },
          {
            "label": "async : queue time",
            "duration": 34000
          },
          {
            "label": "async : get header details",
            "duration": 338000
          },
          {
            "label": "async : analyze response",
            "duration": 15000
          },
          {
            "label": "async : update ratelimit",
            "duration": 18000
          },
          {
            "label": "async : collect variables",
            "duration": 114000
          },
          {
            "label": "async : post process errors",
            "duration": 29000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreImpactChartData",
      "depth": 5,
      "height": 13,
      "queryHash": "10784685797611608662",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "b28d8873-f250-4f75-a82a-ca4868f4c95a",
      "observedAt": "2024-07-16T13:50:06.427Z",
      "status": "PASSED",
      "serverProcessTime": 86,
      "sidecarProcessTime": 5,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 229000
          },
          {
            "label": "request : sanitize",
            "duration": 79000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 758000
          },
          {
            "label": "request : analyze",
            "duration": 594000
          },
          {
            "label": "request : check access",
            "duration": 3592000
          },
          {
            "label": "request : check rate limit",
            "duration": 178000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 86000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 86284000
          },
          {
            "label": "response : get body",
            "duration": 12000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 19000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "async : queue time",
            "duration": 998000
          },
          {
            "label": "async : get header details",
            "duration": 135000
          },
          {
            "label": "async : analyze response",
            "duration": 25000
          },
          {
            "label": "async : update ratelimit",
            "duration": 21000
          },
          {
            "label": "async : collect variables",
            "duration": 80000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreCoverageData",
      "depth": 5,
      "height": 14,
      "queryHash": "14362674409394913302",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "94376604-0943-4ff7-b005-90333bbff04f",
      "observedAt": "2024-07-16T13:50:06.427Z",
      "status": "PASSED",
      "serverProcessTime": 79,
      "sidecarProcessTime": 4,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 296000
          },
          {
            "label": "request : get from cache",
            "duration": 7000
          },
          {
            "label": "request : check access",
            "duration": 3309000
          },
          {
            "label": "request : check rate limit",
            "duration": 110000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 2000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 207000
          },
          {
            "label": "response : reduct extensions",
            "duration": 73000
          },
          {
            "label": "request : sent",
            "duration": 3000
          },
          {
            "label": "server : request done",
            "duration": 79729000
          },
          {
            "label": "response : get body",
            "duration": 19000
          },
          {
            "label": "response : update ratelimit",
            "duration": 22000
          },
          {
            "label": "response : attach errors",
            "duration": 26000
          },
          {
            "label": "response : reduct extensions",
            "duration": 22000
          },
          {
            "label": "async : queue time",
            "duration": 57000
          },
          {
            "label": "async : get header details",
            "duration": 153000
          },
          {
            "label": "async : analyze response",
            "duration": 41000
          },
          {
            "label": "async : update ratelimit",
            "duration": 26000
          },
          {
            "label": "async : collect variables",
            "duration": 123000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreCoverageData",
      "depth": 5,
      "height": 14,
      "queryHash": "14362674409394913302",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "3394e7a8-971e-4da6-8664-1b77e79781fd",
      "observedAt": "2024-07-16T13:50:06.119Z",
      "status": "PASSED",
      "serverProcessTime": 116,
      "sidecarProcessTime": 20,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 2257000
          },
          {
            "label": "request : get from cache",
            "duration": 3000
          },
          {
            "label": "request : check access",
            "duration": 18213000
          },
          {
            "label": "request : check rate limit",
            "duration": 77000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 88000
          },
          {
            "label": "response : reduct extensions",
            "duration": 15000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 116301000
          },
          {
            "label": "response : get body",
            "duration": 39000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 49000
          },
          {
            "label": "response : reduct extensions",
            "duration": 20000
          },
          {
            "label": "async : queue time",
            "duration": 216000
          },
          {
            "label": "async : get header details",
            "duration": 116000
          },
          {
            "label": "async : analyze response",
            "duration": 8000
          },
          {
            "label": "async : update ratelimit",
            "duration": 21000
          },
          {
            "label": "async : collect variables",
            "duration": 79000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreTreeData",
      "depth": 5,
      "height": 7,
      "queryHash": "13691964164811805425",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "1799096b-bdb9-40e9-96b9-36a6b19f6810",
      "observedAt": "2024-07-16T13:50:06.103Z",
      "status": "PASSED",
      "serverProcessTime": 119,
      "sidecarProcessTime": 7,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 150000
          },
          {
            "label": "request : sanitize",
            "duration": 73000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 541000
          },
          {
            "label": "request : analyze",
            "duration": 259000
          },
          {
            "label": "request : check access",
            "duration": 5791000
          },
          {
            "label": "request : check rate limit",
            "duration": 271000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 128000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 119808000
          },
          {
            "label": "response : get body",
            "duration": 16000
          },
          {
            "label": "response : update ratelimit",
            "duration": 9000
          },
          {
            "label": "response : attach errors",
            "duration": 25000
          },
          {
            "label": "response : reduct extensions",
            "duration": 21000
          },
          {
            "label": "async : queue time",
            "duration": 1036000
          },
          {
            "label": "async : get header details",
            "duration": 75000
          },
          {
            "label": "async : analyze response",
            "duration": 18000
          },
          {
            "label": "async : update ratelimit",
            "duration": 23000
          },
          {
            "label": "async : collect variables",
            "duration": 136000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreCoverageData",
      "depth": 5,
      "height": 14,
      "queryHash": "14362674409394913302",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "161b38f6-84dc-462b-8e08-c50cabd58c38",
      "observedAt": "2024-07-16T13:50:06.103Z",
      "status": "PASSED",
      "serverProcessTime": 104,
      "sidecarProcessTime": 11,
      "creditCost": 104,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 225000
          },
          {
            "label": "request : sanitize",
            "duration": 78000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 540000
          },
          {
            "label": "request : analyze",
            "duration": 308000
          },
          {
            "label": "request : check access",
            "duration": 9537000
          },
          {
            "label": "request : check rate limit",
            "duration": 130000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 116000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 104605000
          },
          {
            "label": "response : get body",
            "duration": 18000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 28000
          },
          {
            "label": "response : reduct extensions",
            "duration": 71000
          },
          {
            "label": "async : queue time",
            "duration": 38000
          },
          {
            "label": "async : get header details",
            "duration": 316000
          },
          {
            "label": "async : analyze response",
            "duration": 16000
          },
          {
            "label": "async : update ratelimit",
            "duration": 115000
          },
          {
            "label": "async : collect variables",
            "duration": 130000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreImpactChartData",
      "depth": 5,
      "height": 13,
      "queryHash": "10784685797611608662",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "fe4c574b-6dc8-40db-a56c-a4f347c91789",
      "observedAt": "2024-07-16T13:50:06.1Z",
      "status": "PASSED",
      "serverProcessTime": 137,
      "sidecarProcessTime": 8,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 200000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 8228000
          },
          {
            "label": "request : check rate limit",
            "duration": 102000
          },
          {
            "label": "request : check operation name",
            "duration": 8000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 93000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 137082000
          },
          {
            "label": "response : get body",
            "duration": 14000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 27000
          },
          {
            "label": "response : reduct extensions",
            "duration": 110000
          },
          {
            "label": "async : queue time",
            "duration": 333000
          },
          {
            "label": "async : get header details",
            "duration": 87000
          },
          {
            "label": "async : analyze response",
            "duration": 14000
          },
          {
            "label": "async : update ratelimit",
            "duration": 22000
          },
          {
            "label": "async : collect variables",
            "duration": 169000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreHistogramData",
      "depth": 5,
      "height": 10,
      "queryHash": "13135927283073985373",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "b94252fe-5df2-418c-b5f1-056bb7ea44bd",
      "observedAt": "2024-07-16T13:50:06.089Z",
      "status": "PASSED",
      "serverProcessTime": 99,
      "sidecarProcessTime": 9,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 212000
          },
          {
            "label": "request : sanitize",
            "duration": 48000
          },
          {
            "label": "request : introspection check",
            "duration": 3000
          },
          {
            "label": "request : parse",
            "duration": 462000
          },
          {
            "label": "request : analyze",
            "duration": 1313000
          },
          {
            "label": "request : check access",
            "duration": 6620000
          },
          {
            "label": "request : check rate limit",
            "duration": 105000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 590000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 99437000
          },
          {
            "label": "response : get body",
            "duration": 130000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 37000
          },
          {
            "label": "response : reduct extensions",
            "duration": 138000
          },
          {
            "label": "async : queue time",
            "duration": 769000
          },
          {
            "label": "async : get header details",
            "duration": 147000
          },
          {
            "label": "async : analyze response",
            "duration": 10000
          },
          {
            "label": "async : update ratelimit",
            "duration": 40000
          },
          {
            "label": "async : collect variables",
            "duration": 893000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreHistogramData",
      "depth": 5,
      "height": 10,
      "queryHash": "13135927283073985373",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e64f1204-c454-486f-93ef-1911e8545b6f",
      "observedAt": "2024-07-16T13:50:06.084Z",
      "status": "PASSED",
      "serverProcessTime": 115,
      "sidecarProcessTime": 10,
      "creditCost": 104,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 397000
          },
          {
            "label": "request : sanitize",
            "duration": 123000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 661000
          },
          {
            "label": "request : analyze",
            "duration": 319000
          },
          {
            "label": "request : check access",
            "duration": 7932000
          },
          {
            "label": "request : check rate limit",
            "duration": 83000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 1048000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 115676000
          },
          {
            "label": "response : get body",
            "duration": 14000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 27000
          },
          {
            "label": "response : reduct extensions",
            "duration": 42000
          },
          {
            "label": "async : queue time",
            "duration": 914000
          },
          {
            "label": "async : get header details",
            "duration": 81000
          },
          {
            "label": "async : analyze response",
            "duration": 62000
          },
          {
            "label": "async : update ratelimit",
            "duration": 21000
          },
          {
            "label": "async : collect variables",
            "duration": 215000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreChartData",
      "depth": 5,
      "height": 15,
      "queryHash": "16587806630183889911",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "a0e868e0-fac9-4bb3-97f1-6d303647e19a",
      "observedAt": "2024-07-16T13:50:06.082Z",
      "status": "PASSED",
      "serverProcessTime": 100,
      "sidecarProcessTime": 6,
      "creditCost": 5,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 317000
          },
          {
            "label": "request : sanitize",
            "duration": 50000
          },
          {
            "label": "request : introspection check",
            "duration": 3000
          },
          {
            "label": "request : parse",
            "duration": 495000
          },
          {
            "label": "request : analyze",
            "duration": 896000
          },
          {
            "label": "request : check access",
            "duration": 4349000
          },
          {
            "label": "request : check rate limit",
            "duration": 109000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 103000
          },
          {
            "label": "response : reduct extensions",
            "duration": 25000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 100977000
          },
          {
            "label": "response : get body",
            "duration": 15000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 70000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "async : queue time",
            "duration": 272000
          },
          {
            "label": "async : get header details",
            "duration": 76000
          },
          {
            "label": "async : analyze response",
            "duration": 40000
          },
          {
            "label": "async : update ratelimit",
            "duration": 79000
          },
          {
            "label": "async : collect variables",
            "duration": 136000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreRawChartListData",
      "depth": 6,
      "height": 31,
      "queryHash": "9946510996374914351",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "bfccb388-e736-4df3-9399-93ed98ad7eb8",
      "observedAt": "2024-07-16T13:50:05.986Z",
      "status": "PASSED",
      "serverProcessTime": 256,
      "sidecarProcessTime": 5,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 239000
          },
          {
            "label": "request : get from cache",
            "duration": 4000
          },
          {
            "label": "request : check access",
            "duration": 5211000
          },
          {
            "label": "request : check rate limit",
            "duration": 131000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 63000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 256535000
          },
          {
            "label": "response : get body",
            "duration": 12000
          },
          {
            "label": "response : update ratelimit",
            "duration": 50000
          },
          {
            "label": "response : attach errors",
            "duration": 21000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "async : queue time",
            "duration": 70000
          },
          {
            "label": "async : get header details",
            "duration": 80000
          },
          {
            "label": "async : analyze response",
            "duration": 8000
          },
          {
            "label": "async : update ratelimit",
            "duration": 21000
          },
          {
            "label": "async : collect variables",
            "duration": 177000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreTreeData",
      "depth": 5,
      "height": 7,
      "queryHash": "13691964164811805425",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "fa8f8b7b-b34d-414f-9022-e2379c7f3803",
      "observedAt": "2024-07-16T13:50:05.975Z",
      "status": "PASSED",
      "serverProcessTime": 118,
      "sidecarProcessTime": 4,
      "creditCost": 5,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 242000
          },
          {
            "label": "request : get from cache",
            "duration": 5000
          },
          {
            "label": "request : check access",
            "duration": 3841000
          },
          {
            "label": "request : check rate limit",
            "duration": 134000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 200000
          },
          {
            "label": "response : reduct extensions",
            "duration": 36000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 118484000
          },
          {
            "label": "response : get body",
            "duration": 13000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 20000
          },
          {
            "label": "response : reduct extensions",
            "duration": 41000
          },
          {
            "label": "async : queue time",
            "duration": 7962000
          },
          {
            "label": "async : get header details",
            "duration": 59000
          },
          {
            "label": "async : analyze response",
            "duration": 89000
          },
          {
            "label": "async : update ratelimit",
            "duration": 22000
          },
          {
            "label": "async : collect variables",
            "duration": 140000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreRawChartListData",
      "depth": 6,
      "height": 31,
      "queryHash": "9946510996374914351",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "49dfb951-ad99-469f-81b4-6b47b436ebaa",
      "observedAt": "2024-07-16T13:50:05.974Z",
      "status": "PASSED",
      "serverProcessTime": 190,
      "sidecarProcessTime": 9,
      "creditCost": 104,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 2034000
          },
          {
            "label": "request : get from cache",
            "duration": 7000
          },
          {
            "label": "request : check access",
            "duration": 6957000
          },
          {
            "label": "request : check rate limit",
            "duration": 110000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 108000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 190035000
          },
          {
            "label": "response : get body",
            "duration": 16000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 44000
          },
          {
            "label": "response : reduct extensions",
            "duration": 20000
          },
          {
            "label": "async : queue time",
            "duration": 793000
          },
          {
            "label": "async : get header details",
            "duration": 202000
          },
          {
            "label": "async : analyze response",
            "duration": 28000
          },
          {
            "label": "async : update ratelimit",
            "duration": 26000
          },
          {
            "label": "async : collect variables",
            "duration": 92000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreChartData",
      "depth": 5,
      "height": 15,
      "queryHash": "16587806630183889911",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "2f7c2ef0-ee06-4fd9-b265-31ef5d936bea",
      "observedAt": "2024-07-16T13:50:05.971Z",
      "status": "PASSED",
      "serverProcessTime": 154,
      "sidecarProcessTime": 16,
      "creditCost": 104,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 8947000
          },
          {
            "label": "request : sanitize",
            "duration": 54000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 425000
          },
          {
            "label": "request : analyze",
            "duration": 279000
          },
          {
            "label": "request : check access",
            "duration": 6206000
          },
          {
            "label": "request : check rate limit",
            "duration": 52000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 62000
          },
          {
            "label": "response : reduct extensions",
            "duration": 32000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 154640000
          },
          {
            "label": "response : get body",
            "duration": 16000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 20000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "async : queue time",
            "duration": 2398000
          },
          {
            "label": "async : get header details",
            "duration": 69000
          },
          {
            "label": "async : analyze response",
            "duration": 13000
          },
          {
            "label": "async : update ratelimit",
            "duration": 49000
          },
          {
            "label": "async : collect variables",
            "duration": 111000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreImpactChartData",
      "depth": 5,
      "height": 13,
      "queryHash": "10784685797611608662",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "9ec53ed0-fb95-4a75-af35-a6086fb7c0d9",
      "observedAt": "2024-07-16T13:50:05.969Z",
      "status": "PASSED",
      "serverProcessTime": 190,
      "sidecarProcessTime": 7,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 226000
          },
          {
            "label": "request : get from cache",
            "duration": 4000
          },
          {
            "label": "request : check access",
            "duration": 7063000
          },
          {
            "label": "request : check rate limit",
            "duration": 90000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 2000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 131000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 190544000
          },
          {
            "label": "response : get body",
            "duration": 23000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 27000
          },
          {
            "label": "response : reduct extensions",
            "duration": 71000
          },
          {
            "label": "async : queue time",
            "duration": 293000
          },
          {
            "label": "async : get header details",
            "duration": 138000
          },
          {
            "label": "async : analyze response",
            "duration": 34000
          },
          {
            "label": "async : update ratelimit",
            "duration": 23000
          },
          {
            "label": "async : collect variables",
            "duration": 189000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreHistogramData",
      "depth": 5,
      "height": 10,
      "queryHash": "13135927283073985373",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "102b3d6e-8410-4ab8-aabc-19ab0dcff930",
      "observedAt": "2024-07-16T13:50:05.965Z",
      "status": "PASSED",
      "serverProcessTime": 163,
      "sidecarProcessTime": 5,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 307000
          },
          {
            "label": "request : sanitize",
            "duration": 103000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 490000
          },
          {
            "label": "request : analyze",
            "duration": 296000
          },
          {
            "label": "request : check access",
            "duration": 3541000
          },
          {
            "label": "request : check rate limit",
            "duration": 76000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 79000
          },
          {
            "label": "response : reduct extensions",
            "duration": 33000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 163028000
          },
          {
            "label": "response : get body",
            "duration": 23000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 22000
          },
          {
            "label": "response : reduct extensions",
            "duration": 25000
          },
          {
            "label": "async : queue time",
            "duration": 862000
          },
          {
            "label": "async : get header details",
            "duration": 170000
          },
          {
            "label": "async : analyze response",
            "duration": 13000
          },
          {
            "label": "async : update ratelimit",
            "duration": 40000
          },
          {
            "label": "async : collect variables",
            "duration": 115000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreHistogramData",
      "depth": 5,
      "height": 10,
      "queryHash": "13135927283073985373",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "2a946ab9-c291-4032-b013-05e2c471da5e",
      "observedAt": "2024-07-16T13:50:05.96Z",
      "status": "PASSED",
      "serverProcessTime": 266,
      "sidecarProcessTime": 7,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 168000
          },
          {
            "label": "request : get from cache",
            "duration": 4000
          },
          {
            "label": "request : check access",
            "duration": 7013000
          },
          {
            "label": "request : check rate limit",
            "duration": 127000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 71000
          },
          {
            "label": "response : reduct extensions",
            "duration": 22000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 266730000
          },
          {
            "label": "response : get body",
            "duration": 15000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 74000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "async : queue time",
            "duration": 36000
          },
          {
            "label": "async : get header details",
            "duration": 78000
          },
          {
            "label": "async : analyze response",
            "duration": 94000
          },
          {
            "label": "async : update ratelimit",
            "duration": 22000
          },
          {
            "label": "async : collect variables",
            "duration": 160000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreTreeData",
      "depth": 5,
      "height": 7,
      "queryHash": "13691964164811805425",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e2726584-3c6f-4e85-8fca-8f183db9049d",
      "observedAt": "2024-07-16T13:50:05.959Z",
      "status": "PASSED",
      "serverProcessTime": 223,
      "sidecarProcessTime": 4,
      "creditCost": 104,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 143000
          },
          {
            "label": "request : get from cache",
            "duration": 4000
          },
          {
            "label": "request : check access",
            "duration": 4174000
          },
          {
            "label": "request : check rate limit",
            "duration": 80000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 72000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 223186000
          },
          {
            "label": "response : get body",
            "duration": 16000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 25000
          },
          {
            "label": "response : reduct extensions",
            "duration": 38000
          },
          {
            "label": "async : queue time",
            "duration": 2442000
          },
          {
            "label": "async : get header details",
            "duration": 139000
          },
          {
            "label": "async : analyze response",
            "duration": 25000
          },
          {
            "label": "async : update ratelimit",
            "duration": 29000
          },
          {
            "label": "async : collect variables",
            "duration": 108000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreChartData",
      "depth": 5,
      "height": 15,
      "queryHash": "16587806630183889911",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "d1735668-62ca-45fa-882f-4c42d9e12f23",
      "observedAt": "2024-07-16T13:50:05.957Z",
      "status": "PASSED",
      "serverProcessTime": 168,
      "sidecarProcessTime": 8,
      "creditCost": 5,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 149000
          },
          {
            "label": "request : get from cache",
            "duration": 5000
          },
          {
            "label": "request : check access",
            "duration": 7993000
          },
          {
            "label": "request : check rate limit",
            "duration": 155000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 169000
          },
          {
            "label": "response : reduct extensions",
            "duration": 15000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 168004000
          },
          {
            "label": "response : get body",
            "duration": 76000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 29000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "async : queue time",
            "duration": 15000
          },
          {
            "label": "async : get header details",
            "duration": 179000
          },
          {
            "label": "async : analyze response",
            "duration": 58000
          },
          {
            "label": "async : update ratelimit",
            "duration": 21000
          },
          {
            "label": "async : collect variables",
            "duration": 218000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreRawChartListData",
      "depth": 6,
      "height": 31,
      "queryHash": "9946510996374914351",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "2a398a24-df52-4a96-9430-59ae0560d5bf",
      "observedAt": "2024-07-16T13:50:05.953Z",
      "status": "PASSED",
      "serverProcessTime": 295,
      "sidecarProcessTime": 3,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 162000
          },
          {
            "label": "request : sanitize",
            "duration": 24000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 334000
          },
          {
            "label": "request : analyze",
            "duration": 138000
          },
          {
            "label": "request : check access",
            "duration": 2547000
          },
          {
            "label": "request : check rate limit",
            "duration": 116000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 60000
          },
          {
            "label": "response : reduct extensions",
            "duration": 12000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 295097000
          },
          {
            "label": "response : get body",
            "duration": 15000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 28000
          },
          {
            "label": "response : reduct extensions",
            "duration": 27000
          },
          {
            "label": "async : queue time",
            "duration": 3199000
          },
          {
            "label": "async : get header details",
            "duration": 212000
          },
          {
            "label": "async : analyze response",
            "duration": 9000
          },
          {
            "label": "async : update ratelimit",
            "duration": 25000
          },
          {
            "label": "async : collect variables",
            "duration": 102000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreTreeData",
      "depth": 5,
      "height": 7,
      "queryHash": "13691964164811805425",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "ef3f78f6-c3ed-4680-8009-fa765e8a96d0",
      "observedAt": "2024-07-16T13:50:05.951Z",
      "status": "PASSED",
      "serverProcessTime": 173,
      "sidecarProcessTime": 3,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 133000
          },
          {
            "label": "request : sanitize",
            "duration": 33000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 526000
          },
          {
            "label": "request : analyze",
            "duration": 165000
          },
          {
            "label": "request : check access",
            "duration": 2363000
          },
          {
            "label": "request : check rate limit",
            "duration": 73000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 65000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 173446000
          },
          {
            "label": "response : get body",
            "duration": 19000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 18000
          },
          {
            "label": "response : reduct extensions",
            "duration": 58000
          },
          {
            "label": "async : queue time",
            "duration": 212000
          },
          {
            "label": "async : get header details",
            "duration": 175000
          },
          {
            "label": "async : analyze response",
            "duration": 15000
          },
          {
            "label": "async : update ratelimit",
            "duration": 114000
          },
          {
            "label": "async : collect variables",
            "duration": 77000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreCommonData",
      "depth": 6,
      "height": 11,
      "queryHash": "14675849738818766825",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "7db5b8f0-4416-4a76-bea4-5f9fcab48ac2",
      "observedAt": "2024-07-16T13:50:05.949Z",
      "status": "PASSED",
      "serverProcessTime": 174,
      "sidecarProcessTime": 2,
      "creditCost": 104,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 163000
          },
          {
            "label": "request : get from cache",
            "duration": 5000
          },
          {
            "label": "request : check access",
            "duration": 2155000
          },
          {
            "label": "request : check rate limit",
            "duration": 84000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 77000
          },
          {
            "label": "response : reduct extensions",
            "duration": 31000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 174651000
          },
          {
            "label": "response : get body",
            "duration": 35000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 26000
          },
          {
            "label": "response : reduct extensions",
            "duration": 25000
          },
          {
            "label": "async : queue time",
            "duration": 467000
          },
          {
            "label": "async : get header details",
            "duration": 110000
          },
          {
            "label": "async : analyze response",
            "duration": 105000
          },
          {
            "label": "async : update ratelimit",
            "duration": 24000
          },
          {
            "label": "async : collect variables",
            "duration": 109000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreChartData",
      "depth": 5,
      "height": 15,
      "queryHash": "16587806630183889911",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "d2a8a1e5-dfd5-4e66-b94a-a330cf89854a",
      "observedAt": "2024-07-16T13:50:05.945Z",
      "status": "PASSED",
      "serverProcessTime": 197,
      "sidecarProcessTime": 4,
      "creditCost": 5,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 152000
          },
          {
            "label": "request : sanitize",
            "duration": 117000
          },
          {
            "label": "request : introspection check",
            "duration": 2000
          },
          {
            "label": "request : parse",
            "duration": 568000
          },
          {
            "label": "request : analyze",
            "duration": 621000
          },
          {
            "label": "request : check access",
            "duration": 2502000
          },
          {
            "label": "request : check rate limit",
            "duration": 103000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 2000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 2000
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 104000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 197894000
          },
          {
            "label": "response : get body",
            "duration": 16000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 18000
          },
          {
            "label": "response : reduct extensions",
            "duration": 15000
          },
          {
            "label": "async : queue time",
            "duration": 1848000
          },
          {
            "label": "async : get header details",
            "duration": 99000
          },
          {
            "label": "async : analyze response",
            "duration": 118000
          },
          {
            "label": "async : update ratelimit",
            "duration": 28000
          },
          {
            "label": "async : collect variables",
            "duration": 152000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetExploreRawChartListData",
      "depth": 6,
      "height": 31,
      "queryHash": "9946510996374914351",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "1fb05a1b-cdf1-487e-a489-85094871fc65",
      "observedAt": "2024-07-16T13:50:05.937Z",
      "status": "PASSED",
      "serverProcessTime": 176,
      "sidecarProcessTime": 3,
      "creditCost": 3,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 179000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 2928000
          },
          {
            "label": "request : check rate limit",
            "duration": 113000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 5000
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 74000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 176650000
          },
          {
            "label": "response : get body",
            "duration": 40000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 32000
          },
          {
            "label": "response : reduct extensions",
            "duration": 21000
          },
          {
            "label": "async : queue time",
            "duration": 970000
          },
          {
            "label": "async : get header details",
            "duration": 117000
          },
          {
            "label": "async : analyze response",
            "duration": 60000
          },
          {
            "label": "async : update ratelimit",
            "duration": 27000
          },
          {
            "label": "async : collect variables",
            "duration": 49000
          },
          {
            "label": "async : post process errors",
            "duration": 6000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "SERVER_ERROR": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "ent: user_data not found",
            "path": [
              "user.organization.data"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OrganizationData",
      "depth": 3,
      "height": 3,
      "queryHash": "5181869286424468980",
      "impact": "low"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "6599345a-31b0-42ab-a04d-c61f6ce5e958",
      "observedAt": "2024-07-16T13:50:04.414Z",
      "status": "PASSED",
      "serverProcessTime": 98,
      "sidecarProcessTime": 3,
      "creditCost": 113,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 145000
          },
          {
            "label": "request : get from cache",
            "duration": 4000
          },
          {
            "label": "request : check access",
            "duration": 2815000
          },
          {
            "label": "request : check rate limit",
            "duration": 83000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 206000
          },
          {
            "label": "response : reduct extensions",
            "duration": 14000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 98416000
          },
          {
            "label": "response : get body",
            "duration": 25000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 57000
          },
          {
            "label": "response : reduct extensions",
            "duration": 23000
          },
          {
            "label": "async : queue time",
            "duration": 27000
          },
          {
            "label": "async : get header details",
            "duration": 82000
          },
          {
            "label": "async : analyze response",
            "duration": 287000
          },
          {
            "label": "async : update ratelimit",
            "duration": 40000
          },
          {
            "label": "async : collect variables",
            "duration": 340000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetHomeData",
      "depth": 10,
      "height": 172,
      "queryHash": "13406773799738538242",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "aadefe75-25be-487d-93ec-d61d60641ae8",
      "observedAt": "2024-07-16T13:50:04.405Z",
      "status": "PASSED",
      "serverProcessTime": 75,
      "sidecarProcessTime": 4,
      "creditCost": 113,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 134000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 3328000
          },
          {
            "label": "request : check rate limit",
            "duration": 84000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 338000
          },
          {
            "label": "response : reduct extensions",
            "duration": 32000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 75400000
          },
          {
            "label": "response : get body",
            "duration": 28000
          },
          {
            "label": "response : update ratelimit",
            "duration": 69000
          },
          {
            "label": "response : attach errors",
            "duration": 35000
          },
          {
            "label": "response : reduct extensions",
            "duration": 24000
          },
          {
            "label": "async : queue time",
            "duration": 75000
          },
          {
            "label": "async : get header details",
            "duration": 174000
          },
          {
            "label": "async : analyze response",
            "duration": 456000
          },
          {
            "label": "async : update ratelimit",
            "duration": 30000
          },
          {
            "label": "async : collect variables",
            "duration": 567000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetHomeData",
      "depth": 10,
      "height": 172,
      "queryHash": "13406773799738538242",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e46351e4-5055-4de6-92df-971ead7b1170",
      "observedAt": "2024-07-16T13:50:04.391Z",
      "status": "PASSED",
      "serverProcessTime": 72,
      "sidecarProcessTime": 7,
      "creditCost": 113,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 218000
          },
          {
            "label": "request : sanitize",
            "duration": 160000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 1320000
          },
          {
            "label": "request : analyze",
            "duration": 2051000
          },
          {
            "label": "request : check access",
            "duration": 2994000
          },
          {
            "label": "request : check rate limit",
            "duration": 79000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 185000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 72302000
          },
          {
            "label": "response : get body",
            "duration": 30000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 24000
          },
          {
            "label": "response : reduct extensions",
            "duration": 24000
          },
          {
            "label": "async : queue time",
            "duration": 89000
          },
          {
            "label": "async : get header details",
            "duration": 268000
          },
          {
            "label": "async : analyze response",
            "duration": 179000
          },
          {
            "label": "async : update ratelimit",
            "duration": 24000
          },
          {
            "label": "async : collect variables",
            "duration": 419000
          },
          {
            "label": "async : post process errors",
            "duration": 3000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetHomeData",
      "depth": 10,
      "height": 172,
      "queryHash": "13406773799738538242",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "ff0fad25-aedd-4cc6-b554-3199f3fa2aa9",
      "observedAt": "2024-07-16T13:50:04.383Z",
      "status": "PASSED",
      "serverProcessTime": 31,
      "sidecarProcessTime": 4,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 176000
          },
          {
            "label": "request : sanitize",
            "duration": 34000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 618000
          },
          {
            "label": "request : analyze",
            "duration": 562000
          },
          {
            "label": "request : check access",
            "duration": 3316000
          },
          {
            "label": "request : check rate limit",
            "duration": 105000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 89000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 31528000
          },
          {
            "label": "response : get body",
            "duration": 13000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 20000
          },
          {
            "label": "response : reduct extensions",
            "duration": 24000
          },
          {
            "label": "async : queue time",
            "duration": 115000
          },
          {
            "label": "async : get header details",
            "duration": 67000
          },
          {
            "label": "async : analyze response",
            "duration": 9000
          },
          {
            "label": "async : update ratelimit",
            "duration": 39000
          },
          {
            "label": "async : collect variables",
            "duration": 124000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetHomeUsersData",
      "depth": 6,
      "height": 7,
      "queryHash": "14925691490011979628",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "d03273ad-8559-4be0-8955-855c3c71bd68",
      "observedAt": "2024-07-16T13:50:04.013Z",
      "status": "PASSED",
      "serverProcessTime": 152,
      "sidecarProcessTime": 2,
      "creditCost": 7,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 146000
          },
          {
            "label": "request : get from cache",
            "duration": 4000
          },
          {
            "label": "request : check access",
            "duration": 2359000
          },
          {
            "label": "request : check rate limit",
            "duration": 140000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 78000
          },
          {
            "label": "response : reduct extensions",
            "duration": 15000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 152337000
          },
          {
            "label": "response : get body",
            "duration": 22000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 23000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "async : queue time",
            "duration": 42000
          },
          {
            "label": "async : get header details",
            "duration": 73000
          },
          {
            "label": "async : analyze response",
            "duration": 36000
          },
          {
            "label": "async : update ratelimit",
            "duration": 18000
          },
          {
            "label": "async : collect variables",
            "duration": 95000
          },
          {
            "label": "async : post process errors",
            "duration": 3000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "SERVER_ERROR": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "ent: user_data not found",
            "path": [
              "user.organization.data"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "low"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "82a94af9-e174-46b9-b98c-a9099b050ad7",
      "observedAt": "2024-07-16T13:50:04.012Z",
      "status": "PASSED",
      "serverProcessTime": 143,
      "sidecarProcessTime": 3,
      "creditCost": 5,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 221000
          },
          {
            "label": "request : get from cache",
            "duration": 10000
          },
          {
            "label": "request : check access",
            "duration": 3011000
          },
          {
            "label": "request : check rate limit",
            "duration": 176000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 128000
          },
          {
            "label": "response : reduct extensions",
            "duration": 33000
          },
          {
            "label": "request : sent",
            "duration": 3000
          },
          {
            "label": "server : request done",
            "duration": 143098000
          },
          {
            "label": "response : get body",
            "duration": 11000
          },
          {
            "label": "response : update ratelimit",
            "duration": 9000
          },
          {
            "label": "response : attach errors",
            "duration": 25000
          },
          {
            "label": "response : reduct extensions",
            "duration": 24000
          },
          {
            "label": "async : queue time",
            "duration": 185000
          },
          {
            "label": "async : get header details",
            "duration": 50000
          },
          {
            "label": "async : analyze response",
            "duration": 37000
          },
          {
            "label": "async : update ratelimit",
            "duration": 24000
          },
          {
            "label": "async : collect variables",
            "duration": 69000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetServices",
      "depth": 6,
      "height": 24,
      "queryHash": "2042019549550301894",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "2772fcb0-8aec-45d9-888a-8081e498d538",
      "observedAt": "2024-07-16T13:50:03.75Z",
      "status": "PASSED",
      "serverProcessTime": 59,
      "sidecarProcessTime": 4,
      "creditCost": 3,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 169000
          },
          {
            "label": "request : sanitize",
            "duration": 78000
          },
          {
            "label": "request : introspection check",
            "duration": 4000
          },
          {
            "label": "request : parse",
            "duration": 291000
          },
          {
            "label": "request : analyze",
            "duration": 162000
          },
          {
            "label": "request : check access",
            "duration": 3856000
          },
          {
            "label": "request : check rate limit",
            "duration": 109000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 76000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 59512000
          },
          {
            "label": "response : get body",
            "duration": 15000
          },
          {
            "label": "response : update ratelimit",
            "duration": 4000
          },
          {
            "label": "response : attach errors",
            "duration": 18000
          },
          {
            "label": "response : reduct extensions",
            "duration": 14000
          },
          {
            "label": "async : queue time",
            "duration": 50000
          },
          {
            "label": "async : get header details",
            "duration": 63000
          },
          {
            "label": "async : analyze response",
            "duration": 6000
          },
          {
            "label": "async : update ratelimit",
            "duration": 22000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_CurrentUserInfo",
      "depth": 3,
      "height": 8,
      "queryHash": "5569900216096724238",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "b4949982-0f9b-4875-8c9a-31c3ec66da32",
      "observedAt": "2024-07-16T13:47:08.055Z",
      "status": "PASSED",
      "serverProcessTime": 57,
      "sidecarProcessTime": 5,
      "creditCost": 1,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 322000
          },
          {
            "label": "request : sanitize",
            "duration": 21000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 728000
          },
          {
            "label": "request : analyze",
            "duration": 97000
          },
          {
            "label": "request : check access",
            "duration": 4393000
          },
          {
            "label": "request : check rate limit",
            "duration": 114000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 88000
          },
          {
            "label": "response : reduct extensions",
            "duration": 23000
          },
          {
            "label": "request : sent",
            "duration": 3000
          },
          {
            "label": "server : request done",
            "duration": 57939000
          },
          {
            "label": "response : get body",
            "duration": 29000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 32000
          },
          {
            "label": "response : reduct extensions",
            "duration": 25000
          },
          {
            "label": "async : queue time",
            "duration": 635000
          },
          {
            "label": "async : get header details",
            "duration": 113000
          },
          {
            "label": "async : analyze response",
            "duration": 5000
          },
          {
            "label": "async : update ratelimit",
            "duration": 44000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_Secrets",
      "depth": 2,
      "height": 2,
      "queryHash": "14064997649146021824",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "7cfab74f-6e70-4fb2-996d-22ffb1e2aa41",
      "observedAt": "2024-07-16T13:45:18.622Z",
      "status": "PASSED",
      "serverProcessTime": 8,
      "sidecarProcessTime": 1,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "008c49e4-a695-4aab-8a85-43d86dfca948",
      "observedAt": "2024-07-16T13:43:51.29Z",
      "status": "BLOCKED",
      "serverProcessTime": 0,
      "sidecarProcessTime": 4,
      "creditCost": 0,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 192000
          },
          {
            "label": "request : get from cache",
            "duration": 57000
          },
          {
            "label": "request : check access",
            "duration": 3593000
          },
          {
            "label": "response : update ratelimit",
            "duration": 13000
          },
          {
            "label": "response : attach errors",
            "duration": 34000
          },
          {
            "label": "response : reduct extensions",
            "duration": 30000
          },
          {
            "label": "response : attach errors",
            "duration": 62000
          },
          {
            "label": "response : reduct extensions",
            "duration": 21000
          },
          {
            "label": "request : sent",
            "duration": 48000
          },
          {
            "label": "async : queue time",
            "duration": 15000
          },
          {
            "label": "async : get header details",
            "duration": 155000
          },
          {
            "label": "async : update ratelimit",
            "duration": 305000
          },
          {
            "label": "async : collect variables",
            "duration": 201000
          },
          {
            "label": "async : post process errors",
            "duration": 9000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "INVALID_ACCESS": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "invalid access",
            "path": [
              "user.organization.invites"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "a374b1d3-5d09-4221-a4bd-8f7279a002cf",
      "observedAt": "2024-07-16T13:43:47.119Z",
      "status": "BLOCKED",
      "serverProcessTime": 0,
      "sidecarProcessTime": 3,
      "creditCost": 0,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 159000
          },
          {
            "label": "request : get from cache",
            "duration": 4000
          },
          {
            "label": "request : check access",
            "duration": 2697000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 29000
          },
          {
            "label": "response : reduct extensions",
            "duration": 23000
          },
          {
            "label": "response : attach errors",
            "duration": 100000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 41000
          },
          {
            "label": "async : queue time",
            "duration": 55000
          },
          {
            "label": "async : get header details",
            "duration": 496000
          },
          {
            "label": "async : update ratelimit",
            "duration": 19000
          },
          {
            "label": "async : collect variables",
            "duration": 115000
          },
          {
            "label": "async : post process errors",
            "duration": 5000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "INVALID_ACCESS": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "invalid access",
            "path": [
              "user.organization.invites"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "22fb6265-394d-4608-99b3-181b05ec196c",
      "observedAt": "2024-07-16T13:43:44.94Z",
      "status": "BLOCKED",
      "serverProcessTime": 0,
      "sidecarProcessTime": 3,
      "creditCost": 0,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 164000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 3513000
          },
          {
            "label": "response : update ratelimit",
            "duration": 10000
          },
          {
            "label": "response : attach errors",
            "duration": 73000
          },
          {
            "label": "response : reduct extensions",
            "duration": 46000
          },
          {
            "label": "response : attach errors",
            "duration": 40000
          },
          {
            "label": "response : reduct extensions",
            "duration": 10000
          },
          {
            "label": "request : sent",
            "duration": 43000
          },
          {
            "label": "async : queue time",
            "duration": 516000
          },
          {
            "label": "async : get header details",
            "duration": 206000
          },
          {
            "label": "async : update ratelimit",
            "duration": 45000
          },
          {
            "label": "async : collect variables",
            "duration": 127000
          },
          {
            "label": "async : post process errors",
            "duration": 5000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "INVALID_ACCESS": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "invalid access",
            "path": [
              "user.organization.invites"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "805b71a6-3b15-4e2d-930e-37cc9c215685",
      "observedAt": "2024-07-16T13:43:44.536Z",
      "status": "PASSED",
      "serverProcessTime": 456,
      "sidecarProcessTime": 3,
      "creditCost": 98,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 249000
          },
          {
            "label": "request : get from cache",
            "duration": 7000
          },
          {
            "label": "request : check access",
            "duration": 2924000
          },
          {
            "label": "request : check rate limit",
            "duration": 88000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 522000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "request : sent",
            "duration": 3000
          },
          {
            "label": "server : request done",
            "duration": 456656000
          },
          {
            "label": "response : get body",
            "duration": 20000
          },
          {
            "label": "response : update ratelimit",
            "duration": 9000
          },
          {
            "label": "response : attach errors",
            "duration": 28000
          },
          {
            "label": "response : reduct extensions",
            "duration": 29000
          },
          {
            "label": "async : queue time",
            "duration": 170000
          },
          {
            "label": "async : get header details",
            "duration": 138000
          },
          {
            "label": "async : analyze response",
            "duration": 880000
          },
          {
            "label": "async : update ratelimit",
            "duration": 48000
          },
          {
            "label": "async : collect variables",
            "duration": 910000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetConfigGlobal",
      "depth": 8,
      "height": 430,
      "queryHash": "6105971188219142422",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "efd32b29-867e-4a10-b4fe-4565d47b3eb3",
      "observedAt": "2024-07-16T13:43:44.535Z",
      "status": "PASSED",
      "serverProcessTime": 69,
      "sidecarProcessTime": 5,
      "creditCost": 20,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 170000
          },
          {
            "label": "request : sanitize",
            "duration": 14000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 162000
          },
          {
            "label": "request : analyze",
            "duration": 155000
          },
          {
            "label": "request : check access",
            "duration": 4926000
          },
          {
            "label": "request : check rate limit",
            "duration": 106000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 81000
          },
          {
            "label": "response : reduct extensions",
            "duration": 37000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 69213000
          },
          {
            "label": "response : get body",
            "duration": 28000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 43000
          },
          {
            "label": "response : reduct extensions",
            "duration": 24000
          },
          {
            "label": "async : queue time",
            "duration": 315000
          },
          {
            "label": "async : get header details",
            "duration": 91000
          },
          {
            "label": "async : analyze response",
            "duration": 10000
          },
          {
            "label": "async : update ratelimit",
            "duration": 20000
          },
          {
            "label": "async : post process errors",
            "duration": 2000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "Ui_User_GetTeam",
      "depth": 4,
      "height": 6,
      "queryHash": "2039444917450639426",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "830b55fc-262e-437f-bdf5-dc90caf3f9ad",
      "observedAt": "2024-07-16T13:43:44.411Z",
      "status": "PASSED",
      "serverProcessTime": 96,
      "sidecarProcessTime": 4,
      "creditCost": 20,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 136000
          },
          {
            "label": "request : sanitize",
            "duration": 13000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 228000
          },
          {
            "label": "request : analyze",
            "duration": 144000
          },
          {
            "label": "request : check access",
            "duration": 3906000
          },
          {
            "label": "request : check rate limit",
            "duration": 87000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 50000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 96497000
          },
          {
            "label": "response : get body",
            "duration": 16000
          },
          {
            "label": "response : update ratelimit",
            "duration": 4000
          },
          {
            "label": "response : attach errors",
            "duration": 21000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "async : queue time",
            "duration": 1161000
          },
          {
            "label": "async : get header details",
            "duration": 93000
          },
          {
            "label": "async : analyze response",
            "duration": 9000
          },
          {
            "label": "async : update ratelimit",
            "duration": 22000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "Ui_User_GetTeam",
      "depth": 4,
      "height": 6,
      "queryHash": "2039444917450639426",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "7580f549-ad7d-4404-934a-0e35e8e2a9b8",
      "observedAt": "2024-07-16T13:43:44.41Z",
      "status": "PASSED",
      "serverProcessTime": 115,
      "sidecarProcessTime": 4,
      "creditCost": 98,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 241000
          },
          {
            "label": "request : get from cache",
            "duration": 10000
          },
          {
            "label": "request : check access",
            "duration": 3792000
          },
          {
            "label": "request : check rate limit",
            "duration": 107000
          },
          {
            "label": "request : check operation name",
            "duration": 3000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 492000
          },
          {
            "label": "response : reduct extensions",
            "duration": 20000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 115752000
          },
          {
            "label": "response : get body",
            "duration": 19000
          },
          {
            "label": "response : update ratelimit",
            "duration": 9000
          },
          {
            "label": "response : attach errors",
            "duration": 28000
          },
          {
            "label": "response : reduct extensions",
            "duration": 22000
          },
          {
            "label": "async : queue time",
            "duration": 52000
          },
          {
            "label": "async : get header details",
            "duration": 351000
          },
          {
            "label": "async : analyze response",
            "duration": 1229000
          },
          {
            "label": "async : update ratelimit",
            "duration": 31000
          },
          {
            "label": "async : collect variables",
            "duration": 851000
          },
          {
            "label": "async : post process errors",
            "duration": 2000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetConfigGlobal",
      "depth": 8,
      "height": 430,
      "queryHash": "6105971188219142422",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "7b03e4e5-8c28-47d6-a38b-67af8b609051",
      "observedAt": "2024-07-16T13:43:44.399Z",
      "status": "PASSED",
      "serverProcessTime": 755,
      "sidecarProcessTime": 7,
      "creditCost": 950,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 174000
          },
          {
            "label": "request : sanitize",
            "duration": 83000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 1074000
          },
          {
            "label": "request : analyze",
            "duration": 2747000
          },
          {
            "label": "request : check access",
            "duration": 2759000
          },
          {
            "label": "request : check rate limit",
            "duration": 98000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 202000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 755608000
          },
          {
            "label": "response : get body",
            "duration": 27000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 19000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "async : queue time",
            "duration": 49000
          },
          {
            "label": "async : get header details",
            "duration": 333000
          },
          {
            "label": "async : analyze response",
            "duration": 138000
          },
          {
            "label": "async : update ratelimit",
            "duration": 36000
          },
          {
            "label": "async : collect variables",
            "duration": 347000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetReports",
      "depth": 10,
      "height": 127,
      "queryHash": "17212874692761424938",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "4233c4dc-045a-4aa2-a150-16c37c2fe1ba",
      "observedAt": "2024-07-16T13:43:43.772Z",
      "status": "PASSED",
      "serverProcessTime": 434,
      "sidecarProcessTime": 3,
      "creditCost": 57,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 180000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 2615000
          },
          {
            "label": "request : check rate limit",
            "duration": 93000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 99000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 434008000
          },
          {
            "label": "response : get body",
            "duration": 17000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 26000
          },
          {
            "label": "response : reduct extensions",
            "duration": 24000
          },
          {
            "label": "async : queue time",
            "duration": 24000
          },
          {
            "label": "async : get header details",
            "duration": 91000
          },
          {
            "label": "async : analyze response",
            "duration": 36000
          },
          {
            "label": "async : update ratelimit",
            "duration": 23000
          },
          {
            "label": "async : collect variables",
            "duration": 94000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetServices",
      "depth": 6,
      "height": 24,
      "queryHash": "2042019549550301894",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "76033fc8-75f4-44e7-9ca4-c85a21d9436c",
      "observedAt": "2024-07-16T13:43:43.77Z",
      "status": "BLOCKED",
      "serverProcessTime": 0,
      "sidecarProcessTime": 4,
      "creditCost": 0,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 239000
          },
          {
            "label": "request : get from cache",
            "duration": 8000
          },
          {
            "label": "request : check access",
            "duration": 3694000
          },
          {
            "label": "response : update ratelimit",
            "duration": 9000
          },
          {
            "label": "response : attach errors",
            "duration": 37000
          },
          {
            "label": "response : reduct extensions",
            "duration": 32000
          },
          {
            "label": "response : attach errors",
            "duration": 34000
          },
          {
            "label": "response : reduct extensions",
            "duration": 25000
          },
          {
            "label": "request : sent",
            "duration": 41000
          },
          {
            "label": "async : queue time",
            "duration": 50000
          },
          {
            "label": "async : get header details",
            "duration": 164000
          },
          {
            "label": "async : update ratelimit",
            "duration": 21000
          },
          {
            "label": "async : collect variables",
            "duration": 102000
          },
          {
            "label": "async : post process errors",
            "duration": 12000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "INVALID_ACCESS": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "invalid access",
            "path": [
              "user.organization.invites"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "d3dde13a-a7e3-4e7a-83ef-9d24a0dc7f94",
      "observedAt": "2024-07-16T13:43:43.541Z",
      "status": "PASSED",
      "serverProcessTime": 49,
      "sidecarProcessTime": 5,
      "creditCost": 3,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 309000
          },
          {
            "label": "request : get from cache",
            "duration": 10000
          },
          {
            "label": "request : check access",
            "duration": 4843000
          },
          {
            "label": "request : check rate limit",
            "duration": 225000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 3000
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 93000
          },
          {
            "label": "response : reduct extensions",
            "duration": 20000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 49329000
          },
          {
            "label": "response : get body",
            "duration": 13000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 27000
          },
          {
            "label": "response : reduct extensions",
            "duration": 24000
          },
          {
            "label": "async : queue time",
            "duration": 979000
          },
          {
            "label": "async : get header details",
            "duration": 43000
          },
          {
            "label": "async : analyze response",
            "duration": 11000
          },
          {
            "label": "async : update ratelimit",
            "duration": 22000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_CurrentUserInfo",
      "depth": 3,
      "height": 8,
      "queryHash": "5569900216096724238",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "3fc121ea-8d12-473d-95e0-e439e047c4a3",
      "observedAt": "2024-07-16T13:41:40.805Z",
      "status": "PASSED",
      "serverProcessTime": 13,
      "sidecarProcessTime": 3,
      "creditCost": 1,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 127000
          },
          {
            "label": "request : sanitize",
            "duration": 13000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 539000
          },
          {
            "label": "request : analyze",
            "duration": 85000
          },
          {
            "label": "request : check access",
            "duration": 2701000
          },
          {
            "label": "request : check rate limit",
            "duration": 110000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 48000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 13437000
          },
          {
            "label": "response : get body",
            "duration": 12000
          },
          {
            "label": "response : update ratelimit",
            "duration": 3000
          },
          {
            "label": "response : attach errors",
            "duration": 22000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "async : queue time",
            "duration": 507000
          },
          {
            "label": "async : get header details",
            "duration": 88000
          },
          {
            "label": "async : analyze response",
            "duration": 12000
          },
          {
            "label": "async : update ratelimit",
            "duration": 19000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_Secrets",
      "depth": 2,
      "height": 2,
      "queryHash": "14064997649146021824",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e176562a-12e6-4c25-9d12-d247d736c277",
      "observedAt": "2024-07-16T13:41:40.417Z",
      "status": "PASSED",
      "serverProcessTime": 101,
      "sidecarProcessTime": 3,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 162000
          },
          {
            "label": "request : sanitize",
            "duration": 15000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 215000
          },
          {
            "label": "request : analyze",
            "duration": 172000
          },
          {
            "label": "request : check access",
            "duration": 2949000
          },
          {
            "label": "request : check rate limit",
            "duration": 115000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 95000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 101594000
          },
          {
            "label": "response : get body",
            "duration": 16000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 21000
          },
          {
            "label": "response : reduct extensions",
            "duration": 20000
          },
          {
            "label": "async : queue time",
            "duration": 1519000
          },
          {
            "label": "async : get header details",
            "duration": 60000
          },
          {
            "label": "async : analyze response",
            "duration": 6000
          },
          {
            "label": "async : update ratelimit",
            "duration": 25000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "Ui_User_GetTeam",
      "depth": 4,
      "height": 6,
      "queryHash": "2039444917450639426",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "635edc9e-c34c-4b38-841c-e20c2c5b88cd",
      "observedAt": "2024-07-16T13:41:40.401Z",
      "status": "PASSED",
      "serverProcessTime": 215,
      "sidecarProcessTime": 2,
      "creditCost": 5,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 97000
          },
          {
            "label": "request : get from cache",
            "duration": 4000
          },
          {
            "label": "request : check access",
            "duration": 2114000
          },
          {
            "label": "request : check rate limit",
            "duration": 76000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 72000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 215284000
          },
          {
            "label": "response : get body",
            "duration": 18000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 38000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "async : queue time",
            "duration": 1073000
          },
          {
            "label": "async : get header details",
            "duration": 97000
          },
          {
            "label": "async : analyze response",
            "duration": 26000
          },
          {
            "label": "async : update ratelimit",
            "duration": 21000
          },
          {
            "label": "async : collect variables",
            "duration": 43000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetServices",
      "depth": 6,
      "height": 24,
      "queryHash": "2042019549550301894",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "44ae8f87-f437-42f5-bb71-ea1029caad3b",
      "observedAt": "2024-07-16T13:41:40.397Z",
      "status": "PASSED",
      "serverProcessTime": 202,
      "sidecarProcessTime": 4,
      "creditCost": 7,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 154000
          },
          {
            "label": "request : get from cache",
            "duration": 7000
          },
          {
            "label": "request : check access",
            "duration": 3339000
          },
          {
            "label": "request : check rate limit",
            "duration": 316000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 102000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 202663000
          },
          {
            "label": "response : get body",
            "duration": 39000
          },
          {
            "label": "response : update ratelimit",
            "duration": 12000
          },
          {
            "label": "response : attach errors",
            "duration": 35000
          },
          {
            "label": "response : reduct extensions",
            "duration": 21000
          },
          {
            "label": "async : queue time",
            "duration": 715000
          },
          {
            "label": "async : get header details",
            "duration": 83000
          },
          {
            "label": "async : analyze response",
            "duration": 41000
          },
          {
            "label": "async : update ratelimit",
            "duration": 54000
          },
          {
            "label": "async : collect variables",
            "duration": 101000
          },
          {
            "label": "async : post process errors",
            "duration": 3000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "SERVER_ERROR": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "ent: user_data not found",
            "path": [
              "user.organization.data"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "low"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e159c71c-6495-4a30-bfe3-d0d2eb7f1a3c",
      "observedAt": "2024-07-16T13:41:40.394Z",
      "status": "PASSED",
      "serverProcessTime": 197,
      "sidecarProcessTime": 4,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 319000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 3428000
          },
          {
            "label": "request : check rate limit",
            "duration": 90000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 520000
          },
          {
            "label": "response : reduct extensions",
            "duration": 35000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 197715000
          },
          {
            "label": "response : get body",
            "duration": 13000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 21000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "async : queue time",
            "duration": 2567000
          },
          {
            "label": "async : get header details",
            "duration": 80000
          },
          {
            "label": "async : analyze response",
            "duration": 711000
          },
          {
            "label": "async : update ratelimit",
            "duration": 30000
          },
          {
            "label": "async : collect variables",
            "duration": 647000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetConfigGlobal",
      "depth": 8,
      "height": 430,
      "queryHash": "6105971188219142422",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "8fc0ebe7-3c86-4601-8492-deab838972d9",
      "observedAt": "2024-07-16T13:41:31.245Z",
      "status": "PASSED",
      "serverProcessTime": 17,
      "sidecarProcessTime": 5,
      "creditCost": 1,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 272000
          },
          {
            "label": "request : sanitize",
            "duration": 16000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 311000
          },
          {
            "label": "request : analyze",
            "duration": 64000
          },
          {
            "label": "request : check access",
            "duration": 4890000
          },
          {
            "label": "request : check rate limit",
            "duration": 108000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 86000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 17296000
          },
          {
            "label": "response : get body",
            "duration": 15000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 23000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "async : queue time",
            "duration": 220000
          },
          {
            "label": "async : get header details",
            "duration": 57000
          },
          {
            "label": "async : analyze response",
            "duration": 12000
          },
          {
            "label": "async : update ratelimit",
            "duration": 21000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_Secrets",
      "depth": 2,
      "height": 2,
      "queryHash": "14064997649146021824",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "ca534d2a-fa32-4686-9042-b700caf890b6",
      "observedAt": "2024-07-16T13:41:30.47Z",
      "status": "PASSED",
      "serverProcessTime": 194,
      "sidecarProcessTime": 10,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 405000
          },
          {
            "label": "request : sanitize",
            "duration": 392000
          },
          {
            "label": "request : introspection check",
            "duration": 22000
          },
          {
            "label": "request : parse",
            "duration": 2479000
          },
          {
            "label": "request : analyze",
            "duration": 4369000
          },
          {
            "label": "request : check access",
            "duration": 2429000
          },
          {
            "label": "request : check rate limit",
            "duration": 152000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 397000
          },
          {
            "label": "response : reduct extensions",
            "duration": 14000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 194939000
          },
          {
            "label": "response : get body",
            "duration": 20000
          },
          {
            "label": "response : update ratelimit",
            "duration": 9000
          },
          {
            "label": "response : attach errors",
            "duration": 29000
          },
          {
            "label": "response : reduct extensions",
            "duration": 22000
          },
          {
            "label": "async : queue time",
            "duration": 8911000
          },
          {
            "label": "async : get header details",
            "duration": 117000
          },
          {
            "label": "async : analyze response",
            "duration": 520000
          },
          {
            "label": "async : update ratelimit",
            "duration": 33000
          },
          {
            "label": "async : collect variables",
            "duration": 577000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetConfigGlobal",
      "depth": 8,
      "height": 430,
      "queryHash": "6105971188219142422",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "3bb994dd-e905-4f72-bc84-285bb75826b1",
      "observedAt": "2024-07-16T13:41:30.442Z",
      "status": "PASSED",
      "serverProcessTime": 240,
      "sidecarProcessTime": 4,
      "creditCost": 7,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 278000
          },
          {
            "label": "request : get from cache",
            "duration": 7000
          },
          {
            "label": "request : check access",
            "duration": 3429000
          },
          {
            "label": "request : check rate limit",
            "duration": 127000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 2000
          },
          {
            "label": "response : attach errors",
            "duration": 98000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 240954000
          },
          {
            "label": "response : get body",
            "duration": 26000
          },
          {
            "label": "response : update ratelimit",
            "duration": 4000
          },
          {
            "label": "response : attach errors",
            "duration": 36000
          },
          {
            "label": "response : reduct extensions",
            "duration": 25000
          },
          {
            "label": "async : queue time",
            "duration": 43000
          },
          {
            "label": "async : get header details",
            "duration": 68000
          },
          {
            "label": "async : analyze response",
            "duration": 44000
          },
          {
            "label": "async : update ratelimit",
            "duration": 20000
          },
          {
            "label": "async : collect variables",
            "duration": 84000
          },
          {
            "label": "async : post process errors",
            "duration": 4000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "SERVER_ERROR": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "ent: user_data not found",
            "path": [
              "user.organization.data"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "low"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "7f285f93-ab22-4d33-bd63-038367bfa924",
      "observedAt": "2024-07-16T13:41:30.44Z",
      "status": "PASSED",
      "serverProcessTime": 240,
      "sidecarProcessTime": 4,
      "creditCost": 5,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 326000
          },
          {
            "label": "request : get from cache",
            "duration": 14000
          },
          {
            "label": "request : check access",
            "duration": 3299000
          },
          {
            "label": "request : check rate limit",
            "duration": 216000
          },
          {
            "label": "request : check operation name",
            "duration": 3000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 171000
          },
          {
            "label": "response : reduct extensions",
            "duration": 36000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 240718000
          },
          {
            "label": "response : get body",
            "duration": 14000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 31000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "async : queue time",
            "duration": 18000
          },
          {
            "label": "async : get header details",
            "duration": 175000
          },
          {
            "label": "async : analyze response",
            "duration": 151000
          },
          {
            "label": "async : update ratelimit",
            "duration": 24000
          },
          {
            "label": "async : collect variables",
            "duration": 63000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetServices",
      "depth": 6,
      "height": 24,
      "queryHash": "2042019549550301894",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "d68ce719-47ef-4caf-a6e3-8f140c0e19e8",
      "observedAt": "2024-07-16T13:41:30.437Z",
      "status": "PASSED",
      "serverProcessTime": 168,
      "sidecarProcessTime": 3,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 232000
          },
          {
            "label": "request : sanitize",
            "duration": 38000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 330000
          },
          {
            "label": "request : analyze",
            "duration": 112000
          },
          {
            "label": "request : check access",
            "duration": 2643000
          },
          {
            "label": "request : check rate limit",
            "duration": 125000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 85000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "request : sent",
            "duration": 4000
          },
          {
            "label": "server : request done",
            "duration": 168103000
          },
          {
            "label": "response : get body",
            "duration": 17000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 62000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "async : queue time",
            "duration": 218000
          },
          {
            "label": "async : get header details",
            "duration": 102000
          },
          {
            "label": "async : analyze response",
            "duration": 8000
          },
          {
            "label": "async : update ratelimit",
            "duration": 25000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "Ui_User_GetTeam",
      "depth": 4,
      "height": 6,
      "queryHash": "2039444917450639426",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "64906edb-0a53-40aa-85eb-eeef1cb0c80c",
      "observedAt": "2024-07-16T13:40:18.41Z",
      "status": "PASSED",
      "serverProcessTime": 7,
      "sidecarProcessTime": 0,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "ba241174-4df3-4ad3-b6a1-553484e43e82",
      "observedAt": "2024-07-16T13:37:39.546Z",
      "status": "PASSED",
      "serverProcessTime": 10,
      "sidecarProcessTime": 4,
      "creditCost": 1,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 322000
          },
          {
            "label": "request : sanitize",
            "duration": 15000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 716000
          },
          {
            "label": "request : analyze",
            "duration": 81000
          },
          {
            "label": "request : check access",
            "duration": 3249000
          },
          {
            "label": "request : check rate limit",
            "duration": 85000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 52000
          },
          {
            "label": "response : reduct extensions",
            "duration": 14000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 10338000
          },
          {
            "label": "response : get body",
            "duration": 15000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 102000
          },
          {
            "label": "response : reduct extensions",
            "duration": 20000
          },
          {
            "label": "async : queue time",
            "duration": 276000
          },
          {
            "label": "async : get header details",
            "duration": 56000
          },
          {
            "label": "async : analyze response",
            "duration": 4000
          },
          {
            "label": "async : update ratelimit",
            "duration": 21000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_Secrets",
      "depth": 2,
      "height": 2,
      "queryHash": "14064997649146021824",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "cc10f928-03dc-4915-aa4c-8499bb5d7da0",
      "observedAt": "2024-07-16T13:37:39.165Z",
      "status": "PASSED",
      "serverProcessTime": 200,
      "sidecarProcessTime": 9,
      "creditCost": 7,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 188000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 8869000
          },
          {
            "label": "request : check rate limit",
            "duration": 112000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 122000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 200717000
          },
          {
            "label": "response : get body",
            "duration": 34000
          },
          {
            "label": "response : update ratelimit",
            "duration": 9000
          },
          {
            "label": "response : attach errors",
            "duration": 25000
          },
          {
            "label": "response : reduct extensions",
            "duration": 21000
          },
          {
            "label": "async : queue time",
            "duration": 405000
          },
          {
            "label": "async : get header details",
            "duration": 62000
          },
          {
            "label": "async : analyze response",
            "duration": 96000
          },
          {
            "label": "async : update ratelimit",
            "duration": 23000
          },
          {
            "label": "async : collect variables",
            "duration": 82000
          },
          {
            "label": "async : post process errors",
            "duration": 4000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "SERVER_ERROR": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "ent: user_data not found",
            "path": [
              "user.organization.data"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "low"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "eb777147-0f3e-4934-959c-8e8cc5685303",
      "observedAt": "2024-07-16T13:37:39.162Z",
      "status": "PASSED",
      "serverProcessTime": 184,
      "sidecarProcessTime": 3,
      "creditCost": 5,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 235000
          },
          {
            "label": "request : get from cache",
            "duration": 8000
          },
          {
            "label": "request : check access",
            "duration": 2586000
          },
          {
            "label": "request : check rate limit",
            "duration": 82000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 96000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 184725000
          },
          {
            "label": "response : get body",
            "duration": 10000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 19000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "async : queue time",
            "duration": 215000
          },
          {
            "label": "async : get header details",
            "duration": 48000
          },
          {
            "label": "async : analyze response",
            "duration": 160000
          },
          {
            "label": "async : update ratelimit",
            "duration": 20000
          },
          {
            "label": "async : collect variables",
            "duration": 49000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetServices",
      "depth": 6,
      "height": 24,
      "queryHash": "2042019549550301894",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "5f8b643e-ceb1-4349-9864-2bcd99ad1d32",
      "observedAt": "2024-07-16T13:37:39.144Z",
      "status": "PASSED",
      "serverProcessTime": 105,
      "sidecarProcessTime": 3,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 211000
          },
          {
            "label": "request : sanitize",
            "duration": 23000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 485000
          },
          {
            "label": "request : analyze",
            "duration": 156000
          },
          {
            "label": "request : check access",
            "duration": 2661000
          },
          {
            "label": "request : check rate limit",
            "duration": 81000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 62000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 105420000
          },
          {
            "label": "response : get body",
            "duration": 19000
          },
          {
            "label": "response : update ratelimit",
            "duration": 3000
          },
          {
            "label": "response : attach errors",
            "duration": 23000
          },
          {
            "label": "response : reduct extensions",
            "duration": 21000
          },
          {
            "label": "async : queue time",
            "duration": 215000
          },
          {
            "label": "async : get header details",
            "duration": 83000
          },
          {
            "label": "async : analyze response",
            "duration": 6000
          },
          {
            "label": "async : update ratelimit",
            "duration": 20000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "Ui_User_GetTeam",
      "depth": 4,
      "height": 6,
      "queryHash": "2039444917450639426",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e0adaf3c-de65-4792-b93f-2f5b652a517e",
      "observedAt": "2024-07-16T13:37:39.127Z",
      "status": "PASSED",
      "serverProcessTime": 219,
      "sidecarProcessTime": 4,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 267000
          },
          {
            "label": "request : get from cache",
            "duration": 10000
          },
          {
            "label": "request : check access",
            "duration": 3492000
          },
          {
            "label": "request : check rate limit",
            "duration": 139000
          },
          {
            "label": "request : check operation name",
            "duration": 4000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 458000
          },
          {
            "label": "response : reduct extensions",
            "duration": 31000
          },
          {
            "label": "request : sent",
            "duration": 3000
          },
          {
            "label": "server : request done",
            "duration": 219813000
          },
          {
            "label": "response : get body",
            "duration": 15000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 21000
          },
          {
            "label": "response : reduct extensions",
            "duration": 32000
          },
          {
            "label": "async : queue time",
            "duration": 44000
          },
          {
            "label": "async : get header details",
            "duration": 72000
          },
          {
            "label": "async : analyze response",
            "duration": 503000
          },
          {
            "label": "async : update ratelimit",
            "duration": 32000
          },
          {
            "label": "async : collect variables",
            "duration": 699000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetConfigGlobal",
      "depth": 8,
      "height": 430,
      "queryHash": "6105971188219142422",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "cc8b3952-ea38-46c7-a25a-56f70bf0456b",
      "observedAt": "2024-07-16T13:35:18.208Z",
      "status": "PASSED",
      "serverProcessTime": 8,
      "sidecarProcessTime": 0,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "801a4abf-1554-4624-a8da-ee1992018c8a",
      "observedAt": "2024-07-16T13:33:11.736Z",
      "status": "PASSED",
      "serverProcessTime": 267,
      "sidecarProcessTime": 4,
      "creditCost": 46,
      "user": null,
      "userId": "inigo.github.actions@alvalabs.io",
      "roles": [
        "guest",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 302000
          },
          {
            "label": "request : sanitize",
            "duration": 36000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 507000
          },
          {
            "label": "request : analyze",
            "duration": 233000
          },
          {
            "label": "request : check access",
            "duration": 2810000
          },
          {
            "label": "request : check rate limit",
            "duration": 135000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 125000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 267750000
          },
          {
            "label": "response : get body",
            "duration": 14000
          },
          {
            "label": "response : update ratelimit",
            "duration": 9000
          },
          {
            "label": "response : attach errors",
            "duration": 21000
          },
          {
            "label": "response : reduct extensions",
            "duration": 20000
          },
          {
            "label": "async : queue time",
            "duration": 55000
          },
          {
            "label": "async : get header details",
            "duration": 52000
          },
          {
            "label": "async : analyze response",
            "duration": 8000
          },
          {
            "label": "async : update ratelimit",
            "duration": 24000
          },
          {
            "label": "async : collect variables",
            "duration": 204000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "CFG_QueryDataFieldsUsage",
      "depth": 5,
      "height": 10,
      "queryHash": "3180607325409436676",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "801a4abf-1554-4624-a8da-ee1992018c8a",
      "observedAt": "2024-07-16T13:33:11.378Z",
      "status": "PASSED",
      "serverProcessTime": 758,
      "sidecarProcessTime": 5,
      "creditCost": 76,
      "user": null,
      "userId": "inigo.github.actions@alvalabs.io",
      "roles": [
        "guest",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 229000
          },
          {
            "label": "request : get from cache",
            "duration": 27000
          },
          {
            "label": "request : check access",
            "duration": 3136000
          },
          {
            "label": "request : check rate limit",
            "duration": 97000
          },
          {
            "label": "request : check operation name",
            "duration": 3000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 1578000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "request : sent",
            "duration": 3000
          },
          {
            "label": "server : request done",
            "duration": 758626000
          },
          {
            "label": "response : get body",
            "duration": 27000
          },
          {
            "label": "response : update ratelimit",
            "duration": 10000
          },
          {
            "label": "response : attach errors",
            "duration": 35000
          },
          {
            "label": "response : reduct extensions",
            "duration": 25000
          },
          {
            "label": "async : queue time",
            "duration": 77000
          },
          {
            "label": "async : get header details",
            "duration": 113000
          },
          {
            "label": "async : analyze response",
            "duration": 130000
          },
          {
            "label": "async : update ratelimit",
            "duration": 26000
          },
          {
            "label": "async : collect variables",
            "duration": 203000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "CLI_ConfigCheck",
      "depth": 6,
      "height": 107,
      "queryHash": "4736506365358045007",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "33bb85b5-79ff-46dc-ab72-942dd2ce4ad2",
      "observedAt": "2024-07-16T13:32:42.994Z",
      "status": "PASSED",
      "serverProcessTime": 277,
      "sidecarProcessTime": 0,
      "creditCost": 1,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "CLI_Login",
      "depth": 1,
      "height": 1,
      "queryHash": "6846098210036725109",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "3bff9c2d-de94-46c3-a533-b0caf2973558",
      "observedAt": "2024-07-16T13:32:00.187Z",
      "status": "PASSED",
      "serverProcessTime": 76,
      "sidecarProcessTime": 3,
      "creditCost": 1,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 198000
          },
          {
            "label": "request : sanitize",
            "duration": 44000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 267000
          },
          {
            "label": "request : analyze",
            "duration": 79000
          },
          {
            "label": "request : check access",
            "duration": 2668000
          },
          {
            "label": "request : check rate limit",
            "duration": 99000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 111000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 76719000
          },
          {
            "label": "response : get body",
            "duration": 16000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 23000
          },
          {
            "label": "response : reduct extensions",
            "duration": 24000
          },
          {
            "label": "async : queue time",
            "duration": 24000
          },
          {
            "label": "async : get header details",
            "duration": 311000
          },
          {
            "label": "async : analyze response",
            "duration": 7000
          },
          {
            "label": "async : update ratelimit",
            "duration": 42000
          },
          {
            "label": "async : collect variables",
            "duration": 44000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "MUTATION",
      "operationName": "UI_User_ConfigBypass",
      "depth": 1,
      "height": 1,
      "queryHash": "1368961905530328326",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "f0d6ffbc-c612-4e0d-ad1c-9240c84faf1f",
      "observedAt": "2024-07-16T13:31:57.978Z",
      "status": "BLOCKED",
      "serverProcessTime": 0,
      "sidecarProcessTime": 3,
      "creditCost": 0,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 213000
          },
          {
            "label": "request : get from cache",
            "duration": 5000
          },
          {
            "label": "request : check access",
            "duration": 2780000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 31000
          },
          {
            "label": "response : reduct extensions",
            "duration": 23000
          },
          {
            "label": "response : attach errors",
            "duration": 30000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 38000
          },
          {
            "label": "async : queue time",
            "duration": 3000
          },
          {
            "label": "async : get header details",
            "duration": 125000
          },
          {
            "label": "async : update ratelimit",
            "duration": 43000
          },
          {
            "label": "async : collect variables",
            "duration": 93000
          },
          {
            "label": "async : post process errors",
            "duration": 4000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "INVALID_ACCESS": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "invalid access",
            "path": [
              "user.organization.invites"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "17fe7c1c-bce2-420f-9ec4-68c01de2ca6e",
      "observedAt": "2024-07-16T13:31:53.495Z",
      "status": "BLOCKED",
      "serverProcessTime": 0,
      "sidecarProcessTime": 3,
      "creditCost": 0,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 205000
          },
          {
            "label": "request : get from cache",
            "duration": 7000
          },
          {
            "label": "request : check access",
            "duration": 3339000
          },
          {
            "label": "response : update ratelimit",
            "duration": 11000
          },
          {
            "label": "response : attach errors",
            "duration": 42000
          },
          {
            "label": "response : reduct extensions",
            "duration": 33000
          },
          {
            "label": "response : attach errors",
            "duration": 43000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 48000
          },
          {
            "label": "async : queue time",
            "duration": 382000
          },
          {
            "label": "async : get header details",
            "duration": 160000
          },
          {
            "label": "async : update ratelimit",
            "duration": 33000
          },
          {
            "label": "async : collect variables",
            "duration": 85000
          },
          {
            "label": "async : post process errors",
            "duration": 6000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "INVALID_ACCESS": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "invalid access",
            "path": [
              "user.organization.invites"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "113b8dbd-3fc8-4d92-b074-f1299f8e33da",
      "observedAt": "2024-07-16T13:31:51.317Z",
      "status": "BLOCKED",
      "serverProcessTime": 0,
      "sidecarProcessTime": 5,
      "creditCost": 0,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 264000
          },
          {
            "label": "request : sanitize",
            "duration": 42000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 1424000
          },
          {
            "label": "request : analyze",
            "duration": 471000
          },
          {
            "label": "request : check access",
            "duration": 2691000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 22000
          },
          {
            "label": "response : reduct extensions",
            "duration": 82000
          },
          {
            "label": "response : attach errors",
            "duration": 46000
          },
          {
            "label": "response : reduct extensions",
            "duration": 8000
          },
          {
            "label": "request : sent",
            "duration": 91000
          },
          {
            "label": "async : queue time",
            "duration": 36000
          },
          {
            "label": "async : get header details",
            "duration": 129000
          },
          {
            "label": "async : update ratelimit",
            "duration": 25000
          },
          {
            "label": "async : collect variables",
            "duration": 76000
          },
          {
            "label": "async : post process errors",
            "duration": 52000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "INVALID_ACCESS": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "invalid access",
            "path": [
              "user.organization.invites"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "bf93c2b1-89dc-4626-aa4f-88e0db47d11c",
      "observedAt": "2024-07-16T13:31:37.068Z",
      "status": "PASSED",
      "serverProcessTime": 262,
      "sidecarProcessTime": 4,
      "creditCost": 98,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 242000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 3303000
          },
          {
            "label": "request : check rate limit",
            "duration": 100000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 621000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 262988000
          },
          {
            "label": "response : get body",
            "duration": 143000
          },
          {
            "label": "response : update ratelimit",
            "duration": 10000
          },
          {
            "label": "response : attach errors",
            "duration": 40000
          },
          {
            "label": "response : reduct extensions",
            "duration": 30000
          },
          {
            "label": "async : queue time",
            "duration": 74000
          },
          {
            "label": "async : get header details",
            "duration": 373000
          },
          {
            "label": "async : analyze response",
            "duration": 820000
          },
          {
            "label": "async : update ratelimit",
            "duration": 41000
          },
          {
            "label": "async : collect variables",
            "duration": 785000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetConfigGlobal",
      "depth": 8,
      "height": 430,
      "queryHash": "6105971188219142422",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "149ea3c7-3900-4173-81df-0b10312190e1",
      "observedAt": "2024-07-16T13:31:37.054Z",
      "status": "PASSED",
      "serverProcessTime": 50,
      "sidecarProcessTime": 4,
      "creditCost": 20,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 176000
          },
          {
            "label": "request : sanitize",
            "duration": 14000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 610000
          },
          {
            "label": "request : analyze",
            "duration": 331000
          },
          {
            "label": "request : check access",
            "duration": 3238000
          },
          {
            "label": "request : check rate limit",
            "duration": 86000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 78000
          },
          {
            "label": "response : reduct extensions",
            "duration": 14000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 50841000
          },
          {
            "label": "response : get body",
            "duration": 14000
          },
          {
            "label": "response : update ratelimit",
            "duration": 4000
          },
          {
            "label": "response : attach errors",
            "duration": 20000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "async : queue time",
            "duration": 75000
          },
          {
            "label": "async : get header details",
            "duration": 64000
          },
          {
            "label": "async : analyze response",
            "duration": 5000
          },
          {
            "label": "async : update ratelimit",
            "duration": 28000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "Ui_User_GetTeam",
      "depth": 4,
      "height": 6,
      "queryHash": "2039444917450639426",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "01308162-9cfe-4f98-b146-d94a8a4c2400",
      "observedAt": "2024-07-16T13:31:36.97Z",
      "status": "PASSED",
      "serverProcessTime": 685,
      "sidecarProcessTime": 5,
      "creditCost": 896,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 243000
          },
          {
            "label": "request : sanitize",
            "duration": 155000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 702000
          },
          {
            "label": "request : analyze",
            "duration": 1772000
          },
          {
            "label": "request : check access",
            "duration": 2452000
          },
          {
            "label": "request : check rate limit",
            "duration": 79000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 137000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 685558000
          },
          {
            "label": "response : get body",
            "duration": 30000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 33000
          },
          {
            "label": "response : reduct extensions",
            "duration": 20000
          },
          {
            "label": "async : queue time",
            "duration": 45000
          },
          {
            "label": "async : get header details",
            "duration": 581000
          },
          {
            "label": "async : analyze response",
            "duration": 139000
          },
          {
            "label": "async : update ratelimit",
            "duration": 34000
          },
          {
            "label": "async : collect variables",
            "duration": 234000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetReports",
      "depth": 10,
      "height": 127,
      "queryHash": "17212874692761424938",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "bdaaedd3-0541-49d7-84df-1a06474e6e93",
      "observedAt": "2024-07-16T13:31:35.402Z",
      "status": "PASSED",
      "serverProcessTime": 319,
      "sidecarProcessTime": 3,
      "creditCost": 57,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 156000
          },
          {
            "label": "request : get from cache",
            "duration": 4000
          },
          {
            "label": "request : check access",
            "duration": 2862000
          },
          {
            "label": "request : check rate limit",
            "duration": 126000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 94000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 319310000
          },
          {
            "label": "response : get body",
            "duration": 20000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 26000
          },
          {
            "label": "response : reduct extensions",
            "duration": 20000
          },
          {
            "label": "async : queue time",
            "duration": 21000
          },
          {
            "label": "async : get header details",
            "duration": 96000
          },
          {
            "label": "async : analyze response",
            "duration": 32000
          },
          {
            "label": "async : update ratelimit",
            "duration": 24000
          },
          {
            "label": "async : collect variables",
            "duration": 49000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetServices",
      "depth": 6,
      "height": 24,
      "queryHash": "2042019549550301894",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "64ec2f72-da5c-4a58-9ffb-10f78cc1d902",
      "observedAt": "2024-07-16T13:31:35.374Z",
      "status": "BLOCKED",
      "serverProcessTime": 0,
      "sidecarProcessTime": 3,
      "creditCost": 0,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 185000
          },
          {
            "label": "request : get from cache",
            "duration": 7000
          },
          {
            "label": "request : check access",
            "duration": 3169000
          },
          {
            "label": "response : update ratelimit",
            "duration": 11000
          },
          {
            "label": "response : attach errors",
            "duration": 37000
          },
          {
            "label": "response : reduct extensions",
            "duration": 33000
          },
          {
            "label": "response : attach errors",
            "duration": 45000
          },
          {
            "label": "response : reduct extensions",
            "duration": 12000
          },
          {
            "label": "request : sent",
            "duration": 53000
          },
          {
            "label": "async : queue time",
            "duration": 303000
          },
          {
            "label": "async : get header details",
            "duration": 202000
          },
          {
            "label": "async : update ratelimit",
            "duration": 78000
          },
          {
            "label": "async : collect variables",
            "duration": 132000
          },
          {
            "label": "async : post process errors",
            "duration": 5000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "INVALID_ACCESS": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "invalid access",
            "path": [
              "user.organization.invites"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "5c16059e-7310-4396-8566-6ad4c904c953",
      "observedAt": "2024-07-16T13:31:35.094Z",
      "status": "PASSED",
      "serverProcessTime": 55,
      "sidecarProcessTime": 4,
      "creditCost": 3,
      "user": null,
      "userId": "oguzhan@alvalabs.io",
      "roles": [
        "guest",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 305000
          },
          {
            "label": "request : sanitize",
            "duration": 23000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 861000
          },
          {
            "label": "request : analyze",
            "duration": 114000
          },
          {
            "label": "request : check access",
            "duration": 2483000
          },
          {
            "label": "request : check rate limit",
            "duration": 87000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 68000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 55172000
          },
          {
            "label": "response : get body",
            "duration": 11000
          },
          {
            "label": "response : update ratelimit",
            "duration": 24000
          },
          {
            "label": "response : attach errors",
            "duration": 20000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "async : queue time",
            "duration": 17000
          },
          {
            "label": "async : get header details",
            "duration": 288000
          },
          {
            "label": "async : analyze response",
            "duration": 10000
          },
          {
            "label": "async : update ratelimit",
            "duration": 120000
          },
          {
            "label": "async : post process errors",
            "duration": 2000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_CurrentUserInfo",
      "depth": 3,
      "height": 8,
      "queryHash": "5569900216096724238",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "1e2c9950-d3b7-4262-9d8c-865cd87f3f4e",
      "observedAt": "2024-07-16T13:30:18.017Z",
      "status": "PASSED",
      "serverProcessTime": 5,
      "sidecarProcessTime": 0,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e8b7995e-5910-4849-9111-4b0fc5e89af8",
      "observedAt": "2024-07-16T13:29:12.712Z",
      "status": "PASSED",
      "serverProcessTime": 254,
      "sidecarProcessTime": 4,
      "creditCost": 46,
      "user": null,
      "userId": "inigo.github.actions@alvalabs.io",
      "roles": [
        "guest",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 312000
          },
          {
            "label": "request : sanitize",
            "duration": 36000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 620000
          },
          {
            "label": "request : analyze",
            "duration": 177000
          },
          {
            "label": "request : check access",
            "duration": 3086000
          },
          {
            "label": "request : check rate limit",
            "duration": 103000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 129000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 254397000
          },
          {
            "label": "response : get body",
            "duration": 15000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 24000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "async : queue time",
            "duration": 52000
          },
          {
            "label": "async : get header details",
            "duration": 198000
          },
          {
            "label": "async : analyze response",
            "duration": 31000
          },
          {
            "label": "async : update ratelimit",
            "duration": 24000
          },
          {
            "label": "async : collect variables",
            "duration": 166000
          },
          {
            "label": "async : post process errors",
            "duration": 6000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "CFG_QueryDataFieldsUsage",
      "depth": 5,
      "height": 10,
      "queryHash": "3180607325409436676",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e8b7995e-5910-4849-9111-4b0fc5e89af8",
      "observedAt": "2024-07-16T13:29:12.297Z",
      "status": "PASSED",
      "serverProcessTime": 745,
      "sidecarProcessTime": 5,
      "creditCost": 74,
      "user": null,
      "userId": "inigo.github.actions@alvalabs.io",
      "roles": [
        "guest",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 382000
          },
          {
            "label": "request : get from cache",
            "duration": 11000
          },
          {
            "label": "request : check access",
            "duration": 3244000
          },
          {
            "label": "request : check rate limit",
            "duration": 88000
          },
          {
            "label": "request : check operation name",
            "duration": 3000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 2158000
          },
          {
            "label": "response : reduct extensions",
            "duration": 31000
          },
          {
            "label": "request : sent",
            "duration": 3000
          },
          {
            "label": "server : request done",
            "duration": 745510000
          },
          {
            "label": "response : get body",
            "duration": 20000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 18000
          },
          {
            "label": "response : reduct extensions",
            "duration": 14000
          },
          {
            "label": "async : queue time",
            "duration": 38000
          },
          {
            "label": "async : get header details",
            "duration": 312000
          },
          {
            "label": "async : analyze response",
            "duration": 258000
          },
          {
            "label": "async : update ratelimit",
            "duration": 19000
          },
          {
            "label": "async : collect variables",
            "duration": 169000
          },
          {
            "label": "async : post process errors",
            "duration": 35000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "CLI_ConfigCheck",
      "depth": 6,
      "height": 107,
      "queryHash": "4736506365358045007",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "ab3599cd-abb6-4997-b8e4-2df1ef869dc4",
      "observedAt": "2024-07-16T13:28:45.13Z",
      "status": "PASSED",
      "serverProcessTime": 403,
      "sidecarProcessTime": 0,
      "creditCost": 1,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "CLI_Login",
      "depth": 1,
      "height": 1,
      "queryHash": "6846098210036725109",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "28744358-5968-4043-8b41-af23332015da",
      "observedAt": "2024-07-16T13:25:17.812Z",
      "status": "PASSED",
      "serverProcessTime": 6,
      "sidecarProcessTime": 0,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "9f62a369-0a99-457d-adf3-8f9b99ffd584",
      "observedAt": "2024-07-16T13:20:17.61Z",
      "status": "PASSED",
      "serverProcessTime": 8,
      "sidecarProcessTime": 0,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "6e71e1a5-b1af-4ce0-90f6-2ae1ec14db56",
      "observedAt": "2024-07-16T13:15:17.414Z",
      "status": "PASSED",
      "serverProcessTime": 6,
      "sidecarProcessTime": 0,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "aab370d3-16db-482a-b040-2ac6c891914f",
      "observedAt": "2024-07-16T13:10:17.267Z",
      "status": "PASSED",
      "serverProcessTime": 5,
      "sidecarProcessTime": 0,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "7c352bed-a379-4367-9fa1-c3470bd8aca3",
      "observedAt": "2024-07-16T13:05:17.104Z",
      "status": "PASSED",
      "serverProcessTime": 7,
      "sidecarProcessTime": 0,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "7376706c-0df2-43fa-a0da-826f23477f6e",
      "observedAt": "2024-07-16T13:01:10.494Z",
      "status": "PASSED",
      "serverProcessTime": 26,
      "sidecarProcessTime": 3,
      "creditCost": 2,
      "user": null,
      "userId": "ops@sibipro.com",
      "roles": [
        "guest",
        "admin",
        "configurator",
        "viewer",
        "guest",
        "reviewer"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 169000
          },
          {
            "label": "request : sanitize",
            "duration": 44000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 305000
          },
          {
            "label": "request : analyze",
            "duration": 96000
          },
          {
            "label": "request : check access",
            "duration": 2774000
          },
          {
            "label": "request : check rate limit",
            "duration": 96000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 8000
          },
          {
            "label": "request : check max height",
            "duration": 2000
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 93000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 26178000
          },
          {
            "label": "response : get body",
            "duration": 21000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 24000
          },
          {
            "label": "response : reduct extensions",
            "duration": 21000
          },
          {
            "label": "async : queue time",
            "duration": 621000
          },
          {
            "label": "async : get header details",
            "duration": 70000
          },
          {
            "label": "async : analyze response",
            "duration": 5000
          },
          {
            "label": "async : update ratelimit",
            "duration": 38000
          },
          {
            "label": "async : collect variables",
            "duration": 75000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "MUTATION",
      "operationName": "CLI_PublishComposedSchema",
      "depth": 2,
      "height": 3,
      "queryHash": "12000459003905980679",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "3c2b6f74-57df-49d1-99e3-8c2761f2149d",
      "observedAt": "2024-07-16T13:01:09.634Z",
      "status": "PASSED",
      "serverProcessTime": 433,
      "sidecarProcessTime": 5,
      "creditCost": 1,
      "user": null,
      "userId": "ops@sibipro.com",
      "roles": [
        "guest",
        "admin",
        "configurator",
        "viewer",
        "guest",
        "reviewer"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 298000
          },
          {
            "label": "request : sanitize",
            "duration": 80000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 685000
          },
          {
            "label": "request : analyze",
            "duration": 1555000
          },
          {
            "label": "request : check access",
            "duration": 2711000
          },
          {
            "label": "request : check rate limit",
            "duration": 85000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 183000
          },
          {
            "label": "response : reduct extensions",
            "duration": 12000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 433456000
          },
          {
            "label": "response : get body",
            "duration": 14000
          },
          {
            "label": "response : update ratelimit",
            "duration": 8000
          },
          {
            "label": "response : attach errors",
            "duration": 35000
          },
          {
            "label": "response : reduct extensions",
            "duration": 22000
          },
          {
            "label": "async : queue time",
            "duration": 2482000
          },
          {
            "label": "async : get header details",
            "duration": 73000
          },
          {
            "label": "async : analyze response",
            "duration": 112000
          },
          {
            "label": "async : update ratelimit",
            "duration": 176000
          },
          {
            "label": "async : collect variables",
            "duration": 227000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "MUTATION",
      "operationName": "CLI_ConfigApply",
      "depth": 6,
      "height": 107,
      "queryHash": "18146594431931357231",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "d6b23468-94d4-4a46-b257-fd5adc7615c7",
      "observedAt": "2024-07-16T13:01:07.815Z",
      "status": "PASSED",
      "serverProcessTime": 278,
      "sidecarProcessTime": 0,
      "creditCost": 1,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "CLI_Login",
      "depth": 1,
      "height": 1,
      "queryHash": "6846098210036725109",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "1d5d29f8-c03e-4b17-91ce-bcb9217eccb9",
      "observedAt": "2024-07-16T13:00:16.903Z",
      "status": "PASSED",
      "serverProcessTime": 7,
      "sidecarProcessTime": 0,
      "creditCost": 2,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "uptime",
      "depth": 2,
      "height": 2,
      "queryHash": "7179156288749557984",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "d730e784-eafc-4030-8193-56466b381bb1",
      "observedAt": "2024-07-16T12:58:59.984Z",
      "status": "PASSED",
      "serverProcessTime": 299,
      "sidecarProcessTime": 5,
      "creditCost": 1,
      "user": null,
      "userId": "ops@sibipro.com",
      "roles": [
        "guest",
        "admin",
        "configurator",
        "viewer",
        "guest",
        "reviewer"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 256000
          },
          {
            "label": "request : sanitize",
            "duration": 83000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 555000
          },
          {
            "label": "request : analyze",
            "duration": 1271000
          },
          {
            "label": "request : check access",
            "duration": 2828000
          },
          {
            "label": "request : check rate limit",
            "duration": 78000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 125000
          },
          {
            "label": "response : reduct extensions",
            "duration": 14000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 299209000
          },
          {
            "label": "response : get body",
            "duration": 36000
          },
          {
            "label": "response : update ratelimit",
            "duration": 5000
          },
          {
            "label": "response : attach errors",
            "duration": 21000
          },
          {
            "label": "response : reduct extensions",
            "duration": 18000
          },
          {
            "label": "async : queue time",
            "duration": 2479000
          },
          {
            "label": "async : get header details",
            "duration": 84000
          },
          {
            "label": "async : analyze response",
            "duration": 94000
          },
          {
            "label": "async : update ratelimit",
            "duration": 87000
          },
          {
            "label": "async : collect variables",
            "duration": 143000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "CLI_ConfigCheck",
      "depth": 6,
      "height": 107,
      "queryHash": "4736506365358045007",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "93004171-6c0d-47f0-9b00-9add0ee0ea19",
      "observedAt": "2024-07-16T12:58:44.636Z",
      "status": "PASSED",
      "serverProcessTime": 379,
      "sidecarProcessTime": 1,
      "creditCost": 1,
      "user": null,
      "userId": "",
      "roles": [
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": null,
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "CLI_Login",
      "depth": 1,
      "height": 1,
      "queryHash": "6846098210036725109",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "947c1f27-268f-4969-b8e4-1a197ec15944",
      "observedAt": "2024-07-16T12:56:25.818Z",
      "status": "PASSED",
      "serverProcessTime": 10,
      "sidecarProcessTime": 3,
      "creditCost": 1,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 155000
          },
          {
            "label": "request : sanitize",
            "duration": 13000
          },
          {
            "label": "request : introspection check",
            "duration": 0
          },
          {
            "label": "request : parse",
            "duration": 287000
          },
          {
            "label": "request : analyze",
            "duration": 50000
          },
          {
            "label": "request : check access",
            "duration": 2425000
          },
          {
            "label": "request : check rate limit",
            "duration": 186000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 51000
          },
          {
            "label": "response : reduct extensions",
            "duration": 13000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 10959000
          },
          {
            "label": "response : get body",
            "duration": 13000
          },
          {
            "label": "response : update ratelimit",
            "duration": 3000
          },
          {
            "label": "response : attach errors",
            "duration": 18000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "async : queue time",
            "duration": 109000
          },
          {
            "label": "async : get header details",
            "duration": 93000
          },
          {
            "label": "async : analyze response",
            "duration": 3000
          },
          {
            "label": "async : update ratelimit",
            "duration": 16000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_Secrets",
      "depth": 2,
      "height": 2,
      "queryHash": "14064997649146021824",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "f25d77d8-0625-4259-b736-cd0304ef2200",
      "observedAt": "2024-07-16T12:56:25.589Z",
      "status": "PASSED",
      "serverProcessTime": 83,
      "sidecarProcessTime": 5,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 173000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 4517000
          },
          {
            "label": "request : check rate limit",
            "duration": 247000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 5000
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 313000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 83975000
          },
          {
            "label": "response : get body",
            "duration": 22000
          },
          {
            "label": "response : update ratelimit",
            "duration": 32000
          },
          {
            "label": "response : attach errors",
            "duration": 29000
          },
          {
            "label": "response : reduct extensions",
            "duration": 22000
          },
          {
            "label": "async : queue time",
            "duration": 89000
          },
          {
            "label": "async : get header details",
            "duration": 90000
          },
          {
            "label": "async : analyze response",
            "duration": 521000
          },
          {
            "label": "async : update ratelimit",
            "duration": 27000
          },
          {
            "label": "async : collect variables",
            "duration": 626000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetConfigGlobal",
      "depth": 8,
      "height": 430,
      "queryHash": "6105971188219142422",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "e23e7e66-f255-4f36-8454-517e7c6f2b72",
      "observedAt": "2024-07-16T12:56:25.576Z",
      "status": "PASSED",
      "serverProcessTime": 65,
      "sidecarProcessTime": 4,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 275000
          },
          {
            "label": "request : get from cache",
            "duration": 5000
          },
          {
            "label": "request : check access",
            "duration": 3629000
          },
          {
            "label": "request : check rate limit",
            "duration": 178000
          },
          {
            "label": "request : check operation name",
            "duration": 5000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 301000
          },
          {
            "label": "response : reduct extensions",
            "duration": 19000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 65668000
          },
          {
            "label": "response : get body",
            "duration": 61000
          },
          {
            "label": "response : update ratelimit",
            "duration": 10000
          },
          {
            "label": "response : attach errors",
            "duration": 25000
          },
          {
            "label": "response : reduct extensions",
            "duration": 65000
          },
          {
            "label": "async : queue time",
            "duration": 84000
          },
          {
            "label": "async : get header details",
            "duration": 95000
          },
          {
            "label": "async : analyze response",
            "duration": 894000
          },
          {
            "label": "async : update ratelimit",
            "duration": 65000
          },
          {
            "label": "async : collect variables",
            "duration": 640000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetConfigGlobal",
      "depth": 8,
      "height": 430,
      "queryHash": "6105971188219142422",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "76ec2f76-c270-46bb-b2de-5f997ccdb220",
      "observedAt": "2024-07-16T12:56:25.576Z",
      "status": "PASSED",
      "serverProcessTime": 27,
      "sidecarProcessTime": 2,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 186000
          },
          {
            "label": "request : sanitize",
            "duration": 14000
          },
          {
            "label": "request : introspection check",
            "duration": 0
          },
          {
            "label": "request : parse",
            "duration": 184000
          },
          {
            "label": "request : analyze",
            "duration": 62000
          },
          {
            "label": "request : check access",
            "duration": 2133000
          },
          {
            "label": "request : check rate limit",
            "duration": 66000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 41000
          },
          {
            "label": "response : reduct extensions",
            "duration": 12000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 27682000
          },
          {
            "label": "response : get body",
            "duration": 14000
          },
          {
            "label": "response : update ratelimit",
            "duration": 4000
          },
          {
            "label": "response : attach errors",
            "duration": 18000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "async : queue time",
            "duration": 44000
          },
          {
            "label": "async : get header details",
            "duration": 58000
          },
          {
            "label": "async : analyze response",
            "duration": 4000
          },
          {
            "label": "async : update ratelimit",
            "duration": 81000
          },
          {
            "label": "async : post process errors",
            "duration": 1000
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "Ui_User_GetTeam",
      "depth": 4,
      "height": 6,
      "queryHash": "2039444917450639426",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "57b89ec4-0d06-4e7c-950c-6ecc760f73f4",
      "observedAt": "2024-07-16T12:56:25.559Z",
      "status": "PASSED",
      "serverProcessTime": 18,
      "sidecarProcessTime": 4,
      "creditCost": 4,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 445000
          },
          {
            "label": "request : sanitize",
            "duration": 15000
          },
          {
            "label": "request : introspection check",
            "duration": 1000
          },
          {
            "label": "request : parse",
            "duration": 313000
          },
          {
            "label": "request : analyze",
            "duration": 110000
          },
          {
            "label": "request : check access",
            "duration": 3080000
          },
          {
            "label": "request : check rate limit",
            "duration": 97000
          },
          {
            "label": "request : check operation name",
            "duration": 1000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 70000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 18662000
          },
          {
            "label": "response : get body",
            "duration": 14000
          },
          {
            "label": "response : update ratelimit",
            "duration": 4000
          },
          {
            "label": "response : attach errors",
            "duration": 19000
          },
          {
            "label": "response : reduct extensions",
            "duration": 16000
          },
          {
            "label": "async : queue time",
            "duration": 431000
          },
          {
            "label": "async : get header details",
            "duration": 80000
          },
          {
            "label": "async : analyze response",
            "duration": 7000
          },
          {
            "label": "async : update ratelimit",
            "duration": 18000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "Ui_User_GetTeam",
      "depth": 4,
      "height": 6,
      "queryHash": "2039444917450639426",
      "impact": "unknown"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "528bb031-bf6c-49b4-9147-176b442131f8",
      "observedAt": "2024-07-16T12:56:25.229Z",
      "status": "PASSED",
      "serverProcessTime": 139,
      "sidecarProcessTime": 3,
      "creditCost": 7,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 194000
          },
          {
            "label": "request : get from cache",
            "duration": 6000
          },
          {
            "label": "request : check access",
            "duration": 2915000
          },
          {
            "label": "request : check rate limit",
            "duration": 235000
          },
          {
            "label": "request : check operation name",
            "duration": 2000
          },
          {
            "label": "request : check max size",
            "duration": 0
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 0
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 96000
          },
          {
            "label": "response : reduct extensions",
            "duration": 21000
          },
          {
            "label": "request : sent",
            "duration": 1000
          },
          {
            "label": "server : request done",
            "duration": 139537000
          },
          {
            "label": "response : get body",
            "duration": 49000
          },
          {
            "label": "response : update ratelimit",
            "duration": 7000
          },
          {
            "label": "response : attach errors",
            "duration": 22000
          },
          {
            "label": "response : reduct extensions",
            "duration": 23000
          },
          {
            "label": "async : queue time",
            "duration": 202000
          },
          {
            "label": "async : get header details",
            "duration": 104000
          },
          {
            "label": "async : analyze response",
            "duration": 39000
          },
          {
            "label": "async : update ratelimit",
            "duration": 26000
          },
          {
            "label": "async : collect variables",
            "duration": 107000
          },
          {
            "label": "async : post process errors",
            "duration": 9000
          }
        ]
      },
      "errorReasonsMap": {
        "map": {
          "SERVER_ERROR": [
            0
          ]
        }
      },
      "errors": {
        "errors": [
          {
            "message": "ent: user_data not found",
            "path": [
              "user.organization.data"
            ]
          }
        ]
      },
      "operationType": "QUERY",
      "operationName": "Ui_User_OnboardingData",
      "depth": 7,
      "height": 33,
      "queryHash": "11522912692427867026",
      "impact": "low"
    }
  },
  {
    "node": {
      "id": 0,
      "traceID": "0f2f325d-ae75-420f-8c4b-1fc7d70c1130",
      "observedAt": "2024-07-16T12:56:25.227Z",
      "status": "PASSED",
      "serverProcessTime": 143,
      "sidecarProcessTime": 4,
      "creditCost": 5,
      "user": null,
      "userId": "mskorokhodov+meetup@inigo.io",
      "roles": [
        "guest",
        "owner",
        "admin",
        "reviewer",
        "configurator",
        "viewer",
        "guest"
      ],
      "internalReason": "NONE",
      "internalError": "",
      "internalStack": "",
      "stopwatchProfile": {
        "steps": [
          {
            "label": "request : get profile",
            "duration": 223000
          },
          {
            "label": "request : get from cache",
            "duration": 7000
          },
          {
            "label": "request : check access",
            "duration": 3495000
          },
          {
            "label": "request : check rate limit",
            "duration": 329000
          },
          {
            "label": "request : check operation name",
            "duration": 7000
          },
          {
            "label": "request : check max size",
            "duration": 1000
          },
          {
            "label": "request : check max depth",
            "duration": 0
          },
          {
            "label": "request : check max height",
            "duration": 0
          },
          {
            "label": "request : check max directives",
            "duration": 1000
          },
          {
            "label": "request : check max root mutations",
            "duration": 0
          },
          {
            "label": "response : attach errors",
            "duration": 140000
          },
          {
            "label": "response : reduct extensions",
            "duration": 33000
          },
          {
            "label": "request : sent",
            "duration": 2000
          },
          {
            "label": "server : request done",
            "duration": 143689000
          },
          {
            "label": "response : get body",
            "duration": 12000
          },
          {
            "label": "response : update ratelimit",
            "duration": 6000
          },
          {
            "label": "response : attach errors",
            "duration": 30000
          },
          {
            "label": "response : reduct extensions",
            "duration": 17000
          },
          {
            "label": "async : queue time",
            "duration": 33000
          },
          {
            "label": "async : get header details",
            "duration": 272000
          },
          {
            "label": "async : analyze response",
            "duration": 51000
          },
          {
            "label": "async : update ratelimit",
            "duration": 23000
          },
          {
            "label": "async : collect variables",
            "duration": 71000
          },
          {
            "label": "async : post process errors",
            "duration": 0
          }
        ]
      },
      "errorReasonsMap": null,
      "errors": null,
      "operationType": "QUERY",
      "operationName": "UI_User_GetServices",
      "depth": 6,
      "height": 24,
      "queryHash": "2042019549550301894",
      "impact": "unknown"
    }
  }
]

export const DataTableDemo = () => {
  return (
    <div style={{ padding: 'var(--gutter-regular)', height: '100%', overflowY: 'auto' }}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};