import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  TextInput,
} from "flowbite-react";
import type { BookRequest } from "../models/book-request";

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: BookRequest) => void;
  initialValues?: BookRequest;
  title: string;
}

const emptyForm: BookRequest = {
  title: "",
  author: "",
  description: "",
  coverImage: "",
  isFavorite: false,
};

export default function BookFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  title,
}: BookFormModalProps) {
  const [form, setForm] = useState<BookRequest>(initialValues ?? emptyForm);

  useEffect(() => {
    setForm(initialValues ?? emptyForm);
  }, [initialValues, isOpen]);

  const handleChange = (field: keyof BookRequest, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">שם הספר</Label>
            <TextInput
              id="title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="author">מחבר</Label>
            <TextInput
              id="author"
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">תיאור</Label>
            <TextInput
              id="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="coverImage">כתובת תמונה (URL)</Label>
            <TextInput
              id="coverImage"
              value={form.coverImage}
              onChange={(e) => handleChange("coverImage", e.target.value)}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>שמור</Button>
        <Button color="gray" onClick={onClose}>
          ביטול
        </Button>
      </ModalFooter>
    </Modal>
  );
}
