import { useState, useEffect, React } from 'react'
import { storage } from '../imagedb/firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'

const Imagetest = () => {

    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImagelist] = useState([]);

    const imageListRef = ref(storage, "images/")
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4() }`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImagelist((prev) => [...prev, url])
            })   
        })
    }

    useEffect(() => {
        listAll(imageListRef).then ((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url)=> {
                    setImagelist((prev) => [...prev,url])
                })
            })
        })
    }, []);

return (
    <div className='test'> 
    <input
    className='test-input'
    type='file'
    onChange={(event) =>{
        setImageUpload(event.target.files[0])
    }}
    />
    <button onClick={uploadImage} className='login-btn'>Upload Image</button>
        <div className='test-img'>
            <div className='img-rap'>
            {/* <img src={vct} alt="" /> */}
            {imageList.map((url) => {
                return <img src={url}/>
            })}
            </div>
        </div>
    </div>
)
}

export default Imagetest