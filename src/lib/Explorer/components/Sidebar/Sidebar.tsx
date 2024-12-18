import classNames from "classnames";
import {
  buildClientSchema,
  FieldNode,
  getOperationAST,
  IntrospectionObjectType,
  IntrospectionQuery,
  visit,
} from "graphql";
import escapeRegExp from "lodash/escapeRegExp";
import moment from "moment";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ExplorerCollection,
  ExplorerCollectionOperation,
  ExplorerTab,
  ExplorerTabHistoryItem,
  guuid,
} from "../../Explorer";
import {
  addAllScalarTypeFieldsToQuery,
  addAllTypeFieldsToQuery,
  addAllTypeFieldsToQueryRecursively,
  addArgToField,
  addFieldToQuery,
  areAllTypeFieldsInQuery,
  isArgInQuery,
  isFieldInQuery,
  removeArgFromField,
  removeFieldFromQuery,
  removeTypeFieldsFromQuery,
} from "../../Explorer.utils";
import NewButton, { ButtonSize } from "../../../components/Buttons/Button";
import Button from "../../../components/Button/Button";
import Checkbox from "../../../components/Checkbox/Checkbox";
import {
  CheckboxRef,
  CheckboxVariant,
} from "../../../components/Checkbox/Checkbox.types";
import Form, { FormRef } from "../../../components/Form/Form";
import Icon, {
  Add,
  AddCircle,
  ArrowDown,
  ArrowRight,
  Check,
  Close,
  IconCheckCircle,
  IconCollections,
  IconDocs,
  IconEdit,
  IconFolder,
  IconHistory,
  IconInfo,
  IconLocked,
  IconRestore,
  IconSearch,
  IconSettings,
  IconSortingArrows,
  IconUnlocked,
  IconWarning,
  IconWarningFilled,
  More,
  Trash,
} from "../../../components/Icon/Icon";
import Loader from "../../../components/Loader/Loader";
import Menu, { Option as MenuOption } from "../../../components/Menu/Menu";
import { MessageType } from "../../../components/MessagesWrapper/MessagesWrapper.types";
import { message } from "../../../components/MessagesWrapper/MessagesWrapper.utils";
import Modal from "../../../components/Modal/Modal";
import TextInput, {
  TextInputRef,
} from "../../../components/TextInput/TextInput";
import Tooltip, { TooltipPosition } from "../../../components/Tooltip/Tooltip";
import { IconLink } from "../../../components/Icon/Icon";
import PopConfirm from "../../../components/PopConfirm/PopConfirm";
import {
  addQueryParamsListener,
  getQueryParamByName,
  removeQueryParamsListener,
  updateQueryParamByName,
} from "../../../utils/queryParams";
import { Maybe } from "../../../utils/types";
import styles from "./Sidebar.module.css";
import { renderStringWithSearch } from "../../../utils/helpers";

enum ExplorerSidebarTabs {
  Docs = "docs",
  Collections = "collections",
  History = "history",
  Settings = "settings",
}

const EXPLORER_SIDEBAR_TABS_ICONS_MAP: Record<string, JSX.Element> = {
  [ExplorerSidebarTabs.Docs]: <IconDocs />,
  [ExplorerSidebarTabs.Collections]: <IconCollections />,
  [ExplorerSidebarTabs.History]: <IconHistory />,
  [ExplorerSidebarTabs.Settings]: <IconSettings />,
};

const EXPLORER_SIDEBAR_TABS_LABEL_MAP: Record<string, string> = {
  [ExplorerSidebarTabs.Docs]: "Query builder",
  [ExplorerSidebarTabs.Collections]: "Collections",
  [ExplorerSidebarTabs.History]: "History",
  [ExplorerSidebarTabs.Settings]: "Connection settings",
};

export interface ExplorerSidebarProps {
  url: string;
  proxyEnabled: boolean;
  historyEnabled: boolean;
  tab: Maybe<ExplorerTab>;
  tabs: ExplorerTab[];
  theme?: "light" | "dark";
  access?: "admin" | "user";
  serviceKey?: Maybe<{
    name: string;
    label?: Maybe<string>;
  }>;
  history?: ExplorerTabHistoryItem[];
  schema?: IntrospectionQuery;
  deleteHistory: () => void;
  deleteHistoryItem: (item: ExplorerTabHistoryItem) => void;
  introspectionLoading?: boolean;
  collections: ExplorerCollection[];
  sharedCollections: ExplorerCollection[];
  selectedOperationName?: string;
  onCollectionsUpdate?: (
    update: (prev: ExplorerCollection[]) => ExplorerCollection[]
  ) => void;
  onCollectionCreate?: (collection: ExplorerCollection) => void;
  onSharedCollectionsUpdate?: (
    update: (prev: ExplorerCollection[]) => ExplorerCollection[]
  ) => void;
  onSharedCollectionCreate?: (collection: ExplorerCollection) => void;
  onUrlChange?: (url: string) => void;
  onProxyEnabledChange?: (proxyEnabled: boolean) => void;
  onHistoryEnabledChange?: (historyEnabled: boolean) => void;
  onUrlRestore?: () => void;
  onTabUpdate?: (update: (prev: ExplorerTab) => ExplorerTab) => void;
  onTabCreate?: (tab: ExplorerTab) => void;
  onTabActivate?: (id: string) => void;
  cursorPosition?: { lineNumber: number; column: number };
}

export enum ExplorerSidebarSorting {
  Asc = "asc",
  Desc = "desc",
  None = "none",
}

const ExplorerSidebarSortingNextLabel = {
  [ExplorerSidebarSorting.Asc]: "Sort alphabetically descending",
  [ExplorerSidebarSorting.Desc]: "Remove field sorting",
  [ExplorerSidebarSorting.None]: "Sort alphabetically ascending",
};

function ExplorerSidebarDocs(props: ExplorerSidebarProps) {
  const defaultDocsPath = useMemo(() => {
    return getQueryParamByName("docsPath") || null;
  }, []);

  const searchInputRef = useRef<TextInputRef>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [docsPath, setDocsPath] = useState<string | null>(defaultDocsPath);
  const [sorting, setSorting] = useState<ExplorerSidebarSorting>(
    ExplorerSidebarSorting.None
  );

  const onQueryParamsChangeHandler = useCallback(
    (params: Record<string, any>) => {
      if (params.docsPath !== docsPath) {
        setDocsPath(params.docsPath || null);
      }
    },
    []
  );

  // useEffect(() => {
  //   setDocsPath(null);
  // }, [props.url]);

  useEffect(() => {
    setSearchValue("");
    searchInputRef.current?.setValue("");
  }, [docsPath]);

  useEffect(() => {
    addQueryParamsListener(onQueryParamsChangeHandler);

    return () => removeQueryParamsListener(onQueryParamsChangeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docsPath]);

  const getObjectTypeFieldTypeObjectTypeName = useCallback(
    (type: any): string | null => {
      if (!type) {
        return null;
      }

      if (type.kind === "NON_NULL") {
        return getObjectTypeFieldTypeObjectTypeName(type.ofType);
      }

      if (type.kind === "LIST") {
        return getObjectTypeFieldTypeObjectTypeName(type.ofType);
      }

      return type.name;
    },
    []
  );

  const getObjectType = useCallback(
    (path: string | null) => {
      if (!props.schema?.__schema) {
        return null;
      }

      const queryType: IntrospectionObjectType | null =
        (props.schema.__schema.types.find(
          (type) =>
            type.name === (props.schema!.__schema.queryType?.name ?? "Query")
        ) as IntrospectionObjectType) || null;

      const mutationType: IntrospectionObjectType | null =
        (props.schema.__schema.types.find(
          (type) =>
            type.name ===
            (props.schema!.__schema.mutationType?.name ?? "Mutation")
        ) as IntrospectionObjectType) || null;

      const subscriptionType: IntrospectionObjectType | null =
        (props.schema.__schema.types.find(
          (type) =>
            type.name ===
            (props.schema!.__schema.subscriptionType?.name ?? "Subscription")
        ) as IntrospectionObjectType) || null;

      if (!path) {
        const result = {
          kind: "OBJECT",
          name: "Root",
          description: "",
          fields: [],
          interfaces: [],
        } satisfies IntrospectionObjectType;

        if (queryType) {
          result.fields.push(queryType as never);
        }

        if (mutationType) {
          result.fields.push(mutationType as never);
        }

        if (subscriptionType) {
          result.fields.push(subscriptionType as never);
        }

        return result;
      }

      const pathParts = path.split(".");
      let objectType: IntrospectionObjectType | null = null;

      if (pathParts[0].toLowerCase() === "query") {
        objectType = queryType;
      } else if (pathParts[0].toLowerCase() === "mutation") {
        objectType = mutationType;
      } else if (pathParts[0].toLowerCase() === "subscription") {
        objectType = subscriptionType;
      }

      if (!objectType) {
        return null;
      }

      for (let i = 1; i < pathParts.length; i++) {
        const pathPart = pathParts[i];

        if (i === 0) {
          objectType = props.schema.__schema!.types.find(
            (type) => type.name === pathPart
          ) as IntrospectionObjectType;
        } else {
          const field = objectType?.fields.find(
            (field) => field.name === pathPart
          );

          if (field) {
            const fieldTypeName = getObjectTypeFieldTypeObjectTypeName(
              field.type
            );

            if (fieldTypeName) {
              objectType = props.schema.__schema!.types.find(
                (type) => type.name === fieldTypeName
              ) as IntrospectionObjectType;
            }
          }
        }
      }

      return objectType || null;
    },
    [props.schema]
  );

  const fullAst = useMemo(() => {
    if (props.tab?.doc) {
      return getOperationAST(props.tab.doc);
    }

    return null;
  }, [props.tab?.doc]);

  const ast = useMemo(() => {
    if (props.tab?.doc) {
      return (
        getOperationAST(props.tab.doc, props.selectedOperationName) || fullAst
      );
    }

    return null;
  }, [props.tab?.doc, props.selectedOperationName, fullAst]);

  const activeAliasName = useMemo(() => {
    if (!props.cursorPosition || !ast || !docsPath) {
      return null;
    }

    const { lineNumber } = props.cursorPosition;

    let path: string = ast.operation;
    let nodes: FieldNode[] = [];

    visit(ast, {
      enter(node) {
        if (!node.loc || node.loc.startToken?.line > lineNumber) {
          return;
        }

        if (node.kind === "Field") {
          path = `${path}.${node.name.value}`;

          if (path === docsPath) {
            nodes.push(node);
          }
        }
      },
      leave(node) {
        if (node.kind === "Field") {
          path = path.substring(0, path.lastIndexOf("."));
        }
      },
    });

    return nodes[nodes.length - 1]?.alias?.value || null;
  }, [props.cursorPosition, fullAst, docsPath]);

  const getObjectTypeFieldTypeName = useCallback(
    (type: any): string | null => {
      if (!type) {
        return null;
      }

      if (type.kind === "NON_NULL") {
        return `${getObjectTypeFieldTypeName(type.ofType)}!`;
      }

      if (type.kind === "LIST") {
        return `[${getObjectTypeFieldTypeName(type.ofType)}]`;
      }

      return type.name;
    },
    [props.tab?.doc]
  );

  const getObjectTypeFieldKind = useCallback(
    (type: any): string | null => {
      if (!type) {
        return null;
      }

      if (type.kind === "NON_NULL") {
        return getObjectTypeFieldKind(type.ofType);
      }

      if (type.kind === "LIST") {
        return getObjectTypeFieldKind(type.ofType);
      }

      return type.kind;
    },
    [props.tab?.doc]
  );

  const typeStringToIntrospectionTypeRef = useCallback((type: string): any => {
    if (!type) {
      return null;
    }

    if (type.endsWith("!")) {
      return {
        kind: "NON_NULL",
        ofType: typeStringToIntrospectionTypeRef(type.slice(0, -1)),
      };
    }

    if (type.startsWith("[") && type.endsWith("]")) {
      return {
        kind: "LIST",
        ofType: typeStringToIntrospectionTypeRef(type.slice(1, -1)),
      };
    }

    const typeDefinition = props.schema?.__schema.types.find(
      (schemaType) => schemaType.name === type
    );

    if (!typeDefinition) {
      return {
        kind: "SCALAR",
        name: type,
      };
    }

    return typeDefinition;
  }, []);

  const inputTypeToJsonMock = useCallback(
    (type: any): any => {
      if (!type) {
        return null;
      }

      if (type.kind === "NON_NULL") {
        return inputTypeToJsonMock(type.ofType);
      }

      if (type.kind === "LIST") {
        return [inputTypeToJsonMock(type.ofType)];
      }

      if (type.kind === "SCALAR") {
        switch (type.name) {
          case "Int":
            return 0;
          case "Float":
            return 0.0;
          case "Boolean":
            return false;
          case "String":
            return "";
          case "ID":
            return "";
          default:
            return null;
        }
      }

      if (type.kind === "ENUM") {
        if (!type.enumValues) {
          const foundType = props.schema?.__schema.types.find(
            (schemaType) => schemaType.name === type.name
          );

          if (foundType) {
            type = foundType;
          }
        }

        if (type.enumValues) {
          return type.enumValues[0].name;
        }
      }

      if (type.kind === "INPUT_OBJECT") {
        if (!type.inputFields) {
          const foundType = props.schema?.__schema.types.find(
            (schemaType) => schemaType.name === type.name
          );

          if (foundType) {
            type = foundType;
          }
        }

        if (type.inputFields) {
          return Object.fromEntries(
            type.inputFields.map((field: any) => [
              field.name,
              inputTypeToJsonMock(field.type),
            ])
          );
        }
      }

      return null;
    },
    [props.schema]
  );

  const pushDocsPath = useCallback(
    (path: string) => {
      setDocsPath((prev: string | null) => {
        let result: string;

        if (prev) {
          result = `${prev}.${path}`;
        } else {
          result = path;
        }

        updateQueryParamByName("docsPath", result);

        return result;
      });
    },
    [docsPath]
  );

  const objectType = useMemo(
    () => getObjectType(docsPath),
    [docsPath, getObjectType]
  );

  const args = useMemo(() => {
    if (!docsPath) {
      return [];
    }

    const parentObjectType = getObjectType(
      docsPath.split(".").slice(0, -1).join(".")
    );

    if (!parentObjectType) {
      return [];
    }

    const field = parentObjectType.fields.find(
      (field) => field.name === docsPath?.split(".").slice(-1)[0]
    );

    if (!field) {
      return [];
    }

    return field.args;
  }, [docsPath, getObjectType]);

  const docsPathParts = useMemo(() => {
    if (!docsPath) {
      return [];
    }

    return docsPath.split(".");
  }, [docsPath]);

  const fieldsToRender = useMemo(() => {
    if (!objectType) {
      return [];
    }

    return (
      objectType.fields?.filter((field) => {
        if (!searchValue) {
          return true;
        }

        return new RegExp(escapeRegExp(searchValue.toLowerCase())).test(
          field.name.toLowerCase()
        );
      }) ?? []
    );
  }, [objectType, searchValue]);

  const inputRef = useRef<TextInputRef>(null);

  useEffect(() => {
    if (inputRef.current && inputRef.current.getValue() !== props.url) {
      inputRef.current.setValue(props.url);
      setDocsPath(null);
    }
  }, [props.url]);

  const clientSchema = useMemo(() => {
    if (!props.schema) {
      return null;
    }

    return buildClientSchema(props.schema);
  }, [props.schema]);

  const updateSorting = useCallback(() => {
    if (sorting === ExplorerSidebarSorting.None) {
      setSorting(ExplorerSidebarSorting.Asc);
    }

    if (sorting === ExplorerSidebarSorting.Asc) {
      setSorting(ExplorerSidebarSorting.Desc);
    }

    if (sorting === ExplorerSidebarSorting.Desc) {
      setSorting(ExplorerSidebarSorting.None);
    }
  }, [sorting]);

  return (
    <div className={styles.docs}>
      <div className={styles.title}>Query builder</div>
      <div className={styles.divider} />
      <TextInput
        ref={inputRef}
        defaultValue={props.url}
        placeholder="Enter GraphQL endpoint"
        onChange={(value) => {
          props.onUrlChange?.(value);
        }}
      />
      {objectType ? (
        <div className={styles.header}>
          <div className={styles.pathPart} onClick={() => setDocsPath(null)}>
            <div className={styles.pathPartName}>Root</div>
            <div className={styles.pathPartSeparator}>
              <Icon icon={<ArrowRight />} size={10} />
            </div>
          </div>
          {docsPathParts.length > 3 ? (
            <>
              <Menu
                onSelect={(value) =>
                  setDocsPath(
                    docsPathParts
                      .slice(0, docsPathParts.indexOf(value as string) + 1)
                      .join(".")
                  )
                }
                target={
                  <div
                    tabIndex={0}
                    className={classNames(styles.pathPart, styles.rest)}
                  >
                    <div className={styles.pathPartName}>...</div>
                    <div className={styles.pathPartSeparator}>
                      <Icon icon={<ArrowRight />} size={10} />
                    </div>
                  </div>
                }
              >
                {docsPathParts
                  .slice(0, docsPathParts.length - 2)
                  .map((pathPart) => {
                    return (
                      <MenuOption key={pathPart} value={pathPart}>
                        {pathPart}
                      </MenuOption>
                    );
                  })}
              </Menu>
              <div
                className={styles.pathPart}
                onClick={() => {
                  setDocsPath(
                    docsPathParts.slice(0, docsPathParts.length - 2).join(".")
                  );
                }}
              >
                <div className={styles.pathPartName}>
                  {docsPathParts[docsPathParts.length - 2]}
                </div>
                <div className={styles.pathPartSeparator}>
                  <Icon icon={<ArrowRight />} size={10} />
                </div>
              </div>
              <div
                className={styles.pathPart}
                onClick={() => {
                  setDocsPath(
                    docsPathParts.slice(0, docsPathParts.length - 1).join(".")
                  );
                }}
              >
                <div className={styles.pathPartName}>
                  {docsPathParts[docsPathParts.length - 1]}
                </div>
                <div className={styles.pathPartSeparator}>
                  <Icon icon={<ArrowRight />} size={10} />
                </div>
              </div>
            </>
          ) : (
            docsPathParts.map((pathPart, index, array) => {
              const path = array.slice(0, index + 1).join(".");

              return (
                <div
                  className={styles.pathPart}
                  onClick={() => {
                    if (path) {
                      setDocsPath(path);
                    }
                  }}
                >
                  <div className={styles.pathPartName}>{pathPart}</div>
                  <div className={styles.pathPartSeparator}>
                    <Icon icon={<ArrowRight />} size={10} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : null}
      {!!args.length && <div className={styles.subtitle}>Arguments</div>}
      {!!args.length && (
        <div className={styles.list}>
          {args.map((arg) => {
            const fieldName = arg.name;
            const fieldType = getObjectTypeFieldTypeName(arg.type) || "";
            const isFieldInQueryResult = isArgInQuery(
              props.tab?.query as string,
              docsPath as string,
              fieldName
            );

            return (
              <div className={classNames(styles.field)}>
                <Checkbox
                  key={`${fieldName}:${
                    isFieldInQueryResult ? "true" : "false"
                  }`}
                  defaultValue={isFieldInQueryResult}
                  placeholder={<Icon icon={<Add />} size={16} />}
                  onChange={(value) => {
                    if (value) {
                      const result = addArgToField(
                        props.tab?.query as string,
                        docsPath as string,
                        fieldName,
                        clientSchema!
                      );

                      props.onTabUpdate?.((prev) => {
                        let variables = prev.variables
                          ? JSON.parse(prev.variables)
                          : {};

                        if (result.variables) {
                          for (let arg of result.variables) {
                            variables[arg.name] = inputTypeToJsonMock(
                              typeStringToIntrospectionTypeRef(arg.type)
                            );
                          }
                        }

                        return {
                          ...prev,
                          query: result.query,
                          variables: JSON.stringify(variables, null, 2),
                        };
                      });
                    } else {
                      props.onTabUpdate?.((prev) => ({
                        ...prev,
                        query: removeArgFromField(
                          props.tab?.query as string,
                          docsPath as string,
                          fieldName
                        ).query,
                      }));
                    }
                  }}
                />
                <div
                  className={classNames(styles.info)}
                  // onClick={() => isActive && pushDocsPath(fieldName)}
                >
                  <div className={styles.name}>
                    {renderStringWithSearch(fieldName, searchValue)}
                  </div>
                  <div className={styles.type}>{fieldType}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {objectType && (
        <div className={styles.subtitle}>
          Fields
          <Tooltip
            text={ExplorerSidebarSortingNextLabel[sorting]}
            popupStyle={{ padding: "var(--gutter-extra-small)" }}
            position={TooltipPosition.Top}
          >
            <NewButton
              size={ButtonSize.Small}
              icon
              onClick={updateSorting}
              disabled={!docsPath}
            >
              <Icon icon={<IconSortingArrows />} size={16} />
            </NewButton>
          </Tooltip>
          <div className={styles.actions}>
            <div className={styles.mainContainer}>
              {areAllTypeFieldsInQuery(
                props.tab?.query as string,
                docsPath as string,
                clientSchema!,
                props.selectedOperationName
              ) ? (
                <NewButton
                  className={styles.main}
                  onClick={(e) => {
                    props.onTabUpdate?.((prev) => {
                      return {
                        ...prev,
                        query: removeTypeFieldsFromQuery(
                          props.tab?.query as string,
                          docsPath as string,
                          clientSchema!,
                          props.selectedOperationName
                        ),
                      };
                    });
                  }}
                  icon
                  size={ButtonSize.Small}
                  disabled={!docsPath}
                >
                  <Icon icon={<IconCheckCircle />} size={16} />
                </NewButton>
              ) : (
                <Tooltip
                  renderContent={() => (
                    <span style={{ wordBreak: "normal" }}>
                      Click to add all fields (⌘ + Click to add all fields
                      recursively)
                    </span>
                  )}
                  position={TooltipPosition.Top}
                  popupStyle={{ padding: "var(--gutter-extra-small)" }}
                >
                  <NewButton
                    className={styles.main}
                    onClick={(e) => {
                      let result: {
                        query: string;
                        variables?: { name: string; type: string }[];
                      } | null = null;

                      if (e.metaKey) {
                        result = addAllTypeFieldsToQueryRecursively(
                          props.tab?.query as string,
                          docsPath as string,
                          clientSchema!,
                          props.selectedOperationName
                        );
                      } else {
                        result = addAllTypeFieldsToQuery(
                          props.tab?.query as string,
                          docsPath as string,
                          clientSchema!,
                          props.selectedOperationName
                        );
                      }

                      if (result) {
                        props.onTabUpdate?.((prev) => {
                          let variables = prev.variables
                            ? JSON.parse(prev.variables)
                            : {};

                          if (result!.variables) {
                            for (let arg of result!.variables) {
                              variables[arg.name] = inputTypeToJsonMock(
                                typeStringToIntrospectionTypeRef(arg.type)
                              );
                            }
                          }

                          return {
                            ...prev,
                            query: result!.query,
                            variables: JSON.stringify(variables, null, 2),
                          };
                        });
                      }
                    }}
                    icon
                    size={ButtonSize.Small}
                    disabled={!docsPath}
                  >
                    <Icon icon={<AddCircle />} size={16} />
                  </NewButton>
                </Tooltip>
              )}
            </div>
            <Menu
              className={styles.moreContainer}
              target={
                <NewButton
                  className={styles.more}
                  icon
                  size={ButtonSize.Small}
                  disabled={!docsPath}
                >
                  <Icon icon={<More />} size={16} />
                </NewButton>
              }
              placement="left"
              minWidth={125}
              onSelect={(value: any) => {
                let result: {
                  query: string;
                  variables?: { name: string; type: string }[];
                } | null = null;

                if (value === "scalars") {
                  result = addAllScalarTypeFieldsToQuery(
                    props.tab?.query as string,
                    docsPath as string,
                    clientSchema!,
                    props.selectedOperationName
                  );
                }

                if (value === "recursively") {
                  result = addAllTypeFieldsToQueryRecursively(
                    props.tab?.query as string,
                    docsPath as string,
                    clientSchema!,
                    props.selectedOperationName
                  );
                }

                if (result) {
                  props.onTabUpdate?.((prev) => {
                    let variables = prev.variables
                      ? JSON.parse(prev.variables)
                      : {};

                    if (result!.variables) {
                      for (let arg of result!.variables) {
                        variables[arg.name] = inputTypeToJsonMock(
                          typeStringToIntrospectionTypeRef(arg.type)
                        );
                      }
                    }

                    return {
                      ...prev,
                      query: result!.query,
                      variables: JSON.stringify(variables, null, 2),
                    };
                  });
                }
              }}
            >
              <MenuOption className={styles.option} value="scalars">
                Select all scalar fields
              </MenuOption>
              <MenuOption className={styles.option} value="recursively">
                Select all fields recursively (up to 6 levels)
              </MenuOption>
            </Menu>
          </div>
        </div>
      )}
      {objectType && (
        <TextInput
          ref={searchInputRef}
          className={styles.search}
          prefix={<Icon icon={<IconSearch />} size={16} />}
          placeholder="Filter"
          onChange={setSearchValue}
          clearBtn
        />
      )}
      {!!objectType ? (
        fieldsToRender.length ? (
          <div className={styles.list}>
            {fieldsToRender
              .filter((field) => {
                if (!searchValue) {
                  return true;
                }

                return new RegExp(escapeRegExp(searchValue.toLowerCase())).test(
                  field.name.toLowerCase()
                );
              })
              .sort((a, b) => {
                if (sorting === ExplorerSidebarSorting.Asc) {
                  return a.name.localeCompare(b.name);
                }

                if (sorting === ExplorerSidebarSorting.Desc) {
                  return b.name.localeCompare(a.name);
                }

                return 0;
              })
              .map((field) => {
                let fieldPath = docsPath
                  ? `${docsPath}.${field.name}`
                  : field.name;

                let isFieldInQueryResult = isFieldInQuery(
                  props.tab?.query as string,
                  fieldPath
                );
                let fieldType: string;
                let fieldName = field.name;

                if (
                  field.name ===
                  (props.schema?.__schema.queryType?.name ?? "Query")
                ) {
                  fieldType = props.schema?.__schema.queryType?.name ?? "Query";
                  fieldName = "query";

                  isFieldInQueryResult = isFieldInQuery(
                    props.tab?.query as string,
                    fieldName
                  );
                  fieldPath = fieldName;
                } else if (
                  field.name ===
                  (props.schema?.__schema.mutationType?.name ?? "Mutation")
                ) {
                  fieldType =
                    props.schema?.__schema.mutationType?.name ?? "Mutation";
                  fieldName = "mutation";

                  isFieldInQueryResult = isFieldInQuery(
                    props.tab?.query as string,
                    fieldName
                  );
                  fieldPath = fieldName;
                } else if (
                  field.name ===
                  (props.schema?.__schema.subscriptionType?.name ??
                    "Subscription")
                ) {
                  fieldType =
                    props.schema?.__schema.subscriptionType?.name ??
                    "Subscription";
                  fieldName = "subscription";

                  isFieldInQueryResult = isFieldInQuery(
                    props.tab?.query as string,
                    fieldName
                  );
                  fieldPath = fieldName;
                } else {
                  fieldType = getObjectTypeFieldTypeName(field.type) || "";
                }

                const isActive =
                  getObjectTypeFieldKind(field.type) === "OBJECT" ||
                  fieldType ===
                    (props.schema?.__schema.queryType?.name ?? "Query") ||
                  fieldType ===
                    (props.schema?.__schema.mutationType?.name ?? "Mutation") ||
                  fieldType ===
                    (props.schema?.__schema.subscriptionType?.name ??
                      "Subscription");

                return (
                  <div className={classNames(styles.field)}>
                    <Checkbox
                      key={`${fieldName}:${
                        isFieldInQueryResult ? "true" : "false"
                      }`}
                      defaultValue={isFieldInQueryResult}
                      placeholder={<Icon icon={<Add />} size={16} />}
                      onChange={(value) => {
                        if (value) {
                          const result = addFieldToQuery(
                            props.tab?.query as string,
                            fieldPath,
                            clientSchema!
                          );

                          props.onTabUpdate?.((prev) => {
                            let variables = prev.variables
                              ? JSON.parse(prev.variables)
                              : {};

                            if (result.variables) {
                              for (let arg of result.variables) {
                                variables[arg.name] = inputTypeToJsonMock(
                                  typeStringToIntrospectionTypeRef(arg.type)
                                );
                              }
                            }

                            return {
                              ...prev,
                              query: result.query,
                              variables: JSON.stringify(variables, null, 2),
                            };
                          });

                          if (isActive) {
                            pushDocsPath(fieldName);
                          }
                        } else if (ast) {
                          props.onTabUpdate?.((prev) => ({
                            ...prev,
                            query: removeFieldFromQuery(
                              props.tab?.query as string,
                              fieldPath
                            ).query,
                          }));
                        }
                      }}
                    />
                    <div
                      className={classNames(
                        styles.info,
                        isActive && styles.active
                      )}
                      onClick={() => isActive && pushDocsPath(fieldName)}
                    >
                      <div className={styles.name}>
                        {renderStringWithSearch(fieldName, searchValue)}
                      </div>
                      <div className={styles.type}>{fieldType}</div>
                      {isActive && (
                        <Icon
                          className={styles.arrow}
                          icon={<ArrowRight />}
                          size={12}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className={styles.empty}>No results for "{searchValue}"</div>
        )
      ) : !props.introspectionLoading ? (
        <div className={styles.error}>
          <img
            height={90}
            src={
              props.theme === "dark"
                ? "/assets/images/EmptyState_dark.svg"
                : "/assets/images/EmptyState.svg"
            }
            alt="empty"
          />
          Please ensure that you have entered the correct endpoint URL in the
          Connection settings and verify that your GraphQL service is active and
          running.
          <br />
          <br />
          If introspection is enabled the Query Builder will promptly display
          it, allowing you to explore and interact with your schema immediately.
          Connecting your endpoint is the first step to unlocking the full
          potential of our tools.
        </div>
      ) : (
        <div className={styles.loader}>
          <Loader visible />
        </div>
      )}
    </div>
  );
}

function ExplorerSidebarHistory(props: ExplorerSidebarProps) {
  return (
    <div className={styles.history}>
      <div className={styles.title}>
        History{" "}
        <Button
          className={styles.deleteAll}
          icon={<Trash />}
          type="link"
          label="Clear all"
          onClick={props.deleteHistory}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.list}>
        {!!props.history?.length ? (
          props.history
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .filter(
              (historyItem) =>
                historyItem.serviceKey?.name === props.serviceKey?.name &&
                historyItem.serviceKey?.label === props.serviceKey?.label
            )
            .map((historyItem) => (
              <div className={styles.itemWrapper}>
                <div
                  className={styles.item}
                  onClick={() => {
                    if (props.tab?.isHistoryTab) {
                      props.onTabUpdate?.((prev) => {
                        return {
                          ...prev,
                          ...historyItem,
                        };
                      });
                    } else {
                      let tabId = guuid();

                      props.onTabCreate?.({
                        isHistoryTab: true,
                        ...props.tab,
                        ...historyItem,
                        id: tabId,
                      });

                      props.onTabActivate?.(tabId);
                    }
                  }}
                >
                  <div className={styles.header}>
                    <div className={styles.title}>
                      {historyItem.operationName || "(Empty)"}
                    </div>
                    <div className={styles.date}>
                      {moment(historyItem.createdAt).format("MM/DD/YYYY HH:mm")}
                    </div>
                    <Tooltip
                      parentClassName={styles.delete}
                      text="Delete"
                      position={TooltipPosition.Bottom}
                      popupStyle={{ padding: "var(--gutter-extra-small)" }}
                    >
                      <div
                        className={styles.button}
                        onClick={(ev) => {
                          ev.stopPropagation();
                          props.deleteHistoryItem(historyItem);
                        }}
                      >
                        <Icon icon={<Trash />} size={16} />
                      </div>
                    </Tooltip>
                  </div>
                  <div className={styles.body}>
                    <div className={styles.query}>{historyItem.query}</div>
                  </div>
                </div>
                <div className={styles.divider} />
              </div>
            ))
        ) : (
          <div className={styles.empty}>
            <img
              height={90}
              src={
                props.theme === "dark"
                  ? "/assets/images/EmptyState_dark.svg"
                  : "/assets/images/EmptyState.svg"
              }
              alt="empty"
            />
            <div className={styles.title}>Nothing to show</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExplorerSidebarSettings(props: ExplorerSidebarProps) {
  const inputRef = useRef<TextInputRef>(null);
  const proxyCheckboxRef = useRef<CheckboxRef>(null);
  const historyCheckboxRef = useRef<CheckboxRef>(null);

  useEffect(() => {
    if (inputRef.current && inputRef.current.getValue() !== props.url) {
      inputRef.current.setValue(props.url);
    }
  }, [props.url]);

  useEffect(() => {
    if (
      proxyCheckboxRef.current &&
      proxyCheckboxRef.current.getValue() !== props.proxyEnabled
    ) {
      proxyCheckboxRef.current.setValue(props.proxyEnabled);
    }
  }, [props.proxyEnabled]);

  useEffect(() => {
    if (
      historyCheckboxRef.current &&
      historyCheckboxRef.current.getValue() !== props.historyEnabled
    ) {
      historyCheckboxRef.current.setValue(props.historyEnabled);
    }
  }, [props.historyEnabled]);

  return (
    <div className={styles.settings}>
      <div className={styles.title}>Settings</div>
      <div className={styles.divider} />
      <div className={styles.subtitle}>Connection</div>
      <div className={styles.item}>
        <TextInput
          ref={inputRef}
          placeholder="Enter GraphQL endpoint"
          defaultValue={props.url}
          onChange={(value) => {
            props.onUrlChange?.(value);
          }}
        />
        <div className={styles.actions}>
          {!import.meta.env.VITE_EXPLORER && (
            <div
              className={classNames("Link", styles.restore)}
              onClick={props.onUrlRestore}
            >
              <Icon icon={<IconRestore />} size={16} />
              Restore to default
            </div>
          )}
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.subtitle}>Proxy</div>
      <div className={styles.item}>
        <div className={styles.checkbox}>
          <div className={styles.label}>
            Enabled
            <Tooltip text="Enabling proxy, sends operation's request and headers via Inigo's proxy server. This is often needed to allow the server to respond.">
              <Icon icon={<IconInfo />} size={16} className={styles.info} />
            </Tooltip>
          </div>
          <Checkbox
            ref={proxyCheckboxRef}
            // label="Enabled"
            variant={CheckboxVariant.Switch}
            defaultValue={props.proxyEnabled}
            onChange={(value) => {
              props.onProxyEnabledChange?.(value);
            }}
            disabled={props.url.includes("localhost")}
          />
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.subtitle}>History</div>
      <div className={styles.item}>
        <div className={styles.checkbox}>
          <div className={styles.label}>Enabled</div>
          <Checkbox
            ref={historyCheckboxRef}
            // label="Enabled"
            variant={CheckboxVariant.Switch}
            defaultValue={props.historyEnabled}
            onChange={(value) => {
              props.onHistoryEnabledChange?.(value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ExplorerSidebarCollections(
  props: ExplorerSidebarProps & { shared?: boolean }
) {
  const deleteModalRef = useRef<any>(null);
  const [collectionToDelete, setCollectionToDelete] =
    useState<ExplorerCollection | null>(null);
  const [collectionOperationToDelete, setCollectionOperationToDelete] =
    useState<ExplorerCollectionOperation | null>(null);
  const [collapsedCollections, setCollapsedCollections] = useState<string[]>(
    []
  );
  const [editCollection, setEditCollection] = useState<string | null>(null);
  const editNameInputRef = useRef<HTMLInputElement>(null);

  const onCollectionDeleteClick = useCallback(
    (collection: ExplorerCollection) => {
      setCollectionToDelete(collection);
      setCollectionOperationToDelete(null);

      deleteModalRef.current?.open();
    },
    [deleteModalRef]
  );

  const onCollectionOperationDeleteClick = useCallback(
    (operation: ExplorerCollectionOperation) => {
      setCollectionToDelete(null);
      setCollectionOperationToDelete(operation);

      deleteModalRef.current?.open();
    },
    [deleteModalRef]
  );

  const onCollectionNameUpdate = useCallback(() => {
    props.onCollectionsUpdate?.((prev) => {
      const collectionIndex = prev.findIndex(
        (item) => item.id === editCollection
      );

      if (collectionIndex === -1) {
        return prev;
      }

      if (
        prev.some(
          (item) =>
            item.name === editNameInputRef.current?.value &&
            item.id !== editCollection
        )
      ) {
        message({
          type: MessageType.Error,
          text: "Collection with this name already exists",
        });

        return prev;
      }

      const result = [...prev];

      result[collectionIndex].name = editNameInputRef.current?.value || "";

      setEditCollection(null);

      return result;
    });
  }, [editCollection]);

  const onCollectionOperationClick = useCallback(
    (
      collection: ExplorerCollection,
      operation: ExplorerCollectionOperation
    ) => {
      const tab = props.tabs.find(
        (tab) =>
          tab.collectionId === collection.id &&
          tab.collectionName === operation.name
      );

      if (tab) {
        props.onTabActivate?.(tab.id);
        return;
      }

      const tabId = guuid();

      props.onTabCreate?.({
        id: tabId,
        collectionId: collection.id,
        collectionName: operation.name,
        query: operation.query,
        variables: operation.variables,
      });

      props.onTabActivate?.(tabId);
    },
    [props.tabs, props.onTabCreate]
  );

  const onDelete = useCallback(() => {
    if (collectionToDelete) {
      props.onCollectionsUpdate?.((prev) =>
        prev.filter((item) => item.id !== collectionToDelete.id)
      );

      message({
        type: MessageType.Success,
        text: `Collection "${collectionToDelete.name}" has been deleted`,
      });
    }

    if (collectionOperationToDelete) {
      props.onCollectionsUpdate?.((prev) => {
        const collectionIndex = prev.findIndex((item) =>
          item.operations.includes(collectionOperationToDelete!)
        );

        if (collectionIndex === -1) {
          return prev;
        }

        const result = [...prev];

        result[collectionIndex].operations = result[
          collectionIndex
        ].operations.filter(
          (operation) => operation.name !== collectionOperationToDelete?.name
        );

        return result;
      });

      message({
        type: MessageType.Success,
        text: `Operation "${collectionOperationToDelete.name}" has been deleted from collection`,
      });
    }

    setCollectionToDelete(null);
    setCollectionOperationToDelete(null);
    deleteModalRef.current?.close();
  }, [collectionToDelete, collectionOperationToDelete, deleteModalRef]);

  const toggleCollection = useCallback(
    (collectionId: string) => {
      setCollapsedCollections((prev) => {
        if (prev.includes(collectionId)) {
          return prev.filter((item) => item !== collectionId);
        }

        return [...prev, collectionId];
      });
    },
    [setCollapsedCollections]
  );

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={classNames(
        styles.collections,
        props.shared && styles.shared,
        props.access === "admin" && styles.admin
      )}
    >
      <Modal
        ref={deleteModalRef}
        className={styles.deleteModalContainer}
        options={{ borderTopColor: "#FFC836" }}
      >
        <div className={styles.deleteModal}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIcon}>
              <Icon size={32} icon={<IconWarningFilled />} />
            </div>
            <h2 className={styles.modalTitle}>Warning</h2>
          </div>
          <div className={styles.modalContent}>
            {collectionToDelete && (
              <p className={styles.modalText}>
                Are you sure you want to delete "{collectionToDelete.name}"
                collection?
              </p>
            )}
            {collectionOperationToDelete && (
              <p className={styles.modalText}>
                Are you sure you want to delete "
                {collectionOperationToDelete.name}" operation?
              </p>
            )}
          </div>
          <div className={styles.modalActions}>
            <Button
              label="Cancel"
              type="link"
              onClick={() => deleteModalRef.current?.close()}
            />
            <Button label="Delete" onClick={onDelete} />
          </div>
        </div>
      </Modal>
      <div
        className={classNames(styles.label, !isExpanded && styles.collapsed)}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <Icon className={styles.arrow} icon={<ArrowDown />} size={12} />
        <Icon
          icon={!props.shared ? <IconLocked /> : <IconUnlocked />}
          size={16}
        />
        <span>
          {props.shared ? "Shared" : "Personal"} ({props.collections.length})
        </span>
      </div>
      {isExpanded && (
        <div className={styles.collectionsList}>
          {!!props.collections.length &&
            props.collections.map((collection) => (
              <div
                className={classNames(
                  styles.collection,
                  collapsedCollections.includes(collection.id) &&
                    styles.collapsed
                )}
              >
                {editCollection === collection.id ? (
                  <div className={styles.editName}>
                    <Icon
                      className={styles.arrow}
                      icon={<ArrowDown />}
                      size={12}
                    />
                    <Icon icon={<IconFolder />} size={16} />
                    <input
                      className={classNames(styles.input)}
                      ref={editNameInputRef}
                      type="text"
                      autoFocus
                      defaultValue={collection.name}
                    />
                    <div
                      className={styles.button}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        onCollectionNameUpdate();
                      }}
                    >
                      <Tooltip
                        text="Save"
                        position={TooltipPosition.Bottom}
                        popupStyle={{ padding: "var(--gutter-extra-small)" }}
                      >
                        <Icon
                          className={styles.edit}
                          icon={<Check />}
                          size={16}
                        />
                      </Tooltip>
                    </div>
                    <div
                      className={styles.button}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        setEditCollection(null);
                      }}
                    >
                      <Tooltip
                        text="Discard"
                        position={TooltipPosition.Bottom}
                        popupStyle={{ padding: "var(--gutter-extra-small)" }}
                      >
                        <Icon
                          className={styles.delete}
                          icon={<Close />}
                          size={16}
                        />
                      </Tooltip>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.name}
                    onClick={() => toggleCollection(collection.id)}
                  >
                    <Icon
                      className={styles.arrow}
                      icon={<ArrowDown />}
                      size={12}
                    />
                    <Icon icon={<IconFolder />} size={16} />
                    <div className={styles.text}>
                      <Tooltip
                        truncated
                        text={collection.name}
                        popupStyle={{ padding: "var(--gutter-extra-small)" }}
                        position={TooltipPosition.Bottom}
                      >
                        {collection.name}
                      </Tooltip>
                    </div>
                    {props.access === "admin" ? (
                      props.shared ? (
                        <div className={styles.button}>
                          <PopConfirm
                            icon={<Icon icon={<IconWarning />} size={16} />}
                            title="Make personal"
                            text={`Do you want to make '${collection.name}' personal?`}
                            onConfirm={() => {
                              props.onCollectionsUpdate?.((prev) =>
                                prev.filter((item) => item.id !== collection.id)
                              );

                              props.onSharedCollectionsUpdate?.((prev) => {
                                return [
                                  ...prev,
                                  {
                                    ...collection,
                                    id: guuid(),
                                  },
                                ];
                              });
                            }}
                          >
                            <Icon
                              className={styles.edit}
                              icon={<IconUnlocked />}
                              size={16}
                            />
                          </PopConfirm>
                        </div>
                      ) : (
                        <div className={styles.button}>
                          <PopConfirm
                            icon={<Icon icon={<IconWarning />} size={16} />}
                            title="Make shared"
                            text={`Do you want to make '${collection.name}' shared?`}
                            onConfirm={() => {
                              props.onCollectionsUpdate?.((prev) =>
                                prev.filter((item) => item.id !== collection.id)
                              );

                              props.onSharedCollectionsUpdate?.((prev) => {
                                return [
                                  ...prev,
                                  {
                                    ...collection,
                                    id: guuid(),
                                  },
                                ];
                              });
                            }}
                          >
                            <Icon
                              className={styles.edit}
                              icon={<IconLocked />}
                              size={16}
                            />
                          </PopConfirm>
                        </div>
                      )
                    ) : null}
                    {(!props.shared || props.access === "admin") && (
                      <>
                        <div
                          className={styles.button}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setEditCollection(collection.id);
                          }}
                        >
                          <Tooltip
                            text="Edit"
                            position={TooltipPosition.Bottom}
                            popupStyle={{
                              padding: "var(--gutter-extra-small)",
                            }}
                          >
                            <Icon
                              className={styles.edit}
                              icon={<IconEdit />}
                              size={16}
                            />
                          </Tooltip>
                        </div>
                        <div
                          className={styles.button}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            onCollectionDeleteClick(collection);
                          }}
                        >
                          <Tooltip
                            text="Delete"
                            position={TooltipPosition.Bottom}
                            popupStyle={{
                              padding: "var(--gutter-extra-small)",
                            }}
                          >
                            <Icon
                              className={styles.delete}
                              icon={<Trash />}
                              size={16}
                            />
                          </Tooltip>
                        </div>
                      </>
                    )}
                  </div>
                )}
                <div className={styles.inner}>
                  <div className={styles.operations}>
                    {collection.operations?.length ? (
                      collection.operations
                        // .filter((operation) => operation.name)
                        .map((operation) => (
                          <div
                            className={styles.query}
                            onClick={() =>
                              onCollectionOperationClick(collection, operation)
                            }
                          >
                            <div className={styles.name}>
                              <Tooltip
                                truncated
                                text={operation.name}
                                popupStyle={{
                                  padding: "var(--gutter-extra-small)",
                                }}
                              >
                                {operation.name}
                              </Tooltip>
                            </div>
                            {(!props.shared || props.access === "admin") && (
                              <div
                                className={styles.button}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  onCollectionOperationDeleteClick(operation);
                                }}
                              >
                                <Tooltip
                                  text="Delete operation from collection"
                                  popupStyle={{
                                    padding: "var(--gutter-extra-small)",
                                  }}
                                >
                                  <Icon
                                    className={styles.delete}
                                    icon={<Trash />}
                                    size={16}
                                  />
                                </Tooltip>
                              </div>
                            )}
                          </div>
                        ))
                    ) : (
                      <div className={styles.empty}>
                        No operations in this collection
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function ExplorerSidebarCollectionsWrapper(props: ExplorerSidebarProps) {
  const formRef = useRef<FormRef>(null);
  const modalRef = useRef<any>(null);

  const onCollectionCreateHandler = useCallback(
    (closeModal: () => void) => {
      if (formRef.current) {
        if (formRef.current.validate()) {
          const formValue = formRef.current.getValue();
          const name = formValue.name as string;

          if (
            (formValue.shared
              ? props.sharedCollections
              : props.collections
            ).some((collection) => collection.name === name)
          ) {
            formRef.current.setError({
              name: "Collection with this name already exists",
            });
            return;
          }

          if (formValue.shared) {
            props.onSharedCollectionCreate?.({
              id: guuid(),
              name,
              operations: [],
            });
          } else {
            props.onCollectionCreate?.({ id: guuid(), name, operations: [] });
          }
          closeModal();
        }
      }
    },
    [
      formRef,
      props.onCollectionCreate,
      props.collections,
      props.sharedCollections,
      props.onSharedCollectionCreate,
    ]
  );

  return (
    <div className={styles.collectionsWrapper}>
      <Modal
        ref={modalRef}
        options={{
          title: "Create collection",
          buttons: [
            {
              label: "Cancel",
              tertiary: true,
              handler: (close) => close(),
            },
            {
              label: "Create",
              handler: (close) => onCollectionCreateHandler(close),
            },
          ],
        }}
      >
        <Form
          ref={formRef}
          containerStyle={{ width: "100%" }}
          style={{ gridTemplateColumns: "1fr" }}
          onSubmit={() => onCollectionCreateHandler(modalRef.current.close)}
        >
          <TextInput
            name="name"
            label="Name"
            required
            style={{ width: "100%" }}
          />
          {props.access === "admin" && (
            <Checkbox name="shared" style={{ width: "100%" }}>
              Make collection shared
            </Checkbox>
          )}
        </Form>
      </Modal>

      <div className={styles.title}>
        Collections
        <Button
          className={styles.createCollection}
          icon={<AddCircle />}
          type="link"
          label="Create"
          onClick={() => {
            formRef.current?.clear();
            formRef.current?.setError({});
            formRef.current?.focus?.();
            modalRef.current?.open();
          }}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.grid}>
        <ExplorerSidebarCollections {...props} />
        <div className={styles.divider} />
        {!import.meta.env.VITE_EXPLORER && (
          <ExplorerSidebarCollections
            {...props}
            shared
            collections={props.sharedCollections}
            onCollectionCreate={props.onSharedCollectionCreate}
            onCollectionsUpdate={props.onSharedCollectionsUpdate}
            onSharedCollectionCreate={props.onCollectionCreate}
            onSharedCollectionsUpdate={props.onCollectionsUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default function ExplorerSidebar(props: ExplorerSidebarProps) {
  const [activeTab, setActiveTab] = useState<ExplorerSidebarTabs>(
    (getQueryParamByName("sidebarTab") as ExplorerSidebarTabs) ||
      ExplorerSidebarTabs.Docs
  );

  useEffect(() => {
    updateQueryParamByName("sidebarTab", activeTab);
  }, [activeTab]);

  return (
    <div className={classNames(styles.sidebar)}>
      <div className={styles.navigation}>
        <div className={styles.tabs}>
          {Object.values(ExplorerSidebarTabs).map((value) => {
            return (
              <Tooltip
                text={EXPLORER_SIDEBAR_TABS_LABEL_MAP[value]}
                popupStyle={{ padding: "var(--gutter-extra-small)" }}
                position={TooltipPosition.Bottom}
              >
                <div
                  className={classNames(
                    styles.tab,
                    activeTab === value && styles.active
                  )}
                  onClick={() => setActiveTab(value)}
                >
                  <Icon
                    icon={EXPLORER_SIDEBAR_TABS_ICONS_MAP[value]}
                    size={16}
                  />
                </div>
              </Tooltip>
            );
          })}
        </div>
        <a
          href="https://docs.inigo.io/product/explorer"
          target="_blank"
          rel="noreferrer"
          style={{ marginLeft: "auto" }}
        >
          <Button
            label="Docs"
            type="link"
            icon={<IconLink />}
            iconPosition="right"
          />
        </a>
      </div>
      <div className={classNames(styles.content, styles.card)}>
        {activeTab === ExplorerSidebarTabs.Docs && (
          <ExplorerSidebarDocs {...props} />
        )}
        {activeTab === ExplorerSidebarTabs.Collections && (
          <ExplorerSidebarCollectionsWrapper {...props} />
        )}
        {activeTab === ExplorerSidebarTabs.History && (
          <ExplorerSidebarHistory {...props} />
        )}
        {activeTab === ExplorerSidebarTabs.Settings && (
          <ExplorerSidebarSettings {...props} />
        )}
      </div>
    </div>
  );
}
