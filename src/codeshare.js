//codeshare example
const db = new Firebase().app

class FirebaseDB {
	constructor(app) {
  	this.db = app.firestore();
  }
  
  
}

class SignCRUD {
	constructor(db) {
  	this.db = db;
  }
  
	const createSign = async (sign) => {
  	await this.db
      .collection("campaign")
      .doc("CAMPAIGN_ID")
      .collection("signs")
      .add(sign);
  }
  
  const getSigns = () => {
  	this.db.collection("campaigns").doc("campaign_id").collection("signs").get();
  }
  
}

const firebaseApp = new Firebase().app;
const firebaseDB = new FirebaseDB(firebaseApp);
const firebaseStorage = new FirebaseStorage(firebaseApp);

// component

const SignCreatorComponent = (props) => {
	
  const [sign, setSign] = useState({});
  
  const handleClick = () => {
  	props.firebaseDB.createSign(sign);
  }
  
}

class Campaign {
	constructor(title, owner) {
  	this.title = title
    this.owner = owner
  }
}

db.collection("campaign").add(new Campaign("President", "Gerard"));


this.db.collection("campaign").doc("DOC_ID").collection('signs').get()



handleUpload = (e) => {
  extractData(e.target.files).then(convertedFiles => {
    setFiles(convertedFiles);
  })
};

extractData = async (files) => {
  return files.map(file => {
    const {latitude, longitude } = await exifr.gps(file);
    const fileAsURL = URL.createObjectURL(file);
    return {latitude, longitude, file: fileAsURL};
  });
}

uploadSign(campaignId, img, progressCallback, onCompleteCallback, errorCallback) {
  const task = storage.ref().child("signs").child(campaignId).child(...).put(img)
  
  task.on("state_changed", 
  	(snapshot) => progressCallback(snapshot), 
    (error) => errorCallback(error), 
    () => onCompleteCallback(task));
}