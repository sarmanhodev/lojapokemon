/*Código em JavaScript que usa um contador que retorna
os cards de Pokémon, sendo requisitados por seu respectivo Id.
Contém um contador que faz a requisição a API, uma função
para criar os cards e outra para gerar os cards*/
const poke_container = document.getElementById('poke_container');
const pokemons_number = 5000;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);
/*Contador que percore os Id dos Pokémon*/
const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};
/*Função que cria os cards com seus respectivos dados*/
function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	const abilities = pokemon.abilities.map(abilities => abilities.ability.name);
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	if(type !="fire"){return;}
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;
	/*HTML para exibição dos cards*/
	const pokeInnerHTML = ` <br>
<div class="flip-box">
	 <div class="flip-box-inner">
	
		 <div class="flip-box-front">
		        <small class="name"><strong>Type: </strong><span>${type.toUpperCase()}</span></small><br>
			 <div class="img-container">
				  <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
				  <span class="number">#ID ${pokemon.id
					.toString()
					.padStart(3, '0')}</span>
			   </div>
            
              <div class="info">
                 <br> <h3 class="name">${name} <br> <span class="number">R$${pokemon.id*3},00</span></h3>
			     <br>
			  </div>
		   </div>
		   
			
		       <div class="flip-box-back">
				 <h3 class="name"><strong>Habilidades:</strong> ${abilities}</h3>
		        </div>
	 </div>
 </div>
 <br>
 <br>
 
<button class="btn" onclick="add()"  type="submit">Adicionar ao Carrinho+</button><br>`;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemons();









