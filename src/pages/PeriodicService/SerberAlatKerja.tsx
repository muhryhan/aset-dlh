import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableSerberAlatKerja from "../../components/tables/PeriodicService/SerberAlatKerjaTable"

export default function SerberAlatKerja() {
  return (
    <>
      <PageMeta
        title="Servis Berkala Alat Berat"
        description="Ini adalah halaman servis berkala alat berat"
      />
      <PageBreadcrumb pageTitle="Berkala Alat Kerja" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Riwayat Servis Berkala Alat Kerja">
          <TableSerberAlatKerja />
        </ComponentCard>
      </div>
    </>
  );
}