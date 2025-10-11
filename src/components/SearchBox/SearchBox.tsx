import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (q: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onChange(query);
  };

  return (
    <input className={css.input} onChange={handleChange} type="text" placeholder="Search posts" />
  );
}
