import { Router } from "express";
import { Capsule } from "../models/user.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";

const router = Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

router.route('/create').post(verifyJWT, upload.single("media"), async (req, res) => {
  try {
    let mediaUrl = "";

    // Upload file to S3 if user added media
    if (req.file) {
      const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}_${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }; 

      const command = new PutObjectCommand(s3Params);
      const data = await s3Client.send(command);
      console.log("File uploaded to S3:", data);
      mediaUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Params.Key}`;
      console.log("Media URL:", mediaUrl);
    }

    console.log("Media URL before saving capsule:", mediaUrl);
    // Create a new capsule
    const newCapsule = new Capsule({
      user: req.user.id,
      mediaUrl,
      ...req.body,
    });
      console.log("New Capsule:", newCapsule);
    await newCapsule.save();
    res.status(201).json(newCapsule);  
  } catch (error) {
    console.error("Error creating capsule:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}); 
router.route('/my-capsules').get(verifyJWT, async (req, res) => { 
  try {
    const capsules = await Capsule.find({ user: req.user.id });
    res.status(200).json(capsules);
  } catch (error) {
    console.error("Error fetching capsules:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});
router.get("/:id", verifyJWT, async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);
    if (!capsule) return res.status(404).json({ message: "Capsule not found" });

    res.json(capsule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching capsule", error });
  }
});

export default router;