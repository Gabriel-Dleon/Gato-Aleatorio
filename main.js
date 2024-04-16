const API_URL_RANDOM ='https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_zyKHSLe2MaxZQbNZWeLTPwyqhxZRvoqKH7tVl3nACHyWf7UMB4XeMRIRmZlMZF77';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites'
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'
const error_message = document.getElementById('Error')

async function loadrandomcats()
{
	const resultado = await fetch(API_URL_RANDOM);
	const data = await resultado.json();

	if (resultado.status !== 200)
	{
		error_message.innerHTML = "Error " + resultado.status + ":" + data.message;
	}else
	{
	const imagen1 = document.getElementById('img1');
	const imagen2 = document.getElementById('img2');
	const imagen3 = document.getElementById('img3');
	const boton1 = document.getElementById('boton1');
	const boton2 = document.getElementById('boton2');
	const boton3 = document.getElementById('boton3');
	imagen1.src = data[0].url;
	imagen2.src = data[1].url;
	imagen3.src = data[2].url;
	boton1.onclick = () => savefavourites(data[0].id);
	boton2.onclick = () => savefavourites(data[1].id);
	boton3.onclick = () => savefavourites(data[2].id);
	}
}

async function loadfavourites()
{
	const resultado = await fetch(API_URL_FAVOURITES,
	{
		method: 'GET',
		headers:
		{
			'X-API-KEY': 'live_zyKHSLe2MaxZQbNZWeLTPwyqhxZRvoqKH7tVl3nACHyWf7UMB4XeMRIRmZlMZF77'
		}
	}
	);
	const data = await resultado.json();
	if (resultado.status !== 200)
	{
		error_message.innerHTML = "Error " + resultado.status + ":" + data.message;
	}else
	{
		const section = document.getElementById('favoritos');
		section.innerHTML = "";
		const h2 = document.createElement('h2');
		const h2Text = document.createTextNode('Fotos favoritas');
		h2.appendChild(h2Text);
		section.appendChild(h2);
		data.forEach(gato =>
		{
			const article = document.createElement('article');
			const img = document.createElement('img');
			const button = document.createElement('button');
			const buttonText = document.createTextNode('Eliminar de favoritos');
			button.appendChild(buttonText);
			img.src = gato.image.url;
			button.onclick = () => deletefavourites(gato.id);
			article.appendChild(img);
			article.appendChild(button);
			section.appendChild(article);

			//	gato.image.url
		}
		)
	}	
}

async function savefavourites(id)
{
	const resultado = await fetch(API_URL_FAVOURITES,
	{
		method: 'POST',	
		headers: 
		{
			'Content-Type':'application/json',
			'X-API-KEY': 'live_zyKHSLe2MaxZQbNZWeLTPwyqhxZRvoqKH7tVl3nACHyWf7UMB4XeMRIRmZlMZF77'
		},
		body: JSON.stringify(
		{
			image_id: id
		}
		),
	}
	);

	const data = await resultado.json();

		if (resultado.status !== 200)
	{
		error_message.innerHTML = "Error " + resultado.status + ":" + data.message;
	}else
	{

	}	
	loadfavourites()
}

async function deletefavourites(id)
{
	const resultado = await fetch(API_URL_FAVOURITES_DELETE(id),
	{
		method: 'DELETE',
		headers:
		{
			'X-API-KEY': 'live_zyKHSLe2MaxZQbNZWeLTPwyqhxZRvoqKH7tVl3nACHyWf7UMB4XeMRIRmZlMZF77'
		}	
	}
	);
	if (resultado.status !== 200)
	{
		error_message.innerHTML = "Error " + resultado.status + ":" + data.message;
	}else
	{

	}
	loadfavourites()
}

async function uploadphoto()
{
	const form = document.getElementById('uploadingcat');
	const formData = new FormData(form);
	const resultado = await fetch(API_URL_UPLOAD,
	{
		method: 'POST',	
		headers: 
		{	
			//'Content-Type': 'multipart/form-data',	
			'X-API-KEY': 'live_zyKHSLe2MaxZQbNZWeLTPwyqhxZRvoqKH7tVl3nACHyWf7UMB4XeMRIRmZlMZF77',
		},
		body: formData,
	}
	);
	const data = await resultado.json();
	savefavourites(data.id);		
}
	
loadrandomcats();
loadfavourites();

//'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_zyKHSLe2MaxZQbNZWeLTPwyqhxZRvoqKH7tVl3nACHyWf7UMB4XeMRIRmZlMZF77';