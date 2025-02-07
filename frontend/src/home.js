import { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Clear from "@material-ui/icons/Clear";
import axios from "axios";
import "./home.css"; // Import CSS file

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (!image || !selectedFile) return;

    setIsLoading(true);
    let formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      let res = await axios.post(apiUrl, formData);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setIsLoading(false);
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) return;
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      clearData();
      return;
    }
    setSelectedFile(files[0]);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <div>
      <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Potato Disease Classification
          </Typography>
          <div className="grow" />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className="main-container">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Card className="image-card">
              {!image && !data && (
                <CardContent className="upload-message">
                  <Typography variant="h6">Upload an image to classify</Typography>
                </CardContent>
              )}
              {image && (
                <CardActionArea>
                  <CardMedia className="preview-image" image={preview} component="img" title="Uploaded Image" />
                </CardActionArea>
              )}
              {!image && (
                <CardContent>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText="Drag & Drop an image"
                    onDrop={onSelectFile}
                    className="dropzone"
                  />
                </CardContent>
              )}
              {data && (
                <CardContent>
                  <TableContainer component={Paper} className="table-container">
                    <Table size="small">
                      <TableHead>
                        <TableRow className="table-header">
                          <TableCell className="table-cell">Label</TableCell>
                          <TableCell align="right" className="table-cell">Confidence</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{data.class}</TableCell>
                          <TableCell align="right">{confidence}%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              {isLoading && (
                <CardContent className="loader-container">
                  <CircularProgress className="loader" />
                  <Typography variant="h6" className="loading-text">
                    Processing...
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
          {data && (
            <Grid item>
              <Button variant="contained" className="clear-button" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                Clear
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};
