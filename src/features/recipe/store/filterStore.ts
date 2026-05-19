import { useEffect, useState } from 'react';

let currentFilter = 'All';
const listeners = new Set<(filter: string) => void>();

export function setFilter(filter: string) {
  currentFilter = filter;
  listeners.forEach((l) => l(filter));
}

export function useFilter() {
  const [filter, setFilterState] = useState(currentFilter);

  useEffect(() => {
    listeners.add(setFilterState);
    return () => {
      listeners.delete(setFilterState);
    };
  }, []);

  return filter;
}
