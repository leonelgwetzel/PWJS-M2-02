	class Producto {
		//Constructor <- Vital: recibe los datos y fabrica el objeto. (Solo puede haber un solo constructor) ... Los parametros mas importantes van primero.
		constructor(n, s, p, i, d = true){//<-- En el caso de que disponible sea "undefined x el usuario" lo lee como un TRUE a menos que se especifique lo contrario.
		//Atributos
		this.nombre = n
		this.stock = s
		this.precio = p
		this.imagen = i
		this.disponible = d

	}

		//Propiedades L/E (Lectura y escritura o getters y setters)
		get Precio(){ //Mantiene la variable original intacta
			return "US$D "+(this.precio * 1.21).toFixed(2) //<- toFixed(x) cantidad de decimlaes a mostrar
		}

		set Precio(value){
			if(isNaN(value) != true ){ //<- != no esta vacio, no es nulo o no esta definido
				this.precio = value
			}else {
				console.error("El valor del precio no puede ser texto")
			}
		}

		set Disponible(value){

			let estado = value ? "habilitado" : " deshabilitado"

			if( value == this.disponible) {
				alert("El producto ya esta " + estado)
			}

			return
			

			if( confirm(`Desea ${estado} el producto "${this.nombre}"`) ){
				this.disponible = value
			}

		}

		//Metodos de Instancia -> Primero hay que instanciar un Producto (El .this en "producto.class.js indica que es el objeto que invoco el Mostrar()")
		Mostrar(){
			let ficha =	document.querySelector(".producto").cloneNode(true)
			ficha.querySelector(".card-title a").innerText = this.nombre
			ficha.querySelector(".card-body h5").innerText = this.Precio
			ficha.querySelector(".card-img-top").src = this.imagen
			ficha.classList.remove("d-none")
			document.querySelector("#productos-destacados").appendChild(ficha)
		}

		aplicarDescuento(valor){
			let importe = (this.precio * valor) / 100
			this.precio = this.precio - importe
			document.write(`OtroProducto con descuento: <strong><em>${this.precio}</em></strong>`)
		}

		//Metodos de Clase ó Metodos estatáticos.
		static parse(json){ //
			//Acá hay que hacer magia para que se conviertan en objetos 'Producto'
			let datos = JSON.parse(json)//<- De JSON a Object
			console.log("Estos son los datos:")
			console.log(datos)

			if(datos instanceof Array){
				//1) Recorrer el Array de Object para instanciar los objetos Producto
				return datos.map( item => new Producto(item.Nombre, item.Stock, item.Precio, item.Imagen) )
			}else if(datos instanceof Object){
				return new Producto(datos.Nombre, datos.Stock, datos.Precio, datos.Imagen)
			}else {
				console.error("Ya fue... no convierto nada en Producto")
			}
		}
	} 
