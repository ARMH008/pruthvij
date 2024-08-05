/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function UploadWinners() {
  const [winnersImages, setWinnersImages] = useState([]);
  const [winnersNames, setWinnersNames] = useState(["", "", ""]); // Initialize state for winners names
  const [submitting, setSubmitting] = useState(false);
  const params = useParams();
  console.log("Params id", params.id);
  //const navigate = useNavigate();

  const handleWinnersImagesChange = (e, index) => {
    const { files } = e.target;
    const updatedImages = [...winnersImages];
    updatedImages[index] = files[0];
    setWinnersImages(updatedImages);
  };

  const handleWinnersNameChange = (e, index) => {
    const updatedNames = [...winnersNames];
    updatedNames[index] = e.target.value;
    setWinnersNames(updatedNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      winnersImages.forEach((image, index) => {
        formData.append("winnersimages", image);
        //formData.append("winnersNames", winnersNames[index]);
      });

      const response = await axios.patch(
        `http://localhost:5173/api/v1/events/${params.id}/winnerimages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data uploaded and stored in the database:", response.data);

      setWinnersImages([]);
      // setWinnersNames([]);

      //navigate(`/event/${params.id}`);
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
      <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm:py-3">
          <p className="font-medium">Upload Winners</p>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200">
          Cancel
        </button>
        <button
          className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700"
          onSubmit={handleSubmit}
        >
          Save
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">Winners Team Name</p>
              <input
                type="text"
                value={winnersNames[index]}
                onChange={(e) => handleWinnersNameChange(e, index)}
                placeholder="Winners Team Name"
                className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
              />
              {/* <input
      placeholder="Last Name"
      className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
    /> */}
            </div>

            <div className="flex flex-col gap-4 py-4  lg:flex-row">
              <div className="shrink-0 w-32  sm:py-4">
                <p className="mb-auto font-medium">Winners Image</p>
              </div>
              <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                <img
                  src="/images/ddHJYlQqOzyOKm4CSCY8o.png"
                  className="h-16 w-16 rounded-full"
                />
                <p className="text-sm text-gray-600">
                  Drop your desired image file here to start the upload
                </p>
                <input
                  type="file"
                  className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
                />
                {winnersImages[index] && (
                  <img
                    src={URL.createObjectURL(winnersImages[index])}
                    alt={`Winner ${index + 1}`}
                    //className={styles["image-preview"]}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        {/* <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="shrink-0 w-32 font-medium">Name</p>
          <input
            placeholder="First Name"
            className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
          />
          
        </div>
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="shrink-0 w-32 font-medium">Email</p>
          <input
            placeholder="your.email@domain.com"
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
        <div className="flex flex-col gap-4 py-4  lg:flex-row">
          <div className="shrink-0 w-32  sm:py-4">
            <p className="mb-auto font-medium">Avatar</p>
            <p className="text-sm text-gray-600">Change your avatar</p>
          </div>
          <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
            <img
              src="/images/ddHJYlQqOzyOKm4CSCY8o.png"
              className="h-16 w-16 rounded-full"
            />
            <p className="text-sm text-gray-600">
              Drop your desired image file here to start the upload
            </p>
            <input
              type="file"
              className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
            />
          </div>
        </div> */}

        <div className="flex justify-end py-4 sm:hidden">
          <Link to={`/event/${params.id}`}>
            <button className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">
              Cancel
            </button>
          </Link>
          <button
            className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadWinners;
