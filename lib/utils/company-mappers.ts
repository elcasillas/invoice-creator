import { CompanyFormValues } from "@/lib/validation/company";
import { CompanyRow } from "@/types/company";

export function mapCompanyToFormValues(company: CompanyRow): CompanyFormValues {
  return {
    name: company.name,
    address: company.address ?? "",
    city: company.city ?? "",
    state: company.state ?? "",
    postalCode: company.postal_code ?? "",
    country: company.country ?? "",
    email: company.email ?? "",
    phone: company.phone ?? "",
    website: company.website ?? "",
    taxId: company.tax_id ?? "",
    logoUrl: company.logo_url ?? ""
  };
}
