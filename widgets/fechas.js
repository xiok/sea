var fechasClass = {
	parent: "parentId",
	pattern: "4H",
	win: null,
	form: null,
	grid: null,
	actionBar: null,
	layout: null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 565, 400);
		this.win.setText('Rango de Fechas para la Transcripción');
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
		//this.layout = this.win.attachLayout('2U');
		this.layout = this.win.attachLayout('3L');
	},
	widgetBar: function(){		
		this.actionBar =  this.win.attachToolbar();
		this.actionBar.setIconsPath('./images/icons32/');
		this.actionBar.setIconSize(32);
		this.actionBar.loadXML("xml/toolbar.xml");
		this.actionBar.setAlign('right');
	},
	widgetGrid: function(){
		/**
	 	 * DEL LAYOUT DEFINIDO DETERMINAMOS LA CELDA "A" AL DATAGRID
	     */
		var cell = this.layout.cells('c');
		cell.setWidth('300');
		cell.hideHeader();
		cell.fixSize(true, true);
		this.grid = cell.attachGrid();		
		this.grid.setImagePath('./dhtmlx/imgs/');
		//this.grid.setColumnIds("codigo_txt, detalle_txt");
		this.grid.setHeader(["C&oacute;digo","Detalle"],null,["text-align:center","text-align:center"]);
		this.grid.setColTypes("ro,ro");		
		this.grid.setColAlign("left,left");
		this.grid.setInitWidths("60,183");		
		this.grid.init();
		//this.grid.loadXML("index.php/dpto/grid_data");		
	},
	widgetForm: function(){
		var panel = this.layout.cells('b');
		panel.setWidth('300');
		panel.setHeight('125');
		panel.hideHeader();
		var str = [
			{ type:"settings" , labelWidth:80, inputWidth:250, position:"absolute"  },
			{ type:"combo" , name:"dep_depto", label:"Boleta:", labelAlign:"right", inputWidth:203, labelLeft:5, labelTop:15, inputLeft:88, inputTop:15  },			
			{ type:"calendar" , name:"form_calendar_1", label:"Fecha Inicio:", labelAlign:"right", inputWidth:95, options:{}, labelLeft:5, labelTop:40, inputLeft:88, inputTop:40},
			{ type:"calendar" , name:"form_calendar_2", label:"Fecha Final:", labelAlign:"right", inputWidth:95, options:{}, labelLeft:5, labelTop:65, inputLeft:88, inputTop:65},			
			{ type:"button" , name:"edit_btn", label:"Button", value:"Modificar", width:"75", inputWidth:75, inputLeft:135, inputTop:90  },
			{ type:"button" , name:"save_btn", label:"Button", value:"Guardar", width:"75", inputWidth:75, inputLeft:215, inputTop:90  }
		];
		var me = this;	    
		me.form = panel.attachForm(str);
		//me.form.lock();
		me.form.attachEvent("onButtonClick", function(name) {
			switch(name){
				case 'save_btn':				
					var data = me.form.getFormData();
					var cell = me.grid.findCell(data.dep_codigo,0);
					var auxi = null;
					if(cell != '')
						var auxi = me.grid.rowsAr[cell[0][0]].cells[cell[0][1]].innerText;										
					if(data.dep_codigo != auxi){
						me.form.send('index.php/dpto/save_data', function(loader, response) {
							if(response == true){								
								var id = me.grid.uid();
								me.grid.addRow(id, [data.dep_codigo,data.dep_detalle,"1"]);
								me.grid.selectRowById(id);
								me.form.clear();
								me.form.lock();
								me.actionBar.enableItem('btn_new');
							}
        				});
					}
					else
						dhtmlx.alert({
							text:"Error, ya existe el codigo '"+auxi.toUpperCase()+"', ingrese otro."
						});										
				break;
				case 'edit_btn':
					var id = me.grid.getSelectedRowId();
					me.form.send('index.php/dpto/edit_data?id='+id, function(loader, response) {
						if(response == true){
							me.grid.updateFromXML("index.php/dpto/grid_data");
							me.grid.clearSelection();
							me.form.lock();
							me.form.clear();
							me.form.setItemFocus('btn_new');
						}
					});
				break;
			}
		});
	},
	widgetTree: function(){
		var cell = this.layout.cells('a');
		cell.hideHeader();
		var tree = cell.attachTree();		
		tree.enableCheckBoxes(1);
		tree.enableThreeStateCheckboxes(true);
		tree.setIconsPath('./dhtmlx/imgs/');
		tree.loadXML('xml/tree.xml');
		tree.openAllItems('books');
	},
	widgetMain: function(){
		fechasClass.widgetWin();
		fechasClass.widgetForm();
		fechasClass.widgetTree();
		fechasClass.widgetGrid();		
		/*detailLayout.attachObject('detailDpto');
		dptoClass.actionBar.attachEvent("onClick", function(itemId){
			var me = dptoClass;
			switch(itemId){
				case 'btn_new':
					me.actionBar.disableItem(itemId);
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
						me.form.setItemValue('dep_codigo', me.grid.rowsAr[id].cells[0].innerText);
						me.form.setItemValue('dep_detalle', me.grid.rowsAr[id].cells[1].innerText);
						me.form.disableItem('dep_codigo');
					} else {
						dhtmlx.alert({
							text:"Error seleccione un Ítem para poder editar."
						});
					}
				break;
				case 'btn_erase':
					var id = me.grid.getSelectedRowId();
					if(id != null){
						dhtmlx.confirm({
							text:"¿Esta seguro que quieres eliminar el Ítem?",
							callback: function(status){
								if(status == true){
									me.grid.deleteSelectedRows();
									me.form.send('index.php/dpto/erase_data?id='+id);
								}
							}
						});
					} else {
						dhtmlx.alert({
							text:"Error seleccione un Ítem para poder eliminar."
						});
					}
				break;
				case 'btn_clear':
					me.form.lock();
					me.form.clear();
					me.form.setItemFocus('btn_new');
					me.actionBar.enableItem('btn_new');
					me.grid.clearSelection();					
				break;
			}
		});*/		
	}
};