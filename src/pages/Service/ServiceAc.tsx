import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableServiceAc from "../../components/tables/Service/ServiceAc"
import FormAc from "../../components/formDisable/Ac"

export default function ServiceAc () {
    return (
        <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Riwayat Servis AC" />
      <div className="space-y-6">
        <ComponentCard title="Data Ac">
          <FormAc />
        </ComponentCard>
        <ComponentCard title="Tabel Riwayat Servis AC">
          <TableServiceAc />
        </ComponentCard>
      </div>
    </>
    )
}