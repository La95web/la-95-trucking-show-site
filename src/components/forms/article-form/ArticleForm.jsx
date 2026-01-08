import { useState } from 'react';
import styles from './Articlesform.module.scss';
import create from '../../../scripts/api/create';
import update from '../../../scripts/api/update';

const ArticleForm = ({ article = null, onCancel = null }) => {
  const [formState, setFormState] = useState(article ? {
    title: article.title,
    titlevideo: article.titlevideo,
    description: article.description,
    content: article.content,
    uploaded_at: article.uploaded_at,
    type: article.type,
    language: article.language,
  } : {
    title: '',
    titlevideo: '',
    description: '',
    content: '',
    uploaded_at: '',
    type: 'News',
    language: 'spanish',
  });

  const handleDataChange = (event) =>
    setFormState({ ...formState, [event.target.name]: event.target.value });

  const handleFileChange = (event) =>
    setFormState({ ...formState, [event.target.name]: event.target.files[0] });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('article[title]', formState.title);
    formData.append('article[titlevideo]', formState.titlevideo);
    formData.append('article[description]', formState.description);
    formData.append('article[content]', formState.content);
    formData.append('article[uploaded_at]', formState.uploaded_at);
    formData.append('article[type]', formState.type);
    formData.append('article[language]', formState.language);

    if (formState.main_image) formData.append('article[main_image]', formState.main_image);
    if (formState.thumbnail) formData.append('article[thumbnail]', formState.thumbnail);
    if (formState.poster) formData.append('article[poster]', formState.poster);
    if (formState.video) formData.append('article[video]', formState.video);

    if (article && onCancel) {
      update(`articles/${article.id}/`, formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    } else {
      create('articles/', formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Title:<br />
        <input type="text" name="title" value={formState.title} onChange={handleDataChange} /><br />
      </label>

      <label>
        Contenido:<br />
        <textarea name="content" value={formState.content} onChange={handleDataChange} /><br />
      </label>

      <label>
        Uploaded At:<br />
        <input type="date" name="uploaded_at" value={formState.uploaded_at} onChange={handleDataChange} /><br />
      </label>

      <label>
        Type:<br />
        <select name="type" value={formState.type} onChange={handleDataChange}>
          <option value="News">News</option>
          <option value="Tip">TipsTrailers</option>
          <option value="Trailer">TipsTractors</option>
          <option value="Doctip">DocTips</option>
          <option value="Trailervideo">Trailervideo</option>
          <option value="Tractorvideo">Tractorvideo</option>
          <option value="Documentvideo">Documentvideo</option>
          <option value="Allnewvideo">Allnewvideo</option>
        </select>
        <br />
      </label>

      <label>
        Lenguaje:<br />
        <select name="language" value={formState.language} onChange={handleDataChange}>
          <option value="spanish">Spanish</option>
          <option value="english">English</option>
        </select>
        <br />
      </label>

      <label>
        Main Image:<br />
        <input type="file" name="main_image" onChange={handleFileChange} /><br />
      </label>

      <label>
        Thumbnail:<br />
        <input type="file" name="thumbnail" onChange={handleFileChange} /><br />
      </label>

      <h2>Upload video tips here</h2>
      <label>
        Title Video:<br />
        <input type="text" name="titlevideo" value={formState.titlevideo} onChange={handleDataChange} /><br />
      </label>

      <label>
        Description:<br />
        <textarea name="description" value={formState.description} onChange={handleDataChange} /><br />
      </label>

      <label>
        Video:<br />
        <input type="file" name="video" onChange={handleFileChange} /><br />
      </label>

      <label>
        Poster:<br />
        <input type="file" name="poster" onChange={handleFileChange} /><br />
      </label>

      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ArticleForm;

