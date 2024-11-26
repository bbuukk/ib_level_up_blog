import { useForm, zodResolver } from '@mantine/form';
import LoginForm from './types/LoginForm';
import { z } from 'zod';
import { Button, Modal, TextInput } from '@mantine/core';
import { useState } from 'react';
import useLogin from './server/useLogin';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

interface LoginFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  switchModal: () => void;
}

//TODO!: all classnames should extend those form modals component
const LoginFormModal = ({
  isOpen,
  closeModal,
  switchModal
}: LoginFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: zodResolver(formSchema)
  });

  const { mutate } = useLogin();

  const handleSubmit = async (values: LoginForm) => {
    setIsSubmitting(true);

    mutate(values, {
      onSuccess: () => {
        form.reset();
        closeModal();
      },
      //TODO: introduce better error handling
      onError: () => {
        form.reset();
        form.setFieldError('email', 'Failed to Log in. Please try again.');
        form.setFieldError('password', 'Failed to Log in. Please try again.');
      },
      onSettled: () => {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      className="modal"
      title="Log in"
      classNames={{
        title: 'modal__heading',
        close: 'modal__closeBtn'
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)} className="loginModal__form">
        <TextInput {...form.getInputProps('email')} label="Email" mb="sm" />
        <TextInput
          {...form.getInputProps('password')}
          label="Password"
          type="password"
          mb="lg"
        />
        <Button loading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
      <div className="modal__switchModalAppeal">
        <span>No account? Register</span>
        <button onClick={switchModal}>here</button>
      </div>
    </Modal>
  );
};

export default LoginFormModal;
