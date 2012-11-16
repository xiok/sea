var asigbolClass = {
	parent: "parentId",
	pattern: "4H",
	win: null,
	form: null,
	grid: null,
	actionBar: null,
	layout: null,
	dhxCombo: null,
	BoleCod: null,
	PregCod: null,
	statusGrid: null,
    layout2:null,
    ruta:null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 670, 400);
		this.win.setText('Asignacion Boletas a Municipios');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();
		
		this.widgetBar();			
		this.layout = this.win.attachLayout('3L');
        var b = this.layout.cells('b');
        this.layout2 = b.attachLayout('2U');

	},
	widgetBar: function(){		
		this.actionBar =  this.win.attachToolbar();
		this.actionBar.setIconsPath(mainPath+'/images/icons32/');
		this.actionBar.setIconSize(32);
		this.actionBar.loadXML(mainPath+"xml/toolbarAsigBol.xml");
		this.actionBar.setAlign('left');
	},
	widgetGridBoleta: function(){
        var cell = this.layout2.cells('a');
        cell.setWidth('275');
        cell.hideHeader();
        cell.fixSize(true, true);
        var me=this;
        //me.statusGrid = cell.attachStatusBar();
        me.gridBol = cell.attachGrid();
        me.gridBol.setHeader("Id,Codigo,Nombre Boleta,");
        me.gridBol.setColTypes("ro,ro,ro,ch");
        me.gridBol.enableMultiline(true);
        me.gridBol.setColAlign("left,left,center,center");
        me.gridBol.setInitWidths("0,60,180,28");
        me.gridBol.init();
        me.gridBol.load(mainPath+"index.php/Boleta/AsigGrid_data", function(){
           // me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
        },"json");

	},
    widgetGridAsignacion: function(){
        var cell = this.layout.cells('c');
        cell.setWidth('480');
        cell.hideHeader();
        cell.fixSize(true, true);
        var me=this;
        //me.statusGrid = cell.attachStatusBar();
        me.grid = cell.attachGrid();
        me.grid.setHeader("Codigo,CodigoSea,Fecha Inicial,Fecha Final,Municipio");
        me.grid.setColTypes("ro,ro,ro,ro,ro");
        me.grid.enableMultiline(true);
        me.grid.setColAlign("right,left,left,left,left");
        me.grid.setInitWidths("70,140,*,*,0");
        me.grid.init();

    },
    widgetTree: function(){
        var cell = this.layout.cells('a');
        cell.setWidth('145');
        cell.setHeight('800');
        cell.hideHeader();
        cell.fixSize(true, true);
        var me = this;
        me.tree = cell.attachTree();
        me.tree.enableCheckBoxes(1);
        me.tree.enableThreeStateCheckboxes(true);
        me.tree.loadXML(mainPath+"xml/envioTree.php");
    },

	widgetForm: function(){
		var panel = this.layout2.cells('b');
        panel.hideHeader();
        var str = [
            { type:"hidden", name:"asig_mun"},
            { type:"hidden", name:"asig_bole"},
            { type:"calendar" , name:"asig_fechaini",validate:"NotEmpty",position:"absolute",inputTop:30,inputLeft:25, dateFormat:"%Y-%m-%d",readonly:true, options:{}},
            { type:"calendar" , name:"asig_fechafin",validate:"NotEmpty",position:"absolute",inputTop:90,inputLeft:25, dateFormat:"%Y-%m-%d",readonly:true, options:{}},
            { type:"label" , name:"label_ini",label:"Fecha inicial",position:"absolute",labelLeft:25,labelTop:9,labelWidth:150},
            { type:"label" , name:"label_fin",label:"Fecha Final",position:"absolute",labelLeft:25,labelTop:68,labelWidth:150}
        ];
        var me = this;
        me.form = panel.attachForm(str);
	},

	widgetMain: function(){
		var me=this;
        me.widgetWin();
        me.widgetGridBoleta();
        me.widgetGridAsignacion();
        me.widgetForm();
        me.widgetTree();
        me.tree.attachEvent("onCheck", function(id,state){
            var usu = me.tree.getAllChecked().split(',');
            ruta=mainPath+"index.php/Asignacion/Grid_data?";
            var sw=0;
            var c=0;
            me.grid.clearAll();
            for(i=0;i<=usu.length-1;i=i+1){
                if(usu[i].substring(0,1)=="M"){
                    if(sw==0){
                        sw=1;
                        ruta=ruta+"mun"+c+"="+usu[i].substring(1);
                    }
                    else
                        ruta=ruta+"&mun"+c+"="+usu[i].substring(1);
                    c=c+1;
                }
            }

            // envioClass.form.send(ruta, function(loader, response) {
            // });
            if(me.tree.getAllChecked().length>0){
                me.grid.load(ruta, function(){
                    me.grid.groupBy(4);
                },"json");
            }
        });

        me.actionBar.attachEvent("onClick", function(itemId){
            switch(itemId){
                case 'btn_edit':
                    var l= me.gridBol.getCheckedRows(3).split(',');
                    var usu = me.tree.getAllChecked().split(',');
                    if (me.form.validate()) {
                        for(i=0;i<=usu.length-1;i=i+1){
                            if(usu[i].substring(0,1)!='D'){
                                me.form.setItemValue('asig_mun',usu[i].substring(1));
                                for(j=0;j<=l.length-1;j=j+1){
                                    me.form.setItemValue('asig_bole',me.gridBol.cells(l[j],0).getValue());
                                    me.form.send(mainPath+'index.php/Asignacion/Save_data',function(loader, response){

                                    });
                                }
                            }
                        }
                        if(me.tree.getAllChecked().length>0){
                            me.grid.load(ruta, function(){
                                me.grid.groupBy(4);
                            },"json");
                        }
                    }
                    else
                        dhtmlx.alert("Debe elegir las Fechas");
                break;
            }
        });

	}
};

