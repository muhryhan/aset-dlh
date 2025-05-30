import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableSerberAlatBerat from "../../components/tables/PeriodicService/SerberAlatBeratTable"

export default function SerberAlatBerat () {
    return (
        <>
      <PageMeta
        title="Servis Berkala Alat Berat"
        description="Ini adalah halaman servis berkala alat berat"
      />
      <PageBreadcrumb pageTitle="Berkala Alat Berat" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Riwayat Servis Berkala Alat Berat">
          <TableSerberAlatBerat />
        </ComponentCard>
      </div>
    </>
    )
}