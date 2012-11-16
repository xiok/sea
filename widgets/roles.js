var rolesClass = {
	parent: "parentId",
	pattern: "4H",
	win: null,
	form: null,
	grid: null,
	tree: null,
	//actionBar: null,
	statusGrid: null,
	layout: null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 565, 400);
		this.win.setText('Roles');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();
		
		widgetBar(this.win,1);
		/**
	 	 * SE DEFINE EL LAYOUT QUE VA TENER LA VENTANA
	 	 */		
		//this.layout = this.win.attachLayout('2U');
		this.layout = this.win.attachLayout('3L');
	},
	widgetGrid: function(){
		/**
	 	 * DEL LAYOUT DEFINIDO DETERMINAMOS LA CELDA "A" AL DATAGRID
	     */		
		var cell = this.layout.cells('c');
		cell.setWidth('280');
		cell.hideHeader();
		cell.fixSize(true, true);
		
		var me = this;
		me.statusGrid = cell.attachStatusBar();
		 
		me.grid = cell.attachGrid();		
		me.grid.setHeader("Id,C&oacute;digo,Detalle, Menu");
		me.grid.setColTypes("ro,ro,ro,ro");		
		me.grid.setColAlign("right,left,left,left");
		me.grid.setInitWidths("30,60,*,*");	
		me.grid.setColumnColor("#E5E5E5");
		me.grid.init();
		
		me.grid.load(mainPath+"index.php/roles/grid_data", function(){
			me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
			me.grid.setColumnHidden(3,true);
		},"json");	
	},
	widgetForm: function(){
		var panel = this.layout.cells('b');
		panel.setWidth('280');
		panel.setHeight('120');
		panel.hideHeader();
		var str = [
			{ type:"settings" , labelWidth:80, inputWidth:250, position:"absolute"  },
			{ type:"input" , name:"rol_codigo", label:"Codigo:", labelAlign:"right", validate: "NotEmpty", inputWidth:80, labelLeft:-30, labelTop:25, inputLeft:53, inputTop:25  },
			{ type:"input" , name:"rol_detalle", label:"Detalle:", labelAlign:"right", validate: "NotEmpty", inputWidth:217, labelLeft:-30, labelTop:50, inputLeft:53, inputTop:50  },
			{ type:"hidden" , name:"rol_archivo" },
			{ type:"button" , name:"edit_btn", label:"Button", value:"Modificar", width:"75", inputWidth:75, inputLeft:115, inputTop:75  },
			{ type:"button" , name:"save_btn", label:"Button", value:"Guardar", width:"75", inputWidth:75, inputLeft:195, inputTop:75  }
		];
		var me = this;	    
		me.form = panel.attachForm(str);
		me.form.lock();
		me.form.attachEvent("onButtonClick", function(name) {
			switch(name){
				case 'save_btn':
					//menuLayout.hideItem('men_inicio');
					if(me.tree.getAllChecked()){
						me.form.setItemValue('rol_archivo', me.tree.getAllChecked());
						var data = me.form.getFormData();
						if(me.form.validate()){
							var auxFind = me.grid.findCell(data.rol_codigo,1);
							var valCell = (auxFind != '')?me.grid.cells(auxFind[0][0],auxFind[0][1]).getValue():null;
							if(valCell != data.rol_codigo){
								me.form.send(mainPath+'index.php/roles/save_data', function(loader, response) {
									if(response > 0){
										var id = me.grid.uid();
										me.grid.addRow(id, [response,data.rol_codigo,data.rol_detalle,data.rol_archivo]);
										me.grid.selectRowById(id);
										me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
										me.form.clear();
										me.form.lock();
										actionBar.enableItem('btn_new');
									}
									else
										dhtmlx.alert({
											text:response
										});
        						});
							}
							else
								dhtmlx.alert({
									text:"Error, ya existe el codigo '"+valCell.toUpperCase()+"', ingrese otro."
								});
						}
						else
							dhtmlx.alert({
								text:"Error, Todos los campos de color rojo son necesarios."
							});	
					}
					else
						dhtmlx.alert({
							text: "Seleccione por lo menos un Ítem del Arbol, para el acceso del menu superior."
						});
				break;
				case 'edit_btn':
					var rowId = me.grid.cells(me.grid.getSelectedRowId(),0).getValue();
					if(me.tree.getAllChecked()){
						me.form.setItemValue('rol_archivo', me.tree.getAllChecked());
						if(me.form.validate()){
							me.form.send(mainPath+'index.php/roles/edit_data?id='+rowId, function(loader, response){
                                var resp = response.split('-');
								if(resp[0] == true){
									me.grid.cells(rowId,2).setValue(me.form.getFormData().rol_detalle);
                                    me.grid.cells(rowId,3).setValue(resp[1]);
									me.grid.clearSelection();
									me.form.lock();
									me.form.clear();
									me.form.setItemFocus('btn_new');
								}
								else
									dhtmlx.alert({
										text:response
									});
							});
						}
						else
							dhtmlx.alert({
								text:"Error, Todos los campos de color rojo son necesarios."
							});
					}
					else
						dhtmlx.alert({
							text: "Selecciones por lo menos un Ítem del Arbol, para el acceso del menu superior."
						});
				break;
			}
		});
	},
	widgetTree: function(){
		var cell = this.layout.cells('a');
		cell.setText("Seleccione ítems del Menu");
		var me = this;
		me.tree = cell.attachTree();		
		me.tree.enableCheckBoxes(1);
		me.tree.enableThreeStateCheckboxes(true);
		me.tree.setIconsPath(mainPath+'dhtmlx/imgs/');
		me.tree.loadXML(mainPath+'xml/treemenu.xml');
	},
	widgetMain: function(){
		rolesClass.widgetWin();
		rolesClass.widgetForm();
		rolesClass.widgetTree();
		rolesClass.widgetGrid();				
		actionBar.attachEvent("onClick", function(itemId){
			var me = rolesClass;
			switch(itemId){
				case 'btn_new':
					actionBar.disableItem(itemId);
					me.form.clear();
					me.form.unlock();
					me.form.enableItem('rol_codigo');
					me.form.setItemFocus('rol_codigo');					
					me.form.disableItem('edit_btn');
					me.form.enableItem('save_btn');
					
					me.tree.setSubChecked('men',false);
					me.tree.setSubChecked('men_inicio',true);
					me.tree.setSubChecked('men_help',true);
				break;
				case 'btn_edit':
					var id = me.grid.getSelectedRowId();
					if(id != null){
						me.form.unlock();
                        actionBar.enableItem('btn_new');
						me.form.disableItem('save_btn');
						me.form.enableItem('edit_btn');
						me.form.setItemValue('rol_codigo', me.grid.cells(id,1).getValue());
						me.form.setItemValue('rol_detalle', me.grid.cells(id,2).getValue());
						me.form.disableItem('rol_codigo');
						
						var treeData = me.grid.cells(id,3).getValue().split(',');
						me.tree.setSubChecked('men',false)
						for(i in treeData){
							me.tree.setCheck(treeData[i],true);
						}						
					} 
					else
						dhtmlx.alert({
							text:"Error seleccione un Ítem para poder editar."
						});					
				break;
				case 'btn_erase':
					if(me.grid.getSelectedRowId() != null){
						var rowId = me.grid.cells(me.grid.getSelectedRowId(),0).getValue();
						dhtmlx.confirm({
							text:"¿Esta seguro que quieres eliminar el Ítem?",
							callback: function(status){
								if(status == true){
									me.form.send(mainPath+'index.php/roles/erase_data?id='+rowId, function(loader, response){
										if(response != true)
											dhtmlx.alert({
												text: response
											});
										else{
											me.grid.deleteSelectedRows();
											me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
										}										
									});
								}
							}
						});
					} 
					else 
						dhtmlx.alert({
							text:"Error seleccione un Ítem para poder eliminar."
						});	
				break;
				case 'btn_clear':
					me.form.lock();
					me.form.clear();
					me.form.setItemFocus('btn_new');
					actionBar.enableItem('btn_new');
					me.grid.clearSelection();					
				break;
			}
		});		
	}
};