import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from '../components/Filters';
import Results from '../components/Results';
import Details from '../components/Details';


function Home() {
    const [buscaTermo, setBuscaTermo] = useState('');
    const [selecionadaChaves, setSelecionadaChaves] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [selecionadoItem, setSelecionadoItem] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [limite] = useState(20);
    const [ufs, setUfs] = useState([]);
    const [ufSelecionado, setUfSelecionado] = useState('');
    const [municipios, setMunicipios] = useState([]);
    const [municipioSelecionado, setMunicipioSelecionado] = useState('');
    
    useEffect(() => {
        if (selecionadaChaves.includes('UF')) {
            fetchUfs();
        }
    }, [selecionadaChaves]);

    useEffect(() => {
        if (buscaTermo) {
            fetchSearchData();
        } else {
            fetchData();
        }
    }, [pagina, ufSelecionado, municipioSelecionado, buscaTermo]);

    const fetchUfs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/ufs');
            setUfs(response.data);
        } catch (error) {
            console.error('Erro ao buscar UFs', error);
        }
    };

    const fetchMunicipios = async (uf) => {
        try {
            const response = await axios.get('http://localhost:5000/api/municipios', {
                params: { uf }
            });
            setMunicipios(response.data);
        } catch (error) {
            console.error('Erro ao buscar municípios', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/museus', {
                params: {
                    pagina,
                    limite,
                    uf: ufSelecionado || undefined,
                    municipio: municipioSelecionado || undefined
                }
            });
            setDadosFiltrados(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    };

    const fetchSearchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/pesquisa', {
                params: {
                    termo: buscaTermo
                }
            });
            setDadosFiltrados(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    };

    const mudancaCheckbox = (key) => {
        setSelecionadaChaves(prevKeys => {
            const newKeys = prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key];
            
            if (!newKeys.includes('UF')) {
                setUfSelecionado('');
                setMunicipioSelecionado('');
                setMunicipios([]);
            }
            if (!newKeys.includes('Nome do Museu')) {
                setBuscaTermo('');
            }
           
            
            return newKeys;
        });
    };

    const cliqueItem = (item) => {
        setSelecionadoItem(item);
    };

    const mudancaPagina = (novaPagina) => {
        if (novaPagina > 0) {
            setPagina(novaPagina);
        }
    };

    const mudancaUf = (uf) => {
        setUfSelecionado(uf);
        setMunicipioSelecionado('');
        if (uf) {
            fetchMunicipios(uf);
            fetchData();
        } else {
            setMunicipios([]);
        }
    };

    const algumFiltroSelecionado = selecionadaChaves.includes('Nome do Museu') || ufSelecionado;


    return (
        <div className={`container mt-4 ${algumFiltroSelecionado ? 'filtros-selecionados' : 'sem-filtros'}`}>
            <div className="background-image"></div>
            <h2>Museus Brasileiros</h2>
            <h4>Encontre um na sua cidade</h4>
            <div className='row custom-row'>
                <div className='col-md-4'>
                    <Filters
                        selecionadaChaves={selecionadaChaves}
                        mudancaCheckbox={mudancaCheckbox}
                        setBuscaTermo={setBuscaTermo}
                        ufs={ufs}
                        setUfSelecionado={mudancaUf}
                        ufSelecionado={ufSelecionado}
                        municipios={municipios}
                        setMunicipioSelecionado={setMunicipioSelecionado}
                        municipioSelecionado={municipioSelecionado}
                    />
                </div>
                <div className='col-md-8'>
                
                    <div>
                    {(selecionadaChaves.includes('Nome do Museu') || ufSelecionado) && (
                        <Results
                            dadosFiltrados={dadosFiltrados}
                            cliqueItem={cliqueItem}
                    />)}
                    </div>
                 
                   
                </div>
            
            
            </div>
            {(selecionadaChaves.includes('Nome do Museu') || ufSelecionado) && (
            <div className='mt-4 d-flex justify-content-center'>
                <button  onClick={() => mudancaPagina(pagina - 1)} disabled={pagina === 1}>
                    Página Anterior
                </button>
                <button  onClick={() => mudancaPagina(pagina + 1)}>
                    Próxima Página
                </button>
            </div>
            )}

            {selecionadoItem && (
                <div className='row mt-4'>
                    <div className='col'>
                        <Details item={selecionadoItem} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
