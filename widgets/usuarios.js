var usuariosClass;
usuariosClass = {
    win:null,
    form:null,
    grid:null,
    layout:null,
    widgetTab:function () {
        mainTab.addTab("usutab", "Usuarios", "", "-1");
        mainTab.setTabActive("usutab");

        widgetBar(mainTab.cells("usutab"), 3);
    },
    widgetWin:function (text) {
        var windows = new dhtmlXWindows();
        this.win = windows.createWindow('window_1', 0, 0, 675, 210);
        this.win.setText(text);
        this.win.clearIcon();
        this.win.button('park').hide();
        this.win.button('minmax1').hide();
        this.win.denyResize();
        this.win.setModal(1);
        this.win.centerOnScreen();

        this.widgetForm();
    },
    widgetForm:function () {
        var str = [
            { type:"settings", labelWidth:115, inputWidth:250, position:"absolute"  },
            { type:"label", name:"form_label_1", label:"Datos Personales", width:250, labelWidth:250, labelAlign:"left", labelLeft:10, labelTop:5  },
            { type:"input", name:"usu_nombres", label:"Nombre(s):", validate:"NotEmpty", labelAlign:"right", inputWidth:195, labelLeft:7, labelTop:35, inputLeft:125, inputTop:35  },
            { type:"input", name:"usu_paterno", label:"Apellido Paterno:", validate:"NotEmpty", labelAlign:"right", inputWidth:195, labelLeft:7, labelTop:60, inputLeft:125, inputTop:60  },
            { type:"input", name:"usu_materno", label:"Apellido Materno:", validate:"NotEmpty", labelAlign:"right", inputWidth:195, labelLeft:7, labelTop:85, inputLeft:125, inputTop:85  },
            { type:"input", name:"usu_email", label:"Correo Electrónico:", validate:"NotEmpty,ValidEmail", labelAlign:"right", inputWidth:195, labelLeft:7, labelTop:110, inputLeft:125, inputTop:110  },
            { type:"label", name:"form_label_3", label:"Datos de Usuario", width:250, labelWidth:250, labelAlign:"left", labelLeft:330, labelTop:5  },

            { type:"select", name:"usu_rol", label:"Rol de Usuario:", validate:"NotEmpty", labelAlign:"right", connector:mainPath + "index.php/roles/combo_data", inputWidth:195, labelLeft:335, labelTop:35, inputLeft:453, inputTop:35  },
            { type:"input", name:"usu_login", label:"Login de Usuario:", validate:"NotEmpty", labelAlign:"right", inputWidth:195, labelLeft:335, labelTop:60, inputLeft:453, inputTop:60  },
            { type:"password", name:"usu_pass", label:"Contraseña:", validate:"NotEmpty", labelAlign:"right", inputWidth:195, labelLeft:335, labelTop:85, inputLeft:453, inputTop:85  },
            { type:"password", name:"usu_pass2", label:"Repetir Contraseña:", validate:"NotEmpty", labelAlign:"right", inputWidth:195, labelLeft:335, labelTop:110, inputLeft:453, inputTop:110  },
            { type:"checkbox", name:"usu_notificar", label:"Notificar por Email:", checked:true, labelWidth:125, labelAlign:"right", labelLeft:325, labelTop:135, inputLeft:451, inputTop:132  },
            { type:"button", name:"edit_btn", label:"Button", value:"Modificar", width:"75", inputWidth:75, inputLeft:493, inputTop:135  },
            { type:"button", name:"save_btn", label:"Button", value:"Guardar", width:"75", inputWidth:75, inputLeft:573, inputTop:135  }
        ];
        var me = this;
        me.form = this.win.attachForm(str);
        me.form.disableItem('usu_login');
        me.form.getInput("usu_nombres").onkeyup = function (keyValue) {
            var data1 = me.form.getFormData();
            var data2 = keyValue.target.value.replace(/^\s*|\s*$/g, "");
            if (data2.length <= 1) {
                var char1 = data2 + data1.usu_paterno.replace(/^\s*|\s*$/g, "");
                me.form.setItemValue("usu_login", char1.toLowerCase());
            }
        }
        me.form.getInput("usu_paterno").onkeyup = function (keyValue) {
            var data1 = me.form.getFormData();
            var data2 = data1.usu_nombres.replace(/^\s*|\s*$/g, "");
            var char1 = data2.charAt(0) + keyValue.target.value.replace(/^\s*|\s*$/g, "");
            me.form.setItemValue("usu_login", char1.toLowerCase());
        }
        me.form.attachEvent("onButtonClick", function (name) {
            switch (name) {
                case 'save_btn':
                    var data = me.form.getFormData();
                    if (me.form.validate()) {
                        if (data.usu_pass == data.usu_pass2) {
                            me.form.send(mainPath + 'index.php/usuarios/save_data', function (loader, response) {
                                var resData = response.split('-');
                                if (resData[0] > 0) {
                                    var id = me.grid.uid();
                                    var name = data.usu_nombres + ' ' + data.usu_paterno + ' ' + data.usu_materno;
                                    var id = me.grid.uid();
                                    me.grid.addRow(id, [resData[0], resData[1], data.usu_rol, data.usu_nombres, data.usu_paterno, data.usu_materno, name, data.usu_email, data.usu_login, '****************']);
                                    me.grid.selectRowById(id);
                                    me.statusGrid.setText("Numero de Registros: " + me.grid.getRowsNum());
                                    actionBar.enableItem('btn_new');
                                    asigUserClass.widgetMain(resData[0]);
                                    me.win.close();
                                }
                                else
                                    dhtmlx.alert({
                                        text:response
                                    });
                            });
                        }
                        else
                            dhtmlx.alert({
                                text:"Error, Las constraseña no coiciden."
                            });
                    }
                    else
                        dhtmlx.alert({
                            text:"Error, Todos los campos de color rojo son necesarios."
                        });
                    break;
                case 'edit_btn':
                    var rowId = me.grid.cells(me.grid.getSelectedRowId(), 0).getValue();
                    if (me.form.validate()) {
                        var data = me.form.getFormData();
                        if (data.usu_pass == data.usu_pass2) {
                            me.form.send(mainPath + 'index.php/usuarios/edit_data?id=' + rowId, function (loader, response) {
                                if (response) {
                                    me.grid.clearAll();
                                    me.widgetLoadDataGrid();
                                    me.grid.clearSelection();
                                    asigUserClass.widgetMain(rowId);
                                    var usuario=me.form.getItemValue("usu_nombres")+" "+me.form.getItemValue("usu_paterno")+" "+me.form.getItemValue("usu_materno");
                                    var rol=me.form.getItemValue("usu_rol");
                                    asigUserClass.form.setItemText("label1","<b>Usuario: </b>"+usuario);
                                    asigUserClass.form.setItemText("label2","<b>Rol: </b>"+rol);
                                    me.win.close();
                                }
                            });
                        }
                        else
                            dhtmlx.alert({
                                text:"Error, Las constraseña no coiciden."
                            });
                    }
                    else
                        dhtmlx.alert({
                            text:"Error, Todos los campos de color rojo son necesarios."
                        });
                    break;
                case 'mio':
                    asigUserClass.widgetMain();
                    break;
            }
        });
    },
    widgetGrid:function () {
        var me = this;
        me.statusGrid = mainTab.cells("usutab").attachStatusBar();

        me.grid = mainTab.cells("usutab").attachGrid();
        me.grid.setHeader("Id,Rol,rolCodigo,name, apaterno, amaterno,Nombre(s) y Apellidos,Correo Electronico, Login, Contraseña");
        me.grid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
        me.grid.setColAlign("right,left,left,left,left,left,left,left,left,left");
        me.grid.setInitWidths("30,*,*,*,*,*,*,*,175,*");
        me.grid.init();

        me.widgetLoadDataGrid();
    },
    widgetLoadDataGrid:function () {
        var me = this;
        me.grid.load(mainPath + "index.php/usuarios/grid_data", function () {
            me.grid.groupBy(1);
            me.grid.setColumnHidden(1, true);
            me.grid.setColumnHidden(2, true);
            me.grid.setColumnHidden(3, true);
            me.grid.setColumnHidden(4, true);
            me.grid.setColumnHidden(5, true);
            me.statusGrid.setText("Numero de Registros: " + me.grid.getRowsNum());
        }, "json");
    },
    widgetMain:function () {
        if (!searchTab('usutab')) {
            usuariosClass.widgetTab();
            usuariosClass.widgetGrid();
            actionBar.attachEvent("onClick", function (itemId) {
                var me = usuariosClass;
                switch (itemId) {
                    case 'btn_new':
                        me.widgetWin('Adicionar Usuarios');
                        me.form.disableItem('edit_btn');
                        me.form.enableItem('save_btn');
                        me.form.setItemFocus('usu_nombres');
                        break;
                    case 'btn_edit':
                        var id = me.grid.getSelectedRowId();
                        if (id != null) {
                            me.widgetWin('Editar Usuarios');
                            me.form.disableItem('save_btn');
                            me.form.enableItem('edit_btn');
                            me.form.setItemValue('usu_rol', me.grid.cells(id, 2).getValue());
                            me.form.setItemValue('usu_nombres', me.grid.cells(id, 3).getValue());
                            me.form.setItemValue('usu_paterno', me.grid.cells(id, 4).getValue());
                            me.form.setItemValue('usu_materno', me.grid.cells(id, 5).getValue());
                            me.form.setItemValue('usu_email', me.grid.cells(id, 7).getValue());
                            me.form.setItemValue('usu_login', me.grid.cells(id, 8).getValue());
                            me.form.setItemFocus('usu_pass');
                        }
                        else
                            dhtmlx.alert({
                                text:"Error seleccione un Ítem para poder editar."
                            });
                        break;
                    case 'btn_erase':
                        if (me.grid.getSelectedRowId() != null) {
                            var rowId = me.grid.cells(me.grid.getSelectedRowId(), 0).getValue();
                            dhtmlx.confirm({
                                text:"¿Esta seguro que quieres eliminar el Ítem?",
                                callback:function (status) {
                                    if (status == true) {
                                        me.grid.deleteSelectedRows();
                                        me.statusGrid.setText("Numero de Registros: " + me.grid.getRowsNum());
                                        dhtmlxAjax.getSync(mainPath + 'index.php/usuarios/erase_data?id=' + rowId);
                                    }
                                }
                            });
                        }
                        else
                            dhtmlx.alert({
                                text:"Error seleccione un Ítem para poder eliminar."
                            });
                        break;
                    case 'btn_print':
                        open(mainPath + 'index.php/usuarios/print_data');
                        break;
                    case 'btn_clear':
                        me.grid.expandAllGroups();
                        me.grid.clearSelection();
                        break;
                }
            });
        }
        else
            mainTab.setTabActive("usutab");
    }
};