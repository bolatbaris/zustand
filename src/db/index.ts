import {mmkvInstance} from '../../App';

export function write(key: string, value: Object): boolean {
  return mmkvInstance?.set(key, value);
}

export function read<T>(key: string): T | undefined {
  return mmkvInstance?.get<T>(key);
}
