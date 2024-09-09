import express from 'express';
import { urlencoded, json } from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import documentsRouter from './routes/documents.js';
import workspaceRouter from './routes/workspaceRoute.js'
import multer from 'multer';
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 5000;

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/workspaceFiles'); // Set the upload destination folder for workspace files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filenames
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // Max file size: 5 MB
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(json()); // Parse JSON request bodies
app.use(urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Static file serving
app.use('/uploads', express.static('uploads'));

// Routes
app.get("/", (req, res) => {
  res.send("index"); // Serve the index route (replace with actual logic)
});

app.use('/users', userRouter); // Mount user routes
app.use('/documents', documentsRouter); // Mount document routes
app.use('/workspace', workspaceRouter);

// Handle profile image upload
app.post("/api/upload", upload.fields([{ name: "profileImage" }, { name: "coverImage" }]), (req, res, next) => {
  console.log(req.body); // Log request body data (optional)
  console.log(req.files); // Access uploaded files
  res.json({ message: "Upload successful!" }); // Send a basic success response (replace with detailed response)
}, (err, req, res, next) => {
  console.error(err);
  res.status(400).json({ message: 'Error uploading files' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!'); // Handle errors gracefully
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
