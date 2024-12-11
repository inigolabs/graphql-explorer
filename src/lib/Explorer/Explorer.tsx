import classNames from "classnames";
import {
  DefinitionNode,
  DocumentNode,
  ExecutionResult,
  getIntrospectionQuery,
  getOperationAST,
  IntrospectionQuery,
  parse,
  print,
} from "graphql";
import { createClient, Sink } from "graphql-ws";
import { debounce, get, throttle } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getOperationName } from "@apollo/client/utilities";

import AutoComplete from "../components/AutoComplete/AutoComplete";
import Button from "../components/Button/Button";
import Checkbox from "../components/Checkbox/Checkbox";
import CodeEditor from "../components/code-editor";
import { ICodeEditorRef } from "../components/code-editor/code-editor.types";
import Form from "../components/Form/Form";
import { FormRef } from "../components/Form/Form.types";
import Icon, {
  AddCircle,
  ArrowLeft,
  ArrowRight,
  Close,
  IconCollectionsFilled,
  IconInfo,
  IconLocked,
  IconUnlocked,
} from "../components/Icon/Icon";
import { DATE_PREDEFINED_FILTERS } from "../components/Menu/DateMenu";
import { MessageType } from "../components/MessagesWrapper/MessagesWrapper.types";
import { message } from "../components/MessagesWrapper/MessagesWrapper.utils";
import Modal from "../components/Modal/Modal";
import {
  ISchemaPropsItemProperty,
  ISchemaPropsItemPropertyTypeDef,
  ISchemaPropsItemType,
  ISchemaPropsModel,
} from "../components/Schema/Schema.types";
import Select, { Option as SelectOption } from "../components/Select/Select";
import TextInput from "../components/TextInput/TextInput";
import Tooltip, { TooltipPosition } from "../components/Tooltip/Tooltip";
import { useWindowSize } from "../utils/helpers";
import localPreferences, {
  ILocalPreferencesData,
} from "../utils/localPreferences";
import {
  deleteQueryParamByName,
  getQueryParamByName,
} from "../utils/queryParams";
import { Maybe } from "../utils/types";
import ExplorerRequest, { RequestRef } from "./components/Request/Request";
import ExplorerResponse from "./components/Response/Response";
import ExplorerSidebar from "./components/Sidebar/Sidebar";
import styles from "./Explorer.module.css";

// Function to parse the type details from introspection query
function parseTypeDetails(type: any): ISchemaPropsItemPropertyTypeDef {
  const typeDef: ISchemaPropsItemPropertyTypeDef = {
    Index: type.index || 0,
    TypeName: type.name || "",
    Required: type.kind === "NON_NULL",
  };

  if (type.ofType) {
    typeDef.List = parseTypeDetails(type.ofType);
  }

  return typeDef;
}

// Function to map GraphQL kind to ISchemaPropsItemType
function mapKindToItemType(kind: string): ISchemaPropsItemType {
  switch (kind) {
    case "OBJECT":
      return ISchemaPropsItemType.Types;
    case "INPUT_OBJECT":
      return ISchemaPropsItemType.Inputs;
    case "INTERFACE":
      return ISchemaPropsItemType.Interfaces;
    case "ENUM":
      return ISchemaPropsItemType.Enums;
    case "UNION":
      return ISchemaPropsItemType.Unions;
    case "SCALAR":
      return ISchemaPropsItemType.Scalars;
    case "SCHEMA":
      return ISchemaPropsItemType.Schema;
    default:
      return ISchemaPropsItemType.Types; // default to Types if kind is not matched
  }
}

// Function to format introspection query response
export function formatIntrospectionResponse(
  introspectionData: any
): ISchemaPropsModel {
  const schema: ISchemaPropsModel = introspectionData.__schema.types.map(
    (type: any) => {
      let properties: ISchemaPropsItemProperty[] = [];

      if (type.fields || type.inputFields) {
        properties = (type.fields || type.inputFields).map(
          (field: any, index: number) => ({
            name: field.name,
            count: field.count || 0,
            calls: field.calls || 0,
            tags: field.tags || [],
            type: field.type.name,
            description: field.description || "",
            typeDetails: {
              Name: field.name,
              DefaultValue: field.defaultValue || null,
              Index: index,
              Type: parseTypeDetails(field.type),
            },
            args: field.args?.reduce(
              (acc: Record<string, any>, arg: any, argIndex: number) => {
                acc[arg.name] = {
                  Name: arg.name,
                  DefaultValue: arg.defaultValue || null,
                  Index: argIndex,
                  Type: parseTypeDetails(arg.type),
                };
                return acc;
              },
              {}
            ),
          })
        );
      }

      if (type.enumValues) {
        properties = type.enumValues.map((enumValue: any, index: number) => ({
          name: enumValue.name,
          count: enumValue.count || 0,
          calls: enumValue.calls || 0,
          tags: enumValue.tags || [],
          type: type.name,
          description: enumValue.description || "",
          typeDetails: {
            Name: enumValue.name,
            Index: index,
            Type: parseTypeDetails(type),
          },
        }));
      }

      return {
        name: type.name,
        type: mapKindToItemType(type.kind),
        tags: type.tags || [],
        description: type.description || "",
        properties,
        implements: type.interfaces?.map((iface: any) => iface.name) || [],
      };
    }
  );

  return schema;
}

// subscription
// (async () => {
//   const subscription = client.iterate({
//     query: 'subscription { greetings }',
//   });

//   for await (const event of subscription) {

//   }
// })();

export interface ExplorerFetcherOptions {
  query?: string;
  operationName?: string;
  variables?: Record<string, any>;
  extensions?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface ExplorerCorsFetcherOptions {
  url?: string;
  query?: string;
  operationName?: string;
  variables?: Record<string, any>;
  extensions?: Record<string, any>;
  headers?: Record<string, string>;
}

export const guuid = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export interface ExplorerTabInfoResponse {
  data: any;
  headers?: Maybe<any>;
  status?: Maybe<number>;
  sent?: Maybe<number>;
  time: number;
  size?: Maybe<number>;
  traceId?: Maybe<string>;
}

export interface ExplorerTabInfo {
  query?: Maybe<string>;
  variables: Maybe<string>;
  extensions?: Maybe<string>;
  response?: Maybe<ExplorerTabInfoResponse>;
}

export interface ExplorerTabHistoryItem extends ExplorerTabInfo {
  operationName?: Maybe<string | null>;
  serviceKey?: Maybe<{
    name: string;
    label?: Maybe<string>;
  }>;
  createdAt: string;
}

export interface ExplorerTab extends ExplorerTabInfo {
  id: string;
  doc?: Maybe<ReturnType<typeof parse>>;
  docLastQuery?: Maybe<string>;
  operationId?: Maybe<string>;
  collectionId?: Maybe<string>;
  collectionName?: Maybe<string>;
  isHistoryTab?: Maybe<boolean>;
}

export interface ExplorerCollectionOperation
  extends Pick<ExplorerTabInfo, "query" | "variables"> {
  name: string;
}

export interface ExplorerCollection {
  id: string;
  name: string;
  operations: ExplorerCollectionOperation[];
}

export type ExplorerInputField =
  | string
  | {
      name: string;
      label?: string;
      secured?: boolean;
    };

const getDefaultValue = (
  preferencesKey: keyof ILocalPreferencesData["explorer"],
  defaultValue: any
) => {
  if (import.meta.env.VITE_EXPLORER) {
    return localPreferences.get("explorer")[preferencesKey] ?? defaultValue;
  }

  return defaultValue;
};

interface ExplorerProps {
  defaultState?: ILocalPreferencesData["explorer"];
  serviceKey?: Maybe<{
    name: string;
    label?: Maybe<string>;
  }>;
  access?: "admin" | "user";
  onStateChange?: (state: ILocalPreferencesData["explorer"]) => void;
  theme?: "light" | "dark";
}

export default function Explorer(props: ExplorerProps) {
  useEffect(() => {
    document.title = `Explorer | Inigo`;
  }, []);

  const inputModalRef = useRef<any>(null);
  const inputFormRef = useRef<FormRef>(null);
  const onInputModalSubmitRef = useRef<(() => void) | null>(null);
  const onInputModalHideRef = useRef<(() => void) | null>(null);
  const [inputModalFields, setInputModalFields] = useState<
    ExplorerInputField[]
  >([]);
  const [inputModalData, setInputModalData] = useState<Record<string, any>>({});

  const requestRef = useRef<RequestRef>(null);

  const showInputModal = useCallback(
    (fields: ExplorerInputField[]) => {
      inputModalRef.current?.open();

      return new Promise((resolve) => {
        setInputModalData({});
        setInputModalFields(fields);
        onInputModalSubmitRef.current = () => {
          resolve(inputFormRef.current?.getValue() || {});
          inputModalRef.current?.close();
          inputFormRef.current?.clear();
        };

        onInputModalHideRef.current = () => {
          resolve({});
          inputModalRef.current?.close();
          inputFormRef.current?.clear();
        };
      });
    },
    [inputModalRef]
  );

  const onInputModalHide = useCallback(() => {
    if (onInputModalHideRef.current) {
      onInputModalHideRef.current();
    }
  }, [onInputModalHideRef]);

  const submitInputModal = useCallback(() => {
    if (onInputModalSubmitRef.current) {
      onInputModalSubmitRef.current();
    }
  }, [onInputModalSubmitRef]);

  const [collections, setCollections] = useState<ExplorerCollection[]>(
    getDefaultValue("collections", [])
  );
  const [sharedCollections, setSharedCollections] = useState<
    ExplorerCollection[]
  >([]);

  const preflightModalRef = useRef<any>(null);

  const [preflightFailed, setPreflightFailed] = useState<boolean>(
    getDefaultValue("preflightEnabled", false)
  );
  const [preflightOutput, setPreflightOutput] = useState<string[]>([]);

  const [preflightScript, setPreflightScript] = useState<string>(
    getDefaultValue("preflightScript", "")
  );
  const [preflightEnabled, setPreflightEnabled] = useState<boolean>(
    localPreferences.get("explorer").preflightEnabled || true
  );

  const envVariablesModalRef = useRef<any>(null);
  const envVariablesEditorRef = useRef<ICodeEditorRef>(null);
  const [envVariables, setEnvVariables] = useState<string>(
    localPreferences.get("explorer").envVariables || ""
  );
  const throttledSetEnvVariables = useMemo(
    () => throttle(setEnvVariables, 500),
    []
  );

  const [proxyEnabled, setProxyEnabled] = useState<boolean>(
    localPreferences.get("explorer").proxyEnabled || false
  );
  const [historyEnabled, setHistoryEnabled] = useState<boolean>(
    localPreferences.get("explorer").historyEnabled || true
  );

  const [url, setUrl] = useState<string>(
    getDefaultValue("url", props.defaultState?.url || "")
  );

  const throttledSetUrl = useMemo(
    () =>
      debounce((value: string) => {
        message({
          type: MessageType.Success,
          text: "GraphQL endpoint updated",
        });

        return setUrl(value);
      }, 1000),
    []
  );
  const [schema, setSchema] = useState<IntrospectionQuery>();

  const [history, setHistory] = useState<ExplorerTabHistoryItem[]>(
    localPreferences.get("explorer").history ?? []
  );

  const deleteHistory = useCallback(() => {
    const cachedHistory = [...history];
    setHistory([]);
    setTabs((prev) => prev.filter((tab) => !tab.isHistoryTab));

    message({
      type: MessageType.Success,
      text: "History cleared",
      action: {
        label: "Undo",
        onClick: () => {
          setHistory(cachedHistory);
        },
      },
    });
  }, [history]);

  const deleteHistoryItem = useCallback(
    (itemToDelete: ExplorerTabHistoryItem) => {
      setHistory((prev) => prev.filter((item) => item !== itemToDelete));

      message({
        type: MessageType.Success,
        text: `${
          itemToDelete.operationName
            ? `"${itemToDelete.operationName}"`
            : "History item"
        } has been deleted`,
        action: {
          label: "Undo",
          onClick: () => {
            setHistory((prev) => [...prev, itemToDelete]);
          },
        },
      });
    },
    [history]
  );

  const [headers, setHeaders] = useState<string>(
    localPreferences.get("explorer").headers ?? ""
  );

  const [tabs, setTabs] = useState<ExplorerTab[]>(
    getDefaultValue("tabs", [
      {
        id: guuid(),
        query: "",
        variables: "{}",
      },
    ])
  );

  const [selectedOperationName, setSelectedOperationName] = useState<
    string | undefined
  >();
  const [queryCursorPosition, setQueryCursorPosition] = useState<{
    lineNumber: number;
    column: number;
  }>({
    lineNumber: 0,
    column: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTabs((prev) => {
      let shouldUpdate = false;

      const newTabs = prev.map((tab) => {
        if (tab.docLastQuery !== tab.query) {
          if (tab.query) {
            try {
              tab.doc = parse(tab.query);
            } catch (e) {}
          } else {
            tab.doc = undefined;
          }

          tab.docLastQuery = tab.query;
          shouldUpdate = true;
        }

        return tab;
      });

      if (shouldUpdate) {
        return newTabs;
      }

      return prev;
    });
  }, [tabs]);

  const [activeTabId, _setActiveTabId] = useState<string>(
    getDefaultValue("activeTabId", tabs?.[0]?.id)
  );
  const activeTabIdRef = useRef<string>();

  const [isSubscriptionActive, setIsSubscriptionActive] =
    useState<boolean>(false);
  const [terminateSubscription, setTerminateSubscription] = useState<
    (() => void) | null
  >(null);

  const setActiveTabId = useCallback(
    (id: string) => {
      _setActiveTabId(id);

      if (isSubscriptionActive) {
        if (terminateSubscription) {
          terminateSubscription();
        }

        setTerminateSubscription(null);
        setIsSubscriptionActive(false);
      }
    },
    [terminateSubscription, isSubscriptionActive]
  );

  useEffect(() => {
    activeTabIdRef.current = activeTabId;
  }, [activeTabId]);

  useEffect(() => {
    if (tabs.some((tab) => tab.id === activeTabId)) {
      return;
    }

    if (tabs.length === 0) {
      return;
    }

    setActiveTabId(tabs[0].id);
  }, [tabs, activeTabId]);

  const tabsRef = useRef<ExplorerTab[]>(tabs);

  useEffect(() => {
    tabsRef.current = tabs;
  }, [tabs]);

  const getTabById = useCallback(
    (id: string, tabsToSearch: ExplorerTab[] = tabs) => {
      return tabsToSearch.find((tab) => tab.id === id);
    },
    [tabs]
  );

  const updateActiveTab = useCallback(
    (update: React.SetStateAction<ExplorerTab>) => {
      setTabs((prev) =>
        prev.map((prevItem) => {
          let result = prevItem;

          if (prevItem.id === activeTabIdRef.current) {
            result = typeof update === "function" ? update(prevItem) : update;
          }

          // updateQueryParams({ query: result.query }, 'replace');

          return result;
        })
      );
    },
    []
  );

  const deleteTabById = useCallback(
    (id: string) => {
      setTabs((prev) => {
        const result = prev.filter((prevTab) => prevTab.id !== id);

        if (result.length === 0) {
          return [
            {
              id: guuid(),
              query: "",
              variables: "{}",
              headers: "{}",
              history: [],
            },
          ];
        }

        return result;
      });
    },
    [tabs]
  );

  const activeTab = useMemo(
    () => getTabById(activeTabId) || tabs[0],
    [tabs, activeTabId, getTabById]
  );

  const windowSize = useWindowSize();
  const scrollInnerRef = useRef<HTMLDivElement>(null);
  const [scrollLeftPosition, setScrollLeftPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRight = () => {
    const { current: scrollInnerEl } = scrollInnerRef;

    if (scrollInnerEl) {
      scrollInnerEl.scrollTo({
        left: scrollInnerEl.scrollLeft + 157,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    const { current: scrollInnerEl } = scrollInnerRef;

    if (scrollInnerEl) {
      scrollInnerEl.scrollTo({
        left: scrollInnerEl.scrollLeft - 157,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const { current: scrollInnerEl } = scrollInnerRef;

    if (scrollInnerEl) {
      setCanScrollLeft(scrollInnerEl.scrollLeft > 0);
      setCanScrollRight(
        scrollInnerEl.scrollLeft + scrollInnerEl.offsetWidth <
          scrollInnerEl.scrollWidth - 10
      );
    }
  }, [tabs, scrollLeftPosition, windowSize.width]);

  const [ready, setReady] = useState<boolean>(
    import.meta.env.VITE_EXPLORER ? true : false
  );

  const [urlWasTaken, setUrlWasTaken] = useState<boolean>(false);
  const [queryWasTaken, setQueryWasTaken] = useState<boolean>(false);
  const [variablesWasTaken, setVariablesWasTaken] = useState<boolean>(false);
  const [extensionsWasTaken, setExtensionsWasTaken] = useState<boolean>(false);
  const [headersWasTaken, setHeadersWasTaken] = useState<boolean>(false);
  const [proxyEnabledWasTaken, setProxyEnabledWasTaken] =
    useState<boolean>(false);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const queryQueryParam = getQueryParamByName("query");
    const variablesQueryParam = getQueryParamByName("variables");
    const extensionsQueryParam = getQueryParamByName("extensions");
    const headersQueryParam = getQueryParamByName("headers");

    if (
      !queryWasTaken &&
      !variablesWasTaken &&
      !extensionsWasTaken &&
      !headersWasTaken &&
      (queryQueryParam ||
        variablesQueryParam ||
        extensionsQueryParam ||
        headersQueryParam)
    ) {
      const update: Partial<ExplorerTab> = {};

      setQueryWasTaken(true);
      setVariablesWasTaken(true);
      setExtensionsWasTaken(true);
      setHeadersWasTaken(true);

      if (queryQueryParam) {
        update.query = queryQueryParam;

        deleteQueryParamByName("query", "replace");
      } else {
        update.query = "";
      }

      if (variablesQueryParam) {
        let variables = variablesQueryParam;

        if (!variables && update.query) {
          const parsedQuery = parse(update.query);

          const operation = getOperationAST(
            parsedQuery,
            getOperationName(parsedQuery)
          );

          if (operation?.variableDefinitions) {
            variables = JSON.stringify(
              {
                ...Object.fromEntries(
                  operation?.variableDefinitions?.map((variableDefinition) => {
                    return [variableDefinition.variable.name.value, null];
                  })
                ),
              },
              null,
              2
            );
          }
        }

        update.variables = variables || "{}";

        deleteQueryParamByName("variables", "replace");
      }

      if (extensionsQueryParam) {
        update.extensions = extensionsQueryParam;

        deleteQueryParamByName("extensions", "replace");
      } else {
        update.extensions = "{}";
      }

      if (headersQueryParam) {
        setHeaders(headersQueryParam);
        deleteQueryParamByName("headers", "replace");
      } else {
        setHeaders("{}");
      }

      if (Object.keys(update).length) {
        updateActiveTab((prev) => {
          return {
            ...prev,
            ...update,
          };
        });
      }
    }

    if (!proxyEnabledWasTaken) {
      setProxyEnabledWasTaken(true);

      const proxyQueryParam = getQueryParamByName("proxyEnabled") === "true";

      if (proxyQueryParam) {
        setProxyEnabled(true);
        deleteQueryParamByName("proxyEnabled", "replace");
      }
    }

    if (!urlWasTaken) {
      setUrlWasTaken(true);

      const urlQueryParam = getQueryParamByName("endpoint");

      if (urlQueryParam) {
        message({
          type: MessageType.Success,
          text: "GraphQL endpoint updated",
        });

        setUrl(urlQueryParam);
      } else {
        (async () => {
          if (!url) {
            const { url: newUrl } = (await showInputModal([
              { label: "GraphQL endpoint", name: "url" },
            ])) as {
              url: string;
            };

            if (!newUrl) {
              return;
            }

            message({
              type: MessageType.Success,
              text: "GraphQL endpoint updated",
            });

            setUrl(newUrl);
          }
        })();
      }

      deleteQueryParamByName("endpoint", "replace");
    }

    if (import.meta.env.VITE_EXPLORER) {
      localPreferences.set("explorer", {
        url,
        activeTabId,
        tabs,
        collections,
        preflightScript,
        history,
        headers,
        preflightEnabled,
        envVariables,
        proxyEnabled,
        historyEnabled,
      });
    } else {
      props.onStateChange?.({
        url,
        activeTabId,
        tabs,
        collections,
        preflightScript,
        history,
        headers,
        preflightEnabled,
        envVariables,
        proxyEnabled,
        historyEnabled,
      });

      localPreferences.set("explorer", {
        history,
        headers,
        preflightEnabled,
        envVariables,
        proxyEnabled,
        historyEnabled,
      });
    }
  }, [
    preflightScript,
    history,
    preflightEnabled,
    envVariables,
    url,
    tabs,
    activeTabId,
    collections,
    sharedCollections,
    headers,
    ready,
    proxyEnabled,
    historyEnabled,
  ]);

  useEffect(() => {
    if (props.defaultState !== undefined) {
      if (props.defaultState?.url) {
        setUrl(props.defaultState?.url);
      }

      if (props.defaultState?.tabs?.length) {
        setTabs(
          props.defaultState?.tabs.map((tab) => ({
            ...tab,
            collectionName: tab.operationId,
          })) as ExplorerTab[]
        );
        setActiveTabId(
          props.defaultState?.activeTabId || props.defaultState?.tabs?.[0].id
        );
      } else {
        const id = guuid();

        setTabs([
          {
            id,
            query: "",
            variables: "{}",
          },
        ]);

        setActiveTabId(id);
      }

      if (props.defaultState?.collections) {
        setCollections(props.defaultState?.collections as ExplorerCollection[]);
      }

      if (props.defaultState?.preflightScript) {
        setPreflightScript(props.defaultState?.preflightScript);
      }

      if (props.defaultState?.collections) {
        setSharedCollections(
          props.defaultState?.collections as ExplorerCollection[]
        );
      }

      setReady(true);
    }
  }, [props.defaultState]);

  const createFetcher = useCallback(
    (fetcherUrl: string, proxyEnabled?: boolean) => {
      return async (options: ExplorerFetcherOptions) => {
        const body: any = {};

        if (options.query) {
          body.query = options.query;
        }

        if (options.variables) {
          body.variables = options.variables;
        }

        if (options.extensions) {
          body.extensions = options.extensions;
        }

        if (options.operationName) {
          body.operationName = options.operationName;
        }

        return fetch(
          proxyEnabled
            ? "https://nr07f72g6a.execute-api.us-west-1.amazonaws.com/apply"
            : fetcherUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...options.headers,
            },
            body: JSON.stringify(
              proxyEnabled
                ? {
                    hostname: fetcherUrl,
                    request: body,
                    headers: options.headers,
                  }
                : body
            ),
          }
        );
      };
    },
    []
  );

  const createWsFetcher = useCallback((fetcherUrl: string) => {
    return async (options: ExplorerFetcherOptions) => {
      const client = createClient({
        url: fetcherUrl.replace("http", "ws"),
        connectionParams: {
          ...options.headers,
        },
      });

      client.on("connected", () => {
        setIsSubscriptionActive(true);
      });

      client.on("error", (error) => {
        console.error(error);
        setIsSubscriptionActive(false);
      });

      client.on("closed", () => {
        setIsSubscriptionActive(false);
      });

      setTerminateSubscription(() => {
        return () => {
          client.dispose();
        };
      });

      return {
        client,
        iterate: () =>
          client.iterate({
            query: options.query!,
            variables: options.variables,
            operationName: options.operationName,
          }),
        subscribe: (
          sink: Sink<ExecutionResult<Record<string, unknown>, unknown>>
        ) => {
          return client.subscribe(
            {
              query: options.query!,
              variables: options.variables,
              operationName: options.operationName,
            },
            sink
          );
        },
      };
    };
  }, []);

  const fetcher = useMemo(() => {
    return createFetcher(url, proxyEnabled);
  }, [url, proxyEnabled]);

  const wsFetcher = useMemo(() => {
    return createWsFetcher(url);
  }, [url]);

  const [introspectionLoading, setIntrospectionLoading] =
    useState<boolean>(false);
  const queryIntrospectionTimeoutRef = useRef<number>();

  const queryIntrospection = useCallback(async () => {
    if (!fetcher) {
      return;
    }

    if (!url) {
      setSchema(undefined);
      return;
    }

    setIntrospectionLoading(true);

    window.clearTimeout(queryIntrospectionTimeoutRef.current);

    queryIntrospectionTimeoutRef.current = window.setTimeout(async () => {
      let envVariablesData: Record<string, string> = {};

      try {
        envVariablesData = JSON.parse(envVariables || "{}");
      } catch (e) {}

      let parsedHeaders: Record<string, string> = {};

      try {
        let headersString: string = headers || "{}";

        if (headersString && envVariablesData) {
          headersString = headersString.replace(/{{(.+?)}}/g, (match, p1) =>
            get(envVariablesData, p1, match)
          );
        }

        parsedHeaders = JSON.parse(headersString);
      } catch (e) {}

      try {
        const response = await fetcher({
          query: getIntrospectionQuery(),
          headers: parsedHeaders,
        });

        setSchema(
          ((await response.json()) as any).data as unknown as IntrospectionQuery
        );
      } catch (e) {
        setSchema(undefined);
        message({
          type: MessageType.Error,
          text: "Failed to query introspection, that could be caused by CORS policy.",
          action: {
            label: "Enable proxy",
            onClick: () => {
              setProxyEnabled(true);
            },
          },
        });
      }

      setIntrospectionLoading(false);
    }, 500);
  }, [preflightScript, envVariables, headers, url, fetcher]);

  useEffect(() => {
    queryIntrospection();
  }, [queryIntrospection, fetcher]);

  const query = useCallback(
    async (
      operationName?: string,
      fetcherOverride?: (options: ExplorerFetcherOptions) => Promise<Response>
    ) => {
      updateActiveTab((prev) => {
        return {
          ...prev,
          response: undefined,
        };
      });

      if (!url && !fetcherOverride) {
        const { url: newUrl } = (await showInputModal([
          { label: "Enter URL", name: "url" },
        ])) as { url: string };

        if (!newUrl) {
          return;
        }

        setUrl(newUrl);

        query(operationName, createFetcher(newUrl));

        return;
      }

      const fetcherToUse = fetcherOverride || fetcher;

      if (!fetcherToUse || !activeTab) {
        return;
      }

      setIsLoading(true);

      let envVariablesData: Record<string, string> = {};

      try {
        envVariablesData = JSON.parse(envVariables || "{}");
      } catch (e) {}

      setPreflightFailed(false);
      setPreflightOutput([]);

      if (preflightEnabled && preflightScript) {
        const _log = console.log;
        const _error = console.error;
        const _warn = console.warn;

        const output: string[] = [];

        console.log = (...args: any[]) => {
          try {
            output.push(args.map((arg) => `${arg}`).join(" "));
          } catch (e) {}

          _log(...args);
        };

        console.error = (...args: any[]) => {
          try {
            output.push(args.map((arg) => `${arg}`).join(" "));
          } catch (e) {}

          _error(...args);
        };

        console.warn = (...args: any[]) => {
          try {
            output.push(args.map((arg) => `${arg}`).join(" "));
          } catch (e) {}

          _warn(...args);
        };

        try {
          const AsyncFunction = Object.getPrototypeOf(
            async function () {}
          ).constructor;

          const preflightScriptFunction = new AsyncFunction(
            "inigo",
            preflightScript
          );

          const context = {
            environment: {
              set: (key: string, value: any) => {
                envVariablesData[key] = value;

                setEnvVariables(JSON.stringify(envVariablesData, null, 2));
                envVariablesEditorRef.current?.setValue(
                  JSON.stringify(envVariablesData, null, 2)
                );
              },
              get: (key: string) => {
                return envVariablesData[key];
              },
            },
            input: async (fields: string[]) => {
              return await showInputModal(fields);
            },
            fetcher: fetcherToUse,
          };

          await preflightScriptFunction(context);

          console.log = _log;
          console.error = _error;
          console.warn = _warn;

          setPreflightOutput(output);
        } catch (err: any) {
          console.error(err.message);

          message({
            type: MessageType.Error,
            text: "Preflight script failed, check preflight tab in resonse pane for more details.",
          });

          console.log = _log;
          console.error = _error;
          console.warn = _warn;

          setIsLoading(false);
          setPreflightOutput(output);

          updateActiveTab((prev) => {
            return {
              ...prev,
              response: {
                data: {
                  error: err.message,
                },
                sent: 0,
                time: 0,
              },
            };
          });
          return;
        }
      }

      let parsedHeaders: Record<string, string> = {};

      try {
        let headersString: string = headers || "{}";

        if (headersString && envVariablesData) {
          headersString = headersString.replace(/{{(.+?)}}/g, (match, p1) =>
            get(envVariablesData, p1, match)
          );
        }

        parsedHeaders = JSON.parse(headersString);
      } catch (e) {}

      let variables: Record<string, any> = {};

      try {
        let variablesString: string = activeTab.variables || "{}";

        if (variablesString && envVariablesData) {
          variablesString = variablesString.replace(/{{(.+?)}}/g, (match, p1) =>
            get(envVariablesData, p1, match)
          );
        }

        variables = JSON.parse(variablesString);
      } catch (e) {}

      let extensions: Record<string, any> = {};

      try {
        let extensionsString: string = activeTab.extensions || "{}";

        if (extensionsString && envVariablesData) {
          extensionsString = extensionsString.replace(
            /{{(.+?)}}/g,
            (match, p1) => get(envVariablesData, p1, match)
          );
        }

        extensions = JSON.parse(extensionsString);
      } catch (e) {}

      const sendDate = new Date().getTime();

      try {
        let printedQuery: string | undefined;

        if (
          !activeTab.query!.replace(/\s\s/g, " ") &&
          Object.keys(activeTab.extensions ?? {}).length
        ) {
          printedQuery = "";
        } else {
          let query:
            | (Omit<DocumentNode, "definitions"> & {
                definitions: DefinitionNode[];
              })
            | null = null;

          try {
            // remove comments
            const queryString = activeTab
              .query!.split("\n")
              .filter((line) => {
                return !line.trim().startsWith("#");
              })
              .join("\n");

            query = parse(queryString) as Omit<DocumentNode, "definitions"> & {
              definitions: DefinitionNode[];
            };
          } catch (e) {
            throw new Error("Query is not valid");
          }

          if (
            query &&
            operationName &&
            query.definitions.some(
              (definition) =>
                definition.kind === "OperationDefinition" &&
                (definition as any).name?.value === operationName
            )
          ) {
            query.definitions = query.definitions.filter((definition) => {
              if (definition.kind === "OperationDefinition") {
                if (operationName !== (definition as any).name?.value) {
                  return false;
                }
              }

              return true;
            });
          }

          if (query) {
            try {
              printedQuery = print(query);
            } catch {}
          }
        }

        if (printedQuery?.startsWith("subscription")) {
          const fetcher = await wsFetcher({
            query: printedQuery,
            variables,
            operationName,
            headers: parsedHeaders,
          });

          setIsLoading(false);

          fetcher.subscribe({
            next: (result) => {
              updateActiveTab((prev) => {
                return {
                  ...prev,
                  response: {
                    data: [
                      {
                        receivedAt: new Date().toISOString(),
                        data: result.data,
                      },
                      ...(prev.response && Array.isArray(prev.response?.data)
                        ? prev.response.data
                        : []),
                    ],
                    headers: {},
                    status: 200,
                    sent: sendDate,
                    time: new Date().getTime() - sendDate,
                    size: 0,
                  },
                };
              });
            },
            error: (error: any) => {
              updateActiveTab((prev) => {
                return {
                  ...prev,
                  response: {
                    data: [
                      {
                        receivedAt: new Date().toISOString(),
                        data: error,
                      },
                      ...(prev.response && Array.isArray(prev.response?.data)
                        ? prev.response.data
                        : []),
                    ],
                    headers: {},
                    status: 200,
                    sent: sendDate,
                    time: new Date().getTime() - sendDate,
                    size: 0,
                  },
                };
              });

              setIsSubscriptionActive(false);
            },
            complete: () => {
              setIsSubscriptionActive(false);
            },
          });

          // for await (const result of fetcher.iterate()) {
          //   updateActiveTab((prev) => {
          //     return {
          //       ...prev,
          //       response: {
          //         data: [
          //           {
          //             receivedAt: new Date().toISOString(),
          //             data: result.data,
          //           },
          //           ...(prev.response && Array.isArray(prev.response?.data) ? prev.response.data : []),
          //         ],
          //         headers: {},
          //         status: 200,
          //         sent: sendDate,
          //         time: new Date().getTime() - sendDate,
          //         size: 0,
          //       },
          //     };
          //   });
          // }

          return;
        }

        const response = await fetcherToUse({
          query: printedQuery,
          variables,
          extensions,
          operationName,
          headers: parsedHeaders,
        });

        const responseText = await response.text();
        const responseJson = JSON.parse(responseText);

        const responseInfo = {
          data: responseJson,
          headers: Object.fromEntries(response.headers.entries()),
          status: response.status,
          sent: sendDate,
          time: new Date().getTime() - sendDate,
          size: responseText.length,
          traceId: responseJson?.extensions?.inigo?.trace_id,
        };

        updateActiveTab((prev) => {
          return {
            ...prev,
            response: responseInfo,
          };
        });

        if (historyEnabled) {
          setHistory((prev) => [
            {
              query: activeTab.query,
              variables: activeTab.variables,
              extensions: activeTab.extensions,
              response: responseInfo,
              operationName: operationName,
              serviceKey: props.serviceKey,
              createdAt: new Date().toISOString(),
            },
            ...prev,
          ]);
        }
      } catch (err: any) {
        updateActiveTab((prev) => {
          return {
            ...prev,
            response: {
              data: {
                error: err.message,
              },
              sent: sendDate,
              time: new Date().getTime() - sendDate,
            },
          };
        });
      }

      setIsLoading(false);
    },
    [
      props.serviceKey,
      showInputModal,
      activeTab,
      fetcher,
      preflightEnabled,
      preflightScript,
      envVariablesEditorRef,
      headers,
      historyEnabled,
    ]
  );

  useEffect(() => {
    setTabs((prev) => {
      let shouldUpdate = false;

      prev.forEach((tab, index) => {
        if (tab.collectionId) {
          const foundCollection =
            collections.find(
              (collection) => collection.id === tab.collectionId
            ) ||
            sharedCollections.find(
              (collection) => collection.id === tab.collectionId
            );

          if (
            !foundCollection ||
            !foundCollection.operations?.some(
              (operation) => operation.name === tab.collectionName
            )
          ) {
            prev[index] = {
              ...prev[index],
              collectionId: undefined,
              collectionName: undefined,
            };
            prev[index] = {
              ...prev[index],
              collectionId: undefined,
              collectionName: undefined,
            };
            shouldUpdate = true;
          }
        }
      });

      if (shouldUpdate) {
        return [...prev];
      }

      return prev;
    });
  }, [tabs, collections]);

  const saveToCollectionModal = useRef<any>(null);
  const saveToCollectionFormRef = useRef<FormRef>(null);
  const saveToCollection = useCallback(
    (collectionId?: string, collectionName?: string, force = false) => {
      if (!collectionId || !collectionName) {
        if (saveToCollectionFormRef.current) {
          if (saveToCollectionFormRef.current.validate()) {
            const value = saveToCollectionFormRef.current.getValue();

            collectionId = value.collection as string;

            if (/^.*:.*:.*$/.test(collectionId)) {
              collectionId = collectionId.split(":")[2];
            }

            collectionName = value.name as string;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      setCollections((prev) => {
        let collection = prev.find(
          (collection) => collection.id === collectionId
        );

        if (!collection) {
          const id = guuid();

          collection = {
            id,
            name: collectionId!,
            operations: [],
          };

          collectionId = id;

          prev.push(collection);
        }

        if (!collection.operations) {
          collection.operations = [];
        }

        const operation = collection.operations.find(
          (operation) => operation.name === collectionName
        );

        if (operation) {
          if (!force) {
            return prev;
          }

          collection.operations = collection.operations.filter(
            (operation) => operation.name !== collectionName
          );
        }

        const operationName =
          getOperationName(activeTab.doc!) || (collectionName as string);

        collection.operations.push({
          name: operationName,
          query: activeTab.query,
          variables: activeTab.variables,
        });

        updateActiveTab((prev) => ({
          ...prev,
          collectionId: collectionId as string,
          collectionName: operationName,
        }));

        message({
          type: MessageType.Success,
          text: `Operation "${operationName}" saved to collection "${collection.name}"`,
        });

        return [...prev];
      });

      return true;
    },
    [saveToCollectionFormRef, collections, activeTab]
  );

  const saveToSharedCollectionModal = useRef<any>(null);
  const saveToSharedCollectionFormRef = useRef<FormRef>(null);
  const saveToSharedCollection = useCallback(
    (collectionId?: string, collectionName?: string, force = false) => {
      if (!collectionId || !collectionName) {
        if (saveToCollectionFormRef.current) {
          if (saveToCollectionFormRef.current.validate()) {
            const value = saveToCollectionFormRef.current.getValue();

            collectionId = value.collection as string;

            if (/^.*:.*:.*$/.test(collectionId)) {
              collectionId = collectionId.split(":")[2];
            }

            collectionName = value.name as string;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      setSharedCollections((prev) => {
        let collection = prev.find(
          (collection) => collection.id === collectionId
        );

        if (!collection) {
          const id = guuid();

          collection = {
            id,
            name: collectionId!,
            operations: [],
          };

          collectionId = id;

          prev.push(collection);
        }

        if (!collection.operations) {
          collection.operations = [];
        }

        const operation = collection.operations.find(
          (operation) => operation.name === collectionName
        );

        if (operation) {
          if (!force) {
            return prev;
          }

          collection.operations = collection.operations.filter(
            (operation) => operation.name !== collectionName
          );
        }

        const operationName =
          getOperationName(activeTab.doc!) || (collectionName as string);

        collection.operations.push({
          name: operationName,
          query: activeTab.query,
          variables: activeTab.variables,
        });

        updateActiveTab((prev) => ({
          ...prev,
          collectionId: collectionId as string,
          collectionName: operationName,
        }));

        message({
          type: MessageType.Success,
          text: `Operation "${operationName}" saved to collection "${collection.name}"`,
        });

        return [...prev];
      });

      return true;
    },
    [saveToCollectionFormRef, sharedCollections, activeTab]
  );

  const showSaveToCollectionModal = useCallback(() => {
    if (activeTab.collectionId && activeTab.collectionName) {
      if (
        collections?.find((collection) => {
          if (collection.id === activeTab.collectionId) {
            return collection.operations?.find(
              (operation) => operation.name === activeTab.collectionName
            );
          }

          return false;
        })
      ) {
        saveToCollection(
          activeTab.collectionId,
          activeTab.collectionName,
          true
        );
      } else if (
        sharedCollections?.find((collection) => {
          if (collection.id === activeTab.collectionId) {
            return collection.operations?.find(
              (operation) => operation.name === activeTab.collectionName
            );
          }

          return false;
        })
      ) {
        saveToSharedCollection(
          activeTab.collectionId,
          activeTab.collectionName,
          true
        );
      }
    } else {
      saveToCollectionFormRef.current?.setValue({
        name: activeTab.doc ? getOperationName(activeTab.doc) : "",
      });
      saveToCollectionModal.current?.open();
    }

    if (!collections?.length) {
      saveToCollectionFormRef.current?.setError({
        collection: `No collection has been created. Add a collection in the 'Collection' tab.`,
      });
    } else {
      saveToCollectionFormRef.current?.setError({});
    }
  }, [activeTab, collections, sharedCollections]);

  const showSaveToSharedCollectionModal = useCallback(() => {
    if (
      activeTab.collectionId &&
      activeTab.collectionName &&
      sharedCollections?.find((collection) => {
        if (collection.id === activeTab.collectionId) {
          return collection.operations?.find(
            (operation) => operation.name === activeTab.collectionName
          );
        }

        return false;
      })
    ) {
      saveToSharedCollection(activeTab.collectionId, activeTab.collectionName);
    } else {
      saveToSharedCollectionFormRef.current?.setValue({
        name: activeTab.doc ? getOperationName(activeTab.doc) : "",
      });
      saveToSharedCollectionModal.current?.open();
    }

    if (!collections?.length) {
      saveToSharedCollectionFormRef.current?.setError({
        collection: `No collection has been created. Add a collection in the 'Collection' tab.`,
      });
    } else {
      saveToSharedCollectionFormRef.current?.setError({});
    }
  }, [activeTab, sharedCollections]);

  useEffect(() => {
    tabs
      .filter((tab) => tab.collectionId)
      .forEach(
        (tab) => {
          const collection = collections.find(
            (collection) => collection.id === tab.collectionId
          );

          if (collection) {
            const operation = collection.operations.find(
              (operation) => operation.name === tab.collectionName
            );

            if (!operation) {
              setTabs((prev) => {
                const newTabs = [...prev];

                const tabToUpdate = newTabs.find(
                  (newTab) => newTab.id === tab.id
                );

                if (tabToUpdate) {
                  tabToUpdate.collectionId = undefined;
                  tabToUpdate.collectionName = undefined;
                }

                return newTabs;
              });
            }
          }
        },
        [tabs, collections]
      );
  }, [tabs, collections]);

  const getTabName = useCallback((tab: ExplorerTab, i: number = 1) => {
    let tabName: string = tab.doc
      ? getOperationName(tab.doc) || `New tab ${i + 1}`
      : `New tab ${i + 1}`;

    if (tab.collectionName) {
      tabName = tab.collectionName;
    }

    if (tab.isHistoryTab) {
      tabName += " [History]";
    }

    return tabName;
  }, []);

  const inputModalIsEndpoint = useMemo(
    () =>
      inputModalFields.length &&
      typeof inputModalFields[0] !== "string" &&
      inputModalFields[0].name === "url",
    [inputModalFields]
  );

  const [layout, setLayout] = useState<[number, number]>(
    localPreferences.get("explorer").layout?.tab ?? [50, 50]
  );

  useEffect(() => {
    localPreferences.set("explorer", {
      ...localPreferences.get("explorer"),
      layout: {
        ...localPreferences.get("explorer").layout,
        tab: layout,
      },
    });
  }, [layout]);

  const currentRef = useRef<HTMLDivElement>(null);
  const handleIsDragging = useRef<boolean>();
  const lastCursorPositionX = useRef<number>();

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    document.body.classList.add("dragging");
    handleIsDragging.current = true;
    lastCursorPositionX.current = e.clientX;
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (handleIsDragging.current) {
        const width = currentRef.current?.offsetWidth || 0;
        const newLayout: [number, number] = [...layout];

        newLayout[0] +=
          ((e.clientX - lastCursorPositionX.current!) / width) * 100;
        newLayout[1] -=
          ((e.clientX - lastCursorPositionX.current!) / width) * 100;

        lastCursorPositionX.current = e.clientX;

        setLayout(newLayout);
      }
    },
    [layout]
  );

  const onMouseUp = useCallback(() => {
    document.body.classList.remove("dragging");
    handleIsDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const [saveModalSelectedCollection, setSaveModalSelectedCollection] =
    useState<string>("");

  if (!ready) {
    return null;
  }

  return (
    <div
      className={styles.explorer}
      onKeyDownCapture={(ev) => {
        if (ev.key === "Enter" && ev.metaKey) {
          ev.preventDefault();
          ev.stopPropagation();

          query();
        }
      }}
    >
      {/* <Drawer visible title="Schema">
        <HashRouter>{!!schema && <Schema data={formatIntrospectionResponse(schema)} />}</HashRouter>
      </Drawer> */}
      <Modal
        className={classNames(styles.inputModal, {
          [styles.endpointModal]: inputModalIsEndpoint,
        })}
        ref={inputModalRef}
        options={{
          title: inputModalIsEndpoint ? "Set Your GraphQL Endpoint" : "Input",
          buttons: [
            {
              label: "Submit",
              disabled: !!inputModalIsEndpoint && !inputModalData.url,
              handler: submitInputModal,
            },
          ],
        }}
        onClose={onInputModalHide}
      >
        {inputModalIsEndpoint ? (
          <div className={styles.endpointModalContent}>
            <div className={styles.left}>
              <div className={styles.text}>
                To get started with the Inigo Explorer, a valid URL endpoint is
                needed. You can always change it later. Once you provide the
                endpoint URL, the Explorer will be configured and ready to use.
              </div>
              <div className={styles.form}>
                <Form
                  ref={inputFormRef}
                  containerStyle={{ width: "100%" }}
                  onChange={setInputModalData}
                  onSubmit={submitInputModal}
                >
                  {inputModalFields.map((field) =>
                    typeof field === "string" ? (
                      <TextInput key={field} name={field} label={field} />
                    ) : (
                      <TextInput
                        key={field.name}
                        name={field.name}
                        label={field.label ?? field.name}
                        type={field.secured ? "password" : "text"}
                      />
                    )
                  )}
                </Form>
              </div>
            </div>
            <div className={styles.right}>
              <img
                src={`/assets/images/onboarding/${props.theme}/create_service.png`}
                width={175}
                alt=""
              />
            </div>
          </div>
        ) : (
          <Form ref={inputFormRef} containerStyle={{ width: "100%" }}>
            {inputModalFields.map((field) =>
              typeof field === "string" ? (
                <TextInput key={field} name={field} label={field} />
              ) : (
                <TextInput
                  key={field.name}
                  name={field.name}
                  label={field.label ?? field.name}
                  type={field.secured ? "password" : "text"}
                />
              )
            )}
          </Form>
        )}
      </Modal>
      <Modal
        ref={saveToCollectionModal}
        options={{
          title: "Save to collection",
          buttons: [
            {
              label: "Cancel",
              tertiary: true,
              handler: (close) => close(),
            },
            {
              label: "Save",
              handler: (close) => {
                const values =
                  saveToCollectionFormRef.current?.getValue() as any;
                let collectionId = values.collection as string;

                let isShared = sharedCollections.some(
                  (collection) => collection.id === collectionId
                );

                if (/^.*:.*:.*$/.test(collectionId)) {
                  collectionId = collectionId.split(":")[2];
                } else {
                  isShared = values.shared;
                }

                if (isShared) {
                  saveToSharedCollection();
                } else {
                  saveToCollection();
                }

                close();
              },
            },
          ],
        }}
      >
        <Form
          ref={saveToCollectionFormRef}
          containerStyle={{ width: "100%" }}
          style={{ gridTemplateColumns: "1fr" }}
          onChange={(values: any) => {
            setSaveModalSelectedCollection(values.collection);
          }}
          onSubmit={() => {
            let collectionId = saveToCollectionFormRef.current?.getValue()
              .collection as string;

            if (/^.*:.*:.*$/.test(collectionId)) {
              collectionId = collectionId.split(":")[2];
            }

            const isShared = sharedCollections.some(
              (collection) => collection.id === collectionId
            );

            if (isShared) {
              saveToSharedCollection();
            } else {
              saveToCollection();
            }

            saveToCollectionModal.current?.close();
          }}
        >
          {!(!!activeTab.doc && getOperationName(activeTab.doc)) && (
            <TextInput name="name" label="Name" required />
          )}
          {/* <Select name="collection" label="Collection" required>
            {[...collections, ...sharedCollections]
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
              .map((collection) => {
                const isShared = sharedCollections.find((sharedCollection) => sharedCollection.id === collection.id);

                return (
                  <SelectOption value={collection.id}>
                    <div className={styles.collectionsOption}>
                      <Icon icon={isShared ? <IconUnlocked /> : <IconLocked />} size={16} />
                      {collection.name}
                    </div>
                  </SelectOption>
                );
              })}
          </Select> */}
          <AutoComplete
            name="collection"
            label="Collection"
            placeholder={
              [...collections, ...sharedCollections].length
                ? "Select existing or create new collection"
                : "Enter collection name"
            }
            options={[...collections, ...sharedCollections].map((entry) => {
              const collection = collections.find((item) => entry === item);
              const sharedCollection = sharedCollections.find(
                (item) => entry === item
              );

              if (sharedCollection) {
                return `shared:${sharedCollection.name}:${sharedCollection.id}`;
              }

              return `personal:${collection?.name}:${collection?.id}`;
            })}
            renderOption={(value) => {
              const [type, name] = value.split(":");

              return (
                <div className={styles.collectionsOption}>
                  <Icon
                    icon={type ? <IconUnlocked /> : <IconLocked />}
                    size={16}
                  />
                  {name}
                </div>
              );
            }}
            renderValue={(value) => {
              const [, name] = value.split(":");

              return name;
            }}
          />
          {props.access === "admin" &&
            !/^.*:.*:.*$/.test(saveModalSelectedCollection) && (
              <Checkbox name="shared" style={{ width: "100%" }}>
                Make collection shared
              </Checkbox>
            )}
        </Form>
      </Modal>
      <Modal
        ref={saveToSharedCollectionModal}
        options={{
          title: "Save to shared collection",
          buttons: [
            {
              label: "Cancel",
              tertiary: true,
              handler: (close) => close(),
            },
            {
              label: "Save",
              handler: (close) => {
                if (saveToSharedCollection()) {
                  close();
                }
              },
            },
          ],
        }}
      >
        <Form
          ref={saveToSharedCollectionFormRef}
          containerStyle={{ width: "100%" }}
          style={{ gridTemplateColumns: "1fr" }}
          onSubmit={() => saveToSharedCollection()}
        >
          <TextInput name="name" label="Name" required />
          <Select name="collection" label="Collection" required>
            {sharedCollections.map((collection) => (
              <SelectOption value={collection.id}>
                {collection.name}
              </SelectOption>
            ))}
          </Select>
        </Form>
      </Modal>
      <div className={styles.preflightModalContainer}>
        <Modal
          ref={preflightModalRef}
          options={{
            title: (
              <>
                <span>Preflight script</span>
                {props.access === "user" && !import.meta.env.VITE_EXPLORER && (
                  <Tooltip text="Only admin or owner can edit preflight script">
                    <Icon icon={<IconInfo />} size={24} />
                  </Tooltip>
                )}
              </>
            ),
            buttons: [
              {
                label: "Cancel",
                tertiary: true,
                handler: (close) => {
                  close();
                },
              },
              ...(props.access === "admin" || import.meta.env.VITE_EXPLORER
                ? [
                    {
                      label: "Done",
                      handler: (close: () => void) => {
                        close();
                      },
                    },
                  ]
                : []),
            ],
          }}
        >
          <div className={styles.body}>
            <CodeEditor
              className={styles.editor}
              defaultValue={preflightScript}
              onChange={setPreflightScript}
              defaultLanguage="javascript"
              readOnly={
                props.access === "user" && !import.meta.env.VITE_EXPLORER
              }
              extraLib={`
            declare type ObjectFromList<T extends ReadonlyArray<string>, V = string> = {
              [K in T extends ReadonlyArray<infer U> ? U : never]: V;
            };

            declare const inigo: {
              environment: {
                set: (key: string, value: any) => void;
                get: (key: string) => any;
              };
              input: <TFields extends ReadonlyArray<string>>(fields: TFields) => Promise<ObjectFromList<TFields, string | undefined>>;
              fetcher: (options: {
                query: string;
                variables?: Record<string, any>;
                headers?: Record<string, string>;
              }) => Promise<Response>;
            };
            `}
            />
          </div>
        </Modal>
        <Modal
          ref={envVariablesModalRef}
          options={{
            title: "Environment variables",
            buttons: [
              {
                label: "Cancel",
                tertiary: true,
                handler: (close) => {
                  close();
                },
              },
              {
                label: "Done",
                handler: (close) => {
                  close();
                },
              },
            ],
          }}
        >
          <CodeEditor
            ref={envVariablesEditorRef}
            className={styles.editor}
            defaultLanguage="json"
            wordWrap="on"
            defaultValue={envVariables}
            onChange={(value) => throttledSetEnvVariables(value)}
          />
        </Modal>
      </div>
      <div className={styles.main}>
        <ExplorerSidebar
          url={url}
          schema={schema}
          introspectionLoading={introspectionLoading}
          tab={activeTab}
          history={history}
          tabs={tabs}
          cursorPosition={queryCursorPosition}
          deleteHistory={deleteHistory}
          deleteHistoryItem={deleteHistoryItem}
          collections={collections}
          selectedOperationName={selectedOperationName}
          onCollectionsUpdate={(update) => setCollections(update)}
          onCollectionCreate={(collection) => {
            setCollections((prev) => [...prev, collection]);

            message({
              type: MessageType.Success,
              text: "Collection has been created",
            });
          }}
          sharedCollections={sharedCollections}
          onSharedCollectionsUpdate={setSharedCollections}
          onSharedCollectionCreate={(collection) => {
            setSharedCollections((prev) => [...prev, collection]);

            message({
              type: MessageType.Success,
              text: "Shared collection has been created",
            });
          }}
          onUrlRestore={() => setUrl(props.defaultState?.url || "")}
          proxyEnabled={proxyEnabled}
          onProxyEnabledChange={setProxyEnabled}
          historyEnabled={historyEnabled}
          onHistoryEnabledChange={setHistoryEnabled}
          onTabActivate={(id) => {
            setActiveTabId(id);

            setTimeout(() => {
              scrollInnerRef.current
                ?.querySelector(
                  `[data-name="${getTabName(
                    getTabById(id, tabsRef.current) || tabs[0]
                  )}"][data-active="true"]`
                )
                ?.scrollIntoView({
                  block: "end",
                  inline: "end",
                });
            }, 200);
          }}
          onTabCreate={(tab) => setTabs((prev) => [...prev, tab])}
          onTabUpdate={(update) => {
            updateActiveTab(update);

            queueMicrotask(() => {
              requestRef.current?.focusQueryEditor(queryCursorPosition);
            });
          }}
          onUrlChange={(value) => throttledSetUrl(value)}
          serviceKey={props.serviceKey}
          theme={props.theme}
        />
        {activeTab && (
          <div className={styles.tab}>
            <div className={classNames(styles.navigation)}>
              <div className={classNames(styles.inner, "disableScrollbar")}>
                <div className={styles.tabs}>
                  <div className={styles.scrollContainer}>
                    <div
                      className={classNames(styles.scrollButton, styles.Left, {
                        [styles.Visible]: canScrollLeft,
                      })}
                    >
                      <div
                        tabIndex={0}
                        className={styles.Inner}
                        onClick={scrollLeft}
                      >
                        <Icon size={12} icon={<ArrowLeft />} />
                      </div>
                    </div>
                    <div
                      ref={scrollInnerRef}
                      className={styles.Inner}
                      onScroll={(ev) =>
                        setScrollLeftPosition(ev.currentTarget.scrollLeft)
                      }
                    >
                      {tabs.map((tab, i) => {
                        const tabName = getTabName(tab, i);

                        return (
                          <div
                            className={classNames(
                              styles.tab,
                              activeTab.id === tab.id && styles.active,
                              !!tab.collectionId && styles.hasCollection
                            )}
                            onClick={() => setActiveTabId(tab.id)}
                            data-name={tabName}
                            data-active={activeTab.id === tab.id}
                          >
                            {tab.collectionId && (
                              <Icon
                                icon={<IconCollectionsFilled />}
                                size={12}
                                className={styles.collectionIcon}
                              />
                            )}
                            <div className={styles.label}>
                              <Tooltip
                                truncated
                                text={tabName}
                                popupStyle={{
                                  padding: "var(--gutter-extra-small)",
                                }}
                                position={TooltipPosition.Bottom}
                              >
                                {tabName}
                              </Tooltip>
                            </div>
                            <div
                              className={styles.close}
                              onClick={() => deleteTabById(tab.id)}
                            >
                              <Icon icon={<Close />} size={12} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className={classNames(styles.scrollButton, styles.Right, {
                        [styles.Visible]: canScrollRight,
                      })}
                    >
                      <div
                        tabIndex={0}
                        className={styles.Inner}
                        onClick={scrollRight}
                      >
                        <Icon size={12} icon={<ArrowRight />} />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  label="Add tab"
                  type="text"
                  icon={<AddCircle />}
                  onClick={() => {
                    const id = guuid();

                    setTabs((prev) => {
                      const newTabs = [...prev];

                      newTabs.push({
                        id,
                        query: "",
                        variables: "",
                      });

                      return newTabs;
                    });

                    setActiveTabId(id);
                  }}
                />
              </div>
            </div>
            <div
              ref={currentRef}
              className={styles.current}
              style={{
                gridTemplateColumns: `minmax(100px, calc(${layout[0]}% - 8px)) 16px minmax(100px, calc(${layout[1]}% - 8px))`,
              }}
            >
              <ExplorerRequest
                ref={requestRef}
                theme={props.theme}
                schema={schema}
                tab={activeTab}
                url={url}
                proxyEnabled={proxyEnabled}
                headers={headers}
                onQuery={query}
                onHeadersUpdate={setHeaders}
                onTabUpdate={(update) => updateActiveTab(update)}
                onSaveToCollection={showSaveToCollectionModal}
                onSaveToSharedCollection={showSaveToSharedCollectionModal}
                preflightEnabled={preflightEnabled}
                onPreflightEnabledChange={setPreflightEnabled}
                onPreflightModalOpen={() => preflightModalRef.current?.open()}
                onEnvVariablesModalOpen={() =>
                  envVariablesModalRef.current?.open()
                }
                onSelectedOperationNameChange={setSelectedOperationName}
                onCursorPositionChange={setQueryCursorPosition}
                isSubscriptionActive={isSubscriptionActive}
                terminateSubscription={terminateSubscription}
              />
              <div className={styles.handle} onMouseDown={onMouseDown} />
              <ExplorerResponse
                theme={props.theme}
                tab={activeTab}
                url={url}
                envVariables={envVariables}
                headers={headers}
                schema={schema}
                isLoading={isLoading}
                preflightFailed={preflightFailed}
                preflightOutput={preflightOutput}
                isSubscriptionActive={isSubscriptionActive}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
