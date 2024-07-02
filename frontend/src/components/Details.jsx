function Details({ item }) {
  return (
      <div className='card'>
          <div className='card-body'>
              <h5 className='card-title'>Detalhes do Registro</h5>
              {Object.keys(item).map(key => key !== 'id' && (
                  <p key={key} className='card-text'>
                      <strong>{key}:</strong> {item[key]}
                  </p>
              ))}
          </div>
      </div>
  );
}

export default Details;