import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import TableAlatBerat from "../components/tables/AlatBeratTable";

export default function AlatBerat() {
  return (
    <>
      <PageMeta
        title="Alat Berat"
        description="Halaman List Data Aset Alat Berat"
      />
      <PageBreadcrumb pageTitle="Data Alat Berat" />
      <div className="space-y-6">
          <TableAlatBerat />
      </div>
    </>
  );
}
