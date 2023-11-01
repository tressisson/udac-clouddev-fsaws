import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';



// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

//! END @TODO1
/*
  app.get("/filteredimage", async (req, res) => {
    const { image_url } = req.query;

    //validate that there was an image
    if (!image_url) {
      res.status(422).send("You didn't put an image in the url");
    }
    //send the image to the filterImageFromURL helper function
    const image_file = await filterImageFromURL(image_url);

    //return the file and code 200
    res.status(200).sendFile(image_file);
    //delete the file
    res.on('finish', () => deleteLocalFiles([image_file]));
  })
*/
/*
app.get("/filteredimage/", async (req, res) => {
  try {
    let { image_url } = req.query;
    //set impage_url mime type to jpeg
    image_url.set('Content-Type', 'image/jpeg');

    if (!image_url) {
      return res.status(400).send("No image url");
    }

    const path = await filterImageFromURL(image_url);
    if (path) {
      res.status(200).sendFile(path);
      res.on('finish', () => deleteLocalFiles([path]));
    }

  } catch {
    console.log(error);
    return res.status(500).send({ error: 'Unable to process your request' });
  }
});
*/
app.get("/filteredimage/", async (req, res) =>{
  try {
    let {image_url} = req.query;

    if(!image_url) {
      return res.status(400).send("Bad request!");
    }
    const path = await filterImageFromURL(image_url);
    res.sendFile(path);
    res.on('finish', () => deleteLocalFiles([path]));
  } catch {
    return res.status(500).send({error: 'Unable to process your request'});
  }
});

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}")
});


// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
