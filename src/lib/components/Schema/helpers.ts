import { ISchemaPropsItem, ISchemaPropsItemType } from "./Schema.types";
import { ISchemaPropsItemProperty, ISchemaPropsModel } from "./Schema.types";
import { useEffect, useMemo, useRef, useState } from "react";
import { capitalize, debounce } from "lodash";
import { Maybe } from "../../utils/types";

export function sortObjectOfObjects(obj: any, sortedKey: string) {
  if (obj) {
    return Object.entries(obj)
      .sort((a: any, b: any) => a[1][sortedKey] - b[1][sortedKey])
      .reduce((result: any, item: any) => {
        const [key, value] = item;
        result[key] = value;
        return result;
      }, {});
  }
  return obj;
}

function mergeDirectives(directives?: any) {
  const result: any[] = [];

  if (directives) {
    Object.entries(directives).forEach(([key, value]: [string, any]) => {
      if (Array.isArray(value)) {
        result.push(...value);
      } else {
        result.push(value);
      }
    });
  }

  return result;
}

function handleSchemaTypes(
  types: any,
  coverage: boolean,
  type: ISchemaPropsItemType
) {
  return Object.entries({ ...types }).map(
    ([name, value]: [string, any]): any => {
      const properties = Object.entries(value.Fields ?? value.InputFields ?? {})
        .map(
          (
            [fieldName, fieldValue]: [string, any],
            index
          ): ISchemaPropsItemProperty => {
            return {
              index,
              name: fieldName,
              count: 0,
              calls: 0,
              type: fieldValue.Type.Name,
              description: fieldValue.Description?.join("\n"),
              typeDetails: fieldValue,
              args: sortObjectOfObjects(fieldValue.Args, "Index"),
              tags: mergeDirectives(fieldValue?.Directives).map(
                (directive: any) => ({
                  key: directive.Name,
                  details: directive.Args,
                })
              ),
            };
          }
        )
        .sort((a, b) => a.typeDetails.Index - b.typeDetails.Index);

      return {
        name,
        type,
        properties,
        description: value.Description?.join("\n"),
        implements: value.Implements,
        tags: mergeDirectives(value?.Directives).map((directive: any) => ({
          key: directive.Name,
          details: directive.Args,
        })),
      };
    }
  );
}

function handleSchema(value: any, coverage: boolean) {
  const properties = Object.entries(value.Operations ?? {}).map(
    (
      [fieldName, fieldValue]: [string, any],
      index
    ): ISchemaPropsItemProperty => {
      return {
        index,
        name: fieldName,
        count: 0,
        calls: 0,
        type: fieldValue,
        // description: fieldValue,
        typeDetails: {
          Index: index,
          Name: fieldValue,
          DefaultValue: null,
          Type: {
            Index: index,
            TypeName: fieldValue,
            List: undefined,
            Required: false,
          },
        },
        // args: sortObjectOfObjects(fieldValue.Args, 'Index'),
        // tags: mergeDirectives(fieldValue?.Directives).map((directive: any) => ({ key: directive.Name, details: directive.Args }))
      };
    }
  );

  return {
    name: "inigo.schema",
    type: ISchemaPropsItemType.Schema,
    properties,
    tags: mergeDirectives(value?.Directives).map((directive: any) => ({
      key: directive.Name,
      details: directive.Args,
    })),
    ...(coverage && {
      coverage: 0,
    }),
  };
}

function handleSchemaEnums(
  enums: any,
  coverage: boolean,
  type: ISchemaPropsItemType
) {
  return Object.entries({ ...enums }).map(
    ([name, value]: [string, any]): any => {
      const properties = Object.entries(value.Values)
        .map(
          (
            [fieldName, fieldValue]: [string, any],
            index
          ): ISchemaPropsItemProperty => {
            return {
              index,
              name: fieldName,
              count: 0,
              calls: 0,
              typeDetails: fieldValue,
              description: fieldValue.Description?.join("\n"),
              tags: mergeDirectives(fieldValue?.Directives).map(
                (directive: any) => ({
                  key: directive.Name,
                  details: directive.Args,
                })
              ),
            };
          }
        )
        .sort((a, b) => a.typeDetails.Index - b.typeDetails.Index);
      return {
        name,
        type,
        properties,
        descriotion: value.Description?.join("\n"),
        tags: mergeDirectives(value?.Directives).map((directive: any) => ({
          key: directive.Name,
          details: directive.Args,
        })),
        ...(coverage && {
          coverage: 0,
        }),
      };
    }
  );
}

function handleSchemaScalars(
  scalars: any,
  coverage: boolean,
  type: ISchemaPropsItemType
) {
  return Object.entries({ ...scalars }).map(
    ([name, value]: [string, any]): any => {
      return {
        name,
        type,
        description: value.Description?.join("\n"),
      };
    }
  );
}

function handleSchemaDirectives(
  directives: any,
  coverage: boolean,
  type: ISchemaPropsItemType
) {
  return Object.entries({ ...directives }).map(
    ([name, value]: [string, any]): any => {
      return {
        name,
        type,
        directive: {
          args: sortObjectOfObjects(value.Args, "Index"),
          locations: value.Locations,
        },
      };
    }
  );
}

export function prepareSchemaData(
  data: any,
  coverage: boolean = false
): Maybe<ISchemaPropsModel> {
  if (data) {
    let result: ISchemaPropsModel = [];

    if (!coverage) {
      result = [...result, handleSchema(data.Schema, coverage)];
    }

    result = [
      ...result,
      ...handleSchemaTypes(data.Types, coverage, ISchemaPropsItemType.Types),
    ];

    if (!coverage) {
      result = [
        ...result,
        ...handleSchemaTypes(
          data.Inputs,
          coverage,
          ISchemaPropsItemType.Inputs
        ),
      ];
      result = [
        ...result,
        ...handleSchemaTypes(
          data.Interfaces,
          coverage,
          ISchemaPropsItemType.Interfaces
        ),
      ];
      result = [
        ...result,
        ...handleSchemaEnums(
          data.Unions,
          coverage,
          ISchemaPropsItemType.Unions
        ),
      ];
      result = [
        ...result,
        ...handleSchemaEnums(data.Enums, coverage, ISchemaPropsItemType.Enums),
      ];
      result = [
        ...result,
        ...handleSchemaScalars(
          data.Scalars,
          coverage,
          ISchemaPropsItemType.Scalars
        ),
      ];
      result = [
        ...result,
        ...handleSchemaDirectives(
          data.DirectiveDefinitions,
          coverage,
          ISchemaPropsItemType.Directives
        ),
      ];
    }

    result = [
      result.find((item) => item.name === "inigo.schema") as ISchemaPropsItem,
      result.find((item) => item.name === "Query") as ISchemaPropsItem,
      result.find((item) => item.name === "Mutation") as ISchemaPropsItem,
      ...result
        .filter(
          (item) =>
            item.name !== "Query" &&
            item.name !== "Mutation" &&
            item.name !== "inigo.schema"
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    ].filter((item) => item);

    return result;
  }

  return null;
}
