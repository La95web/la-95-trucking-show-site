import { useState } from 'react';
import create from '../../../scripts/api/create';
import update from '../../../scripts/api/update';

const ProductForm = ({ product = null, onCancel = null }) => {
  const [formState, setFormState] = useState(product ? {
    title: product.title,
    description: product.description,
    stripe_id: product.stripe_id,
    price: product.price / 100,
    featured: product.featured,
  } : {
    title: '',
    description: '',
    stripe_id: '',
    price: 0,
    featured: false,
  });

  const handleDataChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.value });
  const handleFileChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.files[0] });
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formState.price * 100);

    const formData = new FormData();

    formData.append('product[title]', formState.title);
    formData.append('product[description]', formState.description);
    formData.append('product[stripe_id]', formState.stripe_id);
    formData.append('product[price]', formState.price * 100);
    formState.featured ? 
      formData.append('product[featured]', 'true') :
      formData.append('product[featured]', 'false');
    if (formState.main_image) formData.append('product[main_image]', formState.main_image);
    if (formState.gallery) {
      for (let i = 0; i < formState.gallery.length; i++) {
        formData.append('product[gallery][]', formState.gallery[i]);
      }
    }

    if (product && onCancel) update(`products/${product.id}`, formData)
      .then(() => window.location.reload())
      .catch((error) => alert(error));

    else create('products/', formData)
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
        Description:<br />
        <textarea name="description" value={formState.description} onChange={handleDataChange} /><br />
      </label>
      <label>
        Stripe Id:<br />
        <input type="text" name="stripe_id" value={formState.stripe_id} onChange={handleDataChange} /><br />
      </label>
      <label>
        Price:<br />
        <input type="number" name="price" value={formState.price} onChange={handleDataChange} step="0.01" /><br />
      </label>
      <label>
        Main Image:<br />
        <input type="file" name="main_image" onChange={handleFileChange} /><br />
      </label>
      <label>
        Gallery:<br />
        <input
          type="file"
          multiple
          name="gallery"
          onChange={(event) => setFormState({ ...formState, [event.target.name]: event.target.files })}
        />
        <br />
      </label>
      <label>
        Destacado:<br />
        <input
          type="checkbox"
          name="featured"
          checked={formState.featured}
          onChange={(event) => setFormState({ ...formState, [event.target.name]: event.target.checked })}
        />
        <br />
      </label>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
