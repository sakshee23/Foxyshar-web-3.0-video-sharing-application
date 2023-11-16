import React from 'react'
import cyberbg from '../assets/cyberpunk-bg.gif'
import bg from "../assets/bg.gif"
import { Facebook, Share, Twitter, WhatsApp, Window } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Video() {


  const storedName = localStorage.getItem("name");
  const storedAccount = localStorage.getItem("account");

  const storedTitle = localStorage.getItem("title");
  const storedDescription = localStorage.getItem("description");
  const storedVideoUrl = localStorage.getItem("videoUrl");
  const storedThumbnail = localStorage.getItem("thumbnail");
  const storedProfileImg = localStorage.getItem("profileImg");


  return (
    <div className='' style={{ backgroundImage: `url(${bg})`, height: "110vh", backgroundPosition: "center", backgroundRepeat: "none", backgroundSize: "cover" }}>
      <div className='w-100 h-100 blue-glassmorphism'>
        <div className='d-flex justify-content-between align-items-center pe-5 text-light'>
          <div className='align-items-center d-flex p-4'>
            <img src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOF92ZWN0b3JfbGluZV9hcnRfb2ZfYWJzdHJhY3Rfb3JhbmdlX2ZveF9fbWluaW1hbF82NjcwYWEwNy1mZTM5LTQzZWMtODUzYS0zZmExZTBiMDk5YWFfMS5wbmc.png" alt="" style={{ width: "180px" }} />
            <div className='d-flex flex-column'>
              <span className='fs-1 fw-bolder text-light'>FoxyShare</span>
              <span className="text-secondary fw-bold ms-2">web3.0 video shareing app </span>
            </div>
          </div>
          <Link to="/foxyshare" className='fs-1' >
            <Window className='fs-1 text-warning' style={{ cursor: "pointer" }} />
          </Link>
        </div>



        <div className='p-5'>

          <div className="row ">
            <div className="col-8">
              <div className=''>

                <video controls poster={storedThumbnail} className='w-100 bg-dark  rounded-4 shadow   ' style={{ height: "650px", border: "2px solid darkorange" }}>
                  <source src={storedVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="col-4 p-2 text-light">
              <div className='blue-glassmorphism w-100 p-3 rounded-3 h-100'>
                <div className="title fw-bold m-3 ">
                  <span className="fs-3 fw-bold ">{storedTitle}</span>

                </div>
                <hr />
                <div className=''>

                  <span className='text d-flex flex-column  gap-2 m-3'>
                    <h5 className='text-warning fw-bold'>From :</h5>
                    <div className='d-flex gap-3'>
                      <img src={storedProfileImg} alt="" className='object-fit-cover shadow ' style={{width:"64px" , height:"64px", borderRadius:"50%" , border:"3px solid white"}} />
                      <div className='d-flex flex-column justify-content-center '>

                      <span className='fw-bold'>

                        {storedName}
                      </span>
                      <span className='text-secondary '>
                        {storedAccount}
                      </span>
                      </div>

                    </div>
                  </span>
                </div>
                <hr />
                <h5 className='text-warning fw-bold'>Description :</h5>
                <div className="blue-glassmorphism  rounded-4 mt-3 overflow-y-scroll " style={{ height: "250px" }}>
                  <p className='fs-5 p-4 '>
                    {storedDescription}
                  </p>
                </div>

                <div className='d-flex gap-4 mt-4'>
                  <Share className='fs-1 me-3 text-primary' />
                  <WhatsApp className='fs-1' />
                  <Facebook className='fs-1' />
                  <Twitter className='fs-1' />
                </div>
              </div>
            </div>

          </div>



        </div>

      </div>
    </div>
  )
}

export default Video
