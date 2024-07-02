function Results({ dadosFiltrados, cliqueItem, ufSelecionado }) {
    return (
        <ul className="list-group custom-list-group">
            {dadosFiltrados.map(item => (
                <li
                    key={item.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => cliqueItem(item)}
                >
                    {ufSelecionado && (
                        <span className="item-field">
                            {ufSelecionado}
                        </span>
                    )}
                    <span className='item-field'>{item['Nome do Museu'] || 'Não especificado'}</span>
                </li>
            ))}
        </ul>
    );
}

export default Results;