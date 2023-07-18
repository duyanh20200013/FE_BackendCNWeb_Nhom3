import { memo } from 'react';
import { useEffect, useState } from 'react';
import Container from '../../../components/Container';
import TripCard from '../../../components/listing/TripCard';
function TripList({ tripList, fnShowReview, fnShowCancel }) {
    useEffect(() => {
        console.log('re-render booking list');
    });

    return (
        <>
            <div
                className="
          pt-12
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
        "
            >
                {tripList?.map(item => (
                    <TripCard key={item.id} data={item} fnShowReview={fnShowReview} fnShowCancel={fnShowCancel}></TripCard>
                ))}
            </div>
        </>
    );
}

export default memo(TripList);