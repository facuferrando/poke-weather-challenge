import { useEffect, useState } from 'react'
import './App.css';
function App() {
  const [city, setCity] = useState('Rosario');
  const [data, setData] = useState('');
  const [pokemonType, setPokemonType] = useState('');
  const [img, setImg] = useState('');
  const [pokemon, setPokemon] = useState('');

  function submitForm(event) {
    event.preventDefault();
    setCity(event.target.city.value)
    getWeather(event.target.city.value);

  }

  function searchPoke(type) {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(r => {
        const rand = Math.floor(Math.random() * r.pokemon.length);
        const poke = r.pokemon[rand].pokemon.name;
        setPokemon(poke);
        fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
          .then(res => res.json())
          .then(r => {
            setImg(r.sprites.front_default);

          })

      })
  }

  function getWeather(c) {
    if (!c) { c = city }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c}&units=standard&appid=YOUR_API_KEY`)
      .then(res => res.json())
      .then(r => {
        setData(r.main.temp - 273.15); // Convertion to Celcius degrees.
        if ((r.main.temp - 273.15) < 5) {
          setPokemonType("Ice");
          searchPoke("ice");
        }
        else if ((r.main.temp - 273.15) >= 5 && (r.main.temp - 273.15) < 12) {
          setPokemonType("Water");
          searchPoke("water");
        }
        else if ((r.main.temp - 273.15) >= 12 && (r.main.temp - 273.15) < 15) {
          setPokemonType("Grass");
          searchPoke("grass");
        }
        else if ((r.main.temp - 273.15) >= 15 && (r.main.temp - 273.15) < 21) {
          setPokemonType("Ground");
          searchPoke("ground");
        }
        else if ((r.main.temp - 273.15) >= 21 && (r.main.temp - 273.15) < 27) {
          setPokemonType("Bug");
          searchPoke("bug");
        }
        else if (r.main.temp - 273.15 >= 23 && r.main.temp - 273.15 <= 33) {
          setPokemonType("Rock");
          searchPoke("rock");
        }
        else if ((r.main.temp - 273.15) > 33) {
          setPokemonType("Fire");
          searchPoke("fire");
        }

      })

  }

  useEffect(() => {
    getWeather();
  }, [])
  return (
    <>
      <main className='flex flex-col justify-center items-center h-screen gap-10 p-10'>
        <div>
          <h1 className='text-5xl my-10'>Pokemon-Weather Challenge</h1>
          <h2>Welcome to the Pokemon-Weather Challenge by <strong>OnlineApp</strong>.</h2>
          <p>When typing a city in the input below, you'll see a Pokemon that better suits the weather in that region.</p>
        </div>
        <div className='flex flex-col lg:flex-row gap-5'>
          <form onSubmit={submitForm} >
            <div className='flex gap-4'>
              <input autoFocus type='text' name='city' className='border-2 border-blue-500 rounded-xl max-h-10' />
              <button className='border-2 border-blue-500 p-1 rounded-xl' type='submit'>¡Find me a Pokemon!</button>
            </div>
          </form>
          {city && <div><p>The weather in {city} is {Math.round(data).toFixed(2)}°C.</p>
            <p>The pokemon type is {pokemonType}.</p>
            <p>The pokemon is {pokemon}.</p>
            {img && <img width="180px" height="300px" src={img} className='aspect-square' />}
          </div>
          }
        </div>
        <p>By <a className="text-emerald-700" href='https://github.com/facuferrando' target="_blank">Facu</a></p>
      </main>
    </>
  )
}

export default App
