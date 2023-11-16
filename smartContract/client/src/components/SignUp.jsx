import React, { useContext, useEffect, useState } from 'react'
import cyberbg from '../assets/cyberpunk-bg.gif'
import bg from "../assets/bg.gif"
import { ArrowForward } from "@mui/icons-material"
import "../App.css";
import { Link } from 'react-router-dom';
import ABI from './ABI.json';
import Web3 from "web3";




function SignUp() {
    const [connected, setConnected] = useState(true);


    const init = async () => {
        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            const contract = new web3.eth.Contract(
                ABI,
                '0xB1d239E7F125F80D5D0aa11b2c31db3784A5Ccf9'
            );
            setConnected(false);
            //   saveState({ web3: web3, contract: contract });

            const ownerAddr = await contract.methods.owner().call();
            //   setOwnerAddress(ownerAddr);
        } catch (error) {
            alert('Please Connect Metamask to experience Decentralized FoxyShare.');
            console.error(error);
        }
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

                    </div>
                    <div className='position-absolute top-0 p-5 mt-5 container-fluid d-flex justify-content-end'>
                        <a href="/profilesetup" className='text-light text-decoration-none m-3 gap-3 fw-bold fs-4 right-0 '>
                            <span>Set Up Your Profile</span> <ArrowForward />
                        </a>


                    </div>

                    <div className="loginWrapper d-flex justify-content-center align-items-center ">
                        <div className="loginLeft">
                            <h1 className='loginLogo fw-bold ' style={{ fontSize: "3.5rem" }}>Empower your digital security with <br /> <span className='text-light '>MetaMask Sign-Up</span> </h1>
                            <span className="loginDesc ">
                                Let's SetUp Your Metamask Account
                            </span>
                        </div>
                        <div className="loginRight  loginBox white-glassmorphism d-flex flex-column justify-content-start">
                            <div className='d-flex flex-column align-items-center bg-dark p-3 bg-opacity-75 rounded-5 '>

                                <img src="https://houseoffirst.com/images/misc/mm_twitch_no_matte.gif" style={{ width: "100px" }} className='img-fluid object-fit-cover' alt="" />
                                <h2 className='fw-bold text-center '>Getting SignUp with MetaMask
                                </h2>
                            </div>

                            <hr />
                            <div className='d-flex flex-column align-items-center justify-content-center container-fluid'>

                                <div className='d-flex flex-column fw-bold gap-4 mt-3 fs-5  '>

                                    <span >Step 1: <span className='ms-3'>Install MetaMask Extension</span></span>
                                    <span>Step 2: <span className="ms-3"> Set Up a Wallet</span> </span>
                                    <span>Step 3: <span className="ms-3">Connect to FoxyShare</span> </span>
                                    <div className='d-flex align-items-center gap-3 fw-bold font-monospace'>
                                        <span>Step 4:</span>
                                        <button onClick={init} className="btn btn-primary rounded-0 border-0 shadow fw-bold ">{connected ? 'Connect' : 'Connected'}</button>


                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default SignUp
