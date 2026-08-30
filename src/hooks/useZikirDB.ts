import { useState, useEffect, useCallback } from 'react';
import { Zikir, ZikirFormData } from '../types';
import * as repo from '../database/zikirRepository';

export const useZikirDB = () => {
  const [zikirler, setZikirler] = useState<Zikir[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repo.getAll();
      setZikirler(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (formData: ZikirFormData, count: number): Promise<Zikir> => {
      const id = await repo.insert(formData, count);
      await refresh();
      return {
        id,
        name: formData.name,
        arabicName: formData.arabicName,
        count,
        target: formData.target,
        createdAt: new Date().toISOString(),
      };
    },
    [refresh]
  );

  const updateZikir = useCallback(
    async (id: number, count: number, formData?: ZikirFormData) => {
      await repo.update(id, count, formData);
      await refresh();
    },
    [refresh]
  );

  const deleteZikir = useCallback(
    async (id: number) => {
      await repo.remove(id);
      await refresh();
    },
    [refresh]
  );

  return { zikirler, loading, save, updateZikir, deleteZikir, refresh };
};
