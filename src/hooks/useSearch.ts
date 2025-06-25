import { useState } from "react";

export function useSearch<T>(
  data: T[],
  searchFn: (item: T, query: string) => boolean
) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((item) => searchFn(item, search.toLowerCase()));

  return {
    search,
    setSearch,
    filtered,
  };
}