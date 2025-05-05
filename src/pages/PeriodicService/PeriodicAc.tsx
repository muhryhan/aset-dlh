import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TablePeriodicAc from "../../components/tables/PeriodicService/PeriodicAc"

export default function PeriodicAc () {
    return (
        <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Berkala AC" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Riwayat Berkala AC">
          <TablePeriodicAc />
        </ComponentCard>
      </div>
    </>
    )
}