import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: 'djcnezkmi', // CLOUDINARY_CLIENT_NAME
  api_key: '553554255653166',       // CLOUDINARY_CLIENT_API
  api_secret: '95V7ZiKJaXqzGr7CSLa7-8LtIO8' // CLOUDINARY_CLIENT_SECRET
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
