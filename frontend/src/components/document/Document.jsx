import React, { useState, useEffect } from "react";
import axios from "axios";

const Document = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleDocument = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/v1/document/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res)
    } catch (error) {
      console.log("Error lors de l'envoi du document", error)
    }
  };
  return (
    <div className="container document">
      <div className="mt-5 pt-1 pb-md-5">
        <h6 className="mt-4">
          Mon espace personnel {">"} Document {">"}
        </h6>
        <h1 className="my-3">Envoyer vous documents</h1>
        <div className="content">
          <div className="content_document">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
              posuere felis. Sed consectetur, justo vel dignissim scelerisque,
              mauris ligula semper ex, vel tincidunt neque velit ac justo. Sed
              efficitur, ipsum at condimentum ullamcorper, justo felis
              pellentesque felis, ac finibus neque nisi vel neque.
            </p>
            <div className="mt-5">
              <h3>Vous Document</h3>
              <form onSubmit={handleDocument} className="d-flex flex-column">
                <div className="input-group mt-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Titre de document"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    name="file"
                    accept="application/pdf || application/png || application/gif || application/jpg || application/jpeg"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupFile02"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-plus text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </label>
                </div>
                <h6>Informations pièces jointes</h6>
                <p className="w-50">
                  4 fichier(s) maximum. Taille maximale autorisée : 5 Mo par
                  fichier. Formats de fichiers acceptés : pdf, png, bmp, gif,
                  jpg, tif, tiff, jpeg. Pour réduire la taille de vos fichiers
                  images, pensez à les enregistrer au format .jpg.
                </p>
                <button
                  type="submit"
                  className={
                    file !== null && title !== "" ? 
                    "btn btn-primary mt-3 w-auto m-auto" : 
                    'btn btn-secondary mt-3 w-auto m-auto disabled'}
                >
                  Envoyer le document
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
