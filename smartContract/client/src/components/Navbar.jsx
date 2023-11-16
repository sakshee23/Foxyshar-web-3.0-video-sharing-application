import React from 'react'

function Navbar() {
  return (
    <nav>
        <div className='position-absolute top-0 container-fluid d-flex justify-content-start p-4'>
            <div className='align-items-center d-flex '>
              <img src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOF92ZWN0b3JfbGluZV9hcnRfb2ZfYWJzdHJhY3Rfb3JhbmdlX2ZveF9fbWluaW1hbF82NjcwYWEwNy1mZTM5LTQzZWMtODUzYS0zZmExZTBiMDk5YWFfMS5wbmc.png" alt="" style={{ width: "180px" }} />
              <div className='d-flex flex-column'>
                <span className='fs-1 fw-bolder '>FoxyShare</span>
                <span className="text-secondary fw-bold ms-2">web3.0 video shareing app </span>
              </div>
            </div>

          </div>      
    </nav>
  )
}

export default Navbar
