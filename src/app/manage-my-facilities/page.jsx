import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const ManageMyFacilities = async () => {

    const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

    const user = session?.user;

    console.log(user);

    const res = await fetch(`http://localhost:5000/facility/${user?.id}`);

    const facilities = await res.json();
    console.log(facilities);
    return (
        <div>
            Manage My Facilities Page
        </div>
    );
};

export default ManageMyFacilities;