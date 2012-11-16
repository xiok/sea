var consistenciaClass = {
	parent: "parentId",
	pattern: "2E",
	win: null,
	form: null,
	grid: null,
	actionBar: null,
	layout: null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 600, 500);
		this.win.setText('Reporte de Consistencia');
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
		this.layout = this.win.attachLayout('2E');
	},
	widgetBar: function(){		
		this.actionBar =  this.win.attachToolbar();
		this.actionBar.setIconsPath(mainPath+'/images/icons32/');
		this.actionBar.setIconSize(32);
		this.actionBar.loadXML(mainPath+"xml/toolbar.xml");
		this.actionBar.setAlign('right');
	},
	widgetGrid: function(){
		/**
	 	 * DEL LAYOUT DEFINIDO DETERMINAMOS LA CELDA "A" AL DATAGRID
	     */
		var cell = this.layout.cells('b');
		cell.setWidth('500');
		cell.setHeight('250');
		cell.hideHeader();
		cell.fixSize(true, true);
		this.grid = cell.attachGrid();		
		//this.grid.setImagePath('./dhtmlx/imgs/');
		//this.grid.setColumnIds("codigo_txt, detalle_txt");
		this.grid.setHeader(["Nombre","Telefono","Fecha de Modificacion ","Hora","Valor"]);//,null,["text-align:center","text-align:center"]);
		this.grid.setColTypes("ro,ro");		
		this.grid.setColAlign("left,left");
		this.grid.setInitWidths("*,*,*,*,*");		
		this.grid.init();
		// this.grid.loadXML("index.php/mDatos/grid_data");// aqui carga los datos a mostrar en el grid desde el controlador q en este caso es mDatosController
		alert("GRid");
	},
	
	widgetCasa: function(){
		alert("form");
		var panel = this.layout.cells('a');
		panel.setWidth('200');
		panel.hideHeader();
		var str = [
			// { type:"label" , name:"form_label_1", label:"HOLA MUNDO....", labelWidth:100,labelLeft:200, labelTop:5, position:"absolute"  },
			{type:"combo",name:"combo1",label:"Municipio:",inputWidth:300, labelLeft:80, labelTop:30, inputLeft:150, inputTop:30,position:"absolute",connector:"index.php/municipio/combo_data" },
			{type:"combo",name:"combo2",label:"Boleta:",inputWidth:300, labelLeft:80, labelTop:60, inputLeft:150, inputTop:60,position:"absolute"},
			{type:"combo",name:"combo3",label:"Seccion:",inputWidth:300, labelLeft:80, labelTop:90, inputLeft:150, inputTop:90,position:"absolute"},
			{type:"combo",name:"combo4",label:"Pregunta:",inputWidth:300, labelLeft:80, labelTop:120, inputLeft:150, inputTop:120,position:"absolute"}
		];
		var me = this;	    
		me.form = panel.attachForm(str);
		var dhxCombo = me.form.getCombo("combo1");
		dhxCombo.setComboText("Seleccione una opcion...");
		dhxCombo.attachEvent("onChange",function(){
			alert(dhxCombo.getSelectedText());
		});
	},
	widgetAlert: function(){
		alert("Alert");
	},
	
	widgetMain: function(){
		consistenciaClass.widgetWin();		
		consistenciaClass.widgetCasa();		
		consistenciaClass.widgetGrid();
	}
};