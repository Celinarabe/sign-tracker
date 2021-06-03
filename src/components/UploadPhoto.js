//component imports
import StyledDropzone from "./StyledDropzone"

//file imports
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
} from "@chakra-ui/react";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const UploadPhoto = (props) => {
  return (
    <div>
      <Modal
        scrollBehavior="inside"
        closeOnOverlayClick={false}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent top="10rem">
          <ModalHeader>Add Photos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted>
              <TabList>
                <Tab>Upload Photo</Tab>
                <Tab>Take a Photo</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <StyledDropzone storage={props.storage} database={props.database}/>
                </TabPanel>

                <TabPanel>
                  <p>Download our app to take pictures &#128516;</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UploadPhoto;
