import { useState } from "react"
import create from "../../../scripts/api/create";
import update from "../../../scripts/api/update";

const PodcastForm = ({ podcast = null, onCancel = null }) => {
  const [formState, setFormState] = useState(podcast ? {
    title: podcast.title,
    uploaded_at: podcast.uploaded_at,
    video_url: podcast.video_url,
  } : {
    title: '',
    uploaded_at: '',
    video_url: '',
  });

  const handleDataChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.value });
  const handleFileChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.files[0] });
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('podcast[title]', formState.title);
    if (formState.thumbnail) formData.append('podcast[thumbnail]', formState.thumbnail);
    formData.append('podcast[uploaded_at]', formState.uploaded_at);
    formData.append('podcast[video_url]', formState.video_url);

    if (podcast && onCancel) update(`podcasts/${podcast.id}/`, formData)
      .then(() => window.location.reload())
      .catch((error) => alert(error));

    else create('podcasts/', formData)
      .then(() => window.location.reload())
      .catch((error) => alert(error));
  } 

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:<br />
        <input type="text" name="title" value={formState.title} onChange={handleDataChange} /><br />
      </label>
      <label>
        Thumbnail:<br />
        <input type="file" name="thumbnail" onChange={handleFileChange} /><br />
      </label>
      <label>
        Uploaded At:<br />
        <input type="date" name="uploaded_at" value={formState.uploaded_at} onChange={handleDataChange} /><br />
      </label>
      <label>
        Video URL:<br />
        <input type="url" name="video_url" value={formState.video_url} onChange={handleDataChange} /><br />
      </label>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      <button type="submit">Subir</button>
    </form>
  );
};

export default PodcastForm;
