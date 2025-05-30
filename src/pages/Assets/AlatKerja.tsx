import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableAlatKerja from "../../components/tables/AlatKerjaTable"

export default function AlatKerja() {
  return (
    <>
      <PageMeta
        title="Alat Kerja"
        description="Halaman List Data Aset Alat Kerja"
      />
      <PageBreadcrumb pageTitle="Data Alat Kerja" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Alat Kerja">
          <TableAlatKerja />
        </ComponentCard>
      </div>
    </>
  );
}