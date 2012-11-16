/**
 * Created with JetBrains WebStorm.
 * User: MASTER
 * Date: 2/11/12
 * Time: 22:55
 * To change this template use File | Settings | File Templates.
 */
var disenadorwinClass = {
    win: null,
    form: null,
    grid: null,
    layout: null,
    statusGrid: null,
    widgetWin: function(){
        var me = this;
        var windows = new dhtmlXWindows();
        me.win = windows.createWindow('window_1', 0, 0, 510, 400);
        me.win.setText('Diseño de Boletas');
        me.win.clearIcon();
        me.win.button('park').hide();
        me.win.button('minmax1').hide();
        me.win.setModal(1);
        me.win.centerOnScreen();

        widgetBar(me.win,2);

        me.layout = me.win.attachLayout('2E');
    },
    widgetForm: function(){
        var me = this,
            cell = me.layout.cells('a');
        cell.hideHeader();
        cell.fixSize(true, true);
        cell.setHeight('110');
        var str = [
            { type:"input" , name:"bol_codigo", label:"Codigo:", validate: "NotEmpty", labelWidth:95, labelAlign:"right", inputWidth:200, offsetTop:"10"  },
            { type:"input" , name:"bol_obs", label:"Observación:", rows:"2", labelWidth:95, labelAlign:"right", inputWidth:380  },
            { type:"select" , name:"bol_tipo", label:"Tipo de Boleta:", validate: "NotEmpty", labelWidth:95, labelAlign:"right", inputWidth:175,options: [{
                text: "---",
                value:""
            },{
                text: "Boleta de Infraestructura",
                value: "BOLINF"
            }, {
                text: "Boleta de Gestión",
                value: "BOLGES"
            }] },
            { type:"button" , name:"save_btn", value:"Guardar", inputLeft:388, inputTop:78, position:"absolute"  },
            { type:"button" , name:"edit_btn", value:"Modificar", inputLeft:280, inputTop:78, position:"absolute"  }
        ];
        me.form = cell.attachForm(str);
        me.form.lock();
        me.eventClickForm();
    },
    widgetGrid: function(){
        var me = this,
            cell = me.layout.cells('b');
        cell.hideHeader();

        me.statusGrid = cell.attachStatusBar();

        me.grid = cell.attachGrid();
        me.grid.setHeader("Id, Código,# Partes,Fecha de Cre.,Fecha de Mod.,Datos, Observación,Tipo");
        me.grid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro");
        me.grid.setColAlign("right,left,center,center,center,center,left, left");
        me.grid.setInitWidths("30,60,60,83,83,50,*,*");
        me.grid.setColumnColor("#E5E5E5");
        me.grid.init();

        me.grid.load(mainPath+"index.php/boleta/grid_data", function(){
            me.grid.groupBy(1);
            me.grid.setColumnHidden(1,true);
            me.grid.setColumnHidden(7,true);
            me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
        },"json");
    },
    eventClickForm: function(){
        var me = this,
            data,
            dataResp,
            auxFind;
        me.form.attachEvent("onButtonClick", function(name) {
            if(me.form.validate()){
                switch(name){
                    case 'save_btn':
                        data = me.form.getFormData();
                        auxFind = me.grid.findCell(data.bol_codigo,1);
                        var valCell = (auxFind != '')?me.grid.cells(auxFind[0][0],auxFind[0][1]).getValue():null;
                        if(valCell != data.bol_codigo){
                            me.form.send(mainPath+'index.php/boleta/new_boleta', function(loader, response) {
                                //console.log(response);
                                dataResp = response.split('/');
                                if(dataResp[0] > 0){
                                    var id = me.grid.uid();
                                    me.grid.addRow(id, [dataResp[0],data.bol_codigo,'Parte '+dataResp[2],dataResp[1],dataResp[1],'NO',data.bol_obs,dataResp[3]]);
                                    me.grid.selectRowById(id);
                                    me.statusGrid.setText("Numero de Registros: "+me.grid.getRowsNum());
                                    me.form.clear();
                                    me.form.lock();
                                    actionBar.enableItem('btn_new');
                                    me.win.close();
                                    disenadorClass.widgetMain(data.bol_codigo);
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
                    break;
                    case 'edit_btn':
                        data = me.form.getFormData();
                        me.win.close();
                        disenadorClass.widgetMain(data.bol_codigo);
                    break;
                }
            }
            else
                dhtmlx.alert({
                    text:"Error, Todos los campos de color rojo son necesarios."
                });
        });
    },
    widgetMain: function(){
        var dataCell,
            id,
            me = disenadorwinClass;
        me.widgetWin();
        me.widgetForm();
        me.widgetGrid();
        //detail.attachObject('detailDpto');
        actionBar.attachEvent("onClick", function(itemId){
            switch(itemId){
                case 'btn_new':
                    actionBar.disableItem(itemId);
                    me.form.clear();
                    me.form.unlock();
                    me.form.enableItem('bol_codigo');
                    me.form.setItemFocus('bol_codigo');
                    me.form.disableItem('edit_btn');
                    me.form.enableItem('save_btn');
                break;
                case 'btn_edit':
                    id = me.grid.getSelectedRowId();
                    if(id != null){
                        me.form.unlock();
                        me.form.disableItem('save_btn');
                        me.form.enableItem('edit_btn');
                        me.form.setItemValue('bol_codigo', me.grid.cells(id,1).getValue());
                        me.form.setItemValue('bol_obs', me.grid.cells(id,6).getValue());
                        me.form.setItemValue('bol_tipo', me.grid.cells(id,7).getValue());
                        me.form.disableItem('bol_codigo');
                    }
                    else
                        dhtmlx.alert({
                            text:"Error seleccione un Ítem para poder editar."
                        });
                    break;
                case 'btn_add':
                    dataCell = me.grid.cells(me.grid.getSelectedRowId(),5).getValue();
                    if(dataCell != 'NO'){
                        console.log("iver");
                    }
                    else
                        dhtmlx.alert({
                            text:"Error, No puede ingresar más partes a está Boleta hasta que complete la anterior."
                        });
                break;
            }
        });
    }
}