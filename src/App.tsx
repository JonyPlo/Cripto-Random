import { useRandom } from './hooks/useRandom'
import './App.css'

export const App = () => {
  const query = useRandom()

  return (
    <div className='App App-header'>
      {/* Para useQuery, el isLoading solo se ejecta la primera vez cuando no
      tenemos ninguna data, asi que para casos en los que se realicen peticiones mas de una vez usaremos isFetching, que devuelve true si la peticion que se realizo todavía esta en proceso y cambia a false cuando ya se obtiene la respuesta */}
      {query.isFetching ? (
        <h2>Cargando...</h2>
      ) : (
        <h2>Numero aleatorio: {query.data}</h2>
      )}

      {!query.isLoading && query.isError && <h3>{`${query.error}`}</h3>}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? '...' : 'Nuevo Numero'}
      </button>
    </div>
  )
}
