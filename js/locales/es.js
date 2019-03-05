var lang = {
	offline: "No hay conexión a internet",
	greeting : {
		start: ["¡Sexy!"],
		night: ["Hora de dormir", "zZzzZz", "¡Ya es de noche!"],
		morning: ["¡Buen día!"],
		midday: ["Hey!", "¿Sale una siesta?"],
		evening: ["¡Buenas noches!"]
	},
	commands: {
		title: "Listado de Órdenes",
		invalid: "Haz dicho un comando inválido",
		cmdShowCommands : {
			text: "Ayuda",
			voice: ["ayuda", "help", "comandos"],
			description: 'cmdShowCommands|Para mostrar los comandos disponibles diga "ayuda".'
		},
		cmdHideContent: {
			text: "Contenido",
			voice: ["ocultar", "esconder", "home"],
			description:'cmdHideContent|Para ocultar el contenido diga "ocultar".'
		},
		cmdMapShow: {
			text: "Mapa",
			voice: ["mapa", "map"],
			description:'cmdMapShow|Para mostrar el mapa diga "mapa".'
		},
		cmdMapZoomIn: {
			text: "Mapa",
			voice: ["acercar", "zoom in"],
			description:'cmdMapZoomIn|Para hacer zoom in en el mapa diga "acercar".'
		},
		cmdMapZoomOut: {
			text: "Mapa",
			voice:["alejar", "zoom out"],
			description:'cmdMapZoomOut|Para hacer zoom out en el mapa diga "alejar".'
		},
		cmdMapShowNewPlace: {
			text: "Mapa",
			voice: ["mapa de *"],
			description:'cmdMapShowNewPlace|Para mostrar un mapa "mapa de {ciudad}".'
		},
		cmdMapZoomReset: {
			text: "Mapa",
			voice: ["resetear", "reset"],
			description:'cmdMapZoomReset|Para volver al mapa diga "reset".'
		},
		cmdVideoSearch: {
			text: "Vídeos",
			voice: ["buscar *"],
			description:'cmdVideoSearch|Para buscar un vídeo "buscar {vídeo}".'
		},
		cmdVideoStop: {
			text: "Vídeos",
			voice: ["detener", "parar"],
			description:'cmdVideoStop|Para deneter el vídeo o la musica diga "detener".'
		}
	}
};