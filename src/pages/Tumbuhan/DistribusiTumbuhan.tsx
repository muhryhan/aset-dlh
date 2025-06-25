import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
// import TumbuhanMasuk from "../../components/tables/TumbuhanMasukTable"
// import TumbuhanKeluar from "../../components/tables/TumbuhanKeluarTable"
import FormDisableTumbuhan from "../../components/form/form-disable/Tumbuhan";

export default function PlantsDistribution() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Riwayat Distribusi Tumbuhan" />
      <div className="space-y-6">
        <ComponentCard title="Data Tumbuhan">
          <FormDisableTumbuhan />
        </ComponentCard>
        {/* <ComponentCard title="Tabel Tumbuhan Masuk">
          <TumbuhanMasuk />
        </ComponentCard>
        <ComponentCard title="Tabel Tumbuhan keluar">
          <TumbuhanKeluar />
        </ComponentCard> */}
      </div>
    </>
  );
}
