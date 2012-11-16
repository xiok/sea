var disenadorClass = {
    //OBJECTO PRINCIPAL
    obj: null,
    //OBJECTOS WIDGET
    layout: null,
    tree: null,
    grid: null,
    form: null,
    //OBJECTOS ANIDADOS
    toolbarItems: null,
    toolbarTree: null,
    toolbarGrid: null,
    cellItems: null,
	//CONTADORES DE LOS OBJECTOS ITEM'S
    contAllItems:0,
	contLabel: 0,
	contInput: 0,
	contRadio: 0,
	contFile: 0,
	contGrid: 0,
    //WIDGET QUE CREA EL TAB DISEÑADOR
	widgetTab:function(){
        var me = this;
        //SI NO EXISTIERA EL TAB SE AÑADE UN NUEVO TAB
        mainTab.addTab("disTab", "Diseñador de Boletas", "150px", "-1");
        var disTab = mainTab.cells('disTab');
        mainTab.setTabActive("disTab");
        me.layout = disTab.attachLayout('3J');
	},
    //WIDGET QUE CREA EL TREE DENTRO DEL TAB
	widgetTree: function(){
        var me = this;
        //SE CREA LAS PROPIEDADES DE LA CELDA
        var cell = me.layout.cells('a');
		cell.setText('Listado del Elementos');
		cell.setWidth('200');
		cell.setHeight('300');
		cell.fixSize(true,true);
        //SE HACE UN -->ATTACH TIPO TOOLBAR DENTRO DE LA CELDA
		me.toolbarTree = cell.attachToolbar();
		me.toolbarTree.setIconsPath(mainPath+'images/icons/');
        me.toolbarTree.addButton("btn_up", 1, "", "icon_23.png", "icon_23d.png");
        me.toolbarTree.setItemToolTip("btn_up", "Mover hacia arriba");
        me.toolbarTree.addButton("btn_down", 2, "", "icon_22.png", "icon_22d.png");
        me.toolbarTree.setItemToolTip("btn_down", "Mover hacia abajo");
		me.toolbarTree.addSeparator("sep1", 3);
        me.toolbarTree.addSpacer("sep1");
        me.toolbarTree.addButton("btn_edit", 4, "", "icon_25.png", "icon_25d.png");
        me.toolbarTree.setItemToolTip("btn_edit", "Editar propiedades del Ítem");
		me.toolbarTree.addButton("btn_delete", 5, "", "icon_17.png", "icon_17d.png");
        me.toolbarTree.setItemToolTip("btn_delete", "Eliminar Ítem");
        me.toolbarTree.forEachItem(function(id) {
            me.toolbarTree.disableItem(id);
        });
		//SE HACE UN -->ATTACH DENTRO DE LA CELDA
		me.tree = cell.attachTree();
        /*
		toolbarTree.attachEvent("onClick", function(itemId){
			var idx, aux, pos;
			idx = me.tree.getIndexById(me.tree.getSelectedItemId());
			switch(itemId){
				case 'btn_up':
					if(me.tree.getSelectedItemId()){						
						aux = me.obj[idx-1];
						if(aux != null){							
							pos = me.obj.indexOf(idx-1);
							pos > -1 && me.obj.splice(pos, 1);							
							me.obj[idx-1] = me.obj[idx];
							pos = me.obj.indexOf(idx);							
							pos > -1 && me.obj.splice(pos, 1);							
							me.obj[idx] = aux;							
						}
						me.tree.moveItem(me.tree.getSelectedItemId(),'up');
						me.cellItems.attachForm(me.obj);						
					}
					else
						dhtmlx.alert({
							text:"Error seleccione un Ítem para poder mover."
						});
				break;
				case 'btn_down':				
					if(me.tree.getSelectedItemId()){						
						aux = me.obj[idx+1];
						if(aux != null){
							pos = me.obj.indexOf(idx+1);
							pos > -1 && me.obj.splice(pos, 1);
							me.obj[idx+1] = me.obj[idx];
							pos = me.obj.indexOf(idx);
							pos > -1 && me.obj.splice(pos, 1);
							me.obj[idx] = aux;
						}
						me.tree.moveItem(me.tree.getSelectedItemId(),'down');
						me.cellItems.attachForm(me.obj);
					}
					else
						dhtmlx.alert({
							text:"Error seleccione un Ítem para poder mover."
						});
				break;				
			}
		});
        */
	},
    //WIDGET QUE CREA EL DATAGRID DE PROPIEDADES
	widgetGrid:function(){
		var me = this,
        //SE CREA LAS PROPIEDADES DE LA CELDA
        cell = me.layout.cells('c');
		cell.setText('Propiedades del Elemento');
		cell.setWidth('200');
        //SE HACE UN -->ATTACH TIPO TOLLBAR DENTRO DE LA CELDA
		me.toolbarGrid = cell.attachToolbar();
		me.toolbarGrid.setIconsPath(mainPath+'images/icons/');
		me.toolbarGrid.addButton("btn_check", 1, "Verificar", "icon_24.png", "icon_24d.png");
        me.toolbarGrid.setItemToolTip("btn_check", "Verifica si los valores de las propiedades son correctas");
        me.toolbarGrid.forEachItem(function(id) {
            me.toolbarGrid.disableItem(id);
        });
        //SE LLAMA EL EVENTO -->Click PARA VERIFICAR LOS DATOS DEL GRIDPROPERTY
        me.eventClickCheckGridProperty();
        //SE HACE UN -->ATTACH TIPO GRIDPROPERTY DENTRO DE LA CELDA
		me.grid = cell.attachPropertyGrid();
        me.grid.enableValidation(true);
		me.grid.setInitWidths("100,*");
		me.grid.init();
        //SE LLAMA AL EVENTO -->EditCell PARA ASIGNAR NUEVOS VALORES AL OBJECTO PRINCIPAL
        me.eventEditCellGridProperty();


        //});
        //$get(me.grid).focus();

		//var str = Array();
		//var id;
        /*
		this.grid.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
			if(stage == 2){
				switch(me.typeField){
					case 'text':
						id = me.contLabel;
						switch(rId){
							case '1':
								me.items.label = nValue;								
							break;
							case '2':
								nValue == '1'?me.items.className = "fontBold":me.items.className = "fontNormal";
							break;
							case '3':
								me.items.labelWidth = nValue;
								me.items.width = nValue;
							break;
						}
					break;
					case 'input':
						id = me.contInput;
						switch(rId){
							case '1':
								me.items.label = nValue;
							break;
							case '2':
								if(nValue != ''){
									if(nValue == 'i' || nValue == 'I')
										me.items.labelAlign = 'left';
									else if(nValue == 'd' || nValue == 'D')
										me.items.labelAlign = 'right';
									else if(nValue == 'c' || nValue == 'C')
										me.items.labelAlign = 'center';
								}
							break;
							case '3':
								me.items.position = "label-"+nValue;
							break;
							case '4':
								me.items.labelWidth = nValue;
							break;
							case '5':
								me.items.inputWidth = nValue;
							break;
						}
					break;
					case 'radioBox':
						id = me.contRadio;
						switch(rId){
							case '1':
								me.items.label = nValue;								
							break;
							case '2':
								me.items.labelAlign = nValue;
							break;
							case '3':
								me.items.labelWidth = nValue;								
							break;
							case '4':
								me.items.name = nValue;
							break;
							case '5':
								me.items.value = nValue;
							break;
						}
					break;
					case 'file':
						id = me.contFile;
						switch(rId){
							case '1':
								me.items.label = nValue;
							break;
							case '2':
								if(nValue != ''){
									if(nValue == 'i' || nValue == 'I')
										me.items.labelAlign = 'left';
									else if(nValue == 'd' || nValue == 'D')
										me.items.labelAlign = 'right';
									else if(nValue == 'c' || nValue == 'C')
										me.items.labelAlign = 'center';
								}
							break;
							case '3':
								me.items.position = "label-"+nValue;
							break;
							case '4':
								me.items.labelWidth = nValue;
							break;
						}
					break;
				}								
				var pos = me.obj.indexOf(id);
				pos > -1 && me.obj.splice(pos, 1);
				
				//me.obj[id] = me.items;
				
				//console.log(me.obj);
				//me.form.removeItem('Texto_'+id);
				//console.log(me.obj);
				me.cellItems.attachForm(me.obj);
			}
			return true;
		});
        */
	},
    //WIDGET QUE CREA EL CONTENEDOR DE ITEM'S
    widgetItems: function(){
        var me = this;
        //SE CREA LAS PROPIEDADES DE LA CELDA
        me.cellItems = me.layout.cells('b');;
        me.cellItems.setText('Adcionar Elementos');
        //SE HACE UN -->ATTACH TIPO TOOLBAR DENTRO DE LA CELDA
        me.toolbarItems = me.cellItems.attachToolbar();
        me.toolbarItems.setIconsPath(mainPath+'images/icons/');
        me.toolbarItems.loadXML(mainPath+"xml/items.xml", function() {
            me.toolbarItems.setItemText("info", me.nameBoleta);
            me.toolbarItems.addSpacer("sep_1");
        });
        //SE LLAMA AL METODO QUE MANEJARA EL EVENTO CLICK DE LOS BOTONES DEL TOOLBAR
        me.eventClickItems();
    },

    //METODO QUE MANEJA EL EVENTO CLICK DEL METODO "widgetItems"
    eventClickItems: function(){
        var me = this,
            items,
            nameId;
        me.obj = Array();
        me.toolbarItems.attachEvent("onClick", function(itemId){
            nameId = itemId.split('_');
            if(nameId[1] != 'end' && nameId[1] != 'cut'){
                items = me.getPropertyItems(itemId);
                if(items){
                    me.grid.loadXML(mainPath + "xml/"+nameId[1]+".xml", function () {
                        me.grid.selectCell(1,1,false,false,true);
                    });

                    me.enabledDisabledToolbars(true);
                    me.obj.push(items);
                    me.form = me.cellItems.attachForm(me.obj);
                }
            }
        });
        /*
         me.toolbarItems.attachEvent("onClick", function(itemId){
         //SE BORRA EL CONTENIDO DEL DATAGRID
         me.grid.clearAll();
         switch(itemId){
         case 'btn_texto':
         /*
         me.contLabel++;
         me.typeField = 'text';

         me.items = new Object;
         me.items.type = "label";
         me.items.offsetLeft = 15;
         me.items.name = "Texto_"+me.contLabel;
         me.items.label = "Texto_"+me.contLabel;
         me.items.labelWidth = 50;
         me.items.width = 50;
         *
         me.grid.loadXML(mainPath+"xml/label.xml", function(){
         me.grid.selectCell(0,1,0,0,1);
         });
         me.enabledDisabledItemsToolbar(true);
         me.tree.insertNewItem(0,me.contLabel,"Texto_"+me.contLabel,0,0,0,0,'SELECT');
         break;
         case 'btn_campo':
         me.contInput++;
         me.typeField = 'input';

         me.items = new Object;
         me.items.type = "input";
         me.items.name = "Campo_"+me.contInput;
         me.items.label = "Campo_"+me.contInput;
         me.items.labelAlign = "right";
         me.items.position = "label-left";
         me.items.labelWidth = 57;
         me.items.inputWidth = 400;
         me.items.validate = "NotEmpty,ValidNumeric";

         me.grid.loadXML("xml/input.xml");

         me.tree.insertNewItem(0,me.contInput,"Campo_"+me.contInput,0,0,0,0,'SELECT');
         break;
         case 'btn_radio':
         me.contRadio++;
         me.typeField = "radioBox";

         me.items = new Object;
         me.items.type = "radio";
         me.items.value = "",
         me.items.label = "Opcion_"+me.contRadio;
         me.items.labelAlign = "right";
         me.items.position = "label-left";
         me.items.labelWidth = 57;

         me.grid.loadXML("xml/radio.xml");

         me.tree.insertNewItem(0,me.contRadio,"Opcion_"+me.contRadio,0,0,0,0,'SELECT');
         break;
         case 'btn_archivo':
         me.contFile++;
         me.typeField = "file";

         me.items = new Object;
         me.items.type = "file";
         me.items.label = "Archivo_"+me.contFile;
         me.items.labelWidth = 60;
         me.items.labelAlign = "right";
         me.items.position = "label-left";

         me.grid.loadXML("xml/file.xml");

         me.tree.insertNewItem(0,me.contFile,"Opcion_"+me.contFile,0,0,0,0,'SELECT');
         break;
         case 'btn_grid':
         me.contGrid++;

         me.items = new Object;
         me.items.type = "container";
         me.items.name = "Grid_"+me.contGrid;
         //me.items.labelAlign = "right";
         me.items.position = "label-top";
         dataGrid[me.contGrid] = "Grid_"+me.contGrid;

         me.items.label = "1.1. ¿Cuál fue el número de áreas o campos deportivos disponibles en su municipio hasta la  gestión 2011?";
         me.items.labelWidth = 550;

         me.items.inputWidth = 300;
         me.items.inputHeight = 200;
         break;
         }

         if(me.items != null){
         me.obj.push(me.items);
         me.form = me.cellItems.attachForm(me.obj,'dede');
         me.cellItems._offsetLeft = 20;
         me.form.enableLiveValidation(true);
         }
         if(me.contGrid > 0){
         for(var i=1;i<=me.contGrid;i++)
         var d1 = new dhtmlXGridObject(me.form.getContainer(dataGrid[i]));
         //s=0;
         }

         });
         */
    },
    //METODO QUE MANEJA EL EVENTO CLICK DEL METODO "widgetGrid"
    eventClickCheckGridProperty: function(){
        var combo,
            sw = true,
            me = this;

        me.toolbarGrid.attachEvent("onClick", function(itemId){
            me.grid.forEachRow(function(id){
                sw = me.grid.validateCell(id, 1);
                sw == null?sw = true:'';
            });
            if(sw){
                if(me.grid.cells(1,1).getValue().split(" ")[1] != ''){
                    me.enabledDisabledToolbars(false);
                    me.grid.clearAll();
                    me.tree.insertNewItem(0,me.contAllItems,"Ítem "+me.contAllItems,0,0,0,0,'SELECT');
                }
                else{
                    dhtmlx.alert({
                        text: "Seleccione una PREGUNTA para asignar al Ítem creado."
                    });
                    me.contAllItems++;
                    combo = me.grid.getCustomCombo(1,1);
                    combo.put('PRE'+me.contAllItems,'PREGUNTA '+me.contAllItems);
                    combo.save();
                    combo.restore();
                }
            }
            else
                dhtmlx.alert({
                    text: "Los campos de color 'ROJO' son necesarios, ingreselos!!!"
                });
        })
    },
    eventEditCellGridProperty: function(){
        var typeObj,
            me = this;
        me.grid.attachEvent("onEditCell", function(stage,rId,cInd,nValue){
            typeObj = me.obj[me.obj.length-1].type;
            if(stage == 2 && nValue != ''){
                me.setPropertyItems(typeObj,rId,nValue);
                me.cellItems.attachForm(me.obj);
            }
            return true;
        });
    },
    //METODO DONDE SE OBTIENE LAS PROPIEDADES DE CADA ITEMS
    getPropertyItems: function(itemId){
        var me = this,
            item = new Object();
        switch(itemId){
            case 'btn_label':
                me.contLabel++;

                item.type = "label";
                item.name = "Texto_"+me.contLabel;
                item.label = "Texto_"+me.contLabel;
                item.labelWidth = 300;
                item.width = 300;
            break;
            case 'btn_input':
                me.contInput++;

                item.type = "input";
                item.name = "Campo_"+me.contInput;
                item.label = "Campo_"+me.contInput;
                item.labelAlign = "right";
                item.position = "label-left";
                item.labelWidth = 57;
                item.inputWidth = 400;
                item.tooltip = "";
                item.info = true;
                item.note = {text: "Nota del Campo"};
                item.validate = "";
            break;
        }
        item.offsetLeft = 15;
        return item;
    },
    //
    setPropertyItems: function(typeItem,row,value){
        var aux,
            me = this;
        switch(typeItem){
            case 'label':
                switch(row){
                    case '2':
                        me.obj[me.obj.length-1].label = value;
                    break;
                    case '3':
                       value == 'Si'?me.obj[me.obj.length-1].className = "fontBold":me.obj[me.obj.length-1].className = "fontNormal";
                    break;
                    case '4':
                        me.obj[me.obj.length-1].labelWidth = value;
                        me.obj[me.obj.length-1].width = value;
                    break;
                }
            break;
            case 'input':
                switch(row){
                    case '2':
                        me.obj[me.obj.length-1].label = value;
                    break;
                    case '3':
                        (value == 'Izquierda')?aux = 'left':aux='right';
                        me.obj[me.obj.length-1].labelAlign = aux;
                    break;
                    case '4':
                        if(value == 'Superior')
                            aux = 'label-top';
                        else if(value == 'Izquierda')
                            aux = 'label-left';
                        else
                            aux = 'label-right';
                        me.obj[me.obj.length-1].position = aux;
                    break;
                    case '5':
                        me.obj[me.obj.length-1].labelWidth = value;
                    break;
                    case '6':
                        me.obj[me.obj.length-1].inputWidth = value;
                    break;
                    case '7':
                        if(value == 'No Vacio')
                            aux = 'NotEmpty';
                        else if(value == 'Numerico')
                            aux = 'ValidInteger';
                        else
                            aux = '';
                        me.obj[me.obj.length-1].validate = aux
                    break;
                    case '8':
                        if(value == 'No'){
                            me.obj[me.obj.length-1].info = false;
                            me.obj[me.obj.length-1].note = {text: ''};
                        }
                    break;
                    case '9':
                        me.obj[me.obj.length-1].note = {text: value};
                        break;
                    case '10':
                        me.obj[me.obj.length-1].tooltip = value
                    break;
                }
            break;
        }
        return;
    },
    //METODO QUE HABILITA Y DESHABILITA TODOS LOS TOOLBAR DEL TAB
    enabledDisabledToolbars: function(status){
        var me = this;
        if(status){
            me.toolbarItems.forEachItem(function(id) {
                me.toolbarItems.disableItem(id);
            });
            me.toolbarTree.forEachItem(function(id) {
                me.toolbarTree.disableItem(id);
            });
            me.toolbarGrid.forEachItem(function(id) {
                me.toolbarGrid.enableItem(id);
            });
        }
        else{
            me.toolbarItems.forEachItem(function(id) {
                me.toolbarItems.enableItem(id);
            });
            me.toolbarTree.forEachItem(function(id) {
                me.toolbarTree.enableItem(id);
            });
            me.toolbarGrid.forEachItem(function(id) {
                me.toolbarGrid.disableItem(id);
            });
        }
    },
    //METODO PRINCIPAL
	widgetMain: function(nameBol){
        //SE VERIFICA LA EXISTENCIA DEL TAB
        if(!searchTab('disTab')){
            var me = disenadorClass;
            me.nameBoleta = 'Código de Boleta: <strong>'+nameBol+'</strong>';
            me.widgetTab();
            me.widgetTree();
            me.widgetGrid();
            me.widgetItems();

            //me.toolbarItems.setItemText('info', 'Código de Boleta: ');
            /*
            */
            /*
            usuariosClass.widgetGrid();
            usuariosClass.actionBar.attachEvent("onClick", function(itemId){
                var me = dptoClass;
                switch(itemId){
                    case 'btn_new':
                        usuariosClass.widgetWin('Adicionar Usuarios');
                    break;
                }
            });
            */
        }
        else
            //SI EXISTIERA SE LO ACTIVA COMO PRINCIPAL
            mainTab.setTabActive("disTab");
	}
};