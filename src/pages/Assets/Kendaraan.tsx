import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableKendaraan from "../../components/tables/Kendaraan"

export default function Kendaraan () {
    return (
        <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Data Kendaraan" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Kendaraan">
          <TableKendaraan />
        </ComponentCard>
      </div>
    </>
    )
}