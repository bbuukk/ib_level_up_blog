interface ApiArticlesIndexRequestParams {
  page?: number;
  perPage?: number;
  sort?: Record<string, 'asc' | 'desc'>;
  filter?: {
    authorId?: number;
    createdSinceDate?: string;
  };
  search?: string;

  tag?: Record<'label', string>;
}

export default ApiArticlesIndexRequestParams;
