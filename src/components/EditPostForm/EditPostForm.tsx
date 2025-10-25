import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { Post, PostFormData } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";

interface EditPostFormProps {
  post: Post;
  onClose: () => void;
}

const createPostSchema = Yup.object({
  title: Yup.string().min(3, "Min 3 letters").max(50, "Max 50 letters").required("Required"),
  body: Yup.string().min(20, "Min 20 letters").max(300, "Max 300 letters").required("Required"),
});

export default function EditPostForm({ post, onClose }: EditPostFormProps) {
  const initialValues: PostFormData = {
    title: post.title,
    body: post.body,
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedPost: PostFormData) => editPost(post.id, updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      onClose();
    },
  });

  const handleSubmit = (values: PostFormData, actions: FormikHelpers<PostFormData>) => {
    mutation.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={createPostSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
