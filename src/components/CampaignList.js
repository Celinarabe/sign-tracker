import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CampaignList = (props) => {
  const [campaigns, setCampaigns] = useState([]); //data state
  const [isLoading, setIsLoading] = useState(true); //loading state
  const user = useContext(AuthContext);


  const displayCampaigns = (arr) => {
    return arr.map((campaign, idx) => {
      return (
        <li key={campaign.id}>
          <h1>{campaign.title}</h1>
          {campaign.signs.map((sign) => (
            <div key={sign.id}>
              <p>sign ID: {sign.id}</p>
              <img src={sign.image} alt="sign"></img>
            </div>
          ))}
        </li>
      );
    });
  };
  //fetching campaigns
  useEffect(() => {
    //define async function
    const fetchCampaigns = async () => {
      setIsLoading(true); //trigger loading state
      console.log(user.uid)
      const camps = await props.database.getCampaignsUser(user.uid); //async function returns promise
      setCampaigns(camps); //resolve the promise by setting state to this response
      setIsLoading(false); //set loading state to false
    };
    fetchCampaigns(); //when the component mounts, run fetchCampaigns
  }, [user]);

  useEffect(() => {
    console.log(campaigns);
  }, [campaigns]);

  return (
    <div>
      <h3>Welcome {user? user.email: "Guest"}</h3>
      {isLoading ? <p>Loading...</p> : <ul>{displayCampaigns(campaigns)}</ul>}
    </div>
  );
};

export default CampaignList;
