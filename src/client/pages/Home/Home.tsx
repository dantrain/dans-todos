import { Card } from '@mui/material';
import capitalize from 'lodash/capitalize';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import Suspense from '../../components/Suspense/Suspense';
import preloadComponent from '../../utils/preloadComponent';
import { Filter } from '../../__generated__/TodoManagerQuery.graphql';
import SkeletonTodoManager from './SkeletonTodoManager/SkeletonTodoManager';

const TodoManager = preloadComponent(import('./TodoManager/TodoManager'));

const Home = () => {
  const { pathname } = useLocation();
  const filter = (pathname.replace('/', '').toUpperCase() || 'ALL') as Filter;

  return (
    <>
      <Helmet>{filter !== 'ALL' && <title>{capitalize(filter)}</title>}</Helmet>
      <Card>
        <Suspense fallback={<SkeletonTodoManager />}>
          <TodoManager filter={filter} />
        </Suspense>
      </Card>
    </>
  );
};

export default Home;
