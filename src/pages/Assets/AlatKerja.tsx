import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableAlatKerja from "../../components/tables/AlatKerja"

export default function AlatKerja() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Data Alat Kerja" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Alat Kerja">
          <TableAlatKerja />
        </ComponentCard>
      </div>
    </>
  );
}