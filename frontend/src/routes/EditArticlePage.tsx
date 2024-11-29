import { AxiosError } from 'axios';
import useGetMe from 'features/authentication/server/useGetMe';
import './EditArticlePage.scss';

import { MutateOptions } from '@tanstack/react-query';

import ApiArticleRequestParams from 'types/ApiArticleRequestParams';

type ApiArticleRequestParamsWithoutId = Omit<ApiArticleRequestParams, 'id'>;

import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Textarea, Button, FileInput } from '@mantine/core';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { z } from 'zod';

import { deleteArticle } from 'utils/axios';
import { useEffect, useRef } from 'react';
import useGetArticleByid from 'features/articles/landing/server/useGetArticleById';

import { notifications } from '@mantine/notifications';
import useCreateArticle from 'features/articles/server/useCreateArticle';
import useUpdateArticle from 'features/articles/server/useUpdateArticle';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  cover: z.instanceof(File).or(z.null()).or(z.undefined()).optional()
});

const EditArticlePage = () => {
  const navigate = useNavigate();

  const { id: paramId } = useParams();

  // Handle invalid id parameters:
  // If 'id' is not a valid number (e.g., a non-numeric string),
  // the page will default to 'create article' mode instead of 'edit' mode.
  let id = undefined;
  if (paramId) {
    const parsed = parseInt(paramId, 10);
    id = isNaN(parsed) ? undefined : parsed;
  }

  const isEditingExistingArticle = id != undefined;

  const {
    data: article,
    isLoading: isArticleLoading,
    error: articleError
  } = useGetArticleByid(id);

  const form = useForm<ApiArticleRequestParamsWithoutId>({
    initialValues: {
      title: '',
      content: '',
      cover: null
    },
    validate: zodResolver(articleSchema)
  });

  const { data: user, isLoading: isUserLoading, error: userError } = useGetMe();

  const isInitialized = useRef(false);
  useEffect(() => {
    if (
      article &&
      !isArticleLoading &&
      !articleError &&
      !isInitialized.current
    ) {
      form.setValues({
        title: article.title || '',
        content: article.content || '',
        cover: article.cover || null
      });
      isInitialized.current = true;
    }
  }, [article, isArticleLoading, articleError, form]);

  const { mutate: createMutate } = useCreateArticle();
  const { mutate: updateMutate } = useUpdateArticle();

  interface MutationError {
    message: string;
  }

  type MutationData =
    | ApiArticleRequestParams
    | ApiArticleRequestParamsWithoutId;

  const createMutationCallbacks = (
    action: string
  ): MutateOptions<void, Error, MutationData, unknown> => {
    return {
      onSuccess: () => {
        form.reset();
        notifications.show({
          title: 'Success',
          message: `Hooray! Article was successfully ${action}d!`,
          color: 'green'
        });
        navigate('/profile');
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<MutationError>;
        notifications.show({
          title: 'Error',
          message: `Something went wrong: ${
            axiosError.response?.data?.message || axiosError.message
          }`,
          color: 'red'
        });
        navigate('/profile');
      }
    };
  };

  const handleSubmit = async (values: ApiArticleRequestParamsWithoutId) => {
    if (isEditingExistingArticle) {
      const numericId = id as number;
      updateMutate(
        { id: numericId, ...values },
        createMutationCallbacks('update')
      );
    } else {
      createMutate(values, createMutationCallbacks('create'));
    }

    navigate('/profile');
  };

  //TODO: introduce better ui to both error and isLoading
  if (userError) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  if (isUserLoading) {
    return <div>Loading user data...</div>;
  }

  if (articleError) {
    return <div>Error loading article data. Please try again later.</div>;
  }

  if (isArticleLoading) {
    return <div>Loading article...</div>;
  }

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
              {isEditingExistingArticle && (
                <li>
                  <Link to={`/articles/${id}`}>{`View article-> `}</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="profileHeroImage">
            <img
              className="profileHeroImage__image"
              src={user?.avatar_url ?? '/src/assets/logo.svg'}
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
          placeholder="Select image"
          accept="image/*"
          {...form.getInputProps('cover')}
        />

        {isEditingExistingArticle ? (
          <>
            <Button type="submit" className="button--primary">
              Update
            </Button>

            <Button
              type="button"
              className="button--danger"
              onClick={() => {
                //TODO: introduce warning modal!
                deleteArticle(id as number);
                navigate('/profile');
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
