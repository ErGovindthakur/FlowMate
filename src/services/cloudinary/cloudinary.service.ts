import cloudinary from "@/lib/cloudinary";

export async function uploadPdfToCloudinary(
  pdfBuffer: Buffer,
  fileName: string
) {
  return new Promise<any>(
    (resolve, reject) => {

      const stream =
        cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "flowmate-reports",
            public_id: fileName,
            overwrite: true,
          },
          (error, result) => {

            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          }
        );

      stream.end(pdfBuffer);
    }
  );
}