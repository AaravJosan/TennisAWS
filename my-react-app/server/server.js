import express from "express";
import cors from "cors";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
const PORT = 3000;

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.get("/generate-upload-url", async (req, res) => {
  try {
    const fileName = req.query.fileName;
    const command = new PutObjectCommand({
      Bucket: "user-uploaded-videos1",
      Key: `uploads/${fileName}`,
      ContentType: "video/mp4",
    });

    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 3600 });
    res.json({ uploadURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
