function AppCheckbox({ label, value, checked, onChange }) {
  return (
    <label className="cursor-pointer flex items-center">
      <input value={value} checked={checked} type="checkbox" className="checkbox mr-4 rounded" onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

export default AppCheckbox;
