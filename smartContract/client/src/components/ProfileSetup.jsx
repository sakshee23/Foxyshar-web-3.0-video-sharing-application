import React, { useContext, useEffect, useState } from 'react'
import { storage } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import cyberbg from '../assets/cyberpunk-bg.gif'
import bg from "../assets/bg.gif"
import { ArrowForward } from "@mui/icons-material"
import "../App.css";

import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


function ProfileSetup({ state }) {


  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImgUrl] = useState('')
  const [account, setAccount] = useState('');

  const navigate = useNavigate();


  const handleSubmit =async (e) => {


    e.preventDefault();

    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${uuidv4()}-${imageUpload.name}`);

    setUploadingImage(true);

    Promise.all([
        uploadBytes(imageRef, imageUpload)
    ])
    .then(() => {
        return getDownloadURL(imageRef); // Remove Promise.all here
    })
    .then(async (imageDownloadURL) => { // Image URL is directly available here
        setImgUrl(imageDownloadURL);

        // Deploy on Blockchain
        console.log(imageDownloadURL); // Use imageDownloadURL here

        try {
            const { contract, web3 } = state;
            const accounts = await web3.eth.getAccounts();

            // Check if imageDownloadURL is set before calling the contract function
            if (imageDownloadURL) {
                contract.methods.setProfile(accounts[0], name, imageDownloadURL, about) // Use imageDownloadURL here
                    .send({ from: accounts[0] })
                    .then(() => {
                        alert("Successfully, Profile Setup on Blockchain!");
                        navigate('/foxyshare');
                    })
                    .catch((error) => {
                        alert("Transaction not successful!");
                        console.error(error);
                    });
            } else {
                alert("Missing image URL.");
            }
        } catch (error) {
            alert("Blockchain interaction failed!");
            console.error(error);
        }
    })
    .catch((error) => {
        console.error('Error during upload:', error);
    })
    .finally(() => {
        setUploadingImage(false);
    });
}





  return (
    <>
      <div className='login vh-100' style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundRepeat: "none", backgroundSize: "cover" }}>


        <div className='login w-100 h-100 blue-glassmorphism '>
          <div className='position-absolute top-0 container-fluid d-flex justify-content-start p-5'>
            <div className='align-items-center d-flex '>
              <img src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOF92ZWN0b3JfbGluZV9hcnRfb2ZfYWJzdHJhY3Rfb3JhbmdlX2ZveF9fbWluaW1hbF82NjcwYWEwNy1mZTM5LTQzZWMtODUzYS0zZmExZTBiMDk5YWFfMS5wbmc.png" alt="" style={{ width: "180px" }} />
              <div className='d-flex flex-column'>
                <span className='fs-1 fw-bolder '>FoxyShare</span>
                <span className="text-secondary fw-bold ms-2">web3.0 video shareing app </span>
              </div>
            </div>
            <div className='position-absolute top-0 p-5 pe-5 mt-1 me-5  container-fluid d-flex justify-content-end'>
              <a href="/foxyshare" className='text-light text-decoration-none m-3 gap-3 fw-bold fs-4 right-0 '><span>
                Alredy Have Profile
              </span> <ArrowForward />   </a>

            </div>

          </div>

          <div className="loginWrapper d-flex justify-content-center align-items-center ">
            <div className="loginLeft">
              <h1 className='loginLogo fw-bold text-warning' style={{ fontSize: "3.5rem" }}>FoxyShare <br /> <span className='text-light'>Unleashing the Video Shareing Revolution.</span>  </h1>
              <span className="loginDesc ">
                Let's SetUp Your Profile
              </span>
            </div>
            <div className="loginRight  loginBox white-glassmorphism d-flex flex-column justify-content-start">
              <div className='d-flex flex-column align-items-center bg-dark p-3 bg-opacity-75 rounded-5 '>

                <img src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOF92ZWN0b3JfbGluZV9hcnRfb2ZfYWJzdHJhY3Rfb3JhbmdlX2ZveF9fbWluaW1hbF82NjcwYWEwNy1mZTM5LTQzZWMtODUzYS0zZmExZTBiMDk5YWFfMS5wbmc.png" style={{ width: "100px" }} className='img-fluid object-fit-cover' alt="" />
                <h2 className='fw-bold text-center '>Setup Your Profile
                </h2>
              </div>

              <hr />
              <div className='d-flex flex-column justify-content-center container-fluid'>

                <div className='d-flex flex-column fw-bold gap-4 mt-3 fs-5  '>


                  <form className='p-3 ' onSubmit={handleSubmit} >
                    <div className='fw-medium d-flex flex-column gap-2 m-2'>
                      <span className=''>Upload Profile Image</span>
                      <input type="file" accept="image/*" className='form-control white-glassmorphism bg-light bg-opacity-25 text-light ' onChange={(e) => setImageUpload(e.target.files[0])} required />
                    </div>
                    <input type="text" placeholder='Enter Username' className='p-3 form-control m-2 mt-3 white-glassmorphism bg-light bg-opacity-25 text-light border-0 fs-5'
                      onChange={(e) => setName(e.target.value)}
                      required />
                    <textarea name="" className='mt-3 m-2 form-control bg-light bg-opacity-25 white-glassmorphism text-light pb-5 fs-5' placeholder='Tell me something about yourself ....' onChange={(e) => setAbout(e.target.value)} required></textarea>

                    <button ype="submit" className='btn  rounded-5 w-100 m-3 bg-opacity-50  fs-4 fw-bold shadow-lg text-light shadow mt-4' style={{ backgroundColor: "darkorange" }} >
                      {uploadingImage ? <CircularProgress style={{ fontSize: "0.8rem" }} /> : 'Lets Start'}
                    </button>
                  </form>


                </div>

              </div>
            </div>


          </div>
        </div>
      </div>

    </>
  )
}

export default ProfileSetup
