import { CondOperator, RequestQueryBuilder } from "@dataui/crud-request";

import { ESortDirection, TCommonSearchParams } from "../types";

export class RequestQueryParams {
  static pagination<T>(filter: TCommonSearchParams & T, searchKey: string) {
    const queryBuilder = RequestQueryBuilder.create({
      page: filter?.page || 1,
      limit: filter?.limit || 10,
    });
    if (filter?.searchTerm) {
      queryBuilder.setPage(1);
      queryBuilder.setOr([
        {
          field: searchKey,
          operator: CondOperator.CONTAINS_LOW,
          value: filter?.searchTerm?.trim(),
        },
      ]);
    }
    if (filter?.orderBy && filter?.order) {
      queryBuilder.sortBy({
        field: filter?.orderBy,
        order: filter?.order === ESortDirection.ASC ? "ASC" : "DESC",
      });
    }
    queryBuilder.setFilter({
      field: "deletedAt",
      operator: CondOperator.IS_NULL,
    });
    return queryBuilder.query(true);
  }
  static list() {
    const queryBuilder = RequestQueryBuilder.create({
      page: 1,
      limit: 1000,
    });
    return queryBuilder.query(true);
  }
}
