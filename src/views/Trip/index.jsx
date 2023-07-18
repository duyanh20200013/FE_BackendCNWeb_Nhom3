import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams, useLocation } from 'react-router-dom';
import { AiFillCalendar } from 'react-icons/ai';
import Navbar from '../../components/navbar/Navbar';
import Container from '../../components/Container';
import Button from '@/components/Button';
import qs from 'qs';
import Global from '@/general/Global';
import TripListEmpty from './components/TripListEmpty';
import TripList from './components/TripList';


import { getHouseById, getAllContractOfCustomer } from '@/api/houseApi';
import ReviewModal from './components/ReviewModal';
import CancelModal from './components/CancelModal';

function Trip() {
    const [showReview, setShowReview] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [tripList, setTripList] = useState([]);
    const [data1, setData1] = useState('');
    const [data2, setData2] = useState('');
    const user = JSON.parse(Global.user);

    const fnShowReview = (info) => {
        setShowReview(true);
        setData1(info);
    };

    const fnShowCancel = (info1) => {
        console.log(info1)
        setShowCancel(true);
        setData2(info1);
    };

    useEffect(() => {
        async function getTripList() {
            try {
                const res = await getAllContractOfCustomer({ customerId: user.id });
                setTripList(res.data.data);
            } catch (err) {
                alert(err);
            }
        }

        getTripList();
    }, [user.id]);

    return (
        <div>
            <Navbar
                className="max-w-[2520px]
        mx-auto
        xl:px-40 
        md:px-20
        sm:px-4
        px-8"
            ></Navbar>

            <div
                className="max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4"
            >
                <Container>
                    {/* <div>{tripList.length == 0 ? <TripListEmpty></TripListEmpty> : <TripList tripList={tripList}></TripList>}</div> */}
                    <div>
                        <TripList tripList={tripList} fnShowReview={fnShowReview} fnShowCancel={fnShowCancel}></TripList>
                    </div>
                    <ReviewModal isShow={showReview} handleClose={() => setShowReview(false)} data1={data1} />
                    <CancelModal isShow={showCancel} handleClose={() => setShowCancel(false)} data2={data2} />
                </Container>
            </div>
        </div>
    );
}

export default Trip;
