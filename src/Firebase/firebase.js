import app from "firebase"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyBbfgHwmJk3zcUgWTw24IKXvCn5DPAv4Ak",
	authDomain: "sign-tracker-a5630.firebaseapp.com",
	projectId: "sign-tracker-a5630",
	storageBucket: "sign-tracker-a5630.appspot.com",
	messagingSenderId: "1067967058374",
	appId: "1:1067967058374:web:f1ed3f55e71c97ea6962c7",
	measurementId: "G-49WG407TDN"
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.app = app
	}
}

export default Firebase;


