import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchParams, useLocation } from 'react-router-dom';
import { AiFillCalendar } from 'react-icons/ai';
import Navbar from '../../components/navbar/Navbar';
import Container from '../../components/Container';
import Button from '@/components/Button';
import qs from 'qs';
import Global from '@/general/Global';


import { getAllContract, hoanTatThanhToan } from '@/api/houseApi';

function Admin() {
    const navigate = useNavigate();

    const [contractList, setContractList] = useState([]);

    const handleOnClick = async (id) => {
        try {
            await hoanTatThanhToan({ contractId: id });
            navigate(0);
        } catch (err) {
            console.log(err)
        }
    }

    const handleButton1 = () => {
        navigate('/Admin/all-house')
    }

    const handleButton2 = () => {
        navigate('/Admin/update-house')
    }
    useEffect(() => {
        async function getContractList() {
            try {
                const res = await getAllContract();
                setContractList(res.data.data);
                console.log(contractList);
            } catch (err) {
                alert(err);
            }
        }

        getContractList();
    }, []);

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
                    <div className="mt-12 mb-12">
                        <h1 className="text-4xl font-semibold">Trang quản lý</h1>
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-[30%] flex flex-col gap-2'>
                            <Button label="Hợp đồng"></Button>
                            <Button label="Nhà được tạo" outline onClick={handleButton1}></Button>
                            <Button label="Nhà cập nhật" outline onClick={handleButton2}></Button>
                        </div>
                        <table class="border-collapse border border-slate-400 w-[65%] text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th class="border border-slate-400 px-6 py-3">Id</th>
                                    <th class="border border-slate-400 px-6 py-3">HouseName</th>
                                    <th class="border border-slate-400 px-6 py-3">arriveDate</th>
                                    <th class="border border-slate-400 px-6 py-3">leftDate</th>
                                    <th class="border border-slate-400 px-6 py-3">Status</th>
                                    <th class="border border-slate-400 px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contractList?.map((item, index) => (
                                    <tr key={index}>
                                        <td class="border border-slate-400 px-6 py-3">{item.id}</td>
                                        <td class="border border-slate-400 px-6 py-3">{item.houseContractData.name}</td>
                                        <td class="border border-slate-400 px-6 py-3">{item.arriveDate}</td>
                                        <td class="border border-slate-400 px-6 py-3">{item.leftDate}</td>
                                        <td class="border border-slate-400 px-6 py-3">{item.status}</td>
                                        <td class="border border-slate-400 px-6 py-3">{item.status == 'Đang chờ xác nhận' && <button className='rounded-full bg-green-800 text-white-700' onClick={() => handleOnClick(item.id)}>Xác nhận</button>}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </Container>
            </div>
        </div>
    );
}

export default Admin;