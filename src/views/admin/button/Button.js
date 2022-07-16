import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export function BasicButtons (props) {
  return (
    // <OverlayTrigger
    //   overlay={props.tooltip ?? <Tooltip>{props.tooltip}</Tooltip>}
    // >
      <Button variant={props.variant ?? "primary"} className="text-capitalize">
        {props.children}
      </Button>
    // </OverlayTrigger>
  );
};
