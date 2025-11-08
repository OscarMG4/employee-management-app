export interface PaginatedList<T> {
  data: T[];
  links: Links;
  meta: Meta;
}

export interface DataResponse<T = undefined> {
  data?: T;
  message?: string;
  status?: string;
  success: boolean;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
