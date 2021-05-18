import React, { useState, useEffect } from "react";


const CampaignList = (props) => {

  const [campaigns, setCampaigns] = useState([]); //data state
  const [isLoading, setIsLoading] = useState(true); //loading state

  const displayCampaigns = (arr) => {
    return arr.map((campaign, idx) => {
      return (
        <li key={campaign.id}>
          <h1>{campaign.title}</h1>
          {campaign.signs.map((sign) => (
            <div key={sign.id}>
              <p>sign ID: {sign.id}</p>
              <img src={sign.image} alt="sign"></img>
              {/* <p>Posted? {sign.posted ? "yes" : "no"}</p> */}
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
      const camps = await props.database.getCampaigns(); //async function returns promise
      setCampaigns(camps); //resolve the promise by setting state to this response
      setIsLoading(false); //set loading state to false
    };
    fetchCampaigns(); //when the component mounts, run fetchCampaigns
  }, []);

  useEffect(() => {
    console.log(campaigns);
  }, [campaigns]);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <ul>{displayCampaigns(campaigns)}</ul>}
    </div>
  );
};

export default CampaignList;