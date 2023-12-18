import {MMKV} from 'react-native-mmkv';

export interface Listener {
  remove: () => void;
}

class MMKVInstance {
  private instance: MMKV | undefined = undefined;

  constructor() {
    this.instance = new MMKV();
  }

  public get_instance() {
    if (this?.instance === undefined) {
      this.instance = new MMKV();
    }
    return this.instance;
  }

  public set(key: string, value: Object = {}): boolean {
    const instance = this.get_instance();
    if (!instance) {
      return false;
    }
    try {
      instance.set(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  public get<T>(key: string): T | undefined {
    const instance = this.get_instance();
    if (!instance) {
      return undefined;
    }
    try {
      const value = instance.getString(key);
      if (value) {
        return JSON.parse(value) as T;
      }
      return undefined;
    } catch (err) {
      return undefined;
    }
  }

  public delete_all(): boolean {
    const instance = this.get_instance();
    if (!instance) {
      return false;
    }
    try {
      instance.clearAll();
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default MMKVInstance;
