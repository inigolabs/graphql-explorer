import moment from 'moment';
import { DATE_PREDEFINED_FILTERS } from '@shared/components/Menu/DateMenu';
import { EventFilter, QueryDataFilter, QueryTracesAggFilter, ReportFilter } from '@utils/api';

export const processVariables = (variables: any, from?: moment.Moment) => {
  if (variables.filter) {
    variables.filter = {
      ...variables.filter,
    };

    if (variables.filter.observedAt_GTEQ && variables.filter.observedAt_GTEQ in DATE_PREDEFINED_FILTERS) {
      const key = variables.filter.observedAt_GTEQ as keyof typeof DATE_PREDEFINED_FILTERS;

      variables.filter.observedAt_GTEQ = moment(DATE_PREDEFINED_FILTERS[key].getValue(from))
        .startOf('minute')
        .toISOString();
      delete variables.filter.observedAt_LTEQ;
    }

    if (variables.filter.observedAt_GTEQ) {
      variables.filter.observedAt_GTEQ = moment(variables.filter.observedAt_GTEQ).startOf('minute').toISOString();
    }

    if (variables.filter.observedAt_LTEQ) {
      variables.filter.observedAt_LTEQ = moment(variables.filter.observedAt_LTEQ).startOf('minute').toISOString();
    }

    // add dot (.) prefix to field_EQ if it's missing
    if (variables.filter.field_EQ) {
      const parts = variables.filter.field_EQ.split('.');
      if (parts.length !== 2) {
        variables.filter.field_EQ = '.' + variables.filter.field_EQ;
      }
    }

    for (const key in variables.filter) {
      if (variables.filter[key] === 'UNSET') {
        delete variables.filter[key];
      } else if (key.endsWith('_OUT')) {
        variables.filter[key] = variables.filter[key]?.filter((value: string) => value !== 'UNSET');

        if (!variables.filter[key]?.length) {
          delete variables.filter[key];
        }
      } else if (key.endsWith('_IN')) {
        variables.filter[key] = variables.filter[key]?.filter((value: string) => value !== 'UNSET');

        if (!variables.filter[key]?.length) {
          delete variables.filter[key];
        }

        if (key === 'reason_IN') {
          if (variables.filter[key]?.includes('HAS_ERRORS')) {
            variables.filter.hasErrors_EQ = true;
            delete variables.filter[key];
          }
          if (variables.filter[key]?.includes('NO_ERRORS')) {
            variables.filter.hasErrors_EQ = false;
            delete variables.filter[key];
          }
          if (variables.filter[key]?.includes('ALL')) {
            delete variables.filter[key];
          }
        }
      }
    }

    variables.filter = {
      hasErrors_EQ:
        typeof variables.filter.hasErrors_EQ === 'string'
          ? variables.filter.hasErrors_EQ === 'true'
          : variables.filter.hasErrors_EQ,
      observedAt_GTEQ: variables.filter.observedAt_GTEQ,
      observedAt_LTEQ: variables.filter.observedAt_LTEQ,
      serverProcessTime_GTEQ: variables.filter.serverProcessTime_GTEQ
        ? Math.round(variables.filter.serverProcessTime_GTEQ)
        : undefined,
      serverProcessTime_LTEQ: variables.filter.serverProcessTime_LTEQ
        ? Math.round(variables.filter.serverProcessTime_LTEQ)
        : undefined,
      creditCost_GTEQ: variables.filter.creditCost_GTEQ ? Math.round(variables.filter.creditCost_GTEQ) : undefined,
      creditCost_LTEQ: variables.filter.creditCost_LTEQ ? Math.round(variables.filter.creditCost_LTEQ) : undefined,
      operationName_EQ: variables.filter.operationName_EQ,
      operationName_PRE: variables.filter.operationName_PRE,
      operationName_OUT: variables.filter.operationName_OUT,
      client_EQ: variables.filter.client_EQ,
      client_PRE: variables.filter.client_PRE,
      errorMessage_EQ: variables.filter.errorMessage_EQ,
      errorMessage_LIKE: variables.filter.errorMessage_LIKE,
      errorMessage_FUZZY: variables.filter.errorMessage_FUZZY,
      traceId_EQ: variables.filter.traceId_EQ,
      // errorPath_EQ: variables.filter.errorPath_EQ,
      sourceAddr_EQ: variables.filter.sourceAddr_EQ,
      roles_IN: variables.filter.roles_IN,
      tag_EQ: variables.filter.tag_EQ,
      queryHash_EQ: variables.filter.queryHash_EQ,
      organizationId_EQ: variables.filter.organizationId_EQ,
      reason_EQ: variables.filter.reason_EQ,
      reason_IN: variables.filter.reason_IN,
      impact_IN: variables.filter.impact_IN,
      status_EQ: variables.filter.status_EQ,
      status_IN: variables.filter.status_IN,
      userId_EQ: variables.filter.userId_EQ === 'anonymous' ? '' : variables.filter.userId_EQ,
      fieldPath_EQ: variables.filter.fieldPath_EQ,
      field_EQ: variables.filter.field_EQ
        ? ({
            typeName: variables.filter.field_EQ.split('.')[0] ?? '',
            fieldName: variables.filter.field_EQ.split('.')[1] ?? '',
          } satisfies QueryDataFilter['field_EQ'])
        : variables.filter.field_EQ,
      category_EQ: variables.filter.category_EQ,
      type_EQ: variables.filter.type_EQ,
      userName_EQ: variables.filter.userName_EQ,
      serviceName_EQ: variables.filter.serviceName_EQ,
      operation: variables.filter.operation,
      status: variables.filter.status,
      subgraph: variables.filter.subgraph,
      tag: variables.filter.tag,
      userID: variables.filter.userID,
      userEmail: variables.filter.userEmail,
      tokenId_EQ: variables.filter.tokenId_EQ,
      allSubgraphs_EQ: variables.filter.allSubgraphs_EQ,
      headerKey_EQ: variables.filter.headerKey_EQ,
      headerVal_IN: variables.filter.headerVal_IN,
    } satisfies QueryDataFilter & EventFilter & ReportFilter & QueryTracesAggFilter;
  }

  return variables;
};
