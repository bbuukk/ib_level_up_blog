import useGetMe from 'features/authentication/server/useGetMe';
import './EditArticlePage.scss';

import ApiArticleRequestParams from 'types/ApiArticleRequestParams';

type ApiArticleRequestParamsWithoutId = Omit<ApiArticleRequestParams, 'id'>;

import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Textarea, Button, FileInput } from '@mantine/core';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { z } from 'zod';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  cover: z.instanceof(File).or(z.null()).or(z.undefined()).optional()
});

import { queryOptions, useQuery } from '@tanstack/react-query';
import {
  deleteArticle,
  getArticleById,
  storeArticle,
  updateArticle
} from 'utils/axios';
import { useEffect, useRef, useState } from 'react';

export const buildQueryOptions = (articleId?: number) => {
  return queryOptions({
    queryKey: ['article'],
    queryFn: () => getArticleById(articleId || 1)
    // staleTime: 1000 * 20
  });
};

const useGetArticleById = (articleId?: number) => {
  const { data, isLoading, error } = useQuery(buildQueryOptions(articleId));

  if (!articleId) {
    return { data: null, isLoading: false, error: 'Invalid article ID' };
  }

  return { data, isLoading, error };
};

const EditArticlePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const articleId = id ? parseInt(id, 10) : undefined;
  const { data: article, isLoading, error } = useGetArticleById(articleId);

  //TODO!: if there is id, then it is edit, not create

  const { data: userDetails } = useGetMe(); //TODO!: use error and loading states

  const form = useForm<ApiArticleRequestParamsWithoutId>({
    initialValues: {
      title: '',
      content: '',
      cover: null
    },
    validate: zodResolver(articleSchema)
  });

  const isInitialized = useRef(false);
  useEffect(() => {
    if (article && !isLoading && !error && !isInitialized.current) {
      form.setValues({
        title: article.title || '',
        content: article.content || '',
        cover: article.cover || null
      });
      isInitialized.current = true;
    }
  }, [article, isLoading, error, form]);

  //mutate user articles
  const handleSubmit = async (values: ApiArticleRequestParamsWithoutId) => {
    if (id) {
      //todo: not safe? id can be anything(any string ) rework
      await updateArticle({ id: parseInt(id, 10), ...values });
    } else {
      await storeArticle({ ...values });
    }

    navigate('/profile');
  };

  const defaultAvatarUrl = 'https://picsum.photos/200/200';
  return (
    <main className="editArticle">
      <section className="profileHero">
        <div className="container--profileHero">
          <div className="profileHero__left">
            <h1>Create / Edit article</h1>
            <ul>
              <li>
                <Link to="/profile">{`<- Back to profile`}</Link>
              </li>
              {/* check if it new or editing
              <li>
                <a href="/articles/">{`View article-> `}</a>
              </li>
              */}
            </ul>
          </div>
          <div className="profileHeroImage">
            <img
              className="profileHeroImage__image"
              src={userDetails?.avatar_url ?? defaultAvatarUrl}
              alt="user avatar"
            />
          </div>
        </div>
      </section>

      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="editArticle__form"
      >
        <TextInput
          label="Title"
          placeholder="Enter title"
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Content"
          placeholder="Enter content"
          {...form.getInputProps('content')}
        />

        <FileInput
          label="Featured image"
          accept="image/*"
          {...form.getInputProps('cover')}
        />

        {id ? (
          <>
            <Button type="submit" className="button--primary">
              Update
            </Button>

            <Button
              type="button"
              className="button--danger"
              onClick={() => {
                deleteArticle(parseInt(id, 10));
              }}
            >
              Delete article
            </Button>
          </>
        ) : (
          <>
            <Button type="submit" className="button--primary">
              Save
            </Button>
          </>
        )}
      </form>
    </main>
  );
};

export default EditArticlePage;
