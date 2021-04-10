
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