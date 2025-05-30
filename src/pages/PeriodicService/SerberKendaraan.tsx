import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TableSerberKendaraan from "../../components/tables/PeriodicService/SerberKendaraanTable";

export default function SerberKendaraan() {
  return (
    <>
      <PageMeta
        title="Servis Berkala Kendaraan"
        description="Ini adalah halaman servis berkala kendaraan"
      />
      <PageBreadcrumb pageTitle="Berkala Kendaraan" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Riwayat Servis Berkala Kendaraan">
          <TableSerberKendaraan />
        </ComponentCard>
      </div>
    </>
  );
}
