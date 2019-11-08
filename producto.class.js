	class Producto {
		//Constructor <- Vital: recibe los datos y fabrica el objeto. (Solo puede haber un solo constructor) ... Los parametros mas importantes van primero.
		constructor(id, n, s, p, i, d = true){//<-- En el caso de que disponible sea "undefined x el usuario" lo lee como un TRUE a menos que se especifique lo contrario.
		//Atributos
		this.ID = id
		this.nombre = n
		this.stock = s
		this.precio = p
		this.imagen = i
		this.vDOM = document.createElement("article") //<-- <article></artile>
		this.disponible = d
		this.state = {
			anexado : false, 
			version: 0
		}

	}

		//Propiedades L/E (Lectura y escritura o getters y setters)
		get Precio(){ //Mantiene la variable original intacta
			return "USD "+(this.precio * 1.21).toFixed(2) //<- toFixed(x) cantidad de decimlaes a mostrar
		}

		set Precio(value){
			if(isNaN(value) != true ){ //<- != no esta vacio, no es nulo o no esta definido
				this.precio = value
			}else {
				console.error("El valor del precio no puede ser texto")
			}
		}

		set Disponible(value){

			let accion = value ? "habilitar" : "deshabilitar"

			//if( confirm(`Desea ${accion} el producto "${this.nombre}"`) )
				this.disponible = value

			this.sincronizar()

		}

		//Metodos de Instancia -> Primero hay que instanciar un Producto (El .this en "producto.class.js indica que es el objeto que invoco el Mostrar()")
		Mostrar(selector){ //Ej: "#productos-destacados"
		
				/*let fondo = "bg-white"
				let texto = "text-dark"

				if (this.stock <= 0) {
					fondo = "bg-dark"
					texto = "text-light"
				}*/
				let estilo = this.disponible ? "bg-white text-dark" : "bg-secondary text-white"
				let botones = this.disponible ? "btn-danger" : "btn-success"

				//Manipulación de estructura:
				this.vDOM.classList.add("col-lg-4", "col-md-6", "mb-4", "producto")//<-- <article class="..."></artile>

				this.vDOM.id = `prod-${this.ID}`

				//Manipulación de contenido:
				this.vDOM.innerHTML = `<div class="card h-100 ${estilo}">
					<a href="#">
						<img class="card-img-top img-fluid" src="${this.imagen}" alt="${this.nombre}">
					</a>
					<div class="card-body">
						<h4 class="card-title">
							<a href="#"></a>${this.nombre}
						</h4>
						<button class="btn btn-warning m-0 btn-precio">${this.Precio}</button> 
						<button class="btn ${botones} btn-disponible">${this.disponible ?"Desactivar":"Habilitar" }</button>
						<button class="btn btn-primary btn-descuento my-1">Aplicar Descuento</button>
						<p class="card-text">${this.stock} unid.</p>
					</div>
				</div>`
				//Manipulación de comportamiento:
				this.vDOM.querySelector(".btn-precio").onclick = () => {
					this.Precio = prompt(`Por favor, indique cual es el nuevo valor del articulo ${this.nombre}`)
					this.Mostrar()
					this.sincronizar()
				}

				this.vDOM.querySelector(".btn-disponible").onclick = () => {
					this.Disponible = !this.disponible
					//this.Precio = prompt("Ingrese el nuevo precio:")
					//console.log(this)
					this.Mostrar()

				}

				this.vDOM.querySelector("img").onclick = () => {
					this.imagen = prompt("Ingrese la URL de una nueva imagen:")
					this.Mostrar()
					this.sincronizar()
				}

			this.vDOM.querySelector(".btn-descuento").onclick = this.aplicarDescuento.bind(this)

			//Anexarlo (Mostrarlo) en la interfaz:
			if(!this.state.anexado){
			document.querySelector(selector).appendChild(this.vDOM)
			this.state.anexado = true
			}

			//this.sincronizar()
		}

		aplicarDescuento(valor = null){

			valor = isNaN(valor) ?   prompt(`Indique el dcto. para ${this.nombre}`) : valor

			let importe = (this.precio * valor) / 100
			this.precio = this.precio - importe

			this.Mostrar()
			this.sincronizar()
		}

		sincronizar(){
			console.log(this.ID) // <- Ej: 7
			let storage = JSON.parse(localStorage.getItem("PRODUCTOS")) //<- JSON A object

			//let foundItem = storage.find(item =>/*return*/ item.idProducto == this.ID ) //muestra al objeto
			let foundIndex = storage.findIndex(item =>/*return*/ item.idProducto == this.ID ) //muestra posicion

			//storage[foundIndex]. //<-- Muestra el productos	

			storage[foundIndex].Precio = this.precio
			storage[foundIndex].Disponible = this.disponible
			storage[foundIndex].Imagen = this.imagen
			console.log()

			localStorage.setItem("PRODUCTOS", JSON.stringify(storage) ) //<-- Object a JSON

		}

		//Metodos de Clase ó Metodos estatáticos.
		static parse(json){ //
			//Acá hay que hacer magia para que se conviertan en objetos 'Producto'
			//let datos = json//<- De JSON a Object

			let datos = (typeof json == "string") ? JSON.parse(json) : json

			if(datos instanceof Array){
				//1) Recorrer el Array de Object para instanciar los objetos Producto
				return datos.map( item => new Producto(item.idProducto, item.Nombre, item.Stock, item.Precio, item.Imagen, item.Disponible) )
			}else if(datos instanceof Object){
				return new Producto( datos.idProducto, datos.Nombre, datos.Stock, datos.Precio, datos.Imagen, item.Disponible)
			}else {
				console.error("Ya fue... no convierto nada en Producto")
			}
		}
	} 
