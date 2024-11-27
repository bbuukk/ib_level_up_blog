interface ApiUserAriticlesRequestParams {
  page?: number;
  sort?: Record<string, 'asc' | 'desc'>;
  filter?: Record<'authorId', number>;
}

export default ApiUserAriticlesRequestParams;
