import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TablePeriodicAlatBerat from "../../components/tables/PeriodicService/PeriodicAlatBerat"

export default function PeriodicAlatBerat () {
    return (
        <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Berkala Alat Berat" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Riwayat Berkala Alat Berat">
          <TablePeriodicAlatBerat />
        </ComponentCard>
      </div>
    </>
    )
}