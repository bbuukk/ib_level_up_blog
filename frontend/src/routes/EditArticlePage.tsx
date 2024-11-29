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

import { deleteArticle, storeArticle, updateArticle } from 'utils/axios';
import { useEffect, useRef } from 'react';
import useGetArticleByid from 'features/articles/landing/server/useGetArticleById';

const EditArticlePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: article,
    isLoading,
    error
  } = useGetArticleByid(id ? parseInt(id, 10) : undefined);

  //TODO!: use error and loading states
  const { data: userDetails } = useGetMe();

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

  //TODO: use mutations
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
          placeholder="Select image"
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
