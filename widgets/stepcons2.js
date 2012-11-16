var stepcons2Class = {
	parent: "parentId",
	pattern: "4H",
	win: null,
	form: null,
	grid: null,
	actionBar: null,
	layout: null,
	tree: null,
	fecha: null,
	usuDes: null,
	idTree: null,
	statusGrid: null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 880, 480);
		this.win.setText('Nuevo Mensaje');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();
		this.widgetBar();
		this.layout = this.win.attachLayout('1C');
	},
	widgetBar: function(){
		this.actionBar =  this.win.attachToolbar();
		this.actionBar.setIconsPath(mainPath+"/images/icons32/");
		this.actionBar.setIconSize(32);
		this.actionBar.loadXML(mainPath+"xml/toolbarConst1.xml");
		this.actionBar.setAlign('left');
	},
	widgetGrid: function(ruta){
        var cell = this.layout.cells('a');
        cell.setWidth('500');
        cell.setHeight('400');
        cell.hideHeader();
        cell.fixSize(true, true);
        var me=this;
        me.statusGrid = cell.attachStatusBar();
        me.grid = cell.attachGrid();
        me.grid.setHeader("Usuario,Nombre,Correo,Fecha,Hora,Parte,Codigo,Valor");
        me.grid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro");
        me.grid.enableMultiline(true);
        me.grid.setColAlign("left,left,center,center,left,center,center,left");
        me.grid.setInitWidths("65,*,*,80,60,0,55,*");
        me.grid.init();
        me.grid.load(ruta, function(){
            me.statusGrid.setText("Numero de Registros: " + me.grid.getRowsNum());
            me.grid.groupBy(5);
        },"json");
    },
	widgetMain: function(ruta,ruta2){
        var me =this;
        me.widgetWin();
        me.widgetGrid(ruta);
        me.actionBar.attachEvent("onClick", function(itemId)
		{
			switch(itemId){
				case 'btn_Enviar':

				break;
				case 'btn_Guardar':

				break;
				case 'btn_Limpiar':

				break;
                case 'btn_print':
                   // alert(me.grid.getRowsNum());
                    if(me.grid.getRowsNum()>0)
                        open(ruta2);
                break;
			}
		});		
	}
};