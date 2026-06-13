import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    const result = await cloudinary.api.ping();

    return Response.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("PING ERROR", error);

    return Response.json({
      success: false,
      error,
    });
  }
}