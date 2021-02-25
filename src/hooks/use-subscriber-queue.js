import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';

const subQueueMachine = Machine(
  {
    id: 'sub-queue',
    initial: 'idle',
    context: {},
    states: {
      idle: {
        on: {
          SUBSCRIBE: 'starting',
        },
      },
      starting: {
        invoke: {
          src: 'transition',
          onDone: 'active',
        },
      },
      active: {
        invoke: {
          src: 'display',
          onDone: 'ending',
        },
      },
      ending: {
        invoke: {
          src: 'transition',
          onDone: 'idle',
        },
      },
    },
  },
  {
    services: {
      transition() {
        return new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
      },
      display() {
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      },
    },
  },
);

export function useSubscriberQueue() {
  const [state, send] = useMachine(subQueueMachine);

  return [state, send];
}
