import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableServiceKendaraan from "../../components/tables/Service/ServiceKendaraanTable"
import FormDisableKendaraan from "../../components/formDisable/Kendaraan"

export default function ServiceKendaraan () {
    return (
        <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Riwayat Servis Kendaraan" />
      <div className="space-y-6">
        <ComponentCard title="Data Kendaraan">
          <FormDisableKendaraan />
        </ComponentCard>
        <ComponentCard title="Tabel Riwayat Servis Kendaraan">
          <TableServiceKendaraan />
        </ComponentCard>
      </div>
    </>
    )
}