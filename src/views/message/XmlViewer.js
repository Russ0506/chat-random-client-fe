import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';


const XmlViewer = (props) => {
    const [xmlState, setXmlState] = useState({});


    console.log(props);

    return (
        <>
            <Modal
                show={true}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default XmlViewer;