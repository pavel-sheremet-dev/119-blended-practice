import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (q: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input className={css.input} onChange={handleChange} type="text" placeholder="Search posts" />
  );
}
