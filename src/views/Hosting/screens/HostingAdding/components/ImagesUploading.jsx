import { memo } from 'react';
import { useState, useEffect } from 'react';
import { storage } from '@/firebase';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { SlOptions } from 'react-icons/sl';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '@/components/Button';

function ImagesUploading({ setImages, images = [], onUploaded, onUploading }) {
  console.log('Images previous: ', images);

  // State for binding to input file
  const [imageUpload, setImageUpload] = useState(null);

  // State for rendering image
  const [imageList, setImageList] = useState(images);

  // State for store images' urls
  const [imagesUrl, setImagesUrl] = useState(images);

  useEffect(() => {
    if (imagesUrl.length) {
      console.log('Use effect: ', imagesUrl);
      setImages(imagesUrl);
    }
  }, [imagesUrl]);

  const handleClickUpload = () => {
    const inputElement = document.getElementById('add-image');

    inputElement.click();
  };

  const handleSetImageList = e => {
    // Rendering
    const { files } = e.target;
    const filesArray = Object.values(files);
    setImageList(prev => [...prev, ...filesArray]);

    if (files == null || !Object.keys(files).length) return;

    handleUploadAndGetUrl(filesArray);
  };

  const handleUploadAndGetUrl = async files => {
    const uploadPromises = files.map(file => {
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                resolve(downloadUrl);
              })
              .catch(err => reject(err));
          },
        );
      });
    });

    try {
      onUploading();
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

  // If >= 5 images -> Allow next
  useEffect(() => {
    if (imagesUrl.length >= 5) {
      onUploaded();
    }
  }, [imagesUrl]);

  return (
    <div className="w-[640px] max-w-[640px]">
      <header className="font-bold text-[32px] mb-8">
        Bổ sung một số bức ảnh chụp chỗ ở của bạn
        <h3 className="text-gray-500 text-lg font-medium mt-2">
          Bạn sẽ cần 5 bức ảnh để bắt đầu. Về sau, bạn vẫn có thể đăng thêm hoặc thay đổi ảnh.
        </h3>
      </header>

      <div className="mb-2">
        <button className="flex items-center font-semibold border rounded-full py-2 px-4" onClick={handleClickUpload}>
          <AiOutlinePlus size={16} />
          <span className="pl-2">Thêm ảnh</span>
        </button>
      </div>
      <input
        id="add-image"
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={handleSetImageList}
        className="w-0 h-0"
      />
      <div className="w-full grid grid-cols-2 gap-2">
        {imageList?.map((item, index) => {
          let image;
          if (typeof item == 'string') {
            image = item;
          } else {
            image = URL.createObjectURL(item);
          }

          return (
            <div
              className={`relative w-full col-span-2 sm:col-span-1 ${
                !index ? 'sm:col-span-2 h-[320px]' : 'h-[240px]'
              } bg-gray-200`}
              key={`image_${index}`}
            >
              <img className="w-full h-full object-cover" src={image} />

              {/* Drop down */}
              <div className="absolute top-2 right-2">
                <div className="dropdown dropdown-end">
                  <button tabIndex={0} className="m-1 rounded-full p-2 bg-white/70 hover:bg-white/95 hover:scale-110">
                    <SlOptions />
                  </button>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                    <li>
                      <a className="text-base font-semibold">Chỉnh sửa</a>
                    </li>
                    <li>
                      <a className="text-base font-semibold">Xóa</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(ImagesUploading);
