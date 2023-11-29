import { useQuery } from '@tanstack/react-query'

const getRandomNumberFromApi = async (): Promise<number> => {
  const res = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
  )
  const numberString = await res.text()

  return +numberString
}

export const useRandom = () => {
  //useQuery de TanStack requiere un objeto como argumento, hay 2 propiedades importantes, la primer propiedad llamada queryKey es un arreglo, y es el que le va a indicar a useQuery como queremos que maneje nuestro cache, y la segunda propiedad se llama queryFn, es la funcion que vamos a utilizar para cargar la informacion en el arreglo, en otras palabras seria la funcion que realiza el fetch (Tener en cuenta que esta funcion SIEMPRE tiene que retornar un valor o un error), en este caso usaremos la funcion getRandomNumberFromApi que es la que estamos usando en esta app.
  // Tambien se puede agregar una tercer propiedad para que useQuery sepa que hacer en algunas situaciones especificas, como por ejemplo si hay algún error al intentar realizar la peticion, con la propiedad retry: 1 le indicamos que solo reintente la peticion una sola vez, si obtiene otro error entonces deja de intentarlo y muestra el error
  const query = useQuery({
    queryKey: ['randomNumber'],
    queryFn: getRandomNumberFromApi,
    retry: 1,
  })

  return query
}
