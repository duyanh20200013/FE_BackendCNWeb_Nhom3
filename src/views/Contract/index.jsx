import { useState, useEffect, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchParams, useLocation } from 'react-router-dom';
import { AiFillCalendar } from 'react-icons/ai';
import Navbar from '../../components/navbar/Navbar';
import Container from '../../components/Container';
import Button from '@/components/Button';
import PriceDetail from './components/PriceDetail';
import qs from 'qs';


import { getHouseById, createContract } from '@/api/houseApi';

const houseData = {
    data: {
        id: 1,
        status: 'Trống',
        name: 'Bungalow với tầm nhìn thung lũng 4 tuyệt đẹp tại HappyHill',
        title: 'Hướng núi',
        price: 34,
        star: 0,
        countReview: 0,
        createdAt: '2023-05-08T05:25:27.000Z',
        updatedAt: '2023-05-08T05:25:27.000Z',
        houseImageIdData: [
            {
                url: 'https://a0.muscache.com/im/pictures/miso/Hosting-818483900129780576/original/262a4f7e-b83f-455c-83be-d250afb2abb0.jpeg?im_w=1200',
            },
            {
                url: 'https://a0.muscache.com/im/pictures/miso/Hosting-818483900129780576/original/8d826e82-9764-4782-82cc-bc02764b3d4b.jpeg?im_w=720',
            },
            {
                url: 'https://a0.muscache.com/im/pictures/miso/Hosting-818483900129780576/original/0a6b22de-0ee6-46fe-abc4-322b2d9e98b8.jpeg?im_w=720',
            },
            {
                url: 'https://a0.muscache.com/im/pictures/miso/Hosting-818483900129780576/original/a862f6a3-e7ed-4c05-988b-0a75efd80be8.jpeg?im_w=720',
            },
            {
                url: 'https://a0.muscache.com/im/pictures/miso/Hosting-818483900129780576/original/100a8caa-d04e-41a4-ba83-efbfbeba999c.jpeg?im_w=720',
            },
        ],
        House_Info: {
            kindOfHouse: 'Nhà',
            descriptionHTML: null,
            descriptionMarkDown: null,
            address: 'Nậm Cang,Lào Cai',
            location: null,
            maxGuests: 5,
            allowAnimals: true,
            countBed: 3,
            countBathRoom: 2,
        },
        districtData: {
            code: 83,
            name: 'Huyện Mường Khương',
        },
        provinceData: {
            code: 10,
            name: 'Tỉnh Lào Cai',
            phoneCode: 214,
        },
        ownerData: {
            firstName: 'Duy Anh',
            lastName: 'Đinh',
            phone: '0867954826',
            image:
                'data:image/jpeg;base64,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',
        },
    },
    dataType: [
        {
            name: 'Phòng',
            linkIcon: 'https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg',
        },
    ],
    dataConvenient: [
        {
            typeConvenient: 'Đồ dùng thiết yếu',
            name: 'Máy giặt',
        },
        {
            typeConvenient: 'Đồ dùng thiết yếu',
            name: 'Điều hoà nhiệt độ',
        },
        {
            typeConvenient: 'Đồ dùng thiết yếu',
            name: 'Máy sấy tóc',
        },
        {
            typeConvenient: 'Đồ dùng thiết yếu',
            name: 'TV',
        },
        {
            typeConvenient: 'Đồ dùng thiết yếu',
            name: 'Bàn là',
        },
        {
            typeConvenient: 'Đồ dùng thiết yếu',
            name: 'Hệ thống sưởi',
        },
    ],
    dataReview: [
        {
            customerId: 4,
            star: 4,
            description: "Nhà đẹp như trong hình",
            createdAt: "2023-06-09T15:53:31.000Z",
            updatedAt: "2023-06-09T15:53:31.000Z",
            userReviewData: {
                firstName: "Duy Anh",
                lastName: "Đinh",
                image: "data:image/jpeg;base64,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"
            }
        }
    ],
    dataContract: [
        {
            arriveDate: "2023-07-20",
            leftDate: "2023-07-22"
        }
    ],
};


function Contract() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = location.search;
    const paramsData = qs.parse(queryParams, { ignoreQueryPrefix: true });
    const { id } = useParams();

    const [house, setHouse] = useState(houseData.data);
    const [contract, setContract] = useState(houseData.dataContract);

    const fnChangeDate = () => {
        var startDate = new Date(paramsData.arriveDate);
        var endDate = new Date(paramsData.leftDate);
        return (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    };

    let data = {
        houseId: id,
        arriveDate: paramsData.arriveDate,
        leftDate: paramsData.leftDate,
        price: paramsData.price,
        numberOver13: paramsData.adults,
        numberUnder13: paramsData.children,
        numberChildren: paramsData.infants,
        haveAnimals: paramsData.pets,
    }

    const handleLink = async () => {
        try {
            await createContract(data);
            navigate({
                pathname: '/trip',
            });
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        const fetchHouse = async () => {
            try {
                const res = await getHouseById({ id });
                setHouse(res.data.data);
                setContract(res.data.dataContract);
                console.log(house);
                console.log(contract);
            } catch (err) { }
        };

        fetchHouse();
    }, [id]);

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
                        <h1 className="text-4xl font-semibold">Yêu cầu đặt phòng/đặt chỗ</h1>
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-[50%]'>
                            <div className="pb-6 border-b-[1px]">
                                <h1 className="text-2xl font-semibold">Chuyến đi của bạn</h1>
                                <div className='flex justify-between mt-4 pb-6'>
                                    <div>
                                        <h2 className="text-xl font-semibold pb-2">Ngày</h2>
                                        <span>Ngày {paramsData.arriveDate.substring(8, 10)} tháng {paramsData.arriveDate.substring(5, 7)} - Ngày {paramsData.leftDate.substring(8, 10)} tháng {paramsData.leftDate.substring(5, 7)}</span>
                                    </div>
                                    <div>
                                        <button className='underline font-semibold'>Chỉnh sửa</button>
                                    </div>
                                </div>
                                <div className='flex justify-between mt-4 pb-6'>
                                    <div>
                                        <h2 className="text-xl font-semibold pb-2">Khách</h2>
                                        <span>{paramsData.adults} Người lớn, {paramsData.children} Trẻ em, {paramsData.infants} em bé và {paramsData.pets == 0 ? 'không' : 'có'} mang thú cưng</span>
                                    </div>
                                    <div>
                                        <button className='underline font-semibold'>Chỉnh sửa</button>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-6 border-b-[1px] pt-8">
                                <h1 className="text-2xl font-semibold pb-6">Thanh toán</h1>
                                <div className='flex justify-between'>
                                    <img src="../../../public/images/QR.png" alt="" className='w-[45%]' />
                                    <div className='w-[45%]'>
                                        <div className='flex justify-between mt-4'>
                                            <span className='font-semibold'>Tên tài khoản</span>
                                            <span>DINH DUY ANH</span>
                                        </div>
                                        <div className='flex justify-between mt-8'>
                                            <span className='font-semibold'>Ngân hàng</span>
                                            <span>TP Bank</span>
                                        </div>
                                        <div className='flex justify-between mt-8'>
                                            <span className='font-semibold'>Số tài khoản</span>
                                            <span>0867954877</span>
                                        </div>
                                        <div className='flex justify-between mt-8'>
                                            <span className='font-semibold'>Số tiền</span>
                                            <span>${paramsData.price}</span>
                                        </div>
                                        <div className='flex justify-between mt-8'>
                                            <span className='font-semibold'>Nội dung</span>
                                            <span>AIRBNBQR{id}-{paramsData.arriveDate.substring(8, 10)}-{paramsData.leftDate.substring(8, 10)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-6 border-b-[1px] pt-8">
                                <h1 className="text-2xl font-semibold">Chính sách huỷ</h1>
                                <div className='pt-8'>Bạn được hoàn toàn bộ chi phí nếu hủy trước khi nhận phòng vào <span className='underline font-semibold'>ngày {paramsData.arriveDate.substring(8, 10)} tháng {paramsData.arriveDate.substring(5, 7)}</span>. Sau thời gian đó, bạn sẽ không nhận được hoàn tiền nếu huỷ.</div>
                            </div>
                            <div className="pb-6 border-b-[1px] pt-8">
                                <h1 className="text-2xl font-semibold">Quy chuẩn chung</h1>
                                <div className='pt-8 pb-6'>
                                    <span>Chúng tôi yêu cầu tất cả khách phải ghi nhớ một số quy chuẩn đơn giản để làm một vị khách tuyệt vời.</span>
                                    <ul className='list-disc pl-5 pt-4'>
                                        <li>Tuân thủ nội quy nhà</li>
                                        <li>Giữ gìn ngôi nhà như thể nó là nhà của bạn</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex mr-2 justify-between pb-6 border-b-[1px] pt-8">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABIFBMVEX/7q3////Jt
                                33gWFiWzrT/b2n/762SzbTgVVf/9bHkcGWZz7T/7aeo07P//PKQzLTD27HgXVTa4rDn5q/T37D2667Gs3XIun7RwpL/amf/hX
                                XhUlb/46f/p4b77a3/66v/upH/0p7/wpXzZmLw6a7NvIe42LLk5a/t59b18ujg1rfsYV++PkH/ZWS017Ll3MLbz6r/++3L3bH
                                WyZ/KsnvNqHfeS0z/eW7/+eLw693hW1PbcWHTkm7eYFu/SUbAVEvEfV//8b7/0Jz/9dHj0pX/99nViWrRmnHZd2TRUE7CcVnB
                                YVHxubTfzZD/j3rYgGP65eL21NPqlI/le3jXnHTqjnHWp3jtgGzBjmfkl3TCbVfFi2bmf3vxvrz/sIr/n4LEUh1UAAASd0lEQ
                                VR4nO1dCXsTRxIdxtZIxsbm0mEwMmAbW7aMDDKHnRhwWEKA3WSPQNjN7vL//8VOXzNTR/fUSMqi8Ud9myx099TU6+NVV023El
                                266BJ9bQP+cPmGsP7yDWH95RvC+ss3hJns7R+Nj0arvurBaH883t/zPn4yOkrrB3+U+oAIEY7iTqej/jlijRyMVXVavzNiH9/
                                rmepOjzfSqY8nUx8UEcJBnOo30ukwLxl18vqYsXGcVced8ezVh0WC8CQ3UL3kCNfvw3o8TKu9Yn1nB9u4N536MhEgHMRQ8DCM
                                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"
                                    alt="" className="w-12 h-12" />
                                <span className='font-semibold pl-8'>Đặt phòng/đặt chỗ của bạn sẽ không được xác nhận cho đến khi bạn hoàn tất thanh toán(trong vòng 24 giờ) và Chủ nhà/Người tổ chức chấp thuận yêu cầu của bạn</span>
                            </div>
                            <div className=" pb-6 border-b-[1px] pt-8">
                                <span className='text-sm'>Bằng việc chọn nút bên dưới, tôi đồng ý với <span className='underline font-semibold'>Nội quy nhà của Chủ nhà, Quy chuẩn chung đối với khách, Chính sách đặt lại và hoàn tiền của Airbnb</span> và đồng ý rằng Airbnb có thể tính phí vào phương thức thanh toán của tôi nếu tôi phải chịu trách nhiệm về thiệt hại. Tôi đồng ý thanh toán tổng số tiền được hiển thị.</span>
                                <div className="card-actions justify-end mt-2">
                                    <Button label="Đặt phòng" onClick={handleLink}></Button>
                                </div>
                            </div>

                        </div>
                        <div className="w-[50%] pl-4 lg:w-[40%]">
                            <PriceDetail houseData={house} days={fnChangeDate()} />
                        </div>
                    </div>


                </Container>
            </div>
        </div>
    );
}

export default Contract;
