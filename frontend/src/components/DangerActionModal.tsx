import { Button, Group, Modal } from '@mantine/core';

interface DangerActionModalProps {
  isOpen: boolean;
  closeModal: () => void;
  callback: () => void;
}

//redefine to be danger modal
const DangerActionModal = ({
  isOpen,
  closeModal,
  callback
}: DangerActionModalProps) => {
  return (
    <Modal opened={isOpen} onClose={closeModal} title="Warning">
      <p>Are you sure you want to proceed?</p>
      <p>
        This action is <span>permanent</span>.
      </p>

      <Group grow mb="xs">
        <Button color="red" onClick={callback}>
          Yes
        </Button>
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export default DangerActionModal;
