import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableTumbuhan from "../../components/tables/BasicTables/Tumbuhan"

export default function Tumbuhan () {
    return (
        <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Data Tumbuhan" />
      <div className="space-y-6">
        <ComponentCard title="Data Tumbuhan">
          <TableTumbuhan />
        
        </ComponentCard>
      </div>
    </>
    )
}