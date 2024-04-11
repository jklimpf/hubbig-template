interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  type = "text",
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder || ""}
        onChange={onChange}
      />
    </div>
  );
}
