import { ComponentType, lazy } from 'react';
import PubSub from 'pubsub-js';

const load = async (
  componentPromise: Promise<{ default: ComponentType<any> }>
) => {
  PubSub.publish('FETCH_START');
  const response = await componentPromise;
  PubSub.publish('FETCH_END');
  return response;
};

const preloadComponent = (
  componentPromise: Promise<{ default: ComponentType<any> }>
) => lazy(() => load(componentPromise));

export default preloadComponent;
