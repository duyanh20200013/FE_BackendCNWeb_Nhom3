import { useSelector } from 'react-redux';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/views/Hosting/components/Navbar';
import Container from '@/components/Container';
import AgGrid from '@/components/AgGrid';
import { getAllHouseOfOwner } from '@/api/ownerApi';
import { dateStrFormatter } from '@/utils/dateFormatUtils';
import { BsHourglassSplit, BsFillCheckSquareFill } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdDelete, MdEdit } from 'react-icons/md';

function HouseImage(props) {
  console.log(props);
  return (
    <img
      className="w-14 h-10 object-contain rounded overflow-hidden"
      src={props?.data?.houseImageIdData?.[0]?.url}
    ></img>
  );
}

function HostingList() {
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.auth.user);
  const navHeight = useSelector(state => state.app.navHeight);

  const columnDefs = useMemo(
    () => [
      {
        field: '',
        headerName: 'Nhà/phòng cho thuê',
        cellRenderer: HouseImage,
        width: 200,
        cellClass: 'py-4',
        autoHeight: true,
        // pinned: 'left',
      },
      {
        field: 'name',
        headerName: 'Tên phòng',
        minWidth: 300,
      },
      {
        field: 'status',
        headerName: 'Trạng thái',
        minWidth: 200,
        cellRenderer: ({ data }) => {
          let statusText = data.status == 'Active' ? 'Đang hoạt động' : 'Chờ xác nhận';
          return (
            <div className="flex items-center gap-2">
              {data.status == 'Active' ? (
                <AiFillCheckCircle color="#008A05" size={16} />
              ) : (
                <BsHourglassSplit color="#979595" size={16} />
              )}
              {/* <AiFillCheckCircle size={20} color={data.status == 'Active' ? '#008A05' : '#DDDDDD'} /> */}
              <span>{statusText}</span>
            </div>
          );
        },
      },
      {
        headerName: 'Vị trí',
        valueGetter: ({ data }) => {
          return data.districtData.name
            ? data.provinceData.name
              ? `${data.districtData.name}, ${data.provinceData.name}`
              : data.provinceData.name
            : '';
        },
        minWidth: 300,
      },
      {
        field: 'price',
        headerName: 'Giá (đêm)',
        width: 120,
      },
      {
        field: 'star',
        headerName: 'Đánh giá',
        width: 120,
      },
      {
        field: 'countReview',
        headerName: 'Lượt đánh giá',
        minWidth: 150,
      },
      {
        field: 'updatedAt',
        headerName: 'Sửa đổi lần cuối',
        valueGetter: ({ data }) => {
          return dateStrFormatter(data.updatedAt);
        },
      },
      {
        // field: '',
        headerName: 'Tùy chọn',
        cellRenderer: ({ data }) => {
          return (
            <div className="flex items-center gap-2">
              <div className="cursor-pointer p-1" onClick={() => handleLinkDetail(data?.id)}>
                <MdEdit size={20} className="text-edit" />
              </div>
              <div className="cursor-pointer p-1">
                <MdDelete size={20} className="text-delete" />
              </div>
              <p className="invisible">a</p>
            </div>
          );
        },
      },
    ],
    [],
  );

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetchHouseList();
  }, [currentUser.id]);

  const fetchHouseList = async () => {
    const res = await getAllHouseOfOwner({ ownerId: currentUser.id });

    setRowData(res?.data?.data);
  };

  const handleLinkDetail = id => {
    navigate(`/hosting/${id}/details`);
  };

  // const columnDefs = [
  //   { headerName: 'Name', field: 'name' },
  //   { headerName: 'Age', field: 'age' },
  //   { headerName: 'Country', field: 'country' },
  //   // ... more columns
  // ];

  return (
    <div>
      <Navbar />

      {/* <Container> */}
      {/* Header */}
      <div className={`px-2 flex flex-col h-[calc(100vh_-_81px)]`}>
        <div className="pt-8 pb-4 px-6">
          <div className="font-semibold text-xl">Nhà/phòng cho thuê</div>
        </div>
        {/* Table */}
        <div className="pl-2 flex-1 overflow-auto">
          <AgGrid columnDefs={columnDefs} rowData={rowData}></AgGrid>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
}

export default HostingList;
