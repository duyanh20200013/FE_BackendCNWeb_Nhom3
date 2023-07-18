import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';
import Navbar from '../../components/navbar/Navbar';
import Container from '../../components/Container';
import HeartButton from '../../components/HeartButton';
import PhotosView from './components/PhotosView';
import Button from '../../components/Button';
import ReservationCard from './components/ReservationCard';
import LoginModal from '../../components/auth/LoginModal';

import { getHouseById } from '@/api/houseApi';
const houseData = {
  data: {
    id: 1,
    status: 'Trống',
    name: 'Bungalow với tầm nhìn thung lũng 4 tuyệt đẹp tại HappyHill',
    title: 'Hướng núi',
    price: 34,
    star: 5,
    countReview: 10,
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

function House() {
  const { id } = useParams();

  const [house, setHouse] = useState(houseData.data);
  const [houseType, setHouseType] = useState(houseData.houseType);
  const [convenient, setConvenient] = useState(houseData.dataConvenient);
  const [review, setReview] = useState(houseData.dataReview);
  const [contract, setContract] = useState(houseData.dataContract);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const fnShowLogin = () => {
    //e.stopPropagation();
    setShowLogin(true);
  };


  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await getHouseById({ id });
        setHouse(res.data.data);
        setHouseType(res.data.dataType);
        setConvenient(res.data.dataConvenient);
        setReview(res.data.dataReview);
        setContract(res.data.dataContract);
      } catch (err) { }
    };

    fetchHouse();
  }, [id]);

  if (showAllPhotos) {
    return <PhotosView data={house} onClose={() => setShowAllPhotos(false)} />;
  }

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
          <div className="mt-4">
            <h1 className="text-2xl font-semibold">{house.name}</h1>
            <div className="flex justify-between mt-2 pb-6">
              <div className="flex items-center">
                <div className="flex mr-2 items-center">
                  <AiFillStar />
                  <span className="pl-[2px]">{house.star || "Mới"}</span>
                </div>
                <div className="underline font-semibold">
                  {house.districtData.name}, {house.provinceData.name}
                </div>
              </div>
              <div>
                <button className="flex group hover:bg-neutral-100 p-1 rounded-md">
                  <HeartButton />
                  <span className="underline font-semibold ml-1">Lưu</span>
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] grid-rows-[500px] rounded-xl overflow-hidden">
              <div className="">
                {house.houseImageIdData?.[0] && (
                  <img src={house.houseImageIdData[0].url} alt="" className="aspect-[6/5] object-cover w-full h-full" />
                )}
              </div>
              <div className="grid grid-rows-2">
                <div className="row-span-1">
                  {house.houseImageIdData?.[1] && (
                    <img
                      src={house.houseImageIdData[1].url}
                      alt=""
                      className="aspect-[6/5] object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="row-span-1">
                  {house.houseImageIdData?.[2] && (
                    <img
                      src={house.houseImageIdData[2].url}
                      alt=""
                      className="aspect-[6/5] object-cover pt-2 w-full h-full"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-rows-2">
                <div>
                  {house.houseImageIdData?.[3] && (
                    <img
                      src={house.houseImageIdData[3].url}
                      alt=""
                      className="aspect-[6/5] object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="">
                  {house.houseImageIdData?.[4] && (
                    <img
                      src={house.houseImageIdData[4].url}
                      alt=""
                      className="aspect-[6/5] object-cover w-full h-full pt-2"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2">
              <button
                className="flex items-center px-4 py-2 bg-white rounded-lg font-semibold border boder-black hover:bg-slate-100"
                onClick={() => setShowAllPhotos(true)}
              >
                <FaImage size={22} />
                <span className="pl-2">Hiển thị tất cả ảnh</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[58.333333%]">
              <div className="flex justify-between pt-12 pb-6 border-b-[1px]">
                <div>
                  <h2 className="font-semibold text-2xl">
                    Thông tin nhà. Chủ nhà {house.ownerData.lastName} {house.ownerData.firstName}{' '}
                  </h2>
                  <ul className="list-none">
                    <li key={1} className="inline-block">
                      <span> {house.House_Info.maxGuests} khách </span>
                    </li>
                    <li key={2} className="inline-block">
                      <span className="px-1">&middot;</span>
                      <span>{house.House_Info.countBed} giường</span>
                    </li>
                    <li key={3} className="inline-block">
                      <span className="px-1">&middot;</span>
                      <span>{house.House_Info.countBathRoom} phòng tắm</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="avatar">
                    <div className="w-14 rounded-full">
                      <img src={house.ownerData.image} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='py-8 border-b-[1px]'>
                <div className="pb-6">
                  <h2 className="font-semibold text-2xl">Giới thiệu về chỗ ở này</h2>
                </div>
                {house.House_Info.descriptionHTML
                  ?
                  <div dangerouslySetInnerHTML={{ __html: house.House_Info.descriptionHTML }}>
                  </div> : <span>Không có thông tin giới thiệu về nơi này</span>
                }
              </div>
              <div className="py-8">
                <div className="pb-6">
                  <h2 className="font-semibold text-2xl">Nơi này có những gì cho bạn</h2>
                </div>
                <div className="flex flex-col pb-6">
                  <ul className="list-disc pl-5">
                    {convenient && convenient.length > 0 &&
                      convenient.map((item, i) => {
                        return (
                          <li key={i} className="pb-2">
                            {convenient[i].name}
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <div>
                  <Button className="w-60" label="Hiển thị tất cả tiện nghi" outline></Button>
                </div>
              </div>
            </div>
            <div className="w-[50%] pl-4 lg:w-[36.33333%]">
              <ReservationCard houseData={house} contractData={contract} fnShowLogin={fnShowLogin} />
            </div>
          </div>

          <div className="justify-between mt-2 pb-6 border-t-[1px] py-8">
            <div className="pb-6">
              <h2 className="font-semibold text-2xl">Đánh giá</h2>
            </div>
            <div className="flex mr-2 items-center">
              <AiFillStar />
              <span className="pl-[2px] font-medium">
                {house.star || "Mới"}
                <span className="px-1">&middot;</span>
              </span>
              <span className="underline font-medium text-neutral-400 py-8">{house.countReview} đánh giá</span>
            </div>
            <div className="flex justify-between">
              {review && review.length > 0 &&
                review.map((item, i) => {
                  return (
                    <div key={i} className='w-[40%]'>
                      <div className='flex'>
                        <div className="avatar">
                          <div className="w-14 rounded-full">
                            <img src={review[i].userReviewData.image} />
                          </div>
                        </div>
                        <div className='ml-2'>
                          <h2 className="font-semibold text-2xl">
                            {review[i].userReviewData.lastName} {review[i].userReviewData.firstName}{' '}
                          </h2>
                          <span>Ngày {review[i].createdAt.substring(8, 10)} Tháng {review[i].createdAt.substring(5, 7)} năm {review[i].createdAt.substring(0, 4)}</span>
                        </div>
                        <div className='ml-2 flex items-center'>
                          <AiFillStar />
                          <span className="font-medium">
                            {review[i].star}
                          </span>
                        </div>
                      </div>
                      <div className='py-4'>
                        {review[i].description}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="justify-between mt-2 pb-6 border-t-[1px] py-8">
            <div className="pb-6">
              <h2 className="font-semibold text-2xl">Nơi bạn sẽ đến</h2>
            </div>
            <div className="underline font-semibold flex flex-col pb-6">
              {house.districtData.name}, {house.provinceData.name}
            </div>
            <div className="flex flex-col pb-6">
              <span style={{ whiteSpace: 'pre-line' }}>{house.House_Info.addressDescription || "Không có thông tin chi tiết về địa điểm này"}</span>
              <img src='../../../public/images/Map.JPG' alt="" className="object-cover h-full w-full mt-6" />
            </div>
          </div>
          {/* <div className="w-100 h-[400px]"></div> */}
        </Container>
      </div>
      <LoginModal isShow={showLogin} handleClose={() => setShowLogin(false)} />
    </div>
  );
}

export default House;
