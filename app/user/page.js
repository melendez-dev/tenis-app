'use client';

import { useSession } from 'next-auth/react';

export default function UserPage() {
  const session = useSession();
  return (
    <div>
      User Page
    </div>
  );
}
