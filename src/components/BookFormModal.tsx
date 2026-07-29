import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  TextInput,
  Textarea,
  Checkbox,
  HelperText,
} from "flowbite-react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
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

  const handleChange = (field: keyof BookRequest, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.title.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(form);
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose} dismissible>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <TextInput
              id="title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              color={!isValid && form.title !== "" ? "failure" : undefined}
            />
            {!isValid && form.title !== "" && (
              <HelperText color="failure">Title is required</HelperText>
            )}
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <TextInput
              id="author"
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <TextInput
              id="coverImage"
              value={form.coverImage}
              onChange={(e) => handleChange("coverImage", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              id="isFavorite"
              checked={form.isFavorite}
              onChange={(e) => handleChange("isFavorite", e.target.checked)}
            />
            <Label
              htmlFor="isFavorite"
              className="flex cursor-pointer items-center gap-1 select-none"
            >
              {form.isFavorite ? (
                <HiHeart className="inline text-lg text-red-500" />
              ) : (
                <HiOutlineHeart className="inline text-lg text-gray-400" />
              )}
              Mark as favorite
            </Label>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="dark:hover:bg-blue-500"
        >
          Save
        </Button>

        <Button
          color="gray"
          onClick={onClose}
          className="dark:hover:bg-gray-500"
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
