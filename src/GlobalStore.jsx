import { addCallback, addReducer, setGlobal } from 'reactn';
import ls from 'local-storage';

class GlobalStore {
  constructor() {
    this.emptyState = {
      something: 'to always start with',
    };

    // const existingState = this.emptyState;
    const existingState = ls('hrd') || this.emptyState;

    setGlobal(existingState);
  }

  addCallbacks() {
    addCallback(global => {
      ls('hrd', global);
      return null;
    });
  }

  addReducers() {
    addReducer('empty', () => {
      const global = this.emptyState;

      ls('hrd', global);

      return global;
    });
  }
}

export default GlobalStore;
