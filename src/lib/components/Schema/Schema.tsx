import './Schema.scss';
import classNames from 'classnames';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  ISchemaProps,
  ISchemaPropsItem,
  ISchemaPropsItemProperty,
  ISchemaPropsItemPropertyTypeDef,
  ISchemaPropsItemType,
  ISchemaPropsModel,
} from './Schema.types';
import Tooltip, { TooltipPosition } from '../Tooltip/Tooltip';
import AuthorizedContext from '@containers/Authorized/Authorized.context';
import { DeepPartial } from '@reduxjs/toolkit';
import { Service } from '@utils/api';
import escapeRegExp from 'lodash/escapeRegExp';
import _lowerCase from 'lodash/lowerCase';
import Select, { Option as SelectOption } from '@components/Select/Select';
import Drawer from '@components/Drawer/Drawer';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Icon, { ArrowDown, ArrowRight, IconGraph } from '@components/Icon/Icon';
import { useAppContext } from '@containers/App/App.context';
import { serviceToFullPath, serviceToPath } from '@utils/helpers';
import { PageContext } from '@containers/_Authorized/components/Page/Page';
import Button, { ButtonSize } from '@containers/Authorized/components/Buttons/Button';
import { LayoutWithNavigation } from '@containers/Authorized/components/LayoutWithNavigation/LayoutWithNavigation';

const lowerCase = (str?: string) => _lowerCase(str).replace(/\s/g, '');

interface ReferenceItem {
  name: string;
  count: number;
  properties: ISchemaPropsItemProperty[];
  isImplements?: boolean;
}

const findTypeReferences = (typeName: string, model: ISchemaPropsModel, type: ISchemaPropsItem) => {
  let count = 0;
  const result: ReferenceItem[] = [];

  for (const item of model) {
    if (!item.properties) {
      continue;
    }

    for (const property of item.properties) {
      const args = Object.keys(property.args ?? {}).filter((k) => getTypeName(property.args![k]!.Type) === typeName);
      let sameTypeName = getTypeName(property.typeDetails.Type) === typeName ? 1 : 0;

      if (
        type.type === ISchemaPropsItemType.Directives &&
        item.type !== ISchemaPropsItemType.Enums &&
        property.tags?.length
      ) {
        property.tags?.forEach((tag) => {
          if (tag.key === typeName) {
            sameTypeName = 1;
          }
        });
      }

      if (sameTypeName || args.length) {
        let foundItem = result.find((r) => r.name === item.name);

        if (!foundItem) {
          foundItem = { ...item, count: 0, properties: [] };
          result.push(foundItem);

          count += sameTypeName + args.length;
        }

        foundItem.count += sameTypeName + args.length;
        foundItem.properties.push(property);
      }
    }

    if (item.implements?.includes(typeName)) {
      count += 1;

      result.push({
        name: item.name,
        count: 1,
        isImplements: true,
        properties: [],
      });
    }
  }

  return {
    count,
    references: result,
  };
};

export const getTypeName = (type?: ISchemaPropsItemPropertyTypeDef): string | null => {
  if (!type) {
    return null;
  }

  if (type.List) {
    return getTypeName(type.List);
  }

  return type.TypeName;
};

const renderStringWithSearch = (value: string, searchValue?: string | RegExp | ((str: string) => boolean)) => {
  if (!searchValue) {
    return value;
  }

  if (searchValue instanceof Function) {
    return searchValue(value) ? <span className="SearchValue">{value}</span> : value;
  }

  if (searchValue instanceof RegExp) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: value.replace(searchValue, (match) => `<span class="SearchValue">${match}</span>`),
        }}
      ></span>
    );
  }

  const index = value.toLowerCase().indexOf(searchValue.toLowerCase());

  if (index === -1) {
    return value;
  }

  return (
    <>
      {value.slice(0, index)}
      <span className="SearchValue">{value.slice(index, index + searchValue.length)}</span>
      {value.slice(index + searchValue.length)}
    </>
  );
};

const Tags = ({
  tags,
  activeService,
  onServiceClick,
  typeName,
  searchValue,
}: {
  tags?: ISchemaPropsItemProperty['tags'];
  activeService?: DeepPartial<Service>;
  onServiceClick?: (service: DeepPartial<Service>) => void;
  typeName?: string;
  searchValue?: string | RegExp | ((str: string) => boolean);
}) => {
  const navigate = useNavigate();

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const result: React.ReactElement[] = [];

  const join__type = tags?.filter((t) => t.key === 'join__type' || t.key === 'join__field' || t.key === 'join__owner');

  if (join__type) {
    if (join__type.length > 1) {
      result.push(
        <>
          <Drawer title={typeName} visible={isDrawerVisible} onClose={() => setIsDrawerVisible(false)}>
            <div className="join__type__drawer">
              <div className="join__type__drawer__details">Subgraphs ({join__type.length})</div>
              <div className="join__type__drawer__list">
                {join__type
                  .map((t) => {
                    const lowerCasedValue = lowerCase((t.details.graph ?? t.details.name).Value.Value);

                    const service = activeService?.subServices?.find((subService) => {
                      return subService && lowerCase(subService.name) === lowerCasedValue;
                    });

                    return { key: (t.details.graph ?? t.details.name).Value.Value, service };
                  })
                  .filter((t) => t.service)
                  .map((t) => (
                    <div
                      key={t.key}
                      className="join__type__drawer__list__item"
                      onClick={() => {
                        return navigate(
                          window.location.pathname.replace(
                            `${serviceToPath(activeService)}`,
                            `${serviceToPath(t.service)}`,
                          ),
                        );
                      }}
                    >
                      {t.key}
                    </div>
                  ))}
              </div>
            </div>
          </Drawer>
          <div
            key="join__type"
            className="join__type"
            onClick={(ev) => {
              ev.stopPropagation();
              setIsDrawerVisible(true);
            }}
          >
            {join__type.length > 1 ? `Subgraphs (${join__type.length})` : 'Subgraph'}
          </div>
        </>,
      );
    } else if (join__type.length === 1) {
      const lowerCasedValue = lowerCase(join__type[0].details.graph.Value.Value);
      const service = activeService?.subServices?.find((subService) => {
        return subService && lowerCase(subService.name) === lowerCasedValue;
      });

      if (service) {
        result.push(
          <div
            className="join__type"
            onClick={() => {
              return navigate(
                window.location.pathname.replace(`${serviceToPath(activeService)}`, `${serviceToPath(service)}`),
              );
            }}
          >
            ({renderStringWithSearch(join__type[0].details.graph.Value.Value, searchValue)})
          </div>,
        );
      }
    }
  }

  if (tags) {
    result.push(
      ...tags
        ?.filter((t) => t.key !== 'join__type' && t.key !== 'join__field' && t.key !== 'join__owner')
        .map((t, i) => {
          if (t.details && Object.keys(t.details).length) {
            if (['access', 'ratelimit', 'join__graph'].includes(t.key)) {
              const args = Object.keys(t.details)
                .map((key) => `${key}: ${t.details[key].Value.Str}`)
                .join(', ');

              return (
                <div key={`${t}.${i}`} className="Tag">
                  <div className="Badge">{renderStringWithSearch(`${t.key}(${args})`, searchValue)}</div>
                </div>
              );
            }

            return (
              <div key={`${t}.${i}`} className="Tag">
                <Tooltip
                  position={TooltipPosition.Bottom}
                  popupStyle={{ padding: '4px 8px' }}
                  renderContent={() => {
                    return (
                      <div>
                        {Object.keys(t.details ?? {}).map((key) => {
                          const lowerCasedValue = lowerCase(t.details[key].Value.Value);
                          const service = activeService?.subServices?.find(
                            (subService) => subService && lowerCase(subService.name) === lowerCasedValue,
                          );

                          if (key === 'graph' && service) {
                            return (
                              <div key={key} className="TagTooltip">
                                <span>{key}</span>:{' '}
                                <span style={{ cursor: 'pointer' }} onClick={() => onServiceClick?.(service!)}>
                                  {t.details[key].Value.Value}
                                </span>
                              </div>
                            );
                          }
                          return (
                            <div key={key} className="TagTooltip">
                              <span>{key}</span>: {t.details[key].Value.Value}
                            </div>
                          );
                        })}
                      </div>
                    );
                  }}
                >
                  <div className="Badge">{renderStringWithSearch(`${t.key}(...)`, searchValue)}</div>
                </Tooltip>
              </div>
            );
          }

          return (
            <div key={t.key} className="Badge">
              {renderStringWithSearch(t.key, searchValue)}
            </div>
          );
        }),
    );
  }

  return <>{result}</>;
};

const renderType = (
  td: ISchemaPropsItemPropertyTypeDef,
  isClickable: (typeName: string) => boolean,
  isScalar: (typeName: string) => boolean,
  activeServiceId?: string,
  onClick?: () => void,
  searchValue?: string | RegExp | ((str: string) => boolean),
): React.ReactNode => {
  const result = [];

  if (td.List) {
    result.push('[', renderType(td.List, isClickable, isScalar, activeServiceId, onClick, searchValue), ']');
  } else {
    const clickable = isClickable(td.TypeName);

    if (onClick && clickable) {
      result.push(
        <NavLink
          className={classNames('SelectedTypePropertyArgsItemType', 'Active', isScalar(td.TypeName) && 'Scalar')}
          key={td.TypeName}
          to={`/${activeServiceId}/schema/${td.TypeName}${window.location.search}`}
          onClick={onClick}
        >
          {renderStringWithSearch(td.TypeName, searchValue)}
        </NavLink>,
      );
    } else {
      result.push(
        <span className={classNames('SelectedTypePropertyArgsItemType', { Active: clickable })} onClick={onClick}>
          {renderStringWithSearch(td.TypeName, searchValue)}
        </span>,
      );
    }
  }

  if (td.Required) {
    result.push('!');
  }

  return result;
};

function renderSelectedTypePropertyType(
  info: Pick<ISchemaPropsItemProperty['typeDetails'], 'Type'>,
  data: ISchemaPropsModel,
  activeService?: DeepPartial<Service>,
  onClick?: () => void,
  searchValue?: string | RegExp | ((str: string) => boolean),
  onServiceClick?: (service: DeepPartial<Service>) => void,
) {
  return (
    <span className="SelectedTypePropertyArgsItem">
      {renderType(
        info.Type,
        (typeName) => data.some((item) => item.name === typeName),
        (typeName) => data.some((item) => item.type === ISchemaPropsItemType.Scalars && item.name === typeName),
        serviceToPath(activeService),
        onClick,
        searchValue,
      )}
    </span>
  );
}

function renderSelectedTypePropertyArgsItem(
  name: string,
  info: ISchemaPropsItemPropertyTypeDef,
  data: ISchemaPropsModel,
  activeServiceId?: string,
  onClick?: () => void,
  searchValue?: string | RegExp | ((str: string) => boolean),
) {
  return (
    <span className="SelectedTypePropertyArgsItem">
      {renderStringWithSearch(name, searchValue)}:{' '}
      {renderType(
        info,
        (typeName) => data.some((item) => item.name === typeName),
        (typeName) => data.some((item) => item.type === ISchemaPropsItemType.Scalars && item.name === typeName),
        activeServiceId,
        onClick,
        searchValue,
      )}
      <span className="SelectedTypePropertyArgsItemComma">, </span>
    </span>
  );
}

function renderSelectedTypePropertyArgs(
  args: ISchemaPropsItemProperty['args'],
  data: ISchemaPropsModel,
  activeServiceId?: string,
  onClick?: () => void,
  searchValue?: string | RegExp | ((str: string) => boolean),
) {
  if (!args || !Object.keys(args).length) {
    return '';
  }

  return (
    <span className="SelectedTypePropertyArgs">
      (
      {Object.entries(args).map(([name, info]) =>
        renderSelectedTypePropertyArgsItem(name, info.Type, data, activeServiceId, onClick, searchValue),
      )}
      )
    </span>
  );
}

function renderSelectedTypeProperty(
  property: ISchemaPropsItemProperty,
  data: ISchemaPropsModel,
  onClick: () => void,
  searchValue?: string | RegExp | ((str: string) => boolean),
  activeService?: DeepPartial<Service>,
  onServiceClick?: (service: DeepPartial<Service>) => void,
  typeName?: string,
  showAnalytics = true,
) {
  return (
    <>
      {property.description && (
        <div className="SelectedTypePropertyDescription" key={`${property.name}__desc`}>
          {property.description}
        </div>
      )}
      <div className="SelectedTypeProperty" key={property.name}>
        <span className="SelectedTypePropertyName">
          {renderStringWithSearch(property.name, searchValue)}
          {renderSelectedTypePropertyArgs(property.args, data, serviceToPath(activeService), onClick, searchValue)}:
          {showAnalytics && typeName !== 'schema' && (
            <Tooltip
              parentClassName="Observe"
              text="Observe"
              popupStyle={{ fontFamily: "'Roboto', sans-serif" }}
              position={TooltipPosition.Top}
            >
              <Link
                // className="SelectedTypePropertyNameGoTo"
                to={`/${serviceToPath(activeService)}/observe?field_EQ=${typeName}.${property.name}`}
              >
                {/* <Icon icon={<IconGraph />} size={16} /> */}
                {/* <Button icon={<IconGraph />} /> */}
                <Button icon size={ButtonSize.Small}>
                  <Icon icon={<IconGraph />} size={16} />
                </Button>
              </Link>
            </Tooltip>
          )}
        </span>
        {!!property.typeDetails && (
          <>
            <span className={classNames('SelectedTypePropertyType')}>
              {renderSelectedTypePropertyType(property.typeDetails, data, activeService, onClick, searchValue)}
            </span>
          </>
        )}
        <Tags
          tags={property.tags}
          activeService={activeService}
          onServiceClick={onServiceClick}
          searchValue={searchValue}
          typeName={`${typeName}.${property.name}`}
        />
      </div>
    </>
  );
}

function renderSelectedEnumProperty(
  property: ISchemaPropsItemProperty,
  data: ISchemaPropsModel,
  searchValue?: string | RegExp | ((str: string) => boolean),
  activeService?: DeepPartial<Service>,
  onServiceClick?: (service: DeepPartial<Service>) => void,
) {
  return (
    <>
      {property.description && (
        <div className="SelectedTypePropertyDescription" key={`${property.name}__desc`}>
          {property.description}
        </div>
      )}
      <div className="SelectedTypeProperty" key={property.name}>
        <span className="SelectedTypePropertyName">{renderStringWithSearch(property.name, searchValue)},</span>
        <Tags
          tags={property.tags}
          activeService={activeService}
          onServiceClick={onServiceClick}
          searchValue={searchValue}
        />
      </div>
    </>
  );
}

function renderSelectedUnionProperty(
  property: ISchemaPropsItemProperty,
  data: ISchemaPropsModel,
  isLast: boolean,
  onClick: () => void,
  searchValue?: string | RegExp | ((str: string) => boolean),
  activeService?: DeepPartial<Service>,
  onServiceClick?: (service: DeepPartial<Service>) => void,
) {
  return (
    <>
      {property.description && (
        <div className="SelectedTypePropertyDescription" key={`${property.name}__desc`}>
          {property.description}
        </div>
      )}
      <div className="SelectedTypeProperty" key={property.name}>
        {renderSelectedTypePropertyType(
          { Type: { TypeName: property.typeDetails.Name, Index: 0, Required: false } },
          data,
          activeService,
          onClick,
          searchValue,
          onServiceClick,
        )}
        {isLast ? ';' : <span>|</span>}
      </div>
    </>
  );
}

const ReferencesListItem = ({
  name,
  count,
  properties,
  typeName,
  model,
  isImplements,
}: ReferenceItem & { model: ISchemaPropsModel; typeName: string }) => {
  const { activeService } = useContext(AuthorizedContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const onButtonClick = useCallback(() => {
    if (!isImplements) {
      setIsExpanded(!isExpanded);
    }
  }, [isExpanded, isImplements]);

  const nameNode = useMemo(() => {
    if (isImplements) {
      return (
        <Link
          className="SelectedTypeReferencesListItemName"
          to={`/${serviceToPath(activeService)}/schema/${name}${window.location.search}`}
        >
          {name}
          <div className="SelectedTypeReferencesListItemImplements">
            <span>implements</span> {renderStringWithSearch(typeName, typeName)}
          </div>
        </Link>
      );
    }

    return (
      <div className="SelectedTypeReferencesListItemName" onClick={onButtonClick}>
        <div className="SelectedTypeReferencesListItemNameIcon">
          <Icon icon={<ArrowDown />} size={12} />
        </div>

        {name}
        <div className="SelectedTypeReferencesListItemNameCount">{count}</div>
      </div>
    );
  }, [isImplements, name, onButtonClick, typeName]);

  return (
    <div className={classNames('SelectedTypeReferencesListItem', { Expanded: isExpanded, Implements: isImplements })}>
      {nameNode}
      <div className="SelectedTypeReferencesListItemWrapper">
        <div className="SelectedTypeReferencesListItemContent">
          {properties.map((property: any) => (
            <Link to={`/${serviceToPath(activeService)}/schema/${name}${window.location.search}`}>
              {renderSelectedTypeProperty(
                {
                  ...property,
                  description: undefined,
                },
                model,
                () => {},
                (str) => {
                  if (str.includes('(')) {
                    return str.split('(')[0] === typeName;
                  }

                  return str === typeName;
                },
                activeService,
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const References = ({
  typeName,
  model,
  type,
}: {
  typeName: string;
  model: ISchemaPropsModel;
  type: ISchemaPropsItem;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const data = useMemo(() => {
    if (typeName && model) {
      return findTypeReferences(typeName, model, type);
    }

    return null;
  }, [typeName, model]);

  const onButtonClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  if (!data || !data.count) {
    return null;
  }

  return (
    <div className={classNames('SelectedTypeReferences', { Expanded: isExpanded })}>
      <div className="SelectedTypeReferencesButton" onClick={onButtonClick}>
        {isExpanded ? (
          <Icon className="SelectedTypeReferencesButtonIcon" icon={<ArrowDown />} size={12} />
        ) : (
          <Icon className="SelectedTypeReferencesButtonIcon" icon={<ArrowRight />} size={12} />
        )}
        {data.count} references
      </div>
      <div className="SelectedTypeReferencesListWrapper">
        <div className="SelectedTypeReferencesList">
          {data.references.map((reference) => (
            <ReferencesListItem key={reference.name} {...reference} typeName={typeName} model={model} />
          ))}
        </div>
        <div className="SelectedTypeReferencesListDivider"></div>
      </div>
    </div>
  );
};

export function SelectedType({
  type,
  data,
  onClick,
  searchValue,
  activeService,
  onServiceClick,
  compact,
}: {
  type: ISchemaPropsItem;
  data: ISchemaPropsModel;
  onClick: () => void;
  searchValue?: string | RegExp | ((str: string) => boolean);
  activeService?: DeepPartial<Service>;
  onServiceClick?: (service: DeepPartial<Service>) => void;
  compact?: boolean;
}) {
  const { filter } = useContext(PageContext);

  let prefix = 'type';

  if (type.type === ISchemaPropsItemType.Inputs) {
    prefix = 'input';
  }

  if (type.type === ISchemaPropsItemType.Enums) {
    prefix = 'enum';
  }

  if (type.type === ISchemaPropsItemType.Unions) {
    prefix = 'unions';
  }

  if (type.type === ISchemaPropsItemType.Interfaces) {
    prefix = 'interface';
  }

  if (type.type === ISchemaPropsItemType.Scalars) {
    prefix = 'scalar';
  }

  if (type.type === ISchemaPropsItemType.Directives) {
    prefix = 'directive';
  }

  if (type.type === ISchemaPropsItemType.Schema) {
    prefix = '';
  }

  const hasProperties = type.properties?.length > 0;
  const propertiesToRender = filter?.role
    ? type.properties?.filter((property) => {
        const accessTag = property.tags?.find((tag) => tag.key === 'access');

        if (!accessTag) {
          return true;
        }

        return accessTag.details?.role?.Value?.Value?.includes(filter.role);
      })
    : type.properties;

  return (
    <>
      {!compact && <References key={type.name} typeName={type.name} model={data} type={type} />}
      <div className="SelectedTypeInner">
        {type.description && (
          <div className="SelectedTypeDescription" key={`${type.name}__desc`}>
            {type.description}
          </div>
        )}
        <div className="SelectedTypeProperty" style={{ paddingLeft: 0 }}>
          {prefix}
          {!!searchValue ? (
            <NavLink
              className={classNames('Active', type.type === ISchemaPropsItemType.Scalars && 'Scalar')}
              to={`/${serviceToPath(activeService)}/schema/${type.name}${window.location.search}`}
              onClick={onClick}
            >
              {type.type === ISchemaPropsItemType.Directives && '@'}
              {renderStringWithSearch(type.name === 'inigo.schema' ? 'schema' : type.name, searchValue)}
            </NavLink>
          ) : (
            <span className={classNames('Active', type.type === ISchemaPropsItemType.Scalars && 'Scalar')}>
              {type.type === ISchemaPropsItemType.Directives && '@'}
              {renderStringWithSearch(type.name === 'inigo.schema' ? 'schema' : type.name, searchValue)}
            </span>
          )}
          {type.type === ISchemaPropsItemType.Directives &&
            renderSelectedTypePropertyArgs(
              type.directive?.args,
              data,
              serviceToPath(activeService),
              onClick,
              searchValue,
            )}
          {type.type === ISchemaPropsItemType.Directives && (
            <>
              ON
              {type.directive?.locations.map((location, i) => (
                <>
                  <span className="DirectiveLocation">{location}</span>{' '}
                  {type.directive?.locations && i !== type.directive?.locations.length - 1 && <span>|</span>}
                </>
              ))}
            </>
          )}
          {!searchValue && (
            <Tags
              tags={type.tags}
              activeService={activeService}
              onServiceClick={onServiceClick}
              searchValue={searchValue}
              typeName={`type ${type.name}`}
            />
          )}
          {hasProperties && (type.type === ISchemaPropsItemType.Unions ? `=` : `{`)}
        </div>
        {hasProperties && (
          <>
            {!!searchValue && <span className="SelectedTypeProperty SelectedTypePropertyMore">...</span>}
            {(type.type === ISchemaPropsItemType.Schema ||
              type.type === ISchemaPropsItemType.Types ||
              type.type === ISchemaPropsItemType.Inputs ||
              type.type === ISchemaPropsItemType.Interfaces) &&
              propertiesToRender.map((property) =>
                renderSelectedTypeProperty(
                  property,
                  data,
                  onClick,
                  compact ? '' : searchValue,
                  activeService,
                  onServiceClick,
                  type.name,
                  compact === true ? false : type.type === ISchemaPropsItemType.Types,
                ),
              )}
            {type.type === ISchemaPropsItemType.Enums &&
              propertiesToRender.map((property) =>
                renderSelectedEnumProperty(property, data, searchValue, activeService, onServiceClick),
              )}
            {type.type === ISchemaPropsItemType.Unions &&
              propertiesToRender.map((property, index) =>
                renderSelectedUnionProperty(
                  property,
                  data,
                  index === type!.properties.length - 1,
                  onClick,
                  searchValue,
                  activeService,
                  onServiceClick,
                ),
              )}
            {!!searchValue && <span className="SelectedTypeProperty SelectedTypePropertyMore">...</span>}
            <div className="SelectedTypeProperty" style={{ paddingLeft: 0 }}>
              {type.type !== ISchemaPropsItemType.Unions ? `}` : ''}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function renderSearchResults(
  items: ISchemaPropsItem[],
  searchValue: string,
  onClick: () => void,
  activeService?: DeepPartial<Service>,
  theme?: 'dark' | 'light',
) {
  const itemsToRender = items.filter(
    (item) =>
      new RegExp(escapeRegExp(searchValue.toLowerCase())).test(item.name.toLowerCase()) ||
      item.properties?.some((property) => {
        const regex = new RegExp(escapeRegExp(searchValue.toLowerCase()));
        const typeName = getTypeName(property.typeDetails.Type);

        const isNameMatch = regex.test(property.name.toLowerCase());
        const isTypeMatch = typeName && regex.test(typeName.toLowerCase());

        const isArgsMatch = Object.entries(property.args ?? {}).some(([key, arg]) => {
          const argTypeName = getTypeName(arg.Type);

          const isArgNameMatch = regex.test(arg.Name.toLowerCase());
          const isArgTypeMatch = argTypeName && regex.test(argTypeName.toLowerCase());

          return isArgNameMatch || isArgTypeMatch;
        });

        const isTagsMatch = property.tags?.some((tag) => {
          const argsString = Object.keys(tag.details ?? {})
            .map((key) => `${key}: ${tag.details[key].Value.Str}`)
            .join(', ');

          const tagString = `${tag.key}(${argsString})`;

          return regex.test(tagString.toLowerCase());
        });

        return isNameMatch || isTypeMatch || isArgsMatch || isTagsMatch;
      }),
  );

  if (!itemsToRender.length) {
    return (
      <div className="SelectedType">
        <div className="SearchResult">
          <div className="SearchResultNoResults">
            <img
              src={theme === 'dark' ? '/assets/images/EmptyState_dark.svg' : '/assets/images/EmptyState.svg'}
              width={320}
              alt=""
            />
            <div className="SearchResultNoResultsText">
              <div className="SearchResultNoResultsTitle">Nothing to show</div>
              <div className="SearchResultNoResultsDescription">Try to change the filters to get more information.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return itemsToRender.map((item) => {
    return (
      <div className="SearchResultType">
        {
          <div className="SearchResultTypeItems">
            <SelectedType
              type={{
                ...item,
                properties: item.properties?.filter((property) => {
                  const regex = new RegExp(escapeRegExp(searchValue.toLowerCase()));
                  const typeName = getTypeName(property.typeDetails.Type);

                  const isNameMatch = regex.test(property.name.toLowerCase());
                  const isTypeMatch = typeName && regex.test(typeName.toLowerCase());

                  const isArgsMatch = Object.entries(property.args ?? {}).some(([key, arg]) => {
                    const argTypeName = getTypeName(arg.Type);

                    const isArgNameMatch = regex.test(arg.Name.toLowerCase());
                    const isArgTypeMatch = argTypeName && regex.test(argTypeName.toLowerCase());

                    return isArgNameMatch || isArgTypeMatch;
                  });

                  const isTagsMatch = property.tags?.some((tag) => {
                    const argsString = Object.keys(tag.details ?? {})
                      .map((key) => `${key}: ${tag.details[key].Value.Str}`)
                      .join(', ');

                    const tagString = `${tag.key}(${argsString})`;

                    return regex.test(tagString.toLowerCase());
                  });

                  return isNameMatch || isTypeMatch || isArgsMatch || isTagsMatch;
                }),
              }}
              data={items}
              onClick={onClick}
              searchValue={searchValue}
              activeService={activeService}
            />
          </div>
        }
      </div>
    );
  });
}

function Schema(props: ISchemaProps) {
  const { theme } = useAppContext();
  const { activeService, activeParentService } = useContext(AuthorizedContext);
  const [filter, setFilter] = useState(ISchemaPropsItemType.All);

  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const onServiceClick = useCallback(
    (service: DeepPartial<Service>) => {
      navigate(window.location.pathname.replace(`${serviceToPath(activeService)}`, serviceToPath(service)));
    },
    [activeService],
  );

  const [renderedSearchResultsCache, setRenderedSearchResultsCache] = useState<
    Record<string, JSX.Element | JSX.Element[]>
  >({});

  useEffect(() => {
    setRenderedSearchResultsCache({});
  }, [theme]);

  const renderSearchResult = useCallback(
    (search: string) => {
      if (props.data && search) {
        let renderedSearchResult = renderedSearchResultsCache[search];

        if (!renderedSearchResult) {
          renderedSearchResult = renderSearchResults(
            props.data,
            search,
            () => {
              setSearchValue('');
              setFilter(ISchemaPropsItemType.All);
            },
            activeService,
            theme,
          );

          setRenderedSearchResultsCache((prev) => ({
            ...prev,
            [search]: renderedSearchResult,
          }));
        }

        return renderedSearchResult;
      }
    },
    [renderedSearchResultsCache, searchValue, activeService, theme],
  );

  const routes = useMemo(() => {
    return props.data?.map((item) => (
      <Route
        path={`/${item.name}`}
        element={
          <SelectedType
            type={item}
            data={props.data}
            onClick={() => {
              setFilter(ISchemaPropsItemType.All);
            }}
            activeService={activeService}
            onServiceClick={onServiceClick}
          />
        }
      />
    ));
  }, [props.data, activeService]);

  const navigationItems = useMemo(() => {
    return props.data
      ?.filter((item) => {
        if (filter === ISchemaPropsItemType.All) {
          return true;
        }

        return item.type === filter;
      })
      .map((item) => ({
        title: item.name,
        path: `/${serviceToPath(activeService)}/schema/${item.name}${window.location.search}`,
      }));
  }, [props.data, activeService, filter]);

  const getNavigationCount = useCallback(
    (type: ISchemaPropsItemType = ISchemaPropsItemType.All) => {
      let items: ISchemaPropsItem[] = [];

      if (props.data) {
        if (type === ISchemaPropsItemType.All) {
          items = props.data;
        } else {
          items = props.data?.filter((item) => item.type === type);
        }
      }

      if (searchValue) {
        items = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
      }

      return items.length;
    },
    [props.data, searchValue],
  );

  if (
    window.location.pathname === `/${serviceToFullPath(activeService, activeParentService)}/schema` &&
    props.data.length
  ) {
    return (
      <Navigate
        replace
        to={`/${serviceToFullPath(activeService, activeParentService)}/schema/${props.data[0].name}${window.location.search}`}
      />
    );
  }

  return (
    <LayoutWithNavigation
      className="Schema"
      search={{
        enabled: true,
      }}
      onSearch={setSearchValue}
      navigation={{
        items: navigationItems,
        renderItem: (item) => (item.title === 'inigo.schema' ? 'schema' : item.title),
        virtualization: {
          enabled: true,
        },
        slot: (
          <div className="TypeNavigationFilters">
            <Select
              style={
                {
                  '--text-input-background-color': 'var(--color-background-primary)',
                } as React.CSSProperties
              }
              value={filter}
              prefix={<div className="SelectPrefix">Show</div>}
              onChange={(value: unknown) => setFilter(value as ISchemaPropsItemType)}
            >
              <SelectOption value={ISchemaPropsItemType.All}>
                <div className="TypeNavigationFiltersOption">
                  All <span>{getNavigationCount()}</span>
                </div>
              </SelectOption>
              <SelectOption value={ISchemaPropsItemType.Types}>
                <div className="TypeNavigationFiltersOption">
                  Types <span>{getNavigationCount(ISchemaPropsItemType.Types)}</span>
                </div>
              </SelectOption>
              <SelectOption value={ISchemaPropsItemType.Inputs}>
                <div className="TypeNavigationFiltersOption">
                  Inputs <span>{getNavigationCount(ISchemaPropsItemType.Inputs)}</span>
                </div>
              </SelectOption>
              <SelectOption value={ISchemaPropsItemType.Interfaces}>
                <div className="TypeNavigationFiltersOption">
                  Interfaces <span>{getNavigationCount(ISchemaPropsItemType.Interfaces)}</span>
                </div>
              </SelectOption>
              <SelectOption value={ISchemaPropsItemType.Enums}>
                <div className="TypeNavigationFiltersOption">
                  Enums <span>{getNavigationCount(ISchemaPropsItemType.Enums)}</span>
                </div>
              </SelectOption>
              <SelectOption value={ISchemaPropsItemType.Unions}>
                <div className="TypeNavigationFiltersOption">
                  Unions <span>{getNavigationCount(ISchemaPropsItemType.Unions)}</span>
                </div>
              </SelectOption>
              <SelectOption value={ISchemaPropsItemType.Scalars}>
                <div className="TypeNavigationFiltersOption">
                  Scalars <span>{getNavigationCount(ISchemaPropsItemType.Scalars)}</span>
                </div>
              </SelectOption>
              <SelectOption value={ISchemaPropsItemType.Directives}>
                <div className="TypeNavigationFiltersOption">
                  Directives <span>{getNavigationCount(ISchemaPropsItemType.Directives)}</span>
                </div>
              </SelectOption>
            </Select>
          </div>
        ),
      }}
      loading={props.loading}
      empty={{
        enabled: !props.loading && !props.data?.length,
        message: 'No schema was detected.',
      }}
    >
      {!!searchValue.length && <div className="SearchResult">{renderSearchResult(searchValue)}</div>}
      {!searchValue.length && <div className="SelectedType">{!props.loading && <Routes>{routes}</Routes>}</div>}
    </LayoutWithNavigation>
  );
}

export default Schema;
