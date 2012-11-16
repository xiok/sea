var stepcons1Class = {
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
    treeId:null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 680, 480);
		this.win.setText('Reporte de Consistencia');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();
		this.widgetBar();
		this.layout = this.win.attachLayout('3L');
	},
	widgetBar: function(){
		this.actionBar =  this.win.attachToolbar();
		this.actionBar.setIconsPath(mainPath+"/images/icons32/");
		this.actionBar.setIconSize(32);
		this.actionBar.loadXML(mainPath+"xml/toolbarConst.xml");
		this.actionBar.setAlign('left');
	},
	widgetTree: function(){
		var cell = this.layout.cells('a');
		cell.setWidth('160');
		cell.hideHeader();
		cell.fixSize(true, true);
		var me = this;
		me.tree = cell.attachTree();
        me.tree.enableRadioButtons(true);
		me.tree.loadXML(mainPath+"xml/envioTree.php");
	},
	widgetGrid: function(){
        var cell = this.layout.cells('b');
        cell.setWidth('500');
        cell.setHeight('200');
        cell.hideHeader();
        cell.fixSize(true, true);
        var me=this;
        me.statusGrid = cell.attachStatusBar();
        me.grid = cell.attachGrid();
        me.grid.setHeader("Codigo,Nombre Boleta,Fecha Inicio,Fecha Final,#Partes,");
        me.grid.setColTypes("ro,ro,ro,ro,ro,ra");
        me.grid.enableMultiline(true);
        me.grid.setColAlign("left,left,center,center,center,center");
        me.grid.setInitWidths("60,180,*,*,80,28");
        me.grid.init();
    },
    widgetGrid2: function(){
        var cell = this.layout.cells('c');
        cell.setWidth('500');
        cell.setHeight('200');
        cell.hideHeader();
        cell.fixSize(true, true);
        var me=this;
        me.grid2 = cell.attachGrid();
        me.grid2.setHeader("preg_id, Orden, Detalle Pregunta, Parte,");
        me.grid2.setColTypes("ro,ro,ro,ro,ch");
        me.grid2.enableMultiline(true);
        me.grid2.setColAlign("right,center,left,left,center");
        me.grid2.setInitWidths("0,80,365,0,30");
        //me.grid2.setColumnHidden(0,true);
        me.grid2.init();
    },

	widgetMain: function(){
        var me =stepcons1Class;
        me.widgetWin();
        me.widgetTree();
        me.widgetGrid();
        me.widgetGrid2();
        detail.attachObject('detailCons');
        me.tree.attachEvent("onCheck", function(id,state){
            me.treeId = id;
            if(id.substring(0,1)=='D')
			    me.tree.setCheck(id,0);
            else{
                me.grid.clearAll();
                me.grid2.clearAll();
                me.grid.load(mainPath+"index.php/Boleta/ConsGrid_data?bole_id="+id.substring(1), function(){
                    me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
                },"json");
            }
		});
        me.grid.attachEvent("onCheck", function(rId,cInd,state){
            me.grid2.clearAll();
            me.grid2.load(mainPath+"index.php/Boleta/ConsGrid2_data?bol_codigo="+me.grid.cells(rId, 0).getValue(), function(){
                me.grid2.groupBy(3);
            },"json");
        });

        me.actionBar.attachEvent("onClick", function(itemId)
		{
			switch(itemId){
                case 'btn_siguiente':
                    var usu = me.grid2.getCheckedRows(4).split(',');
                    var ruta=mainPath+"index.php/boleta/ConsGrid3_data?";
                    var ruta2=mainPath+'index.php/reports/Consistencia?';
                    var sw=0;
                    var c=0;
                    for(i=0;i<=usu.length-1;i=i+1){
                        if(sw==0){
                            sw=1;
                            ruta=ruta+"preg_id"+c+"="+me.grid2.cells(usu[i], 0).getValue();
                            ruta2=ruta2+"preg_id"+c+"="+me.grid2.cells(usu[i], 0).getValue();
                        }
                        else{
                            ruta=ruta+"&preg_id"+c+"="+me.grid2.cells(usu[i], 0).getValue();
                            ruta2=ruta2+"&preg_id"+c+"="+me.grid2.cells(usu[i], 0).getValue();
                        }
                        c=c+1;
                    }
                    ruta=ruta+"&mun_id="+me.treeId.substring(1);
                    ruta2=ruta2+"&mun_id="+me.treeId.substring(1);
                    stepcons2Class.widgetMain(ruta,ruta2);
                break;
            }
		});		
	}
};