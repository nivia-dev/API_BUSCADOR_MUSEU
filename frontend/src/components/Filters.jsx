function Filters({ selecionadaChaves, mudancaCheckbox, setBuscaTermo, ufs, setUfSelecionado, ufSelecionado, municipios, setMunicipioSelecionado, municipioSelecionado }) {
    const chavesDisponiveis = ['Nome do Museu', 'UF'];

    // Função para ordenar e colocar linhas vazias no final
    const ordenarLista = (lista) => {
        return lista.sort((a, b) => {
            if (!a) return 1;
            if (!b) return -1;
            return a.localeCompare(b);
        });
    };

    return (
        <div className='card'>
        <div className='card-body'>
            <h5 className='card-title'>Filtros</h5>

            {chavesDisponiveis.includes('Nome do Museu') && (
                <div>
                    <label className='form-check-label'>
                        <input
                            className='form-check-input'
                            type="checkbox"
                            checked={selecionadaChaves.includes('Nome do Museu')}
                            onChange={() => mudancaCheckbox('Nome do Museu')}
                        />
                        Nome do Museu
                    </label>
                    {selecionadaChaves.includes('Nome do Museu') && (
                        <div className='row mb-3 mt-2'>
                            <div className='col'>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder='Pesquisar...'
                                    onChange={e => setBuscaTermo(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {chavesDisponiveis.includes('UF') && (
                <div>
                    <label className='form-check-label'>
                        <input
                            className='form-check-input'
                            type="checkbox"
                            checked={selecionadaChaves.includes('UF')}
                            onChange={() => mudancaCheckbox('UF')}
                        />
                        UF
                    </label>
                    {selecionadaChaves.includes('UF') && (
                        <div>
                            <select
                                className='form-control mt-2'
                                value={ufSelecionado}
                                onChange={(e) => setUfSelecionado(e.target.value)}
                            >
                                <option value=''>Selecione o UF</option>
                                {ordenarLista(ufs).map(uf => (
                                    <option key={uf} value={uf}>{uf || 'Não especificado'}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            )}

            {selecionadaChaves.includes('UF') && ufSelecionado && (
                <div className='row mb-3 mt-2'>
                    <div className='col'>
                        <label>Município</label>
                        <select
                            className='form-control'
                            value={municipioSelecionado}
                            onChange={(e) => setMunicipioSelecionado(e.target.value)}
                        >
                            <option value=''>Selecione o Município</option>
                            {ordenarLista(municipios).map(municipio => (
                                <option key={municipio} value={municipio}>{municipio || 'Não especificado'}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    </div>
); 
}

export default Filters;