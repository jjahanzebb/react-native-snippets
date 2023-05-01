
### Config File
> File Path: project/src/utils/config.js

```javascript
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  // To be replaced with your own Firebase config
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

  firebase.firestore().settings({
    experimentalForceLongPolling: true,
    merge: true,
  });
}

export { firebase };
```

Make sure to replace the placeholder values in the `firebaseConfig` object with your own Firebase configuration values.

---

### Data File
> File Path: project/src/screens/DataScreen.js

```javascript
import { firebase } from "../utils/config";

const db = firebase.firestore();
```
###### Fetch Data
```javascript
  useEffect(() => {
    const unsubscribe = db
      .collection("tablename")
      .orderBy("columnName")
      .onSnapshot((snapshot) => {
        const data = [];

        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setData(data);
      });

    return unsubscribe;
  }, []);
```
###### Delete Data
```javascript
  const handleDelete = (item) => {
    Alert.alert(
      "Delete Archer",
      "Do you want to delete: " + item.columnName + "?",
      [
        {
          text: "Yes",
          onPress: () => {
            db.collection("tablename")
              .doc(item.id)
              .delete()
              .then(() => {
                console.log("Deleted Successfully!");
              })
              .catch((error) => {
                alert(error);
              });
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };
```
###### Add/Update Data
```javascript
  // Handle the add/update button press
  const handleAddUpdate = () => {
    if (updateItem) {
      db.collection("tableName")
        .doc(updateItem.id)
        .update({ columnName, points: parseFloat(points) });

      setUpdateItem(null);
      setButtonText("ADD");
    } else {
      const data = {
        columnName,
        points: parseFloat(data.points),
      };

      db.collection("tableName").add(data);
    }

    // Reset Data
    setName("");
    setPoints(0.0);
  };
```
