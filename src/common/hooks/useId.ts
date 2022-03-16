import {useMemo} from 'react';
import {genId} from '../genId';

/**
 * Hook to create a unique id
 * Хук для создания уникального идентификатора
 * @param prefix identifier prefix (префикс идентификатора)
 * @param len identifier length (длина идентификатора)
 * @return {string} identifier (идентификатор)
 */
const useId = (prefix = '', len = 5): string => {
  return useMemo(() => genId(len, prefix), [prefix, len]);
};

export default useId;
