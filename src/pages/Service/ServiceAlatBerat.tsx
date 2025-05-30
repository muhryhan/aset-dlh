import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableServiceAlatBerat from "../../components/tables/Service/ServiceAlatBeratTable"
import FormAlatBerat from "../../components/formDisable/AlatBerat"

export default function ServiceAlatBerat () {
    return (
        <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Riwayat Servis Alat Berat" />
      <div className="space-y-6">
        <ComponentCard title="Data Alat Berat">
          <FormAlatBerat />
        </ComponentCard>
        <ComponentCard title="Tabel Riwayat Servis Alat Berat">
          <TableServiceAlatBerat />
        </ComponentCard>
      </div>
    </>
    )
}