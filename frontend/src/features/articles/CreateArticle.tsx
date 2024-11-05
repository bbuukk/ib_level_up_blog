import { Title, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import ApiArticle from 'types/ApiArticle';
import CreateArticleFormData from 'types/CreateArticvleFormData';
import { createArticle } from 'utils/axios';
import useCreateArticle from './server/useCreateArticle';

const CreateArticle = () => {
  const form = useForm<CreateArticleFormData>({
    initialValues: {
      title: '',
      content: ''
    }
  });

  /*   const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  }); */

  const mutation = useCreateArticle();

  const handleSubmit = (values: CreateArticleFormData) => {
    mutation.mutate(values);
  };

  return (
    <>
      <Title order={3}>Create Article</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput {...form.getInputProps('title')} label="Title" mb="sm" />
        <TextInput {...form.getInputProps('content')} label="Content" mb="lg" />
        <Button type="submit" loading={mutation.isPending}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default CreateArticle;
