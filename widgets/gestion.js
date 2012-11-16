var gestionClass = {
	win: null,
	layout: null,
	form: null,
	grid: null,
	actionBar: null,	
	widgetWin: function(){
        var me = this;
		var windows = new dhtmlXWindows();
		me.win = windows.createWindow('window_1', 0, 0, 500, 200);
		me.win.setText('Gesti&oacute;n');
		me.win.clearIcon();
		me.win.button('park').hide();
		me.win.button('minmax1').hide();
		me.win.denyResize();
		me.win.setModal(1);
		me.win.centerOnScreen();		
        widgetBar(this.win,1);
		me.layout = me.win.attachLayout('2U');
	},	
	widgetGrid: function(){	
		var me = this;	
		var panel = me.layout.cells('a');
		panel.hideHeader();
		panel.fixSize(true, true);
        me.statusGrid = panel.attachStatusBar();

		me.grid = panel.attachGrid();		
		me.grid.setImagePath(mainPath+'dhtmlx/imgs/');
		me.grid.setHeader(["ID","Gesti&oacute;n","Estado"],null,["","text-align:center","text-align:center"]);
		me.grid.setColTypes("ro,ro,ra");
		me.grid.setColAlign("right,center,center");
		me.grid.setInitWidths("30,*,73");
		me.grid.init();
        me.grid.setColumnColor("#E5E5E5");
		me.grid.load(mainPath+"index.php/gestion/grid_data", function(){
			me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
		},"json");

        me.eventCheckStatusGrid();
	},
    eventCheckStatusGrid: function(){
        var me = this;
        me.grid.attachEvent("onCheck", function(rId){
            var id = me.grid.cells(rId,0).getValue();
            me.form.send(mainPath+'index.php/gestion/edit_data?id='+id+'&ges_status=1', function(loader, response){
                if(response == true){
                    me.grid.clearSelection();
                }
                else
                    dhtmlx.alert({
                        text: response
                    });
            });
        });
    },
	widgetForm: function(){
		var me = this,
            panel = me.layout.cells('b');
		panel.hideHeader();
		var str = [
			{ type:"settings" , labelWidth:80, inputWidth:250, position:"absolute"  },
			{ type:"input" , name:"ges_gestion", label:"Gesti&oacute;n:&nbsp;", labelAlign:"right", validate:"NotEmpty,ValidNumeric", inputWidth:75, labelLeft:30, labelTop:35, inputLeft:110, inputTop:35 },
			{ type:"button" , name:"btn_edit", label:"Button", value:"Modificar", width:"75", inputWidth:75, inputLeft:42, inputTop:60  },
			{ type:"button" , name:"btn_save", label:"Button", value:"Guardar", width:"75", inputWidth:75, inputLeft:125, inputTop:60  }
		];

		me.form = panel.attachForm(str);
		me.form.lock();
		me.form.attachEvent("onButtonClick", function(name) {
			switch(name){
				case 'btn_save':
                    var data = me.form.getFormData();
                    if(me.form.validate()){
                        var auxFind = me.grid.findCell(data.ges_gestion,1);
                        var valCell = (auxFind != '')?me.grid.cells(auxFind[0][0],auxFind[0][1]).getValue():null;
                        if (valCell != data.ges_gestion){
                            me.form.send(mainPath+'index.php/gestion/save_data', function(loader, response) {
                                if(response > 0){
                                    var id = me.grid.uid();
                                    me.grid.addRow(id, [response,data.ges_gestion,1]);
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
				case 'btn_edit':
                    var rowId = me.grid.cells(me.grid.getSelectedRowId(),0).getValue();
                    if(me.form.validate()){
                        var data = me.form.getFormData();
                        var auxFind = me.grid.findCell(data.ges_gestion,1);
                        var valCell = (auxFind != '')?me.grid.cells(auxFind[0][0],auxFind[0][1]).getValue():null;
                        if (valCell != data.ges_gestion){
                            me.form.send(mainPath+'index.php/gestion/edit_data?id='+rowId, function(loader, response){
                                if(response == true){
                                    me.grid.cells(rowId,1).setValue(data.ges_gestion);
                                    me.grid.clearSelection();
                                    me.form.lock();
                                    me.form.clear();
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
			}
		});
	},
	widgetMain: function(){
        var me = gestionClass;
		me.widgetWin();
		me.widgetGrid();
		me.widgetForm();
        actionBar.attachEvent("onClick", function(itemId){
			switch(itemId){
				case 'btn_new':
                    actionBar.disableItem(itemId);
					me.form.unlock();
					me.form.setItemFocus('ges_gestion');
                    me.form.disableItem('btn_edit');
                    me.form.enableItem('btn_save');
					//this.form.disableItem('btn_edit');
				break;
				case 'btn_edit':
                    var id = me.grid.getSelectedRowId();
                    if(id != null){
                        me.form.unlock();
                        me.form.disableItem('btn_save');
                        me.form.enableItem('btn_edit');
                        me.form.setItemValue('ges_gestion', me.grid.cells(id,1).getValue());
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
                                    if(me.grid.cells(me.grid.getSelectedRowId(),2).getValue() != 1){
                                        me.form.send(mainPath+'index.php/gestion/erase_data?id='+rowId, function(loader, response){
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
                                    else
                                        dhtmlx.alert({
                                            text:"No se puede eliminar porque la gestión esta activa."
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