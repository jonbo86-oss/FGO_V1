const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

const sectorImages = {
  Souvenirs: img('photo-1528283648649-33347faa5d9b'),
  Ferretería: img('photo-1504148455328-c376907d081c'),
  Dulces: img('photo-1582058091505-f87a2e55a40f'),
  Cultura: img('photo-1512820790803-83ca734da794'),
  Moda: img('photo-1445205170230-053b83016050'),
  Gourmet: img('photo-1542838132-92c53300491e'),
  Tecnología: img('photo-1516321318423-f06f85e504b3'),
  Belleza: img('photo-1596462502278-27bfdc403348'),
  Deporte: img('photo-1517649763962-0c623066013b'),
  Mascotas: img('photo-1601758228041-f3b2795255f1'),
  Ocio: img('photo-1500530855697-b586d89ba3ee'),
  Flores: img('photo-1490750967868-88aa4486c946'),
  Bicicletas: img('photo-1485965120184-e220f721d03e'),
  Juguetes: img('photo-1558060370-d644479cb6f7'),
  Cafés: img('photo-1495474472287-4d71bcdd2085'),
  Papelería: img('photo-1455390582262-044cdead277a'),
  Calzado: img('photo-1542291026-7eec264c27ff'),
  Herbolario: img('photo-1514995669114-6081e934b693'),
  Mercería: img('photo-1452860606245-08befc0ff44b'),
  Óptica: img('photo-1574258495973-f010dfbb5371'),
  Fotografía: img('photo-1492691527719-9d1e07e534b4'),
  Cerámica: img('photo-1493106819501-66d381c466f1'),
  Regalos: img('photo-1513201099705-a9746e1e201f'),
  EcoMarket: img('photo-1542838132-92c53300491e'),
  Bienestar: img('photo-1540555700478-4be289fbecef')
}

const productImages = {
  Ferretería: sectorImages.Ferretería,
  Dulces: sectorImages.Dulces,
  Cultura: sectorImages.Cultura,
  Tecnología: sectorImages.Tecnología,
  Flores: sectorImages.Flores,
  Deporte: sectorImages.Deporte,
  Mascotas: sectorImages.Mascotas,
  Gourmet: sectorImages.Gourmet,
  Moda: sectorImages.Moda,
  Belleza: sectorImages.Belleza,
  Papelería: sectorImages.Papelería,
  default: sectorImages.Souvenirs
}

const rows = `Souvenirs La Rambla|Souvenirs|Barcelona|La Rambla, 45|Imán 3,50€;Taza 8,90€;Postal 1,50€;Bolsa 9,95€;Abanico 12,90€;Llavero 4,50€
Ferretería Ferran|Ferretería|Barcelona|La Rambla, 102|Pinzas 0,99€;Cinta 4,95€;Destornillador 5,50€
Gominolas Happy Ring|Dulces|Barcelona|La Rambla, 78|Anillo 0,35€;Mix 3,95€;Regaliz 1,50€;Nubes 2,20€;Lenguas 2,50€;Piruleta 1,20€;Moras 2,10€
Casa Beethoven|Cultura|Barcelona|La Rambla, 97|Partitura 12,90€;Cuaderno 6,95€;Libro 18,50€;Marcapáginas 2,50€
La Manual Alpargatera|Moda|Barcelona|La Rambla, 71|Alpargata 49€;Cuña 69€;Pañuelo 19,90€;Bolsa 14,90€;Plantillas 9,90€
Casa Gispert|Gourmet|Barcelona|La Rambla, 36|Almendra 7,80€;Café 6,90€;Chocolate 5,50€;Avellanas 8,20€;Pack 24,90€;Té 4,50€;Miel 7,20€
Vila Viniteca|Gourmet|Barcelona|La Rambla, 121|Aceite 14,90€;Queso 9,80€;Paté 6,50€
Llibreria Finestres|Cultura|Barcelona|La Rambla, 64|Novela 21,90€;Ensayo 19,50€;Libreta 8,95€;Agenda 16,90€;Poesía 14,90€;Infantil 13,50€
Norma Comics|Cultura|Barcelona|La Rambla, 88|Manga 8,95€;Cómic 24€;Figura 19,90€;Póster 7,50€;Merch 14,90€
TecnoBarri|Tecnología|Barcelona|La Rambla, 110|Cable 9,95€;Cargador 19,90€;Soporte 12,50€;Powerbank 24,90€;Auriculares 29,90€;Ratón 16,95€;Teclado 29,90€;Hub 22€
Bits del Raval|Tecnología|Barcelona|La Rambla, 52|Auriculares 14,90€;Ratón 16,95€;HDMI 11,90€
Colmado Quílez|Gourmet|Barcelona|La Rambla, 95|Mermelada 5,95€;Aceitunas 4,50€;Galletas 6,90€;Vermut 8,95€;Pack 22,90€
Ferretería del Born|Ferretería|Barcelona|La Rambla, 134|Cinta 2,20€;Llave 9,95€;Guantes 4,50€;Bridas 1,95€;Cola 5,80€;Linterna 8,90€
Candy Barcelona|Dulces|Barcelona|La Rambla, 29|Moras 2,50€;Piruleta 1,20€;Bolsa 4,50€
Souvenirs Catalunya|Souvenirs|Barcelona|La Rambla, 56|Imán 3,95€;Taza 8,90€;Abanico 12,90€;Postal 5€;Camiseta 14,90€;Llavero 4,50€
Cosmètica del Gòtic|Belleza|Barcelona|La Rambla, 83|Crema 8,95€;Bálsamo 4,50€;Jabón 5,90€;Pack 29,90€;Aceite 14,90€;Sérum 19,90€;Mascarilla 6,90€
Esport Canuda|Deporte|Barcelona|La Rambla, 118|Calcetines 9,95€;Bidón 14,90€;Cinta 6,50€;Pelotas 7,95€
Mascotes Glòries|Mascotas|Barcelona|La Rambla, 67|Snack 3,95€;Juguete 7,50€;Champú 9,90€;Correa 12,90€;Arena 8,95€;Comedero 6,90€
Experiències Gràcia|Ocio|Barcelona|La Rambla, 140|Taller 29€;Ruta 14€;Cata 22€;Escape 18€;Actividad 25€
Floristería Eixample|Flores|Barcelona|La Rambla, 22|Ramo 18€;Planta 12,90€;Rosa 4,50€;Maceta 9,95€;Centro 29€
Rocambolesc Girona|Dulces|Girona|Carrer Santa Clara, 50|Helado 4,50€;Caramelo 3,20€;Topping 1,50€;Pack 12,90€;Chocolate 5,50€
Llibreria 22|Cultura|Girona|Carrer Hortes, 22|Novela 10,95€;Infantil 14,90€;Cuaderno 7,95€
Mercat Central Tarragona|Gourmet|Tarragona|Plaça Corsini, 1|Aceite 11,90€;Avellanas 6,95€;Conserva 8,50€;Miel 7,20€;Pack 27,90€;Embutido 9,80€
La Fatal|Cultura|Lleida|Carrer Vallcalent, 65|Ensayo 16,90€;Poesía 13,50€;Agenda 12,90€;Lámina 9,95€;Revista 6,50€
Papereria Sabadell|Papelería|Sabadell|Carrer de Gràcia, 12|Bolígrafo 3,95€;Libreta 5,50€;Carpeta 4,20€
Ferretería Terrassa|Ferretería|Terrassa|Carrer Major, 88|Alcayatas 2,90€;Pilas 4,50€;Llave Allen 3,20€;Metro 6,95€;Linterna 8,90€
Mercat Collblanc|Gourmet|Hospitalet|Carrer Occident, 12|Café 7,50€;Queso 4,90€;Fuet 5,95€;Pan 3,20€
Taller Màgic Badalona|Ocio|Badalona|Carrer del Mar, 34|Taller 12€;Kit 9,95€;Clase 25€;Entrada 15€;Show 20€
Mercat Mataró|Gourmet|Mataró|Plaça Cuba, 47|Miel 6,90€;Aceite 10,95€;Galletas 5,50€
Gominoles Reus|Dulces|Reus|Carrer Monterols, 15|Mix 3,50€;Anillo 0,35€;Moras 2,20€;Pack 14,90€;Piruletas 1€
Souvenir Sitges|Souvenirs|Sitges|Carrer del Pecat, 8|Pulsera 5,95€;Imán 3,50€;Toalla 18,90€;Postal 1,50€;Bolsa playa 14,90€
Bicis Poblenou|Bicicletas|Barcelona|Carrer Pere IV, 210|Cámara 6,95€;Luces 14,90€;Timbre 7,50€;Casco 39,90€;Candado 19,90€;Bidón 9,90€;Kit reparación 12,90€
Joguines Sant Antoni|Juguetes|Barcelona|Comte Borrell, 45|Puzzle 12,90€;Peluche 9,95€;Cartas 8,50€;Peonza 4,95€
Cafès del Clot|Cafés|Barcelona|Carrer del Clot, 92|Café 8,90€;Filtro 3,50€;Taza 7,95€
Papereria Les Corts|Papelería|Barcelona|Travessera Corts, 198|Bloc 3,20€;Bolígrafos 4,95€;Subrayadores 5,50€;Archivador 3,95€;Corrector 2,80€;Agenda 12,95€
Sabateria Sarrià|Calzado|Barcelona|Major Sarrià, 76|Plantillas 9,95€;Cordones 3,50€;Crema 5,90€;Cepillo 6,95€;Calzador 4,50€
Herbolari Horta|Herbolario|Barcelona|Carrer Horta, 61|Infusión 4,95€;Aceite 8,90€;Jabón 5,50€;Crema 9,95€
Merceria Sants|Mercería|Barcelona|Carrer de Sants, 133|Hilo 2,20€;Botones 1,95€;Cremallera 3,50€;Agujas 2,80€
Òptica Marina|Óptica|Barcelona|Pg. Maragall, 120|Gamuza 2,50€;Spray 5,95€;Funda 6,90€;Cordón 4,50€;Kit limpieza 9,90€
Foto Gràcia|Fotografía|Barcelona|Gran de Gràcia, 145|Revelado 4,90€;Marco 6,50€;Álbum 12,90€;SD 9,95€;Impresión 10€
Ceràmica Vic|Cerámica|Vic|Carrer Riera, 9|Taza 14,90€;Plato 22€;Cuenco 16,50€;Posavasos 9,95€
Esports Manresa|Deporte|Manresa|Pg. Pere III, 55|Muñequera 5,95€;Grip 7,50€;Botella 9,90€;Pack pádel 18,90€;Toalla 12,90€
Dolços Figueres|Dulces|Figueres|Rambla, 23|Galletas 4,95€;Caramelos 3,20€;Chocolate 5,90€
Ferreteria Olot|Ferretería|Olot|Carrer Major, 17|Tornillos 2,95€;Cúter 4,50€;Brocha 3,20€;Silicona 6,95€
Llibres Vic|Cultura|Vic|Plaça Major, 12|Novela 19,90€;Infantil 13,95€;Libreta 6,90€;Marcapáginas 2€;Agenda 12€
Mascotes Girona Nord|Mascotas|Girona|Av. Jaume I, 30|Pelota 4,95€;Snack 3,50€;Comedero 8,90€;Collar 6,95€;Champú 9,90€
Regals Cambrils|Regalos|Cambrils|Pg. Miramar, 5|Imán 3,50€;Pulsera 4,90€;Taza 8,50€
EcoMarket Rubí|EcoMarket|Rubí|Carrer Maximí Fornés, 21|Pasta eco 3,95€;Miel 7,50€;Granola 5,90€;Pack 19,90€;Té 4,50€
Jocs Granollers|Juguetes|Granollers|Anselm Clavé, 44|Juego mesa 24,90€;Cartas 8,95€;Puzzle 15,90€;Plastilina 4,50€;Lego compatible 19,90€
Benestar Tarragona|Bienestar|Tarragona|Rambla Nova, 101|Sales 6,50€;Vela 9,95€;Masaje 32€;Pack relax 24,90€;Aceite 11,90€`

function parsePrice(raw) {
  const match = raw.match(/(.+)\s(\d+(?:,\d+)?)€$/)
  return {
    name: (match ? match[1] : raw).trim(),
    price: match ? Number(match[2].replace(',', '.')) : 0
  }
}

function productDescription(name, merchant) {
  if (name.toLowerCase().includes('pinza')) return 'Pack de pinzas pequeñas para hogar, taller o manualidades. Promoción destacada de la semana.'
  if (name.toLowerCase().includes('anillo')) return 'Anillo de caramelo individual, ideal para detalle rápido o compra impulsiva.'
  if (name.toLowerCase().includes('ramo')) return 'Ramo preparado en tienda con flores frescas de temporada.'
  if (name.toLowerCase().includes('novela') || name.toLowerCase().includes('libro')) return `Selección recomendada por ${merchant}, con recogida en tienda.`
  return `${name} seleccionado por ${merchant}. Disponible con recogida en tienda y compra online.`
}

function productImage(name, sector) {
  const n = name.toLowerCase()
  if (n.includes('pinza') || n.includes('cinta') || n.includes('destornillador') || n.includes('llave') || n.includes('tornillo') || n.includes('linterna')) return productImages.Ferretería
  if (n.includes('anillo') || n.includes('mix') || n.includes('regaliz') || n.includes('nube') || n.includes('piruleta') || n.includes('mora') || n.includes('caramelo')) return productImages.Dulces
  if (n.includes('ramo') || n.includes('rosa') || n.includes('planta') || n.includes('centro')) return productImages.Flores
  return productImages[sector] || productImages.default
}

export const merchants = rows.split('\n').map((line, index) => {
  const [name, sector, city, address, items] = line.split('|')
  const products = items.split(';').map((item, productIndex) => {
    const parsed = parsePrice(item)
    return {
      id: `${index}-${productIndex}`,
      name: parsed.name,
      price: parsed.price,
      description: productDescription(parsed.name, name),
      image: productImage(parsed.name, sector)
    }
  })

  const isBarcelona = city === 'Barcelona'
  return {
    id: `m-${index}`,
    name,
    sector,
    community: 'Cataluña',
    city,
    address,
    image: sectorImages[sector] || sectorImages.Gourmet,
    products,
    distance: isBarcelona ? Number((0.2 + index * 0.22).toFixed(1)) : 65 + index * 2,
    rating: Number((4.2 + (index % 8) / 10).toFixed(1)),
    reviews: 82 + index * 17,
    open: index % 5 !== 0,
    highlighted: index < 12 || index % 11 === 0,
    promo: index < 15 || index % 7 === 0,
    promoText: name.includes('Ferretería Ferran') ? 'Pinzas a 0,99€' : name.includes('Gominolas Happy') ? 'Anillo a 0,35€' : index % 2 ? 'Cupón FINBROADPEAK26' : 'Semana del comercio: -5%',
    hours: index % 4 === 0 ? '10:00 - 14:00 / 17:00 - 20:30' : '09:30 - 20:30',
    phone: `93 ${String(200 + index).padStart(3, '0')} ${String(400 + index).padStart(3, '0')}`,
    delivery: isBarcelona ? ['Recogida en tienda', 'Envío a domicilio'] : ['Recogida en tienda'],
    preparation: isBarcelona ? 'Listo en 2-4 h' : 'Listo en 24 h',
    description: `${name} es un comercio local de ${city} especializado en ${sector.toLowerCase()}, con compra online, recogida en tienda y ventajas faciliteaGO.`
  }
})

export const sectors = [...new Set(merchants.map((m) => m.sector))]
export const cities = [...new Set(merchants.map((m) => m.city))]
export const featured = merchants.filter((m) => m.highlighted)
export const promotions = merchants.filter((m) => m.promo)
export const barcelonaNearby = merchants.filter((m) => m.city === 'Barcelona').sort((a, b) => a.distance - b.distance)
export { sectorImages }
