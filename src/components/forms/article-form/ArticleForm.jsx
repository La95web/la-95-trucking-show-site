import { useState } from 'react';
import create from '../../../scripts/api/create';
import update from '../../../scripts/api/update';

const ArticleForm = ({ article = null, onCancel = null }) => {
    const [formState, setFormState] = useState(article ? {
      title: article.title,
      uploaded_at: article.uploaded_at,
      type: article.type,
    } : {
      title: '',
      uploaded_at: '',
      type: 'News',
    });
  
    const handleDataChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.value });
    const handleFileChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.files[0] });
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = new FormData();
  
      formData.append('article[title]', formState.title);
      formData.append('article[uploaded_at]', formState.uploaded_at);
      formData.append('article[type]', formState.type);
      if (formState.main_image) formData.append('article[mail_image]', formState.image);
      if (formState.thumbnail) formData.append('article[thumbnail]', formState.thumbnail);
  
      if (article && onCancel) update(`articles/${article.id}/`, formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
  
      else create('articles/', formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:<br />
        <input type="text" name="title" value={formState.title} onChange={handleDataChange} /><br />
      </label>
      <label>
        Uploaded At:<br />
        <input type="date" name="uploaded_at" value={formState.uploaded_at} onChange={handleDataChange} /><br />
      </label>
      <label>
        Type:<br />
        <select name="type" value={formState.type} onChange={handleDataChange}>
          <option value="News">News</option>
          <option value="Tip">Tip</option>
        </select>
      </label>
      <label>
        Main Image:<br />
        <input type="file" name="main_image" onChange={handleFileChange} /><br />
      </label>
      <label>
        Thumbnail:<br />
        <input type="file" name="thumbnail" onChange={handleFileChange} /><br />
      </label>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ArticleForm;
