// import cloudinary from "@/lib/cloudinary";

// export async function uploadPdfToCloudinary(
//   pdfBuffer: Buffer,
//   fileName: string,
// ) {
//   return new Promise<any>((resolve, reject) => {
//     console.log("Cloudinary Config:", {
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

//       api_key: process.env.CLOUDINARY_API_KEY,

//       has_secret: !!process.env.CLOUDINARY_API_SECRET,
//     });
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: "raw",
//         folder: "flowmate-reports",
//         public_id: fileName,
//         overwrite: true,
//       },
//       (error, result) => {
//         if (error) {
//           console.error("CLOUDINARY ERROR:", JSON.stringify(error, null, 2));

//           reject(error);
//           return;
//         }

//         if (!result) {
//           reject(new Error("Cloudinary upload failed"));
//           return;
//         }

//         resolve(result);
//       },
//     );

//     stream.end(pdfBuffer);
//   });
// }


import cloudinary from "@/lib/cloudinary";

export async function uploadPdfToCloudinary(
  pdfBuffer: Buffer,
  fileName: string
) {
  console.log(
    "PDF Buffer Size:",
    pdfBuffer.length
  );

  return new Promise<any>((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "flowmate-reports",
          public_id: `${fileName}.pdf`,
          overwrite: true,
        },
        (error, result) => {
          console.log(
            "UPLOAD CALLBACK"
          );

          console.log(
            "ERROR:",
            error
          );

          console.log(
            "RESULT:",
            result
          );

          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );

    stream.end(pdfBuffer);
  });
}