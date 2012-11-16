menuLayout.attachEvent('onClick', function(id, zoneId, casState){
	switch(id){
        case 'men_principal':
            mainTab.setTabActive("tab_1");
        break;
        case 'men_salir':
			/**
             * Aqui se tiene q eliminar las cookies.
             */
            document.location = "../../index.php";
        break;
		case 'men_gestion':
			gestionClass.widgetMain();
		break;
		case 'men_dpto':
			dptoClass.widgetMain();
		break;
		case 'men_muni':
			muniClass.widgetMain();
		break;
		case 'men_roles':
			rolesClass.widgetMain();
		break;
		case 'men_usuarios':
			usuariosClass.widgetMain();
		break;
		case 'men_rangof':
			fechasClass.widgetMain();
		break;
		case 'men_metadatos':
			mdatosClass.widgetMain();
		break;
        case 'men_asigbol':
            asigbolClass.widgetMain();
		break;
		case 'men_boleta':
			//disenadorClass.widgetMain();
            disenadorwinClass.widgetMain();
		break;
        case 'men_reporte1':
            open(mainPath+'index.php/reports/accesos');
        break;
		case 'men_reporte2':
            generadorClass.widgetMain();
        break;
		case 'men_reporte3':
           // consistenciaClass.widgetMain();
            stepcons1Class.widgetMain();
        break;
		case 'men_mensaje':
			mensajesClass.widgetMain();
		break;
	}
});