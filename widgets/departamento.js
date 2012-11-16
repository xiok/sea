var dptoClass = {
	win: null,
	form: null,
	grid: null,
	statusGrid: null,
	layout: null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 600, 200);
		this.win.setText('Departamentos');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		//this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();
		/**
	 	 * SE ENVIA EL OBJECTO CONTENEDOR Y SE LLAMA AL OBJECTO UNICO TOOLBAR
	 	 */		
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
		me.grid.setHeader("Id,C&oacute;digo,Detalle");
		me.grid.setColTypes("ro,ro,ro");		
		me.grid.setColAlign("right,left,left");
		me.grid.setInitWidths("30,65,*");	
		me.grid.setColumnColor("#E5E5E5");
		me.grid.init();
		
		me.grid.load(mainPath+"index.php/dpto/grid_data", function(){
			me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
		},"json");								
	},
	widgetForm: function(){	
		/**
	 	 * DEL LAYOUT DEFINIDO DETERMINAMOS LA CELDA "B" AL FORMULARIO
	     */
		var cell = this.layout.cells('b');
		cell.setWidth('200');
		cell.hideHeader();
		var str = [
			{ type:"settings" , labelWidth:80, inputWidth:250, position:"absolute"  },
			{ type:"input" , name:"dep_codigo", label:"Codigo:", labelAlign:"right",  validate: function(v){return v.match(/^[a-zA-Z]{1,3}$/i)!=null;},/*validate: "NotEmpty",*/ inputWidth:80, labelLeft:-30, labelTop:25, inputLeft:53, inputTop:25  },
			{ type:"input" , name:"dep_detalle", label:"Detalle:", labelAlign:"right", validate: "NotEmpty", inputWidth:217, labelLeft:-30, labelTop:50, inputLeft:53, inputTop:50  },
			{ type:"button" , name:"edit_btn", label:"Button", value:"Modificar", width:"75", inputWidth:75, inputLeft:115, inputTop:75  },
			{ type:"button" , name:"save_btn", label:"Button", value:"Guardar", width:"75", inputWidth:75, inputLeft:195, inputTop:75  }
		];
		var me = this;	    
		me.form = cell.attachForm(str);
		me.form.lock();

		me.form.attachEvent("onValidateError", function (input, value, result){
			//any custom logic here
			console.log(input);
			//console.log(value);
			console.log(result);
			/*
			switch(input){
				case 'dep_codigo':
					dhtmlx.alert({
						text: "El campo 'CODIGO' solo se permiten letras o numeros con un maximo de 3 caracteres."
					});
				break;
			}
			return;			
			*/
		});
		me.form.attachEvent("onButtonClick", function(name) {			
			switch(name){
				case 'save_btn':				
					var data = me.form.getFormData();
					if(me.form.validate()){
						var auxFind = me.grid.findCell(data.dep_codigo,1);
						var valCell = (auxFind != '')?me.grid.cells(auxFind[0][0],auxFind[0][1]).getValue():null;
						if(valCell != data.dep_codigo){
							me.form.send(mainPath+'index.php/dpto/save_data', function(loader, response) {
								if(response > 0){
									var id = me.grid.uid();
									me.grid.addRow(id, [response,data.dep_codigo,data.dep_detalle]);
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
						me.form.send(mainPath+'index.php/dpto/edit_data?id='+rowId, function(loader, response){
							if(response == true){
								me.grid.cells(rowId,2).setValue(me.form.getFormData().dep_detalle);
								me.grid.clearSelection();
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
		dptoClass.widgetWin();
		dptoClass.widgetGrid();
		dptoClass.widgetForm();
		detail.attachObject('detailDpto');
		actionBar.attachEvent("onClick", function(itemId){
			var me = dptoClass;
			switch(itemId){
				case 'btn_new':
					actionBar.disableItem(itemId);
					me.form.clear();
					me.form.unlock();
					me.form.enableItem('dep_codigo');
					me.form.setItemFocus('dep_codigo');					
					me.form.disableItem('edit_btn');
					me.form.enableItem('save_btn');
				break;
				case 'btn_edit':
					var id = me.grid.getSelectedRowId();
					if(id != null){
						me.form.unlock();		
						me.form.disableItem('save_btn');
						me.form.enableItem('edit_btn');
						me.form.setItemValue('dep_codigo', me.grid.cells(id,1).getValue());
						me.form.setItemValue('dep_detalle', me.grid.cells(id,2).getValue());
						me.form.disableItem('dep_codigo');
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
									me.form.send(mainPath+'index.php/dpto/erase_data?id='+rowId, function(loader, response){
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