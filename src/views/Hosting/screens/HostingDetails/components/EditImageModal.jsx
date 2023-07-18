import { useState, useEffect, memo } from 'react';
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from '@/firebase';
import Modal from '@/components/modal/Modal';
import { SlOptions } from 'react-icons/sl';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '@/components/Button';

import { v4 } from 'uuid';

function EditImageModal({ imageList = [], onChangeImage, onSubmit, ...props }) {
  // State for rendering image
  const [imageListArr, setImageListArr] = useState([...imageList]);

  // State for store images' urls
  const [imagesUrl, setImagesUrl] = useState([]);

  useEffect(() => {
    setImageListArr([...imageList]);
  }, [imageList]);

  const handleClickUpload = () => {
    const inputElement = document.getElementById('add-image');

    inputElement.click();
  };

  // On input image change
  const handleSetImageList = e => {
    // Rendering
    const { files } = e.target;
    const filesArray = Object.values(files);
    console.log(filesArray);

    // setImageListArr(prev => [
    //   ...prev,
    //   ...filesArray.map(item => {
    //     return {
    //       url: item,
    //     };
    //   }),
    // ]);

    if (files == null || !Object.keys(files).length) return;

    handleUploadAndGetUrl(filesArray);
  };

  const handleRemoveImage = url => {
    console.log('Delete', url);
    const tmpArr = imageListArr.filter(item => item?.url != url);
    setImageListArr(tmpArr);
  };

  const handleUploadAndGetUrl = async files => {
    const uploadPromises = files.map(file => {
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload ' + file.name + ' is ' + progress + '% done');
          },
          error => {
            // Handle unsuccessful uploads
            reject(err);
          },
          () => {
            console.log('Get download url');
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async downloadUrl => {
                console.log('File available at ', downloadUrl);
                setImageListArr(prev => [...prev, { url: downloadUrl }]);
                resolve(downloadUrl);
              })
              .catch(err => reject(err));
          },
        );
      });
    });

    try {
      const downloadUrls = await Promise.all(uploadPromises);
      setImagesUrl(prev => {
        console.log('Prev state: ', imagesUrl);
        return [...prev, ...downloadUrls];
      });
      toast.success('Upload successfully!');
    } catch (err) {
      // Remove image
    }
  };

  const handleSubmit = () => {
    console.log(imageListArr);
    onChangeImage(imageListArr);
    onSubmit();
    props.onClose();
  };

  const ActionElements = () => {
    return (
      <div className="flex justify-between items-center">
        <button
          className="flex items-center font-semibold border rounded-full py-2 px-4"
          onClick={handleClickUpload}
        >
          <input
            id="add-image"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleSetImageList}
            className="w-0 h-0"
          />
          <AiOutlinePlus size={16} />
          <span className="pl-2">Thêm ảnh</span>
        </button>
        <div className="max-w-[200px]">
          <Button label="Xác nhận" onClick={handleSubmit} />
        </div>
      </div>
    );
  };

  return (
    <Modal {...props} title="Tất cả ảnh" action={ActionElements}>
      <div className="w-full grid grid-cols-2 gap-2">
        {imageListArr?.map((item, index) => {
          return (
            <div
              className={`relative w-full col-span-2 sm:col-span-1 ${
                !index ? 'sm:col-span-2 h-[320px]' : 'h-[240px]'
              } bg-gray-200`}
              key={`image_${item?.url}`}
            >
              <img className="w-full h-full object-cover" src={item.url} />

              {/* Drop down */}
              <div className="absolute top-2 right-2">
                <div className="dropdown dropdown-end">
                  <button
                    tabIndex={0}
                    className="m-1 rounded-full p-2 bg-white/70 hover:bg-white/95 hover:scale-110"
                  >
                    <SlOptions />
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
                  >
                    <li>
                      <a className="text-base font-semibold">Chỉnh sửa</a>
                    </li>
                    <li>
                      <a
                        className="text-base font-semibold"
                        onClick={() => handleRemoveImage(item.url)}
                      >
                        Xóa
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default memo(EditImageModal);
