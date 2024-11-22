interface ApiArticleRequestParams {
  id: number;
  title?: string;
  content?: string;
  cover?: File | null;
  [key: string]: string | number | File | null | undefined;
}

export default ApiArticleRequestParams;
