// import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { Post, PostFormData } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";

interface EditPostFormProps {
  post: Post;
  onClose: () => void;
}

export default function EditPostForm({ post, onClose }: EditPostFormProps) {
  const initalValues: PostFormData = {
    title: post.title,
    body: post.body,
  };

  const queryQuery = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: PostFormData) => editPost(post.id, values),
    onSuccess: () => {
      queryQuery.invalidateQueries({
        queryKey: ["posts"],
      });
      onClose();
    },
  });

  const handleSubmit = (values: PostFormData, actions: FormikHelpers<PostFormData>) => {
    mutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  return (
    <Formik initialValues={initalValues} onSubmit={handleSubmit}>
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
