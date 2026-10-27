import { getCurrentInstance, ComponentInternalInstance } from 'vue';

export function useProxy() {
  const instance = getCurrentInstance() as ComponentInternalInstance
  if (!instance) {
    throw new Error('useProxy must be called within a setup function');
  }
  return instance.proxy
}