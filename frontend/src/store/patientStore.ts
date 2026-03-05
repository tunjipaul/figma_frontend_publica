import { create } from 'zustand';
import DB from '../components/patients.json';
import type { Patient } from '../types/patient';

export type SortOption = "Hospital ID" | "Patient Name" | "Status" | "Next Delivery";

interface PatientState {
  patients: Patient[];
  searchQuery: string;
  sortBy: SortOption;
  currentPage: number;
  pageSize: number;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSortBy: (option: SortOption) => void;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  setPatients: (patients: Patient[]) => void;
  
  // Getters (selectors)
  getFilteredPatients: () => Patient[];
  getPaginatedPatients: () => Patient[];
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: DB.patients as Patient[],
  searchQuery: '',
  sortBy: 'Hospital ID',
  currentPage: 1,
  pageSize: 10,

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setSortBy: (option) => set({ sortBy: option, currentPage: 1 }),
  setCurrentPage: (page) => {
    if (typeof page === 'function') {
      set((state) => ({ currentPage: page(state.currentPage) }));
    } else {
      set({ currentPage: page });
    }
  },
  setPatients: (patients) => set({ patients }),

  getFilteredPatients: () => {
    const { patients, searchQuery, sortBy } = get();
    const q = searchQuery.trim().toLowerCase();
    
    let result = patients.filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.hospitalId.toLowerCase().includes(q)
    );

    if (sortBy === "Hospital ID") {
      result.sort((a, b) => a.hospitalId.localeCompare(b.hospitalId));
    } else if (sortBy === "Patient Name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Status") {
      result.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortBy === "Next Delivery") {
      result.sort((a, b) => new Date(a.nextDeliveryDate).getTime() - new Date(b.nextDeliveryDate).getTime());
    }

    return result;
  },

  getPaginatedPatients: () => {
    const { currentPage, pageSize } = get();
    const filtered = get().getFilteredPatients();
    return filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  },
}));
