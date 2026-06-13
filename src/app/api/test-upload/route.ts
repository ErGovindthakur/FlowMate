import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    const result = await cloudinary.uploader.upload(
      "data:text/plain;base64,SGVsbG8gV29ybGQ=",
      {
        resource_type: "raw",
        public_id: "test-file",
      }
    );

    return Response.json(result);
  } catch (error) {
    console.error(error);

    return Response.json(error);
  }
}