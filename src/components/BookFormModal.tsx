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

  const isValidUrl = (value: string) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const isTitleValid = form.title.trim().length > 0;
  const isAuthorValid = form.author.trim().length > 0;
  const isCoverImageValid =
    form.coverImage.trim().length > 0 && isValidUrl(form.coverImage.trim());

  const isValid = isTitleValid && isAuthorValid && isCoverImageValid;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      coverImage: form.coverImage.trim(),
      description: form.description?.trim(),
    });
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose} dismissible>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">
              Title *<span className="text-xs text-gray-400">(Required)</span>
            </Label>
            <TextInput
              id="title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              color={!isTitleValid && form.title !== "" ? "failure" : undefined}
            />
            {!isTitleValid && form.title !== "" && (
              <HelperText color="failure">Title is required</HelperText>
            )}
          </div>

          <div>
            <Label htmlFor="author">
              Author *<span className="text-xs text-gray-400">(Required)</span>
            </Label>
            <TextInput
              id="author"
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
              color={
                !isAuthorValid && form.author !== "" ? "failure" : undefined
              }
            />
            {!isAuthorValid && form.author !== "" && (
              <HelperText color="failure">Author is required</HelperText>
            )}
          </div>

          <div>
            <Label htmlFor="description">
              Description
              <span className="text-xs text-gray-400">(Optional)</span>
            </Label>
            <Textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="coverImage">
              Cover Image URL *
              <span className="text-xs text-gray-400">(Required)</span>
            </Label>
            <TextInput
              id="coverImage"
              value={form.coverImage}
              onChange={(e) => handleChange("coverImage", e.target.value)}
              color={
                form.coverImage !== "" && !isCoverImageValid
                  ? "failure"
                  : undefined
              }
            />
            {form.coverImage !== "" && !isCoverImageValid && (
              <HelperText color="failure">
                Please enter a valid URL, e.g. https://example.com/image.jpg
              </HelperText>
            )}
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
