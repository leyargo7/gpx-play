
function CrearVideo() {
  return (
    <form className="flex flex-col justify-center">
        <label>
          Título:
          <input type="text" name="title" />
        </label>
        <label>
          Descripción:
          <input type="text" name="description" />
        </label>
        <label>
          URL:
          <input type="text" name="url" />
        </label>
        <label>
          Imagen:
          <input type="text" name="imageUrl" />
        </label>
        <label>
          Categoría:
          <input type="text" name="category" />
        </label>
        <button type="submit">Crear</button>
      </form>
  )
}

export default CrearVideo