import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { z } from 'zod';
import { storeComment } from 'utils/axios';

import Comment from 'types/ApiComment';

import React, { useState } from 'react';

import IsAuthorizedRequestStatus from 'features/authentication/types/IsAuthorizedRequestStatus';
import useNewAuth from 'features/authentication/server/useNewAuth';
import useGetMe from 'features/authentication/server/useGetMe';

const schema = z.object({
  commentContent: z
    .string()
    .min(1, { message: 'Comment cannot be empty' })
    .max(500, { message: 'Comment is too long' })
});

type FormValues = z.infer<typeof schema>;

interface CommentFormProps {
  articleId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

//TODO?: introduce default avatar photo (maybe just first letters of first name and second one)
const CommentForm = ({ articleId, setComments }: CommentFormProps) => {
  const isAuthorized = useNewAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { data: user } = useGetMe();

  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: {
      commentContent: ''
    }
  });

  async function handleSubmit({ commentContent }: FormValues) {
    if (isAuthorized !== IsAuthorizedRequestStatus.AUTHORIZED) {
      form.setFieldError('commentContent', 'You must be logged in to comment');
      return;
    }

    setIsLoading(true);
    try {
      const newComment = await storeComment(articleId, commentContent);

      setComments((prevComments) => [newComment, ...prevComments]);

      form.reset();
    } catch (error) {
      console.error('Failed to submit comment:', error);
      form.setFieldError(
        'commentContent',
        'Failed to submit comment. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="comment--form">
      <img className="comment__img" src={user?.avatar_url} alt={`avatar`} />
      <form className="comment__form" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder="Add a comment..."
          {...form.getInputProps('commentContent')}
          rightSection={
            <Button type="submit" loading={isLoading}>
              Send
            </Button>
          }
          error={form.errors.commentContent}
          classNames={{
            error: 'comment__formError'
          }}
        />
      </form>
    </div>
  );
};

export default CommentForm;
