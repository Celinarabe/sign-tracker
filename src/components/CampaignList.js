<<<<<<< HEAD
import React, { useState, useEffect } from "react";


const CampaignList = (props) => {

  const [campaigns, setCampaigns] = useState([]); //data state
  const [isLoading, setIsLoading] = useState(true); //loading state
=======
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CampaignList = (props) => {
  const [campaigns, setCampaigns] = useState([]); //data state
  const [isLoading, setIsLoading] = useState(true); //loading state
  const user = useContext(AuthContext);

>>>>>>> 58d83cbc68c00964bb82fd5b77e1c0df2550914e

  const displayCampaigns = (arr) => {
    return arr.map((campaign, idx) => {
      return (
        <li key={campaign.id}>
          <h1>{campaign.title}</h1>
          {campaign.signs.map((sign) => (
            <div key={sign.id}>
              <p>sign ID: {sign.id}</p>
              <img src={sign.image} alt="sign"></img>
<<<<<<< HEAD
              {/* <p>Posted? {sign.posted ? "yes" : "no"}</p> */}
=======
>>>>>>> 58d83cbc68c00964bb82fd5b77e1c0df2550914e
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
<<<<<<< HEAD
=======
      <h3>Welcome {user? user.email: "Guest"}</h3>
>>>>>>> 58d83cbc68c00964bb82fd5b77e1c0df2550914e
      {isLoading ? <p>Loading...</p> : <ul>{displayCampaigns(campaigns)}</ul>}
    </div>
  );
};

<<<<<<< HEAD
export default CampaignList;
=======
export default CampaignList;
>>>>>>> 58d83cbc68c00964bb82fd5b77e1c0df2550914e
