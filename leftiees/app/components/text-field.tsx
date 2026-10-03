export default function TextField({
  id,
  label,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        placeholder={label}
        className="h-12 w-full rounded-xl border border-black/15 bg-background px-4 text-left text-base text-foreground transition-colors placeholder:text-zinc-400 focus:border-denim"
        {...props}
      />
    </>
  );
}
