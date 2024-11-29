import { Button, FileInput, PasswordInput, TextInput } from '@mantine/core';
import useGetMe from 'features/authentication/server/useGetMe';
import './ProfileEditContainer.scss';
import { useState } from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import EditUserForm from './types/EditUserForm';
import { useDisclosure } from '@mantine/hooks';
import DeleteProfileModal from './DeleteProfileModal';
const formSchema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .min(1, 'Email is required')
    .optional()
    .or(z.literal('')),
  name: z.string().min(1, 'Name is required').optional().or(z.literal('')),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal(''))
});
import useUpdateUser from './server/useUpdateUser';

const ProfileEditContainer = () => {
  const [opened, { close, open }] = useDisclosure();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: user, isLoading: isUserLoading, error: userError } = useGetMe();

  const form = useForm<EditUserForm>({
    initialValues: {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      avatar: null
    },
    validate: zodResolver(formSchema)
  });

  const mutation = useUpdateUser();

  if (userDetailsErr) {
    return 'todo';
  }
  const handleSubmit = async (values: EditUserForm) => {
    setIsSubmitting(true);

    const id = user?.id as number;
    mutation.mutate(
      { id, ...values },
      {
        onSuccess: () => {
          form.reset();
          notifications.show({
            title: 'Success',
            message: 'Hooray! Your profile was sucessfully updated!',
            color: 'green'
          });
        },
        onError: (error) => {
          notifications.show({
            title: 'Error',
            message: `Something went wrong: ${error.message}`,
            color: 'red'
          });
        }
      }
    );

    setIsSubmitting(false);
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      form.setFieldValue('avatar', file);
    } else {
      setPreviewUrl(null);
      form.setFieldValue('avatar', null);
    }
  };

  const defaultAvatarUrl = 'https://picsum.photos/200/200';

  return (
    <>
      <DeleteProfileModal isOpen={opened} closeModal={close} />
      <main>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="profileEditForm"
        >
          <section className="profileHero">
            <div className="container--profileHero">
              <div className="profileHero__left">
                <h1>Edit profile</h1>
                <ul>
                  <li>
                    <a href="/profile">{`<- Back to profile`}</a>
                  </li>
                  <li>
                    <a href="">{`Edit subscription -> `}</a>
                  </li>
                </ul>
              </div>
              <div className="profileHeroImage">
                <FileInput
                  className="ProfileHeroImage__fileInput"
                  label="Change avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                  value={form.values.avatar}
                  error={form.errors.avatar}
                />
                <img
                  className="profileHeroImage__image"
                  src={
                    previewUrl || userDetails?.avatar_url || defaultAvatarUrl
                  }
                  alt="user avatar"
                />
                <span className="profileHeroImage__changeImage">🖊</span>
              </div>
            </div>
          </section>
          <div className="profileEditForm__inputsContainer">
            <div className="profileEditForm__inputs">
              <TextInput
                label="Email"
                placeholder="Your email"
                {...form.getInputProps('email')}
              />
              <TextInput
                label="Name"
                placeholder="Your name"
                {...form.getInputProps('name')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label="Repeat password"
                placeholder="Repeat password"
                {...form.getInputProps('password_confirmation')}
              />

              <Button type="submit" loading={isSubmitting}>
                Update
              </Button>

              <Button
                type="button"
                className="delete-profile-btn"
                onClick={open}
              >
                Delete profile
              </Button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default ProfileEditContainer;
