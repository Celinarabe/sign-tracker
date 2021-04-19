import { campaignConverter } from "../models/campaign";
import { signConverter } from "../models/sign";

class FirebaseDb {
  constructor(app) {
    this.db = app.firestore(); //getting db from the app object we pass in
  }

  //query firestore for campaign collection
  //async function returns a promise
  getCampaigns = async () => {
    const querySnapshot = await this.db //await: wait until this is done to move onto next line
      .collection("campaign")
      .withConverter(campaignConverter)
      .get();

    const campaigns = querySnapshot.docs.map((doc) => doc.data()); //array of campaign objects
    //loop through each campaign object, query sign collection, and set to campaign object
    for (const campaign of campaigns) {
      const signList = await this.getSigns(campaign.id);
      campaign.setSigns(signList);
    }

    return campaigns;
  };

  writeCampaign = (campaignObj) => {
    this.createCampaign(campaignObj)
      .then(() => true)
      .catch((err) => false);
  };

  //write new campaign to firestore
  createCampaign = async (campaignObj) => {
    //returns new doc
    return await this.db
      .collection("campaign")
      .withConverter(campaignConverter)
      .add(campaignObj);
  };

  //query firestore for sign subcollection based on campaignID
  getSigns = async (campaignID) => {
    const signList = await this.db
      .collection("campaign")
      .doc(campaignID)
      .collection("signs")
      .withConverter(signConverter)
      .get();
    return signList.docs.map((doc) => doc.data());
  };
}

export default FirebaseDb;
