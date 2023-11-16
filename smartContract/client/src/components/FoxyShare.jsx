import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Card from './Card'
import { Add } from '@mui/icons-material'
import { CircularProgress, Grid } from '@mui/material'
import cyberbg from '../assets/cyberpunk-bg.gif'
import bg from "../assets/bg.gif"
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';


function FoxyShare({state}) {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUpload, setVideoUpload] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [tubes, setTubes] = useState([]);

  const [profileImg , setProfileImage] = useState('');
  const [name , setName] = useState('');

  

    const uploadVideoAndImage = async () => {
        if (videoUpload == null || imageUpload == null) return;

        const videoRef = ref(storage, `videos/${uuidv4()}-${videoUpload.name}`);
        const imageRef = ref(storage, `images/${uuidv4()}-${imageUpload.name}`);

        setUploadingVideo(true);
        setUploadingImage(true);

        Promise.all([
            uploadBytes(videoRef, videoUpload),
            uploadBytes(imageRef, imageUpload)
        ])
            .then(() => {
                return Promise.all([
                    getDownloadURL(videoRef),
                    getDownloadURL(imageRef)
                ]);
            })
            .then(async ([videoDownloadURL, imageDownloadURL]) => {
                setVideoUrl(videoDownloadURL);
                setThumbnail(imageDownloadURL);


                // Deploy on Blockchain
                try {
                    const { contract, web3 } = state;
                    const accounts = await web3.eth.getAccounts();

                    // Check if videoUrl and thumbnail are set before calling the contract function


                    if (videoDownloadURL && imageDownloadURL) {
                      contract.methods.addPost(name, title, profileImg, imageDownloadURL, videoDownloadURL, description)
                          .send({ from: accounts[0] })
                          .then(() => {
                              alert("Successfully, Share Video on Blockchain!");
                              window.location.reload();
                          })
                          .catch((error) => {
                              alert("Transaction not successful!");
                              console.error(error);
                          });
                  } else {
                      alert("Missing video URL or thumbnail URL.");
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
                setUploadingVideo(false);
                setUploadingImage(false);
            });
    };



    useEffect(() => {
      const { contract } = state;
      const tubes = async () => {
        
       
        const res = await contract.methods.getPosts().call();
       
        setTubes(res);
        console.log(res)
      }
      contract && tubes();
  }, [state]);

  useEffect(() => {
    if (state && state.web3) {
        const { contract, web3 } = state;

        const post = async () => {
            try {
                const accounts = await web3.eth.getAccounts();
                const res = await contract.methods.profiles(accounts[0]).call();
                setProfileImage(res.profileImg);
                setName(res.name);
                // console.log(res)
            } catch (error) {
                console.error("Error fetching profile:", error);
                // Handle the error, e.g., display an error message to the user
            }
        };

        post();
    }
}, [state]);


   




  return (
    <div className='' style={{   backgroundImage: `url(${bg})`, height:"100vh", backgroundPosition: "center", backgroundRepeat: "none", backgroundSize: "cover" }}>
      <div className='w-100 h-100 blue-glassmorphism'>

      <div className='  container-fluid d-flex justify-content-between pt-3 ps-4  pe-4'>
        <div className='align-items-center d-flex '>
          <img src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOF92ZWN0b3JfbGluZV9hcnRfb2ZfYWJzdHJhY3Rfb3JhbmdlX2ZveF9fbWluaW1hbF82NjcwYWEwNy1mZTM5LTQzZWMtODUzYS0zZmExZTBiMDk5YWFfMS5wbmc.png" alt="" style={{ width: "180px" }} />
          <div className='d-flex flex-column'>
            <span className='fs-1 fw-bolder text-light'>FoxyShare</span>
            <span className="text-secondary fw-bold ms-2">web3.0 video shareing app </span>
          </div>
        </div>
        <div className='p-4 mt-5 m-5 '>
          <Add className='fs-1 fw-bold bg-warning text-light rounded-5' style={{ cursor: "pointer" }}  data-bs-toggle="modal"data-bs-target="#exampleModal" />

          <div className="modal fade h-100 w-100" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog modal-dialog-centered modal h-100">
                            <div className=" white-glassmorphism d-flex w-100 " >
                                <div className="modal-content white-glassmorphism border-0 rounded-0  ">
                                    <div className='p-4' >

                                        <h4 className="pt-4 ps-5 text-light pe-5 font-monospace rounded-3 fw-bold text-center">
                                            Share Video Securely on the Blockchain
                                        </h4>
                                        <div className="p-4">
                                            <form action="">
                                                <input type="text" className="form-control rounded-2 p-2 shadow border-0 bg-white bg-opacity-50" placeholder="Video Title"
                                                      onChange={(e) => setTitle(e.target.value)} required/>
                                                <textarea className="form-control mt-3 bg-white bg-opacity-50 border-0 shadow" placeholder="Video Description ..."
                                                   onChange={(e) => setDescription(e.target.value)} 
                                                   required
                                                ></textarea>

                                                <div className="d-flex flex-column mt-4 gap-2">
                                                    <span className="fw-bold">
                                                        Upload Video
                                                    </span>
                                                    <input type="file" accept="video/*" className="form-control blue-glassmorphism" onChange={(e) => setVideoUpload(e.target.files[0])}  required/>
                                                </div>

                                                <div className="d-flex flex-column mt-4 gap-2">
                                                    <span className="fw-bold">
                                                        Upload Thumbnail
                                                    </span>
                                                    <input type="file" accept="image/*,.gif" className="form-control blue-glassmorphism" onChange={(e) => setImageUpload(e.target.files[0])} required />
                                                </div>
                                                <div className='text-center d-flex flex-column gap-3'>
                                                    <span className='mt-5'>
                                                    {uploadingVideo && "Uploading Video may take some time !"}
                                                    </span>
                                                    <span className='btn  shadow-lg font-monospace text-light bg-info fs-5 w-100 rounded-5 fw-bold  bg-opacity-25'
                                                        onClick={uploadVideoAndImage}
                                                    >
                                                         {uploadingVideo ? <CircularProgress className='text-warning' style={{ fontSize: "0.8rem" }} /> : 'Share video'}


                                                    </span>

                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                    
                                </div>
                                
                            </div>
                                    
                        </div>
                    </div>
        </div>

      </div>

      <div className='p-4 mt-5 h-75 overflow-y-scroll white-glassmorphism rounded-5'>
        <Grid container spacing={5}>
        {
                        tubes.slice().reverse().map((tube) => (
                            <Grid item xs={12} sm={6} md={3}>
                                <Card account={tube.account} name={tube.name} title={tube.title} description={tube.description} videoUrl={tube.videoUrl} profileImg={tube.profileImg} thumbnail={tube.thumbnail}  />
                            </Grid>
                        ))
          }
        </Grid>
      </div>
      </div>

    </div>
  )
}

export default FoxyShare
