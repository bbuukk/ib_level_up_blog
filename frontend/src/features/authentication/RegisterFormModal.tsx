import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Button, Modal, PasswordInput, TextInput } from '@mantine/core';
import { useState } from 'react';
import RegisterForm from './types/RegisterForm';
import useRegister from './server/useRegister';

const formSchema = z
  .object({
    name: z.string().max(100, 'Name must be at most 100 characters long'),
    email: z.string().email('Invalid email address').max(100),
    password: z.string().min(1, 'Password is required'),
    password_confirmation: z
      .string()
      .min(1, 'Password confirmation is required')
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation']
  });

interface RegisterFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  switchModal: () => void;
}

//TODO!: all classnames should extend those form modals component
//TODO: Closing modal resets form
const RegisterFormModal = ({
  isOpen,
  closeModal,
  switchModal
}: RegisterFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterForm>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    validate: zodResolver(formSchema)
  });

  const { mutate } = useRegister();

  const handleSubmit = async (values: RegisterForm) => {
    setIsSubmitting(true);

    mutate(values, {
      onSuccess: () => {
        form.reset();
        closeModal();
      },
      //TODO: introduce better error handling
      onError: () => {
        form.reset();
        form.setFieldError('email', 'Failed to register. Please try again.');
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
      title="Register"
      classNames={{
        title: 'modal__heading',
        close: 'modal__closeBtn'
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)} className="loginModal__form">
        <TextInput {...form.getInputProps('name')} label="Name" mb="sm" />
        <TextInput {...form.getInputProps('email')} label="Email" mb="sm" />
        <PasswordInput
          {...form.getInputProps('password')}
          label="Password"
          mb="lg"
        />

        <PasswordInput
          {...form.getInputProps('password_confirmation')}
          label="Repeat password"
          mb="lg"
        />

        <Button loading={isSubmitting} type="submit">
          Register
        </Button>
      </form>
      <div className="modal__switchModalAppeal">
        <span>Already registered? Log in</span>
        <button onClick={switchModal}>here</button>
      </div>
    </Modal>
  );
};

export default RegisterFormModal;
