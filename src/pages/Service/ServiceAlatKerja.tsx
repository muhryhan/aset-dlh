import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TableServiceAlatKerja from "../../components/tables/Service/ServiceAlatKerjaTable";
import FormAlatKerja from "../../components/form/form-disable/AlatKerjaFormD";

export default function ServiceAlatKerja() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Riwayat Servis Alat Kerja" />
      <div className="space-y-6">
        <ComponentCard title="Data Alat Kerja">
          <FormAlatKerja />
        </ComponentCard>
        <ComponentCard title="Tabel Riwayat Servis Alat Kerja">
          <TableServiceAlatKerja />
        </ComponentCard>
      </div>
    </>
  );
}
