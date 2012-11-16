var generadorClass = {
	parent: "parentId",
	pattern: "3U",
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
		this.layout = this.win.attachLayout('3U');
	},
	widgetBar: function(){		
		this.actionBar =  this.win.attachToolbar();
		this.actionBar.setIconsPath(mainPath+'/images/icons32/');
		this.actionBar.setIconSize(32);
		this.actionBar.loadXML(mainPath+"xml/toolbar.xml");
		this.actionBar.setAlign('right');
	},
	widgetGrid2: function(){
		/**
	 	 * DEL LAYOUT DEFINIDO DETERMINAMOS LA CELDA "A" AL DATAGRID
	     */
		var cell = this.layout.cells('a');
		cell.setWidth('300');
		cell.setHeight('200');
		cell.hideHeader();
		cell.fixSize(true, true);
		this.grid = cell.attachGrid();		
		//this.grid.setImagePath('./dhtmlx/imgs/');
		//this.grid.setColumnIds("codigo_txt, detalle_txt");
		this.grid.setHeader(["Nombre","Telefono"]);//,null,["text-align:center","text-align:center"]);
		this.grid.setColTypes("ro,ch");		
		this.grid.setColAlign("left,left");
		this.grid.setInitWidths("*,*,*,*,*");		
		this.grid.init();
		this.grid.loadXML("index.php/mDatos/grid_data");// aqui carga los datos a mostrar en el grid desde el controlador q en este caso es mDatosController
	},
	widgetGrid: function(){
		/**
	 	 * DEL LAYOUT DEFINIDO DETERMINAMOS LA CELDA "A" AL DATAGRID
	     */
		var cell = this.layout.cells('c');
		cell.setWidth('800');
		cell.setHeight('200');
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
		this.grid.loadXML("index.php/mDatos/grid_data");// aqui carga los datos a mostrar en el grid desde el controlador q en este caso es mDatosController
	},
	widgetForm: function(){
		var panel = this.layout.cells('b');
		panel.setWidth('300');
		panel.hideHeader();
		var str = [
			//{ type:"label" , name:"form_label_1", label:"HOLA MUNDO....", labelWidth:100,labelLeft:200, labelTop:5, position:"absolute"  },
			{type:"radio" , name:"form_1", label:"Nacion", value:"form_radio_1",inputWidth:300, labelLeft:60, labelTop:30, inputLeft:150, inputTop:30,position:"absolute"},
			{type:"radio" , name:"form_1", label:"Departamento", value:"form_radio_2",inputWidth:300, labelLeft:60, labelTop:60, inputLeft:150, inputTop:60,position:"absolute"},
			{type:"radio" , name:"form_1", label:"Municipio", value:"form_radio_3",inputWidth:300, labelLeft:60, labelTop:90, inputLeft:150, inputTop:90,position:"absolute"},
			{type:"radio" , name:"form_1", label:"Regional", value:"form_radio_4", inputWidth:300, labelLeft:60, labelTop:120, inputLeft:150, inputTop:120,position:"absolute"},
			{type:"radio" , name:"form_1", label:"Indigena", value:"form_radio_5", inputWidth:300, labelLeft:60, labelTop:150, inputLeft:150, inputTop:150,position:"absolute"}
		];
		var me = this;	    
		me.form = panel.attachForm(str);
	},
		
	widgetMain: function(){
		generadorClass.widgetWin();
		generadorClass.widgetForm();
		generadorClass.widgetGrid();
		generadorClass.widgetGrid2();		
	}
};