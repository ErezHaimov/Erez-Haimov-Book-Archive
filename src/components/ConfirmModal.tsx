import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "flowbite-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal show={isOpen} onClose={onCancel} size="md" dismissible>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <p className="text-gray-700 dark:text-gray-300">{message}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="red"
          onClick={onConfirm}
          className="dark:hover:bg-red-500"
        >
          Yes, Delete
        </Button>
        <Button
          type="button"
          color="gray"
          onClick={onCancel}
          className="dark:hover:bg-gray-500"
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
