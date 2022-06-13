import Box from "@mui/material/Box";

export default function Loading(props) {
    let disPlayModal = props.show ? "" : "none";
    return <Box sx={{width: "300px", height: "100px", overflow: "unset", display: disPlayModal }} className="lds-ring"><Box></Box><Box></Box><Box></Box><Box></Box></Box> 
}