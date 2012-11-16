var mdatosClass = {
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
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 650, 400);
		this.win.setText('Metadatos');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();
		
		this.widgetBar();			
		this.layout = this.win.attachLayout('2E');

	},
	widgetBar: function(){		
		this.actionBar =  this.win.attachToolbar();
		this.actionBar.setIconsPath(mainPath+'/images/icons32/');
		this.actionBar.setIconSize(32);
		this.actionBar.loadXML(mainPath+"xml/toolbarMetadatos.xml");
		this.actionBar.setAlign('left');
	},
	widgetGrid: function(){
		/**
	 	 * DEL LAYOUT DEFINIDO DETERMINAMOS LA CELDA "A" AL DATAGRID
	     */
		var cell = this.layout.cells('b');
		cell.setWidth('500');
		//cell.setHeight('200 ');
		cell.hideHeader();
		cell.fixSize(true, true);
		var me=this;
		// var me = this;
		// me.statusGrid = cell.attachStatusBar();		 
		me.statusGrid = cell.attachStatusBar();
		me.grid = cell.attachGrid();
		me.grid.setHeader("bol_codigo,Nombre,bpa_numparte,bol_id,Codigo,Label,Descripcion");
		me.grid.setColTypes("ro,ro,ro,ro,ro,ro,ro");
		me.grid.enableMultiline(true);
		me.grid.setColAlign("right,left,left,left,left,left,left");
		me.grid.setInitWidths("0,100,*,*,50,180,*");
        me.grid.setColumnHidden(2,true);
        me.grid.setColumnHidden(3,true);
		me.grid.init();
	},
	widgetForm: function(){
		var panel = this.layout.cells('a');
		panel.setWidth('200');
        panel.setHeight('300');
        panel.hideHeader();
		this.layout.cells('a').hideHeader();
		var str = [
		
			{ type:"combo" , name:"combo1",label:"Boleta:", inputWidth:250,  inputLeft:150, labelTop:13,inputTop:10, labelAlign:"right",labelLeft:90,position:"absolute",connector:mainPath+"index.php/Boleta/combo_data" },
			//{ type:"select" , name:"bol_id", label:"Boleta", validate: "NotEmpty", connector: mainPath+"index.php/Boleta/combo_data", labelAlign:"right", inputWidth:250, labelLeft:17, labelTop:15, inputLeft:15, inputTop:35,position:"absolute" },
			{ type:"input" , name:"preg_codigo", label:"C&oacute;digo:",readonly:true,labelWidth:95,  inputWidth:200, labelLeft:85,position:"absolute",inputTop:44 ,labelTop:46,inputLeft:150 },
            { type:"input" , name:"preg_observacion", label:"Observaci&oacute;n:", rows:"3", labelWidth:95, labelAlign:"left",labelLeft:55, inputWidth:350 , position:"absolute" ,inputTop:70 ,labelTop:80 ,inputLeft:150 },
            { type:"button" , name:"save_btn", value:"Guardar", inputLeft:530, inputTop:100, position:"absolute"  },
            { type:"hidden" , name:"preg_id" }
		];
		var me = this;	    
		me.form = panel.attachForm(str);
		dhxCombo = me.form.getCombo("combo1");
		dhxCombo.setComboText("Seleccione una opcion...");
		dhxCombo.attachEvent("onChange",function(){				
            BoleCod=dhxCombo.getSelectedValue();
            mdatosClass.grid.clearAll();
            me.form.setItemValue('preg_codigo',"");
            me.form.setItemValue('preg_observacion',"");
            me.grid.load(mainPath+"index.php/Boleta/metagrid_data?bol_codigo="+ BoleCod, function(){
                me.grid.groupBy(2);
                //me.grid.setColumnHidden(0,true);
                me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
            },"json");
			//aqui vamos a llamar a cargar de dos formas el grid			
        });
        me.form.attachEvent("onButtonClick", function(name) {
        switch(name){
				case 'save_btn':
					// var rowId = me.grid.cells(me.grid.getSelectedRowId(),3).getValue();
					var preg_obs=me.form.getItemValue('preg_observacion');
                    me.form.setItemValue('preg_id',me.grid.cells(me.grid.getSelectedRowId(),3).getValue());
					if(me.form.validate()){
                        dhtmlx.confirm({
                            text:"¿Esta seguro de guardar los cambios?",
                            callback: function(status){
                                if(status == true){
                                    me.form.send(mainPath+'index.php/pregunta/edit_data?preg_observacion='+preg_obs, function(loader, response){
                                        if(response == true){
                                            me.grid.clearAll();
                                            me.grid.load(mainPath+"index.php/Boleta/metagrid_data?bol_codigo="+ mdatosClass.widgetGet(), function(){
                                            },"json");
                                            //me.form.lock();
                                            me.form.clear();
                                            me.form.setItemFocus('btn_new');
                                        }
                                        else
                                            dhtmlx.alert({
                                                text: response
                                            });
                                    });
                                }
                            }
                        });
					}
					else
						dhtmlx.alert({
							text:"Error"
						});
				break;
			}
		});
	},

	
	widgetGet: function()
	{
		return BoleCod;
	},
	widgetMain: function(){
		var me=this;
		mdatosClass.widgetWin();
		mdatosClass.widgetGrid();
		mdatosClass.widgetForm();
        detail.attachObject('detailMetadatos');
    	mdatosClass.actionBar.attachEvent("onClick", function(itemId){
			switch(itemId){
				case 'btn_new':
					
				break;
				case 'btn_edit':
					var id = me.grid.getSelectedRowId();
					if(id != null){
						me.form.unlock();
						me.form.enableItem('save_btn');
						// me.form.enableItem('edit_btn');
						me.form.setItemValue('preg_codigo', me.grid.cells(id,4).getValue());
						me.form.setItemValue('preg_observacion', me.grid.cells(id,6).getValue());
					} 
					else
						dhtmlx.alert({
							text:"Error seleccione un Ítem para poder editar."
						});										
				break;
				case 'btn_clear':
					me.form.setItemValue('preg_observacion',"");
				break;
                case 'btn_print':
                    if(me.grid.getRowsNum()>0)
                        open(mainPath+'index.php/reports/Metadatos?bol_codigo='+ BoleCod);
                break;
			}
		});
	}
};

