import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TableTanamanMasuk from "../../components/tables/DistTanaman/TanamanMasukTable";
import TableTanamanKeluar from "../../components/tables/DistTanaman/TanamanKeluarTable";
import FormDisableTanaman from "../../components/form/form-disable/TanamanFormD";

export default function DistTanaman() {
  return (
    <>
      <PageMeta
        title="Riwayat Distribusi Tanaman"
        description="Halaman detail tanaman dan riwayat distribusinya"
      />
      <PageBreadcrumb pageTitle="Riwayat Distribusi Tanaman" />
      <div className="space-y-6">
        <ComponentCard title="Detail Tanaman">
          <FormDisableTanaman />
        </ComponentCard>
        <ComponentCard title="Riwayat Tanaman Masuk">
          <TableTanamanMasuk />
        </ComponentCard>
        <ComponentCard title="Riwayat Tanaman Keluar">
          <TableTanamanKeluar />
        </ComponentCard>
      </div>
    </>
  );
}
