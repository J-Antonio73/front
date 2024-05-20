import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { QrModal } from "../../../Modals/QrModal";
import { distritosManzanillo } from "../../assets/distritos";
import "./Campain.css";

export function GenerateCampain({ setPanelType }) {
  const [campainMessage, setCampainMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [dist, setDist] = useState(0);
  const [distList, setDistList] = useState(distritosManzanillo);

  const handleDistChange = (e) => setDist(e.target.value);

  const submitCampain = async () => {
    // if (!campainMessage.trim().length > 0) {
      // setFormErrors({
        // campainMessage: "Ingrese el mensaje de la campaña",
      // });
      // return;
    // }

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => setBase64Image(reader.result);
      reader.readAsDataURL(selectedImage);
    }

    handleShow();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setCampainMessage(value);
    updateDisabled(value, selectedImage);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    updateDisabled(campainMessage, file);
  };

  const updateDisabled = (message, image) => {
    if (message.trim().length > 0 || image) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <div className="campain-container hv">
        <FormControl sx={{ width: 100 }}>
          <InputLabel id="demo-simple-select-label">
            Distrito
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dist}
            label="Distrito"
            onChange={handleDistChange}
          >
            {distList.map((dist) => (
              <MenuItem key={dist.id} value={dist.id}>
                {dist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <label
          htmlFor="fileInput"
          sx={{ marginTop: "1rem", display: "block" }}
        >
          Seleccione una imagen{" "}
          <small>
            <i>(opcional)</i>
          </small>
          :
          <input
            type="file"
            id="fileInput"
            name={selectedImage}
            onChange={(e) => {
              handleFileChange(e);
            }}
            accept="image/*, video/mp4"
            sx={{ display: "none" }}
          />
        </label>

        <TextField
          sx={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}
          id="outlined-multiline-flexible"
          label="Escriba su mensaje"
          multiline
          rows={7}
          value={campainMessage}
          error={isSubmit}
          helperText={formErrors.campainMessage}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <ColorButton
          sx={{ width: "auto", marginTop: "2rem" }}
          variant="text"
          disabled={disabled}
          onClick={submitCampain}
        >
          Generar campaña
        </ColorButton>
      </div>
      <QrModal
        campainMessage={campainMessage}
        selectedImage={base64Image}
        setIsSubmit={setIsSubmit}
        setFormErrors={setFormErrors}
        setCampainMessage={setCampainMessage}
        setSelectedImage={setSelectedImage}
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        setPanelType={setPanelType}
        dist={dist}
      />
    </>
  );
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[200]),
  backgroundColor: green[200],
  "&:hover": {
    backgroundColor: green[400],
  },
}));
