// import { authApi } from '../api/AuthApi.ts';
import Block from './Block.ts';
import { EventBus } from './EventBus.ts';
import { set } from '../utils/set.ts';
import type { StateType } from '../types.ts';

enum StorageEvent {
  UpdateState = 'update',
}

class Store extends EventBus {
  private state: StateType = {};

  getState(): StateType {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StorageEvent.UpdateState, this.state);
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: StateType) => any) {
  return (Component: typeof Block) =>
    class extends Component {
      constructor(props: any) {
        super({ ...props, ...mapStateToProps(store.getState()) });

        store.on(StorageEvent.UpdateState, () => {
          const propsFromState = mapStateToProps(store.getState());

          console.log('STORE: ', propsFromState);
          this.setProps(propsFromState);
        });
      }
    };
}

export default store;
