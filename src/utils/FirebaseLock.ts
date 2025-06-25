let lockOwner: string | null = null;
const waitQueue: Record<string, string[]> = {};
export const acquireLock = (serviceName: string): boolean => {
  if (lockOwner === null) {
    lockOwner = serviceName;
    return true;
  }
  if (!waitQueue[serviceName]) {
    waitQueue[serviceName] = [lockOwner];
  }
  return false;
};
export const releaseLock = (serviceName: string) => {
  if (lockOwner === serviceName) {
    lockOwner = null;
  }
  delete waitQueue[serviceName];
};
export const detectDeadlock = (): boolean => {
  const visited = new Set<string>();
  const dfs = (node: string): boolean => {
    if (visited.has(node)) return true;
    visited.add(node);
    const neighbors = waitQueue[node] || [];
    for (const neighbor of neighbors) {
      if (dfs(neighbor)) return true;
    }
    visited.delete(node);
    return false;
  };
  for (const service in waitQueue) {
    visited.clear();
    if (dfs(service)) {
      return true;
    }
  }
  return false;
};
