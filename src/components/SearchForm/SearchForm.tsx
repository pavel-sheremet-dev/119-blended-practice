interface FormProps {
  onSubmit: (query: string) => void;
}

export const Form = ({ onSubmit }: FormProps) => {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;

    onSubmit(query);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="query" />
      <button type="submit">Submit</button>
    </form>
  );
};
