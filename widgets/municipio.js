var muniClass = {
	parent: "parentId",
	pattern: "4H",
	win: null,
	form: null,
	grid: null,
	statusGrid: null,
	layout: null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 640, 225);
		this.win.setText('Municipios');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		//this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();
		
		widgetBar(this.win,1);
		/**
	 	 * SE DEFINE EL LAYOUT QUE VA TENER LA VENTANA
	 	 */		
		this.layout = this.win.attachLayout('2U');
	},	
	widgetGrid: function(){
		/**
	 	 * DEL LAYOUT DEFINIDO DETERMINAMOS LA CELDA "A" AL DATAGRID
	     */
		var cell = this.layout.cells('a');
		cell.setWidth('300');
		cell.hideHeader();
		cell.fixSize(true, true);
		
		var me = this;
		me.statusGrid = cell.attachStatusBar();
		
		me.grid = cell.attachGrid();		
		me.grid.setImagePath(mainPath+'dhtmlx/imgs/');
		me.grid.setHeader("Id,C&oacute;digo,Detalle,Departamento,DptoCodigo");
		me.grid.setColTypes("ro,ro,ro,ro,ro");		
		me.grid.setColAlign("right,left,left,left,left");
		me.grid.setInitWidths("30,50,198,80,80");		
		me.grid.setColumnColor("#E5E5E5");
		me.grid.init();	
				
		me.grid.load(mainPath+"index.php/municipio/grid_data", function(){
			me.grid.groupBy(3);
			me.grid.setColumnHidden(3,true);
			me.grid.setColumnHidden(4,true);
			me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
		},"json");
	},
	widgetForm: function(){
		var panel = this.layout.cells('b');
		panel.setWidth('250');
		panel.hideHeader();
		var str = [
			{ type:"settings" , labelWidth:84, inputWidth:250, position:"absolute"  },
			{ type:"select" , name:"mun_dpto", label:"Departamento:", validate: "NotEmpty", connector: mainPath+"index.php/dpto/combo_data", labelAlign:"right", inputWidth:190, labelLeft:6, labelTop:25, inputLeft:93, inputTop:25  },
			{ type:"input" , name:"mun_codigo", label:"Codigo:", labelAlign:"right", validate: "NotEmpty", inputWidth:80, labelLeft:6, labelTop:50, inputLeft:93, inputTop:50  },
			{ type:"input" , name:"mun_detalle", label:"Detalle:", labelAlign:"right", validate: "NotEmpty", inputWidth:217, labelLeft:6, labelTop:75, inputLeft:93, inputTop:75  },
			{ type:"button" , name:"edit_btn", label:"Button", value:"Modificar", width:"75", inputWidth:75, inputLeft:155, inputTop:100  },
			{ type:"button" , name:"save_btn", label:"Button", value:"Guardar", width:"75", inputWidth:75, inputLeft:235, inputTop:100  }
		];
		var me = this;	    
		me.form = panel.attachForm(str);
		me.form.lock();
		me.form.attachEvent("onButtonClick", function(name) {
			switch(name){
				case 'save_btn':				
					var data = me.form.getFormData();
					alert(data);
					if(me.form.validate()){
						var auxFind = me.grid.findCell(data.mun_codigo,1);
						var valCell = (auxFind != '')?me.grid.cells(auxFind[0][0],auxFind[0][1]).getValue():null;
						if(valCell != data.mun_codigo){
							me.form.send(mainPath+'index.php/municipio/save_data', function(loader, response) {
								var resData = response.split('-');
								if(resData[0] > 0){
									var id = me.grid.uid();
									me.grid.addRow(id, [resData[0],data.mun_codigo,data.mun_detalle,resData[1],data.mun_dpto]);									
									me.grid.selectRowById(id);
									me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
									me.form.clear();
									me.form.lock();
									actionBar.enableItem('btn_new');
								}
								else
									dhtmlx.alert({
										text: response
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
				break;
				case 'edit_btn':
					var rowId = me.grid.cells(me.grid.getSelectedRowId(),0).getValue();
					if(me.form.validate()){
						me.form.send(mainPath+'index.php/municipio/edit_data?id='+rowId, function(loader, response){
							var resData = response.split('-');
							if(resData[0] == true){
								var data = me.form.getFormData();
								me.grid.cells(rowId,2).setValue(data.mun_detalle);
								me.grid.cells(rowId,3).setValue(resData[1]);
								me.grid.cells(rowId,4).setValue(data.mun_dpto);
								me.grid.groupBy(3);
								me.grid.selectRowById(rowId);
								me.form.lock();
								me.form.clear();
								me.form.setItemFocus('btn_new');
							}
							else
								dhtmlx.alert({
									text: response
								});
						});
					}
					else
						dhtmlx.alert({
							text:"Error, Todos los campos de color rojo son necesarios."
						});
				break;
			}
		});
	},
	widgetMain: function(){
		muniClass.widgetWin();
		muniClass.widgetGrid();
		muniClass.widgetForm();
		actionBar.attachEvent("onClick", function(itemId){
			var me = muniClass;
			switch(itemId){
				case 'btn_new':
					actionBar.disableItem(itemId);
					me.form.clear();
					me.form.unlock();
					me.form.enableItem('mun_codigo');
					me.form.setItemFocus('mun_dpto');					
					me.form.disableItem('edit_btn');
					me.form.enableItem('save_btn');
				break;
				case 'btn_edit':
					var id = me.grid.getSelectedRowId();
					if(id != null){
						me.form.unlock();
						me.form.disableItem('save_btn');
						me.form.enableItem('edit_btn');
						me.form.setItemValue('mun_dpto', me.grid.cells(id,4).getValue());
						me.form.setItemValue('mun_codigo', me.grid.cells(id,1).getValue());
						me.form.setItemValue('mun_detalle', me.grid.cells(id,2).getValue());
						me.form.disableItem('mun_codigo');
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
									me.form.send(mainPath+'index.php/municipio/erase_data?id='+rowId, function(loader, response){
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