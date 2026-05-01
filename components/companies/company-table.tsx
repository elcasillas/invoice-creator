import Link from "next/link";
import { deleteCompanyAction } from "@/app/actions/company-actions";
import { DeleteCompanyButton } from "@/components/companies/delete-company-button";
import { CompanyRow } from "@/types/company";

export function CompanyTable({ companies }: { companies: CompanyRow[] }) {
  if (companies.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg font-semibold text-slate-900">No companies yet</h2>
        <p className="mt-2 text-sm text-slate-500">
          Create a company profile to reuse sender details across invoices.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-left">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wide text-slate-500">
            <th className="px-5 py-3 font-medium">Company</th>
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Phone</th>
            <th className="px-5 py-3 font-medium">Country</th>
            <th className="px-5 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {companies.map((company) => (
            <tr key={company.id} className="align-top text-sm text-slate-700">
              <td className="px-5 py-4 font-medium text-slate-950">{company.name}</td>
              <td className="px-5 py-4">{company.email || "—"}</td>
              <td className="px-5 py-4">{company.phone || "—"}</td>
              <td className="px-5 py-4">{company.country || "—"}</td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-3">
                  <Link href={`/companies/${company.id}/edit`} className="text-slate-700 hover:text-slate-950">
                    Edit
                  </Link>
                  <form action={deleteCompanyAction.bind(null, company.id)}>
                    <DeleteCompanyButton />
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
