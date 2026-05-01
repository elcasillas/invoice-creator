"use client";

export function DeleteCompanyButton() {
  return (
    <button
      type="submit"
      className="text-rose-600 hover:text-rose-700"
      onClick={(event) => {
        if (!window.confirm("Delete this company?")) {
          event.preventDefault();
        }
      }}
    >
      Delete
    </button>
  );
}
