import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WizardData } from '../types/wizard';
import { createEntity, updateEntity } from '../api/client';

interface WizardStore {
  data: WizardData;
  currentStep: number;
  setStep: (step: number) => void;
  updateData: (newData: Partial<WizardData>) => Promise<void>;
  reset: () => void;
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set, get) => ({
      data: {},
      currentStep: 1,
      setStep: (step) => set({ currentStep: step }),
      updateData: async (newData) => {
        const currentData = get().data;
        const updatedData = { ...currentData, ...newData };
        try {
          if (currentData.uuid) {
            const response = await updateEntity(currentData.uuid, newData);
            set({ data: response?.entity });
          } else {
            const response = await createEntity(updatedData);
            set({ data: response?.entity });
          }
        } catch (error) {
          throw error;
        }
      },
      reset: () => set({ data: {}, currentStep: 1 }),
    }),
    {
      name: 'wizard-storage',
    }
  )
); 