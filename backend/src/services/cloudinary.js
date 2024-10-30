import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'fs'


    // Configuration
    cloudinary.config({ 
        cloud_name: 'drzq2pqqn', 
        api_key: '364148855152787', 
        api_secret: 'CBFCJO4RC3ySOwE2YVWJiSRUpCo' // Click 'View API Keys' above to copy your API secret
    });

   export  const cloudinaryUpload = async (path, publicId, folder) =>{
        let uploadResult;
        try{
          // Upload an image
           uploadResult = await cloudinary.uploader
           .upload( path, {
                   publicId,
                   folder
               });
           unlinkSync(path)
        } catch(error) {
           unlinkSync(path)
             console.error("Upload error", error)
             return {error: "Upload failed", uploadResult: null}
         };
      
      
      // Optimize delivery by resizing and applying auto-format and auto-quality
      const optimizeUrl = cloudinary.url( uploadResult.publicId, {
          fetch_format: 'auto',
          quality: 'auto',
      });
      
      
      // Transform the image: auto-crop to square aspect_ratio
      const autoCropUrl = cloudinary.url( uploadResult.publicId, {
          crop: 'auto',
          gravity: 'auto',
          width: 500,
          height: 500,
      });

     
      
      return { optimizeUrl, autoCropUrl, uploadResult }   

    }  
    






//drzq2pqqn

//124451856161656

//Ap4OXXTf9z2V2sB3R5WkWiBPKHc




{/*

  //kn0RIW7F0lyykeEMtHXCG3OJvgs

  
import { unlinkSync } from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import apiResponse from 'quick-response'

// Configuration for cloudinary
cloudinary.config({ 
  cloud_name: 'drzq2pqqn', 
  api_key: '124451856161656', 
  api_secret: 'kn0RIW7F0lyykeEMtHXCG3OJvgs' // Click 'View API Keys' above to copy your API secret
});

export const cloudinaryUpload = async (filePath, public_id, folder) => {
  let uploadResult

  try {
    // Upload an image
    uploadResult = await cloudinary.uploader.upload(filePath, {
      public_id,
      folder,
    })

    unlinkSync(filePath)
    
  } catch (error) {
    unlinkSync(filePath)
    return res
      .status(400)
      .json(apiResponse(400, 'upload failed', { uploadResult: null }))
  }

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(uploadResult.public_id, {
    fetch_format: 'auto',
    quality: 'auto',
  })

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(uploadResult.public_id, {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  })

  return { uploadResult, optimizeUrl, autoCropUrl }
}

  
  
  import { unlinkSync } from 'fs'
  import { v2 as cloudinary } from 'cloudinary'
  import apiResponse from 'quick-response'
  
  // Configuration for cloudinary
  cloudinary.config({ 
    cloud_name: 'drzq2pqqn', 
    api_key: '124451856161656', 
    api_secret: 'kn0RIW7F0lyykeEMtHXCG3OJvgs' // Click 'View API Keys' above to copy your API secret
  });
  
  export const cloudinaryUpload = async (filePath, public_id, folder) => {
    let uploadResult
  
    try {
      // Upload an image
      uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id,
        folder,
      })
  
      unlinkSync(filePath)
      
    } catch (error) {
      unlinkSync(filePath)
      return res
        .status(400)
        .json(apiResponse(400, 'upload failed', { uploadResult: null }))
    }
  
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
    })
  
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(uploadResult.public_id, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    })
  
    return { uploadResult, optimizeUrl, autoCropUrl }
  }




  import { unlinkSync } from 'fs'
  import { v2 as cloudinary } from 'cloudinary'
  import apiResponse from 'quick-response'
  
  // Configuration for cloudinary
  cloudinary.config({ 
    cloud_name: 'drzq2pqqn', 
    api_key: '124451856161656', 
    api_secret: 'kn0RIW7F0lyykeEMtHXCG3OJvgs' // Click 'View API Keys' above to copy your API secret
  });
  
  export const cloudinaryUpload = async (filePath, public_id, folder) => {
    let uploadResult
  
    try {
      // Upload an image
      uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id,
        folder,
      })
  
      unlinkSync(filePath)
      
    } catch (error) {
      unlinkSync(filePath)
      return res
        .status(400)
        .json(apiResponse(400, 'upload failed', { uploadResult: null }))
    }
  
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
    })
  
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(uploadResult.public_id, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    })
  
    return { uploadResult, optimizeUrl, autoCropUrl }
  }














  import { unlinkSync } from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import apiResponse from 'quick-response'

// Configuration for cloudinary
cloudinary.config({
  cloud_name: 'dmysnb0x5',
  api_key: '765869978321679',
  api_secret: 'pzEJrCk1bR_V5gpKFWHsNAwl-i0',
})

export const cloudinaryUpload = async (filePath, public_id, folder) => {
  let uploadResult

  try {
    // Upload an image
    uploadResult = await cloudinary.uploader.upload(filePath, {
      public_id,
      folder,
    })

    unlinkSync(filePath)
    
  } catch (error) {
    unlinkSync(filePath)
    return res
      .status(400)
      .json(apiResponse(400, 'upload failed', { uploadResult: null }))
  }

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(uploadResult.public_id, {
    fetch_format: 'auto',
    quality: 'auto',
  })

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(uploadResult.public_id, {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  })

  return { uploadResult, optimizeUrl, autoCropUrl }
}







  import { v2 as cloudinary } from 'cloudinary';
  
      // Configuration
      cloudinary.config({ 
          cloud_name: 'drzq2pqqn', 
          api_key: '124451856161656', 
          api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
      });
      
      // Upload an image
       const uploadResult = await cloudinary.uploader
         .upload(
             'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
                 public_id: 'shoes',
             }
         )
         .catch((error) => {
             console.log(error);
         });
      
      console.log(uploadResult);
      
      // Optimize delivery by resizing and applying auto-format and auto-quality
      const optimizeUrl = cloudinary.url('shoes', {
          fetch_format: 'auto',
          quality: 'auto'
      });
      
      console.log(optimizeUrl);
      
      // Transform the image: auto-crop to square aspect_ratio
      const autoCropUrl = cloudinary.url('shoes', {
          crop: 'auto',
          gravity: 'auto',
          width: 500,
          height: 500,
      });
      
      console.log(autoCropUrl);    

*/}






