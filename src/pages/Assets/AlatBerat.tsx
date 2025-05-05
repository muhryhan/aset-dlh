import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableAlatBerat from "../../components/tables/AlatBerat"

export default function AlatBerat () {
    return (
        <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Data Alat Berat" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Alat Berat">
          <TableAlatBerat />
        </ComponentCard>
      </div>
    </>
    )
}