var disenadorClass = {
    //DATOS DE LA BOLETA
    nameBol:null,
    partBol:null,
    //OBJECTOS PRINCIPAL
    obj:Array(),
    objDis:null,
    //INDICE DEL OBJECTO PRINCIPAL
    objKey:null,
    //OBJECTOS WIDGET
    layout:null,
    tree:null,
    grid:null,
    form:null,



    //OBJECTOS ANIDADOS
    toolbarItems:null,
    toolbarTree:null,
    toolbarGrid:null,
    cellItems:null,
    statusItem:null,
    //CONTADORES DE LOS OBJECTOS ITEM'S
    contAllItems:0,
    contLabel:0,
    contInput:0,
    contSelect:0,
    contRadio:0,
    contCheck:0,
    contFile:0,
    contCalendar:0,
    contGrid:0,
    //BANDERA QUE DETERMINA SI SE CREA O SE EDITA
    flag:false,
    //WIDGET QUE CREA EL TAB DISEÑADOR
    widgetTab:function () {
        var me = this;
        //SI NO EXISTIERA EL TAB SE AÑADE UN NUEVO TAB
        mainTab.addTab("disTab", "Diseñador de Boletas", "150px", "-1");
        var disTab = mainTab.cells('disTab');
        mainTab.setTabActive("disTab");
        me.layout = disTab.attachLayout('3J');
    },
    //WIDGET QUE CREA EL TREE DENTRO DEL TAB
    widgetTree:function () {
        var me = this;
        //SE CREA LAS PROPIEDADES DE LA CELDA
        var cell = me.layout.cells('a');
        cell.setText('Listado del Elementos');
        cell.setWidth('200');
        cell.setHeight('300');
        cell.fixSize(true, true);
        //SE HACE UN -->ATTACH TIPO TOOLBAR DENTRO DE LA CELDA
        me.toolbarTree = cell.attachToolbar();
        me.toolbarTree.setIconsPath(mainPath + 'images/icons/');
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
        me.toolbarTree.forEachItem(function (id) {
            me.toolbarTree.disableItem(id);
        });
        //SE HACE REFERENCIA AL EVENTO CLICK DEL TOOLBAR
        me.eventClickButtonsTree();
        //SE HACE UN -->ATTACH DENTRO DE LA CELDA
        me.tree = cell.attachTree();
        //SE HACE REFERENCIA AL EVENTO CLICK DE ALGUN ÍTEM DEL TREE
        me.eventClickItemsTree();
    },
    //WIDGET QUE CREA EL DATAGRID DE PROPIEDADES
    widgetGrid:function () {
        var me = this,
        //SE CREA LAS PROPIEDADES DE LA CELDA
            cell = me.layout.cells('c');
        cell.setText('Propiedades del Elemento');
        cell.setWidth('200');
        //SE HACE UN -->ATTACH TIPO TOLLBAR DENTRO DE LA CELDA
        me.toolbarGrid = cell.attachToolbar();
        me.toolbarGrid.setIconsPath(mainPath + 'images/icons/');
        me.toolbarGrid.addButton("btn_check", 1, "Verificar", "icon_24.png", "icon_24d.png");
        me.toolbarGrid.setItemToolTip("btn_check", "Verifica si los valores de las propiedades son correctas");
        me.toolbarGrid.addSeparator("sep1", 2);
        me.toolbarGrid.addButton("btn_cancel", 3, "Cancelar", "icon_17.png", "icon_17d.png");
        me.toolbarGrid.setItemToolTip("btn_cancel", "Cancela el Ítem");
        me.toolbarGrid.forEachItem(function (id) {
            me.toolbarGrid.disableItem(id);
        });
        //SE LLAMA EL EVENTO -->Click PARA VERIFICAR LOS DATOS DEL GRIDPROPERTY
        me.eventClickButtonsGridProperty();
        //SE HACE UN -->ATTACH TIPO GRIDPROPERTY DENTRO DE LA CELDA
        me.grid = cell.attachPropertyGrid();
        me.grid.enableValidation(true);
        me.grid.setInitWidths("100,*");
        me.grid.init();
        //SE LLAMA AL EVENTO -->EditCell PARA ASIGNAR NUEVOS VALORES AL OBJECTO PRINCIPAL
        me.eventEditCellGridProperty();
    },
    //WIDGET QUE CREA EL CONTENEDOR DE ITEM'S
    widgetItems:function () {
        var me = this;
        //SE CREA LAS PROPIEDADES DE LA CELDA
        me.cellItems = me.layout.cells('b');
        me.cellItems.setText('Adcionar Elementos');
        /**
         * Se crea un Toolbar el Diseñador Principal
         */
        me.statusItem = me.cellItems.attachStatusBar();
        //SE HACE UN -->ATTACH TIPO TOOLBAR DENTRO DE LA CELDA
        me.toolbarItems = me.cellItems.attachToolbar();
        me.toolbarItems.setIconsPath(mainPath + 'images/icons/');
        me.toolbarItems.loadXML(mainPath + "xml/items.xml", function () {
            me.toolbarItems.addSpacer("sep_1");
        });
        //SE LLAMA AL METODO QUE MANEJARA EL EVENTO CLICK DE LOS BOTONES DEL TOOLBAR
        me.eventClickItems();
    },
    eventClickItemsTree:function () {
        var id,
            aux,
            me = this;
        me.tree.setOnClickHandler(function (item) {
            id = me.tree.getIndexById(me.tree.getSelectedItemId());
            aux = me.obj[id].className;
            console.log(aux);
            for (var i in me.obj) {
                if (me.obj[i].className == 'fontBoldBorder')
                    me.obj[i].className = 'fontBold';
                else if (me.obj[i].className == 'fontNormalBorder')
                    me.obj[i].className = 'fontNormal';
            }
            switch (aux) {
                case 'fontBold':
                    me.obj[id].className = 'fontBoldBorder';
                    break;
                case 'fontBoldBorder':
                    me.obj[id].className = "fontBold";
                    break;
                case 'fontNormal':
                    me.obj[id].className = 'fontNormalBorder';
                    break;
                case 'fontNormalBorder':
                    me.obj[id].className = 'fontNormal';
                    break;
                case undefined:
                    me.obj[id].className = 'fontNormalBorder';
                    break;
            }
            me.cellItems.attachForm(me.obj);
        });
    },
    eventClickButtonsTree:function () {
        var idx,
            aux,
            me = this;
        me.toolbarTree.attachEvent("onClick", function (itemId) {
            if (me.tree.getSelectedItemId()) {
                idx = me.tree.getIndexById(me.tree.getSelectedItemId());
                switch (itemId) {
                    case 'btn_up':
                        aux = me.obj[idx - 1];
                        if (aux != null) {
                            me.obj[idx - 1] = me.obj[idx];
                            me.obj[idx] = aux;
                        }
                        break;
                    case 'btn_down':
                        aux = me.obj[idx + 1];
                        if (aux != null) {
                            me.obj[idx + 1] = me.obj[idx];
                            me.obj[idx] = aux;
                        }
                        break;
                    case 'btn_edit':
                        me.flag = true;
                        me.objKey = idx;
                        me.grid.loadXML(mainPath + "xml/" + me.obj[idx].type + ".xml", function () {
                            me.grid.selectCell(1, 1, false, false, true);
                            me.setDataInGridProperty(idx);
                        });
                        me.enabledDisabledToolbars(true);
                        console.log(me.obj[idx]);
                        break;
                    case 'btn_delete':
                        me.obj.splice(idx, 1);
                        me.tree.deleteItem(me.tree.getSelectedItemId(), true);
                        break;
                }
                (itemId == 'btn_up' || itemId == 'btn_down') ? me.tree.moveItem(me.tree.getSelectedItemId(), itemId.split('_')[1]) : null;
                //console.log(me.obj);
                me.cellItems.attachForm(me.obj);
            }
            else
                dhtmlx.alert({
                    text:"Error seleccion un Ítem para poder mover."
                });
        });
    },
    setDataInGridProperty:function (item) {
        var me = this;
        switch (me.obj[item].type) {
            case 'label':
                me.grid.cells(1, 1).setValue(me.obj[item].modulo);
                me.grid.cells(2, 1).setValue(me.obj[item].label);
                me.obj[item].className == "fontBoldBorder" ? me.grid.cells(3, 1).setValue('fontBold') : me.grid.cells(3, 1).setValue('fontNormal');
                me.grid.cells(4, 1).setValue(me.obj[item].labelWidth);
            break;
            case 'input':
                atributs = ["","","label","labelAlign","position","labelWidth","inputWidth","validate","tooltip"];
                !me.flag?id = parseInt(me.objDis.length) - 1:id = me.objKey;
                me.objDis[id][atributs[row]] = value;
            break;
            case '':
            break;
        }
    },


    //METODO QUE MANEJA EL EVENTO CLICK DEL METODO "widgetItems"
    eventClickItems:function () {
        var me = this,
            items,
            nameId;
        me.objDis = Array();
        me.toolbarItems.attachEvent("onClick", function (itemId) {
            nameId = itemId.split('_');
            if (nameId[1] != 'end' && nameId[1] != 'cut') {
                items = me.getPropertyItems(itemId);
                if (items) {
                    me.grid.loadXML(mainPath + "xml/" + nameId[1] + ".xml", function () {
                        me.grid.selectCell(1, 1, false, false, true);
                    });
                    me.enabledDisabledToolbars(true);
                    me.objDis.push(items);
                    me.form = me.cellItems.attachForm(me.objDis);
                }
            }
            else {
                switch (nameId[1]) {
                    case 'cut':
                        //ENVIO DE PARTE DEL FORMULARIO CREADO
                        var myObj = JSON.stringify(me.obj);
                        var loader = dhtmlxAjax.get(mainPath + "index.php/boleta/cut?obj=" + myObj + "&name=" + me.nameBol + "&part=" + me.partBol.split(' ')[1], function (loader) {
                            if (loader.xmlDoc.response) {
                                dhtmlx.alert({
                                    text:'Se hizo el CORTE correctamente a la Boleta: "' + me.nameBol + '"',
                                    callback: function(){
                                        mainTab.removeTab(mainTab.getActiveTab(), true);
                                    }
                                })
                            }
                            else
                                dhtmlx.alert({
                                    text:loader.xmlDoc.response
                                });
                        });
                        break;
                    case 'end':
                        break;
                }
            }
        });
    },
    /**
     * Metodo que maneja el Evento --Click-- en los Botones del ToolBar del widget GridProperty
     */
    eventClickButtonsGridProperty:function () {
        var sw = true,
            me = this,
            id;
        me.toolbarGrid.attachEvent("onClick", function (itemId) {
            //CUANDO SE PRECIONA EL BOTTON VERIFICAR
            if (itemId == 'btn_check') {
                // SE HACE UN BUCLE DE VERIFICACION DE PROPIEDADES DEL ITEM
                me.grid.forEachRow(function (id) {
                    sw = me.grid.validateCell(id, 1);
                    sw == undefined ? sw = true : null;
                });
                //SE VERIFICA SI HUBIESEN INGRESADO TODOS LOS DATOS
                if (sw) {
                    // SE VERIFICA QUE SE HAYA SELECCIONADO UN ITEM DEL ---> MODULO
                    if (me.grid.cells(1, 1).getValue().split(" ")[1] != '') {
                        if (!me.flag) {
                            //nameModulo = me.grid.cells(1,1).getCellCombo()._selOption.text;
                            //SE AÑADE EL ITEM CREADO AL ARRAY PRINCIPAL
                            me.objDis[me.objDis.length - 1].modulo = me.grid.cells(1, 1).getValue();
                            me.obj[me.contAllItems] = me.objDis[me.objDis.length - 1];
                            me.contAllItems++
                            //SE HABILITAN TODOS LOS TOOLBARS
                            me.enabledDisabledToolbars(false);
                            //SE BORRA LOS DATOS DEL GRIDPROPERTY
                            me.grid.clearAll();
                            //SE AÑADE UN NUEVO ITEM AL TREE
                            var name = me.objDis[me.objDis.length - 1].name.split('_');
                            var text = (me.objDis[me.objDis.length - 1].label.length > 16) ? me.objDis[me.objDis.length - 1].label.substr(0, 16) + '...' : me.objDis[me.objDis.length - 1].label;
                            var item = me.contAllItems + '.-' + '<span style="color: #990000;">' + name[0] + '</span>: <span style="color: #666666">' + text + '</span>';

                            me.tree.insertNewItem(0, me.contAllItems, item, 0, 0, 0, 0, 'SELECT');
                        }
                        else {
                            //SE HABILITAN TODOS LOS TOOLBARS
                            me.enabledDisabledToolbars(false);
                            //SE BORRA LOS DATOS DEL GRIDPROPERTY
                            me.grid.clearAll();
                            id = me.objKey;
                            var name = me.objDis[id].name.split('_');
                            var text = (me.objDis[id].label.length > 16) ? me.objDis[id].label.substr(0, 16) + '...' : me.objDis[id].label;
                            var item = (id + 1) + '.-' + '<span style="color: #990000;">' + name[0] + '</span>: <span style="color: #666666">' + text + '</span>';
                            me.tree.setItemText(id + 1, item);
                            me.flag = false;
                        }
                    }
                    else
                        dhtmlx.alert({
                            text:"Seleccione una MÓDULO  para asignar al Ítem creado."
                        });
                }
                else
                    dhtmlx.alert({
                        text:"Los campos de color 'ROJO' son necesarios, ingreselos!!!"
                    });
            }//CUANDO SE PRECIONA EL BOTTON CANCELAR
            else {
                //SE BORRA LOS DATOS DE GRIDPROPERTY
                me.grid.clearAll();
                //SE HABILITA TODOS LOS TOOLBARS
                me.enabledDisabledToolbars(false);
                //SE ELIMINA EL ULTIMO OBJECTO CREADO DEL DISEÑADOR
                (!me.flag) ? me.objDis.pop() : null;
                //SE CARGA NUEVAMENTE LOS OBJECTOS EN EL FORMULARIO
                me.form = me.cellItems.attachForm(me.objDis);
            }

        })
    },
    /**
     * Metodo que maneja el Evento --EditCell-- del widget GridProperty
     */
    eventEditCellGridProperty:function () {
        var typeObj,
            me = this;
        me.grid.attachEvent("onEditCell", function (stage, rId, cInd, nValue) {
            typeObj = me.objDis[me.objDis.length - 1].type;
            if (stage == 2 && nValue != '') {
                me.setPropertyItems(typeObj, rId, nValue);
                me.cellItems.attachForm(me.objDis);
            }
            return true;
        });
    },
    /**
     * Metodo donde asigna los datos por defecto al crear el Ítem
     *
     * @param itemId -- Tipo de Ítem para asignar sus propiedades
     * @return {Object}
     */
    getPropertyItems:function (itemId) {
        var me = this,
            item = new Object();
        switch (itemId) {
            case 'btn_label':
                me.contLabel++;

                item.type = "label";
                item.name = "Texto_" + me.contLabel;
                item.label = "Texto_" + me.contLabel;
                item.labelWidth = 300;
                item.width = 300;
            break;
            case 'btn_input':
                me.contInput++;

                item.type = "input";
                item.name = "Campo_" + me.contInput;
                item.label = "Campo_" + me.contInput;
                item.labelAlign = "right";
                item.position = "label-left";
                item.labelWidth = 57;
                item.inputWidth = 400;
                //item.info = true;
                //item.note = {text:"Nota del Campo"};
                item.validate = "";
            break;
            case 'btn_select':
                me.contSelect++;

                item.type = "select";
                item.name = "Select_"+me.contSelect;
                item.label = "Select_"+me.contSelect;
                item.labelWidth = 55;
                item.labelAlign = "left";
                item.inputWidth = 140;
                item.position = "label-left";
                break;
            case 'btn_radio':
                me.contRadio++;

                item.type = "radio";
                item.name = "Radio_"+me.contRadio;
                item.label = "Radio_"+me.contRadio;
                item.labelWidth = 45;
                item.labelAlign = "left";
                item.position = "label-left";
                item.value = "";
            break;
            case 'btn_checkbox':
                me.contCheck++;

                item.type = "checkbox";
                item.name = "Checkbox_"+me.contCheck;
                item.label = "Checkbox_"+me.contCheck;
                item.labelWidth = 67;
                item.labelAlign = "left";
                item.position = "label-left";
            break;
            case 'btn_file':
                me.contFile++;

                item.type = "file";
                item.name = "Archivo_"+me.contFile;
                item.label = "Subir_Archivo_"+me.contFile;
                item.labelWidth = 95;
                item.labelAlign = "left";
                item.position = "label-left";
            break;
            case 'btn_calendar':
                me.contCalendar++;

                item.type = "calendar";
                item.name = "Calendario_"+me.contCalendar;
                item.label = "Calendario_"+me.contCalendar;
                item.dateFormat = "%d-%m-%Y";
                item.readonly = true;
                item.labelWidth = 75;
                item.labelAlign = "left";
                item.inputWidth = 75;
                item.position ="label-left";
            break;
        }
        item.tooltip = "";
        item.offsetLeft = 15;
        return item;
    },
    /**
     * Metodo donde se asigna los nuevos valores al Ítem ya creado
     *
     * @param typeItem -- Tipo de Ítem para asiganar la nueva propiedad
     * @param row -- Numero de fila del GridProperty el cual asignara
     * @param value -- Nuevo valor a asignar
     */
    setPropertyItems:function (typeItem, row, value) {
        var id,
            atributs,
            me = this;
        switch (typeItem) {
            case 'label':
                atributs = ["","","label","className","labelWidth"];
            break;
            case 'input':
                atributs = ["","","label","labelAlign","position","labelWidth","inputWidth","validate","tooltip"];
            break;
            case 'select':
                atributs = ["","","label","labelAlign","position","labelWidth","inputWidth","tooltip"];
            break;
            case 'radio':
                atributs = ["","","name","label","labelAlign","position","labelWidth","value","tooltip"];
            break;
            case 'checkbox':
                atributs = ["","","label","labelAlign","position","labelWidth","tooltip"];
            break;
            case 'file':
                atributs = ["","","label","labelAlign","position","labelWidth","tooltip"];
            break;
            case 'calendar':
                atributs = ["","","label","labelAlign","position","labelWidth","inputWidth","tooltip"];
            break;
        }
        !me.flag?id = parseInt(me.objDis.length) - 1:id = me.objKey;
        me.objDis[id][atributs[row]] = value;
        return;
    },
    /**
     * Metodo que Habilita y Deshabilita todos los Toolbasr de Diseñador
     *
     * @param status -- Es el flag que determina la accion a tomar
     */
    enabledDisabledToolbars:function (status) {
        var me = this;
        if (status) {
            me.toolbarItems.forEachItem(function (id) {
                me.toolbarItems.disableItem(id);
            });
            me.toolbarTree.forEachItem(function (id) {
                me.toolbarTree.disableItem(id);
            });
            me.toolbarGrid.forEachItem(function (id) {
                me.toolbarGrid.enableItem(id);
            });
        }
        else {
            me.toolbarItems.forEachItem(function (id) {
                me.toolbarItems.enableItem(id);
            });
            me.toolbarTree.forEachItem(function (id) {
                me.toolbarTree.enableItem(id);
            });
            me.toolbarGrid.forEachItem(function (id) {
                me.toolbarGrid.disableItem(id);
            });
        }
    },
    //METODO PRINCIPAL
    widgetMain:function (nameBol, partBol, script) {
        //SE VERIFICA LA EXISTENCIA DEL TAB
        if (!searchTab('disTab')) {
            var me = disenadorClass;

            me.nameBol = nameBol;
            me.partBol = partBol;

            me.widgetTab();
            me.widgetTree();
            me.widgetGrid();
            me.widgetItems();

            me.statusItem.setText("Código de Boleta: <strong>" + me.nameBol + " - " + me.partBol + " :: </strong> Tipo de boleta: <strong>" + disenadorwinClass.typeBol + "</strong>");

            if (script != null) {
                me.enabledDisabledToolbars(false);
                me.obj = me.objDis = JSON.parse(script);
                me.cellItems.attachForm(me.obj);
                for (var i in me.obj) {
                    var name = me.obj[i].name.split('_');
                    var text = (me.obj[i].label.length > 16) ? me.obj[i].label.substr(0, 16) + '...' : me.obj[i].label;
                    var item = (parseInt(i) + 1) + '.-' + '<span style="color: #990000;">' + name[0] + '</span>: <span style="color: #666666">' + text + '</span>';

                    me.tree.insertNewItem(0, i, item, 0, 0, 0, 0, 'SELECT');
                }
            }
        }
        else
        //SI EXISTIERA SE LO ACTIVA COMO PRINCIPAL
            mainTab.setTabActive("disTab");
    }
};