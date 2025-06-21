// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   EditButton,
//   DeleteButton,
// } from "../ui/button/ActionBtn";
// import { useState, useEffect } from "react";
// import AddButton from "../ui/button/AddBtn";
// import ExcelButton from "../ui/button/ExcelBtn";
// import PDFButton from "../ui/button/PdfBtn";
// import SearchInput from "../ui/search/Search";
// import RowsSelector from "../ui/rowsSelector/rowsSelector";

// const tableData: TumbuhanKeluarData[] = tumbuhanKeluarData;

// export default function TumbuhanKeluar() {
//   const [tumbuhanKeluarData, setTumbuhanKeluarData] = useState<TumbuhanKeluarData[]>([]); 
//   const [search, setSearch] = useState("");
//   const [rows, setRows] = useState(5);

//   //  fetch dari API
//         // useEffect(() => {
//         //   const fetchTumbuhanKeluar = async () => {
//         //     try {
//         //       const response = await api.get("/api/tumbuhan-keluar");
//         //       setTumbuhanData(response.data);
//         //     } catch (error) {
//         //       console.error("Gagal ambil data tumbuhan Keluar", error);
//         //     }
//         //   };
      
//         //   fetchTumbuhanKeluar();
//         // }, []);
      
      
//         useEffect(() => {
//         // Simulasi fetch data dari backend
//         const dummyData: TumbuhanKeluarData[] = tumbuhanKeluarData;
      
//         setTumbuhanKeluarData(dummyData);
//       }, [tumbuhanKeluarData]);

//   const filteredData = tableData
//     .filter((item) =>
//       item.tanggal.toLowerCase().includes(search.toLowerCase())
//     )
//     .slice(0, rows);

//   const handleAddData = () => console.log("Tambah Data");
//   const handleExportExcel = () => console.log("Export ke Excel");
//   const handleExportPDF = () => console.log("Export ke PDF");

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//       <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
//         <div className="flex gap-2 items-center">
//           <AddButton onClick={handleAddData} />
//           <RowsSelector value={rows} onChange={setRows} />
//         </div>
//         <div className="flex gap-2 items-center">
//           <SearchInput value={search} onChange={setSearch} />
//           <ExcelButton onClick={handleExportExcel} />
//           <PDFButton onClick={handleExportPDF} />
//         </div>
//       </div>

//       <div className="max-w-full overflow-x-auto">
//         <div className="min-w-[1102px]">
//           <Table>
//             {/* Table Header */}
//             <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//               <TableRow>
//                 <TableCell
//                   isHeader
//                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                 >
//                   Tanggal
//                 </TableCell>
//                 <TableCell
//                   isHeader
//                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                 >
//                   Jumlah
//                 </TableCell>
//                 <TableCell
//                   isHeader
//                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                 >
//                   Keterangan
//                 </TableCell>
//                 <TableCell
//                   isHeader
//                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                 >
//                   Aksi
//                 </TableCell>
//               </TableRow>
//             </TableHeader>

//             {/* Table Body */}
//             <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//               {filteredData.map((TumbuhanKeluarData) => (
//                 <TableRow key={TumbuhanKeluarData.id}>
//                   <TableCell className="px-5 py-4 sm:px-6 text-start">
//                     <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
//                       {TumbuhanKeluarData.tanggal}
//                     </span>
//                   </TableCell>
//                   <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                     {TumbuhanKeluarData.jumlah}
//                   </TableCell>
//                   <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                     {TumbuhanKeluarData.keterangan}
//                   </TableCell>
//                   <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
//                     <div className="flex items-center gap-2">
//                     <EditButton
//                       onClick={() => console.log("Edit", TumbuhanKeluarData.id)}
//                     />
//                     <DeleteButton
//                       onClick={() => console.log("Delete", TumbuhanKeluarData.id)}
//                     />
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }
