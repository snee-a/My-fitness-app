
export class LockManager {
  private locks: Record<string, string | null> = {};
  private waitQueue: Record<string, string[]> = {};
  acquire(resource: string, service: string): boolean {
    if (!this.locks[resource]) {
      this.locks[resource] = service;
      return true;
    }
    const currentOwner = this.locks[resource];
    if (!this.waitQueue[service]) {
      this.waitQueue[service] = [currentOwner!];
    } else if (!this.waitQueue[service].includes(currentOwner!)) {
      this.waitQueue[service].push(currentOwner!);
    }
    if (this.detectDeadlock()) {
      alert(`⚠️ Deadlock detected involving ${service}. Recovery in progress...`);
      this.recover(service);
      return false;
    }
    return false;
  }
  release(resource: string, service: string): void {
    if (this.locks[resource] === service) {
      this.locks[resource] = null;
    }
    delete this.waitQueue[service];
  }
  detectDeadlock(): boolean {
    const visited = new Set<string>();

    const dfs = (service: string): boolean => {
      if (visited.has(service)) return true;
      visited.add(service);

      const dependents = this.waitQueue[service] || [];
      for (const next of dependents) {
        if (dfs(next)) return true;
      }

      visited.delete(service);
      return false;
    };

    return Object.keys(this.waitQueue).some(service => dfs(service));
  }

  recover(service: string): void {
    
    delete this.waitQueue[service];
  }
}

export const lockManager = new LockManager(); 
