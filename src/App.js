import { useEffect, useRef } from 'react';
import { useSubscriberQueue } from './hooks/use-subscriber-queue.js';
import styles from './app.module.css';

const Overlay = ({ currentState }) => {
  const ref = useRef();

  useEffect(() => {
    if (['starting', 'active'].includes(currentState)) {
      ref.current.classList.add(styles.visible);
    } else {
      ref.current.classList.remove(styles.visible);
    }
  }, [currentState]);

  return (
    <div className={styles.overlay} ref={ref}>
      <h2>HOORAY!</h2>
    </div>
  );
};

export default function App() {
  const [state, send] = useSubscriberQueue();

  function showOverlay() {
    send('SUBSCRIBE');
  }

  return (
    <div>
      <h1>State Machines</h1>

      <Overlay currentState={state.value} />

      <button disabled={state.value !== 'idle'} onClick={showOverlay}>
        {state.value !== 'idle' ? 'Showing Overlay...' : 'Send Event'}
      </button>
    </div>
  );
}
