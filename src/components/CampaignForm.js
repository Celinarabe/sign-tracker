import React, { useState } from "react";
import { Campaign } from "../models/campaign";
import { useForm } from "react-hook-form"; //delete?
import { Formik } from "formik";
import { Input } from "@chakra-ui/react";

import {
  Modal,
  Button
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const CampaignForm = (props) => {
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);

  const successMsg = "Success! New Campaign Created.";
  const errorMsg = "Uh oh! There was an issue creating the campaign :(";

  //form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //updating input box and saving it back to state
  const handleTitleInputChange = (event) => {
    setTitle(
      event.target.value //adding new value
    );
  };

  //on submit
  const onSubmit = async (e) => {
    let newCamp = new Campaign(null, title, []);
    const status = await props.database.writeCampaign(newCamp);
    setSaveSuccessful(status);
    setSubmitted(true);
    if (status) {
      setTimeout(() => {
        setTitle("");
        setSubmitted(false);
        setSaveSuccessful(false);
      }, 5000);
    }
  };

  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new map</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="first-name" isRequired>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

//     <div>
//       <h2>Create New Campaign</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           {...register("title", { required: true })}
//           id="title"
//           type="text"
//           placeholder="Campaign Title"
//           name="title"
//           value={title}
//           onChange={handleTitleInputChange}
//         />
//         {errors.title && <p>Title is required.</p>}
//         <button type="submit">Create Campaign</button>
//       </form>
//       {submitted ? <div> {saveSuccessful ? successMsg : errorMsg}</div> : null}
//     </div>
//   );
// };

export default CampaignForm;
