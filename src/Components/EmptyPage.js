import React, { useEffect } from 'react';
import api from '../lib/api';

export default function EmptyPage() {
  // const data = api.get('/patients');
  // console.log('[data]', data);

  useEffect(() => {});
  return <div>You are logged in</div>;
}
