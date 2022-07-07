import { useState } from "react";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const useUpload = () => {
  const [progress, setProgress] = useState(0);
  const getURLfromUploadFile = async (file) => {
    if (!file) {
      return;
    }
    // File upload start
    const imageRef = ref(storage, `post-images/${file.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // file uploading progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // file upload failed
        toast.error(error.message);
      }
    );

    await uploadTask;
    let downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadUrl;
    // File upload end
  };
};

export default useUpload;
