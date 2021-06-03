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


  //TODO: get campaign based on user


  writeCampaign = async (campaignObj) => {
    try {
      await this.createCampaign(campaignObj);
      return true;
    } catch (error) {
      return false;
    }
  };


  //write new campaign to firestore
  createCampaign = async (campaignObj) => {
    //returns new doc
    return await this.db
      .collection("campaign")
      .doc("userId")
      .withConverter(campaignConverter)
      .set(campaignObj);
  };

  getCampaign = async (userId) => {
    return await this.db
      .collection("campaign")
      .where("owner", "equals", userId)
      .withConverter(campaignConverter)
      .get();
  }

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

  // upload sign function
  //write new sign to firestore
  createSign = async (signObj, campaignID) => {
    //returns new doc
    return await this.db
      .collection("campaign")
      .doc(campaignID)
      .collection("signs")
      .withConverter(signConverter)
      .add(signObj);
  };
}

export default FirebaseDb;
