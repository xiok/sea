var metaUpdateClass = {
	parent: "parentId",
	pattern: "4H",
	win: null,
	form: null,
	grid: null,
	actionBar: null,
	layout: null,
	BoleCod: null,
	PregCod: null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 300, 180);
		this.win.setText('Metadatos');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();		
		this.widgetBar();			
		/**
	 	 * SE DEFINE EL LAYOUT QUE VA TENER LA VENTANA
	 	 */		
		this.layout = this.win.attachLayout('1C');		
	},
	widgetBar: function(){		
		this.actionBar =  this.win.attachToolbar();
		this.actionBar.setIconsPath(mainPath+'images/icons32/');
		this.actionBar.setIconSize(32);
		this.actionBar.loadXML(mainPath+"xml/toolbarMetaUpdate.xml");
		this.actionBar.setAlign('left');
	},
	widgetForm: function(){
		var panel = this.layout.cells('a');
		panel.setWidth('200');
		panel.hideHeader();
		var str = [
			//{ type:"label" , name:"form_label_1", label:"Descripcion", labelLeft:20, labelTop:10, position:"absolute"  },
			//{ type:"input" , name:"PregCod1", labelLeft:5, labelTop:10,inputWidth:10, position:"absolute"  },
			{ type:"input" , name:"preg_observacion", inputWidth:250, inputHeight:50, inputLeft:20, inputTop:30, rows:4, position:"absolute"}
		];
		var me = this;	    
		me.form = panel.attachForm(str);
	},		
	
	// widgetGetPregCod: function(text){
		// return 6;
	// },
	
	// widgetSetPregCod: function(text){
		// metaUpdateClass.PregCod=text;
	// },
	widgetMain: function(){
		metaUpdateClass.widgetWin();
		metaUpdateClass.widgetForm();	
		PregCod=mdatosClass.grid.cells(mdatosClass.grid.getSelectedRowId(),1).getValue();					
		metaUpdateClass.actionBar.attachEvent("onClick", function(itemId){		
			var me = metaUpdateClass;
			var d=1;
			switch(itemId){
				case 'btn_Guardar':					
					metaUpdateClass.form.send(mainPath+'index.php/pregunta/Edit_data?PregCod='+PregCod, function(loader, response) {
						mdatosClass.grid.clearAll();
						mdatosClass.grid.load(mainPath+"index.php/Boleta/grid_data?id="+ mdatosClass.widgetGet() + "&id_usuario=" +idUsuario, function(){
							mdatosClass.statusGrid.setText("Numero de Registros: "+mdatosClass.grid.getRowsNum());
						},"json");
						// mdatosClass.grid.loadXML("index.php/Boleta/grid_data?id="+mdatosClass.widgetGet());
						dhtmlx.alert("Guardado");						
					});
				break;
				case 'btn_Cancelar':					
					
				break;				
			}
		});
	}
};