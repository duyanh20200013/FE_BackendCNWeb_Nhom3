const houseInfoNavItems = [
  { id: 'house_image', label: 'Ảnh' },
  { id: 'house_info', label: 'Thông tin cơ bản về nhà/phòng cho thuê' },
  { id: 'house_convenient', label: 'Tiện nghi' },
  { id: 'house_location', label: 'Vị trí' },
  { id: 'house_type', label: 'Chỗ ở và phòng' },
  { id: '', label: 'An toàn cho khách' },
];

function SideNav() {
  return (
    <div className="hidden md:block mr-[20px] lg:mr-[100px] w-[20vh] lg:w-[30vh]">
      <nav className="flex-col flex sticky top-6">
        <a className="font-bold py-3 px-4 bg-[#F7F7F7] rounded-md mb-4">
          Chi tiết nhà/phòng cho thuê
        </a>
        <ol className="ml-4 border-l-[1px]">
          {houseInfoNavItems.map((item, index) => {
            return (
              <li className="" key={`nav_item_${index}`}>
                <a
                  className={`block py-2 my-2 pl-5 cursor-pointer 
                  ${
                    item.label == 'abc' &&
                    'font-bold border-l-2 border-[#222222]'
                  }
                  `}
                  href={`#${item.id}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

export default SideNav;
