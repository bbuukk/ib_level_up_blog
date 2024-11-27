import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { z } from 'zod';

import { useState } from 'react';

import IsAuthorizedRequestStatus from 'features/authentication/types/IsAuthorizedRequestStatus';
import useNewAuth from 'features/authentication/server/useNewAuth';
import useGetMe from 'features/authentication/server/useGetMe';
import useCreateComment from 'features/articles/server/useCreateComment';

const schema = z.object({
  commentContent: z
    .string()
    .min(1, { message: 'Comment cannot be empty' })
    .max(500, { message: 'Comment is too long' })
});

type FormValues = z.infer<typeof schema>;

interface CommentFormProps {
  articleId: number;
}

const CommentForm = ({ articleId }: CommentFormProps) => {
  const isAuthorized = useNewAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { data: user } = useGetMe();

  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: {
      commentContent: ''
    }
  });

  const mutation = useCreateComment();

  async function handleSubmit({ commentContent }: FormValues) {
    if (isAuthorized !== IsAuthorizedRequestStatus.AUTHORIZED) {
      form.setFieldError('commentContent', 'You must be logged in to comment');
      return;
    }

    setIsLoading(true);

    mutation.mutate(
      { articleId, commentContent },
      {
        onSuccess: () => {
          form.reset();
        },
        onError: () => {
          //TODO: handle error from be
          form.setFieldError(
            'commentContent',
            'Failed to submit comment. Please try again.'
          );
        }
      }
    );
    setIsLoading(false);
  }

  return (
    <div className="comment--form">
      <img
        className="comment__img"
        src={user?.avatar_url || '/src/assets/logo.svg'}
        alt={`avatar`}
      />
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
