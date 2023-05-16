  
  ## Function To be called on Button
  ```javascript
  const generateQRCode = async (cardId) => {
    try {
      const qridRef = firebase.firestore().collection("constants").doc("qrid");
      const qridDoc = await qridRef.get();
      const currentId = qridDoc.data().id;
      const newId = currentId + 1;

      // Convert the SVG to an image (JPG format)
      const qrCodeImage = await QRCode.toDataURL(
        "https://www.example.com/details/" + cardId
      );

      // Create a unique filename for the image
      const filename = `qrCodes/${newId}-${cardId}.jpg`;

      // Upload the image to Firebase Storage
      const storageRef = storage.ref().child(filename);
      await storageRef.putString(qrCodeImage, "data_url", {
        contentType: "image/jpg",
      });

      // Get the download URL of the uploaded file
      const downloadURL = await storageRef.getDownloadURL();

      // Update the incremented value in Firebase
      await qridRef.update({ id: newId });

      // Create the document in the "qrcodes" collection

      await firebase.firestore().collection("qrcodes").doc(newId.toString()).set({
        vCardId: vCardId,
        imageURL: downloadURL,
      });

      await firebase.firestore()
        .collection("businesscards")
        .doc(cardId)
        .update({
          qrCodeId: parseInt(newId),
        });

      console.log("QR code generated and uploaded successfully.");
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };```
