var mensajesClass
mensajesClass = {
    parent:"parentId",
    pattern:"4H",
    win:null,
    form:null,
    grid:null,
    actionBar:null,
    layout:null,
    str:null,
    fila:null,
    sb:null,
    statusGrid:null,
    widgetTab:function () {
        mainTab.addTab("mentab", "Mensajes", "125px", "-1");
        mainTab.setTabActive("mentab");
        this.widgetBar();
        this.layout = mainTab.cells("mentab").attachLayout('2E');
    },
    widgetBar:function () {
        this.actionBar = mainTab.cells("mentab").attachToolbar();
        this.actionBar.setIconsPath(mainPath + "/images/icons32/");
        this.actionBar.setIconSize(32);
        this.actionBar.loadXML(mainPath + "xml/toolbarMensaje.xml");
        this.actionBar.setAlign('left');
    },
    widgetForm:function () {
        var panel = this.layout.cells('b');
        panel.setWidth('700');
        panel.hideHeader();
        this.str = [
            { type:"editor", name:"input1", labelAlign:"left", inputWidth:1150, inputHeight:230, labelLeft:5, labelTop:5, inputLeft:5, inputTop:5, rows:8}
        ];
        var me = this;
        me.form = panel.attachForm(me.str);
    },

    widgetGrid:function () {
        var cell = this.layout.cells('a');
        cell.hideHeader();
        var me = this;
        me.statusGrid = cell.attachStatusBar();
        me.grid = cell.attachGrid();
        me.grid.setHeader("Nombre(s) y Apellidos,Correo Electronico, Estado, Fecha, Descripcion,id");
        me.grid.setColTypes("ro,ro,ro,ro,ro,ro");
        me.grid.setColAlign("left,left,left,left,left,left");
        me.grid.setInitWidths("*,450,65,*,0,35");
        me.grid.setColumnHidden(5,true);
        me.grid.init();
        me.widgetCargar(0);
    },

    widgetCargar:function (val) {
        var me= this;
        me.grid.clearAll();
        me.grid.load(mainPath + "index.php/mens/grid_data?id=" + val + "&usu=" + idUsuario, function () {
            me.statusGrid.setText("Numero de Registros: " + me.grid.getRowsNum());
            if(val==0){
                me.grid.forEachRow(function(id){
                    if(me.grid.cells(id, 2).getValue()=="No Leido")
                        me.grid.setRowColor(id,"Skyblue");
                });
                me.grid.groupBy(2);
                me.grid.setColumnHidden(2,true);
            }
            me.grid.setColumnHidden(4,true);
        }, "json");
    },
    widgetAlert:function () {
        alert("Mensajes");
    },
    widgetMain:function () {
        if(!searchTab('mentab')){
            var me=this;
            me.widgetTab();
            me.widgetGrid();
            me.widgetForm();
            var sw=0;
            me.actionBar.attachEvent("onClick", function (itemId) {
                switch (itemId) {
                    case 'btn_nuevo':
                        envioClass.widgetMain();
                        break;
                    case 'btn_entrada':
                        me.widgetCargar(0);
                        sw=0;
                        break;
                    case 'btn_salida':
                        me.widgetCargar(2);
                        sw=1
                        break;
                    case 'btn_borrador':
                        me.widgetCargar(1);
                        sw=1
                        break;
                    case 'btn_reenviar':
                        sw=1;
                        envioClass.widgetMain();
                        envioClass.form.setItemValue("mens_asunto", me.grid.cells(fila, 1).getValue());
                        envioClass.form.setItemValue("mens_descripcion", me.grid.cells(fila, 4).getValue());
                        break;
                }
            });
            me.grid.attachEvent('onRowSelect', function (id, ind) {
                me.form.setItemValue('input1',''+ me.grid.cells(id, 4).getValue()+'');
                if(sw==0){
                    if(me.grid.cells(id, 2).getValue()=="No Leido"){
                        me.form.send(mainPath+'index.php/Mens/Edit_data?mens_id='+me.grid.cells(id,5).getValue()+'&mens_bandera=1',function(loader, response) {
                            me.widgetCargar(0);
                        });
                    }
                }
                fila = id;
            });
        }
        else
            mainTab.setTabActive("mentab");
    }
};