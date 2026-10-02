import { memo } from 'react';

function Field({ label, name, error, as = 'input', ...props }) {
  const Tag = as;
  return (
    <label className="field">
      <span>{label}</span>
      <Tag name={name} aria-invalid={!!error} {...props} />
      {error && <small className="error" role="alert">{error}</small>}
    </label>
  );
}

export default memo(Field);
