import Link from "next/link";
import { CompanyForm } from "@/components/companies/company-form";

export default function NewCompanyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <Link href="/companies" className="text-sm text-slate-500 hover:text-slate-900">
            Back to companies
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Create Company</h1>
          <p className="text-sm text-slate-500">Save a reusable sender profile for invoices.</p>
        </div>
        <CompanyForm mode="create" />
      </div>
    </main>
  );
}
