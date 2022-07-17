import { Box, Modal, Button } from "@mui/material"
import ReactCrop from "react-image-crop"

const CropImage = ({src, open, style, crop, onImageLoaded, onCropChange, handleClose, onCropComplete}) => {
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{maxHeight : "500px", display: "flex", justifyContent: "center", alignItems: "center"}}
        >
            <Box sx={style}>
                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={onImageLoaded}
                        onComplete={onCropComplete}
                        onChange={onCropChange}
                    />
                )}
                <Button sx={{ float: "right", pt: 4 }} onClick={handleClose}>
                    OK
                </Button>
            </Box>
        </Modal>
    )
}

export default CropImage;