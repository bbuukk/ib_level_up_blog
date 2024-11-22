import { Button, Group, Modal } from '@mantine/core';
import useGetMe from 'features/authentication/server/useGetMe';
import useLogout from 'features/authentication/server/useLogout';

import { useState } from 'react';
import { deleteUser } from 'utils/axios';

interface DeleteProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DeleteProfileModal = ({
  isOpen,
  closeModal
}: DeleteProfileModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: user } = useGetMe();
  const logout = useLogout();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    setIsSubmitting(true);

    try {
      await deleteUser(user.id);
      logout();
      closeModal();
    } catch (error) {
      console.error('Error deleting user:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Warning">
      <p>Are you sure you want to proceed?</p>
      <p>
        This action is <span>permanent</span>.
      </p>

      <Group grow mb="xs">
        <Button color="red" loading={isSubmitting} onClick={handleDelete}>
          Delete Profile
        </Button>
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteProfileModal;
