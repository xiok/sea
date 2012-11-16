var asigUserClass = {
	parent: "parentId",
	pattern: "4H",
	win: null,
	form: null,
	grid: null,
    gridA: null,
	statusGrid: null,
	layout: null,
    widgetBar:function () {
        this.actionBar =  this.win.attachToolbar();
        this.actionBar.setIconsPath(mainPath + "/images/icons32/");
        this.actionBar.setIconSize(32);
        this.actionBar.loadXML(mainPath + "xml/toolbarAsigUsu1.xml");
        this.actionBar.setAlign('left');
    },
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 480, 460);
		this.win.setText('Asignaci&oacute;n de usuarios');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		//this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();
        this.widgetBar();
		this.layout = this.win.attachLayout('3U');
	},	
	widgetGrid: function(){
		var cell = this.layout.cells('a');
		cell.setWidth('240');
        cell.setHeight('460');
		cell.hideHeader();
		cell.fixSize(true, true);		
		var me = this;
		me.statusGrid = cell.attachStatusBar();
		me.grid = cell.attachGrid();
		me.grid.setImagePath(mainPath+'dhtmlx/imgs/');
		me.grid.setHeader("Id,Detalle,Departamento,");
		me.grid.setColTypes("ro,ro,ro,ch");
		me.grid.setColAlign("right,left,left,left");
		me.grid.setInitWidths("30,150,50,35");
		me.grid.setColumnColor("#E5E5E5");
        me.grid.setColumnHidden(2,true);
		me.grid.init();
		me.grid.load(mainPath+"index.php/municipio/grid_usu", function(){
			me.grid.groupBy(2);
            me.grid.collapseAllGroups();
			me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
		},"json");
	},
    widgetGridA: function(text){
        var cell = this.layout.cells('b');
        cell.setWidth('240');
        cell.setHeight('460');
        cell.hideHeader();
        cell.fixSize(true, true);
        var me2 = this;

        me2.gridA = cell.attachGrid();
        me2.gridA.setImagePath(mainPath+'dhtmlx/imgs/');
        me2.gridA.setHeader(["Id","Detalle","Departamento","id1",""]);
        me2.gridA.setColTypes("ro,ro,ro,ro,ch");
        me2.gridA.setColAlign("right,left,left,left,left");
        me2.gridA.setInitWidths("30,150,50,30,30");
        me2.gridA.setColumnColor("#E5E5E5");
        me2.gridA.setColumnHidden(2,true);
        me2.gridA.setColumnHidden(3,true);
        me2.gridA.init();

    },
    widgetCargar: function(text){
        var me = this;
        me.gridA.clearAll();
        me.gridA.load(mainPath+"index.php/municipio/grid_asig?usu_id="+text, function(){
            me.gridA.groupBy(2);
        },"json");
    },
    widgetForm: function(){
        var panel = this.layout.cells('c');
        panel.setHeight('0');
        panel.hideHeader();
        var str = [ { type: "hidden", name:"usu_id" },
                    { type: "label", name:"label1", label:"HOLAS como estas", labelWidth:400,labelTop:0,position:"absolute"},
                    { type: "label", name:"label2", label:"Como estas",labelTop:0, labelLeft:350, position:"absolute",labelWidth:60}];
        var me = this;
        me.form = panel.attachForm(str);
    },
	widgetMain: function(idU){
        var me = asigUserClass;
		me.widgetWin();
		me.widgetGrid();
        me.widgetGridA(idU);
        me.widgetForm();
        me.widgetCargar(idU);
        detail.attachObject('detailAsigUser');
		this.actionBar.attachEvent("onClick", function(itemId){
			switch(itemId){
				case 'btn_Guardar':
                    var l= me.grid.getCheckedRows(3).split(',');
                    var sw =1;
                    dhtmlx.confirm({
                        text:"¿Esta seguro de asignar?",
                        callback: function(status){
                            if(status == true){
                                for (i=0;i<=l.length-1;i++){
                                    me.form.send(mainPath+'index.php/Asig_usu/Save_data?asigu_mun='+me.grid.cells(l[i],0).getValue()+'&asigu_usu='+idU,function(loader, response){
                                        me.widgetCargar(idU);
                                    });
                                }
                                me.grid.setCheckedRows(3,0);
                                me.grid.collapseAllGroups();
                            }
                        }
                    });
				break;
                case 'btn_Quitar':
                    me.gridA.forEachRow(function(id){
                        if(me.gridA.cells(id,4).getValue()==0){
                            me.form.send(mainPath+'index.php/Asig_usu/Delete_data?asigu_id='+me.gridA.cells(id,3).getValue(),function(loader, response){
                                me.widgetCargar(idU);
                            });
                        }
                    });
                break;
			}
		});
	}
};