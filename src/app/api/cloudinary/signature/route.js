import crypto from "crypto";

export async function GET() {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "packages";

  // Parameters must be sorted alphabetically
  const stringToSign = `folder=${folder}&timestamp=${timestamp}`;

  const signature = crypto
    .createHash("sha1")
    .update(stringToSign + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  return Response.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    timestamp,
    signature,
  });
}
