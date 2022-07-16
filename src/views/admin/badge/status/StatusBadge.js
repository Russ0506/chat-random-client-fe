import React from "react";
import { Badge, Button } from "react-bootstrap";
// const buttonVariants = [
//   "primary",
//   "secondary",
//   "success",
//   "danger",
//   "warning",
//   "info",
//   "light",
//   "dark",
// ];

export function StatusBadge(props) {
  return (
    <Button
      variant={
        props.outline === true ? "outline-" : "" + props.variant ?? "primary"
      }
      style={{margin: 0}}
      className="text-capitalize"
    >
      {props.children}
      <Badge variant={props.variant ?? "primary"} className="ml-1">
        {props.count ?? ""}
      </Badge>
    </Button>
  );
}
export function OutlineStatusBadge(props) {
  return (
    <Button
      variant={"outline-" + props.variant ?? "primary"}
      className="text-capitalize"
      style={{ margin: 0 }}
      disabled
    >
      {props.children}
      <Badge variant={props.variant ?? "primary"} className="ml-1">
        {props.count ?? ""}
      </Badge>
    </Button>
  );
}
export function NonOutlineStatusBadge(props) {
  return (
    <Button
      variant={"non-outline-" + props.variant ?? "primary"}
      className="text-capitalize"
      disabled
    >
      {props.children}
      <Badge variant={props.variant ?? "primary"} className="ml-1">
        {props.count ?? ""}
      </Badge>
    </Button>
  );
}
